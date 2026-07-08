/**
 * Analytics — „Tabloul de bord" (structura Synergeus Section 2, adaptată la
 * Arhitectura Afacerii: gold/dark/cream, Arimo, conținut business). Layout
 * responsive: pe desktop cardurile-glass plutesc absolut; pe mobil curg în
 * flux (fără suprapunere). Fundaluri = imaginile noastre AI.
 */
import { useInView, useCountUp } from '../fx/motion'
import { useContent } from '../content/ContentContext'

const Arrow = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

function Bar({ label, value, pct, fill, delay }: { label: string; value: string; pct: number; fill: string; delay: number }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: 'rgba(241,234,217,0.7)' }}>{label}</span>
        <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{value}</span>
      </div>
      <div style={{ height: 5, borderRadius: 5, width: '100%', position: 'relative', overflow: 'hidden', background: 'rgba(241,234,217,0.1)' }}>
        <i className="ana-fill" style={{ position: 'absolute', left: 0, top: 0, height: '100%', borderRadius: 5, background: fill, ['--w' as any]: pct + '%', transitionDelay: delay + 's' }} />
      </div>
    </div>
  )
}

export default function Analytics() {
  const c = useContent()
  const [ref, inView] = useInView<HTMLDivElement>()
  const ore = useCountUp(142, inView)
  const proc = useCountUp(24, inView)

  return (
    <section style={{ background: 'var(--abyss)', paddingBlock: 'clamp(72px,10vw,110px)', overflow: 'hidden' }}>
      <div ref={ref} style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)', paddingInline: 'clamp(20px,5vw,40px)' }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>{c.analytics.eyebrow}</div>
        <h2 className={`ana-h${inView ? ' in' : ''}`} style={{ margin: 0 }}>
          <span className="h-lg" style={{ display: 'block' }}>{c.analytics.headline1}</span>
          <span className="h-lg" style={{ display: 'block', color: 'var(--accent)' }}>{c.analytics.headline2}</span>
        </h2>
        <p className={`ana-sub${inView ? ' in' : ''}`} style={{ fontSize: 16, color: 'var(--text-dim)', marginTop: 16, maxWidth: 520, marginInline: 'auto' }}>
          {c.analytics.sub}
        </p>
      </div>

      <div className="ana-row" style={{ display: 'flex', gap: 16, alignItems: 'stretch', maxWidth: 1200, margin: '0 auto', paddingInline: 'clamp(20px,5vw,40px)' }}>
        {/* Card 1 — overview */}
        <div className={`ana-card ana-left${inView ? ' in' : ''}`} style={{ flex: 1.4 }}>
          <img className="ana-bg" src="/atmos/desk.jpg" alt="" />
          <div className="ana-tint" style={{ background: 'rgba(14,10,6,0.5)' }} />
          <div className="ana-panel ana-glass">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, gap: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, color: 'rgba(241,234,217,0.6)' }}>PRIVIRE DE ANSAMBLU</span>
              <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, color: 'rgba(241,234,217,0.6)', textDecoration: 'underline', whiteSpace: 'nowrap' }}>Luna aceasta</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--text)', letterSpacing: '-1px', fontVariantNumeric: 'tabular-nums' }}>{Math.round(ore)} h</div>
            <div style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 20 }}>recuperate — timp în care afacerea merge fără tine</div>
            <div style={{ borderTop: '1px dashed rgba(241,234,217,0.2)', marginBottom: 18 }} />
            <Bar label="Vânzări" value="+24%" pct={78} fill="linear-gradient(90deg, #C9A84C 60%, rgba(201,168,76,0) 100%)" delay={0.2} />
            <Bar label="Procese documentate" value="18 / 24" pct={62} fill="linear-gradient(90deg, #8A6E2E 55%, rgba(138,110,46,0) 100%)" delay={0.32} />
            <Bar label="Timp pentru tine" value="3 zile / săpt." pct={45} fill="linear-gradient(90deg, #F1EAD9 52%, rgba(241,234,217,0) 100%)" delay={0.44} />
          </div>
          <div className="ana-foot">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--text)', marginBottom: 8 }}>{c.analytics.card1Title}</div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(241,234,217,0.65)', margin: 0, maxWidth: 460 }}>
              {c.analytics.card1Body}
            </p>
          </div>
        </div>

        {/* Card 2 — proces documentat + Victor */}
        <div className={`ana-card ana-right${inView ? ' in' : ''}`} style={{ flex: 1 }}>
          <img className="ana-bg" src="/atmos/build.jpg" alt="" />
          <div className="ana-tint" style={{ background: 'rgba(14,10,6,0.44)' }} />
          <div className="ana-panel ana-doc-wrap">
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, color: 'rgba(241,234,217,0.7)', textDecoration: 'underline' }}>ZILNIC</span>
            <div style={{ width: 210, maxWidth: '100%', borderRadius: 'var(--r-md)', background: '#F4EEDE', padding: '16px 18px', boxShadow: '0 8px 32px rgba(0,0,0,0.35)', marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: '#0E0A06', fontVariantNumeric: 'tabular-nums' }}>{Math.round(proc)}</span>
                <span style={{ fontSize: 11, color: 'rgba(14,10,6,0.5)' }}>procese</span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(14,10,6,0.5)', marginBottom: 14 }}>predate echipei</div>
              <a href="#platforma" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0E0A06', color: '#F1EAD9', fontSize: 13, fontWeight: 500, padding: '9px 9px 9px 14px', borderRadius: 999 }}>
                Vezi procesul
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(241,234,217,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Arrow s={13} /></span>
              </a>
            </div>
          </div>
          <div className="ana-foot">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text)', marginBottom: 8 }}>{c.analytics.card2Title}</div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(241,234,217,0.65)', margin: 0 }}>
              {c.analytics.card2Body}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
