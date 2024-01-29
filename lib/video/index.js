import { define as c } from "../custom-element/index.js";
import "../resizer/index.js";
import "../Store-2hWEUGTj.js";
import { SourceElement as p } from "../source/index.js";
import "../browser-S4eq8AeN.js";
import "../notifier/index.js";
import "../function-zwSFehNd.js";
import "../SourceManager-F94MRde6.js";
import "../order/index.js";
import "../intersector/index.js";
import "../loading/index.js";
var u = Object.defineProperty, l = Object.getOwnPropertyDescriptor, a = (t, r, s, i) => {
  for (var e = i > 1 ? void 0 : i ? l(r, s) : r, o = t.length - 1, m; o >= 0; o--)
    (m = t[o]) && (e = (i ? m(r, s, e) : m(e)) || e);
  return i && e && u(r, s, e), e;
};
let n = class extends p {
  connectedCallback() {
    super.connectedCallback(), this.captureEvent.subscribe(() => {
      this.hasAttribute("e-autoplay") && this.consumerElement.play();
    }), this.releaseEvent.subscribe(() => {
      this.hasAttribute("e-autoplay") && (this.consumerElement.pause(), this.hasAttribute("replay") && (this.consumerElement.currentTime = 0));
    });
  }
  createConsumer() {
    return document.createElement("video");
  }
  consumeSource(t) {
    this.consumerElement.src = t || "";
  }
};
n = a([
  c("e-video")
], n);
export {
  n as VideoElement
};
