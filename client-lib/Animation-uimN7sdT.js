var S = (i, r, t) => {
  if (!r.has(i))
    throw TypeError("Cannot " + t);
};
var e = (i, r, t) => (S(i, r, "read from private field"), t ? t.call(i) : r.get(i)), a = (i, r, t) => {
  if (r.has(i))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(i) : r.set(i, t);
}, h = (i, r, t, u) => (S(i, r, "write to private field"), u ? u.call(i, t) : r.set(i, t), t);
var I = (i, r, t) => (S(i, r, "access private method"), t);
import { S as P } from "./Store-Qr3SNOSf.js";
import { c as R } from "./math-BOBiC4TN.js";
import { p as q, n as F } from "./polyfills-X6KXuHg-.js";
import { ticker as z } from "./ticker/index.js";
import { TICK_ORDER as y } from "./order/index.js";
var f, d, A, l, b, s, n, m, c, g, M, O, x;
class E extends P {
  constructor(t, u) {
    super(t || 0, u);
    a(this, M);
    a(this, f, void 0);
    a(this, d, y.ANIMATION);
    a(this, A, void 0);
    a(this, l, new P(!1));
    a(this, b, 0);
    a(this, s, 0);
    a(this, n, -1 / 0);
    a(this, m, 1 / 0);
    a(this, c, 0);
    a(this, g, null);
    a(this, x, (t) => {
      this.handleAnimationFrame(t);
    });
    h(this, s, this.current);
  }
  get direction() {
    return e(this, b);
  }
  get target() {
    return e(this, s);
  }
  get min() {
    return e(this, n);
  }
  set min(t) {
    h(this, n, t), this.set(e(this, s), {
      equalize: !0
    });
  }
  get max() {
    return e(this, m);
  }
  set max(t) {
    h(this, m, t), this.set(e(this, s), {
      equalize: !0
    });
  }
  get from() {
    return e(this, c);
  }
  get isRunning() {
    return e(this, l);
  }
  get delta() {
    return Math.abs(e(this, s) - e(this, c));
  }
  get deltaProgress() {
    return this.delta ? q(Math.abs(this.current - e(this, c)) / this.delta, 6) : 0;
  }
  get distance() {
    return Math.abs(e(this, m) - e(this, n));
  }
  get distanceProgress() {
    return this.distance ? q(Math.abs(this.current - e(this, n)) / this.distance, 6) : 0;
  }
  set(t, u) {
    (e(this, s) !== t || u != null && u.restart) && (h(this, g, t), this.updateOptions(u), h(this, g, null), e(this, s) !== this.current && this.start());
  }
  shift(t, u) {
    this.set(e(this, s) + t, u);
  }
  reset() {
    super.reset(), this.set(this.initial, { equalize: !0 });
  }
  close() {
    super.close(), this.reset(), this.unlistenAnimationFrame();
  }
  listenAnimationFrame() {
    e(this, l).current || (e(this, l).current = !0, z.subscribe(e(this, x), {
      maxFPS: e(this, f),
      order: e(this, d),
      culling: e(this, A)
    }));
  }
  unlistenAnimationFrame() {
    e(this, l).current && (e(this, l).current = !1, z.unsubscribe(e(this, x)));
  }
  updateOptions(t) {
    h(this, f, F(t == null ? void 0 : t.maxFPS, e(this, f))), h(this, d, F(t == null ? void 0 : t.order, e(this, d))), h(this, A, F(t == null ? void 0 : t.culling, e(this, A))), h(this, n, F(t == null ? void 0 : t.min, e(this, n))), h(this, m, F(t == null ? void 0 : t.max, e(this, m))), I(this, M, O).call(this, typeof e(this, g) == "number" ? e(this, g) : e(this, s)), t != null && t.equalize && (this.unlistenAnimationFrame(), this.current = e(this, s)), t != null && t.restart && (this.unlistenAnimationFrame(), this.current = this.initial);
  }
  start() {
    this.listenAnimationFrame();
  }
}
f = new WeakMap(), d = new WeakMap(), A = new WeakMap(), l = new WeakMap(), b = new WeakMap(), s = new WeakMap(), n = new WeakMap(), m = new WeakMap(), c = new WeakMap(), g = new WeakMap(), M = new WeakSet(), O = function(t) {
  h(this, b, Math.sign(t - e(this, s))), h(this, s, R(t, e(this, n), e(this, m))), h(this, c, this.current);
}, x = new WeakMap();
export {
  E as A
};
