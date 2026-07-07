/**
 * TrustArts — arta cardurilor „De ce funcționează", PIXEL-PERFECT prin ArtBox
 * (LM + SVG în același sistem de coordonate 320×160, centrul scenei = (160,80)).
 *   1. Experiența — medalion topit concentric cu orbite + 5 companii + sweep
 *   2. Aplicat    — scut de metal topit (clip exact) + document + sigiliu ✓
 *   3. Sistemul   — romb topit + buclă-circuit cu 4 noduri + flux perpetuu
 * Reduced-motion → siluete statice, fără canvas.
 */
import { ArtBox, LM, Scene, reduceMotion, GOLD as G, PLATE } from './ArtBox'

/* ── 1. EXPERIENȚA — totul concentric în (160,80) ────────────────────── */
export function TrustExperience() {
  const still = reduceMotion()
  // 5 companii pe orbita rx110/ry52, unghiuri alese pentru echilibru vizual
  const NODES = [[50, 80], [270, 80], [89, 40], [231, 120], [160, 28]]
  return (
    <ArtBox>
      {!still && <div className="t-sweep" style={{ left: 85, top: 5 }} />}
      {still
        ? <Scene><circle cx="160" cy="80" r="38" fill="var(--accent-soft)" stroke={G} strokeWidth="1.6" /></Scene>
        : <LM x={122} y={42} w={76} h={76} shape="circle" />}
      <Scene>
        <circle cx="160" cy="80" r="50" stroke={G} strokeWidth="0.8" opacity="0.35" strokeDasharray="1.5 5" />
        <ellipse className="pulse" cx="160" cy="80" rx="110" ry="52" stroke={G} strokeWidth="0.7" opacity="0.32" />
        <ellipse cx="160" cy="80" rx="145" ry="66" stroke={G} strokeWidth="0.6" opacity="0.16" />
        {NODES.map(([x, y], i) => (
          <g key={i} className={`pop d${i + 1}`}>
            <circle cx={x} cy={y} r={i < 2 ? 3.6 : 3} fill={G} />
            <circle cx={x} cy={y} r={i < 2 ? 8 : 7} stroke={G} strokeWidth="0.6" opacity="0.4" />
          </g>
        ))}
        <path className="draw d3" pathLength={1} d="M58 80 H108 M262 80 H212" stroke={G} strokeWidth="0.7" opacity="0.5" strokeDasharray="2 4" />
      </Scene>
    </ArtBox>
  )
}

/* ── 2. APLICAT PE FIRMA TA — scut centrat în (160,~76), plate în scut ── */
const SHIELD = 'M160 26 L198 40 V78 Q198 112 160 126 Q122 112 122 78 V40 Z'
const SHIELD_LOCAL = 'M38 0 L76 14 V52 Q76 86 38 100 Q0 86 0 52 V14 Z' // același scut, în (0,0)-(76,100)

export function TrustApplied() {
  const still = reduceMotion()
  return (
    <ArtBox>
      {still
        ? <Scene><path d={SHIELD} fill="var(--accent-soft)" stroke={G} strokeWidth="2" /></Scene>
        : <LM x={122} y={26} w={76} h={100} clip={SHIELD_LOCAL} />}
      <Scene>
        {/* conturul scutului — exact peste clip */}
        <path className="draw d1" pathLength={1} d={SHIELD} stroke={G} strokeWidth="2" strokeLinejoin="round" />
        <path d="M160 34 L191 45.5 V77 Q191 104 160 116 Q129 104 129 77 V45.5 Z" stroke={G} strokeWidth="0.7" opacity="0.5" />
        {/* colțare tehnice */}
        <path className="draw d2" pathLength={1} d="M40 34 h13 M40 34 v13 M280 34 h-13 M280 34 v13 M40 126 h13 M40 126 v-13 M280 126 h-13 M280 126 v-13" stroke={G} strokeWidth="1" opacity="0.5" />
        {/* documentul firmei — încape integral în scut */}
        <g className="pop d3">
          <rect x="142" y="56" width="36" height="46" rx="4" fill={PLATE} fillOpacity="0.9" stroke={G} strokeWidth="0.9" />
          {[64, 71, 78].map((y, i) => (
            <rect key={i} className={`grow d${i + 3}`} x="147" y={y} width={i === 2 ? 14 : 26} height="2.6" rx="1.3" fill={G} opacity={i === 0 ? 0.85 : 0.45} style={{ transformOrigin: 'left center', transformBox: 'fill-box' }} />
          ))}
          <circle className="pop d5" cx="169" cy="94" r="6.5" fill={G} />
          <path className="draw d6" pathLength={1} d="M165.8 94 l2.3 2.3 L173.4 91.2" stroke="#0E0A06" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {/* linia de scan — rămâne în interiorul scutului */}
        <line className="t-scan" x1="132" y1="34" x2="188" y2="34" stroke={G} strokeWidth="0.8" opacity="0.6" />
      </Scene>
    </ArtBox>
  )
}

