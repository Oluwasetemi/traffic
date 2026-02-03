import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Jamaica Traffic Ticket Dashboard';
    const description = searchParams.get('description') || 'Look up and manage traffic tickets in Jamaica';
    const subtitle = searchParams.get('subtitle') || '';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #000000 0%, #009B3A 50%, #FFC72C 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              maxWidth: '1000px',
            }}
          >
            {/* Logo */}
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #009B3A 0%, #FFC72C 100%)',
                  color: '#000000',
                }}
              >
                JM
              </div>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: 64,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                marginBottom: subtitle ? '20px' : '30px',
                lineHeight: 1.1,
                paddingLeft: '60px',
                paddingRight: '60px',
              }}
            >
              {title}
            </div>

            {/* Subtitle (optional) */}
            {subtitle && (
              <div
                style={{
                  fontSize: 32,
                  fontWeight: '600',
                  color: 'rgba(255, 255, 255, 0.95)',
                  textAlign: 'center',
                  marginBottom: '20px',
                }}
              >
                {subtitle}
              </div>
            )}

            {/* Description */}
            <div
              style={{
                fontSize: 28,
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
                lineHeight: 1.4,
                paddingLeft: '60px',
                paddingRight: '60px',
              }}
            >
              {description}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    return new Response('Failed to generate the image', { status: 500 });
  }
}
