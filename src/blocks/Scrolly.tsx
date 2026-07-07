/**
 * Scrolly.tsx — pattern-urile „vii" din Mercury, adaptate Arhitectura Afacerii:
 *  1. ScrollyFeatures — showcase feature interactiv (Mercury „Everything in one
 *     place"): lista din stânga se auto-activează la scroll, panoul din dreapta
 *     (sticky) face crossfade între vizuale. Driver: IntersectionObserver centrat.
 *  2. Vizuale animate per-feature: line-art arhitectural (Metoda) + mockup-uri
 *     mini-UI produs (Platforma) — fiecare „card cu mic video animat".
 * Toate animațiile rulează doar când vizualul e activ (transform/opacity).
 */
import { useEffect, useRef, useState, type ReactNode } from 'react'

/* ── engine ─────────────────────────────────────────────────────────── */
export type ScrollyItem = { num?: string; title: string; body: string; visual: ReactNode }

function scrollToCenter(el: HTMLElement | null) {
  if (!el) return
  const lenis = (window as any).__lenis
  const offset = -window.innerHeight / 2 + el.offsetHeight / 2
  if (lenis?.scrollTo) lenis.scrollTo(el, { offset })
  else el.scrollIntoView({ block: 'center', behavior: 'smooth' })
}

export function ScrollyFeatures({ items, numbered = true }: { items: ScrollyItem[]; numbered?: boolean }) {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
        })
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [items.length])

  return (
    <div className="scrolly-grid">
      <div className="scrolly-steps">
        {items.map((it, i) => (
          <div
            key={i}
            data-i={i}
            ref={(el) => { refs.current[i] = el }}
            className={`scrolly-step${i === active ? ' on' : ''}`}
            onClick={() => scrollToCenter(refs.current[i])}
          >
            {numbered && <div className="s-num">{it.num ?? String(i + 1).padStart(2, '0')}</div>}
            <h3 className="s-title">{it.title}</h3>
            <div className="s-body"><span>{it.body}</span></div>
          </div>
        ))}
      </div>
      <div className="scrolly-visual-wrap">
        <div className="scrolly-stage">
          {items.map((it, i) => (
            <div key={i} className={`scrolly-vis${i === active ? ' on' : ''}`}>{it.visual}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   VIZUALE ARHITECTURALE — metafora „construiești o casă" (Metoda, 6 etape)
   Line-art gold pe dark; liniile se desenează, nodurile apar la activare.
   ══════════════════════════════════════════════════════════════════════ */
const G = 'var(--accent)'
const svgProps = { fill: 'none' as const, style: { width: '82%', maxWidth: 380 } }

/* 01 — Fundația: terenul + amprenta fundației + țăruși de colț */
export const VFundatia = () => (
  <svg viewBox="0 0 240 200" className="v" {...svgProps}>
    <path className="draw d1" pathLength={1} d="M24,150 L120,186 L216,150 L120,114 Z" stroke={G} strokeWidth="1.1" opacity="0.5" />
    <path className="draw d2" pathLength={1} d="M62,135 L120,157 L178,135 L120,113 Z" stroke={G} strokeWidth="1.3" />
    <path className="draw d3" pathLength={1} d="M62,135 L62,150 M178,135 L178,150 M120,157 L120,172" stroke={G} strokeWidth="1" opacity="0.7" />
    {[[62, 135], [178, 135], [120, 113], [120, 157]].map(([x, y], i) => (
      <circle key={i} className={`pop d${i + 3}`} cx={x} cy={y} r="3.4" fill={G} />
    ))}
    <line className="draw d5" pathLength={1} x1="120" y1="113" x2="120" y2="70" stroke={G} strokeWidth="0.8" opacity="0.45" strokeDasharray="3 4" />
  </svg>
)

/* 02 — Structura: organigrama (nod top → 2 → 3) */
export const VStructura = () => {
  const node = (x: number, y: number, d: number) => (
    <g className={`pop d${d}`}>
      <rect x={x - 22} y={y - 11} width="44" height="22" rx="4" fill="var(--interactive)" stroke={G} strokeWidth="1" />
    </g>
  )
  return (
    <svg viewBox="0 0 240 200" className="v" {...svgProps}>
      <path className="draw d1" pathLength={1} d="M120,41 L120,70 M64,99 L64,82 L176,82 L176,99 M120,82 L120,70" stroke={G} strokeWidth="1" opacity="0.7" />
      <path className="draw d4" pathLength={1} d="M64,128 L64,116 M120,128 L120,116 M176,128 L176,116 M64,116 L176,116" stroke={G} strokeWidth="1" opacity="0.7" />
      {node(120, 30, 2)}
      {node(64, 110, 3)}
      {node(176, 110, 3)}
      {node(64, 139, 5)}
      {node(120, 139, 5)}
      {node(176, 139, 5)}
    </svg>
  )
}

/* 03 — Instalațiile: trasee/procese cu flux animat + manometre */
export const VInstalatii = () => (
  <svg viewBox="0 0 240 200" className="v" {...svgProps}>
    <path className="flow" d="M30,70 L150,70 L150,130 L210,130" stroke={G} strokeWidth="1.6" />
    <path className="flow d2" d="M30,130 L90,130 L90,70" stroke={G} strokeWidth="1.6" opacity="0.6" />
    {[[30, 70], [150, 70], [150, 130], [210, 130], [90, 130]].map(([x, y], i) => (
      <circle key={i} className={`pop d${i + 2}`} cx={x} cy={y} r="4" fill="var(--abyss)" stroke={G} strokeWidth="1.4" />
    ))}
    <g className="pop d4">
      <circle cx="186" cy="64" r="20" fill="var(--interactive)" stroke={G} strokeWidth="1" />
      <path d="M186,64 L198,54" stroke={G} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="186" cy="64" r="2" fill={G} />
    </g>
  </svg>
)

/* 04 — Tabloul de bord: bare KPI care cresc + inel + linie trend */
export const VTablou = () => (
  <svg viewBox="0 0 240 200" className="v" {...svgProps}>
    <rect x="22" y="26" width="196" height="148" rx="8" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
    {[[44, 60], [74, 90], [104, 48]].map(([x, h], i) => (
      <rect key={i} className={`grow d${i + 1}`} x={x} y={150 - h} width="16" height={h} rx="2" fill={G} opacity={0.55 + i * 0.18} />
    ))}
    <g transform="translate(170,92)">
      <circle r="30" fill="none" stroke="var(--line)" strokeWidth="5" />
      <circle className="draw d4" pathLength={1} r="30" fill="none" stroke={G} strokeWidth="5" strokeLinecap="round" transform="rotate(-90)" style={{ strokeDasharray: '0.72 1' }} />
    </g>
    <path className="draw d5" pathLength={1} d="M44,140 L74,120 L104,128 L134,104" stroke={G} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
  </svg>
)

/* 05 — Predarea cheilor: cheia se desenează (delegi responsabilitatea) */
export const VPredarea = () => (
  <svg viewBox="0 0 240 200" className="v" {...svgProps}>
    <g className="float">
      <circle className="draw d1" pathLength={1} cx="86" cy="100" r="30" stroke={G} strokeWidth="2.2" />
      <circle className="pop d3" cx="86" cy="100" r="11" fill="none" stroke={G} strokeWidth="1.6" />
      <path className="draw d2" pathLength={1} d="M116,100 L196,100 M176,100 L176,118 M158,100 L158,114 M196,100 L196,122" stroke={G} strokeWidth="2.2" strokeLinecap="round" />
    </g>
    <circle className="pulse d4" cx="86" cy="100" r="44" fill="none" stroke={G} strokeWidth="0.6" opacity="0.4" />
  </svg>
)

/* 06 — Casa vie: blueprintul complet, ferestrele luminează */
export const VCasaVie = () => (
  <svg viewBox="0 0 240 220" className="v" {...svgProps}>
    <path className="draw d1" pathLength={1} d="M36,196 L36,96 L120,40 L204,96 L204,196 Z" stroke={G} strokeWidth="1.4" />
    <path className="draw d2" pathLength={1} d="M90,196 L90,142 Q120,124 150,142 L150,196" stroke={G} strokeWidth="1.1" />
    <rect className="pop d3 pulse" x="54" y="112" width="34" height="32" rx="2" fill="var(--accent-soft)" stroke={G} strokeWidth="0.9" />
    <rect className="pop d4 pulse" x="152" y="112" width="34" height="32" rx="2" fill="var(--accent-soft)" stroke={G} strokeWidth="0.9" />
    <path className="draw d5" pathLength={1} d="M36,212 L204,212" stroke={G} strokeWidth="0.7" opacity="0.5" />
    <circle className="pop d6" cx="120" cy="86" r="4" fill={G} />
  </svg>
)

export const METODA_VISUALS = [<VFundatia />, <VStructura />, <VInstalatii />, <VTablou />, <VPredarea />, <VCasaVie />]

/* ══════════════════════════════════════════════════════════════════════
   MOCKUP-URI PRODUS — Platforma (echivalentul panourilor UI din Mercury)
   HTML mini-UI; rândurile/barele apar la activare.
   ══════════════════════════════════════════════════════════════════════ */
const panel: React.CSSProperties = {
  width: '100%', maxWidth: 380, background: 'var(--surface)', border: '1px solid var(--line)',
  borderRadius: 8, padding: 18, display: 'flex', flexDirection: 'column', gap: 12,
}
const head = (label: string, dot = true) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <span style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{label}</span>
    {dot && <span style={{ display: 'flex', gap: 5 }}><i style={{ width: 6, height: 6, borderRadius: 9, background: 'var(--line-hi)' }} /><i style={{ width: 6, height: 6, borderRadius: 9, background: 'var(--line-hi)' }} /><i style={{ width: 6, height: 6, borderRadius: 9, background: 'var(--accent)' }} /></span>}
  </div>
)

/* Document Wizard — generează document, rândurile apar */
export const MWizard = () => (
  <div className="v" style={panel}>
    {head('Document Wizard')}
    <div style={{ fontFamily: 'var(--font-display)', fontSize: 17 }}>Fișă de post — Manager</div>
    {[92, 78, 86, 64].map((w, i) => (
      <div key={i} className={`rise d${i + 1}`} style={{ height: 8, width: w + '%', borderRadius: 3, background: 'var(--interactive)' }} />
    ))}
    <div className={`rise d5`} style={{ alignSelf: 'flex-start', marginTop: 4, fontSize: 12, color: 'var(--on-accent)', background: 'var(--accent)', borderRadius: 20, padding: '6px 14px' }}>Generează ↻</div>
  </div>
)

/* Calendar — grid lună, zile-eveniment apar */
export const MCalendar = () => (
  <div className="v" style={panel}>
    {head('Calendar')}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6 }}>
      {Array.from({ length: 28 }).map((_, i) => {
        const ev = [4, 11, 12, 19, 25].includes(i)
        return <div key={i} className={ev ? `pop d${(i % 5) + 1}` : ''} style={{ aspectRatio: '1', borderRadius: 4, background: ev ? 'var(--accent)' : 'var(--interactive)', opacity: ev ? 1 : 0.5 }} />
      })}
    </div>
    <div className="rise d4" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-dim)' }}>
      <span style={{ width: 7, height: 7, borderRadius: 9, background: 'var(--accent)' }} /> Sesiune live · Etapa 3
    </div>
  </div>
)

