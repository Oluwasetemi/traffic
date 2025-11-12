import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Traffic Offences & Fines - Jamaica Traffic Ticket Dashboard'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #f87171 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '16px',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#dc2626',
            }}
          >
            JM
          </div>
        </div>

        <div
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          Traffic Offences & Fines
        </div>
        <div
          style={{
            fontSize: '32px',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.95)',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          Jamaica Traffic Ticket Dashboard
        </div>

        <div
          style={{
            fontSize: '28px',
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
          }}
        >
          Complete reference of violations and demerit points
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
