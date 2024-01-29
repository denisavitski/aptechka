var m = Object.defineProperty, S = Object.defineProperties;
var C = Object.getOwnPropertyDescriptors;
var v = Object.getOwnPropertySymbols;
var L = Object.prototype.hasOwnProperty, b = Object.prototype.propertyIsEnumerable;
var w = (s, t, e) => t in s ? m(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e, u = (s, t) => {
  for (var e in t || (t = {}))
    L.call(t, e) && w(s, e, t[e]);
  if (v)
    for (var e of v(t))
      b.call(t, e) && w(s, e, t[e]);
  return s;
}, c = (s, t) => S(s, C(t));
var y = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var r = (s, t, e) => (y(s, t, "read from private field"), e ? e.call(s) : t.get(s)), h = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, E = (s, t, e, o) => (y(s, t, "write to private field"), o ? o.call(s, e) : t.set(s, e), e);
import { Notifier as p } from "../notifier/index.js";
import { d as x } from "../function-zwSFehNd.js";
var i, l, a, d, n, g, f;
class A {
  constructor() {
    h(this, i, /* @__PURE__ */ new Map());
    h(this, l, new p());
    h(this, a, new p());
    h(this, d, new p());
    h(this, n, !1);
    h(this, g, (t) => {
      const { loaded: e, total: o } = this.getStats();
      r(this, l).notify({
        progress: e / o,
        loaded: e,
        total: o,
        namespace: t
      }), r(this, f).call(this);
    });
    h(this, f, x(() => {
      const { loaded: t, total: e } = this.getStats();
      if (t === e) {
        E(this, n, !0);
        const { total: o } = this.getStats();
        r(this, a).notify({
          total: o
        });
      }
    }, 150));
  }
  get progressEvent() {
    return r(this, l);
  }
  get completeEvent() {
    return r(this, a);
  }
  get errorEvent() {
    return r(this, d);
  }
  get _counter() {
    return r(this, i);
  }
  get isComplete() {
    return r(this, n);
  }
  reset() {
    E(this, n, !1), r(this, i).clear();
  }
  setTotal(t, e = 1) {
    r(this, n) || r(this, i).set(t, { loaded: 0, total: e });
  }
  setLoaded(t, e = 1) {
    if (!r(this, n) && r(this, i).has(t)) {
      const o = r(this, i).get(t);
      o.loaded !== e && (r(this, i).set(t, c(u({}, o), { loaded: e })), r(this, g).call(this, t));
    }
  }
  setError(t, e) {
    if (!r(this, n) && r(this, i).has(t)) {
      const o = r(this, i).get(t);
      r(this, i).set(t, c(u({}, o), { total: o.total - 1 })), r(this, d).notify({
        namespace: t,
        url: e
      });
    }
  }
  getStats() {
    return Array.from(r(this, i)).reduce(
      (t, e) => ({ loaded: t.loaded + e[1].loaded, total: t.total + e[1].total }),
      { loaded: 0, total: 0 }
    );
  }
}
i = new WeakMap(), l = new WeakMap(), a = new WeakMap(), d = new WeakMap(), n = new WeakMap(), g = new WeakMap(), f = new WeakMap();
const _ = new A();
export {
  _ as loading
};
