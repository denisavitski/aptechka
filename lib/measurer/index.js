var c = Object.defineProperty;
var d = (s, e, t) => e in s ? c(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var f = (s, e, t) => (d(s, typeof e != "symbol" ? e + "" : e, t), t), m = (s, e, t) => {
  if (!e.has(s))
    throw TypeError("Cannot " + t);
};
var i = (s, e, t) => (m(s, e, "read from private field"), t ? t.call(s) : e.get(s)), n = (s, e, t) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, t);
}, h = (s, e, t, o) => (m(s, e, "write to private field"), o ? o.call(s, t) : e.set(s, t), t);
import { i as O } from "../browser-S4eq8AeN.js";
import { g as z, a as C } from "../layout-5SJlcXTY.js";
var r, a, l, u;
class v {
  constructor(e) {
    n(this, r, void 0);
    n(this, a, null);
    n(this, l, 0);
    f(this, "value", (e) => e ? e(i(this, l)) : i(this, l));
    n(this, u, () => {
      h(this, l, this.handleResize()), i(this, r).isConnected || this.destroy();
    });
    h(this, r, e), O && (h(this, a, new ResizeObserver(i(this, u))), i(this, a).observe(e));
  }
  get element() {
    return i(this, r);
  }
  destroy() {
    i(this, a).disconnect();
  }
}
r = new WeakMap(), a = new WeakMap(), l = new WeakMap(), u = new WeakMap();
class R extends v {
  handleResize() {
    return z(this.element);
  }
}
class x extends v {
  handleResize() {
    return C(this.element);
  }
}
export {
  R as CumulativeOffsetLeft,
  x as CumulativeOffsetTop,
  v as Measurer
};
