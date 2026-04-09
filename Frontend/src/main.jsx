import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// ESTILOS (CSS)
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

// COMPORTAMIENTO (JS)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)