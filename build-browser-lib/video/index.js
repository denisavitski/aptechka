import { define as u } from "../custom-element/index.js";
import "../window-resizer/index.js";
import "../Store-JOKrNVEr.js";
import { SourceElement as l } from "../source/index.js";
var m = Object.defineProperty, a = Object.getOwnPropertyDescriptor, p = (t, r, i, s) => {
  for (var e = s > 1 ? void 0 : s ? a(r, i) : r, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (e = (s ? o(r, i, e) : o(e)) || e);
  return s && e && m(r, i, e), e;
};
let c = class extends l {
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
c = p([
  u("e-video")
], c);
export {
  c as VideoElement
};
