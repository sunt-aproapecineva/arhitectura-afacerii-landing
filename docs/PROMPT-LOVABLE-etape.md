# Prompt pentru Lovable — blocul „cele 6 etape"

> Copiază tot ce e mai jos, de la linia „——— START PROMPT ———", într-un singur mesaj în Lovable.
> E scris ca să fie rulat **o dată**, pe proiectul landingului Arhitectura Afacerii BUSINESS.

---

——— START PROMPT ———

## Ce vreau

Pe landingul Arhitectura Afacerii BUSINESS (ruta `/arhitectura-afacerii`) există un bloc
cu cele 6 etape ale metodei, construit ca **„film pe scroll"**: un wrapper foarte înalt
(în jur de 700vh, adică 7 ecrane) cu un container `sticky` înăuntru, prin care imaginile
etapelor se schimbă pe măsură ce derulezi.

**Blocul ăsta trebuie înlocuit complet.** Problema lui, confirmată pe utilizatori reali:
oamenii nu înțeleg că trebuie să deruleze prin el. Ajung acolo, văd un ecran care nu se
mișcă (blocul chiar începe cu imaginea la `scale(0.42)` și textul la `opacity: 0`), cred
că pagina s-a blocat și pleacă. Practic sechestrează 7 ecrane de scroll și pierde oameni
exact înainte de ofertă.

Îl înlocuiești cu o structură care **nu fură scroll-ul deloc**.

## Structura nouă

Grilă pe două coloane, într-o secțiune normală (fără `sticky` pe wrapper, fără înălțimi
în `vh`, fără pin, fără scroll-jack de niciun fel):

**Stânga — index sticky (doar de la 900px în sus):**
- un eyebrow: „Cele 06 etape"
- lista celor 6 etape ca **butoane clicabile** — click pe oricare sare direct la cardul ei
  (scroll lin). Etapa activă e evidențiată: fundal subtil, text luminos, o bară verticală
  de accent în stânga, numărul etapei la opacitate plină.
- o linie despărțitoare fină, apoi nota: „8 săptămâni. La finalul fiecărei etape rămâi cu
  un sistem care funcționează — nu cu notițe."
- un buton secundar „Vezi pachetele" care duce la `#pachete`

**Dreapta — cele 6 carduri, în flux normal de scroll:**
Fiecare card: imaginea etapei (16:9, cu gradient întunecat spre bază și numărul etapei
mare, în contur, colț dreapta-jos), apoi corpul cu eyebrow „Etapa 01 / 06", titlul etapei
și descrierea.

**Sub 900px:** indexul clicabil și butonul dispar. Rămân doar eyebrow-ul și nota ca intro
scurt, apoi cardurile stivuite pe o coloană. Fără sticky, fără pin — se vede tot,
derulezi normal.

Lățimile coloanei din stânga, pe praguri: **260px de la 900px, 300px de la 1024px, 340px
de la 1280px.** (Pragul e la 900, nu la 1024, tocmai pentru că pe o fereastră
nemaximizată de ~1000px se pierdea exact indexul care rezolvă problema.)

**Etapa activă** se calculează din cardul care taie linia de mijloc a ecranului.

## Trei capcane — le-am lovit deja, nu le repeta

**1. Starea „activ" NU se pune în `className`.**
Landingul are un sistem de reveal (IntersectionObserver) care adaugă clasa `.in`
**imperativ**, în afara React, și apoi face `unobserve` pe element. Dacă starea de card
activ stă în `className` (de exemplu `` className={`card ${activ ? 'on' : ''}`} ``), atunci
la fiecare schimbare de etapă React rescrie tot `className`-ul, **șterge `.in`**, iar cum
reveal-ul a dat deja `unobserve`, cardul rămâne la `opacity: 0` **pentru totdeauna**.
Simptomul e că dispar etapele la scroll. Pune starea pe un **atribut** — `data-on` — și
stilizeaz-o în CSS cu `[data-on]`. `className` rămâne fix.

