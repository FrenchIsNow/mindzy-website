/**
 * Translation via OpenRouter (OpenAI-compatible /chat/completions).
 * Uses moonshotai/kimi-k2 — solid FR/EN/ES quality at low cost.
 * Configure model via OPENROUTER_MODEL if you want to try a different one.
 */

const DEFAULT_MODEL = 'moonshotai/kimi-k2'
const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions'

export type Locale = 'fr' | 'en' | 'es'

const LOCALE_NAMES: Record<Locale, string> = {
  fr: 'French',
  en: 'English',
  es: 'Spanish',
}

function getOpenRouterKey(): string {
  const key = process.env.OPENROUTER_API_KEY
  if (!key) throw new Error('OPENROUTER_API_KEY not set')
  return key
}

/**
 * Translates a JSON object from one locale to another, preserving the exact shape.
 * Only string values are translated; numbers, booleans, URLs, and keys stay intact.
 */
export async function translateJson<T extends object>(
  input: T,
  sourceLocale: Locale,
  targetLocale: Locale,
  opts?: { context?: string },
): Promise<T> {
  if (sourceLocale === targetLocale) return input

  const key = getOpenRouterKey()
  const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL

  const system = [
    `You are a professional translator specializing in marketing copy.`,
    `Translate all string values from ${LOCALE_NAMES[sourceLocale]} to ${LOCALE_NAMES[targetLocale]}.`,
    `Preserve the exact JSON shape and all keys. Do NOT translate:`,
    `- URLs (strings starting with http, https, mailto, /, #)`,
    `- Slugs (ASCII lowercase with hyphens, no spaces)`,
    `- Hex colors, IDs, numbers, booleans, null values.`,
    opts?.context ? `Context: ${opts.context}` : '',
    `Return ONLY the translated JSON object. No preamble, no code fences.`,
  ].filter(Boolean).join('\n')

  const user = `Translate this JSON to ${LOCALE_NAMES[targetLocale]}:\n\n${JSON.stringify(input, null, 2)}`

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://mindzy.me',
      'X-Title': 'Mindzy Dashboard',
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(`OpenRouter ${res.status}: ${errText.slice(0, 300)}`)
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>
    error?: { message?: string }
  }
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error(data.error?.message || 'Empty response from OpenRouter')

  // Strip any ``` fences just in case.
  const cleaned = content.trim().replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/```$/, '')

  try {
    return JSON.parse(cleaned) as T
  } catch {
    throw new Error(`Could not parse translated JSON: ${cleaned.slice(0, 200)}`)
  }
}

/** Translate a single string (for titles, short labels). */
export async function translateText(
  text: string,
  sourceLocale: Locale,
  targetLocale: Locale,
): Promise<string> {
  if (!text || sourceLocale === targetLocale) return text
  const out = await translateJson({ t: text }, sourceLocale, targetLocale)
  return (out as { t: string }).t || text
}
