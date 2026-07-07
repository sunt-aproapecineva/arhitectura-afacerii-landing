/**
 * BentoArts — arta cardurilor „Ce primești", pixel-perfect prin ArtBox,
 * fiecare compoziție SUGESTIVĂ pe beneficiul cardului, cu miez LiquidMetal:
 *   Video      — player cu buton de PLAY topit + 6 capitole (etapele)
 *   Live       — avatarul mentorului topit, unde de transmisie + waveform
 *   1-la-1     — rombul (Victor) conectat direct cu tine, punct care circulă
 *   Șabloane   — documentul de AUR (șablonul) peste dosarul tău
 *   Comunitate — nucleul topit + membrii legați de el
 *   Suport     — checklist bifat + sigiliul topit de garanție ✓
 */
import { ArtBox, LM, Scene, reduceMotion, GOLD as G, PLATE } from './ArtBox'

/* ── VIDEO — player + play topit + capitolele-etape pe timeline ───────── */
export function ArtVideo() {
  const still = reduceMotion()
  return (
    <ArtBox>
      {!still && <LM x={137} y={57} w={46} h={46} shape="circle" />}
      <Scene>
        <rect className="pop d1" x="52" y="18" width="216" height="124" rx="10" stroke={G} strokeWidth="1" opacity="0.7" />
        {/* butonul play — peste medalionul topit */}
        {still && <circle cx="160" cy="80" r="22" fill="var(--accent-soft)" stroke={G} strokeWidth="1.4" />}
        <path className="pop d2" d="M154 71 L172 80 L154 89 Z" fill="#0E0A06" stroke="#0E0A06" strokeWidth="2" strokeLinejoin="round" />
        {/* durata */}
        <g className="rise d2"><rect x="216" y="28" width="42" height="16" rx="8" fill={PLATE} fillOpacity="0.9" stroke={G} strokeWidth="0.7" /><text x="237" y="39" textAnchor="middle" fontFamily="var(--font)" fontSize="9" fill={G}>6 etape</text></g>
        {/* timeline cu 6 capitole-romb */}
        <line className="draw d3" pathLength={1} x1="64" y1="126" x2="256" y2="126" stroke={G} strokeWidth="1" opacity="0.3" />
        <rect className="grow d3" x="64" y="125" width="112" height="2" rx="1" fill={G} style={{ transformOrigin: 'left center', transformBox: 'fill-box' }} />
        {[64, 102, 140, 178, 216, 254].map((x, i) => (
          <path key={i} className={`pop d${i + 1}`} d={`M${x} 121 l4.5 5 l-4.5 5 l-4.5 -5 Z`} fill={i < 3 ? G : PLATE} stroke={G} strokeWidth="0.8" />
        ))}
      </Scene>
    </ArtBox>
  )
}

/* ── LIVE — avatarul mentorului (topit) transmite: unde + waveform ────── */
export function ArtLive() {
  const still = reduceMotion()
  return (
    <ArtBox>
      {still
        ? <Scene><circle cx="101" cy="80" r="24" fill="var(--accent-soft)" stroke={G} strokeWidth="1.4" /></Scene>
        : <LM x={78} y={57} w={46} h={46} shape="circle" />}
      <Scene>
        <circle className="pulse" cx="101" cy="80" r="32" stroke={G} strokeWidth="0.7" opacity="0.4" />
        {/* LIVE chip */}
        <g className="rise d1"><rect x="52" y="26" width="44" height="17" rx="8.5" fill={PLATE} fillOpacity="0.92" stroke={G} strokeWidth="0.8" /><circle className="pulse" cx="62" cy="34.5" r="2.6" fill={G} /><text x="72" y="38" fontFamily="var(--font)" fontSize="9" fontWeight="600" fill={G}>LIVE</text></g>
        {/* unde de transmisie */}
        <path className="draw d2" pathLength={1} d="M132 66 Q140 80 132 94" stroke={G} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        <path className="draw d3" pathLength={1} d="M140 60 Q151 80 140 100" stroke={G} strokeWidth="1" strokeLinecap="round" opacity="0.45" />
        {/* waveform-ul întrebărilor/răspunsurilor */}
        {[[158, 12], [170, 22], [182, 34], [194, 18], [206, 40], [218, 26], [230, 14], [242, 30], [254, 20]].map(([x, h], i) => (
          <rect key={i} className={`grow d${(i % 6) + 1}`} x={x} y={80 - h / 2} width="5" height={h} rx="2.5" fill={G} opacity={0.45 + (i % 3) * 0.22} style={{ transformOrigin: 'center', transformBox: 'fill-box' }} />
        ))}
      </Scene>
    </ArtBox>
  )
}

/* ── 1-LA-1 — rombul (mentorul) conectat DIRECT cu tine ───────────────── */
export function ArtCall() {
  const still = reduceMotion()
  return (
    <ArtBox>
      {still
        ? <Scene><path d="M88 58 L110 80 L88 102 L66 80 Z" fill="var(--accent-soft)" stroke={G} strokeWidth="1.4" /></Scene>
        : <LM x={66} y={58} w={44} h={44} shape="diamond" />}
      <Scene>
        <circle className="pulse d2" cx="88" cy="80" r="34" stroke={G} strokeWidth="0.6" opacity="0.35" />
        {/* legătura directă */}
        <path id="callpath" className="draw d2" pathLength={1} d="M118 80 C 150 62, 186 98, 212 80" stroke={G} strokeWidth="1" opacity="0.6" strokeDasharray="3 4" />
        {!still && (
          <circle className="t-flow" r="2.6" fill={G} style={{ filter: 'drop-shadow(0 0 4px rgba(201,168,76,0.9))' }}>
            <animateMotion dur="3.4s" repeatCount="indefinite"><mpath href="#callpath" /></animateMotion>
          </circle>
        )}
        {/* tu — avatarul conturat */}
        <g className="pop d3">
          <circle cx="238" cy="80" r="24" fill={PLATE} fillOpacity="0.85" stroke={G} strokeWidth="1.2" />
          <circle cx="238" cy="72" r="6.5" fill={G} opacity="0.9" />
          <path d="M226 94 Q238 83 250 94" stroke={G} strokeWidth="1.4" strokeLinecap="round" />
        </g>
        <circle className="pulse d4" cx="238" cy="80" r="32" stroke={G} strokeWidth="0.6" opacity="0.3" />
      </Scene>
    </ArtBox>
  )
}