**2. Fără `getBoundingClientRect()` în callback-ul de IntersectionObserver.**
Pagina rulează smooth scroll (Lenis) pe `requestAnimationFrame`. Dacă în observer citești
poziții ca să afli care card e cel mai aproape de centru, forțezi reflow pe fiecare tick
și pagina se simte greoaie. Folosește în schimb o bandă de zero înălțime pe mijlocul
ecranului — `rootMargin: '-50% 0px -50% 0px'` cu `threshold: 0` — și cardul care o
intersectează e cel activ. Zero citiri de layout.

**3. Imaginile.** Dacă imaginile etapelor sunt la rezoluție mare (la noi erau 1920×1097,
~600KB bucata, 3,6MB în total), scade-le la **1400×800, calitate ~62**. Se afișează
într-un card de ~760px, deci nu se vede nicio diferență, dar transferul scade la ~1,5MB
și memoria de bitmap decodat de la ~48MB la ~27MB. Pune `loading="lazy"` pe toate în
afară de prima, `decoding="async"` și atribute `width`/`height` explicite.

## Ce să NU atingi — important

- **Nimic din linkurile și butoanele de plată.** Fără modificări la Paynet, la
  URL-urile de checkout, la prețuri, la variantele integral / avans / rate, la logica din
  blocul de pachete. Nu le atinge nici măcar indirect.
- Nicio altă secțiune a landingului: hero, durere, analytics, cazuri, Victor, platformă,
  trust, pachete, FAQ, footer — rămân exact cum sunt.
- Paleta, fonturile și tokenii de design rămân neschimbați. Blocul nou trebuie să arate
  ca restul paginii, nu ca un corp străin: aceleași culori de fundal și bordură, același
  font de titlu, aceleași raze de colț și spațieri ca celelalte carduri.
- Textele celor 6 etape (titluri și descrieri) rămân cuvânt cu cuvânt cele existente.
  Doar structura se schimbă, nu copy-ul.

## Cod de referință

Am implementat deja versiunea asta și e testată. Dacă proiectul tău are aceeași structură
(React, componenta `src/blocks/EtapeFilm.tsx` și CSS-ul în `src/index.css`), poți prelua
direct. Dacă fișierele se numesc altfel, **întâi identifică blocul de etape existent**,
apoi adaptează codul de mai jos la convențiile proiectului — clasele `.et-*` sunt CSS
simplu peste variabilele de temă și pot fi traduse în Tailwind dacă asta folosește
proiectul, atât timp cât comportamentul și pragurile rămân identice.

### Componenta

