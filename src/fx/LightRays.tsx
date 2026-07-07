/**
 * LightRays — raze volumetrice gold (god-rays), recreate din spell-ui (xxtomm)
 * dar CSS-only (FĂRĂ three.js/WebGL): repeating-conic-gradient + blur + mask
 * radial + balans lent. Strat atmosferic în spatele unui „moment" (Final CTA).
 */
export default function LightRays({ from = 'top' }: { from?: 'top' | 'center' }) {
  return (
    <div className={`lightrays lightrays--${from}`} aria-hidden>
      <div className="lightrays-glow" />
      <div className="lightrays-fan" />
    </div>
  )
}
