/**
 * Landing.tsx — Arhitectura Afacerii, structură Mercury (Linear/Stripe-style):
 * dark minimalist, mult spațiu, text-driven, un singur accent (gold) pe CTA,
 * butoane pill, headinguri light, feature-lists separate prin linii fine.
 */
import { useEffect, useState, type ReactNode } from 'react'
import HeroVideos from './HeroVideos'
import { ArtVideo, ArtLive, ArtCall, ArtDocs, ArtCommunity, ArtChecklist } from '../fx/BentoArts'
import EtapeFilm from './EtapeFilm'
import DurereStack from './DurereStack'
import RadialTimeline from './RadialTimeline'
import Pricing from './Pricing'
import { TrustExperience, TrustApplied, TrustSystem } from '../fx/TrustArts'
import { Magnetic, Tilt, RevealWords, Marquee, KenBurns } from '../fx/anim'
import { ENROLL_URL } from '../lib/links'
import Analytics from './Analytics'
import Intelligence from './Intelligence'

/* ── primitive ──────────────────────────────────────────────────────── */
const Arrow = ({ s = 16 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
function Section({ id, children, top }: { id?: string; children: ReactNode; top?: boolean }) {
  return <section id={id} className="section" style={top ? {} : { borderTop: '1px solid var(--line)' }}><div className="container">{children}</div></section>
}
function Head({ eyebrow, title, lede, max = 760 }: { eyebrow?: string; title: ReactNode; lede?: ReactNode; max?: number }) {
  return (
    <div style={{ maxWidth: max, marginBottom: 'clamp(40px,6vw,72px)' }}>
      {eyebrow && <div className="eyebrow reveal" style={{ marginBottom: 18 }}>{eyebrow}</div>}
      {typeof title === 'string'
        ? <RevealWords as="h2" className="h-lg" text={title} />
        : <h2 className="h-lg reveal">{title}</h2>}
      {lede && <p className="lede reveal" style={{ marginTop: 22 }}>{lede}</p>}
    </div>
  )
}
/* ── NAV ────────────────────────────────────────────────────────────── */
const NAV = [['Metoda', '#metoda'], ['Transformarea', '#transformare'], ['Cazuri', '#cazuri'], ['Victor', '#victor'], ['Pachete', '#pachete']]
function Nav({ solid }: { solid: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <nav className={`nav${solid ? ' nav--solid' : ''}`}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          <a href="#top" style={{ fontFamily: 'var(--font-display)', fontSize: 15, letterSpacing: '0.12em', color: 'var(--text)' }}>ARHITECTURA AFACERII</a>
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {NAV.map(([l, h]) => <a key={l} href={h} className="nav-link">{l}</a>)}
            <Magnetic href={ENROLL_URL} className="btn btn-ghost btn-sm" strength={0.5}>Înscrie-te</Magnetic>
          </div>
          <button className="nav-burger" aria-label="Meniu" onClick={() => setOpen(true)} style={{ display: 'none', background: 'none', border: 'none', flexDirection: 'column', gap: 5, cursor: 'pointer', padding: 6 }}>
            <span style={{ width: 22, height: 1.5, background: 'var(--text)' }} /><span style={{ width: 22, height: 1.5, background: 'var(--text)' }} /><span style={{ width: 22, height: 1.5, background: 'var(--text)' }} />
          </button>
        </div>
      </nav>
      <div className="nav-drawer" style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(14,10,6,0.97)', backdropFilter: 'blur(18px)', display: open ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center', gap: 22, padding: 'clamp(2rem,8vw,4rem)' }}>
        <button aria-label="Închide" onClick={() => setOpen(false)} style={{ position: 'absolute', top: 22, right: 22, background: 'none', border: 'none', color: 'var(--text)', fontSize: 30, cursor: 'pointer', lineHeight: 1 }}>×</button>
        {NAV.map(([l, h]) => <a key={l} href={h} onClick={() => setOpen(false)} style={{ fontSize: 30, fontWeight: 400, color: 'var(--text)' }}>{l}</a>)}
        <a href={ENROLL_URL} onClick={() => setOpen(false)} className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 16 }}>Înscrie-te la program</a>
      </div>
    </>
  )
}

