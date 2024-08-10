var S = (h, i, s) => {
  if (!i.has(h))
    throw TypeError("Cannot " + s);
};
var e = (h, i, s) => (S(h, i, "read from private field"), s ? s.call(h) : i.get(h)), r = (h, i, s) => {
  if (i.has(h))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(h) : i.set(h, s);
}, t = (h, i, s, n) => (S(h, i, "write to private field"), n ? n.call(h, s) : i.set(h, s), s);
var A = (h, i, s) => (S(h, i, "access private method"), s);
import { i as x } from "../browser-0zX67oeU.js";
import { a as P } from "../dom-P5QbAASX.js";
var d, u, y, m, b, l, o, g, E;
class V {
  constructor(i, s) {
    r(this, d, void 0);
    r(this, u, void 0);
    r(this, y, void 0);
    r(this, m, 0);
    r(this, b, 0);
    r(this, l, 0);
    r(this, o, !1);
    r(this, g, null);
    r(this, E, (i) => {
      const s = i[0];
      t(this, o, s.isIntersecting);
    });
    if (t(this, d, i), t(this, u, s == null ? void 0 : s.maxFPS), t(this, y, (s == null ? void 0 : s.order) || 0), s != null && s.culling && x) {
      const n = P(s.culling);
      n && (t(this, g, new IntersectionObserver(
        e(this, E)
      )), e(this, g).observe(n));
    } else
      t(this, o, !0);
  }
  get callback() {
    return e(this, d);
  }
  get order() {
    return e(this, y);
  }
  sync(i) {
    t(this, m, i - e(this, l));
  }
  tick(i) {
    if (t(this, l, Math.max(0, i - e(this, m))), e(this, b) || t(this, b, i), e(this, u))
      if (e(this, l) >= 1e3 / e(this, u))
        t(this, m, i - e(this, l) % e(this, u));
      else
        return;
    else
      t(this, m, i);
    e(this, o) && e(this, d).call(this, {
      timeBetweenFrames: e(this, l),
      timestamp: i,
      subscribeTimestamp: e(this, b),
      timeElapsedSinceSubscription: i - e(this, b)
    });
  }
  destroy() {
    var i;
    (i = e(this, g)) == null || i.disconnect();
  }
}
d = new WeakMap(), u = new WeakMap(), y = new WeakMap(), m = new WeakMap(), b = new WeakMap(), l = new WeakMap(), o = new WeakMap(), g = new WeakMap(), E = new WeakMap();
var v, f, a, F, c, L, B, k, q, w, T;
class C {
  constructor() {
    r(this, L);
    r(this, k);
    r(this, v, 0);
    r(this, f, 0);
    r(this, a, void 0);
    r(this, F, !1);
    r(this, c, []);
    r(this, w, (i) => {
      if (e(this, F)) {
        t(this, F, !1), t(this, v, i - e(this, f));
        for (const s of e(this, c))
          s.sync(e(this, f));
      }
      t(this, a, requestAnimationFrame(e(this, w))), t(this, f, i - e(this, v));
      for (const s of e(this, c))
        s.tick(e(this, f));
    });
    r(this, T, () => {
      document.hidden && t(this, F, !0);
    });
    x && document.addEventListener(
      "visibilitychange",
      e(this, T)
    );
  }
  subscribe(i, s) {
    if (!e(this, c).find((n) => n.callback === i)) {
      const n = new V(i, s);
      n.sync(performance.now()), e(this, c).push(n), t(this, c, e(this, c).sort((I, O) => I.order - O.order));
    }
    return A(this, L, B).call(this), () => this.unsubscribe(i);
  }
  unsubscribe(i) {
    const s = e(this, c).filter(
      (n) => n.callback === i
    );
    s.length && (s.forEach((n) => n.destroy()), t(this, c, e(this, c).filter(
      (n) => n.callback !== i
    )), e(this, c).length || A(this, k, q).call(this));
  }
  destroy() {
    x && (A(this, k, q).call(this), document.removeEventListener(
      "visibilitychange",
      e(this, T)
    ));
  }
}
v = new WeakMap(), f = new WeakMap(), a = new WeakMap(), F = new WeakMap(), c = new WeakMap(), L = new WeakSet(), B = function() {
  e(this, c).length && !e(this, a) && t(this, a, requestAnimationFrame(e(this, w)));
}, k = new WeakSet(), q = function() {
  e(this, a) && (cancelAnimationFrame(e(this, a)), t(this, a, void 0));
}, w = new WeakMap(), T = new WeakMap();
const j = new C();
export {
  C as Ticker,
  j as ticker
};
