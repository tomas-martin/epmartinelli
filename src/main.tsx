import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// CSS originales del sitio
import './assets/css/bootstrap.min.css'
import './assets/css/bicon.min.css'
import './assets/css/plugins.css'
import './assets/css/style.css'
import './assets/css/admin.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