/* ── date ───────────────────────────────────────────────────────────── */
const ETAPE = [
  { t: 'Fundația', d: 'Claritate totală: ce faci tu, ce nu mai faci tu, unde merge compania în 3–5 ani.' },
  { t: 'Structura', d: 'Organigrama reală — cine face ce, cine răspunde de ce, unde se opresc problemele.' },
  { t: 'Instalațiile', d: 'Procesele scrise pentru fiecare funcție cheie. Cum se face, pas cu pas, fără tine în cameră.' },
  { t: 'Tabloul de bord', d: 'Sistemul de raportare. Conduci din cifre, nu din telefoane. Datele vin la tine.' },
  { t: 'Predarea cheilor', d: 'Delegi responsabilitatea, nu sarcinile. Afacerea funcționează fără tine prezent.' },
  { t: 'Casa vie', d: 'O afacere completă, care merge înainte. Tu ești liber să construiești ce urmează.' },
]
const CAZURI = [
  { n: 'Daria', tag: 'FAST-FOOD', r: 'Rețea fast-food · 30+ angajați', q: 'Mă simțeam coșul de gunoi al firmei. Acum am organigramă și procese. Prima zi fără telefon a venit în săptămâna 6.' },
  { n: 'Alina', tag: 'SERVICII', r: 'Salon · delegare reală', q: '7 ani fără concediu. Am delegat responsabilitatea, nu sarcinile. Anul ăsta — 10 zile de vacanță, telefon închis.' },
  { n: 'Gheorghe', tag: 'PRODUCȚIE', r: 'Producție · 15 angajați', q: 'Creșterea se oprise. Cu tabloul de bord și KPI-uri clare, profitul a urcat cu 28% în primul trimestru.' },
]
const OBIECTII = [
  { q: 'Cum mă înscriu?', a: 'Apeși pe „Înscrie-te" și primești direct detaliile înscrierii — pachetele, prețurile și pașii următori. Grupul e restrâns intenționat, iar locurile se ocupă în ordinea înscrierii.' },
  { q: 'E pentru afacerea mea?', a: 'Programul e construit pentru afaceri active — cu clienți, cu angajați (sau pe cale să angajeze) — blocate în operațional: totul trece prin fondator. Dacă te-ai regăsit în situațiile de mai sus, e pentru tine. Mărimea sau domeniul nu contează; lipsa sistemului arată la fel peste tot.' },
  { q: 'E prea scump', a: 'Înțeleg — și haosul costă lunar: ore pierdute, decizii amânate, creștere oprită. Gheorghe (producție, 15 angajați) și-a recuperat investiția în primul trimestru: +28% profit după ce a pus tabloul de bord. Programul se plătește o singură dată — sistemul rămâne.' },
  { q: 'Nu am timp', a: '2–3 ore pe săptămână — mai puțin decât pierzi acum în haos într-o singură zi. Iar programul e construit exact pentru oameni fără timp: fiecare oră investită îți întoarce ore, pentru că predai din mers ce documentezi.' },
  { q: 'Am mai cumpărat cursuri și nu m-au ajutat', a: 'Aceasta nu e un curs. E un practicum — construiești, nu consumi. La final ai documente completate pe firma ta, procese scrise și un sistem care funcționează. Dacă ai notițe frumoase și nimic schimbat, ai avut un curs. Aici e invers.' },
  { q: 'Și dacă nu funcționează la mine?', a: 'Victor lucrează cu situația ta concretă, nu cu cazuri generice. Alina avea salon — „la mine nu se poate delega". După 8 săptămâni: prima vacanță în 7 ani, cu telefonul închis. Programul se aplică pe firma ta, în timp real.' },
  { q: 'Pot face asta singur?', a: 'Poți. Victor a făcut-o singur — i-a luat ani și greșeli plătite scump. Asta e diferența dintre a construi fără proiect și a construi cu proiect: 3–5 ani, sau 8 săptămâni.' },
]

