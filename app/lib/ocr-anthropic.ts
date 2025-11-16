import type { ExtractedLicenseData } from '../types/ocr'

/**
 * Extract text from license using Claude Vision via API route
 * @param image - Base64 image data URL
 * @param side - Which side of the license
 * @returns Extracted license data
 */
export async function extractLicenseWithClaude(
  image: string,
  side: 'front' | 'back'
): Promise<ExtractedLicenseData> {
  console.log('[Claude OCR] Starting extraction for', side, 'side via API route')

  try {
    // Call our Next.js API route instead of calling Anthropic directly
    // This avoids CORS issues since the API route runs server-side
    const response = await fetch('/api/ocr-claude', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image,
        side,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
      throw new Error(errorData.error || `API request failed with status ${response.status}`)
    }

    const result: ExtractedLicenseData = await response.json()
    console.log('[Claude OCR] Extracted data:', result)
    return result

  } catch (error) {
    console.error('[Claude OCR] Error:', error)
    throw new Error(`Claude OCR failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}