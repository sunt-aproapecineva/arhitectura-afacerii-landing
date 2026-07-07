/**
 * HeroFilm — hero Mercury cu VIDEO PE SCROLL (image-sequence scrubbing).
 * Mercury folosește o secvență hero_start_frame→hero_end_frame; noi avem 106
 * cadre WebP (responsive) → scrub fin. Canvas pinned, conținutul Mercury
 * (headline light + CTA pill) plutește deasupra și se estompează la scroll.
 */
import { useRef, useEffect, useState, type ReactNode } from 'react'
import { WordFlip, useScramble } from '../fx/anim'
import WaitlistCapture from './Waitlist'

const TOTAL = 106
const tier = typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile'
  : typeof window !== 'undefined' && window.innerWidth < 1280 ? 'tablet' : 'desktop'
const src = (i: number) => `/film/${tier}/frame-${String(i + 1).padStart(3, '0')}.webp`

export default function HeroFilm({ children }: { children?: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [first, setFirst] = useState(false)
  const eyebrow = useScramble('Flux 2 · Se deschide în curând', { duration: 1.1, delay: 0.2 })

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d', { alpha: false })!
    const images: HTMLImageElement[] = []
    let rafId = 0, running = false
    let target = 0, shown = 0

    function tick() {
      shown += (target - shown) * 0.14
      if (Math.abs(target - shown) < 0.0006) { shown = target; draw(Math.round(shown * (TOTAL - 1))); running = false; return }
      draw(Math.round(shown * (TOTAL - 1)))
      rafId = requestAnimationFrame(tick)
    }
    const wake = () => { if (!running) { running = true; rafId = requestAnimationFrame(tick) } }

    const load = (i: number) => {
      const img = new Image(); img.decoding = 'async'
      img.onload = () => { if (i === 0) setFirst(true); wake() }
      if (i === 0) img.onerror = () => setFirst(true)
      img.src = src(i); images[i] = img
    }
    for (let i = 0; i < 36; i++) load(i)
    const late = setTimeout(() => { for (let i = 36; i < TOTAL; i++) load(i) }, 900)
    const safety = setTimeout(() => setFirst(true), 2500)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr
      canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); wake()
    }
    resize(); addEventListener('resize', resize)

    const draw = (idx: number) => {
      const img = images[Math.max(0, Math.min(TOTAL - 1, idx))]
      if (!img || !img.complete || img.naturalWidth === 0) return
      const cw = innerWidth, ch = innerHeight, ir = img.naturalWidth / img.naturalHeight, cr = cw / ch
      let w, h, x, y
      if (ir > cr) { h = ch; w = ch * ir; x = (cw - w) / 2; y = 0 } else { w = cw; h = cw / ir; x = 0; y = (ch - h) / 2 }
      ctx.drawImage(img, x, y, w, h)
    }

    const onScroll = () => {
      const wrap = wrapRef.current!
      const total = wrap.offsetHeight - innerHeight
      const p = Math.max(0, Math.min(1, -wrap.getBoundingClientRect().top / Math.max(1, total)))
      target = p
      // conținutul Mercury se estompează + urcă pe măsură ce filmul preia ecranul
      const out = Math.max(0, (p - 0.32) / 0.5)
      if (contentRef.current) { contentRef.current.style.opacity = String(1 - out); contentRef.current.style.transform = `translateY(${-out * 50}px)` }
      wake()
    }
    addEventListener('scroll', onScroll, { passive: true }); onScroll()

    return () => { clearTimeout(late); clearTimeout(safety); cancelAnimationFrame(rafId); running = false; removeEventListener('resize', resize); removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <div id="top" ref={wrapRef} style={{ position: 'relative', height: '220vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, display: 'block', opacity: first ? 1 : 0, transition: 'opacity 0.9s ease' }} />
        {/* gradiente lizibilitate + vignetă watermark colț */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,10,6,0.88) 0%, rgba(14,10,6,0.38) 46%, rgba(14,10,6,0.55) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 34% 18% at 100% 100%, rgba(14,10,6,0.97), transparent 72%)' }} />
        <div className="grain" aria-hidden />
        {/* conținut Mercury — centrat, cu email-capture (input + pill lipit) */}
        <div className="container" style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div ref={contentRef} style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', willChange: 'opacity, transform' }}>
            <div className="eyebrow" style={{ marginBottom: 22, fontVariantNumeric: 'tabular-nums' }}>{eyebrow}</div>
            <h1 className="display">Afacerea ta,<br />construită cu <WordFlip words={['proiect', 'sistem', 'structură', 'ordine']} /></h1>
            <p className="lede" style={{ margin: '24px auto 0', maxWidth: 540, color: 'rgba(241,234,217,0.82)' }}>
              Indiferent dacă pornești de la zero sau ești blocat la mijloc — în 8 săptămâni ai o afacere care merge și fără tine. Cu Victor Morar.
            </p>
            <div style={{ marginTop: 38 }}><WaitlistCapture center /></div>
            <div style={{ marginTop: 18, fontSize: 14, color: 'var(--text-dim)' }}>Sau <a href="#durere" style={{ color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: 3 }}>vezi dacă te recunoști →</a></div>
          </div>
        </div>
        {/* hint scroll */}
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 1, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Scroll ↓</div>
      </div>
      {children}
    </div>
  )
}
