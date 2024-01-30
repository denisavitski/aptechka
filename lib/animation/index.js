var d = Object.defineProperty, l = Object.defineProperties;
var u = Object.getOwnPropertyDescriptors;
var i = Object.getOwnPropertySymbols;
var c = Object.prototype.hasOwnProperty, x = Object.prototype.propertyIsEnumerable;
var r = (a, t, e) => t in a ? d(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e, m = (a, t) => {
  for (var e in t || (t = {}))
    c.call(t, e) && r(a, e, t[e]);
  if (i)
    for (var e of i(t))
      x.call(t, e) && r(a, e, t[e]);
  return a;
}, s = (a, t) => l(a, u(t));
var n = (a, t, e) => (r(a, typeof t != "symbol" ? t + "" : t, e), e);
import { A as g } from "../Damped-H3PuZwKV.js";
import { D as y } from "../Damped-H3PuZwKV.js";
import { l as A } from "../easings-uF-tgahf.js";
import "../math-_a3IpKOc.js";
import "../number-bCHB2GAD.js";
import "../Store-qq7IjRLE.js";
import "../browser-S4eq8AeN.js";
import "../ticker/index.js";
import "../intersector/index.js";
class k extends g {
  constructor(e) {
    super(s(m({}, e), {
      min: (e == null ? void 0 : e.min) || 0,
      max: (e == null ? void 0 : e.max) || 1e3
    }));
    n(this, "easing");
    this.easing = (e == null ? void 0 : e.easing) || A;
  }
  start() {
    this.listenAnimationFrame();
  }
  pause() {
    this.unlistenAnimationFrame();
  }
  stop() {
    this.reset();
  }
  get max() {
    return super.max;
  }
  update() {
    const e = (this.target - this.min) / (this.delta || 1), h = this.easing(e);
    this.current = this.min + h * this.delta;
  }
  handleAnimationFrame(e) {
    this.shift(e.elapsed), (e.elapsed && this.current === 0 || this.current === this.delta) && this.unlistenAnimationFrame();
  }
}
export {
  g as Animated,
  y as Damped,
  k as Tweened
};
