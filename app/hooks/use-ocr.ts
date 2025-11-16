import { useState, useCallback } from 'react'
import type {
  ExtractedLicenseData,
  ImageQualityResult,
  OCRProcessingState,
} from '../types/ocr'
import { analyzeImageQuality, preprocessImageForOCR } from '../lib/image-quality'
import {
  parseLicenseData,
  validateExtractedData,
  initializeOCRWorker,
} from '../lib/ocr'
import { extractText, extractLicenseData, type OCREngine } from '../lib/ocr-unified'
import { initializeTransformersOCR } from '../lib/ocr-transformers'

export function useOCR(initialEngine: OCREngine = 'tesseract') {
  const [currentEngine, setCurrentEngine] = useState<OCREngine>(initialEngine)
  const [processingState, setProcessingState] = useState<OCRProcessingState>({
    isProcessing: false,
    progress: 0,
    currentStep: 'idle',
    error: null,
  })

  const [qualityResult, setQualityResult] = useState<ImageQualityResult | null>(null)
  const [extractedData, setExtractedData] = useState<ExtractedLicenseData | null>(null)

  /**
   * Process an image through quality check and OCR
   * @param imageSource Image to process
   * @param side Which side of the license ('front' or 'back')
   */
  const processImage = useCallback(async (
    imageSource: string | HTMLImageElement | HTMLCanvasElement,
    side: 'front' | 'back' = 'front'
  ) => {
    try {
      setProcessingState({
        isProcessing: true,
        progress: 0,
        currentStep: 'loading-worker',
        error: null,
      })

      // Step 1: Load image if it's a string (base64 or URL)
      let imageElement: HTMLImageElement | HTMLCanvasElement

      if (typeof imageSource === 'string') {
        imageElement = await loadImage(imageSource)
      } else {
        imageElement = imageSource
      }

      setProcessingState((prev) => ({ ...prev, progress: 10, currentStep: 'preprocessing' }))

      // Step 2: Analyze image quality
      const quality = await analyzeImageQuality(imageElement)
      setQualityResult(quality)

      if (!quality.isGoodQuality) {
        setProcessingState({
          isProcessing: false,
          progress: 0,
          currentStep: 'error',
          error: 'Image quality is too low. Please see feedback and try again.',
        })
        return null
      }

      setProcessingState((prev) => ({ ...prev, progress: 30 }))

      // Step 3: Preprocess image for better OCR
      const preprocessedCanvas = preprocessImageForOCR(imageElement)

      setProcessingState((prev) => ({ ...prev, progress: 40, currentStep: 'loading-worker' }))

      // Step 4: Initialize OCR engine (skip for Claude - it's API-based)
      if (currentEngine === 'tesseract') {
        await initializeOCRWorker()
      } else if (currentEngine === 'transformers') {
        await initializeTransformersOCR()
      }

      setProcessingState((prev) => ({ ...prev, progress: 50, currentStep: 'extracting' }))

      // Step 5: Extract and parse license data
      let licenseData: ExtractedLicenseData

      if (currentEngine === 'claude') {
        // Claude extracts structured data directly
        licenseData = await extractLicenseData(preprocessedCanvas, side, currentEngine)
      } else {
        // Other engines: extract text then parse
        const ocrResult = await extractText(preprocessedCanvas, currentEngine)
        setProcessingState((prev) => ({ ...prev, progress: 80, currentStep: 'parsing' }))
        licenseData = parseLicenseData(ocrResult, side)
      }

      setProcessingState((prev) => ({ ...prev, progress: 90 }))

      // Step 7: Validate extracted data
      const validation = validateExtractedData(licenseData)

      if (!validation.isValid) {
        const missingFieldsMsg = validation.missingFields.length > 0
          ? `Missing: ${validation.missingFields.join(', ')}`
          : ''
        const lowConfidenceMsg = validation.lowConfidenceFields.length > 0
          ? `Low confidence: ${validation.lowConfidenceFields.join(', ')}`
          : ''

        setProcessingState({
          isProcessing: false,
          progress: 0,
          currentStep: 'error',
          error: `Could not extract all required fields. ${missingFieldsMsg} ${lowConfidenceMsg}`.trim(),
        })

        // Still set the data so user can see what was extracted
        setExtractedData(licenseData)
        return licenseData
      }

      setExtractedData(licenseData)

      setProcessingState({
        isProcessing: false,
        progress: 100,
        currentStep: 'complete',
        error: null,
      })

      return licenseData
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'

      setProcessingState({
        isProcessing: false,
        progress: 0,
        currentStep: 'error',
        error: `OCR processing failed: ${errorMessage}`,
      })

      return null
    }
  }, [currentEngine])

  /**
   * Reset OCR state
   */
  const reset = useCallback(() => {
    setProcessingState({
      isProcessing: false,
      progress: 0,
      currentStep: 'idle',
      error: null,
    })
    setQualityResult(null)
    setExtractedData(null)
  }, [])

  return {
    processImage,
    reset,
    processingState,
    qualityResult,
    extractedData,
    isProcessing: processingState.isProcessing,
    error: processingState.error,
    currentEngine,
    setCurrentEngine,
  }
}

/**
 * Load image from URL or base64 string
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = src
  })
}
