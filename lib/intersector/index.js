var m = (n, t, s) => {
  if (!t.has(n))
    throw TypeError("Cannot " + s);
};
var r = (n, t, s) => (m(n, t, "read from private field"), s ? s.call(n) : t.get(n)), f = (n, t, s) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, s);
}, l = (n, t, s, e) => (m(n, t, "write to private field"), e ? e.call(n, s) : t.set(n, s), s);
import { i as y } from "../browser-0zX67oeU.js";
import { a as p } from "../dom-P5QbAASX.js";
var i, b, u;
class w {
  constructor() {
    f(this, i, []);
    f(this, b, null);
    f(this, u, (t) => {
      r(this, i).map((e) => ({
        subscriber: e,
        entry: t.find((o) => o.target === e.element)
      })).forEach((e) => {
        e.entry && (e.subscriber.entry = e.entry, e.subscriber.callback(e.entry));
      });
    });
    y && window.IntersectionObserver && l(this, b, new IntersectionObserver(
      r(this, u)
    ));
  }
  subscribe(t, s) {
    const e = p(t);
    if (!e)
      return () => {
      };
    const o = r(this, i).find(
      (c) => c.element === e
    );
    if (!o)
      r(this, b).observe(e);
    else {
      const c = r(this, i).find(
        (h) => h.element === e && h.entry
      );
      c != null && c.entry.isIntersecting && s(c.entry);
    }
    return r(this, i).push({
      element: e,
      callback: s,
      entry: (o == null ? void 0 : o.entry) || null
    }), console.log(r(this, i)), () => {
      this.unsubscribe(s);
    };
  }
  unsubscribe(t) {
    const s = r(this, i).find(
      (e) => e.callback === t
    );
    s && (l(this, i, r(this, i).filter(
      (e) => e.callback === t
    )), r(this, i).find((e) => e.element === s.element) || r(this, b).unobserve(s.element));
  }
}
i = new WeakMap(), b = new WeakMap(), u = new WeakMap();
const d = new w();
export {
  w as Intersector,
  d as intersector
};
