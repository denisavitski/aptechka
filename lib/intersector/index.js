var l = (n, t, s) => {
  if (!t.has(n))
    throw TypeError("Cannot " + s);
};
var i = (n, t, s) => (l(n, t, "read from private field"), s ? s.call(n) : t.get(n)), f = (n, t, s) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, s);
}, h = (n, t, s, e) => (l(n, t, "write to private field"), e ? e.call(n, s) : t.set(n, s), s);
import { i as m } from "../browser-S4eq8AeN.js";
var r, u, b;
class p {
  constructor() {
    f(this, r, []);
    f(this, u, null);
    f(this, b, (t) => {
      i(this, r).map((e) => ({
        subscriber: e,
        entry: t.find((o) => o.target === e.element)
      })).forEach((e) => {
        e.entry && (e.subscriber.entry = e.entry, e.subscriber.callback(e.entry));
      });
    });
    m && h(this, u, new IntersectionObserver(i(this, b)));
  }
  subscribe(t, s) {
    const e = typeof t == "string" ? document.querySelector(t) : t;
    if (!e)
      return;
    const o = i(this, r).find((c) => c.element === e);
    if (!o)
      i(this, u).observe(e);
    else {
      const c = i(this, r).find((y) => y.element === e && y.entry);
      c != null && c.entry.isIntersecting && s(c.entry);
    }
    return i(this, r).push({
      element: e,
      callback: s,
      entry: (o == null ? void 0 : o.entry) || null
    }), () => {
      this.unsubscribe(s);
    };
  }
  unsubscribe(t) {
    const s = i(this, r).find((e) => e.callback === t);
    s && (h(this, r, i(this, r).filter((e) => e.callback === t)), i(this, r).find((e) => e.element === s.element) || i(this, u).unobserve(s.element));
  }
}
r = new WeakMap(), u = new WeakMap(), b = new WeakMap();
const w = new p();
export {
  p as Intersector,
  w as intersector
};
