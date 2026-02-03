/**
 * Server-side image renderer using @vercel/og API route
 * Generates beautiful shareable images from card data
 */

interface CardData {
  totalTickets: number
  outstanding: number
  paid: number
  totalOutstanding: number
  demeritPoints: number
  userName?: string
}

export async function renderComponentToImage(
  _component: React.ReactElement<{ data: CardData }>,
  _options?: {
    width?: number
    height?: number
    format?: 'png' | 'jpeg' | 'webp'
    quality?: number
    mobile?: boolean
  }
): Promise<string> {
  try {
    // Extract data from component props
    const data = (_component.props as { data: CardData }).data
    const isMobile = _options?.mobile || false

    const url = isMobile ? '/api/generate-report-card?mobile=true' : '/api/generate-report-card'

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to generate image')
    }

    // Convert response to blob then to data URL
    const blob = await response.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error('Report card generation error:', error)
    throw new Error('Failed to generate share image')
  }
}

export async function renderComponentToBlob(
  _component: React.ReactElement<{ data: CardData }>,
  _options?: {
    width?: number
    height?: number
    format?: 'png' | 'jpeg' | 'webp'
    quality?: number
    mobile?: boolean
  }
): Promise<Blob> {
  try {
    // Extract data from component props
    const data = (_component.props as { data: CardData }).data
    const isMobile = _options?.mobile || false

    const url = isMobile ? '/api/generate-report-card?mobile=true' : '/api/generate-report-card'

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to generate image')
    }

    return await response.blob()
  } catch (error) {
    console.error('Report card generation error:', error)
    throw new Error('Failed to generate share image')
  }
}
