/**
 * initReveal — fade-up subtil la intrarea în viewport (stil Mercury).
 * IntersectionObserver pur → cross-browser (inclusiv Safari), fără jank.
 * Observă orice `.reveal`, `.reveal-group` și `.bento-art`/`.trust-art`
 * (care declanșează mini-vizualele animate), adaugă `.in` o singură dată.
 */
export function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-group, .bento-art, .trust-art')
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
  )
  els.forEach((el) => io.observe(el))
  return () => io.disconnect()
}
