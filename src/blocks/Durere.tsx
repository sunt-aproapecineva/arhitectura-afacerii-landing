/**
 * Durere — educație pe problemă înainte de soluție (încălzire).
 * Vizual: o PÂLNIE animată = metafora fondatorului-blocaj (toate problemele
 * curg prin gâtul pâlniei → ajung la tine, non-stop). Sub ea, cele 8 dureri
 * ca timeline: linie gold verticală cu un puls care coboară (fluxul spre
 * pâlnie), nod per item, fiecare se dezvăluie la scroll. Reduced-motion →
 * static. Limbajul e al audienței BUSINESS (cazuri reale), nu al nostru.
 */
import { type ReactNode } from 'react'

const DURERI: { t: string; d: string }[] = [
  { t: 'Telefonul sună și în vacanță.', d: 'Dacă nu răspunzi tu, se oprește tot. Așa că nu mai pleci nicăieri — sau pleci cu laptopul.' },
  { t: 'Ai angajați — dar fiecare decizie trece tot prin tine.', d: '„Șefu, cum fac aici?" de 30 de ori pe zi. Ai devenit coșul de gunoi al firmei tale.' },
  { t: 'Stingi incendii toată ziua.', d: 'Pentru lucrurile cu adevărat importante — strategie, creștere, viață — nu mai rămâne nimic.' },
  { t: 'Crești — și haosul crește odată cu tine.', d: 'Fiecare client nou aduce mai multă muncă pentru tine, nu pentru sistem. Pentru că sistemul nu există.' },
  { t: 'Nu îți permiți să te îmbolnăvești.', d: 'O săptămână în pat și firma intră în cădere liberă. Concediu medical? Nu există pentru tine.' },
  { t: 'Oamenii buni pleacă.', d: 'Fără roluri și procese clare, cei capabili se sufocă în haos. Rămân cei care așteaptă să le spui tu ce să facă.' },
  { t: 'Cifrele le afli la final de lună. Sau deloc.', d: 'Conduci din instinct, nu din date. Problemele le vezi abia când se simt în cont.' },
  { t: 'Firma ta nu valorează nimic fără tine.', d: 'Vrei să scalezi, să atragi investiții sau să vinzi? O afacere care depinde de fondator nu e un activ — e un job.' },
]

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

/* Pâlnia — metafora: multe probleme intră sus, se strâng, cad prin gât → la tine. */
function Funnel({ reduce }: { reduce: boolean }): ReactNode {
  const INS = [48, 84, 120, 156, 192] // x-urile fluxurilor care intră
  return (
    <div className="dur-funnel reveal" aria-hidden>
      <svg viewBox="0 0 240 236" width="100%" height="100%" role="img" fill="none">
        <defs>
          <linearGradient id="durFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.16" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0.02" />
          </linearGradient>
          <radialGradient id="durGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* fluxurile care intră (problemele) */}
        {INS.map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="8" r="2.6" fill="var(--accent)" opacity="0.85" />
            <line x1={x} y1="12" x2={x} y2="52" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.4"
              className={reduce ? undefined : 'dur-inflow'} strokeDasharray="3 6" style={{ animationDelay: `${i * 0.22}s` }} />
          </g>
        ))}

        {/* corpul pâlniei */}
        <path d="M34 56 L206 56 L136 132 L104 132 Z" fill="url(#durFill)" />
        <path d="M34 56 L104 132 M206 56 L136 132" stroke="var(--accent)" strokeOpacity="0.7" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="34" y1="56" x2="206" y2="56" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1.2" />
        {/* gâtul */}
        <path d="M104 132 L110 160 M136 132 L130 160" stroke="var(--accent)" strokeOpacity="0.7" strokeWidth="1.6" strokeLinecap="round" />

        {/* picăturile care cad prin gât spre tine */}
        {!reduce && [0, 0.9, 1.8].map((delay, i) => (
          <circle key={i} r="2.6" fill="var(--accent)">
            <animateMotion dur="2.7s" begin={`${delay}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear" path="M120 66 L120 170" />
            <animate attributeName="opacity" dur="2.7s" begin={`${delay}s`} repeatCount="indefinite" values="0;1;1;0.2" keyTimes="0;0.15;0.7;1" />
          </circle>
        ))}

        {/* miezul — TU, unde se strânge tot */}
        <circle cx="120" cy="188" r="34" fill="url(#durGlow)" />
        {!reduce && [0, 1.3].map((delay, i) => (
          <circle key={i} cx="120" cy="188" r="16" fill="none" stroke="var(--accent)" strokeWidth="1.2">
            <animate attributeName="r" values="16;30" dur="2.6s" begin={`${delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0" dur="2.6s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <circle cx="120" cy="188" r="16" fill="var(--accent)" />
        {/* silueta ta, în miez */}
        <circle cx="120" cy="183" r="3.6" fill="var(--on-accent)" />
        <path d="M113 195 a7 7 0 0 1 14 0" fill="var(--on-accent)" />
      </svg>
      <div className="dur-funnel-cap">Totul trece prin tine</div>
    </div>
  )
}

export default function Durere() {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <section id="durere" className="section" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div style={{ maxWidth: 900, marginInline: 'auto', textAlign: 'center' }}>
          <div className="eyebrow reveal" style={{ marginBottom: 18 }}>Îți sună cunoscut?</div>
          <h2 className="h-lg reveal" style={{ textWrap: 'balance' }}>Dacă te regăsești într-o situație de mai jos, îți recomand să vii. Dacă în mai multe — trebuie să vii.</h2>
        </div>

        <Funnel reduce={reduce} />

        <div className="dur-timeline">
          <span className="dur-line" aria-hidden />
          {DURERI.map((p, i) => (
            <div key={i} className="dur-item reveal">
              <div className="dur-node" aria-hidden><span /></div>
              <div className="dur-body">
                <div className="dur-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="dur-title">{p.t}</h3>
                <p className="dur-desc">{p.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: 'clamp(40px,6vw,64px)', maxWidth: 720, marginInline: 'auto', textAlign: 'center' }}>
          <p className="lede" style={{ color: 'var(--text)' }}>Nu ți-a lipsit munca. Nu ți-a lipsit efortul.<br />Ți-a lipsit <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>proiectul</em>.</p>
          <a href="#metoda" className="btn-link" style={{ marginTop: 20, justifyContent: 'center' }}>Vezi cum se construiește corect <Arrow /></a>
        </div>
      </div>
    </section>
  )
}
