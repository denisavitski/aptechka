import { isBrowser } from '@packages/utils'

export class PageAnnouncerElement extends HTMLElement {
  public create(document: Document, title: string) {
    if (this.textContent !== title) {
      this.textContent = title
    }

    this.dataset.persist = ''
    document.body.appendChild(this)
  }

  public done() {
    if (!document.activeElement?.closest('[data-persist]')) {
      document.body.focus()
    }

    delete this.dataset.persist
  }

  connectedCallback() {
    const attrs = {
      'aria-live': 'assertive',
      'aria-atomic': 'true',
      style:
        'position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px',
    }

    for (const [key, value] of Object.entries(attrs)) {
      this.setAttribute(key, value)
    }
  }
}

if (isBrowser && !customElements.get('e-page-announcer')) {
  customElements.define('e-page-announcer', PageAnnouncerElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-page-announcer': PageAnnouncerElement
  }
}