/* Progres — cele 6 etape ca stepper, barele cresc */
export const MProgres = () => {
  const steps: [string, number][] = [['Fundația', 100], ['Structura', 100], ['Instalațiile', 64], ['Tabloul', 0], ['Predarea', 0], ['Casa vie', 0]]
  return (
    <div className="v" style={panel}>
      {head('Progresul tău')}
      {steps.map(([t, p], i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 16, height: 16, borderRadius: 9, flexShrink: 0, border: `1.5px solid ${p ? 'var(--accent)' : 'var(--line-hi)'}`, background: p === 100 ? 'var(--accent)' : 'transparent' }} />
          <span style={{ fontSize: 13, width: 76, color: p ? 'var(--text)' : 'var(--text-faint)' }}>{t}</span>
          <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'var(--interactive)', overflow: 'hidden' }}>
            <i className={`grow d${i + 1}`} style={{ display: 'block', height: '100%', width: p + '%', background: 'var(--accent)', transformOrigin: 'left' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* Bibliotecă — căutare + rânduri articol */
export const MBiblioteca = () => (
  <div className="v" style={panel}>
    {head('Bibliotecă vie')}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--line)', borderRadius: 20, padding: '8px 14px', fontSize: 13, color: 'var(--text-faint)' }}>
      <span style={{ opacity: 0.6 }}>⌕</span> Caută un proces, un șablon…
    </div>
    {['Cum scrii o fișă de post', 'Organigramă pe 3 niveluri', 'KPI pentru vânzări', 'Delegarea în 5 pași'].map((t, i) => (
      <div key={i} className={`rise d${i + 1}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--line)', paddingTop: 10, fontSize: 13 }}>
        <span>{t}</span><span style={{ fontSize: 11, color: 'var(--accent)' }}>↗</span>
      </div>
    ))}
  </div>
)

export const PLATFORMA_VISUALS = [<MWizard />, <MCalendar />, <MProgres />, <MBiblioteca />]

/* ══════════════════════════════════════════════════════════════════════
   ARTĂ BENTO / TRUST — grafică abstractă animată (Mercury „Total visibility")
   ══════════════════════════════════════════════════════════════════════ */
/* orbe gradient suprapuse (Total visibility) */
export const ArtOrbs = () => (
  <svg viewBox="0 0 320 196" className="v" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" fill="none">
    <defs>
      <radialGradient id="og" cx="50%" cy="40%" r="60%"><stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" /><stop offset="100%" stopColor="var(--accent)" stopOpacity="0" /></radialGradient>
    </defs>
    <circle className="float" cx="130" cy="98" r="58" fill="url(#og)" />
    <circle className="float d3" cx="196" cy="98" r="58" fill="url(#og)" opacity="0.8" />
    <circle className="pulse d2" cx="163" cy="98" r="26" fill="none" stroke={G} strokeWidth="1" />
  </svg>
)

/* reguli de automatizare (Automations) */
export const ArtRules = () => (
  <div className="v" style={{ width: '88%', display: 'flex', flexDirection: 'column', gap: 9 }}>
    {['Procesul → atribuit automat', 'Raport → trimis luni 9:00', 'Task gata → notifică echipa'].map((t, i) => (
      <div key={i} className={`rise d${i + 1}`} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 8, padding: '10px 12px', fontSize: 12 }}>
        <span style={{ width: 18, height: 18, flexShrink: 0, borderRadius: 5, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>↻</span>
        <span style={{ color: 'var(--text-dim)' }}>{t}</span>
      </div>
    ))}
  </div>
)

/* permisiuni / roluri (access control) */
export const ArtRoles = () => (
  <div className="v" style={{ width: '86%', display: 'flex', flexDirection: 'column', gap: 8 }}>
    {[['VM', 'Victor — Admin', 1], ['DA', 'Daria — Manager', 0], ['AN', 'Andrei — Operator', 0]].map(([ini, name, adm], i) => (
      <div key={i} className={`rise d${i + 1}`} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
        <span style={{ width: 26, height: 26, flexShrink: 0, borderRadius: 9, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>{ini}</span>
        <span style={{ flex: 1, color: 'var(--text-dim)' }}>{name}</span>
        <span style={{ fontSize: 10, color: adm ? 'var(--accent)' : 'var(--text-faint)' }}>{adm ? 'acces total' : 'limitat'}</span>
      </div>
    ))}
  </div>
)

/* radar / acoperire (security) */
export const ArtRadar = () => (
  <svg viewBox="0 0 200 150" className="v" width="74%" fill="none">
    {[18, 34, 50].map((r, i) => <circle key={i} className={`pop d${i + 1}`} cx="100" cy="80" r={r} stroke={G} strokeWidth="0.9" opacity={0.5 - i * 0.1} />)}
    <circle className="pulse" cx="100" cy="80" r="6" fill={G} />
    <path className="spin" d="M100,80 L100,30" stroke={G} strokeWidth="1.2" opacity="0.7" style={{ transformBox: 'fill-box', transformOrigin: '0% 100%' }} />
  </svg>
)

/* scut / blocare (account security) */
export const ArtShield = () => (
  <svg viewBox="0 0 200 150" className="v" width="60%" fill="none">
    <path className="draw d1" pathLength={1} d="M100,28 L142,44 V82 Q142,116 100,130 Q58,116 58,82 V44 Z" stroke={G} strokeWidth="1.6" />
    <rect className="pop d3" x="86" y="74" width="28" height="22" rx="3" fill="var(--accent-soft)" stroke={G} strokeWidth="1.2" />
    <path className="draw d2" pathLength={1} d="M92,74 V66 Q100,58 108,66 V74" stroke={G} strokeWidth="1.4" />
  </svg>
)

/* comutatoare / control (controls) */
export const ArtToggles = () => (
  <div className="v" style={{ width: '70%', display: 'flex', flexDirection: 'column', gap: 14 }}>
    {[1, 0, 1].map((on, i) => (
      <div key={i} className={`rise d${i + 1}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
        <span style={{ height: 6, width: 60 + i * 16, borderRadius: 3, background: 'var(--interactive)' }} />
        <span style={{ width: 38, height: 22, borderRadius: 14, background: on ? 'var(--accent)' : 'var(--interactive)', border: '1px solid var(--line)', position: 'relative', flexShrink: 0 }}>
          <i style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 16, height: 16, borderRadius: 9, background: on ? 'var(--on-accent)' : 'var(--text-faint)', transition: 'left .3s' }} />
        </span>
      </div>
    ))}
  </div>
)

/* ── ARTĂ BENTO „Ce primești" (mini-vizual pe fiecare card) ──────────── */
const artWrap: React.CSSProperties = { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }

/* lecții video — play + bară progres */
export const ArtVideo = () => (
  <div className="v" style={artWrap}>
    <div style={{ width: 'min(58%, 230px)' }}>
      <div className="pop d1" style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 10, background: 'linear-gradient(150deg, #241a0f, #120d08)', border: '1px solid var(--line-hi)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px -16px rgba(0,0,0,0.7)' }}>
        <span style={{ width: 46, height: 46, borderRadius: 26, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 8px rgba(201,168,76,0.14)' }}>
          <svg width="15" height="16" viewBox="0 0 13 14" fill="var(--on-accent)"><path d="M0 0l13 7-13 7z" /></svg>
        </span>
        <div style={{ position: 'absolute', left: 14, right: 14, bottom: 13, height: 3, borderRadius: 2, background: 'rgba(241,234,217,0.22)', overflow: 'hidden' }}>
          <i className="grow d3" style={{ display: 'block', height: '100%', width: '62%', background: 'var(--accent)', transformOrigin: 'left' }} />
        </div>
      </div>
    </div>
  </div>
)

/* sesiuni live — punct live + undă */
export const ArtLive = () => (
  <div className="v" style={artWrap}>
    <svg viewBox="0 0 200 90" width="70%" fill="none">
      <g className="rise d1"><circle cx="22" cy="45" r="5" className="pulse" fill="var(--accent)" /><text x="34" y="49" fontSize="11" fill="var(--text-dim)" style={{ fontFamily: 'var(--font)' }}>LIVE</text></g>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} className={`grow d${(i % 6) + 1}`} x={84 + i * 13} y={45 - (8 + (i % 3) * 12)} width="6" height={(8 + (i % 3) * 12) * 2} rx="3" fill={G} opacity={0.5 + (i % 3) * 0.2} style={{ transformOrigin: 'center' }} />
      ))}
    </svg>
  </div>
)

