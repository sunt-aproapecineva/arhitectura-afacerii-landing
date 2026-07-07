/**
 * Pricing — Pachete în stil „spotlight-card" (după spec): 2 carduri cu ring
 * de 1px gold care urmărește cursorul (SpotlightBorder vanilla: pointermove →
 * CSS vars + mask ring), preț mare, listă de features cu cerc check/close,
 * badge pe pachetul recomandat. Paleta + fonturile noastre. Butoane → #lista.
 * Prețurile: „Curând" până când userul dă cifrele (atunci: price+priceOld).
 */
import { useRef } from 'react'
import { LiquidMetal } from '@paper-design/shaders-react'
import { ENROLL_URL } from '../lib/links'

const Check = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>)
const Close = () => (<svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>)

const reduce = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Marca planului în metal lichid — monocromă (Designer) sau aurie (Arhitect). */
function PlanMark({ gold }: { gold: boolean }) {
  const tint = gold ? '#D9BC63' : '#C9CDD6'
  const stroke = gold ? 'var(--accent)' : '#C9CDD6'
  return (
    <div className="pr-mark" aria-hidden>
      {reduce() ? (
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none"><path d="M50 8 L92 50 L50 92 L8 50 Z" stroke={stroke} strokeWidth="2" /><path d="M50 30 L70 50 L50 70 L30 50 Z" fill={gold ? 'var(--accent-soft)' : 'rgba(201,205,214,0.14)'} stroke={stroke} strokeWidth="1" /></svg>
      ) : (
        <LiquidMetal style={{ width: '100%', height: '100%' }} colorBack="#00000000" colorTint={tint}
          shape="diamond" speed={gold ? 0.6 : 0.5} softness={0.32} repetition={3.6} shiftRed={0.1} shiftBlue={0.1} distortion={0.14} contour={0.9} />
      )}
    </div>
  )
}

type Feat = { t: string; on: boolean }
type Plan = { name: string; price: string; priceOld?: string; sub: string; feats: Feat[]; featured?: boolean; badge?: string; note?: string; gold?: boolean }

const PLANS: Plan[] = [
  {
    name: 'Business Designer', price: 'Curând', sub: 'Programul complet + mentorat de grup, cu Victor prezent.', featured: true, badge: 'Recomandat', gold: false,
    feats: [
      { t: 'Programa completă — 6 etape', on: true },
      { t: '4 workshop-uri live cu Victor', on: true },
      { t: 'Telegram zilnic cu Victor', on: true },
      { t: 'Organigrame + șabloane reale', on: true },
      { t: '3 ședințe 1-la-1 · 60 min', on: false },
      { t: 'Canal privat · răspuns în 24h', on: false },
    ],
  },
  {
    name: 'Business Arhitect', price: 'Curând', sub: 'Tot, plus atenția 1-la-1 a lui Victor pe firma ta.', note: 'Doar 5 locuri', gold: true,
    feats: [
      { t: 'Programa completă — 6 etape', on: true },
      { t: '4 workshop-uri live cu Victor', on: true },
      { t: 'Telegram zilnic cu Victor', on: true },
      { t: 'Organigrame + șabloane reale', on: true },
      { t: '3 ședințe 1-la-1 · 60 min', on: true },
      { t: 'Canal privat · răspuns în 24h', on: true },
    ],
  },
]

function Spotlight({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - r.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - r.top}px`)
  }
  const onLeave = () => { const el = ref.current; if (el) { el.style.setProperty('--spot-x', '-9999px'); el.style.setProperty('--spot-y', '-9999px') } }
  return (
    <div ref={ref} className="spot" onPointerMove={onMove} onPointerLeave={onLeave}>
      <span className="spot-ring" aria-hidden />
      {children}
    </div>
  )
}

export default function Pricing() {
  return (
    <section id="pachete" className="section" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="container">
        {/* header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 'clamp(40px,6vw,64px)', alignItems: 'flex-start' }} className="pr-head">
          <div style={{ maxWidth: 620 }}>
            <span className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 999, background: 'var(--accent-soft)', border: '1px solid var(--line)', padding: '5px 12px', fontSize: 12, color: 'var(--text-dim)', marginBottom: 22 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />Pachete
            </span>
            <h2 className="h-lg reveal">Alege nivelul de implicare.</h2>
          </div>
          <p className="reveal" style={{ maxWidth: 380, fontSize: 15, color: 'var(--text-dim)' }}>
            Aceeași metodă, aceleași livrabile. Diferența e câtă atenție 1-la-1 primești de la Victor. O singură dată, acces 12 luni.
          </p>
        </div>

        {/* carduri */}
        <div className="pr-grid reveal-group">
          {PLANS.map((p) => (
            <Spotlight key={p.name}>
              <div className={`pr-card${p.featured ? ' feat' : ''}`}>
                {p.badge && <div className="pr-badge">{p.badge}</div>}
                <PlanMark gold={!!p.gold} />
                <div className="pr-eyebrow">{p.name}</div>
                <div className="pr-divider" />
                <div className="pr-price-row">
                  <span className="pr-price">{p.price}</span>
                  {p.priceOld && <span className="pr-price-old">{p.priceOld}</span>}
                </div>
                <p className="pr-sub">{p.sub}</p>
                <a href={ENROLL_URL} className={`btn ${p.featured ? 'btn-primary' : 'btn-ghost'}`} style={{ width: '100%', marginTop: 24 }}>Înscrie-te</a>
                <ul className="pr-feats">
                  {p.feats.map((f, i) => (
                    <li key={i} className={`pr-feat${f.on ? '' : ' off'}${i > 0 ? ' div' : ''}`}>
                      <span className={`pr-tick${f.on ? ' on' : ''}`}>{f.on ? <Check /> : <Close />}</span>
                      {f.t}
                    </li>
                  ))}
                </ul>
                {p.note && <div className="pr-note">{p.note}</div>}
              </div>
            </Spotlight>
          ))}
        </div>
        <p className="muted reveal" style={{ marginTop: 28, fontSize: 13, maxWidth: 560 }}>
          Grupurile sunt restrânse intenționat — mentorat real, nu webinar cu 500 de oameni. Apeși „Înscrie-te" și primești prețurile și toate detaliile.
        </p>
      </div>
    </section>
  )
}
