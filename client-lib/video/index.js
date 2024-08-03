var m = (t, s, e) => {
  if (!s.has(t))
    throw TypeError("Cannot " + e);
};
var i = (t, s, e) => (m(t, s, "read from private field"), e ? e.call(t) : s.get(t)), n = (t, s, e) => {
  if (s.has(t))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(t) : s.set(t, e);
}, c = (t, s, e, u) => (m(t, s, "write to private field"), u ? u.call(t, e) : s.set(t, e), e);
import "../window-resizer/index.js";
import "../Store-Qr3SNOSf.js";
import { SourceElement as h } from "../source/index.js";
import { ticker as o } from "../ticker/index.js";
var r, a;
class l extends h {
  constructor() {
    super(...arguments);
    n(this, r, 0);
    n(this, a, () => {
      this.classList.add(`state-${this.consumerElement.readyState}`);
      const e = this.consumerElement.readyState / 4;
      e > i(this, r) && c(this, r, e), this.dispatchEvent(
        new CustomEvent("readyStateChange", {
          detail: {
            readyState: this.consumerElement.readyState,
            progress: i(this, r)
          }
        })
      ), this.consumerElement.readyState === 4 && o.unsubscribe(i(this, a));
    });
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("sourceCapture", () => {
      o.subscribe(i(this, a)), this.hasAttribute("capture-autoplay") && this.consumerElement.play();
    }), this.addEventListener("sourceRelease", () => {
      this.hasAttribute("capture-autoplay") && (this.consumerElement.pause(), this.hasAttribute("replay") && (this.consumerElement.currentTime = 0)), this.hasAttribute("reload-source") && this.classList.remove(
        "state-0",
        "state-1",
        "state-2",
        "state-3",
        "state-4"
      );
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), o.unsubscribe(i(this, a)), c(this, r, 0);
  }
  createConsumer() {
    return document.createElement("video");
  }
  consumeSource(e) {
    this.consumerElement.src = e || "";
  }
}
r = new WeakMap(), a = new WeakMap();
customElements.get("e-video") || customElements.define("e-video", l);
export {
  l as VideoElement
};
