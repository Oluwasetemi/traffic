import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// Test endpoint
// Mobile version (9:16 portrait for Stories)
function generateMobileCard(data: CardData, status: ReturnType<typeof getDriverStatus>, today: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, #000000 0%, #1a1a1a 100%)',
          position: 'relative',
        }}
      >
        {/* Jamaica flag accent bar */}
        <div
          style={{
            width: '100%',
            height: 12,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div style={{ flex: 1, background: '#009B3A', display: 'flex' }} />
          <div style={{ flex: 1, background: '#FFC72C', display: 'flex' }} />
          <div style={{ flex: 1, background: '#000000', display: 'flex' }} />
        </div>

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 60,
            flex: 1,
            gap: 40,
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: 24,
                background: 'linear-gradient(135deg, #009B3A 0%, #FFC72C 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 60,
                fontWeight: 'bold',
                color: '#000000',
              }}
            >
              JM
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                  display: 'flex',
                }}
              >
                Traffic Ticket Report Card
              </div>
              <div style={{ fontSize: 24, color: 'rgba(255, 255, 255, 0.6)', display: 'flex' }}>
                {today}
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              padding: 30,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 24,
              border: '2px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ fontSize: 80, display: 'flex' }}>{status.emoji}</div>
            <div style={{ fontSize: 40, fontWeight: 'bold', color: status.color, display: 'flex' }}>
              {status.status}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
            {/* Total Tickets */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 20,
                padding: 30,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '2px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={{ fontSize: 24, color: 'rgba(255, 255, 255, 0.6)', display: 'flex' }}>
                Total Tickets
              </div>
              <div style={{ fontSize: 56, fontWeight: 'bold', color: 'white', display: 'flex' }}>
                {data.totalTickets}
              </div>
            </div>

            {/* Outstanding */}
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: 20,
                padding: 30,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '2px solid rgba(239, 68, 68, 0.3)',
              }}
            >
              <div style={{ fontSize: 24, color: 'rgba(239, 68, 68, 0.8)', display: 'flex' }}>
                Outstanding
              </div>
              <div style={{ fontSize: 56, fontWeight: 'bold', color: '#EF4444', display: 'flex' }}>
                {data.outstanding}
              </div>
            </div>

            {/* Paid */}
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: 20,
                padding: 30,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '2px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <div style={{ fontSize: 24, color: 'rgba(16, 185, 129, 0.8)', display: 'flex' }}>
                Paid
              </div>
              <div style={{ fontSize: 56, fontWeight: 'bold', color: '#10B981', display: 'flex' }}>
                {data.paid}
              </div>
            </div>

            {/* Demerit Points */}
            <div
              style={{
                background: 'rgba(255, 199, 44, 0.1)',
                borderRadius: 20,
                padding: 30,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '2px solid rgba(255, 199, 44, 0.3)',
              }}
            >
              <div style={{ fontSize: 24, color: 'rgba(255, 199, 44, 0.9)', display: 'flex' }}>
                Demerit Points
              </div>
              <div style={{ fontSize: 56, fontWeight: 'bold', color: '#FFC72C', display: 'flex' }}>
                {data.demeritPoints}
              </div>
            </div>

            {/* Total Owed */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(0, 155, 58, 0.15) 0%, rgba(255, 199, 44, 0.15) 100%)',
                borderRadius: 20,
                padding: 30,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                border: '2px solid rgba(0, 155, 58, 0.3)',
              }}
            >
              <div style={{ fontSize: 24, color: 'rgba(255, 255, 255, 0.6)', display: 'flex' }}>
                Total Owed
              </div>
              <div style={{ fontSize: 40, fontWeight: 'bold', color: 'white', display: 'flex' }}>
                {formatCurrency(data.totalOutstanding)}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              paddingTop: 20,
              borderTop: '2px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.4)', display: 'flex' }}>
              Jamaica Traffic Ticket Dashboard built by @setemiojo
            </div>
            <div style={{ fontSize: 18, color: 'rgba(255, 255, 255, 0.3)', display: 'flex' }}>
              🇯🇲 Drive Safe, Stay Clean
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
    }
  )
}

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #000000 0%, #009B3A 50%, #FFC72C 100%)',
          }}
        >
          <div style={{ fontSize: 64, color: 'white', fontWeight: 'bold' }}>
            Test Card ✅
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('Test error:', error)
    return new Response('Test failed: ' + String(error), { status: 500 })
  }
}

