import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ContentProvider } from './content/ContentContext'

// StrictMode dezactivat — GSAP nu suportă double-invoke în dev mode
// ContentProvider stă DEASUPRA lui App: cu ?v=<slug>, App (Lenis + initReveal +
// toate blocurile care măsoară la mount) se montează abia după ce conținutul
// final e rezolvat → animațiile se inițializează pe textul final.
createRoot(document.getElementById('root')!).render(
  <ContentProvider>
    <App />
  </ContentProvider>
)
