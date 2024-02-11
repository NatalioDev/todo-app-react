import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// Importa los estilos
import './index.css'
// Importa nuestro proveedor de Theme
import { ThemeContextProvider } from './utilites/context/ThemeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeContextProvider>
)
