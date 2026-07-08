#!/usr/bin/env node
// One-shot cover image generator for lead-magnet ebooks.
// Usage: OPENROUTER_API_KEY=sk-or-... node scripts/generate-ebook-image.mjs
//
// No external deps. Calls OpenRouter chat completions with the
// google/gemini-2.5-flash-image model and writes the returned base64
// image to public/images/ebooks/<slug>.png.

import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SLUG = 'ai-act-2026-europe'
const MODEL = 'google/gemini-2.5-flash-image'
const OUT_DIR = 'public/images/ebooks'
const OUT_PATH = join(OUT_DIR, `${SLUG}.png`)
const PROMPT = `Editorial flat-lay of the European AI Act: a 2026 EU regulation document with the European flag, a neural network diagram overlay, legal gavel, and gold-accented typography. Clean dark-violet background, premium 3D render, soft studio lighting, 1:1 aspect, 1024x1024, French typography accent. No text on the cover itself.`

const apiKey = process.env.OPENROUTER_API_KEY
if (!apiKey) {
  console.error('Missing OPENROUTER_API_KEY. Set it in your env or .env.local.')
  console.error('Usage: OPENROUTER_API_KEY=sk-or-... node scripts/generate-ebook-image.mjs')
  process.exit(1)
}

const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://mindzy.me',
    'X-Title': 'Mindzy Ebook Cover Generator',
  },
  body: JSON.stringify({
    model: MODEL,
    messages: [{ role: 'user', content: PROMPT }],
    modalities: ['image', 'text'],
  }),
})

if (!res.ok) {
  const body = await res.text()
  console.error(`OpenRouter HTTP ${res.status}: ${body}`)
  process.exit(1)
}

const data = await res.json()
const message = data?.choices?.[0]?.message
if (!message) {
  console.error('OpenRouter response had no message:', JSON.stringify(data).slice(0, 500))
  process.exit(1)
}

// Image can be returned as a base64 data URL on message.images[], or on
// message.content when content is an array of parts. Handle both shapes.
let dataUrl = null
if (Array.isArray(message.images) && message.images[0]?.image_url?.url) {
  dataUrl = message.images[0].image_url.url
} else if (Array.isArray(message.content)) {
  const part = message.content.find(p => p?.type === 'image_url' && p.image_url?.url)
  if (part) dataUrl = part.image_url.url
}

if (!dataUrl || !dataUrl.startsWith('data:image/')) {
  console.error('No image data in response. Full message:')
  console.error(JSON.stringify(message, null, 2).slice(0, 1000))
  process.exit(1)
}

const match = dataUrl.match(/^data:image\/\w+;base64,(.+)$/s)
if (!match) {
  console.error('Unexpected image data URL format:', dataUrl.slice(0, 60))
  process.exit(1)
}

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(OUT_PATH, Buffer.from(match[1], 'base64'))
const sizeKb = (Buffer.from(match[1], 'base64').length / 1024).toFixed(1)
console.log(`Wrote ${OUT_PATH} (${sizeKb} KB) from model ${MODEL}.`)
