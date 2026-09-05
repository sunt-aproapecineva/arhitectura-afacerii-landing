/**
 * OTO — pagină post-cumpărare (one-time), afișată imediat DUPĂ ce clientul
 * plătește avansul, înainte de „mulțumim". Oferta: o consultație 1-la-1
 * ABSOLUT GRATUITĂ (accelerator, nu re-pitch). O singură decizie.
 * Copy în vocea Victor (operator calm), fără liniuțe lungi, fără hype.
 * Rută: /oto (vezi App.tsx). CTA → CONSULT_URL; refuz → OTO_DECLINE_URL.
 */
import { CONSULT_URL, OTO_DECLINE_URL } from '../lib/links'

const Tick = () => (
  <span className="oto-tick" aria-hidden>
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>
)

export default function OTO() {
  return (
    <div className="oto-page">
      <div className="oto-card">
        <div className="oto-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Plată primită · locul e rezervat
        </div>

        <h1 className="oto-h1">Locul tău e rezervat.<br />Mai stai 30 de secunde.</h1>

        <div className="oto-body">
          <p>Înainte să înceapă programul, vreau să vorbesc cu tine. Personal.</p>
          <p>Îți dau o <strong>consultație 1-la-1, absolut gratuită</strong>. Ne uităm împreună pe firma ta și îți spun de unde începi și care sunt primele mișcări. Intri în program cu direcția clară, nu cu întrebări.</p>
        </div>

        <ul className="oto-list">
          <li><Tick /> O privire pe afacerea ta, de la cineva care conduce 5 companii</li>
          <li><Tick /> Primele trei mișcări pentru firma ta, în ordine</li>
          <li><Tick /> Răspuns clar la „de unde încep", ca să nu pierzi primele săptămâni</li>
        </ul>

        <p className="oto-reason">E gratuită și nu se vinde nimic în ea. O oferim doar celor care și-au rezervat locul, în fereastra de dinainte de start, cât timpul lui Victor permite.</p>

        <a href={CONSULT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary oto-cta">
          Da, vreau consultația 1-la-1 gratuită
        </a>
        <a href={OTO_DECLINE_URL} className="oto-decline">Nu acum. Păstrez doar locul rezervat.</a>
      </div>
    </div>
  )
}
