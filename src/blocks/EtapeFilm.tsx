/**
 * EtapeFilm — Metoda ca FILM PE SCROLL.
 *  • INTRO (primele ~13% din scroll): imaginea vine din mic (framed, colțuri
 *    rotunjite) → fullscreen (scale 0.42→1, radius 26→0), textul apare abia
 *    când zoom-ul e gata. (efect „spotlight" cerut de user)
 *  • ETAPE: 6 imagini full-viewport, crossfade + scale-settle subtil + parallax,
 *    text overlay și progress rail care se schimbă cu etapa.
 * Wrapper înalt (N+1 ecrane) + inner sticky 100svh. Imagini: /etape/etapa-{1..6}.jpg
 * (userul le poate înlocui cu originalele, același nume). Reduced-motion: static.
 */
import { useEffect, useRef, useState } from 'react'

export type Etapa = { t: string; d: string }
const IMGS = [1, 2, 3, 4, 5, 6].map((n) => `/etape/etapa-${n}.jpg`)
const INTRO = 0.13 // fracțiunea de scroll dedicată zoom-ului

export default function EtapeFilm({ items }: { items: Etapa[] }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])
  const [idx, setIdx] = useState(0)
  const N = items.length

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const stage = stageRef.current, content = contentRef.current
    if (reduce) { if (stage) stage.style.transform = 'none'; if (content) content.style.opacity = '1'; return }
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const wrap = wrapRef.current
        if (!wrap || !stage) return
        const total = wrap.offsetHeight - window.innerHeight
        const p = Math.max(0, Math.min(1, -wrap.getBoundingClientRect().top / Math.max(1, total)))

        if (p < INTRO) {
          // ── faza zoom: mic → fullscreen ──
          const t = p / INTRO
          const e = 1 - Math.pow(1 - t, 3) // ease-out
          stage.style.transform = `scale(${(0.42 + 0.58 * e).toFixed(4)})`
          stage.style.borderRadius = `${(26 * (1 - e)).toFixed(1)}px`
          if (content) content.style.opacity = String(Math.max(0, (t - 0.62) / 0.38))
          if (idx !== 0) setIdx(0)
        } else {
          // ── etapele ──
          stage.style.transform = 'scale(1)'
          stage.style.borderRadius = '0px'
          if (content) content.style.opacity = '1'
          const q = (p - INTRO) / (1 - INTRO)
          const i = Math.min(N - 1, Math.floor(q * N))
          if (i !== idx) setIdx(i)
          const sub = q * N - i
          const img = imgRefs.current[i]
          if (img) img.style.translate = `0 ${((sub - 0.5) * -1.5).toFixed(2)}%`
        }
      })
    }
    addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [N, idx])

  const et = items[idx]

  return (
    <div ref={wrapRef} style={{ position: 'relative', height: `${(N + 1) * 100}vh` }}>
      <div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden', background: 'var(--abyss)' }}>
        {/* SCENA — se scalează din mic la fullscreen (intro), apoi rămâne full */}
        <div ref={stageRef} className="ef-stage">
          {IMGS.slice(0, N).map((src, k) => (
            <img key={k} ref={(el) => { imgRefs.current[k] = el }} src={src} alt="" loading={k < 2 ? 'eager' : 'lazy'} className={`ef-img${k === idx ? ' on' : ''}`} />
          ))}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,10,6,0.86) 0%, rgba(14,10,6,0.18) 45%, rgba(14,10,6,0.42) 100%)' }} />
          <div className="grain" aria-hidden />
        </div>

        {/* CONȚINUTUL (nu se scalează) — apare după zoom */}
        <div ref={contentRef} className="ef-content" style={{ opacity: 0 }}>
          <div className="container" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'flex-end' }}>
            <div key={idx} className="ef-text" style={{ paddingBottom: 'clamp(56px,9vh,96px)', maxWidth: 640 }}>
              <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 14 }}>Etapa {String(idx + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,4.6vw,52px)', fontWeight: 400, lineHeight: 1.14, marginBottom: 14, textShadow: '0 2px 18px rgba(0,0,0,0.35)' }}>{et.t}</h3>
              <p className="balance" style={{ fontSize: 'clamp(15px,1.8vw,18px)', lineHeight: 1.55, color: 'rgba(241,234,217,0.82)', maxWidth: '52ch', textShadow: '0 1px 12px rgba(0,0,0,0.35)' }}>{et.d}</p>
            </div>
          </div>
          <div className="ef-rail" aria-hidden>
            {items.map((_, k) => <span key={k} className={`ef-seg${k <= idx ? ' on' : ''}`} />)}
          </div>
          <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', zIndex: 2, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Derulează</div>
        </div>
      </div>
    </div>
  )
}
