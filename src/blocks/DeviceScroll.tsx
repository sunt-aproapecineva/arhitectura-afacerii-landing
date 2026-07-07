/**
 * DeviceScroll — „Container Scroll Animation" (Aceternity), portat VANILLA
 * (fără motion/react): tableta cu screenshotul platformei se înclină din
 * rotateX 20°→0° + scale 1.04→1, titlul urcă ușor, pe măsură ce scrollezi.
 * Progres = poziția containerului în viewport (rect math — imun la capcana
 * overflow-x pe body). Transformurile se scriu direct pe elemente (fără
 * re-render pe frame). Reduced-motion: static, fără înclinare.
 * Capcane respectate (din aa-start): fără boxShadow pe card; screenshot 16:10
 * object-position left-top, JPEG optimizat; marginTop -12 pe ramă.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react'

export default function DeviceScroll({ title, src, alt }: { title: ReactNode; src: string; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const card = cardRef.current, ttl = titleRef.current
    if (reduce) { if (card) card.style.transform = 'none'; return }
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const wrap = wrapRef.current
        if (!wrap || !card) return
        const r = wrap.getBoundingClientRect()
        const vh = window.innerHeight
        // 0 = secțiunea intră de jos, 1 = a trecut complet (offset "start end"→"end start")
        const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)))
        const rot = 20 * (1 - p)
        const [s0, s1] = isMobile ? [0.7, 0.9] : [1.04, 1]
        const sc = s0 + (s1 - s0) * p
        card.style.transform = `rotateX(${rot}deg) scale(${sc.toFixed(4)})`
        if (ttl) ttl.style.transform = `translateY(${(-100 * p).toFixed(1)}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // la mount: doar poziția de start
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [isMobile])

  return (
    <div ref={wrapRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: isMobile ? '52rem' : '68rem', padding: isMobile ? 8 : 40 }}>
      <div style={{ width: '100%', position: 'relative', perspective: 1000, paddingBlock: isMobile ? 40 : 90 }}>
        <div ref={titleRef} style={{ margin: '0 auto', textAlign: 'center', willChange: 'transform' }}>
          {title}
        </div>
        <div ref={cardRef} style={{ margin: '0 auto', width: '100%', transformStyle: 'preserve-3d', willChange: 'transform' }}>
          {/* rama device — bezel dark cald, muchie bronz, FĂRĂ umbră */}
          <div style={{ margin: '-12px auto 0', width: '100%', maxWidth: 1024, border: '4px solid #4A3B24', background: '#171009', borderRadius: 30, padding: isMobile ? 8 : 22, height: isMobile ? '24rem' : '40rem' }}>
            <div style={{ height: '100%', width: '100%', overflow: 'hidden', borderRadius: 16, background: 'var(--abyss)' }}>
              <img src={src} alt={alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
