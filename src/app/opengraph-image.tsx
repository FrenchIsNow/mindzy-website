import { ImageResponse } from 'next/og'

export const alt = 'Mindzy - Solutions digitales sur mesure pour entrepreneurs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-2px',
          }}
        >
          Mindzy
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#C4B5FD',
            marginTop: 24,
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          Solutions digitales sur mesure pour entrepreneurs
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#A78BFA',
            marginTop: 40,
            letterSpacing: '1px',
          }}
        >
          mindzy.me
        </div>
      </div>
    ),
    { ...size }
  )
}
