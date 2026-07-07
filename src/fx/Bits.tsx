/**
 * Bits — primitive premium (21st/Aceternity adaptate): SpotlightCard, Magnetic, ShimmerText, NumberTicker.
 */
import { useRef, useState, useEffect, ReactNode, CSSProperties } from 'react'
import gsap from 'gsap'

/* ── SpotlightCard: lumină radială care urmărește cursorul + hover lift ── */
export function SpotlightCard({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [xy, setXy] = useState({ x: -200, y: -200, on: false })
  return (
    <div
      ref={ref}
      onMouseMove={e => { const r = ref.current!.getBoundingClientRect(); setXy({ x: e.clientX - r.left, y: e.clientY - r.top, on: true }) }}
      onMouseEnter={() => { gsap.to(ref.current, { y: -6, duration: 0.4, ease: 'power3.out' }) }}
      onMouseLeave={() => { setXy(s => ({ ...s, on: false })); gsap.to(ref.current, { y: 0, duration: 0.5, ease: 'power3.out' }) }}
      style={{ position: 'relative', overflow: 'hidden', willChange: 'transform', ...style }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', transition: 'opacity 0.3s',
        opacity: xy.on ? 1 : 0,
        background: `radial-gradient(280px circle at ${xy.x}px ${xy.y}px, rgba(201,168,76,0.12), transparent 70%)`,
      }} />
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>
    </div>
  )
}

/* ── Magnetic: copilul se atrage spre cursor ── */
export function Magnetic({ children, strength = 0.4 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={ref}
      style={{ display: 'inline-block' }}
      onMouseMove={e => { const r = ref.current!.getBoundingClientRect(); gsap.to(ref.current, { x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength, duration: 0.4, ease: 'power2.out' }) }}
      onMouseLeave={() => gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' })}
    >
      {children}
    </div>
  )
}

/* ── NumberTicker: count-up când intră în viewport ── */
export function NumberTicker({ value, suffix = '', duration = 1.6 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current!
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const obj = { v: 0 }
      gsap.to(obj, { v: value, duration, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(obj.v).toString() + suffix } })
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [value, suffix, duration])
  return <span ref={ref}>0{suffix}</span>
}