/* ── BENTO „Ce primești" — fiecare card cu mini-vizual animat (Mercury) ── */
const PRIMESTI_BENTO: { t: string; d: string; art: ReactNode; wide?: boolean }[] = [
  { t: 'Lecții video, etapă cu etapă', d: 'Fiecare din cele 6 etape, filmată cu exemple reale din România și Moldova. Construiești în timp ce înveți.', art: <ArtVideo />, wide: true },
  { t: 'Sesiuni live cu Victor', d: 'Grup restrâns, mentorul prezent. Întrebări reale, răspunsuri pe cazul tău.', art: <ArtLive /> },
  { t: 'Apeluri 1-la-1', d: 'Cazul tău, firma ta, echipa ta. Diferențiat pe pachete.', art: <ArtCall /> },
  { t: 'Șabloane gata de folosit', d: 'Organigrame, fișe de post, procese model — instant, completate pe firma ta.', art: <ArtDocs /> },
  { t: 'Comunitate privată', d: 'Antreprenori reali. Peer learning, nu un curs solitar.', art: <ArtCommunity /> },
  { t: 'Suport la implementare', d: 'Nu doar teorie — ajutor la fiecare pas pe care îl faci.', art: <ArtChecklist />, wide: true },
]
function Bento() {
  return (
    <Section>
      <Head eyebrow="Ce primești — concret" title="Construiești, nu memorezi." lede="Nu un curs. Un practicum — cu tot ce-ți trebuie ca să aplici, etapă cu etapă." />
      <div className="bento reveal-group tilt-scene">
        {PRIMESTI_BENTO.map((c, i) => (
          <Tilt key={i} max={5} className={`bento-card${c.wide ? ' wide' : ''}`}>
            <div className="bento-art">{c.art}</div>
            <div className="bento-text"><h3>{c.t}</h3><p>{c.d}</p></div>
          </Tilt>
        ))}
      </div>
    </Section>
  )
}

