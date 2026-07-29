/**
 * Offer — oferta unică de 24h (pagina /oferta), dublura landingului.
 * Cronometru REAL, per vizitator: la prima vizită se salvează în localStorage
 * deadline = acum + 24h; numărătoarea coboară în timp real (HH:MM:SS) și, când
 * expiră, oferta „dispare". Un avans de 200 € (orice tarif) garantează locul +
 * 3 bonusuri disponibile doar în primele 24h. Paleta gold/dark a landingului.
 */
import { useEffect, useRef, useState } from 'react'
import { OFFER_AVANS, OFFER_AVANS_URL, VERA_IG_URL } from '../lib/links'

const KEY = 'aa_offer_deadline_v1'
const DAY = 24 * 60 * 60 * 1000

function getDeadline(): number {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved) { const n = parseInt(saved, 10); if (!Number.isNaN(n)) return n }
    const d = Date.now() + DAY
    localStorage.setItem(KEY, String(d))
    return d
  } catch { return Date.now() + DAY }
}
function calc(end: number) {
  const rem = end - Date.now()
  if (rem <= 0) return { h: 0, m: 0, s: 0, expired: true }
  const total = Math.floor(rem / 1000)
  return { h: Math.floor(total / 3600), m: Math.floor((total % 3600) / 60), s: total % 60, expired: false }
}
const pad = (n: number) => String(n).padStart(2, '0')

export function useCountdown() {
  const end = useRef(0)
  if (!end.current) end.current = getDeadline()
  const [t, setT] = useState(() => calc(end.current))
  useEffect(() => {
    const id = setInterval(() => setT(calc(end.current)), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

/* Bară flotantă (mereu vizibilă la scroll) cu timpul rămas. */
export function OfferBar() {
  const { h, m, s, expired } = useCountdown()
  if (expired) return null
  return (
    <a href="#oferta" className="offer-bar" aria-label="Oferta expiră în curând — rezervă-ți locul">
      <span className="offer-bar-dot" aria-hidden />
      <span>Oferta expiră în <b>{pad(h)}:{pad(m)}:{pad(s)}</b></span>
      <span className="offer-bar-cta">Rezervă locul →</span>
    </a>
  )
}

function Unit({ v, l }: { v: number; l: string }) {
  return (
    <div className="offer-cd-unit">
      <span className="offer-cd-num">{pad(v)}</span>
      <span className="offer-cd-lbl">{l}</span>
    </div>
  )
}
const Check = () => (
  <span className="offer-check" aria-hidden>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>
)

export default function Offer() {
  const { h, m, s, expired } = useCountdown()
  return (
    <section id="oferta" className="section offer">
      <div className="container">
        <div className="offer-head reveal">
          <span className="offer-tag">{expired ? 'Oferta a expirat' : 'Ofertă · doar 24 de ore'}</span>
          <h2 className="h-lg" style={{ marginTop: 18, textWrap: 'balance' }}>Rezervă-ți locul cu un avans de {OFFER_AVANS} €.</h2>
          <p className="lede" style={{ marginTop: 16 }}>
            Un avans de {OFFER_AVANS} € — pentru orice tarif — îți garantează locul la curs. Dacă îl achiți în primele 24 de ore, primești pe deasupra 3 bonusuri:
          </p>
        </div>

        {/* cronometru real */}
        <div className="offer-cd reveal" role="timer" aria-live="off">
          {expired ? (
            <div className="offer-cd-expired">Timpul pentru bonusuri s-a încheiat — locul îl poți rezerva în continuare cu avans.</div>
          ) : (
            <>
              <Unit v={h} l="ore" /><span className="offer-cd-sep">:</span>
              <Unit v={m} l="min" /><span className="offer-cd-sep">:</span>
              <Unit v={s} l="sec" />
            </>
          )}
        </div>

        {/* bonusuri */}
        <div className="offer-bonuses reveal-group">
          <div className="offer-bonus">
            <Check />
            <div>
              <h3>Mastermind cu <a href={VERA_IG_URL} target="_blank" rel="noopener noreferrer" className="offer-link">Vera Lozovanu-Guțu</a> — comunicare autentică</h3>
              <p>Cum să fii și să vorbești încrezut cu colegi, clienți și parteneri.</p>
            </div>
          </div>
          <div className="offer-bonus">
            <Check />
            <div>
              <h3>Lecție video: cum să-ți organizezi timpul</h3>
              <p>Time-management — sfaturile practice ale lui Victor.</p>
            </div>
          </div>
          <div className="offer-bonus">
            <Check />
            <div>
              <h3>Extra acces 2 luni la curs, indiferent de tarif</h3>
              <p>Îl primești doar în primele 24h. După, dispare.</p>
            </div>
          </div>
        </div>

        <div className="offer-cta reveal">
          <a href={OFFER_AVANS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '16px 34px', fontSize: 16 }}>
            Plătește avansul · {OFFER_AVANS} €
          </a>
          <span className="offer-cta-note">Îți garantează locul · pentru orice tarif</span>
        </div>
      </div>
    </section>
  )
}
