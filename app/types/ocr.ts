export interface OCRResult {
  text: string
  confidence: number
  words: OCRWord[]
}

export interface OCRWord {
  text: string
  confidence: number
  bbox: {
    x0: number
    y0: number
    x1: number
    y1: number
  }
}

export interface ExtractedLicenseData {
  driversLicNo: string | null
  controlNo: string | null
  dateOfBirth: string | null
  origLicIssueDate: string | null
  confidence: {
    driversLicNo: number
    controlNo: number
    dateOfBirth: number
    origLicIssueDate: number
  }
}

export interface ImageQualityMetrics {
  isBlurry: boolean
  isTooDark: boolean
  isTooLight: boolean
  contrast: number
  brightness: number
  sharpness: number
}

export interface ImageQualityResult {
  isGoodQuality: boolean
  metrics: ImageQualityMetrics
  feedback: string[]
}

export type CaptureMode = 'camera' | 'upload' | 'drop'

export interface OCRProcessingState {
  isProcessing: boolean
  progress: number
  currentStep: 'idle' | 'loading-worker' | 'preprocessing' | 'extracting' | 'parsing' | 'complete' | 'error'
  error: string | null
}
