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
import { useContent } from '../content/ContentContext'
import { Rich } from '../content/rich'

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
  const c = useContent()
  return (
    <>
      <nav className={`nav${solid ? ' nav--solid' : ''}`}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          <a href="#top" style={{ fontFamily: 'var(--font-display)', fontSize: 15, letterSpacing: '0.12em', color: 'var(--text)' }}>ARHITECTURA AFACERII</a>
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {NAV.map(([l, h]) => <a key={l} href={h} className="nav-link">{l}</a>)}
            <Magnetic href={ENROLL_URL} className="btn btn-ghost btn-sm" strength={0.5}>{c.nav.cta}</Magnetic>
          </div>
          <button className="nav-burger" aria-label="Meniu" onClick={() => setOpen(true)} style={{ display: 'none', background: 'none', border: 'none', flexDirection: 'column', gap: 5, cursor: 'pointer', padding: 6 }}>
            <span style={{ width: 22, height: 1.5, background: 'var(--text)' }} /><span style={{ width: 22, height: 1.5, background: 'var(--text)' }} /><span style={{ width: 22, height: 1.5, background: 'var(--text)' }} />
          </button>
        </div>
      </nav>
      <div className="nav-drawer" style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(14,10,6,0.97)', backdropFilter: 'blur(18px)', display: open ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center', gap: 22, padding: 'clamp(2rem,8vw,4rem)' }}>
        <button aria-label="Închide" onClick={() => setOpen(false)} style={{ position: 'absolute', top: 22, right: 22, background: 'none', border: 'none', color: 'var(--text)', fontSize: 30, cursor: 'pointer', lineHeight: 1 }}>×</button>
        {NAV.map(([l, h]) => <a key={l} href={h} onClick={() => setOpen(false)} style={{ fontSize: 30, fontWeight: 400, color: 'var(--text)' }}>{l}</a>)}
        <a href={ENROLL_URL} onClick={() => setOpen(false)} className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 16 }}>{c.nav.ctaDrawer}</a>
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
// Întrebările/obiectiile (FAQ) vin din stratul de conținut: src/content/default.json → faq.items

/* ── BENTO „Ce primești" — fiecare card cu mini-vizual animat (Mercury) ──
   Textele cardurilor vin din stratul de conținut (bento.items, în aceeași
   ordine); arta + layoutul (wide) rămân aici. */
const PRIMESTI_ART: { art: ReactNode; wide?: boolean }[] = [
  { art: <ArtVideo />, wide: true },
  { art: <ArtLive /> },
  { art: <ArtCall /> },
  { art: <ArtDocs /> },
  { art: <ArtCommunity /> },
  { art: <ArtChecklist />, wide: true },
]
function Bento() {
  const c = useContent()
  return (
    <Section>
      <Head eyebrow={c.bento.eyebrow} title={c.bento.headline} lede={c.bento.lede} />
      <div className="bento reveal-group tilt-scene">
        {c.bento.items.map((it, i) => (
          <Tilt key={i} max={5} className={`bento-card${PRIMESTI_ART[i]?.wide ? ' wide' : ''}`}>
            <div className="bento-art">{PRIMESTI_ART[i]?.art}</div>
            <div className="bento-text"><h3>{it.title}</h3><p>{it.desc}</p></div>
          </Tilt>
        ))}
      </div>
    </Section>
  )
}

/* ── TESTIMONIAL rotativ (Mercury: card mare, citat + portret + tag) ────
   Testimoniale reale din practicum. Citatul e multi-paragraf; autoplay lent
   + pauză la hover (ca să apuci să citești). */
