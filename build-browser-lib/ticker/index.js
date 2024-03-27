var x = (h, s, t) => {
  if (!s.has(h))
    throw TypeError("Cannot " + t);
};
var i = (h, s, t) => (x(h, s, "read from private field"), t ? t.call(h) : s.get(h)), r = (h, s, t) => {
  if (s.has(h))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(h) : s.set(h, t);
}, e = (h, s, t, n) => (x(h, s, "write to private field"), n ? n.call(h, t) : s.set(h, t), t);
var L = (h, s, t) => (x(h, s, "access private method"), t);
import { intersector as S } from "../intersector/index.js";
import { i as q } from "../browser-0zX67oeU.js";
var b, u, y, f, d, l, o, F;
class B {
  constructor(s, t) {
    r(this, b, void 0);
    r(this, u, void 0);
    r(this, y, void 0);
    r(this, f, 0);
    r(this, d, 0);
    r(this, l, 0);
    r(this, o, !1);
    r(this, F, (s) => {
      e(this, o, s.isIntersecting);
    });
    e(this, b, s), e(this, u, t == null ? void 0 : t.maxFPS), e(this, y, (t == null ? void 0 : t.order) || 0), t != null && t.culling && q ? S.subscribe(t.culling, i(this, F)) : e(this, o, !0);
  }
  get callback() {
    return i(this, b);
  }
  get order() {
    return i(this, y);
  }
  sync(s) {
    e(this, f, s - i(this, l));
  }
  tick(s) {
    if (e(this, l, Math.max(0, s - i(this, f))), i(this, d) || e(this, d, s), i(this, u))
      if (i(this, l) >= 1e3 / i(this, u))
        e(this, f, s - i(this, l) % i(this, u));
      else
        return;
    else
      e(this, f, s);
    i(this, o) && i(this, b).call(this, {
      elapsed: i(this, l),
      timestamp: s,
      startTimestamp: i(this, d)
    });
  }
  destroy() {
    S.unsubscribe(i(this, F));
  }
}
b = new WeakMap(), u = new WeakMap(), y = new WeakMap(), f = new WeakMap(), d = new WeakMap(), l = new WeakMap(), o = new WeakMap(), F = new WeakMap();
var k, m, a, g, c, w, I, v, E, T, A;
class C {
  constructor() {
    r(this, w);
    r(this, v);
    r(this, k, 0);
    r(this, m, 0);
    r(this, a, void 0);
    r(this, g, !1);
    r(this, c, []);
    r(this, T, (s) => {
      if (i(this, g)) {
        e(this, g, !1), e(this, k, s - i(this, m));
        for (const t of i(this, c))
          t.sync(i(this, m));
      }
      e(this, a, requestAnimationFrame(i(this, T))), e(this, m, s - i(this, k));
      for (const t of i(this, c))
        t.tick(i(this, m));
    });
    r(this, A, () => {
      document.hidden && e(this, g, !0);
    });
    q && document.addEventListener(
      "visibilitychange",
      i(this, A)
    );
  }
  subscribe(s, t) {
    if (!i(this, c).find((n) => n.callback === s)) {
      const n = new B(s, t);
      n.sync(performance.now()), i(this, c).push(n), e(this, c, i(this, c).sort((P, V) => P.order - V.order));
    }
    return L(this, w, I).call(this), () => this.unsubscribe(s);
  }
  unsubscribe(s) {
    const t = i(this, c).filter(
      (n) => n.callback === s
    );
    t.length && (t.forEach((n) => n.destroy()), e(this, c, i(this, c).filter(
      (n) => n.callback !== s
    )), i(this, c).length || L(this, v, E).call(this));
  }
  destroy() {
    q && (L(this, v, E).call(this), document.removeEventListener(
      "visibilitychange",
      i(this, A)
    ));
  }
}
k = new WeakMap(), m = new WeakMap(), a = new WeakMap(), g = new WeakMap(), c = new WeakMap(), w = new WeakSet(), I = function() {
  i(this, c).length && !i(this, a) && e(this, a, requestAnimationFrame(i(this, T)));
}, v = new WeakSet(), E = function() {
  i(this, a) && (cancelAnimationFrame(i(this, a)), e(this, a, void 0));
}, T = new WeakMap(), A = new WeakMap();
const j = new C();
export {
  C as Ticker,
  j as ticker
};
