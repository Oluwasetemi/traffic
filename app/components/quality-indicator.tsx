'use client'

import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import type { ImageQualityResult } from '../types/ocr'

interface QualityIndicatorProps {
  qualityResult: ImageQualityResult | null
  className?: string
}

export function QualityIndicator({ qualityResult, className }: QualityIndicatorProps) {
  if (!qualityResult) return null

  const { isGoodQuality, feedback, metrics } = qualityResult

  return (
    <div className={className}>
      <div
        className={`rounded-lg p-4 ${
          isGoodQuality
            ? 'bg-green-50 dark:bg-green-950/20'
            : 'bg-amber-50 dark:bg-amber-950/20'
        }`}
      >
        <div className="flex items-start space-x-3">
          <div className="shrink-0">
            {isGoodQuality ? (
              <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            ) : (
              <ExclamationTriangleIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            )}
          </div>

          <div className="flex-1">
            <h3
              className={`text-sm font-semibold ${
                isGoodQuality
                  ? 'text-green-900 dark:text-green-100'
                  : 'text-amber-900 dark:text-amber-100'
              }`}
            >
              {isGoodQuality ? 'Image Quality: Good' : 'Image Quality: Needs Improvement'}
            </h3>

            <ul className="mt-2 space-y-1">
              {feedback.map((message, index) => (
                <li
                  key={index}
                  className={`text-sm ${
                    isGoodQuality
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-amber-800 dark:text-amber-200'
                  }`}
                >
                  {message}
                </li>
              ))}
            </ul>

            {/* Technical metrics (collapsible/optional) */}
            <details className="mt-3">
              <summary className={`cursor-pointer text-xs font-medium ${
                isGoodQuality
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-amber-700 dark:text-amber-300'
              }`}>
                View technical metrics
              </summary>
              <div className="mt-2 space-y-1 text-xs">
                <QualityMetric
                  label="Brightness"
                  value={Math.round(metrics.brightness)}
                  ideal="60-220"
                  isGood={!metrics.isTooDark && !metrics.isTooLight}
                />
                <QualityMetric
                  label="Contrast"
                  value={Math.round(metrics.contrast)}
                  ideal="> 40"
                  isGood={metrics.contrast >= 40}
                />
                <QualityMetric
                  label="Sharpness"
                  value={Math.round(metrics.sharpness)}
                  ideal="> 100"
                  isGood={!metrics.isBlurry}
                />
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}

interface QualityMetricProps {
  label: string
  value: number
  ideal: string
  isGood: boolean
}

function QualityMetric({ label, value, ideal, isGood }: QualityMetricProps) {
  return (
    <div className="flex items-center justify-between rounded bg-white/50 px-2 py-1 dark:bg-zinc-800/50">
      <span className="text-zinc-700 dark:text-zinc-300">{label}:</span>
      <span className={`font-mono ${isGood ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
        {value} <span className="text-zinc-500 dark:text-zinc-400">(ideal: {ideal})</span>
      </span>
    </div>
  )
}

interface FieldConfidenceIndicatorProps {
  label: string
  confidence: number
  value?: string | null
  className?: string
}

export function FieldConfidenceIndicator({
  label,
  confidence,
  value,
  className,
}: FieldConfidenceIndicatorProps) {
  const getConfidenceColor = (conf: number) => {
    if (conf >= 80) return 'text-green-600 dark:text-green-400'
    if (conf >= 60) return 'text-amber-600 dark:text-amber-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getConfidenceIcon = (conf: number) => {
    if (conf >= 80) return <CheckCircleIcon className="h-4 w-4" />
    if (conf >= 60) return <ExclamationTriangleIcon className="h-4 w-4" />
    return <XCircleIcon className="h-4 w-4" />
  }

  if (!value) return null

  return (
    <div className={`flex items-center space-x-2 text-xs ${className}`}>
      <span className={getConfidenceColor(confidence)}>
        {getConfidenceIcon(confidence)}
      </span>
      <span className="text-zinc-600 dark:text-zinc-400">
        {label}: <span className={getConfidenceColor(confidence)}>{confidence}% confidence</span>
      </span>
    </div>
  )
}