/* ── ȘABLOANE — documentul de AUR (șablonul gata) peste dosarul tău ───── */
export function ArtDocs() {
  const still = reduceMotion()
  return (
    <ArtBox>
      {/* dosarul din spate */}
      <Scene>
        <rect className="rise d1" x="112" y="36" width="76" height="96" rx="7" fill={PLATE} fillOpacity="0.7" stroke={G} strokeWidth="0.8" opacity="0.7" transform="rotate(-8 150 84)" />
      </Scene>
      {/* șablonul de aur */}
      {still
        ? <Scene><rect x="136" y="30" width="74" height="98" rx="8" fill="var(--accent-soft)" stroke={G} strokeWidth="1.4" /></Scene>
        : <LM x={136} y={30} w={74} h={98} rounded={8} />}
      <Scene>
        <rect className="draw d2" pathLength={1} x="136" y="30" width="74" height="98" rx="8" stroke={G} strokeWidth="1.4" />
        {/* rândurile „completate" — plăcuțe închise peste aur */}
        {[46, 60, 74, 88].map((y, i) => (
          <rect key={i} className={`rise d${i + 2}`} x="146" y={y} width={i === 3 ? 30 : 54} height="7" rx="3.5" fill={PLATE} fillOpacity="0.85" />
        ))}
        {/* sigiliul completării */}
        <g className="pop d6">
          <circle cx="196" cy="112" r="8" fill={PLATE} stroke={G} strokeWidth="1" />
          <path d="M192 112 l2.8 2.8 L200.5 108.5" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </Scene>
    </ArtBox>
  )
}

/* ── COMUNITATE — nucleul topit + membrii legați de el ────────────────── */
export function ArtCommunity() {
  const still = reduceMotion()
  const MEMBERS: [number, number, number][] = [[92, 46, 10], [228, 46, 10], [64, 98, 8], [256, 98, 8], [118, 130, 9], [202, 130, 9]]
  return (
    <ArtBox>
      {still
        ? <Scene><circle cx="160" cy="80" r="21" fill="var(--accent-soft)" stroke={G} strokeWidth="1.4" /></Scene>
        : <LM x={139} y={59} w={42} h={42} shape="circle" />}
      <Scene>
        <circle className="pulse" cx="160" cy="80" r="30" stroke={G} strokeWidth="0.6" opacity="0.4" />
        {MEMBERS.map(([x, y, r], i) => (
          <g key={i}>
            <line className={`draw d${i + 1}`} pathLength={1} x1="160" y1="80" x2={x} y2={y} stroke={G} strokeWidth="0.6" opacity="0.3" />
            <g className={`pop d${i + 1}`}>
              <circle cx={x} cy={y} r={r} fill={PLATE} fillOpacity="0.9" stroke={G} strokeWidth="0.9" />
              <circle cx={x} cy={y - r * 0.28} r={r * 0.3} fill={G} opacity="0.85" />
              <path d={`M${x - r * 0.55} ${y + r * 0.55} Q${x} ${y} ${x + r * 0.55} ${y + r * 0.55}`} stroke={G} strokeWidth="0.9" strokeLinecap="round" />
            </g>
          </g>
        ))}
      </Scene>
    </ArtBox>
  )
}

/* ── SUPORT — checklistul implementării + sigiliul topit de garanție ──── */
export function ArtChecklist() {
  const still = reduceMotion()
  return (
    <ArtBox>
      {still
        ? <Scene><circle cx="230" cy="106" r="20" fill="var(--accent-soft)" stroke={G} strokeWidth="1.4" /></Scene>
        : <LM x={210} y={86} w={40} h={40} shape="circle" />}
      <Scene>
        {/* checklistul */}
        <rect className="pop d1" x="72" y="28" width="130" height="104" rx="10" fill={PLATE} fillOpacity="0.85" stroke={G} strokeWidth="0.9" />
        {[[46, true, 1], [72, true, 2], [98, false, 3]].map(([y, done, d], i) => (
          <g key={i} className={`rise d${d as number + 1}`}>
            <rect x="84" y={(y as number) - 7} width="14" height="14" rx="4" fill={done ? G : 'none'} stroke={G} strokeWidth="1.1" />
            {done ? <path d={`M87.5 ${y as number} l2.6 2.6 L95 ${(y as number) - 3.4}`} stroke="#0E0A06" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> : null}
            <rect x="106" y={(y as number) - 3} width={i === 1 ? 62 : 82} height="6" rx="3" fill={G} opacity={done ? 0.5 : 0.22} />
          </g>
        ))}
        {/* sigiliul de garanție — peste medalionul topit */}
        <circle className="pulse d4" cx="230" cy="106" r="27" stroke={G} strokeWidth="0.7" opacity="0.45" />
        <path className="draw d5" pathLength={1} d="M221 106 l6 6 L241 96" stroke="#0E0A06" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        {still && <path d="M221 106 l6 6 L241 96" stroke="#0E0A06" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />}
      </Scene>
    </ArtBox>
  )
}
