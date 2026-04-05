import React from 'react'
import { createRoot } from 'react-dom/client'
import PortfolioScene from './PortfolioScene'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PortfolioScene />
  </React.StrictMode>
)