```tsx
/**
 * EtapeFilm — cele 6 etape ca index sticky + carduri (scroll natural).
 *
 * De ce s-a schimbat: varianta anterioară era un „film pe scroll" — wrapper de
 * 700vh cu inner sticky. Mulți vizitatori nu realizau că trebuie să deruleze
 * prin el și rămâneau blocați pe un ecran care nu se mișca.
 *
 * Acum:
 *  • ≥900px — coloană stângă sticky: indexul celor 6 etape, clicabil (sari
 *    direct la oricare) + notă + CTA. Dreapta: cardurile, scroll normal.
 *    Rail: 260px @900 / 300px @1024 / 340px @1280.
 *  • <900px — eyebrow + notă, apoi cardurile stivuite. Fără sticky, fără pin.
 * Imagini: /etape/etapa-{1..6}.jpg — 1400x800, ~250KB (originalele
 * 1920x1097 sunt în _archive/etape-orig/; la 762px afișați nu se vede
 * diferența, dar 3.6MB → 1.5MB și ~48MB → ~27MB bitmap decodat).
 *
 * ⚠️ Starea „activ" stă pe `data-on`, NU pe className. `reveal.ts` adaugă
 * clasa `.in` imperativ (în afara React); dacă am pune „on" în className,
 * fiecare re-render ar rescrie className-ul și ar șterge `.in` → cardurile
 * ar rămâne la `opacity: 0` pentru totdeauna (reveal face unobserve).
 */
import { useEffect, useRef, useState } from 'react'

export type Etapa = { t: string; d: string }
const IMGS = [1, 2, 3, 4, 5, 6].map((n) => `/etape/etapa-${n}.jpg`)
const pad = (n: number) => String(n).padStart(2, '0')

export default function EtapeFilm({ items }: { items: Etapa[] }) {
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const [idx, setIdx] = useState(0)
  const N = items.length

  // Activ = cardul care taie linia de mijloc a ecranului. Banda de 0px
  // (rootMargin -50%/-50%) înseamnă zero citiri de layout în timpul
  // scroll-ului — altfel getBoundingClientRect() pe fiecare tick de Lenis
  // forțează reflow și se simte ca lag.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[]
    if (!cards.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const i = cards.indexOf(e.target as HTMLElement)
          if (i >= 0) setIdx(i)
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [N])

  // Click pe o etapă → sare la cardul ei (prin Lenis, ca restul paginii).
  const go = (i: number) => {
    const el = cardRefs.current[i]
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 92
    const lenis = (window as any).__lenis
    if (lenis) lenis.scrollTo(y, { duration: 0.9 })
    else window.scrollTo({ top: y, behavior: 'smooth' })
    setIdx(i)
  }

  return (
    <section id="etape" className="section et-sec">
      <div className="container et-grid">

        {/* ── INDEX (sticky ≥900px; sub 900px rămân doar eyebrow + notă) ── */}
        <aside className="et-rail">
          <div className="eyebrow et-rail-eye">Cele {pad(N)} etape</div>

          <nav className="et-nav" aria-label="Etapele metodei">
            {items.map((it, i) => (
              <button
                key={it.t}
                type="button"
                onClick={() => go(i)}
                className="et-nav-btn"
                data-on={i === idx || undefined}
                aria-current={i === idx ? 'true' : undefined}
              >
                <span className="et-nav-n">{pad(i + 1)}</span>
                <span className="et-nav-t">{it.t}</span>
              </button>
            ))}
          </nav>

          <div className="et-rail-foot">
            <p className="et-rail-note">
              8 săptămâni. La finalul fiecărei etape rămâi cu un sistem care funcționează — nu cu notițe.
            </p>
            <a href="#pachete" className="btn btn-ghost btn-sm et-rail-cta">Vezi pachetele</a>
          </div>
        </aside>

        {/* ── CARDURI ── */}
        <ol className="et-cards">
          {items.map((it, i) => (
            <li key={it.t}>
              <article
                ref={(el) => { cardRefs.current[i] = el }}
                className="et-card reveal"
                data-on={i === idx || undefined}
              >
                <div className="et-card-img">
                  <img
                    src={IMGS[i]}
                    alt=""
                    width={1400}
                    height={800}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'low'}
                    decoding="async"
                  />
                  <span className="et-card-n" aria-hidden>{pad(i + 1)}</span>
                </div>
                <div className="et-card-body">
                  <div className="eyebrow et-card-eye">Etapa {pad(i + 1)} / {pad(N)}</div>
                  <h3 className="et-card-t">{it.t}</h3>
                  <p className="et-card-d balance">{it.d}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>

      </div>
    </section>
  )
}
```

### CSS

Variabilele folosite (`--accent`, `--text`, `--text-dim`, `--text-faint`, `--surface`,
`--abyss`, `--interactive`, `--line`, `--line-hi`, `--font-display`, `--r-md`, `--r-lg`,
`--t-body`, `--t-caption`, `--t-body-sm`) sunt tokenii existenți ai landingului. Dacă în
proiectul tău se numesc altfel, mapează-le pe echivalente — nu introduce culori noi.

