import { i as e } from "../browser-0zX67oeU.js";
function n(o, t) {
  return function(s) {
    e && !customElements.get(o) && customElements.define(o, s, { extends: t });
  };
}
const d = e ? window.HTMLElement : class {
  attachShadow() {
  }
};
class a extends d {
  openShadow(...t) {
    if (!this.shadowRoot && e) {
      const s = this.attachShadow({ mode: "open" });
      return this.addStylesheet(...t), s;
    }
    return this.shadowRoot;
  }
  addStylesheet(...t) {
    this.shadowRoot && e && this.shadowRoot.adoptedStyleSheets.push(...t);
  }
}
export {
  a as CustomElement,
  n as define
};
