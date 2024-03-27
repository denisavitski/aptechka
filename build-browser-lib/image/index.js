import { define as p } from "../custom-element/index.js";
import "../window-resizer/index.js";
import "../Store-JOKrNVEr.js";
import { SourceElement as l } from "../source/index.js";
var u = Object.defineProperty, f = Object.getOwnPropertyDescriptor, i = (r, t, o, m) => {
  for (var e = m > 1 ? void 0 : m ? f(t, o) : t, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (e = (m ? s(t, o, e) : s(e)) || e);
  return m && e && u(t, o, e), e;
};
let c = class extends l {
  createConsumer() {
    return document.createElement("img");
  }
  consumeSource(r) {
    this.consumerElement.src = r || "";
  }
};
c = i([
  p("e-image")
], c);
export {
  c as ImageElement
};
