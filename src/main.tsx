import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ShopProvider } from './context/ShopContext'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ToastProvider>
          <ShopProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ShopProvider>
        </ToastProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
