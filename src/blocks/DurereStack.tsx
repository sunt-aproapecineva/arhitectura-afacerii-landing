/**
 * DurereStack — cele 8 dureri ca STIVĂ pe scroll (port React al ScrollStack,
 * adaptat la brandul nostru). Fiecare durere = un card „liquid glass" care se
 * pinează și se stivuiește; în spate curge discret un „liquid metal" auriu (un
 * singur shader WebGL, sticky, clip la scenă → performant, nu se scurge peste
 * text). Card interactiv: luciu care urmărește cursorul + bordură care se
 * aprinde la hover. Iconiță gold + „0X / 08" (fără cuvântul „durere"), titlu
 * mare, descriere mică → citire rapidă. Legat la Lenis-ul global (nu al doilea).
 * Reduced-motion → static, fără shader.
 */
import { useEffect, useRef, type ReactNode } from 'react'
import { LiquidMetal } from '@paper-design/shaders-react'
import { useContent } from '../content/ContentContext'
import { Rich } from '../content/rich'

const I = (p: ReactNode) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{p}</svg>

// Textele durerilor vin din stratul de conținut (durereStack.items, aceeași ordine); iconițele rămân aici.
const ICONS: ReactNode[] = [
  I(<><path d="M6.5 3.5h3l1.4 3.6-1.8 1.1a11 11 0 0 0 4.7 4.7l1.1-1.8 3.6 1.4v3a1.5 1.5 0 0 1-1.6 1.5A15 15 0 0 1 5 6.1 1.5 1.5 0 0 1 6.5 3.5z" /></>),
  I(<><path d="M4 5h16l-6 7v6l-4-2v-4L4 5z" /></>),
  I(<><path d="M12 3s5 3.2 5 8a5 5 0 0 1-10 0c0-2 .9-3.4 2.3-4.4C9 8.4 10 9.2 11 9c1.4-.3 1-3.4 1-6z" /></>),
  I(<><path d="M4 17l5-6 3.5 3.5L20 6" /><path d="M15 6h5v5" /></>),
  I(<><path d="M12 20s-6.5-4.2-6.5-9A3.5 3.5 0 0 1 12 8.2 3.5 3.5 0 0 1 18.5 11c0 4.8-6.5 9-6.5 9z" /><path d="M12 8.5v4M10 10.5h4" /></>),
  I(<><circle cx="9" cy="7" r="3" /><path d="M3 21v-1a5 5 0 0 1 8-4" /><path d="M15 11l4 3-4 3" /><path d="M19 14h-6" /></>),
  I(<><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 9h16M8 3v4M16 3v4M8 14l2.5 2.5L16 12" /></>),
  I(<><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-5h6v5" /><path d="M9 11h.01M15 11h.01" /></>),
]

// parametrii stivei
const ITEM_DISTANCE = 56
const STACK_DISTANCE = 22
const ITEM_SCALE = 0.024
const BASE_SCALE = 0.88
const STACK_POS = 0.16
const SCALE_END = 0.06
const BLUR = 1.1
const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

export default function DurereStack() {
  const c = useContent()
  const sceneRef = useRef<HTMLDivElement>(null)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    const cards = Array.from(scene.querySelectorAll<HTMLElement>('.ds-card'))
    const endEl = scene.querySelector<HTMLElement>('.ds-end')
    if (!cards.length || !endEl) return

    cards.forEach((c, i) => {
      if (i < cards.length - 1) c.style.marginBottom = `${ITEM_DISTANCE}px`
      c.style.willChange = 'transform, filter'
      c.style.transformOrigin = 'top center'
      c.style.backfaceVisibility = 'hidden'
    })
    if (reduce) return

    const tops: number[] = []
    let endTop = 0
    const measure = () => {
      cards.forEach((c) => { c.style.transform = 'translateZ(0)' })
      void scene.offsetHeight
      const sy = window.scrollY
      cards.forEach((c, i) => { tops[i] = c.getBoundingClientRect().top + sy })
      endTop = endEl.getBoundingClientRect().top + sy
    }

    let raf = 0
    const update = () => {
      const scrollTop = window.scrollY
      const vh = window.innerHeight
      const stackPx = STACK_POS * vh
      const scaleEndPx = SCALE_END * vh
      const pinEnd = endTop - vh / 2

      let topIdx = 0
      cards.forEach((_, j) => { if (scrollTop >= tops[j] - stackPx - STACK_DISTANCE * j) topIdx = j })

      cards.forEach((card, i) => {
        const cardTop = tops[i]
        const triggerStart = cardTop - stackPx - STACK_DISTANCE * i
        const triggerEnd = cardTop - scaleEndPx
        const sp = clamp((scrollTop - triggerStart) / Math.max(1, triggerEnd - triggerStart))
        const scale = 1 - sp * (1 - (BASE_SCALE + i * ITEM_SCALE))

        let ty = 0
        if (scrollTop >= triggerStart && scrollTop <= pinEnd) ty = scrollTop - cardTop + stackPx + STACK_DISTANCE * i
        else if (scrollTop > pinEnd) ty = pinEnd - cardTop + stackPx + STACK_DISTANCE * i

        const blur = i < topIdx ? (topIdx - i) * BLUR : 0
        card.style.transform = `translate3d(0, ${ty.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`
        card.style.filter = blur > 0 ? `blur(${blur.toFixed(1)}px)` : ''
      })
    }

    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    const onResize = () => { measure(); update() }
    measure(); update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onResize)
    const t = setTimeout(onResize, 400)
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onResize); cancelAnimationFrame(raf); clearTimeout(t) }
  }, [reduce])

  const onGlare = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--gx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--gy', `${e.clientY - r.top}px`)
  }

  return (
    <section id="durere" className="section ds" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div style={{ maxWidth: 900, marginInline: 'auto', textAlign: 'center', marginBottom: 'clamp(8px,2vw,20px)' }}>
          <div className="eyebrow reveal" style={{ marginBottom: 18 }}>{c.durereStack.eyebrow}</div>
          <h2 className="h-lg reveal" style={{ textWrap: 'balance' }}>{c.durereStack.headline}</h2>
        </div>
      </div>

      <div ref={sceneRef} className="ds-scene">
        <div className="ds-bg" aria-hidden>
          {!reduce && (
            <LiquidMetal style={{ width: '100%', height: '100%' }} colorBack="#00000000" colorTint="#C9A84C"
              shape="none" speed={0.36} softness={0.5} repetition={2.4} shiftRed={0.1} shiftBlue={0.1} distortion={0.2} contour={0.6} />
          )}
          <div className="ds-bg-veil" />
          <div className="grain" />
        </div>

        <div className="ds-stack container">
          {c.durereStack.items.map((p, i) => (
            <div key={i} className="ds-card" onPointerMove={onGlare}>
              <span className="ds-ghost" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
              <div className="ds-card-in">
                <div className="ds-top">
                  <span className="ds-ico">{ICONS[i]}</span>
                  <span className="ds-idx">{String(i + 1).padStart(2, '0')} <span className="ds-idx-sep">/ {String(c.durereStack.items.length).padStart(2, '0')}</span></span>
                </div>
                <h3 className="ds-title">{p.title}</h3>
                <p className="ds-desc">{p.desc}</p>
              </div>
            </div>
          ))}
          <div className="ds-end" aria-hidden />
        </div>
      </div>

      <div className="container">
        <div className="reveal" style={{ marginTop: 'clamp(24px,4vw,44px)', maxWidth: 720, marginInline: 'auto', textAlign: 'center' }}>
          <p className="lede" style={{ color: 'var(--text)' }}><Rich text={c.durereStack.outro} accent={(chunk, i) => <em key={i} style={{ fontStyle: 'normal', color: 'var(--accent)' }}>{chunk}</em>} /></p>
          <a href="#metoda" className="btn-link" style={{ marginTop: 20, justifyContent: 'center' }}>{c.durereStack.cta}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </div>
    </section>
  )
}