```css
/* ══════════════════════════════════════════════════════════════════════
   ETAPE — index sticky + carduri (scroll natural, fără pin)
   Starea „activ" vine pe [data-on] (vezi nota din EtapeFilm.tsx).
   ══════════════════════════════════════════════════════════════════════ */
.et-sec { border-top: 1px solid var(--line); padding-block-start: clamp(8px, 1vw, 16px); }
.et-grid { display: grid; grid-template-columns: 1fr; gap: clamp(24px, 4vw, 40px); align-items: start; }
@media (min-width: 900px)  { .et-grid { grid-template-columns: 260px minmax(0, 1fr); gap: 40px; } }
@media (min-width: 1024px) { .et-grid { grid-template-columns: 300px minmax(0, 1fr); gap: 56px; } }
@media (min-width: 1280px) { .et-grid { grid-template-columns: 340px minmax(0, 1fr); gap: 72px; } }

/* ── index ── */
.et-rail-eye { color: var(--accent); margin-bottom: 20px; }
.et-nav { display: flex; flex-direction: column; gap: 2px; }
.et-nav-btn {
  display: flex; align-items: center; gap: 12px; width: 100%;
  font: inherit; font-size: var(--t-body); text-align: left; cursor: pointer;
  color: var(--text-faint); background: none;
  border: 1px solid transparent; border-radius: var(--r-md);
  padding: 11px 14px;
  transition: color 0.3s ease, background 0.3s ease, border-color 0.3s ease;
}
.et-nav-btn::before {
  content: ''; flex: none; width: 2px; height: 15px; border-radius: 2px;
  background: var(--accent); opacity: 0; transform: scaleY(0.35);
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
.et-nav-btn:hover { color: var(--text); background: var(--interactive); }
.et-nav-btn[data-on] { color: var(--text); background: var(--interactive); border-color: var(--line); }
.et-nav-btn[data-on]::before { opacity: 1; transform: scaleY(1); }
.et-nav-n { font-family: var(--font-display); font-size: var(--t-caption); letter-spacing: 0.06em; color: var(--accent); opacity: 0.45; transition: opacity 0.3s ease; }
.et-nav-btn[data-on] .et-nav-n { opacity: 1; }

.et-rail-foot { margin-top: 28px; padding-top: 24px; border-top: 1px solid var(--line); }
.et-rail-note { font-size: var(--t-body-sm); line-height: 1.6; color: var(--text-dim); margin-bottom: 16px; }

/* desktop: coloana rămâne lipită lângă carduri */
@media (min-width: 900px) { .et-rail { position: sticky; top: 96px; } }
/* sub 900px indexul clicabil e redundant (cardurile sunt oricum toate în flux),
   rămân doar eyebrow-ul și nota, ca intro scurt deasupra cardurilor */
@media (max-width: 899px) {
  .et-nav, .et-rail-cta { display: none; }
  .et-rail-foot { margin-top: 0; padding-top: 0; border-top: 0; }
  .et-rail-eye { margin-bottom: 12px; }
  .et-rail-note { margin-bottom: 0; max-width: 46ch; }
}

/* ── carduri ── */
.et-cards { list-style: none; display: flex; flex-direction: column; gap: clamp(16px, 2.2vw, 24px); }
.et-card {
  overflow: hidden; scroll-margin-top: 92px;
  background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg);
  transition: border-color 0.4s ease;
}
.et-card[data-on] { border-color: var(--line-hi); }
.et-card-img { position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: var(--abyss); }
.et-card-img img { width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.9s cubic-bezier(0.16,1,0.3,1); }
.et-card-img::after { content: ''; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(to top, rgba(14,10,6,0.94) 0%, rgba(14,10,6,0.28) 52%, rgba(14,10,6,0.12) 100%); }
.et-card-n {
  position: absolute; right: clamp(14px, 2.4vw, 26px); bottom: 2px; z-index: 1;
  font-family: var(--font-display); font-size: clamp(46px, 7.5vw, 92px); line-height: 1;
  color: transparent; -webkit-text-stroke: 1px rgba(241,234,217,0.26);
  pointer-events: none; user-select: none;
}
.et-card-body { padding: clamp(20px, 3vw, 34px); }
.et-card-eye { color: var(--accent); margin-bottom: 12px; }
.et-card-t { font-family: var(--font-display); font-weight: 400; font-size: clamp(25px, 3.4vw, 40px); line-height: 1.12; margin-bottom: 12px; }
.et-card-d { font-size: clamp(15px, 1.7vw, 18px); line-height: 1.6; color: var(--text-dim); max-width: 56ch; }

/* zoom la hover doar unde există cursor real (pe touch e cost degeaba) */
@media (hover: hover) and (pointer: fine) {
  .et-card:hover .et-card-img img { transform: scale(1.05); }
}
@media (max-width: 640px) { .et-card-img { aspect-ratio: 3 / 2; } }
@media (prefers-reduced-motion: reduce) {
  .et-card-img img, .et-nav-btn, .et-nav-btn::before, .et-card { transition: none; }
}
```

