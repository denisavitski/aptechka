var o = Object.defineProperty, g = Object.defineProperties;
var F = Object.getOwnPropertyDescriptors;
var u = Object.getOwnPropertySymbols;
var O = Object.prototype.hasOwnProperty, b = Object.prototype.propertyIsEnumerable;
var l = (i, e, t) => e in i ? o(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, c = (i, e) => {
  for (var t in e || (e = {}))
    O.call(e, t) && l(i, t, e[t]);
  if (u)
    for (var t of u(e))
      b.call(e, t) && l(i, t, e[t]);
  return i;
}, d = (i, e) => g(i, F(e));
var f = (i, e, t) => {
  if (!e.has(i))
    throw TypeError("Cannot " + t);
};
var n = (i, e, t) => (f(i, e, "read from private field"), t ? t.call(i) : e.get(i)), m = (i, e, t) => {
  if (e.has(i))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(i) : e.set(i, t);
}, h = (i, e, t, a) => (f(i, e, "write to private field"), a ? a.call(i, t) : e.set(i, t), t);
import { l as x } from "./easings-BKi40vHz.js";
import { c as S } from "./math-BOBiC4TN.js";
import { n as p, p as T } from "./polyfills-X6KXuHg-.js";
import { A as q } from "./Animation-uimN7sdT.js";
var s, r;
class j extends q {
  constructor(t, a) {
    super(t || 0, a);
    m(this, s, x);
    m(this, r, 1e3);
    this.updateOptions(d(c({}, a), { equalize: !0 }));
  }
  updateOptions(t) {
    super.updateOptions(t), h(this, s, p(t == null ? void 0 : t.easing, n(this, s))), h(this, r, p(t == null ? void 0 : t.duration, n(this, r)));
  }
  handleAnimationFrame(t) {
    const a = t.timeElapsedSinceSubscription / 1e3 / (n(this, r) / 1e3), A = n(this, s).call(this, S(a, 0, 1));
    this.current = T(this.from + (this.target - this.from) * A, 6), a > 1 && this.unlistenAnimationFrame();
  }
  start() {
    this.unlistenAnimationFrame(), this.listenAnimationFrame();
  }
}
s = new WeakMap(), r = new WeakMap();
export {
  j as T
};
