import { CustomElement as E, define as W } from "../custom-element/index.js";
import { Notifier as M } from "../notifier/index.js";
import { resizer as x } from "../resizer/index.js";
import { ticker as y } from "../ticker/index.js";
import { c as R } from "../math-_a3IpKOc.js";
import "../browser-S4eq8AeN.js";
import "../function-zwSFehNd.js";
import "../intersector/index.js";
var b = Object.defineProperty, P = Object.getOwnPropertyDescriptor, A = (e, i, s, r) => {
  for (var n = r > 1 ? void 0 : r ? P(i, s) : i, f = e.length - 1, g; f >= 0; f--)
    (g = e[f]) && (n = (r ? g(i, s, n) : g(n)) || n);
  return r && n && b(i, s, n), n;
}, C = (e, i, s) => {
  if (!i.has(e))
    throw TypeError("Cannot " + s);
}, t = (e, i, s) => (C(e, i, "read from private field"), s ? s.call(e) : i.get(e)), a = (e, i, s) => {
  if (i.has(e))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(e) : i.set(e, s);
}, l = (e, i, s, r) => (C(e, i, "write to private field"), r ? r.call(e, s) : i.set(e, s), s), c, h, d, p, o, m, u, v, w, _;
let k = class extends E {
  constructor() {
    super(...arguments), a(this, c, new M()), a(this, h, null), a(this, d, null), a(this, p, 0), a(this, o, 0), a(this, m, 1), a(this, u, 0), a(this, v, 1), a(this, w, () => {
      l(this, m, R(devicePixelRatio, 1, 2));
      const e = this.getBoundingClientRect();
      l(this, p, e.width), l(this, o, e.height), t(this, h).width = t(this, p) * this.pixelRatio, t(this, h).height = t(this, o) * this.pixelRatio, this.context.scale(this.pixelRatio, this.pixelRatio), this.renderEvent.notify(this.detail);
    }), a(this, _, (e) => {
      l(this, u, e.timestamp), l(this, v, e.elapsed), t(this, c).notify(this.detail);
    });
  }
  get renderEvent() {
    return t(this, c);
  }
  get canvasElement() {
    return t(this, h);
  }
  get context() {
    return t(this, d);
  }
  get pixelRatio() {
    return t(this, m);
  }
  get width() {
    return t(this, p);
  }
  get height() {
    return t(this, o);
  }
  get detail() {
    return {
      width: t(this, p),
      height: t(this, o),
      element: this,
      canvasElement: t(this, h),
      pixelRatio: t(this, m),
      context: t(this, d),
      timestamp: t(this, u),
      elapsed: t(this, v)
    };
  }
  connectedCallback() {
    this.style.display = "block", this.style.width = "100%", this.style.height = "100%", l(this, h, document.createElement("canvas")), t(this, h).style.cssText = `
      display: block;
      width: 100%;
      height: 100%;
    `, l(this, d, t(this, h).getContext("2d")), this.appendChild(t(this, h)), x.subscribe(t(this, w)), this.hasAttribute("static") || y.subscribe(t(this, _), {
      culling: this,
      maxFPS: this.hasAttribute("fps") ? parseInt(this.getAttribute("fps")) : void 0
    });
  }
  disconnectedCallback() {
    x.unsubscribe(t(this, w)), y.unsubscribe(t(this, _)), t(this, c).close(), t(this, h).remove(), this.style.display = "", this.style.width = "", this.style.height = "";
  }
};
c = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakMap();
w = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakMap();
k = A([
  W("canvas-2d")
], k);
export {
  k as Canvas2DElement
};
