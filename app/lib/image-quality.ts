import type { ImageQualityMetrics, ImageQualityResult } from '../types/ocr'

/**
 * Analyze image quality for OCR processing
 * @param imageElement HTMLImageElement or HTMLCanvasElement to analyze
 * @returns Quality analysis results with feedback
 */
export async function analyzeImageQuality(
  imageElement: HTMLImageElement | HTMLCanvasElement
): Promise<ImageQualityResult> {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Could not get canvas context')
  }

  // Set canvas size to match image
  canvas.width = imageElement.width
  canvas.height = imageElement.height

  // Draw image to canvas
  if (imageElement instanceof HTMLImageElement) {
    ctx.drawImage(imageElement, 0, 0)
  } else {
    ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height)
  }

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  // Calculate metrics
  const brightness = calculateBrightness(imageData)
  const contrast = calculateContrast(imageData)
  const sharpness = calculateSharpness(imageData)

  // Determine quality issues
  const isTooLight = brightness > 230
  const isTooDark = brightness < 50
  const isBlurry = sharpness < 90
  const hasLowContrast = contrast < 30

  // Generate feedback
  const feedback: string[] = []

  if (isTooLight) {
    feedback.push('Image is too bright - try reducing exposure or avoid direct light')
  }

  if (isTooDark) {
    feedback.push('Image is too dark - improve lighting or use flash')
  }

  if (isBlurry) {
    feedback.push('Image appears blurry - hold camera steady and ensure license is in focus')
  }

  if (hasLowContrast) {
    feedback.push('Low image contrast - ensure good lighting and clear background')
  }

  const isGoodQuality = !isTooLight && !isTooDark && !isBlurry && !hasLowContrast

  if (isGoodQuality) {
    feedback.push('Image quality is good - ready for processing')
  }

  const metrics: ImageQualityMetrics = {
    isBlurry,
    isTooDark,
    isTooLight,
    contrast,
    brightness,
    sharpness,
  }

  return {
    isGoodQuality,
    metrics,
    feedback,
  }
}

/**
 * Calculate average brightness of image
 */
function calculateBrightness(imageData: ImageData): number {
  const data = imageData.data
  let sum = 0

  for (let i = 0; i < data.length; i += 4) {
    // Calculate perceived brightness using luminance formula
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    sum += 0.299 * r + 0.587 * g + 0.114 * b
  }

  return sum / (data.length / 4)
}

/**
 * Calculate image contrast using standard deviation
 */
function calculateContrast(imageData: ImageData): number {
  const data = imageData.data
  const pixelCount = data.length / 4
  let sum = 0
  let squareSum = 0

  for (let i = 0; i < data.length; i += 4) {
    const grayscale = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
    sum += grayscale
    squareSum += grayscale * grayscale
  }

  const mean = sum / pixelCount
  const variance = squareSum / pixelCount - mean * mean
  const standardDeviation = Math.sqrt(variance)

  return standardDeviation
}

/**
 * Calculate image sharpness using Laplacian variance method
 * Higher values indicate sharper images
 */
function calculateSharpness(imageData: ImageData): number {
  const width = imageData.width
  const height = imageData.height
  const data = imageData.data

  // Convert to grayscale first
  const gray: number[] = []
  for (let i = 0; i < data.length; i += 4) {
    gray.push(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2])
  }

  // Apply Laplacian operator
  let variance = 0
  let count = 0

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x

      // Laplacian kernel approximation
      const laplacian =
        -gray[idx - width - 1] - gray[idx - width] - gray[idx - width + 1] -
        gray[idx - 1] + 8 * gray[idx] - gray[idx + 1] -
        gray[idx + width - 1] - gray[idx + width] - gray[idx + width + 1]

      variance += laplacian * laplacian
      count++
    }
  }

  return variance / count
}

/**
 * Preprocess image for better OCR results
 * @param imageElement Source image
 * @returns Canvas with preprocessed image
 */
export function preprocessImageForOCR(
  imageElement: HTMLImageElement | HTMLCanvasElement
): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Could not get canvas context')
  }

  // Set canvas size
  canvas.width = imageElement.width
  canvas.height = imageElement.height

  // Draw original image
  if (imageElement instanceof HTMLImageElement) {
    ctx.drawImage(imageElement, 0, 0)
  } else {
    ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height)
  }

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  // Apply grayscale conversion for better OCR
  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
    data[i] = gray
    data[i + 1] = gray
    data[i + 2] = gray
  }

  // Apply contrast enhancement
  const factor = 1.5 // Contrast factor
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128))
    data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128))
    data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128))
  }

  ctx.putImageData(imageData, 0, 0)
  return canvas
}
