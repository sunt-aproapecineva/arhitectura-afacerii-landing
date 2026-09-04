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
