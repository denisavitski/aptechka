var v = Object.defineProperty, z = Object.defineProperties;
var B = Object.getOwnPropertyDescriptors;
var I = Object.getOwnPropertySymbols;
var E = Object.prototype.hasOwnProperty, G = Object.prototype.propertyIsEnumerable;
var M = (r, e, t) => e in r ? v(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, R = (r, e) => {
  for (var t in e || (e = {}))
    E.call(e, t) && M(r, t, e[t]);
  if (I)
    for (var t of I(e))
      G.call(e, t) && M(r, t, e[t]);
  return r;
}, k = (r, e) => z(r, B(e));
var p = (r, e, t) => {
  if (!e.has(r))
    throw TypeError("Cannot " + t);
};
var i = (r, e, t) => (p(r, e, "read from private field"), t ? t.call(r) : e.get(r)), n = (r, e, t) => {
  if (e.has(r))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(r) : e.set(r, t);
}, h = (r, e, t, s) => (p(r, e, "write to private field"), s ? s.call(r, t) : e.set(r, t), t);
var C = (r, e, t) => (p(r, e, "access private method"), t);
import { S as w } from "./Store-JOKrNVEr.js";
import { c as H, d as J } from "./math-BOBiC4TN.js";
import { p as D } from "./number-Bo5RdrA1.js";
import { n as L } from "./polyfills-DJUYczFm.js";
import { ticker as N } from "./ticker/index.js";
var d, f, x, g, c, b, l, u, m, a, S, j, y, q, A, F;
class W extends w {
  constructor(t, s) {
    super(t || 0);
    n(this, S);
    n(this, y);
    n(this, d, void 0);
    n(this, f, void 0);
    n(this, x, void 0);
    n(this, g, void 0);
    n(this, c, new w(!1));
    n(this, b, 0);
    n(this, l, 0);
    n(this, u, 0);
    n(this, m, 0);
    n(this, a, void 0);
    n(this, A, (t) => {
      const s = this.current;
      D(this.current, 4) === D(this.target, 4) && (this.stopAnimation(), this.current = this.target), this.current = J(this.current, this.target, i(this, g), t.elapsed);
      const P = Math.abs(s - this.target);
      h(this, l, P / t.elapsed);
    });
    n(this, F, () => {
      this.set(i(this, a), !0);
    });
    h(this, g, (s == null ? void 0 : s.damping) || 0.01), h(this, f, s == null ? void 0 : s.order), h(this, d, s == null ? void 0 : s.maxFPS), h(this, x, s == null ? void 0 : s.culling), h(this, u, L(s == null ? void 0 : s.min, -1 / 0)), h(this, m, L(s == null ? void 0 : s.max, 1 / 0)), h(this, a, this.current);
  }
  get target() {
    return i(this, a);
  }
  get isRunning() {
    return i(this, c);
  }
  get direction() {
    return i(this, b);
  }
  get maxFPS() {
    return i(this, d);
  }
  get speed() {
    return i(this, l);
  }
  get min() {
    return i(this, u);
  }
  set min(t) {
    h(this, u, t), i(this, F).call(this);
  }
  get max() {
    return i(this, m);
  }
  set max(t) {
    h(this, m, t), i(this, F).call(this);
  }
  get length() {
    return i(this, m) - i(this, u);
  }
  get progress() {
    return this.length ? D((this.current - i(this, u)) / this.length, 6) : 0;
  }
  get damping() {
    return i(this, g);
  }
  set damping(t) {
    h(this, g, t);
  }
  get entry() {
    return k(R({}, super.entry), {
      min: i(this, u),
      max: i(this, m),
      length: this.length,
      direction: this.direction,
      progress: this.progress,
      speed: this.speed
    });
  }
  set(t, s = !1) {
    const P = i(this, a);
    h(this, a, H(t, i(this, u), i(this, m))), s && (this.current = i(this, a)), i(this, a) !== P && (h(this, l, 0), h(this, b, Math.sign(t - i(this, a)) || 1), C(this, y, q).call(this));
  }
  shift(t, s = !1) {
    this.set(i(this, a) + t, s);
  }
  close() {
    super.close(), this.stopAnimation();
  }
  reset() {
    this.set(this.initial, !0);
  }
  stopAnimation() {
    i(this, c).current && (h(this, l, 0), i(this, c).current = !1, N.unsubscribe(i(this, A)));
  }
}
d = new WeakMap(), f = new WeakMap(), x = new WeakMap(), g = new WeakMap(), c = new WeakMap(), b = new WeakMap(), l = new WeakMap(), u = new WeakMap(), m = new WeakMap(), a = new WeakMap(), S = new WeakSet(), j = function() {
  i(this, c).current || (i(this, c).current = !0, N.subscribe(i(this, A), {
    maxFPS: i(this, d),
    order: i(this, f),
    culling: i(this, x)
  }));
}, y = new WeakSet(), q = function() {
  i(this, g) ? this.current !== this.target && C(this, S, j).call(this) : (this.current = this.target, this.stopAnimation());
}, A = new WeakMap(), F = new WeakMap();
export {
  W as D
};
