var T = (r, s, t) => {
  if (!s.has(r))
    throw TypeError("Cannot " + t);
};
var i = (r, s, t) => (T(r, s, "read from private field"), t ? t.call(r) : s.get(r)), h = (r, s, t) => {
  if (s.has(r))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(r) : s.set(r, t);
}, e = (r, s, t, n) => (T(r, s, "write to private field"), n ? n.call(r, t) : s.set(r, t), t);
var w = (r, s, t) => (T(r, s, "access private method"), t);
import { intersector as E } from "../intersector/index.js";
import { i as g } from "../browser-S4eq8AeN.js";
var m, u, y, f, l, d, F;
class V {
  constructor(s, t) {
    h(this, m, void 0);
    h(this, u, void 0);
    h(this, y, void 0);
    h(this, f, 0);
    h(this, l, 0);
    h(this, d, !1);
    h(this, F, (s) => {
      e(this, d, s.isIntersecting);
    });
    e(this, m, s), e(this, u, t == null ? void 0 : t.maxFPS), e(this, y, (t == null ? void 0 : t.order) || 0), t != null && t.culling && g ? E.subscribe(t.culling, i(this, F)) : e(this, d, !0);
  }
  get callback() {
    return i(this, m);
  }
  get order() {
    return i(this, y);
  }
  sync(s) {
    e(this, f, s - i(this, l));
  }
  tick(s) {
    if (e(this, l, Math.max(0, s - i(this, f))), i(this, u))
      if (i(this, l) >= 1e3 / i(this, u))
        e(this, f, s - i(this, l) % i(this, u));
      else
        return;
    else
      e(this, f, s);
    i(this, d) && i(this, m).call(this, {
      elapsed: i(this, l),
      timestamp: s
    });
  }
  destroy() {
    E.unsubscribe(i(this, F));
  }
}
m = new WeakMap(), u = new WeakMap(), y = new WeakMap(), f = new WeakMap(), l = new WeakMap(), d = new WeakMap(), F = new WeakMap();
var k, b, a, o, c, x, S, v, q, A, L;
class B {
  constructor() {
    h(this, x);
    h(this, v);
    h(this, k, 0);
    h(this, b, 0);
    h(this, a, void 0);
    h(this, o, !1);
    h(this, c, []);
    h(this, A, (s) => {
      if (i(this, o)) {
        e(this, o, !1), e(this, k, s - i(this, b));
        for (const t of i(this, c))
          t.sync(i(this, b));
      }
      e(this, a, requestAnimationFrame(i(this, A))), e(this, b, s - i(this, k));
      for (const t of i(this, c))
        t.tick(i(this, b));
    });
    h(this, L, () => {
      document.hidden && e(this, o, !0);
    });
    g && document.addEventListener("visibilitychange", i(this, L));
  }
  subscribe(s, t) {
    if (g) {
      if (!i(this, c).find((n) => n.callback === s)) {
        const n = new V(s, t);
        n.sync(performance.now()), i(this, c).push(n), e(this, c, i(this, c).sort((I, P) => I.order - P.order));
      }
      w(this, x, S).call(this);
    }
  }
  unsubscribe(s) {
    if (!g)
      return;
    const t = i(this, c).filter((n) => n.callback === s);
    t.length && (t.forEach((n) => n.destroy()), e(this, c, i(this, c).filter((n) => n.callback !== s)), i(this, c).length || w(this, v, q).call(this));
  }
  destroy() {
    g && (w(this, v, q).call(this), document.removeEventListener("visibilitychange", i(this, L)));
  }
}
k = new WeakMap(), b = new WeakMap(), a = new WeakMap(), o = new WeakMap(), c = new WeakMap(), x = new WeakSet(), S = function() {
  i(this, c).length && !i(this, a) && e(this, a, requestAnimationFrame(i(this, A)));
}, v = new WeakSet(), q = function() {
  i(this, a) && (cancelAnimationFrame(i(this, a)), e(this, a, void 0));
}, A = new WeakMap(), L = new WeakMap();
const M = new B();
export {
  B as Ticker,
  M as ticker
};
