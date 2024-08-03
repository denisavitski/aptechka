var h = (n, t, s) => {
  if (!t.has(n))
    throw TypeError("Cannot " + s);
};
var r = (n, t, s) => (h(n, t, "read from private field"), s ? s.call(n) : t.get(n)), b = (n, t, s) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, s);
}, u = (n, t, s, e) => (h(n, t, "write to private field"), e ? e.call(n, s) : t.set(n, s), s);
import { i as y } from "../browser-0zX67oeU.js";
import { a } from "../dom-P5QbAASX.js";
var i, o, f;
class p {
  constructor() {
    b(this, i, []);
    b(this, o, null);
    b(this, f, (t) => {
      r(this, i).map((e) => ({
        subscriber: e,
        entry: t.find((l) => l.target === e.element)
      })).forEach((e) => {
        e.entry && (e.subscriber.entry = e.entry, e.subscriber.callback(e.entry));
      });
    });
    y && window.ResizeObserver && u(this, o, new ResizeObserver(r(this, f)));
  }
  subscribe(t, s) {
    const e = a(t);
    if (!e)
      return () => {
      };
    const l = r(this, i).find(
      (c) => c.element === e
    );
    if (!l)
      r(this, o).observe(e);
    else {
      const c = r(this, i).find(
        (m) => m.element === e && m.entry
      );
      c != null && c.element.isConnected && s(c.entry);
    }
    return r(this, i).push({
      element: e,
      callback: s,
      entry: (l == null ? void 0 : l.entry) || null
    }), () => {
      this.unsubscribe(s);
    };
  }
  unsubscribe(t) {
    const s = r(this, i).find(
      (e) => e.callback === t
    );
    s && (u(this, i, r(this, i).filter(
      (e) => e.callback !== s.callback
    )), r(this, i).find((e) => e.element === s.element) || r(this, o).unobserve(s.element));
  }
}
i = new WeakMap(), o = new WeakMap(), f = new WeakMap();
const d = new p();
export {
  p as ElementResizer,
  d as elementResizer
};
