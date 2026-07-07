/**
 * Intelligence — „Platforma inteligentă" (structura Synergeus Section 3, 3
 * carduri, adaptată la Arhitectura Afacerii: gold/dark/cream, Arimo, conținut
 * business, VANILLA fără framer). Card 1: Q&A rotativ. Card 2: chart predictiv
 * cu wipe. Card 3: organigramă SVG cu conectori care se desenează + puncte gold.
 */
import { useEffect, useState } from 'react'
import { useInView } from '../fx/motion'
import DeviceScroll from './DeviceScroll'
import { ENROLL_URL } from '../lib/links'

const Diamond = ({ s = 14, c = 'var(--accent)' }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2 L22 12 L12 22 L2 12 Z" stroke={c} strokeWidth="1.6" /></svg>
)
const Arrow = ({ s = 12, c = 'currentColor' }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

const CARD = { flex: 1, minHeight: 560, borderRadius: 'var(--r-lg)', overflow: 'hidden', position: 'relative' as const }
const TITLE = { position: 'absolute' as const, bottom: 28, left: 24, right: 24, zIndex: 3 }

/* ── CARD 1 — Q&A rotativ ─────────────────────────────────────────────── */
const QA = [
  { q: 'Cine răspunde de vânzări cât lipsesc eu?', a: 'Conform organigramei tale, coordonatorul de vânzări preia deciziile operaționale. Escaladează la tine doar ce depășește pragul stabilit.' },
  { q: 'Ce urmează după ce semnez un client nou?', a: 'Procesul de onboarding în 5 pași, documentat în platformă. Primul task se atribuie automat echipei, în aceeași zi.' },
  { q: 'Unde se blochează cel mai des comenzile?', a: 'La aprobarea livrării — 2 zile pierdute în medie. Procesul îți arată exact pasul și responsabilul.' },
]
function CardQA({ inView }: { inView: boolean }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % QA.length), 4200)
    return () => clearInterval(id)
  }, [])
  return (
    <div className={`intel-card${inView ? ' in' : ''}`} style={{ ...CARD, transitionDelay: '0.2s' }}>
      <img src="/atmos/desk.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(14,10,6,0.5)' }} />
      <div style={{ position: 'absolute', top: 32, left: 24, right: 24, zIndex: 2, borderRadius: 'var(--r-md)', border: '1px solid rgba(241,234,217,0.18)', background: 'rgba(241,234,217,0.06)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Diamond s={18} /></span>
          <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', letterSpacing: '0.02em' }}>ARHITECTURA</span>
        </div>
        <div style={{ borderTop: '1px dashed rgba(241,234,217,0.2)', marginBottom: 16 }} />
        <div style={{ position: 'relative', height: 170 }}>
          <div key={i} className="qa-slide" style={{ position: 'absolute', inset: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--text)', marginBottom: 12, lineHeight: 1.4 }}>{QA[i].q}</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ width: 20, height: 20, borderRadius: 6, background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}><Diamond s={11} /></span>
              <p style={{ fontSize: 12.5, lineHeight: 1.6, color: 'rgba(241,234,217,0.6)', margin: 0 }}>{QA[i].a}</p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={{ display: 'flex', gap: 5 }}>{QA.map((_, k) => <i key={k} style={{ width: k === i ? 16 : 5, height: 5, borderRadius: 3, background: k === i ? 'var(--accent)' : 'rgba(241,234,217,0.25)', transition: 'width .3s' }} />)}</span>
          <a href={ENROLL_URL} style={{ fontSize: 13, fontWeight: 500, color: 'rgba(241,234,217,0.8)', textDecoration: 'underline' }}>Întreabă și tu</a>
        </div>
      </div>
      <div style={TITLE}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text)', marginBottom: 8 }}>Întrebări în limbaj natural</div>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(241,234,217,0.65)', margin: 0 }}>Întrebi despre afacerea ta în limbaj simplu și primești răspunsuri instant, pe datele tale.</p>
      </div>
    </div>
  )
}

