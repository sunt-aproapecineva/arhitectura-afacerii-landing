/**
 * LongRead — variantă advertorial / long-read pentru reclamă (trafic rece).
 * Structură editorială, un singur fir narativ, FĂRĂ prețuri/tarife.
 * Principii aplicate (din research):
 *  • above-the-fold benefit-driven pe dream outcome (nu „cine suntem")
 *  • storytelling la persoana a II-a (cititorul e protagonistul) → emoție
 *  • un singur CTA repetat, conversie peste decor
 * Paleta gold/dark, fonturi Arimo + Aboreto. Ușor și rapid (fără WebGL/video).
 * Rută: /citeste  (vezi App.tsx). CTA → landingul principal (LR_CTA_URL).
 */
import { useEffect, useRef } from 'react'

const LR_CTA_URL = '/' // unde duce butonul (landingul principal). Schimbă la nevoie.
const CTA_LABEL = 'Vreau să construiesc corect'

function CTA({ small = false }: { small?: boolean }) {
  return (
    <a href={LR_CTA_URL} className="btn btn-primary lr-cta-btn" style={small ? { padding: '13px 24px' } : { padding: '17px 36px', fontSize: 17 }}>
      {CTA_LABEL} →
    </a>
  )
}

export default function LongRead() {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
    }
    addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* bară de progres la citit */}
      <div className="lr-progress"><div ref={barRef} className="lr-progress-fill" /></div>

      {/* nav minimal */}
      <header className="lr-nav">
        <a href="/" style={{ fontFamily: 'var(--font-display)', fontSize: 15, letterSpacing: '0.12em', color: 'var(--text)' }}>ARHITECTURA AFACERII</a>
        <CTA small />
      </header>

      <article className="lr">
        {/* ABOVE THE FOLD — hook pe rezultatul dorit */}
        <header className="lr-hero">
          <div className="lr-eyebrow reveal">Pentru antreprenorul care ține totul pe umeri</div>
          <h1 className="lr-h1 reveal">Ai construit o afacere care nu poate merge fără tine.<br /><em>Se poate repara.</em></h1>
          <p className="lr-sub reveal">
            Cum treci de la „totul trece prin mine" la un business cu sistem — care funcționează și când tu nu ești în priză. Fără să muncești mai mult.
          </p>
          <div className="reveal" style={{ marginTop: 34 }}><CTA /></div>
        </header>

        <div className="lr-body">
          {/* POVESTEA — persoana a II-a */}
          <p className="lr-lead reveal">
            E 21:40. Ai ajuns acasă acum o oră, dar telefonul a mai sunat deja de două ori. „Șefu, cum fac cu comanda de mâine?" Răspunzi. Pentru că, dacă nu răspunzi tu, se oprește tot.
          </p>
          <p className="reveal">
            Ai angajați. Ai clienți. Din afară, pare că merge. Dar tu știi adevărul: fiecare decizie, fiecare problemă, fiecare „nu știu ce să fac" ajunge, până la urmă, tot la tine. Ai devenit coșul de gunoi al propriei firme.
          </p>
          <p className="reveal">
            Ți-ai luat ultima vacanță cu laptopul în rucsac. Te-ai îmbolnăvit o dată și ai condus firma de pe marginea patului, pentru că nu avea cine altcineva. Crești — și, în loc să fie mai ușor, e mai greu: fiecare client nou aduce mai multă muncă pentru tine, nu pentru sistem. Pentru că sistemul nu există.
          </p>

          <blockquote className="lr-quote reveal">
            Nu ți-a lipsit munca. Nu ți-a lipsit efortul.<br />Ți-a lipsit <em>proiectul</em>.
          </blockquote>

          <p className="reveal">
            Aici e capcana în care cad aproape toți antreprenorii buni: cred că soluția e să muncească mai mult, să se organizeze mai bine, să găsească „omul potrivit". Așa că adaugă oameni peste haos — și haosul se face doar mai mare, mai scump, mai greu de controlat.
          </p>
          <p className="reveal">
            Adevărul e mai simplu și mai incomod: o afacere care depinde de fondator nu e un activ. E un job foarte bine plătit, din care nu poți ieși.
          </p>

          {/* MECANISMUL — metafora casei */}
          <h2 className="lr-h2 reveal">O afacere se construiește ca o casă</h2>
          <p className="reveal">
            Nimeni întreg la cap nu ridică o casă fără proiect. Nu torni fundația „din instinct", nu pui acoperișul înainte de pereți, nu speri că iese bine. Ai un plan, o ordine, un rezultat previzibil.
          </p>
          <p className="reveal">
            Cu afacerea, în schimb, majoritatea construiesc pe ghicite. Adaugă etaje peste o fundație care nu există. Iar când începe să scârțâie, dau vina pe piață, pe oameni, pe ei înșiși — când, de fapt, lipsea proiectul.
          </p>
          <p className="reveal">
            <strong>Sistematizarea</strong> este exact acel proiect. Nu e magie și nu e „mai multă disciplină". Sunt câțiva pași, în ordinea corectă în care se ridică un business care nu mai depinde de tine:
          </p>

          <ul className="lr-steps reveal-group">
            <li><b>Organigrama reală</b> — cine face ce și cine răspunde de ce, ca problemele să nu mai ajungă toate la tine.</li>
            <li><b>Roluri cu cifre clare</b> — fiecare om știe ce are de făcut și după ce e măsurat, fără să te întrebe la fiecare pas.</li>
            <li><b>Procesele, scrise</b> — un om nou intră și lucrează după ele din prima zi.</li>
            <li><b>Tabloul de bord</b> — conduci din date, nu din telefoane. Vezi o problemă când apare, nu peste trei luni în cont.</li>
            <li><b>Delegarea reală</b> — predai responsabilitatea, nu doar sarcinile. Pleci o săptămână și nu te sună nimeni.</li>
          </ul>

          {/* AFTER-STATE — dream outcome concret */}
          <h2 className="lr-h2 reveal">Cum arată de partea cealaltă</h2>
          <p className="reveal">
            Îți imaginezi o zi în care telefonul nu sună pentru că cineva nu știe ce să facă. În care pleci în concediu și afacerea merge mai departe. În care te uiți într-un tablou de bord și vezi, în cinci minute, cum stă firma — fără să suni pe nimeni.
          </p>
          <p className="reveal">
            Nu e o fantezie. E ceea ce se întâmplă când pui proiectul la locul lui. Aceeași firmă, aceiași oameni, același tu — dar cu un sistem care duce greutatea în locul tău.
          </p>

          <blockquote className="lr-quote reveal">
            Tema despre organigramă și matricea decizională a fost o revelație. Nu-mi vine să cred că am condus afacerea atâția ani fără aceste instrumente.
            <cite>— Daniela, la jumătatea practicumului</cite>
          </blockquote>

          <p className="reveal">
            Ioan, cu o rețea de florării, și-a văzut prima dată clar ce trebuie construit ca să devină franciză. Un altul, cu barbershop-uri, a înțeles de ce pierdea specialiști buni — și ce sistem îi ține. Nu sunt cazuri „de manual". Sunt oameni care au făcut exact primul pas pe care îl faci și tu acum: au văzut proiectul.
          </p>

          {/* CINE — credibilitate, anti-guru */}
          <h2 className="lr-h2 reveal">Cine te ghidează</h2>
          <p className="reveal">
            Victor Morar nu vinde teorie de pe internet. Sistemul despre care vorbește e cel prin care conduce astăzi 5 companii, cu peste 250 de oameni, fără să fie indispensabil în niciuna. L-a construit pe pielea lui, cu greșeli plătite scump, de-a lungul a 18 ani.
          </p>
          <p className="reveal">
            De asta nu lucrează cu „studii de caz generice", ci cu firma ta, în timp real. Implementezi fiecare lecție pe loc — și vezi ce se schimbă pe măsură ce construiești, nu abia la final.
          </p>

          {/* CTA final */}
          <div className="lr-final reveal">
            <h2 className="lr-h2" style={{ marginTop: 0 }}>Dacă te-ai regăsit în povestea asta</h2>
            <p style={{ marginBottom: 26 }}>
              Atunci nu ai o problemă de muncă. Ai una de proiect. Și proiectul se poate face — în ordinea corectă, pe firma ta.
            </p>
            <CTA />
            <p className="lr-final-note">Locurile sunt limitate intenționat — mentorat real, nu webinar cu 500 de oameni.</p>
          </div>
        </div>
      </article>

      <footer className="lr-foot">
        <span>Arhitectura Afacerii · Victor Morar</span>
      </footer>
    </>
  )
}
