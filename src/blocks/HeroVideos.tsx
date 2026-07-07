/**
 * HeroVideos — hero BUSINESS: slideshow din 3 video-uri (viitorul dorit de
 * elevi), crossfade cinematic; ultimul cuvânt din titlu se schimbă sincron
 * cu fiecare videoclip (liniște / timp / ordine), cu litere blur-in.
 */
import { useEffect, useRef, useState } from 'react'

const SLIDES = [
  { src: 'https://res.cloudinary.com/dvhjqysr4/video/upload/v1783005948/SEEDANCE_PROMPT___s__mcaff0.mp4', word: 'liniște' },
  { src: 'https://res.cloudinary.com/dvhjqysr4/video/upload/v1783005948/SEEDANCE_PROMPT___s__2_sedeoq.mp4', word: 'timp' },
  { src: 'https://res.cloudinary.com/dvhjqysr4/video/upload/v1783005947/SEEDANCE_PROMPT___s__1_on4h6u.mp4', word: 'ordine' },
]
const FALLBACK_MS = 9000 // dacă `ended` nu vine (buffer/stream), avansăm oricum

export default function HeroVideos() {
  const [i, setI] = useState(0)
  const vids = useRef<(HTMLVideoElement | null)[]>([])
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduce) return
    vids.current.forEach((el, k) => { if (el && k !== i) el.pause() })
    const v = vids.current[i]
    if (v) { v.currentTime = 0; v.play().catch(() => {}) }
    const t = setTimeout(() => setI((p) => (p + 1) % SLIDES.length), FALLBACK_MS)
    return () => clearTimeout(t)
  }, [i, reduce])

  const word = SLIDES[i].word

  return (
    <div id="top" style={{ position: 'relative', height: '100svh', overflow: 'hidden' }}>
      {SLIDES.map((s, k) => (
        <video
          key={k}
          ref={(el) => { vids.current[k] = el }}
          src={s.src}
          muted
          playsInline
          autoPlay={k === 0 && !reduce}
          preload={k === 0 ? 'auto' : 'auto'}
          onEnded={() => { if (k === i) setI((p) => (p + 1) % SLIDES.length) }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: k === i ? 1 : 0, transform: k === i ? 'scale(1)' : 'scale(1.045)', transition: 'opacity 1.4s ease, transform 1.4s ease', willChange: 'opacity' }}
        />
      ))}
      {/* veils lizibilitate + grain peliculă */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,10,6,0.9) 0%, rgba(14,10,6,0.42) 46%, rgba(14,10,6,0.58) 100%)' }} />
      <div className="grain" aria-hidden />
      {/* conținut centrat */}
      <div className="container" style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 940, margin: '0 auto', textAlign: 'center' }}>
          <h1 className="hero-title balance">
            Hai să construim afaceri,<br />care îți oferă{' '}
            <span key={i} aria-label={word} style={{ color: 'var(--accent)', display: 'inline-block', whiteSpace: 'nowrap' }}>
              {word.split('').map((ch, k) => (
                <span key={k} className="wf-letter" style={{ display: 'inline-block', animationDelay: `${k * 0.04}s` }}>{ch}</span>
              ))}
            </span>.
          </h1>
          <p className="lede balance" style={{ margin: 'clamp(22px,3vw,32px) auto 0', maxWidth: 660, color: 'rgba(241,234,217,0.88)' }}>
            În doar 2 luni alături de mine îți restructurezi afacerea din rădăcină — o sistematizăm astfel încât să fii antreprenor liber.
          </p>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 1, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Scroll ↓</div>
    </div>
  )
}
