/**
 * Linkuri — un singur loc de editat.
 *
 * ENROLL_URL — butoanele „Înscrie-te" din nav / meniu / footer / secțiunea AI.
 *   Duc la Pachete (unde se alege planul + plata). Poate deveni un link extern.
 *
 * PAY — linkurile de plată Paynet, pe produs (designer / arhitect) și mod de
 *   plată (integral / avans / rata). Se leagă pe butoanele din Pachete.
 */
export const ENROLL_URL = '#pachete'

export const PAY = {
  designer: {
    integral: 'https://paynet.md/qr/570379480928486614',
    avans: 'https://paynet.md/qr/570379113800559433',
    rata: 'https://paynet.md/qr/570379764331935424',
  },
  arhitect: {
    integral: 'https://paynet.md/qr/570379220433787033',
    avans: 'https://paynet.md/qr/570379723058156527',
    rata: 'https://paynet.md/qr/570379875196746808',
  },
} as const

export type PlanKey = keyof typeof PAY

/* ── Oferta 24h (pagina /oferta) ──────────────────────────────────────
   Un avans unic de 200 € (pentru orice tarif) care garantează locul.
   ⚠️ TODO: pune aici linkul Paynet REAL de 200 €. Momentan e legat la
   linkul de avans existent (199 €) ca placeholder funcțional. */
export const OFFER_AVANS = 200
export const OFFER_AVANS_URL = PAY.designer.avans
export const VERA_IG_URL = 'https://www.instagram.com/vera.lozovanu_gutu/'

/* ── OTO — pagina post-cumpărare (/oto): consultație 1-la-1 GRATUITĂ ────
   CTA = programare la consultație. ⚠️ pune linkul real de programare. */
export const CONSULT_URL = 'https://calendly.com/'   // ⚠️ placeholder — link real (Calendly / formular / WhatsApp)
export const OTO_DECLINE_URL = '/'                    // unde duce refuzul (pagina de mulțumire)

/* ── Ad landing /audit → testul-diagnostic (quiz) ─────────────────────── */
export const QUIZ_URL = 'https://live.morarvictor.com/quiz-nou/quiz'
