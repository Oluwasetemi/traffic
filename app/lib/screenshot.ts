/**
 * Screenshot utility using html-to-image
 */

import { toBlob, toPng } from 'html-to-image'

export async function captureElement(element: HTMLElement): Promise<string> {
  try {
    const dataUrl = await toPng(element, {
      quality: 0.95,
      pixelRatio: 2, // Higher quality for retina displays
      cacheBust: true, // Prevent caching issues
    })

    return dataUrl
  } catch (error) {
    console.error('Screenshot error:', error)
    throw new Error('Failed to capture screenshot')
  }
}

export async function captureElementAsBlob(element: HTMLElement): Promise<Blob> {
  try {
    const blob = await toBlob(element, {
      quality: 0.95,
      pixelRatio: 2,
      cacheBust: true,
    })

    if (!blob) {
      throw new Error('Failed to create blob')
    }

    return blob
  } catch (error) {
    console.error('Screenshot blob error:', error)
    throw new Error('Failed to capture screenshot')
  }
}

export function downloadImage(dataUrl: string, filename: string = 'dashboard.png') {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}

export async function shareImage(blob: Blob, title: string = 'Jamaica Traffic Ticket Dashboard') {
  if (navigator.share && navigator.canShare) {
    const file = new File([blob], 'dashboard.png', { type: 'image/png' })

    if (navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title,
          text: 'Check out my traffic ticket dashboard',
          files: [file],
        })
        return true
      } catch (error) {
        // User cancelled or error
        console.log('Share cancelled or error:', error)
        return false
      }
    }
  }

  return false
}
