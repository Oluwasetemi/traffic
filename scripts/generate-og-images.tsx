import { ImageResponse } from '@vercel/og'
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import React from 'react'

interface OGImageConfig {
  path: string
  title: string
  subtitle: string
  description: string
  gradient: string
  logoColor: string
}

const ogConfigs: OGImageConfig[] = [
  {
    path: 'root',
    title: 'Jamaica Traffic Ticket Dashboard',
    subtitle: '',
    description: 'Look up and manage traffic tickets in Jamaica',
    gradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    logoColor: '#1e40af',
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    subtitle: 'Jamaica Traffic Ticket Dashboard',
    description: 'View your tickets, fines, and demerit points',
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    logoColor: '#059669',
  },
  {
    path: 'lookup',
    title: 'License Validation',
    subtitle: 'Jamaica Traffic Ticket Dashboard',
    description: 'Validate your license and look up traffic tickets',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
    logoColor: '#7c3aed',
  },
  {
    path: 'offences',
    title: 'Traffic Offences & Fines',
    subtitle: 'Jamaica Traffic Ticket Dashboard',
    description: 'Complete reference of violations and demerit points',
    gradient: 'linear-gradient(135deg, #dc2626 0%, #f87171 100%)',
    logoColor: '#dc2626',
  },
  {
    path: 'payment',
    title: 'How to Pay Traffic Tickets',
    subtitle: 'Jamaica Traffic Ticket Dashboard',
    description: 'Multiple convenient payment options available',
    gradient: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
    logoColor: '#0891b2',
  },
]

async function generateOGImage(config: OGImageConfig) {
  const { title, subtitle, description, gradient, logoColor } = config

  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          background: gradient,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
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
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold',
              color: logoColor,
            }}
          >
            JM
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: subtitle ? '20px' : '20px',
            paddingLeft: '60px',
            paddingRight: '60px',
          }}
        >
          {title}
        </div>

        {/* Subtitle (if exists) */}
        {subtitle && (
          <div
            style={{
              fontSize: '32px',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.95)',
              textAlign: 'center',
              marginBottom: '20px',
              paddingLeft: '60px',
              paddingRight: '60px',
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Description */}
        <div
          style={{
            fontSize: '28px',
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            maxWidth: '800px',
            paddingLeft: '60px',
            paddingRight: '60px',
          }}
        >
          {description}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )

  return imageResponse
}

async function main() {
  console.log('🎨 Generating OG images...\n')

  // Create output directory
  const outputDir = join(process.cwd(), 'public', 'og-images')
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true })
    console.log(`✅ Created directory: ${outputDir}\n`)
  }

  // Generate images
  for (const config of ogConfigs) {
    try {
      console.log(`⏳ Generating ${config.path} OG image...`)

      const imageResponse = await generateOGImage(config)
      const arrayBuffer = await imageResponse.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const fileName = config.path === 'root' ? 'opengraph-image.png' : `${config.path}-og.png`
      const filePath = join(outputDir, fileName)

      await writeFile(filePath, buffer)

      console.log(`✅ Generated: ${fileName}`)
      console.log(`   Path: ${filePath}`)
      console.log(`   Size: ${(buffer.length / 1024).toFixed(2)} KB\n`)
    } catch (error) {
      console.error(`❌ Error generating ${config.path} OG image:`, error)
    }
  }

  console.log('🎉 All OG images generated successfully!')
  console.log(`📂 Output directory: ${outputDir}`)
}

main().catch((error) => {
  console.error('❌ Script failed:', error)
  process.exit(1)
})
