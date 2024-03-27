var v = Object.defineProperty, z = Object.defineProperties;
var B = Object.getOwnPropertyDescriptors;
var T = Object.getOwnPropertySymbols;
var E = Object.prototype.hasOwnProperty, G = Object.prototype.propertyIsEnumerable;
var k = (i, e, t) => e in i ? v(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, C = (i, e) => {
  for (var t in e || (e = {}))
    E.call(e, t) && k(i, t, e[t]);
  if (T)
    for (var t of T(e))
      G.call(e, t) && k(i, t, e[t]);
  return i;
}, L = (i, e) => z(i, B(e));
var D = (i, e, t) => {
  if (!e.has(i))
    throw TypeError("Cannot " + t);
};
var r = (i, e, t) => (D(i, e, "read from private field"), t ? t.call(i) : e.get(i)), h = (i, e, t) => {
  if (e.has(i))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(i) : e.set(i, t);
}, n = (i, e, t, s) => (D(i, e, "write to private field"), s ? s.call(i, t) : e.set(i, t), t);
var u = (i, e, t) => (D(i, e, "access private method"), t);
import { D as $ } from "../Damped-DEHDBwBz.js";
import { S as M } from "../Store-JOKrNVEr.js";
import { l as H } from "../easings-BKi40vHz.js";
import { c as I } from "../math-BOBiC4TN.js";
import { p as N } from "../number-Bo5RdrA1.js";
import { n as S } from "../polyfills-DJUYczFm.js";
import { ticker as O } from "../ticker/index.js";
var d, x, F, b, l, a, c, g, P, w, R, A, j, m, f, y;
class Y extends M {
  constructor(t, s) {
    super(t || 0);
    h(this, w);
    h(this, A);
    h(this, m);
    h(this, d, void 0);
    h(this, x, void 0);
    h(this, F, void 0);
    h(this, b, H);
    h(this, l, 1e3);
    h(this, a, new M(!1));
    h(this, c, 0);
    h(this, g, 0);
    h(this, P, 0);
    h(this, y, (t) => {
      const s = (t.timestamp - t.startTimestamp) / 1e3 / (r(this, l) / 1e3), q = r(this, b).call(this, I(s, 0, 1));
      this.current = N(r(this, c) + (r(this, g) - r(this, c)) * q, 6), s > 1 && u(this, m, f).call(this);
    });
    u(this, w, R).call(this, s);
  }
  get isRunning() {
    return r(this, a);
  }
  get direction() {
    return r(this, P);
  }
  get length() {
    return r(this, g) - r(this, c);
  }
  get progress() {
    return this.length ? N((this.current - r(this, c)) / this.length, 6) : 0;
  }
  get entry() {
    return L(C({}, super.entry), {
      length: this.length,
      direction: this.direction,
      progress: this.progress
    });
  }
  set(t, s) {
    s != null && s.restart && (this.current = this.initial), n(this, c, this.current), n(this, g, t), n(this, P, Math.sign(this.length)), u(this, w, R).call(this, s), r(this, l) ? (u(this, m, f).call(this), u(this, A, j).call(this)) : (this.current = r(this, g), u(this, m, f).call(this));
  }
  shift(t, s) {
    this.set(this.current + t, s);
  }
  reset() {
    u(this, m, f).call(this), super.reset();
  }
  close() {
    super.close(), u(this, m, f).call(this);
  }
}
d = new WeakMap(), x = new WeakMap(), F = new WeakMap(), b = new WeakMap(), l = new WeakMap(), a = new WeakMap(), c = new WeakMap(), g = new WeakMap(), P = new WeakMap(), w = new WeakSet(), R = function(t) {
  n(this, b, S(t == null ? void 0 : t.easing, r(this, b))), n(this, l, S(t == null ? void 0 : t.duration, r(this, l))), n(this, d, S(t == null ? void 0 : t.maxFPS, r(this, d))), n(this, x, S(t == null ? void 0 : t.order, r(this, x))), n(this, F, S(t == null ? void 0 : t.culling, r(this, F)));
}, A = new WeakSet(), j = function() {
  r(this, a).current || (r(this, a).current = !0, O.subscribe(r(this, y), {
    maxFPS: r(this, d),
    order: r(this, x),
    culling: r(this, F)
  }));
}, m = new WeakSet(), f = function() {
  r(this, a).current && (r(this, a).current = !1, O.unsubscribe(r(this, y)));
}, y = new WeakMap();
export {
  $ as Damped,
  Y as Tweened
};