/* ── TESTIMONIAL rotativ (Mercury: card mare, citat + portret + tag) ──── */
const TESTIMONIALS = [
  { tag: 'BUSINESS · Fast-food', q: 'Mă simțeam coșul de gunoi al firmei — toate problemele veneau la mine. Acum am organigramă și procese scrise. Prima zi fără un singur telefon de la echipă a venit în săptămâna 6.', n: 'Daria', r: 'Rețea fast-food · 30+ angajați' },
  { tag: 'BUSINESS · Producție', q: 'Creșterea se oprise — munceam mai mult, dar cifrele stăteau pe loc. Cu tabloul de bord și KPI-uri clare pe fiecare rol, profitul a urcat cu 28% în primul trimestru.', n: 'Gheorghe', r: 'Producție · 15 angajați' },
  { tag: 'BUSINESS · Servicii', q: '7 ani fără concediu, pentru că totul depindea de mine. Am învățat să deleg responsabilitatea, nu sarcinile. Anul ăsta — 10 zile de vacanță, cu telefonul închis.', n: 'Alina', r: 'Salon · delegare reală' },
]
function FeaturedTestimonial() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 6500)
    return () => clearInterval(id)
  }, [])
  const t = TESTIMONIALS[i]
  return (
    <div className="reveal" style={{ border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', background: 'var(--surface)', padding: 'clamp(28px,4.5vw,56px)', marginBottom: 'clamp(32px,5vw,56px)', overflow: 'hidden' }}>
      <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 22 }}>{t.tag}</div>
      <p key={i} className="h quote-in" style={{ minHeight: '3.2em', maxWidth: 880, fontWeight: 400 }}>„{t.q}"</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'clamp(24px,3vw,36px)', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 17, flexShrink: 0 }}>{t.n[0]}</span>
          <div><div style={{ fontSize: 15 }}>{t.n}</div><div className="muted" style={{ fontSize: 13 }}>{t.r}</div></div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {TESTIMONIALS.map((_, k) => (
            <button key={k} aria-label={`Testimonial ${k + 1}`} onClick={() => setI(k)} style={{ width: k === i ? 26 : 9, height: 9, borderRadius: 6, border: 'none', cursor: 'pointer', background: k === i ? 'var(--accent)' : 'var(--line-hi)', transition: 'width .35s ease, background .35s ease' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── TRUST — bloc contrast, „de ce funcționează" (Mercury security) ───── */
const TRUST = [
  { art: <TrustExperience />, t: 'Construit pe 18 ani reali', d: 'Nu teorie de pe internet — sistemul prin care Victor conduce azi 5 companii cu 250+ oameni, fără să fie indispensabil în niciuna.' },
  { art: <TrustApplied />, t: 'Aplicat pe firma ta', d: 'Lucrezi pe cazul tău concret, nu pe studii de caz generice. Ieși cu documente, procese și un tablou de bord — nu cu notițe.' },
  { art: <TrustSystem />, t: 'Sistem, nu motivație', d: 'Rezultatul rămâne după ce se termină programul: o competență de sistematizare pe care o aplici la orice afacere, de acum înainte.' },
]
function Trust() {
  return (
    <Section>
      <div className="trust reveal">
        <div style={{ maxWidth: 620 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>De ce funcționează</div>
          <h2 className="h-lg">Cursurile obișnuite se opresc la teorie. Aici construiești.</h2>
        </div>
        <div className="trust-grid reveal-group">
          {TRUST.map((c, i) => (
            <div key={i}>
              <div className="trust-art">{c.art}</div>
              <h3 className="h-sm" style={{ marginBottom: 10, fontWeight: 400 }}>{c.t}</h3>
              <p className="muted" style={{ fontSize: 15, lineHeight: 1.55 }}>{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ── BLOC 2 — „Imaginează-ți" (viziunea, centrat, rânduri echilibrate) ── */
function Imagineaza() {
  const Acc = ({ children }: { children: ReactNode }) => <span style={{ color: 'var(--accent)' }}>{children}</span>
  return (
    <Section top>
      <div className="reveal" style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
        <p className="balance" style={{ fontSize: 'clamp(23px,3.2vw,36px)', fontWeight: 400, lineHeight: 1.42, letterSpacing: '-0.005em' }}>
          Imaginează-ți o zi în care ai <Acc>luxul să nu pleci la oficiu</Acc> — fără grija că fără tine lucrurile vor merge prost. <Acc>Ai timp</Acc> să iei decizii strategice, să petreci cu familia, <Acc>să ai grijă de tine și de sănătatea ta</Acc>.
        </p>
      </div>
    </Section>
  )
}

/* ── CINEMATIC STATEMENT — fundal AI (Ken-Burns) + o singură frază ───── */
function CinematicStatement() {
  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--line)' }}>
      <KenBurns src="/atmos/build.jpg" />
      <div className="grain" aria-hidden />
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', minHeight: '34vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <RevealWords as="h2" className="display" text="O afacere se construiește o singură dată." />
        <p className="lede" style={{ margin: '20px auto 0', maxWidth: 560, color: 'rgba(241,234,217,0.86)' }}>Hai s-o construim corect — cu proiect, nu pe ghicite.</p>
      </div>
    </section>
  )
}

function Cazuri() {
  return (
    <Section id="cazuri">
      <Head eyebrow="Cazuri reale" title="Oameni reali. Situații reale." lede="Antreprenori care au trecut prin cele 8 săptămâni — și ce s-a schimbat concret." />
      <FeaturedTestimonial />
      <div className="reveal-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,280px),1fr))', gap: 20 }}>
        {CAZURI.map((c, i) => (
          <div key={i} className="card-lift" style={{ borderTop: '1px solid var(--line)', paddingTop: 24, display: 'flex', flexDirection: 'column', minHeight: 240 }}>
            <p style={{ flex: 1, fontSize: 16, lineHeight: 1.55, color: 'var(--text)' }}>„{c.q}"</p>
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: 14, flexShrink: 0 }}>{c.n[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14 }}>{c.n}</div>
                <div style={{ fontSize: 12, color: 'var(--text-faint)' }}>{c.r}</div>
              </div>
              <span style={{ fontSize: 11, letterSpacing: '0.06em', color: 'var(--accent)' }}>{c.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Victor() {
  return (
    <Section id="victor">
      <div style={{ display: 'flex', gap: 'clamp(32px,6vw,80px)', alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="reveal" style={{ flex: '1 1 300px', maxWidth: 380 }}>
          <div style={{ aspectRatio: '4/5', borderRadius: 'var(--r-sm)', overflow: 'hidden', border: '1px solid var(--line)' }}>
            <img src="/victor/hero.jpg" alt="Victor Morar" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.15)' }} />
          </div>
        </div>
        <div className="reveal" style={{ flex: '1 1 420px' }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>Mentorul</div>
          <h2 className="h-lg" style={{ marginBottom: 24 }}>Victor Morar</h2>
          <p className="lede" style={{ marginBottom: 18 }}>Am construit prima afacere la 16 ani. Am greșit ordinea de nenumărate ori, am plătit scump, am construit din nou — de data asta cu proiect.</p>
          <p className="muted" style={{ marginBottom: 28 }}>Azi conduc 5 companii cu 250+ oameni — și nu sunt indispensabil în niciuna. Am creat Arhitectura Afacerii pentru că nimeni nu mi-a arătat cum se face corect. Nici mie, nici ție.</p>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[['18', 'ani antreprenoriat'], ['5', 'companii'], ['250+', 'oameni']].map(([v, l]) => (
              <div key={l}><div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--text)' }}>{v}</div><div className="muted" style={{ fontSize: 13 }}>{l}</div></div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <Section id="intrebari">
      <Head eyebrow="Întrebări" title="Întrebările pe care ți le pui acum." max={680} />
      <div className="reveal">
        {OBIECTII.map((o, i) => {
          const on = open === i
          return (
            <div key={i} style={{ borderTop: '1px solid var(--line)' }}>
              <button onClick={() => setOpen(on ? null : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '22px 0', cursor: 'pointer', gap: 16, color: 'var(--text)' }}>
                <span style={{ fontSize: 'clamp(16px,2vw,19px)', fontWeight: 400 }}>{o.q}</span>
                <span style={{ color: 'var(--accent)', fontSize: 22, flexShrink: 0, transform: on ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s ease', lineHeight: 1 }}>+</span>
              </button>
              <div style={{ display: 'grid', gridTemplateRows: on ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s ease' }}>
                <div style={{ overflow: 'hidden' }}><p className="muted" style={{ paddingBottom: 24, maxWidth: 640 }}>{o.a}</p></div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

function Footer() {
  const COLS = [
    { h: 'Program', l: [['Metoda', '#metoda'], ['Transformarea', '#transformare'], ['Platforma', '#platforma'], ['Pachete', '#pachete']] },
    { h: 'Despre', l: [['Victor Morar', '#victor'], ['Cazuri reale', '#cazuri'], ['Întrebări', '#intrebari'], ['Înscriere', ENROLL_URL]] },
    { h: 'Contact', l: [['Instagram', '#'], ['Telegram', '#'], ['YouTube', '#'], ['Email', '#']] },
  ]
  return (
    <footer style={{ borderTop: '1px solid var(--line)', paddingBlock: 'clamp(56px,8vw,80px) 40px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px,1fr) repeat(3, auto)', gap: 'clamp(32px,5vw,64px)', alignItems: 'start', flexWrap: 'wrap' }} className="footer-grid">
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, letterSpacing: '0.1em', marginBottom: 14 }}>ARHITECTURA<br />AFACERII</div>
            <p className="muted" style={{ fontSize: 13, maxWidth: 240 }}>Practicum de sistematizare. 6 etape, 8 săptămâni, livrabile reale.</p>
          </div>
          {COLS.map(col => (
            <div key={col.h}>
              <div className="eyebrow" style={{ marginBottom: 16 }}>{col.h}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.l.map(([l, h]) => <a key={l} href={h} className="muted" style={{ fontSize: 14 }}>{l}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'clamp(40px,6vw,64px)', paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span className="muted" style={{ fontSize: 12 }}>© 2026 Arhitectura Afacerii · Victor Morar</span>
          <span className="muted" style={{ fontSize: 12 }}>Chișinău</span>
        </div>
      </div>
    </footer>
  )
}

/* ── compunere ──────────────────────────────────────────────────────── */
export default function Landing({ navSolid }: { navSolid: boolean }) {
  return (
    <>
      <Nav solid={navSolid} />
      <HeroVideos />
      <div style={{ borderBottom: '1px solid var(--line)', background: 'var(--surface)', paddingBlock: 20 }}>
        <Marquee items={['Proiect, nu improvizație', '6 etape', '8 săptămâni', 'Livrabile reale, nu notițe', 'Aplici pe firma ta', 'Mentor prezent', 'Grup restrâns']} />
      </div>
      <main>
        {/* Ordinea de încălzire: viziune → durere → soluție → dovadă → produs → ofertă */}
        <Imagineaza />
        <DurereStack />
        <Section id="metoda">
          <Head eyebrow="Metoda" title="O afacere se construiește ca o casă." lede="Nimeni normal la cap nu construiește o casă fără proiect. Cele 6 etape, în ordinea exactă în care se ridică un business — derulează." />
        </Section>
        <EtapeFilm items={ETAPE} />
        <Analytics />
        <Cazuri />
        <RadialTimeline />
        <Bento />
        <Victor />
        <Intelligence />
        <Trust />
        <CinematicStatement />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
