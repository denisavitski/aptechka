var b = Object.defineProperty, v = Object.defineProperties;
var w = Object.getOwnPropertyDescriptors;
var d = Object.getOwnPropertySymbols;
var x = Object.prototype.hasOwnProperty, y = Object.prototype.propertyIsEnumerable;
var f = (e, s, t) => s in e ? b(e, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[s] = t, g = (e, s) => {
  for (var t in s || (s = {}))
    x.call(s, t) && f(e, t, s[t]);
  if (d)
    for (var t of d(s))
      y.call(s, t) && f(e, t, s[t]);
  return e;
}, l = (e, s) => v(e, w(s));
var p = (e, s, t) => {
  if (!s.has(e))
    throw TypeError("Cannot " + t);
};
var a = (e, s, t) => (p(e, s, "read from private field"), t ? t.call(e) : s.get(e)), c = (e, s, t) => {
  if (s.has(e))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(e) : s.set(e, t);
}, m = (e, s, t, r) => (p(e, s, "write to private field"), r ? r.call(e, t) : s.set(e, t), t);
import { d as B } from "./math-BOBiC4TN.js";
import { n as u, p as A } from "./polyfills-X6KXuHg-.js";
import { A as D } from "./Animation-uimN7sdT.js";
var i, h;
class N extends D {
  constructor(t, r) {
    super(t, r);
    c(this, i, void 0);
    c(this, h, void 0);
    this.damping = 20, this.stiffness = 0, this.mass = 0, m(this, i, 0), m(this, h, 0), this.updateOptions(l(g({}, r), { equalize: !0 }));
  }
  get velocity() {
    return a(this, i);
  }
  get speed() {
    return a(this, h);
  }
  updateOptions(t) {
    this.damping = u(t == null ? void 0 : t.damping, this.damping), this.mass = u(t == null ? void 0 : t.mass, this.mass), this.stiffness = u(t == null ? void 0 : t.stiffness, this.stiffness), super.updateOptions(t);
  }
  handleAnimationFrame(t) {
    A(this.current, 6) === A(this.target, 6) && (this.unlistenAnimationFrame(), this.current = this.target);
    const r = this.current, F = Math.abs(r - this.target);
    m(this, h, F / t.timeBetweenFrames);
    const n = t.timeBetweenFrames / 1e3;
    if (this.mass || this.stiffness) {
      const O = (this.target - this.current) * this.stiffness - a(this, i) * this.damping;
      m(this, i, a(this, i) + O / this.mass * n), this.current += a(this, i) * n;
    } else
      this.current = B(this.current, this.target, this.damping, n);
  }
}
i = new WeakMap(), h = new WeakMap();
export {
  N as D
};