type Testi = { tag: string; q: string[]; n: string; r: string }
const TESTIMONIALS: Testi[] = [
  {
    tag: 'Practicum Arhitectura Afacerii', n: 'Daniela', r: 'La jumătatea practicumului',
    q: [
      'Practicumul Arhitectura Afacerii mi-a schimbat complet modul în care privesc businessul. Am realizat că sistematizarea începe cu fundația companiei și cu oamenii potriviți.',
      'Pe măsură ce am început să implementez ceea ce învăț, au rămas alături de mine și au început să apară oameni care împărtășesc aceeași viziune și aceleași valori. Astăzi înțeleg că acesta este primul pas spre construirea unei afaceri sănătoase.',
      'Tema despre organigramă și matricea decizională a fost pentru mine o revelație. Am obținut o claritate extraordinară despre cum trebuie gestionată compania și, sincer, nu-mi vine să cred că am condus afacerea atâția ani fără aceste instrumente.',
      'Sunt la jumătatea practicumului, implementez fiecare lecție și sunt convinsă că rezultatele pe care le voi obține vor fi extraordinare.',
    ],
  },
  {
    tag: 'Business · Florării', n: 'Ioan', r: 'Rețea de florării · spre franciză',
    q: [
      'Primele lecții din practicum mi-au arătat imediat unde sunt blocajele din afacerea mea. Mi-am clarificat inclusiv relația cu partenerul și acum mă pregătesc pentru următoarea etapă: scalarea.',
      'Astăzi înțeleg exact ce trebuie construit pentru ca rețeaua mea de florării să poată deveni o franciză. Pentru prima dată am un plan clar și știu asupra căror aspecte trebuie să lucrez înainte de a crește.',
    ],
  },
  {
    tag: 'Practicum Arhitectura Afacerii', n: 'Ala', r: 'Construiește organigrama',
    q: [
      'Cel mai important lucru pe care l-am învățat este că, înainte de a sistematiza, trebuie să simplifici.',
      'Am început deja să construiesc organigrama, lucrez constant la structura companiei și la organizarea echipei. Acum îmi este foarte clar care sunt primele angajări pe care trebuie să le fac și de ce.',
      'Acest practicum mi-a schimbat modul de gândire și sunt convinsă că, implementând ceea ce învăț, afacerea mea va crește.',
    ],
  },
  {
    tag: 'Practicum Arhitectura Afacerii', n: 'Alexandru', r: 'Înainte de primele angajări',
    q: [
      'Chiar dacă încă nu am angajați, acest practicum m-a ajutat să înțeleg când trebuie făcut primul pas și cum trebuie construită echipa încă de la început.',
      'Pentru mine este cea mai bună pregătire pe care o puteam primi înainte ca afacerea să înceapă să crească. Acum știu ce trebuie să construiesc din timp, astfel încât dezvoltarea companiei să nu fie bazată pe improvizație.',
    ],
  },
  {
    tag: 'Business · Barbershop', n: 'Ioan', r: 'Rețea de barbershop-uri · scalare',
    q: [
      'Am o rețea de barbershop-uri și acest practicum m-a ajutat să înțeleg de ce, la un moment dat, pierdeam specialiști valoroși.',
      'Astăzi văd foarte clar ce trebuie schimbat pentru a construi o echipă stabilă și un sistem care îmi va permite să nu mă opresc la două locații, ci să dezvolt patru, cinci sau chiar mai multe.',
      'Este unul dintre cele mai valoroase programe prin care am trecut.',
    ],
  },
  {
    tag: 'Practicum Arhitectura Afacerii', n: 'Drăgălina', r: 'Lucrează la fluxurile companiei',
    q: [
      'Acest practicum îmi schimbă complet modul de a privi afacerea.',
      'Recunosc că implementarea nu este întotdeauna ușoară și uneori mă mișc mai lent, însă tocmai asta îmi oferă claritate. Am început să lucrez serios la fluxurile companiei și, pentru prima dată, înțeleg cu adevărat procesele din businessul meu.',
      'Am realizat un lucru foarte important: ceea ce nu cunoști nu poți îmbunătăți. Iar acest practicum exact asta face — îți oferă claritatea de care ai nevoie pentru a construi o companie care funcționează prin sisteme.',
    ],
  },
]
function FeaturedTestimonial() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 9000)
    return () => clearInterval(id)
  }, [paused])
  const t = TESTIMONIALS[i]
  return (
    <div className="reveal" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      style={{ border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', background: 'var(--surface)', padding: 'clamp(28px,4.5vw,56px)', marginBottom: 'clamp(32px,5vw,56px)', overflow: 'hidden' }}>
      <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 22 }}>{t.tag}</div>
      <div key={i} className="quote-in" style={{ maxWidth: 840 }}>
        {t.q.map((para, pi) => (
          <p key={pi} style={{ fontSize: 'clamp(15px,1.9vw,19px)', lineHeight: 1.6, color: 'var(--text)', marginBottom: pi < t.q.length - 1 ? 14 : 0 }}>
            {pi === 0 ? '„' : ''}{para}{pi === t.q.length - 1 ? '”' : ''}
          </p>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'clamp(24px,3vw,36px)', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 17, flexShrink: 0 }}>{t.n[0]}</span>
          <div><div style={{ fontSize: 15 }}>{t.n}</div><div className="muted" style={{ fontSize: 13 }}>{t.r}</div></div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {TESTIMONIALS.map((_, k) => (
            <button key={k} aria-label={`Testimonial ${k + 1}`} onClick={() => setI(k)} style={{ width: k === i ? 26 : 9, height: 9, borderRadius: 6, border: 'none', cursor: 'pointer', background: k === i ? 'var(--accent)' : 'var(--line-hi)', transition: 'width .35s ease, background .35s ease' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── TRUST — bloc contrast, „de ce funcționează" (Mercury security) ─────
   Textele vin din stratul de conținut (trust.items, aceeași ordine); arta aici. */
const TRUST_ART: ReactNode[] = [<TrustExperience />, <TrustApplied />, <TrustSystem />]
function Trust() {
  const c = useContent()
  return (
    <Section>
      <div className="trust reveal">
        <div style={{ maxWidth: 620 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>{c.trust.eyebrow}</div>
          <h2 className="h-lg">{c.trust.headline}</h2>
        </div>
        <div className="trust-grid reveal-group">
          {c.trust.items.map((it, i) => (
            <div key={i}>
              <div className="trust-art">{TRUST_ART[i]}</div>
              <h3 className="h-sm" style={{ marginBottom: 10, fontWeight: 400 }}>{it.title}</h3>
              <p className="muted" style={{ fontSize: 15, lineHeight: 1.55 }}>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ── BLOC 2 — „Imaginează-ți" (viziunea, centrat, rânduri echilibrate) ── */
function Imagineaza() {
  const c = useContent()
  return (
    <Section top>
      <div className="reveal" style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
        <p className="balance" style={{ fontSize: 'clamp(23px,3.2vw,36px)', fontWeight: 400, lineHeight: 1.42, letterSpacing: '-0.005em' }}>
          <Rich text={c.imagineaza.text} accent={(chunk, i) => <span key={i} style={{ color: 'var(--accent)' }}>{chunk}</span>} />
        </p>
      </div>
    </Section>
  )
}

/* ── CINEMATIC STATEMENT — fundal AI (Ken-Burns) + o singură frază ───── */
function CinematicStatement() {
  const c = useContent()
  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--line)' }}>
      <KenBurns src="/atmos/build.jpg" />
      <div className="grain" aria-hidden />
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', minHeight: '34vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <RevealWords as="h2" className="display" text={c.cinematic.headline} />
        <p className="lede" style={{ margin: '20px auto 0', maxWidth: 560, color: 'rgba(241,234,217,0.86)' }}>{c.cinematic.lede}</p>
      </div>
    </section>
  )
}

function Cazuri() {
  const c = useContent()
  return (
    <Section id="cazuri">
      <Head eyebrow={c.cazuri.eyebrow} title={c.cazuri.headline} lede={c.cazuri.lede} />
      <FeaturedTestimonial />
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
  const c = useContent()
  return (
    <Section id="intrebari">
      <Head eyebrow={c.faq.eyebrow} title={c.faq.headline} max={680} />
      <div className="reveal">
        {c.faq.items.map((o, i) => {
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
  const c = useContent()
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
            <p className="muted" style={{ fontSize: 13, maxWidth: 240 }}>{c.footer.tagline}</p>
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
  const c = useContent()
  return (
    <>
      <Nav solid={navSolid} />
      <HeroVideos />
      <div style={{ borderBottom: '1px solid var(--line)', background: 'var(--surface)', paddingBlock: 20 }}>
        <Marquee items={c.marquee} />
      </div>
      <main>
        {/* Ordinea de încălzire: viziune → durere → soluție → dovadă → produs → ofertă */}
        <Imagineaza />
        <DurereStack />
        <Section id="metoda">
          <Head eyebrow={c.metoda.eyebrow} title={c.metoda.headline} lede={c.metoda.lede} />
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
