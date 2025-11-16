'use client'

import { extractTextFromImage as tesseractExtract, parseLicenseData as tesseractParseLicense } from './ocr'
import { extractTextWithTransformers } from './ocr-transformers'
import { extractLicenseWithClaude } from './ocr-anthropic'
import type { OCRResult, ExtractedLicenseData } from '../types/ocr'

export type OCREngine = 'tesseract' | 'transformers' | 'claude' | 'auto'

/**
 * Unified OCR interface supporting multiple engines
 * @param image - Image element, canvas, or data URL
 * @param engine - Which OCR engine to use ('tesseract', 'transformers', or 'auto')
 * @returns OCR result with text and confidence
 */
export async function extractText(
  image: HTMLImageElement | HTMLCanvasElement | string,
  engine: OCREngine = 'tesseract'
): Promise<OCRResult> {

  if (engine === 'tesseract') {
    return await tesseractExtract(image)
  }

  if (engine === 'transformers') {
    console.log('[OCR Unified] Using Transformers engine')
    return await extractTextWithTransformers(image)
  }

  if (engine === 'claude') {
    console.log('[OCR Unified] Using Claude Vision engine')
    // Convert image to data URL if needed
    const imageUrl = typeof image === 'string' ? image :
                     image instanceof HTMLImageElement ? image.src :
                     image.toDataURL()
    // Claude extracts structured data, so we call extractLicenseWithClaude and convert to OCRResult
    const licenseData = await extractLicenseWithClaude(imageUrl, 'front')
    // Convert structured data to text format for OCRResult
    const text = [
      licenseData.driversLicNo ? `License: ${licenseData.driversLicNo}` : '',
      licenseData.controlNo ? `Control: ${licenseData.controlNo}` : '',
      licenseData.dateOfBirth ? `DOB: ${licenseData.dateOfBirth}` : '',
      licenseData.origLicIssueDate ? `Issue Date: ${licenseData.origLicIssueDate}` : '',
    ].filter(Boolean).join('\n')

    return {
      text,
      confidence: Math.max(
        licenseData.confidence.driversLicNo,
        licenseData.confidence.controlNo,
        licenseData.confidence.dateOfBirth,
        licenseData.confidence.origLicIssueDate
      ),
      words: [] // Claude doesn't provide word-level positions
    }
  }

  // Auto mode: Try Claude first (best accuracy), fallback to Tesseract
  if (engine === 'auto') {
    try {
      console.log('[OCR Unified] Auto mode: Attempting OCR with Transformers.js...')
      const transformersResult = await extractTextWithTransformers(image)
      console.log('[OCR Unified] Transformers result received:', transformersResult)

      // If confidence is high enough, use Transformers result
      if (transformersResult.confidence > 70) {
        console.log('Using Transformers.js result (high confidence)')
        return transformersResult
      }

      // Otherwise, try Tesseract as well and compare
      console.log('Transformers confidence low, trying Tesseract...')
      const tesseractResult = await tesseractExtract(image)

      // Return whichever has higher confidence
      if (tesseractResult.confidence > transformersResult.confidence) {
        console.log('Using Tesseract result (higher confidence)')
        return tesseractResult
      }

      console.log('Using Transformers.js result')
      return transformersResult

    } catch (error) {
      console.warn('Transformers OCR failed, falling back to Tesseract:', error)
      return await tesseractExtract(image)
    }
  }

  throw new Error(`Unknown OCR engine: ${engine}`)
}

/**
 * Extract text and parse license data in one call
 * @param image - Image element, canvas, or data URL
 * @param side - Which side of the license ('front' or 'back')
 * @param engine - Which OCR engine to use
 * @returns Parsed license data
 */
export async function extractLicenseData(
  image: HTMLImageElement | HTMLCanvasElement | string,
  side: 'front' | 'back' = 'front',
  engine: OCREngine = 'tesseract'
): Promise<ExtractedLicenseData> {
  // Claude can extract structured data directly
  if (engine === 'claude') {
    const imageUrl = typeof image === 'string' ? image :
                     image instanceof HTMLImageElement ? image.src :
                     image.toDataURL()
    return await extractLicenseWithClaude(imageUrl, side)
  }

  // For other engines, extract text then parse
  const ocrResult = await extractText(image, engine)
  return tesseractParseLicense(ocrResult, side)
}

/**
 * Enhanced extraction using both engines for better accuracy
 * Combines Transformers' accuracy with Tesseract's word positions
 * @param image - Image element, canvas, or data URL
 * @returns OCR result with best of both engines
 */
export async function extractWithBothEngines(
  image: HTMLImageElement | HTMLCanvasElement | string
): Promise<OCRResult> {
  try {
    // Run both engines in parallel
    const [tesseractResult, transformersResult] = await Promise.all([
      tesseractExtract(image),
      extractTextWithTransformers(image)
    ])

    // Merge results:
    // - Use Transformers text (usually more accurate)
    // - Use Tesseract word positions (Transformers doesn't provide them)
    // - Use higher confidence score
    return {
      text: transformersResult.text || tesseractResult.text,
      confidence: Math.max(transformersResult.confidence, tesseractResult.confidence),
      words: tesseractResult.words // Tesseract provides bounding boxes
    }
  } catch (error) {
    console.error('Error running both OCR engines:', error)
    // Fallback to Tesseract only
    return await tesseractExtract(image)
  }
}
