import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GridLayout from './components/layout/GridLayout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <GridLayout /> */}
  </StrictMode>,
)