/* ── CARD 2 — chart predictiv cu wipe ─────────────────────────────────── */
function CardChart({ inView }: { inView: boolean }) {
  return (
    <div className={`intel-card${inView ? ' in' : ''}`} style={{ ...CARD, transitionDelay: '0.35s' }}>
      <img src="/atmos/build.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(14,10,6,0.4)' }} />
      <div style={{ position: 'absolute', top: 32, left: 24, right: 24, zIndex: 2, borderRadius: 'var(--r-md)', background: 'rgba(244,238,222,0.94)', padding: '24px 20px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: 'rgba(14,10,6,0.5)', lineHeight: 1.5, marginBottom: 4 }}>Profit estimat<br />în primul trimestru</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, color: '#0E0A06', letterSpacing: '-1px', lineHeight: 1 }}>+28%</div>
        <div style={{ height: 16 }} />
        <div className={`chart-wipe${inView ? ' in' : ''}`} style={{ width: 280, maxWidth: '100%', height: 145, position: 'relative', margin: '0 auto' }}>
          <svg viewBox="60 -25 220 145" width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="areaGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(201,168,76,0.85)" /><stop offset="100%" stopColor="rgba(201,168,76,0.08)" />
              </linearGradient>
            </defs>
            <path d="M 60 75 L 150 20 L 280 28 L 280 120 L 60 120 Z" fill="url(#areaGold)" />
            <path d="M 60 75 L 150 20 L 280 28" fill="none" stroke="#C9A84C" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
            <line x1="60" y1="75" x2="60" y2="120" stroke="#C9A84C" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <line x1="280" y1="28" x2="280" y2="120" stroke="#C9A84C" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <line className="chart-conn" x1="150" y1="-15" x2="150" y2="20" stroke="#8A6E2E" strokeWidth="1.4" pathLength={1} />
            <circle className="chart-dot" cx="150" cy="-15" r="4.5" fill="#8A6E2E" />
          </svg>
        </div>
        <div style={{ borderRadius: 999, border: '1px solid rgba(14,10,6,0.12)', background: 'rgba(255,255,255,0.7)', padding: '8px 16px', marginTop: 16, display: 'inline-block', fontSize: 11, color: 'rgba(14,10,6,0.6)' }}>
          Sfat: documentează procesele operaționale ca să susții creșterea.
        </div>
      </div>
      <div style={TITLE}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text)', marginBottom: 8 }}>Analiză predictivă</div>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(241,234,217,0.65)', margin: 0 }}>Sistemul citește tiparele și anticipează unde crește — și unde se blochează — afacerea ta.</p>
      </div>
    </div>
  )
}

