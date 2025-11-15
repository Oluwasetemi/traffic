'use client'

import { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Button } from './button'
import { CameraIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void
  disabled?: boolean
}

export function CameraCapture({ onCapture, disabled }: CameraCaptureProps) {
  const webcamRef = useRef<Webcam>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')
  const [isReady, setIsReady] = useState(false)

  const handleCapture = useCallback(() => {
    if (webcamRef.current && !disabled) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        onCapture(imageSrc)
      }
    }
  }, [onCapture, disabled])

  const handleUserMedia = useCallback(() => {
    setHasPermission(true)
    setIsReady(true)
  }, [])

  const handleUserMediaError = useCallback((error: string | DOMException) => {
    console.error('Webcam error:', error)
    setHasPermission(false)
    setIsReady(false)
  }, [])

  const toggleCamera = useCallback(() => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'))
  }, [])

  const videoConstraints = {
    facingMode,
    width: { ideal: 1920 },
    height: { ideal: 1080 },
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {hasPermission === false && (
        <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-950/20">
          <p className="text-sm text-red-800 dark:text-red-200">
            Camera permission denied. Please allow camera access to capture your license.
          </p>
        </div>
      )}

      <div className="relative w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={handleUserMedia}
          onUserMediaError={handleUserMediaError}
          className="w-full"
          screenshotQuality={1}
        />

        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-zinc-300 border-t-blue-600 dark:border-zinc-600 dark:border-t-blue-400"></div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Initializing camera...
              </p>
            </div>
          </div>
        )}

        {/* Guide overlay */}
        {isReady && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="rounded-lg border-4 border-dashed border-white/70 p-4 dark:border-zinc-300/70"
                 style={{ width: '85%', aspectRatio: '1.586' }}>
              <p className="text-center text-sm font-medium text-white drop-shadow-lg dark:text-zinc-100">
                Align license within frame
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex w-full gap-2">
        <Button
          type="button"
          onClick={handleCapture}
          disabled={disabled || !isReady}
          color="blue"
          className="flex-1"
        >
          <CameraIcon className="h-5 w-5" />
          Capture Photo
        </Button>

        <Button
          type="button"
          outline
          onClick={toggleCamera}
          disabled={disabled || !isReady}
          aria-label="Switch camera"
        >
          <ArrowPathIcon className="h-5 w-5" />
        </Button>
      </div>

      <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
        Ensure your license is well-lit, in focus, and all text is clearly visible
      </p>
    </div>
  )
}