/* 1-la-1 — două avataruri conectate */
export const ArtCall = () => (
  <div className="v" style={artWrap}>
    <svg viewBox="0 0 200 100" width="66%" fill="none">
      <line className="draw d2" pathLength={1} x1="66" y1="50" x2="134" y2="50" stroke={G} strokeWidth="1.4" strokeDasharray="4 5" />
      <g className="pop d1"><circle cx="60" cy="50" r="24" fill="rgba(201,168,76,0.16)" stroke={G} strokeWidth="1.6" /><circle cx="60" cy="42" r="7" fill={G} /><path d="M46,66 Q60,54 74,66" stroke={G} strokeWidth="1.6" /></g>
      <g className="pop d3"><circle cx="140" cy="50" r="24" fill="var(--interactive)" stroke="var(--line-hi)" strokeWidth="1.6" /><circle cx="140" cy="42" r="7" fill="var(--text-dim)" /><path d="M126,66 Q140,54 154,66" stroke="var(--text-dim)" strokeWidth="1.6" /></g>
    </svg>
  </div>
)

/* șabloane — teanc de documente */
export const ArtDocs = () => (
  <div className="v" style={artWrap}>
    <svg viewBox="0 0 200 120" width="56%" fill="none">
      <rect className="rise d1" x="50" y="20" width="100" height="80" rx="6" fill="var(--interactive)" stroke="var(--line-hi)" strokeWidth="1" transform="rotate(-7 100 60)" />
      <g className="rise d2"><rect x="58" y="26" width="92" height="74" rx="6" fill="var(--surface)" stroke={G} strokeWidth="1.1" />
        {[40, 52, 64, 76].map((y, i) => <rect key={i} className={`grow d${i + 2}`} x="68" y={y} width={i === 3 ? 40 : 72} height="5" rx="2" fill="var(--accent)" opacity={i === 0 ? 0.8 : 0.4} style={{ transformOrigin: 'left' }} />)}
      </g>
    </svg>
  </div>
)

