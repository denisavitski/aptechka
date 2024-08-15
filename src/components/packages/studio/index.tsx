'use client'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Studio } from './Studio'

export function initializeStudio() {
  const element = document.createElement('div')

  element.style.cssText = `
    display: contents;
  `

  createRoot(element).render(
    <StrictMode>
      <Studio />
    </StrictMode>
  )

  document.body.appendChild(element)
}