## Verificare înainte să-mi spui că e gata

1. Secțiunea etapelor **nu** mai are înălțime în `vh` și **niciun** element `sticky` în
   afară de coloana din stânga. Derulezi prin ea în ritm normal, ca prin orice altă
   secțiune.
2. La 1440px, 1024px și 950px lățime: indexul e vizibil, lipit, și etapa activă se
   schimbă singură pe măsură ce derulezi.
3. La 880px și 390px: indexul dispare, cardurile sunt stivuite, nimic nu iese lateral din
   ecran.
4. **Derulezi prin toate cele 6 etape, apoi înapoi în sus.** Toate cardurile rămân
   vizibile — dacă vreunul dispare, ai pus starea în `className` (capcana 1).
5. Click pe fiecare din cele 6 etape din index → sare la cardul corect.
6. Blocul de pachete și butoanele de plată sunt neatinse: verifică pe fiecare buton că
   linkul e identic cu cel dinainte.

——— FINAL PROMPT ———

---

# Partea a doua — generatorul de landinguri (`/admin/pdf`)

Astea sunt mai mici și le poți da **separat**, după ce prima parte e gata și verificată.

## 1. Textul care nu mai are sens

În stratul de conținut (`src/content/default.json`, cheia `metoda.lede`) scrie acum:

> „Nimeni normal la cap nu construiește o casă fără proiect. Cele 6 etape, în ordinea
> exactă în care se ridică un business — **derulează**."

Cuvântul „derulează" era instrucțiunea pentru filmul pe scroll. Acum nu mai derulezi
printr-un film — alegi din index sau treci prin carduri. Propunere de înlocuire:

> „Nimeni normal la cap nu construiește o casă fără proiect. Cele 6 etape, în ordinea
> exactă în care se ridică un business."

Schimbă-l în `default.json` din landing **și** în snapshotul pe care îl ține motorul de
personalizare, ca să nu se desincronizeze.

## 2. Ce NU e nevoie să schimbi în generator

Am verificat: titlurile și descrierile celor 6 etape **nu** sunt în stratul de conținut —
sunt în cod, în array-ul de etape al landingului. Generatorul nu le personalizează și nu
le atinge. Deci variantele per-prospect (`?v=slug`) preiau automat blocul nou, fără nicio
modificare în motor.

Singurul lucru de ajustat e `metoda.lede` de mai sus. Restul generatorului rămâne
neschimbat — inclusiv, evident, tot ce ține de prețuri și plăți.

## 3. De verificat după

Deschide o variantă generată cu `?v=<slug>` și confirmă că:
- blocul de etape arată identic cu cel de pe pagina fără `?v=`
- textul personalizat al prospectului apare unde trebuie
- linkurile de plată din variantă sunt aceleași ca pe pagina de bază
