/**
 * anim.tsx — micro-interacțiuni premium portate din AnimBits (Garvit1000)
 * ca VANILLA (pointer events + CSS transform), fără framer-motion / deps noi.
 * Toate respectă prefers-reduced-motion și se dezactivează pe touch (pointer:coarse).
 *  - Magnetic   : CTA-ul „se lipește" ușor de cursor (useMagnetic)
 *  - Tilt       : card 3D care se înclină spre cursor + glow opțional (useParallaxTilt)
 *  - WordFlip   : cuvânt rotativ cu litere care intră din blur (container-text-flip)
 *  - Shimmer    : text cu sweep gold (useShimmer)
 *  - useScramble: dezvăluire prin scramble de caractere (useScramble)
 */
import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react'

const finePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ── Magnetic — elementul urmărește ușor cursorul, revine elastic ─────── */
export function Magnetic({
  as: As = 'a', strength = 0.32, children, style, ...rest
}: { as?: ElementType; strength?: number; children: ReactNode; [k: string]: any }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer()) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
    }
    const onLeave = () => { el.style.transform = 'translate(0,0)' }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave) }
  }, [strength])
  return (
    <As ref={ref as any} style={{ display: 'inline-flex', transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)', willChange: 'transform', ...style }} {...rest}>
      {children}
    </As>
  )
}

/* ── Tilt — card 3D care se înclină spre cursor (+ glow gold opțional) ──
   Element unic (păstrează className-ul de grid, ex. `bento-card wide`);
   perspectiva vine de la containerul-părinte (`.tilt-scene`). */
export function Tilt({
  max = 7, glow = false, className, style, children, ...rest
}: { max?: number; glow?: boolean; className?: string; style?: any; children: ReactNode; [k: string]: any }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer()) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `rotateX(${-py * max}deg) rotateY(${px * max}deg)`
      if (glow) { el.style.setProperty('--gx', `${e.clientX - r.left}px`); el.style.setProperty('--gy', `${e.clientY - r.top}px`) }
    }
    const onLeave = () => { el.style.transform = 'rotateX(0) rotateY(0)' }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave) }
  }, [max, glow])
  return (
    <div ref={ref} className={className} style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.8s cubic-bezier(0.16,1,0.3,1)', ...(glow ? { position: 'relative' } : {}), ...style }} {...rest}>
      {glow && <span aria-hidden className="tilt-glow" />}
      {children}
    </div>
  )
}

/* ── WordFlip — cuvânt rotativ, literele intră din blur (Aceternity-style) ─ */
export function WordFlip({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI((p) => (p + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval, reduce])
  const w = words[i]
  return (
    <span style={{ display: 'inline-block', position: 'relative', whiteSpace: 'nowrap', transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
      <span key={i} aria-label={w} style={{ display: 'inline-block' }}>
        {w.split('').map((ch, k) => (
          <span key={k} className="wf-letter" style={{ display: 'inline-block', animationDelay: `${k * 0.028}s` }}>{ch}</span>
        ))}
      </span>
    </span>
  )
}

/* ── RevealWords — titlu care intră cuvânt-cu-cuvânt din blur (spell-ui) ──
   Declanșat de IntersectionObserver; stagger prin transition-delay. */
export function RevealWords({
  text, as: As = 'span', className, stagger = 0.06, style,
}: { text: string; as?: ElementType; className?: string; stagger?: number; style?: any }) {
  const ref = useRef<HTMLElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setOn(true); io.disconnect() } })
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <As ref={ref as any} className={`rw${on ? ' rw-on' : ''}${className ? ' ' + className : ''}`} style={style}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="rw-word" style={{ transitionDelay: `${i * stagger}s` }}>{w}{i < text.split(' ').length - 1 ? ' ' : ''}</span>
      ))}
    </As>
  )
}

/* ── Marquee — bandă infinită cu fade pe margini (spell-ui, CSS) ──────── */
export function Marquee({ items, duration = 30 }: { items: ReactNode[]; duration?: number }) {
  return (
    <div className="mq" aria-hidden>
      <div className="mq-track" style={{ animationDuration: `${duration}s` }}>
        {[...items, ...items].map((it, i) => (
          <span className="mq-item" key={i}>{it}<span className="mq-dot">✦</span></span>
        ))}
      </div>
    </div>
  )
}

/* ── KenBurns — imagine statică → fundal „video" prin zoom/pan lent ──────
   Sursă: imagini AI gratuite (Pollinations/Flux). Veil întunecat pt lizibilitate. */
export function KenBurns({ src, veil = 'linear-gradient(180deg, rgba(14,10,6,0.55) 0%, rgba(14,10,6,0.66) 45%, rgba(14,10,6,0.82) 100%)' }: { src: string; veil?: string }) {
  return (
    <div className="kenburns" aria-hidden>
      <div className="kenburns-img" style={{ backgroundImage: `url(${src})` }} />
      <div style={{ position: 'absolute', inset: 0, background: veil }} />
    </div>
  )
}

/* ── Shimmer — text cu sweep gold (useShimmer) ───────────────────────── */
export function Shimmer({ children, style }: { children: ReactNode; style?: any }) {
  return <span className="shimmer-text" style={style}>{children}</span>
}

/* ── useScramble — dezvăluire prin scramble de caractere ─────────────── */
const SCRAMBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·▮▯/\\<>'
export function useScramble(text: string, { duration = 0.9, delay = 0 }: { duration?: number; delay?: number } = {}) {
  const [out, setOut] = useState(text)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOut(text); return }
    const iterations = Math.max(1, Math.floor(duration * 60))
    let cur = 0, iv: ReturnType<typeof setInterval>
    const to = setTimeout(() => {
      iv = setInterval(() => {
        if (cur >= iterations) { setOut(text); clearInterval(iv); return }
        const progress = cur / iterations
        setOut(text.split('').map((c, idx) => (c === ' ' ? ' ' : idx / text.length < progress ? c : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)])).join(''))
        cur++
      }, (duration * 1000) / iterations)
    }, delay * 1000)
    return () => { clearTimeout(to); clearInterval(iv) }
  }, [text, duration, delay])
  return out
}
