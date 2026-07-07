/**
 * ArtBox — scenă la scară FIXĂ pentru artele gold: canvas-urile LiquidMetal
 * (HTML, poziționate absolut la coordonate de design) și overlay-ul SVG
 * (viewBox identic 1:1) împart ACELAȘI sistem de coordonate → concentricitate
 * pixel-perfect. Pe containere mai înguste, scena se scalează CA ÎNTREG
 * (ResizeObserver), deci nimic nu se dezaliniază.
 */
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'
import { LiquidMetal } from '@paper-design/shaders-react'

export const GOLD = 'var(--accent)'
export const PLATE = '#171009'

export function ArtBox({ w = 320, h = 160, children }: { w?: number; h?: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [s, setS] = useState(1)
  useEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return
    const ro = new ResizeObserver(() => setS(Math.min(1, (parent.clientWidth - 12) / w)))
    ro.observe(parent)
    return () => ro.disconnect()
  }, [w])
  return (
    <div ref={ref} style={{ width: w, height: h, position: 'relative', flexShrink: 0, transform: `scale(${s})`, transformOrigin: 'center center' }}>
      {children}
    </div>
  )
}

/** canvas LiquidMetal auriu, absolut la coordonate de design; clip opțional (path local) */
export function LM({ x, y, w, h, shape = 'none', clip, rounded, rotate }: {
  x: number; y: number; w: number; h: number
  shape?: 'none' | 'circle' | 'diamond'; clip?: string; rounded?: number; rotate?: number
}) {
  const style: CSSProperties = { position: 'absolute', left: x, top: y, width: w, height: h }
  if (clip) { (style as any).clipPath = `path("${clip}")`; (style as any).WebkitClipPath = `path("${clip}")` }
  if (rounded) { style.borderRadius = rounded; style.overflow = 'hidden' }
  if (rotate) style.transform = `rotate(${rotate}deg)`
  return (
    <div style={style} aria-hidden>
      <LiquidMetal style={{ width: '100%', height: '100%' }} colorBack="#00000000" colorTint="#D9BC63"
        shape={shape} speed={0.55} softness={0.3} repetition={3.8} shiftRed={0.1} shiftBlue={0.1} distortion={0.12} contour={0.9} />
    </div>
  )
}

export const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** overlay-ul SVG al scenei — același viewBox ca ArtBox */
export function Scene({ w = 320, h = 160, children }: { w?: number; h?: number; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="v" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} fill="none" aria-hidden>
      {children}
    </svg>
  )
}
