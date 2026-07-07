import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// StrictMode dezactivat — GSAP nu suportă double-invoke în dev mode
createRoot(document.getElementById('root')!).render(<App />)
