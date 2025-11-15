import { createWorker, type Worker, type RecognizeResult } from 'tesseract.js'
import type { ExtractedLicenseData, OCRResult } from '../types/ocr'

let worker: Worker | null = null

/**
 * Initialize Tesseract worker (lazy loading)
 */
export async function initializeOCRWorker(): Promise<Worker> {
  if (worker) {
    return worker
  }

  worker = await createWorker('eng', 1, {
    logger: (m) => {
      // Log progress for debugging
      if (m.status === 'recognizing text') {
        console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`)
      }
    },
  })

  return worker
}

/**
 * Terminate OCR worker to free memory
 */
export async function terminateOCRWorker(): Promise<void> {
  if (worker) {
    await worker.terminate()
    worker = null
  }
}

/**
 * Extract text from image using Tesseract
 * @param image Image element, canvas, or base64 string
 * @returns OCR result with text and confidence
 */
export async function extractTextFromImage(
  image: HTMLImageElement | HTMLCanvasElement | string
): Promise<OCRResult> {
  const tesseractWorker = await initializeOCRWorker()

  const result: RecognizeResult = await tesseractWorker.recognize(image)

  // Extract words from blocks -> paragraphs -> lines -> words
  const allWords = result.data.blocks
    ?.flatMap((block) => block.paragraphs)
    .flatMap((paragraph) => paragraph.lines)
    .flatMap((line) => line.words) || []

  return {
    text: result.data.text,
    confidence: result.data.confidence,
    words: allWords.map((word) => ({
      text: word.text,
      confidence: word.confidence,
      bbox: word.bbox,
    })),
  }
}

/**
 * Parse Jamaica driver's license data from OCR text
 * Based on actual Jamaica license layout:
 * FRONT: License Number, Date Issued, Birth Date, Name, Address
 * BACK: Control Number, TRN, Original Date of Issue
 * @param ocrResult Raw OCR result
 * @param side Which side of the license ('front' or 'back')
 * @returns Extracted and validated license data
 */
export function parseLicenseData(ocrResult: OCRResult, side: 'front' | 'back' = 'front'): ExtractedLicenseData {
  const text = ocrResult.text
  const words = ocrResult.words

  // Initialize result
  const result: ExtractedLicenseData = {
    driversLicNo: null,
    controlNo: null,
    dateOfBirth: null,
    origLicIssueDate: null,
    confidence: {
      driversLicNo: 0,
      controlNo: 0,
      dateOfBirth: 0,
      origLicIssueDate: 0,
    },
  }

  if (side === 'front') {
    // FRONT side has:
    // - TRN (driversLicNo): 9 digits near top (e.g., 1*4*945**)
    // - Date of Birth: YYYY-MM-DD format (near EXPIRY DATE and SEX)
    // - Date Issued: YYYY-MM-DD format (can be used if ORIGINAL DATE not available)

    // Extract TRN as driver's license number from FRONT
    // Look for label: "TRN" - 9 digits
    const trnMatch = extractFieldNearLabel(
      text,
      words,
      ["TRN", "tax registration", "tax registration number"],
      /\b(\d{9})\b/g
    )
    if (trnMatch) {
      result.driversLicNo = trnMatch
      const word = words.find((w) => w.text.includes(trnMatch))
      result.confidence.driversLicNo = word?.confidence || 75
    }

    // Extract date of birth from FRONT
    // Look for label: "BIRTH DATE" (often near EXPIRY DATE and SEX fields)
    let dobMatch = extractDateNearLabel(
      text,
      words,
      ["BIRTH DATE", "birthdate", "dob", "date of birth", "BIRTH", "birth date"]
    )

    // If not found, try finding date near EXPIRY DATE and SEX
    // Birth date is usually the date that appears before/near these fields
    if (!dobMatch) {
      dobMatch = extractDateNearLabel(
        text,
        words,
        ["EXPIRY", "EXPIRY DATE", "SEX"]
      )
    }

    if (dobMatch) {
      result.dateOfBirth = formatDate(dobMatch.date)
      result.confidence.dateOfBirth = dobMatch.confidence
    }

    // Extract DATE ISSUED from FRONT as fallback for origLicIssueDate
    // This can be used if ORIGINAL DATE OF ISSUE is not found on back
    const dateIssuedMatch = extractDateNearLabel(
      text,
      words,
      ["DATE ISSUED", "ISSUED", "issue date", "date of issue"]
    )
    if (dateIssuedMatch) {
      // Store as origLicIssueDate if not already set
      if (!result.origLicIssueDate) {
        result.origLicIssueDate = formatDate(dateIssuedMatch.date)
        result.confidence.origLicIssueDate = dateIssuedMatch.confidence
      }
    }
  } else if (side === 'back') {
    // BACK side has the info printed VERTICALLY:
    // - Control Number: Alphanumeric, 10 chars (e.g., O110469335)
    // - TRN: Also visible (same as front)
    // - Original Date of Issue: YYYY-MM-DD format

    // Extract control number from BACK (alphanumeric, 10 chars)
    // Pattern: Letter followed by 9 digits (e.g., O110469335)
    // Or: Look for text near "NIGERIA" (country code above control number)
    const controlMatch = text.match(/\b(\d{10})\b/g) || text.match(/\b([0-9]{10})\b/g)
    if (controlMatch && controlMatch.length > 0) {
      // Prefer the first alphanumeric match (should be control number)
      result.controlNo = controlMatch[0]
      const word = words.find((w) => w.text.includes(controlMatch[0]))
      result.confidence.controlNo = word?.confidence || 70
    }

    // If TRN not extracted from front, try from back
    if (!result.driversLicNo) {
      const trnMatches = text.match(/\b(\d{9})\b/g)
      if (trnMatches && trnMatches.length > 0) {
        // Find the one near "TRN" label
        for (const match of trnMatches) {
          const matchIndex = text.indexOf(match)
          const context = text.substring(Math.max(0, matchIndex - 20), matchIndex + 20).toLowerCase()
          if (context.includes('trn') || context.includes('TRN')) {
            result.driversLicNo = match
            result.confidence.driversLicNo = 70
            break
          }
        }
      }
    }

    // Extract ORIGINAL DATE OF ISSUE from BACK
    // Look for label: "ORIGINAL DATE OF ISSUE" - Format: YYYY-MM-DD
    // This is the primary/authoritative source for license issue date
    const origIssueMatch = extractDateNearLabel(
      text,
      words,
      [
        "ORIGINAL DATE OF ISSUE",
        "ORIGINAL DATE",
        "ORIGINAL",
        "orig date of issue",
        "orig date",
        "original issue",
        "date of issue"
      ]
    )
    if (origIssueMatch) {
      result.origLicIssueDate = formatDate(origIssueMatch.date)
      result.confidence.origLicIssueDate = origIssueMatch.confidence
    } else {
      // Fallback: try "DATE ISSUED" pattern on back as well
      const dateIssuedMatch = extractDateNearLabel(
        text,
        words,
        ["date issued", "issue", "ORIGINAL", "DATE", "OF ISSUE"]
      )
      if (dateIssuedMatch) {
        result.origLicIssueDate = formatDate(dateIssuedMatch.date)
        result.confidence.origLicIssueDate = dateIssuedMatch.confidence
      }
    }
  }

  return result
}

/**
 * Extract a field value near a specific label with improved matching
 */
function extractFieldNearLabel(
  text: string,
  words: Array<{ text: string; confidence: number; bbox: { x0: number; y0: number; x1: number; y1: number } }>,
  labels: string[],
  pattern: RegExp
): string | null {
  const textLower = text.toLowerCase()

  // Strategy 1: Find text after label
  for (const label of labels) {
    const labelIndex = textLower.indexOf(label.toLowerCase())
    if (labelIndex !== -1) {
      // Get text after the label (next 150 characters to be safe)
      const afterLabel = text.substring(labelIndex, labelIndex + 150)
      pattern.lastIndex = 0
      const matches = Array.from(afterLabel.matchAll(pattern))

      if (matches.length > 0) {
        return matches[0][1]
      }
    }
  }

  // Strategy 2: Spatial proximity - find label word and look nearby
  for (const label of labels) {
    const labelWords = words.filter((w) =>
      w.text.toLowerCase().includes(label.toLowerCase().split(' ')[0])
    )

    if (labelWords.length > 0) {
      for (const labelWord of labelWords) {
        // Find words to the right or below the label
        const nearbyWords = words.filter((w) => {
          const isRightOf = w.bbox.x0 > labelWord.bbox.x0 && w.bbox.x0 < labelWord.bbox.x0 + 400
          const isCloseVertically = Math.abs(w.bbox.y0 - labelWord.bbox.y0) < 100
          return isRightOf && isCloseVertically
        })

        // Check each nearby word against the pattern
        for (const word of nearbyWords) {
          pattern.lastIndex = 0
          if (pattern.test(word.text)) {
            pattern.lastIndex = 0
            const match = word.text.match(pattern)
            if (match) {
              return match[1]
            }
          }
        }
      }
    }
  }

  // Strategy 3: Pattern matching on whole text (last resort)
  pattern.lastIndex = 0
  const matches = Array.from(text.matchAll(pattern))
  return matches.length > 0 ? matches[0][1] : null
}

/**
 * Extract a date near a specific label with improved pattern matching
 */
function extractDateNearLabel(
  text: string,
  words: Array<{ text: string; confidence: number; bbox: { x0: number; y0: number; x1: number; y1: number } }>,
  labels: string[]
): { date: string; confidence: number } | null {
  const textLower = text.toLowerCase()

  // Multiple date patterns to catch different OCR interpretations
  const datePatterns = [
    /\b(\d{4}[-/]\d{2}[-/]\d{2})\b/g,           // YYYY-MM-DD or YYYY/MM/DD
    /\b(\d{4}\s*-\s*\d{2}\s*-\s*\d{2})\b/g,    // YYYY - MM - DD (with spaces)
    /\b(\d{2}[-/]\d{2}[-/]\d{4})\b/g,          // DD-MM-YYYY or DD/MM/YYYY
    /\b(\d{2}\s*[-/]\s*\d{2}\s*[-/]\s*\d{4})\b/g, // DD - MM - YYYY (with spaces)
    /\b(\d{4}\d{2}\d{2})\b/g,                  // YYYYMMDD (no separators)
    /(\d{4})\s*-\s*(\d{2})\s*-\s*(\d{2})/g,    // Loose YYYY-MM-DD with varied spacing
  ]

  // First, try to find dates near labels in the text
  for (const label of labels) {
    const labelIndex = textLower.indexOf(label.toLowerCase())
    if (labelIndex !== -1) {
      // Search in text after the label (next 100 characters to be safe)
      const afterLabel = text.substring(labelIndex, labelIndex + 100)

      for (const pattern of datePatterns) {
        pattern.lastIndex = 0 // Reset regex
        const matches = Array.from(afterLabel.matchAll(pattern))
        if (matches.length > 0) {
          let dateText = matches[0][1] || `${matches[0][1]}-${matches[0][2]}-${matches[0][3]}`

          // Clean up any extra spaces
          dateText = dateText.replace(/\s+/g, '')

          // Find the word with this date
          const word = words.find((w) => {
            const cleanWord = w.text.replace(/\s+/g, '').replace(/[^\d-/]/g, '')
            const cleanDate = dateText.replace(/[^\d-/]/g, '')
            return cleanWord.includes(cleanDate) || cleanDate.includes(cleanWord)
          })

          return {
            date: dateText,
            confidence: word?.confidence || 65
          }
        }
      }
    }
  }

  // If no label-based match, try spatial proximity (find dates near label words by position)
  for (const label of labels) {
    const labelWords = words.filter((w) =>
      w.text.toLowerCase().includes(label.toLowerCase().split(' ')[0]) // Match first word of label
    )

    if (labelWords.length > 0) {
      // Look for dates within 300 pixels horizontally or 100 pixels vertically
      for (const labelWord of labelWords) {
        const nearbyWords = words.filter((w) => {
          const horizontalDistance = Math.abs(w.bbox.x0 - labelWord.bbox.x1)
          const verticalDistance = Math.abs(w.bbox.y0 - labelWord.bbox.y0)

          // Within reasonable distance (right of label or below it)
          return (horizontalDistance < 300 && verticalDistance < 80) ||
                 (verticalDistance < 120 && horizontalDistance < 150)
        })

        // Check if any nearby word looks like a date
        for (const nearbyWord of nearbyWords) {
          for (const pattern of datePatterns) {
            pattern.lastIndex = 0
            if (pattern.test(nearbyWord.text.replace(/\s+/g, ''))) {
              return {
                date: nearbyWord.text.replace(/\s+/g, ''),
                confidence: nearbyWord.confidence
              }
            }
          }
        }
      }
    }
  }

  // Last resort: look for any date-like pattern in the entire text
  for (const pattern of datePatterns) {
    pattern.lastIndex = 0
    const allMatches = Array.from(text.matchAll(pattern))
    if (allMatches.length > 0) {
      // Return the first reasonable-looking date
      const dateText = allMatches[0][1] || `${allMatches[0][1]}-${allMatches[0][2]}-${allMatches[0][3]}`
      const cleanDate = dateText.replace(/\s+/g, '')

      // Validate it looks like a real date
      if (cleanDate.length >= 8) {
        return {
          date: cleanDate,
          confidence: 50 // Low confidence since we couldn't match to label
        }
      }
    }
  }

  return null
}

/**
 * Get text from nearby words for context
 */
function getNearbyText(
  targetWord: { bbox: { x0: number; y0: number; x1: number; y1: number } },
  allWords: Array<{ text: string; bbox: { x0: number; y0: number; x1: number; y1: number } }>,
  radius: number
): string {
  const nearby = allWords.filter((word) => {
    const distance = Math.sqrt(
      Math.pow(word.bbox.x0 - targetWord.bbox.x0, 2) +
      Math.pow(word.bbox.y0 - targetWord.bbox.y0, 2)
    )
    return distance < radius * 100 // Adjust radius multiplier as needed
  })

  return nearby.map((w) => w.text).join(' ')
}

/**
 * Check if a date is likely a birth date (older than 16 years)
 */
function isLikelyBirthDate(dateStr: string): boolean {
  try {
    const date = parseDate(dateStr)
    const sixteenYearsAgo = new Date()
    sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16)

    return date < sixteenYearsAgo
  } catch {
    return false
  }
}

/**
 * Parse date string to Date object
 */
function parseDate(dateStr: string): Date {
  // Try DD/MM/YYYY or DD-MM-YYYY
  const parts = dateStr.split(/[-/]/)

  if (parts.length !== 3) {
    throw new Error('Invalid date format')
  }

  // Check if it's YYYY-MM-DD format
  if (parts[0].length === 4) {
    return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`)
  }

  // Assume DD/MM/YYYY or DD-MM-YYYY
  return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
}

/**
 * Format date to YYYY-MM-DD for input field
 */
function formatDate(dateStr: string): string {
  try {
    const date = parseDate(dateStr)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  } catch {
    return dateStr // Return original if parsing fails
  }
}

/**
 * Validate extracted data quality
 * @param data Extracted license data
 * @returns Whether the data is reliable enough to use
 */
export function validateExtractedData(data: ExtractedLicenseData): {
  isValid: boolean
  missingFields: string[]
  lowConfidenceFields: string[]
} {
  const missingFields: string[] = []
  const lowConfidenceFields: string[] = []
  const CONFIDENCE_THRESHOLD = 60

  if (!data.driversLicNo) {
    missingFields.push("Driver's License Number")
  } else if (data.confidence.driversLicNo < CONFIDENCE_THRESHOLD) {
    lowConfidenceFields.push("Driver's License Number")
  }

  if (!data.controlNo) {
    missingFields.push('Control Number')
  } else if (data.confidence.controlNo < CONFIDENCE_THRESHOLD) {
    lowConfidenceFields.push('Control Number')
  }

  if (!data.dateOfBirth) {
    missingFields.push('Date of Birth')
  } else if (data.confidence.dateOfBirth < CONFIDENCE_THRESHOLD) {
    lowConfidenceFields.push('Date of Birth')
  }

  if (!data.origLicIssueDate) {
    missingFields.push('License Issue Date')
  } else if (data.confidence.origLicIssueDate < CONFIDENCE_THRESHOLD) {
    lowConfidenceFields.push('License Issue Date')
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
    lowConfidenceFields,
  }
}