interface CardData {
  totalTickets: number
  outstanding: number
  paid: number
  totalOutstanding: number
  demeritPoints: number
  userName?: string
}

function getDriverStatus(demeritPoints: number, totalTickets: number) {
  if (demeritPoints >= 20) {
    return { status: 'At Risk', color: '#EF4444', emoji: '⚠️' }
  } else if (demeritPoints >= 14) {
    return { status: 'Caution', color: '#F59E0B', emoji: '⚡' }
  } else if (demeritPoints >= 10) {
    return { status: 'Warning', color: '#F59E0B', emoji: '⚠️' }
  } else if (demeritPoints >= 7) {
    return { status: 'Monitor', color: '#3B82F6', emoji: '👀' }
  } else if (totalTickets === 0) {
    return { status: 'Perfect', color: '#10B981', emoji: '🌟' }
  } else if (demeritPoints === 0) {
    return { status: 'Clean', color: '#10B981', emoji: '✅' }
  } else {
    return { status: 'Good', color: '#10B981', emoji: '👍' }
  }
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-JM', {
    style: 'currency',
    currency: 'JMD',
  }).format(amount).replace('$', 'JMD $')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    console.log('Received report card generation request')

    const data: CardData = JSON.parse(body)

    // Validate required fields
    if (typeof data.totalTickets !== 'number' ||
        typeof data.outstanding !== 'number' ||
        typeof data.paid !== 'number' ||
        typeof data.totalOutstanding !== 'number' ||
        typeof data.demeritPoints !== 'number') {
      return new Response(JSON.stringify({ error: 'Invalid card data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log('Generating card for tickets:', data.totalTickets)

    // Check if mobile version is requested
    const url = new URL(request.url)
    const isMobile = url.searchParams.get('mobile') === 'true'

    const status = getDriverStatus(data.demeritPoints, data.totalTickets)
    const today = new Date().toLocaleDateString('en-JM', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    console.log('Starting ImageResponse generation...', isMobile ? 'MOBILE' : 'DESKTOP')

    // Return mobile version if requested
    if (isMobile) {
      return generateMobileCard(data, status, today)
    }

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            position: 'relative',
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
            overflow: 'hidden',
          }}
        >
          {/* Decorative background elements */}
          <div
            style={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: 500,
              height: 500,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0, 155, 58, 0.15) 0%, transparent 70%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -150,
              left: -150,
              width: 600,
              height: 600,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 199, 44, 0.1) 0%, transparent 70%)',
            }}
          />

          {/* Jamaica flag accent bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 8,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div style={{ flex: 1, background: '#009B3A', display: 'flex' }} />
            <div style={{ flex: 1, background: '#FFC72C', display: 'flex' }} />
            <div style={{ flex: 1, background: '#000000', display: 'flex' }} />
          </div>

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              padding: 80,
              position: 'relative',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 40,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                {/* Logo */}
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, #009B3A 0%, #FFC72C 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 40,
                    fontWeight: 'bold',
                    color: '#000000',
                  }}
                >
                  JM
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div
                    style={{
                      fontSize: 48,
                      fontWeight: 'bold',
                      color: 'white',
                      lineHeight: 1,
                      display: 'flex',
                    }}
                  >
                    Traffic Ticket Report Card
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      color: 'rgba(255, 255, 255, 0.6)',
                      display: 'flex',
                    }}
                  >
                    {today}
                  </div>
                </div>
              </div>

              {/* Status badge */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 8,
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: status.color,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 40, display: 'flex' }}>{status.emoji}</span>
                  <span style={{ display: 'flex' }}>{status.status}</span>
                </div>
                {data.userName && (
                  <div
                    style={{
                      fontSize: 20,
                      color: 'rgba(255, 255, 255, 0.5)',
                      display: 'flex',
                    }}
                  >
                    {data.userName}
                  </div>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 24,
                flex: 1,
                marginBottom: 40,
              }}
            >
              {/* Total Tickets */}
              <div
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 24,
                  padding: 40,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    color: 'rgba(255, 255, 255, 0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                    display: 'flex',
                  }}
                >
                  Total Tickets
                </div>
                <div
                  style={{
                    fontSize: 96,
                    fontWeight: 'bold',
                    color: 'white',
                    lineHeight: 1,
                    display: 'flex',
                  }}
                >
                  {data.totalTickets}
                </div>
              </div>

              {/* Outstanding/Paid */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 24,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    background: 'rgba(239, 68, 68, 0.1)',
                    borderRadius: 24,
                    padding: 40,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '2px solid rgba(239, 68, 68, 0.3)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      color: 'rgba(239, 68, 68, 0.8)',
                      textTransform: 'uppercase',
                      letterSpacing: 2,
                      display: 'flex',
                    }}
                  >
                    Outstanding
                  </div>
                  <div
                    style={{
                      fontSize: 72,
                      fontWeight: 'bold',
                      color: '#EF4444',
                      lineHeight: 1,
                      display: 'flex',
                    }}
                  >
                    {data.outstanding}
                  </div>
                </div>

                <div
                  style={{
                    flex: 1,
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: 24,
                    padding: 40,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '2px solid rgba(16, 185, 129, 0.3)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      color: 'rgba(16, 185, 129, 0.8)',
                      textTransform: 'uppercase',
                      letterSpacing: 2,
                      display: 'flex',
                    }}
                  >
                    Paid
                  </div>
                  <div
                    style={{
                      fontSize: 72,
                      fontWeight: 'bold',
                      color: '#10B981',
                      lineHeight: 1,
                      display: 'flex',
                    }}
                  >
                    {data.paid}
                  </div>
                </div>
              </div>

              {/* Demerit Points & Amount */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 24,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    background: 'rgba(255, 199, 44, 0.1)',
                    borderRadius: 24,
                    padding: 40,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '2px solid rgba(255, 199, 44, 0.3)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      color: 'rgba(255, 199, 44, 0.9)',
                      textTransform: 'uppercase',
                      letterSpacing: 2,
                      display: 'flex',
                    }}
                  >
                    Demerit Points
                  </div>
                  <div
                    style={{
                      fontSize: 72,
                      fontWeight: 'bold',
                      color: '#FFC72C',
                      lineHeight: 1,
                      display: 'flex',
                    }}
                  >
                    {data.demeritPoints}
                  </div>
                </div>

                <div
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, rgba(0, 155, 58, 0.15) 0%, rgba(255, 199, 44, 0.15) 100%)',
                    borderRadius: 24,
                    padding: 40,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '2px solid rgba(0, 155, 58, 0.3)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      color: 'rgba(255, 255, 255, 0.6)',
                      textTransform: 'uppercase',
                      letterSpacing: 2,
                      display: 'flex',
                    }}
                  >
                    Total Owed
                  </div>
                  <div
                    style={{
                      fontSize: 48,
                      fontWeight: 'bold',
                      color: 'white',
                      lineHeight: 1,
                      display: 'flex',
                    }}
                  >
                    {formatCurrency(data.totalOutstanding)}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 32,
                borderTop: '2px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  color: 'rgba(255, 255, 255, 0.4)',
                  display: 'flex',
                }}
              >
                Jamaica Traffic Ticket Dashboard built by @setemiojo
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: 'rgba(255, 255, 255, 0.3)',
                  fontStyle: 'italic',
                  display: 'flex',
                }}
              >
                🇯🇲 Drive Safe, Stay Clean
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1920,
        height: 1080,
      }
    )
  } catch (error) {
    console.error('Report card generation error:', error)
    console.error('Error details:', error instanceof Error ? error.message : String(error))
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')

    return new Response(JSON.stringify({
      error: 'Failed to generate report card',
      message: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
