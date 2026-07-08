/**
 * ContentContext — stratul de conținut personalizabil per-prospect.
 *
 * - fără `?v=` → conținutul default e furnizat SINCRON (zero gate, zero
 *   regresie pentru traficul normal).
 * - `?v=<slug>` (validat /^[a-z0-9-]{1,64}$/) → NU randăm nimic până când
 *   public/variants/<slug>.json e încărcat și deep-merge-uit peste default;
 *   la 404/eroare → console.warn + default.
 *
 * IMPORTANT (animații): tot ce măsoară/împarte text la mount (reveal-uri,
 * DurereStack care măsoară top-urile cardurilor, scroll-handlers, Lenis din
 * App) trăiește SUB provider — copiii se montează abia după ce conținutul
 * final există, deci toate animațiile se inițializează pe textul final.
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import defaultContent from './default.json'

export type Content = typeof defaultContent

const Ctx = createContext<Content>(defaultContent)

export function useContent(): Content {
  return useContext(Ctx)
}

const SLUG_RE = /^[a-z0-9-]{1,64}$/

function variantSlug(): string | null {
  const v = new URLSearchParams(window.location.search).get('v')
  return v && SLUG_RE.test(v) ? v : null
}

const isObj = (x: unknown): x is Record<string, unknown> =>
  typeof x === 'object' && x !== null && !Array.isArray(x)

/** obiectele se combină recursiv; array-urile și scalarii se înlocuiesc integral; cheile `_*` se sar */
function deepMerge<T>(base: T, patch: unknown): T {
  if (!isObj(base)) return (patch === undefined ? base : patch) as T
  if (!isObj(patch)) return base
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) }
  for (const k of Object.keys(patch)) {
    if (k.startsWith('_')) continue
    out[k] = k in out ? deepMerge(out[k], patch[k]) : patch[k]
  }
  return out as T
}

export function ContentProvider({ children }: { children: ReactNode }) {
  // fără variantă → default imediat (sincron); cu variantă → null până la fetch
  const [content, setContent] = useState<Content | null>(() => (variantSlug() ? null : defaultContent))

  useEffect(() => {
    const slug = variantSlug()
    if (!slug) return
    let alive = true
    fetch(import.meta.env.BASE_URL + 'variants/' + slug + '.json')
      .then((r) => {
        if (!r.ok) throw new Error('HTTP ' + r.status)
        return r.json()
      })
      .then((patch) => {
        if (alive) setContent(deepMerge(defaultContent, patch))
      })
      .catch((err) => {
        console.warn(`[content] varianta „${slug}" nu s-a putut încărca — folosesc conținutul default.`, err)
        if (alive) setContent(defaultContent)
      })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    const title = content?.meta?.title
    if (title && document.title !== title) document.title = title
  }, [content])

  if (!content) return null
  return <Ctx.Provider value={content}>{children}</Ctx.Provider>
}
