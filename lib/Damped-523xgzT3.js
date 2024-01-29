var q = Object.defineProperty, z = Object.defineProperties;
var B = Object.getOwnPropertyDescriptors;
var k = Object.getOwnPropertySymbols;
var C = Object.prototype.hasOwnProperty, G = Object.prototype.propertyIsEnumerable;
var D = (s, e, t) => e in s ? q(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, I = (s, e) => {
  for (var t in e || (e = {}))
    C.call(e, t) && D(s, t, e[t]);
  if (k)
    for (var t of k(e))
      G.call(e, t) && D(s, t, e[t]);
  return s;
}, L = (s, e) => z(s, B(e));
var w = (s, e, t) => (D(s, typeof e != "symbol" ? e + "" : e, t), t), M = (s, e, t) => {
  if (!e.has(s))
    throw TypeError("Cannot " + t);
};
var i = (s, e, t) => (M(s, e, "read from private field"), t ? t.call(s) : e.get(s)), n = (s, e, t) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, t);
}, h = (s, e, t, r) => (M(s, e, "write to private field"), r ? r.call(s, t) : e.set(s, t), t);
var b = (s, e, t) => (M(s, e, "access private method"), t);
import { c as H, d as J } from "./math-_a3IpKOc.js";
import { f as R } from "./number-bCHB2GAD.js";
import { S as E } from "./Store-2hWEUGTj.js";
import { ticker as j } from "./ticker/index.js";
var g, S, y, a, l, f, u, x, P, c, F, v, d, A;
class K extends E {
  constructor(t) {
    super(0, t);
    n(this, d);
    n(this, g, void 0);
    n(this, S, void 0);
    n(this, y, void 0);
    n(this, a, void 0);
    n(this, l, void 0);
    n(this, f, void 0);
    n(this, u, void 0);
    n(this, x, new E(!1));
    n(this, P, 0);
    n(this, c, 0);
    n(this, F, (t) => {
      this.set(t.current);
    });
    n(this, v, (t) => {
      const r = this.current;
      this.handleAnimationFrame(t);
      const m = Math.abs(r - this.target);
      h(this, c, m / t.elapsed);
    });
    h(this, S, t == null ? void 0 : t.order), h(this, g, t == null ? void 0 : t.maxFPS), h(this, y, t == null ? void 0 : t.culling), h(this, l, b(this, d, A).call(this, t == null ? void 0 : t.min)), h(this, f, b(this, d, A).call(this, t == null ? void 0 : t.max)), h(this, a, this.current = 0);
  }
  get target() {
    return i(this, a);
  }
  get isRunning() {
    return i(this, x);
  }
  get direction() {
    return i(this, P);
  }
  get maxFPS() {
    return i(this, g);
  }
  get speed() {
    return i(this, c);
  }
  get min() {
    return i(this, l).call(this);
  }
  set min(t) {
    h(this, l, b(this, d, A).call(this, t)), this.set(i(this, a)), this.current = i(this, a);
  }
  get max() {
    return i(this, f).call(this);
  }
  set max(t) {
    h(this, f, b(this, d, A).call(this, t)), this.set(i(this, a)), this.current = i(this, a);
  }
  get delta() {
    return this.max - this.min;
  }
  get progress() {
    return this.delta ? R((this.current - this.min) / this.delta, 6) : 0;
  }
  get setter() {
    return i(this, u);
  }
  get entry() {
    return L(I({}, super.entry), {
      min: this.min,
      max: this.max,
      delta: this.delta,
      direction: this.direction,
      progress: this.progress,
      speed: this.speed
    });
  }
  set setter(t) {
    var r, m;
    (r = i(this, u)) == null || r.unsubscribe(i(this, F)), h(this, u, t), (m = i(this, u)) == null || m.subscribe(i(this, F));
  }
  set(t, r = !1) {
    const m = i(this, a);
    h(this, a, H(t, this.min, this.max)), r && (this.current = i(this, a)), i(this, a) !== m && (h(this, c, 0), h(this, P, Math.sign(t - i(this, a)) || 1), this.update());
  }
  shift(t, r = !1) {
    this.set(i(this, a) + t, r);
  }
  close() {
    var t;
    super.close(), this.unlistenAnimationFrame(), (t = i(this, u)) == null || t.unsubscribe(i(this, F)), h(this, u, void 0);
  }
  reset() {
    this.set(this.initial, !0), super.reset(), this.unlistenAnimationFrame();
  }
  listenAnimationFrame() {
    i(this, x).current = !0, j.subscribe(i(this, v), {
      maxFPS: i(this, g),
      order: i(this, S),
      culling: i(this, y)
    });
  }
  unlistenAnimationFrame() {
    h(this, c, 0), i(this, x).current = !1, j.unsubscribe(i(this, v));
  }
}
g = new WeakMap(), S = new WeakMap(), y = new WeakMap(), a = new WeakMap(), l = new WeakMap(), f = new WeakMap(), u = new WeakMap(), x = new WeakMap(), P = new WeakMap(), c = new WeakMap(), F = new WeakMap(), v = new WeakMap(), d = new WeakSet(), A = function(t) {
  const r = t || 0;
  return typeof r == "function" ? r : () => r;
};
class V extends K {
  constructor(t) {
    var r, m;
    super(L(I({}, t), {
      min: (r = t == null ? void 0 : t.min) != null ? r : -1 / 0,
      max: (m = t == null ? void 0 : t.max) != null ? m : 1 / 0
    }));
    w(this, "damping");
    this.damping = (t == null ? void 0 : t.damping) || 0;
  }
  update() {
    this.damping ? this.listenAnimationFrame() : (this.current = this.target, this.unlistenAnimationFrame());
  }
  handleAnimationFrame(t) {
    R(this.current, 4) === R(this.target, 4) && (this.unlistenAnimationFrame(), this.current = this.target), this.current = J(this.current, this.target, this.damping, t.elapsed);
  }
}
export {
  K as A,
  V as D
};
