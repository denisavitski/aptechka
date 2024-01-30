import { define as s } from "../custom-element/index.js";
import "../resizer/index.js";
import "../Store-qq7IjRLE.js";
import { SourceElement as c } from "../source/index.js";
import "../browser-S4eq8AeN.js";
import "../notifier/index.js";
import "../function-zwSFehNd.js";
import "../SourceManager-vXInLlh_.js";
import "../order/index.js";
import "../intersector/index.js";
import "../loading/index.js";
var l = Object.defineProperty, u = Object.getOwnPropertyDescriptor, f = (r, t, o, m) => {
  for (var e = m > 1 ? void 0 : m ? u(t, o) : t, p = r.length - 1, i; p >= 0; p--)
    (i = r[p]) && (e = (m ? i(t, o, e) : i(e)) || e);
  return m && e && l(t, o, e), e;
};
let n = class extends c {
  createConsumer() {
    return document.createElement("img");
  }
  consumeSource(r) {
    this.consumerElement.src = r || "";
  }
};
n = f([
  s("e-image")
], n);
export {
  n as ImageElement
};
