'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { Button } from './button'

interface FileUploadProps {
  onUpload: (imageSrc: string) => void
  disabled?: boolean
}

export function FileUpload({ onUpload, disabled }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0 && !disabled) {
        const file = acceptedFiles[0]
        const reader = new FileReader()

        reader.onload = () => {
          const imageSrc = reader.result as string
          onUpload(imageSrc)
        }

        reader.readAsDataURL(file)
      }
    },
    [onUpload, disabled]
  )

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
      'application/*': ['.pdf']
    },
    multiple: false,
    disabled,
    noClick: true, // We'll handle click via button
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          rounded-lg border-2 border-dashed p-8 text-center transition-colors
          ${isDragActive
            ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/20'
            : 'border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50'
          }
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center space-y-4">
          <div className={`rounded-full p-4 ${isDragActive ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
            {isDragActive ? (
              <ArrowUpTrayIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            ) : (
              <PhotoIcon className="h-12 w-12 text-zinc-600 dark:text-zinc-400" />
            )}
          </div>

          {isDragActive ? (
            <div>
              <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                Drop your license image here
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-lg font-medium text-zinc-900 dark:text-white">
                Drag & drop your license image
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                or click the button below to browse
              </p>
            </div>
          )}

          <Button
            type="button"
            onClick={open}
            disabled={disabled}
            color="blue"
            className="mt-4"
          >
            <PhotoIcon className="h-5 w-5" />
            Browse Files
          </Button>
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
        <h4 className="mb-2 text-sm font-semibold text-blue-900 dark:text-blue-100">
          Tips for best results:
        </h4>
        <ul className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
          <li>• Ensure the image is clear and well-lit</li>
          <li>• All text should be in focus and readable</li>
          <li>• Avoid glare or shadows on the license</li>
          <li>• Use a high-resolution image (minimum 800x600)</li>
          <li>• Supported formats: JPG, PNG, WEBP</li>
        </ul>
      </div>
    </div>
  )
}
