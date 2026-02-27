import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'
export const alt = 'Mindzy - Solutions digitales sur mesure pour entrepreneurs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logoBuffer = await readFile(path.join(process.cwd(), 'public/android-chrome-512x512.png'))
  const logoSrc = `data:image/png;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4C1D95 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          {/* Logo + Name row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              width={100}
              height={100}
              style={{ borderRadius: 20 }}
              alt=""
            />
            <div
              style={{
                fontSize: 88,
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-3px',
                lineHeight: 1,
              }}
            >
              Mindzy
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 32,
              color: '#C4B5FD',
              textAlign: 'center',
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Sites web premium pour thérapeutes &amp; entrepreneurs
          </div>

          {/* URL pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 999,
              padding: '12px 28px',
              fontSize: 22,
              color: '#A78BFA',
              letterSpacing: '1px',
            }}
          >
            mindzy.me
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
