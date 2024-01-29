import { i as t } from "../browser-S4eq8AeN.js";
function i(e) {
  return function(n) {
    t && !customElements.get(e) && customElements.define(e, n);
  };
}
const s = t ? window.HTMLElement : class {
  attachShadow(...e) {
  }
};
class m extends s {
}
export {
  m as CustomElement,
  i as define
};
