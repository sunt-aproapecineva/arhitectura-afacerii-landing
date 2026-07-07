/**
 * BrandMark — sigiliul de brand: rombul „Arhitecturii" în metal lichid AURIU
 * (Paper Design LiquidMetal, shape=diamond, tint gold pe dark). Un singur
 * exemplar, la un moment-cheie (deasupra CTA-ului). WebGL — cu fallback static
 * (SVG romb gold) pe reduced-motion / fără suport, ca să nu coste degeaba.
 */
import { LiquidMetal } from '@paper-design/shaders-react'

const reduce = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function StaticDiamond({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <path d="M50 6 L94 50 L50 94 L6 50 Z" stroke="var(--accent)" strokeWidth="2" />
      <path d="M50 26 L74 50 L50 74 L26 50 Z" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1" />
    </svg>
  )
}

export default function BrandMark({ size = 132 }: { size?: number }) {
  if (reduce()) return <div style={{ width: size, height: size, margin: '0 auto' }}><StaticDiamond size={size} /></div>
  return (
    <div style={{ width: size, height: size, margin: '0 auto' }} aria-hidden>
      <LiquidMetal
        style={{ width: '100%', height: '100%' }}
        colorBack="#00000000"
        colorTint="#D9BC63"
        shape="diamond"
        speed={0.7}
        softness={0.32}
        repetition={3.6}
        shiftRed={0.1}
        shiftBlue={0.1}
        distortion={0.14}
        contour={0.9}
      />
    </div>
  )
}
