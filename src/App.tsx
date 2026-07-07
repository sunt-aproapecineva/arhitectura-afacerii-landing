/**
 * App.tsx — Arhitectura Afacerii, structură Mercury (dark minimalist, scroll smooth).
 */
import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import Landing from './blocks/Landing'
import { initReveal } from './lib/reveal'

export default function App() {
  const [navSolid, setNavSolid] = useState(false)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    // Lenis — smooth scroll discret (premium, fără să fure controlul)
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1, anchors: { offset: -68 } as any })
    ;(window as any).__lenis = lenis
    const raf = (t: number) => lenis.raf(t)
    let id = requestAnimationFrame(function loop(t) { raf(t); id = requestAnimationFrame(loop) })

    const onScroll = () => setNavSolid(window.scrollY > 40)
    lenis.on('scroll', onScroll); onScroll()

    // reveal fade-up (după ce DOM-ul s-a randat)
    const cleanupReveal = initReveal()

    return () => { cancelAnimationFrame(id); lenis.destroy(); cleanupReveal() }
  }, [])

  return <Landing navSolid={navSolid} />
}