/* ── 3. SISTEM, NU MOTIVAȚIE — buclă centrată, noduri pe axele buclei ─── */
const LOOP = 'M96 20 H224 Q240 20 240 36 V124 Q240 140 224 140 H96 Q80 140 80 124 V36 Q80 20 96 20 Z'

export function TrustSystem() {
  const still = reduceMotion()
  return (
    <ArtBox>
      {still
        ? <Scene><path d="M160 52 L188 80 L160 108 L132 80 Z" fill="var(--accent-soft)" stroke={G} strokeWidth="1.4" /></Scene>
        : <LM x={130} y={50} w={60} h={60} shape="diamond" />}
      <Scene>
        <path id="tloop" className="draw d1" pathLength={1} d={LOOP} stroke={G} strokeWidth="0.9" opacity="0.45" />
        {/* oameni — stânga (centrat pe buclă la x=80) */}
        <g className="pop d2">
          <rect x="64" y="64" width="32" height="32" rx="8" fill={PLATE} fillOpacity="0.92" stroke={G} strokeWidth="0.9" />
          <circle cx="80" cy="75" r="4" fill={G} opacity="0.9" /><path d="M72 89 Q80 81 88 89" stroke={G} strokeWidth="1.2" strokeLinecap="round" />
        </g>
        {/* procese — dreapta (x=240) */}
        <g className="pop d3">
          <rect x="224" y="64" width="32" height="32" rx="8" fill={PLATE} fillOpacity="0.92" stroke={G} strokeWidth="0.9" />
          {[72, 79, 86].map((y, i) => <rect key={i} x={231} y={y} width={i === 1 ? 12 : 18} height="2.5" rx="1.2" fill={G} opacity={0.5 + i * 0.2} />)}
        </g>
        {/* cifre — sus (y=20) */}
        <g className="pop d4">
          <rect x="144" y="4" width="32" height="32" rx="8" fill={PLATE} fillOpacity="0.92" stroke={G} strokeWidth="0.9" />
          {[[150, 20, 10], [157, 14, 16], [164, 24, 6]].map(([x, y, h], i) => <rect key={i} x={x} y={y} width="4" height={h} rx="1.5" fill={G} opacity={0.55 + i * 0.15} />)}
        </g>
        {/* decizii ✓ — jos (y=140) */}
        <g className="pop d5">
          <rect x="144" y="124" width="32" height="32" rx="8" fill={PLATE} fillOpacity="0.92" stroke={G} strokeWidth="0.9" />
          <path d="M152 140 l5 5 L169 133" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {!still && [0, 1].map((k) => (
          <circle key={k} className="t-flow" r="2.6" fill={G} style={{ filter: 'drop-shadow(0 0 4px rgba(201,168,76,0.9))' }}>
            <animateMotion dur="7s" repeatCount="indefinite" begin={`${k * 3.5}s`}><mpath href="#tloop" /></animateMotion>
          </circle>
        ))}
      </Scene>
    </ArtBox>
  )
}
