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
