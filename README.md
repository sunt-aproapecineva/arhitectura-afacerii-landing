# Arhitectura Afacerii — Landing

Landing page premium pentru programul de sistematizare a afacerii **Arhitectura Afacerii** (Victor Morar).

Stack: **React 19 + Vite 6 + TypeScript + Tailwind v4**, animații vanilla (scroll-driven, IntersectionObserver) + shader WebGL `@paper-design/shaders-react` (liquid metal) + smooth scroll `lenis`.

## Dezvoltare locală

```bash
npm install
npm run dev      # http://localhost:5175
```

## Build de producție

```bash
npm run build    # → dist/
npm run preview  # verifică build-ul local
```

## Deploy

Proiectul e un site static (Vite) — se deployează oriunde. Cel mai simplu:

### Vercel (recomandat)
1. Intră pe [vercel.com](https://vercel.com) → **Add New → Project** → importă acest repo.
2. Vercel detectează automat Vite. Build: `npm run build`, Output: `dist`.
3. **Deploy**. Gata.

### Netlify
1. [netlify.com](https://netlify.com) → **Add new site → Import an existing project** → acest repo.
2. Build command: `npm run build` · Publish directory: `dist`.

### GitHub Pages
Necesită `base` în `vite.config.ts` (ex. `base: '/nume-repo/'`) înainte de build.

## De configurat înainte de lansare

- **Linkul de înscriere** — toate butoanele „Înscrie-te" duc într-un singur loc: [`src/lib/links.ts`](src/lib/links.ts) → `ENROLL_URL`. Pune acolo linkul real (Telegram / Typeform / formular).
- **Formularul de email din hero** — momentan e un stub (fără backend). De conectat la un serviciu de email la deploy.
- **Linkuri contact în footer** — Instagram / Telegram / YouTube / Email sunt încă `#` în `src/blocks/Landing.tsx`.
- **Prețurile** la Pachete sunt „Curând" — de completat în `src/blocks/Pricing.tsx`.
