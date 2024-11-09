export class MorphAnnouncer extends HTMLElement {
  constructor() {
    super()
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

if (!customElements.get('morph-announcer')) {
  customElements.define('morph-announcer', MorphAnnouncer)
}

declare global {
  interface HTMLElementTagNameMap {
    'morph-announcer': MorphAnnouncer
  }
}
