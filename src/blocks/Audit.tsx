/**
 * Audit — ad landing (trafic rece) pentru cei care vor să-și rezolve haosul din
 * afacere (audiența AA Business). Un singur CTA: testul-diagnostic (quiz).
 * Aplică skill-urile Emil Kowalski (animate): vizual haos→ordine la mount
 * (explanation/delight, o singură dată), ease-out puternic, doar transform+opacity,
 * stagger 40ms, :active scale(0.97), gating reduced-motion + hover.
 */
import { useRef } from 'react'
import { QUIZ_URL } from '../lib/links'

const N = 24 // 6×4 — haos care se asamblează în sistem

function ChaosGrid() {
  // împrăștiere aleatoare, calculată o singură dată (offset + rotație + delay per punct).
  // Animație CSS pură (auAssemble) → rulează off-main-thread, pornește la mount, robustă.
  const scatter = useRef(
    Array.from({ length: N }, () => ({
      x: (Math.random() * 2 - 1) * 68,
      y: (Math.random() * 2 - 1) * 68,
      r: (Math.random() * 2 - 1) * 40,
      d: Math.round(Math.random() * 260),
    }))
  )
  return (
    <div className="au-grid" aria-hidden>
      {scatter.current.map((s, i) => (
        <span
          key={i}
          className={`au-dot${i === N - 2 ? ' gold' : ''}`}
          style={{ '--sx': `${s.x}px`, '--sy': `${s.y}px`, '--sr': `${s.r}deg`, '--dd': `${s.d}ms` } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

const PAINS = [
  'Telefonul sună și în vacanță',
  'Fiecare decizie trece prin tine',
  'Stingi incendii toată ziua',
  'Firma nu merge o săptămână fără tine',
]
const REVEALS = [
  { n: '01', t: 'Cât de dependentă e afacerea de tine', d: 'Un scor clar, alb pe negru — nu o părere.' },
  { n: '02', t: 'Unde se blochează, exact', d: 'Punctele în care totul se oprește și ajunge la tine.' },
  { n: '03', t: 'Primul pas ca să scapi de haos', d: 'Ce ai de făcut întâi, pe firma ta, ca să simți diferența.' },
]

function CTA({ block = false }: { block?: boolean }) {
  return (
    <a href={QUIZ_URL} className={`btn btn-primary au-cta${block ? ' au-cta-block' : ''}`}>
      Începe testul gratuit
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </a>
  )
}

export default function Audit() {
  return (
    <>
      <header className="au-nav">
        <a href="/" style={{ fontFamily: 'var(--font-display)', fontSize: 15, letterSpacing: '0.12em', color: 'var(--text)' }}>ARHITECTURA AFACERII</a>
      </header>

      <main className="au">
        {/* HERO — vizual haos→ordine + hook diagnostic + CTA */}
        <section className="au-hero">
          <ChaosGrid />
          <div className="au-eyebrow reveal">Test gratuit · 2 minute</div>
          <h1 className="au-h1 reveal">Cât de mult depinde afacerea ta de tine?</h1>
          <p className="au-sub reveal">
            Răspunde la câteva întrebări și primești pe loc o hartă a haosului din firma ta: unde se blochează, cât ține de tine și care e primul pas ca să scapi.
          </p>
          <div className="reveal" style={{ marginTop: 30 }}><CTA /></div>
          <div className="au-trust reveal">2 minute · fără card · rezultat instant</div>
        </section>

        {/* AGITAȚIE — recunoști haosul? */}
        <section className="au-section">
          <h2 className="au-h2 reveal">Dacă te regăsești aici, nu ești singur.</h2>
          <div className="au-pains reveal-group">
            {PAINS.map((p, i) => (
              <div key={i} className="au-pain">
                <span className="au-pain-dot" aria-hidden />
                {p}
              </div>
            ))}
          </div>
          <p className="au-note reveal">Nu e o problemă de muncă. E o problemă de sistem. Iar sistemul se poate vedea, măsura și repara.</p>
        </section>

        {/* CE AFLI — rezultatul testului */}
        <section className="au-section">
          <h2 className="au-h2 reveal">Ce afli din test</h2>
          <div className="au-reveals reveal-group">
            {REVEALS.map((r) => (
              <div key={r.n} className="au-rev">
                <span className="au-rev-n">{r.n}</span>
                <h3 className="au-rev-t">{r.t}</h3>
                <p className="au-rev-d">{r.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="au-final reveal">
          <h2 className="au-h2" style={{ marginTop: 0 }}>În 2 minute știi exact de unde începi.</h2>
          <p className="au-final-sub">Gratuit, pe loc, fără să lași cardul. Doar tu și adevărul despre firma ta.</p>
          <CTA block />
        </section>
      </main>

      <footer className="au-foot">Arhitectura Afacerii · Victor Morar</footer>
    </>
  )
}
