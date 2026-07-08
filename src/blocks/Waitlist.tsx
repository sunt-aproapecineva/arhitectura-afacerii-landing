/**
 * WaitlistCapture — formularul de ÎNSCRIERE (vindem Arhitectura, nu lista):
 * lași emailul → primești direct detaliile înscrierii (pachete, prețuri, pași).
 * TODO producție: leagă onSubmit de serviciul de email (Lovable) — acum
 * confirmă local (stub).
 */
import { useState } from 'react'
import { Magnetic } from '../fx/anim'
import { useContent } from '../content/ContentContext'

const Arrow = ({ s = 16 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

export default function WaitlistCapture({ id, center = false }: { id?: string; center?: boolean }) {
  const c = useContent()
  const [done, setDone] = useState(false)
  const [email, setEmail] = useState('')
  return (
    <div id={id} style={{ textAlign: center ? 'center' : 'left', scrollMarginTop: 90 }}>
      {done ? (
        <div role="status" className="quote-in" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 26px', border: '1px solid var(--accent)', borderRadius: 999, background: 'var(--accent-soft)', fontSize: 16 }}>
          <span style={{ color: 'var(--accent)', fontSize: 18 }}>✓</span>
          {c.waitlist.success}
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); if (email.trim()) setDone(true) }}
          className="hero-capture" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 6px 6px 22px', border: '1px solid var(--line-hi)', borderRadius: 999, background: 'rgba(14,10,6,0.4)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', maxWidth: '100%' }}>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Emailul tău" aria-label="Email"
            style={{ flex: 1, minWidth: 160, background: 'none', border: 'none', outline: 'none', color: 'var(--text)', fontSize: 16 }} />
          <Magnetic as="button" type="submit" className="btn btn-primary">{c.waitlist.button} <Arrow /></Magnetic>
        </form>
      )}
      <div style={{ marginTop: 14, fontSize: 13, color: 'var(--text-dim)' }}>
        {c.waitlist.reassurance}
      </div>
    </div>
  )
}