/* comunitate — cluster de avataruri */
export const ArtCommunity = () => (
  <div className="v" style={artWrap}>
    <svg viewBox="0 0 200 120" width="74%" fill="none">
      {[[60, 60, 22, 1], [120, 46, 16, 0], [142, 84, 14, 0], [94, 92, 13, 0], [150, 40, 11, 0]].map(([x, y, r, hot], i) => (
        <circle key={i} className={`pop d${i + 1}`} cx={x} cy={y} r={r} fill={hot ? 'var(--accent-soft)' : 'var(--interactive)'} stroke={hot ? G : 'var(--line-hi)'} strokeWidth="1.1" />
      ))}
      <circle className="pulse d2" cx="60" cy="60" r="34" fill="none" stroke={G} strokeWidth="0.6" opacity="0.4" />
    </svg>
  </div>
)

/* suport implementare — checklist bifat */
export const ArtChecklist = () => (
  <div className="v" style={{ ...artWrap }}>
    <div style={{ width: '64%', display: 'flex', flexDirection: 'column', gap: 11 }}>
      {[1, 1, 0].map((done, i) => (
        <div key={i} className={`rise d${i + 1}`} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 18, height: 18, flexShrink: 0, borderRadius: 5, border: `1.4px solid ${done ? 'var(--accent)' : 'var(--line-hi)'}`, background: done ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {done ? <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="var(--on-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg> : null}
          </span>
          <span style={{ height: 6, flex: 1, borderRadius: 3, background: 'var(--interactive)' }} />
        </div>
      ))}
    </div>
  </div>
)
