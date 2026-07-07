/**
 * RadialTimeline — „Transformarea" ca hartă orbitală (port RadialOrbitalTimeline,
 * vanilla + paleta noastră gold/dark). Nucleu gold pulsant în centru, 6
 * livrabile orbitează (auto-rotire), click pe un nod → se oprește rotirea,
 * nodul se mărește și apare un card cu descrierea + livrabilele conexe (care
 * pulsează). Responsive (rază după lățime), reduced-motion → orbite statice.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react'

type Node = { id: number; t: string; d: string; res: string; rel: number[]; icon: ReactNode }
const G = 'var(--accent)'

const IC = {
  org: <><circle cx="12" cy="5" r="2.4" /><circle cx="6" cy="17" r="2.4" /><circle cx="18" cy="17" r="2.4" /><path d="M12 7.4v3.6M12 11l-5 3.6M12 11l5 3.6" /></>,
  kpi: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 15v-3M12 15V9M16 15v-5" /></>,
  proc: <><path d="M4 7h6M14 7h6M4 17h6M14 17h6" /><circle cx="12" cy="7" r="2" /><circle cx="12" cy="17" r="2" /><path d="M12 9v6" /></>,
  dash: <><path d="M4 13a8 8 0 0 1 16 0" /><path d="M12 13l4-3" /><circle cx="12" cy="13" r="1.4" /></>,
  vac: <><circle cx="12" cy="8" r="3.2" /><path d="M12 11.5c-3 0-6 2-6 6h12c0-4-3-6-6-6z" opacity="0" /><path d="M5 20c2-3 5-4 7-4s5 1 7 4" /><path d="M12 4V2" /></>,
  skill: <><path d="M12 3l2.3 4.7 5.2.8-3.8 3.7.9 5.2L12 15.7 7.4 18l.9-5.2L4.5 9l5.2-.8z" /></>,
}
const NODES: Node[] = [
  { id: 1, t: 'Organigrama reală', d: 'Structura firmei tale, pe hârtie: cine face ce și cine răspunde de ce. Vezi negru pe alb rolurile care lipsesc și pe cele pe care le duci tu, deși n-ar trebui.', res: 'Organigrama completă a firmei tale, pe roluri și linii de răspundere.', rel: [2, 3], icon: IC.org },
  { id: 2, t: 'Fișe de post cu KPI-uri', d: 'Fiecare rol din organigramă capătă o fișă clară: ce responsabilități are, ce livrează și după ce cifre e măsurat. Oamenii știu exact ce au de făcut, fără să te întrebe.', res: 'Un set de fișe de post cu KPI, gata de dat fiecărui om din echipă.', rel: [1, 4], icon: IC.kpi },
  { id: 3, t: 'Procesele, scrise', d: 'Pașii prin care se face treaba în firma ta — de la vânzare la livrare — scriși ca proceduri. Un om nou intră și lucrează după ele din prima zi, fără să stai tu lângă el.', res: 'Procesele-cheie ale firmei, documentate ca proceduri clare.', rel: [1, 4], icon: IC.proc },
  { id: 4, t: 'Tabloul de bord', d: 'Cifrele care contează, adunate într-un singur loc. Conduci din date, nu din telefoane — și vezi o problemă când apare, nu peste trei luni, când se simte în cont.', res: 'Un tablou de bord cu indicatorii firmei tale, ușor de citit.', rel: [2, 3], icon: IC.dash },
  { id: 5, t: 'Prima vacanță reală', d: 'Cu roluri, procese și cifre la locul lor, delegi responsabilitatea — nu doar sarcinile. Pleci o săptămână și firma merge mai departe fără să te sune nimeni.', res: 'Un plan de delegare care îți dă timpul înapoi.', rel: [1, 4], icon: IC.vac },
  { id: 6, t: 'Competența, pe viață', d: 'Nu pleci cu un certificat de pus în ramă, ci cu abilitatea de a sistematiza orice afacere. O aplici la firma de acum și la orice vei construi de aici înainte.', res: 'Metoda de sistematizare — învățată o dată, folosită mereu.', rel: [5], icon: IC.skill },
]

export default function RadialTimeline() {
  const [angle, setAngle] = useState(0)
  const [active, setActive] = useState<number | null>(null)
  const [auto, setAuto] = useState(true)
  const [radius, setRadius] = useState(180)
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const measure = () => {
      const w = wrapRef.current?.clientWidth ?? 900
      setRadius(Math.max(84, Math.min(190, w / 2 - 112)))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    if (!auto || reduce) return
    const t = setInterval(() => setAngle((a) => (a + 0.28) % 360), 50)
    return () => clearInterval(t)
  }, [auto, reduce])

  const toggle = (id: number) => {
    if (active === id) { setActive(null); setAuto(true) }
    else {
      setActive(id); setAuto(false)
      // rotește nodul selectat în poziția de sus (270°)
      const idx = NODES.findIndex((n) => n.id === id)
      setAngle(270 - (idx / NODES.length) * 360)
    }
  }
  const relatedTo = (id: number) => (active ? NODES.find((n) => n.id === active)?.rel.includes(id) : false)

  return (
    <section id="transformare" className="section" style={{ borderTop: '1px solid var(--line)', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ maxWidth: 760, marginBottom: 'clamp(24px,4vw,40px)' }}>
          <div className="eyebrow reveal" style={{ marginBottom: 18 }}>Transformarea</div>
          <h2 className="h-lg reveal">Ce construim împreună în 8 săptămâni.</h2>
          <p className="lede reveal" style={{ marginTop: 22 }}>Nu notițe și inspirație — livrabile. Apasă pe fiecare piesă a sistemului ca s-o vezi în detaliu.</p>
        </div>

        <div ref={wrapRef} className="rt-stage" onClick={() => { setActive(null); setAuto(true) }}>
          {/* nucleul */}
          <div className="rt-core" aria-hidden>
            <span className="rt-core-ring" /><span className="rt-core-ring rt-core-ring2" />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2 L22 12 L12 22 L2 12 Z" stroke="var(--on-accent)" strokeWidth="1.6" /></svg>
          </div>
          <div className="rt-orbit" style={{ width: radius * 2, height: radius * 2 }} aria-hidden />

          {NODES.map((n, i) => {
            const a = ((i / NODES.length) * 360 + angle) % 360
            const rad = (a * Math.PI) / 180
            const x = radius * Math.cos(rad)
            const y = radius * Math.sin(rad)
            const depth = (1 + Math.sin(rad)) / 2 // 0 (spate) .. 1 (față)
            const isA = active === n.id
            const isR = relatedTo(n.id)
            return (
              <div key={n.id} className="rt-node" style={{ transform: `translate(${x}px, ${y}px)`, zIndex: isA ? 60 : Math.round(20 + depth * 20), opacity: isA ? 1 : reduce ? 1 : 0.5 + depth * 0.5 }}
                onClick={(e) => { e.stopPropagation(); toggle(n.id) }}>
                <button className={`rt-dot${isA ? ' on' : ''}${isR ? ' rel' : ''}`} aria-label={n.t}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{n.icon}</svg>
                </button>
                <span className={`rt-label${isA ? ' on' : ''}`}>{n.t}</span>
              </div>
            )
          })}

          {/* cardul — la nivelul scenei, centrat (nu iese din ecran) */}
          {active !== null && (() => {
            const n = NODES.find((x) => x.id === active)!
            return (
              <div className="rt-card" onClick={(e) => e.stopPropagation()}>
                <div className="rt-card-tag">Livrabil {String(n.id).padStart(2, '0')}</div>
                <div className="rt-card-title">{n.t}</div>
                <p className="rt-card-body">{n.d}</p>
                <div className="rt-card-out">
                  <span className="rt-card-out-l">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    La final ai
                  </span>
                  <p className="rt-card-out-t">{n.res}</p>
                </div>
                {n.rel.length > 0 && (
                  <div className="rt-card-rel">
                    <span className="rt-card-rel-h">Se leagă de</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {n.rel.map((r) => (
                        <button key={r} className="rt-chip" onClick={(e) => { e.stopPropagation(); toggle(r) }}>
                          {NODES.find((x) => x.id === r)?.t} <span style={{ color: G }}>→</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })()}
        </div>
        <a href="#pachete" className="btn-link reveal" style={{ marginTop: 'clamp(28px,4vw,44px)' }}>Vezi pachetele →</a>
      </div>
    </section>
  )
}