/* ── CARD 3 — organigramă SVG cu conectori + puncte gold ──────────────── */
const CONNS = ['M160 48 C160 74 76 74 76 96', 'M160 48 C160 74 246 74 246 96', 'M76 128 L76 150', 'M246 128 L246 150', 'M160 48 L160 236', 'M160 268 L160 290']
function OrgNode({ x, y, w, h, label, sub, cls }: { x: number; y: number; w: number; h: number; label: string; sub?: string; cls: string }) {
  const glass = cls.includes('a')
  return (
    <g className={`tree-node ${cls}`}>
      <rect x={x} y={y} width={w} height={h} rx={glass ? h / 2 : 9}
        fill={glass ? 'rgba(241,234,217,0.10)' : '#F4EEDE'} stroke={glass ? 'rgba(241,234,217,0.28)' : 'none'} strokeWidth={glass ? 1 : 0} />
      <text x={x + w / 2} y={sub ? y + h / 2 - 5 : y + h / 2 + 4} textAnchor="middle"
        fontFamily="var(--font)" fontSize={glass ? 13 : 11} fontWeight={glass ? 500 : 400}
        fill={glass ? '#F1EAD9' : '#0E0A06'}>{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 11} textAnchor="middle" fontFamily="var(--font)" fontSize={10} fill="rgba(14,10,6,0.6)">{sub}</text>}
    </g>
  )
}
function CardOrg({ inView }: { inView: boolean }) {
  return (
    <div className={`intel-card${inView ? ' in' : ''}`} style={{ ...CARD, transitionDelay: '0.5s' }}>
      <img src="/atmos/key.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(14,10,6,0.55)' }} />
      <div style={{ position: 'absolute', top: 24, left: 12, right: 12, bottom: 110, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 320 380" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className={`org${inView ? ' in' : ''}`}>
          {CONNS.map((d, k) => (
            <g key={k}>
              <path id={`oc${k}`} className="tree-line" d={d} fill="none" stroke="rgba(241,234,217,0.35)" strokeWidth="1" pathLength={1} style={{ ['--d' as any]: 0.25 + k * 0.14 + 's' }} />
              <circle className="tree-flow" r="2.6" fill="var(--accent)" style={{ filter: 'drop-shadow(0 0 4px rgba(201,168,76,0.9))' }}>
                <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${0.6 + k * 0.2}s`}><mpath href={`#oc${k}`} /></animateMotion>
              </circle>
            </g>
          ))}
          <OrgNode x={115} y={16} w={90} h={32} label="COMPANIA" cls="a d0" />
          <OrgNode x={28} y={96} w={96} h={32} label="Vânzări" cls="a d1" />
          <OrgNode x={196} y={96} w={100} h={32} label="Operațional" cls="a d2" />
          <OrgNode x={16} y={150} w={120} h={46} label="Lead-uri, oferte," sub="contracte" cls="b d3" />
          <OrgNode x={184} y={150} w={122} h={46} label="Livrare, achiziții," sub="calitate" cls="b d4" />
          <OrgNode x={112} y={236} w={96} h={32} label="Suport" cls="a d5" />
          <OrgNode x={92} y={290} w={136} h={46} label="Onboarding, tichete," sub="feedback" cls="b d6" />
        </svg>
      </div>
      <div style={TITLE}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text)', marginBottom: 8 }}>Organigrama automată</div>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(241,234,217,0.65)', margin: 0 }}>Structura firmei tale, mereu la zi — cine răspunde de ce, până la ultimul detaliu.</p>
      </div>
    </div>
  )
}

export default function Intelligence() {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <section id="platforma" style={{ background: 'var(--abyss)', paddingBlock: 'clamp(40px,6vw,64px) clamp(72px,10vw,110px)', overflow: 'hidden' }}>
      {/* reveal cinematic: tableta cu platforma se înclină 20°→0° pe scroll */}
      <DeviceScroll
        src="/platforma.jpg"
        alt="Platforma Arhitectura Afacerii — lecții, progres, documente și live-uri"
        title={
          <div ref={ref} style={{ paddingInline: 'clamp(20px,5vw,40px)', paddingBottom: 'clamp(28px,4vw,44px)' }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Platforma · doar pentru elevi</div>
            <h2 className={`ana-h${inView ? ' in' : ''}`} style={{ margin: 0 }}>
              <span className="h-lg" style={{ display: 'block' }}>Sistemul tău,</span>
              <span className="h-lg" style={{ display: 'block', color: 'var(--accent)' }}>într-un singur loc.</span>
            </h2>
            <p className={`ana-sub${inView ? ' in' : ''}`} style={{ fontSize: 16, color: 'var(--text-dim)', marginTop: 16, maxWidth: 560, marginInline: 'auto' }}>
              Instrumentele cu care construiești — inteligente, mereu la îndemână.
            </p>
          </div>
        }
      />
      <div className="intel-row" style={{ display: 'flex', gap: 16, alignItems: 'stretch', maxWidth: 1200, margin: '0 auto', paddingInline: 'clamp(20px,5vw,40px)' }}>
        <CardQA inView={inView} />
        <CardChart inView={inView} />
        <CardOrg inView={inView} />
      </div>
    </section>
  )
}
