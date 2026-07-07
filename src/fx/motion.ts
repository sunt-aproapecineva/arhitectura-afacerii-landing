/**
 * motion.ts — hook-uri vanilla pentru secțiunile showcase (stil Synergeus,
 * fără framer-motion): declanșare la intrare în viewport + count-up numeric.
 */
import { useEffect, useRef, useState, type RefObject } from 'react'

/** true (o singură dată) când elementul intră în viewport */
export function useInView<T extends HTMLElement>(margin = '-100px'): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setInView(true); io.disconnect() } }),
      { rootMargin: margin, threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return [ref, inView]
}

/** count-up cubic ease-out (0 → target) când `active` devine true */
export function useCountUp(target: number, active: boolean, duration = 1200): number {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(target); return }
    let raf = 0, start = 0
    const step = (t: number) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / duration)
      setVal(target * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return val
}
