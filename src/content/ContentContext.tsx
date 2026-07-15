import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import defaultContent from './default.json'

/**
 * Stratul de conținut — versiunea SUPABASE (Lovable nativ), TypeScript.
 * Variantele se citesc LIVE din view-ul `landing_variants_public` (scris de edge
 * function-ul generate-landing). Fără redeploy.
 *
 * ⚙️ COMPLETEAZĂ cele două constante cu valorile proiectului Supabase AL QUIZULUI
 * (Supabase → Project Settings → API). Direct aici, NU ca variabile de mediu — Lovable
 * nu expune VITE_ pentru frontend; cheia anon/publishable e publică (sigură în bundle).
 */
const SUPABASE_URL = 'https://mfgsmjqvcwhspbsvqaam.supabase.co'   // ← URL-ul Supabase al quizului
const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mZ3NtanF2Y3doc3Bic3ZxYWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MDIwMTAsImV4cCI6MjA5MDM3ODAxMH0.4uRBv-4oyGwpUC3rrCpJXYxIlJqt4nbwHxMaXuWc0tc'      // ← anon / publishable key (publică)

type Content = typeof defaultContent
const ContentContext = createContext<Content>(defaultContent)
export function useContent(): Content {
  return useContext(ContentContext)
}

const SLUG_RE = /^[a-z0-9-]{1,64}$/

function variantSlug(): string | null {
  if (typeof window === 'undefined') return null
  const v = new URLSearchParams(window.location.search).get('v')
  return v && SLUG_RE.test(v) ? v : null
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === 'object' && !Array.isArray(v)

function deepMerge(base: any, override: any): any {
  if (!isPlainObject(base) || !isPlainObject(override)) return override
  const out: any = { ...base }
  for (const [key, value] of Object.entries(override)) {
    if (key.startsWith('_')) continue
    out[key] = deepMerge(base[key], value)
  }
  return out
}

async function fetchVarianta(slug: string): Promise<any | null> {
  if (SUPABASE_URL.includes('PROIECTUL-TAU') || ANON.includes('PUNE-CHEIA')) {
    console.warn('[content] Completează SUPABASE_URL și ANON în ContentContext — rămân pe implicit.')
    return null
  }
  const url = `${SUPABASE_URL}/rest/v1/landing_variants_public?slug=eq.${encodeURIComponent(slug)}&select=patch,status`
  const res = await fetch(url, { headers: { apikey: ANON, Authorization: `Bearer ${ANON}` } })
  if (!res.ok) throw new Error(`Supabase ${res.status}`)
  const rows = await res.json()
  const rand = rows[0]
  if (!rand || rand.status !== 'done' || !rand.patch) return null
  return rand.patch
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [slug] = useState(variantSlug)
  const [content, setContent] = useState<Content | null>(() => (slug ? null : defaultContent))

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    fetchVarianta(slug)
      .then((patch) => {
        if (cancelled) return
        setContent(patch ? deepMerge(defaultContent, patch) : defaultContent)
      })
      .catch((err) => {
        console.warn(`[content] Varianta „${slug}" nu s-a încărcat — rămân pe implicit.`, err)
        if (!cancelled) setContent(defaultContent)
      })
    return () => { cancelled = true }
  }, [slug])

  useEffect(() => {
    const title = (content as any)?.meta?.title
    if (title && title !== document.title) document.title = title
  }, [content])

  if (!content) return null
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}
