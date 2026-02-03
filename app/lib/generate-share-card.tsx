/**
 * Generate shareable 16:9 report card using Takumi
 * This creates a beautiful, personalized image for social sharing
 */

interface ShareCardData {
  totalTickets: number
  outstanding: number
  paid: number
  totalOutstanding: number
  demeritPoints: number
  userName?: string
}

export function getDriverStatus(demeritPoints: number, totalTickets: number) {
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

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-JM', {
    style: 'currency',
    currency: 'JMD',
  }).format(amount).replace('$', 'JMD $')
}

// React component for Takumi ImageResponse
export function ShareCardComponent({ data }: { data: ShareCardData }) {
  const status = getDriverStatus(data.demeritPoints, data.totalTickets)
  const today = new Date().toLocaleDateString('en-JM', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
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
        }}
      >
        <div style={{ flex: 1, background: '#009B3A' }} />
        <div style={{ flex: 1, background: '#FFC72C' }} />
        <div style={{ flex: 1, background: '#000000' }} />
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: 'white',
                  lineHeight: 1,
                }}
              >
                Traffic Ticket Report Card
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginTop: 8,
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
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ fontSize: 40 }}>{status.emoji}</span>
              {status.status}
            </div>
            {data.userName && (
              <div
                style={{
                  fontSize: 20,
                  color: 'rgba(255, 255, 255, 0.5)',
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
            }}
          >
            Jamaica Traffic Ticket Dashboard built by @setemiojo
          </div>
          <div
            style={{
              fontSize: 20,
              color: 'rgba(255, 255, 255, 0.3)',
              fontStyle: 'italic',
            }}
          >
            🇯🇲 Drive Safe, Stay Clean
          </div>
        </div>
      </div>
    </div>
  )
}
