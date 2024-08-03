var f = (s, t, r) => {
  if (!t.has(s))
    throw TypeError("Cannot " + r);
};
var e = (s, t, r) => (f(s, t, "read from private field"), r ? r.call(s) : t.get(s)), l = (s, t, r) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, r);
};
import { Notifier as g } from "../notifier/index.js";
import { g as u } from "../dom-P5QbAASX.js";
var h, i, o;
class c {
  constructor() {
    l(this, h, /* @__PURE__ */ new Set());
    l(this, i, /* @__PURE__ */ new WeakMap());
    l(this, o, new g());
  }
  get notifier() {
    return e(this, o);
  }
  register(t) {
    e(this, i).set(t, {
      axis: "y",
      value: 0,
      element: t
    }), e(this, h).add(t), e(this, o).notify();
  }
  unregister(t) {
    e(this, i).delete(t), e(this, h).delete(t), e(this, o).notify();
  }
  update(t, r, a) {
    const n = e(this, i).get(t);
    n.axis = r, n.value = a;
  }
  hasEntry(t) {
    return e(this, i).has(t);
  }
  getEntry(t) {
    return e(this, i).get(t);
  }
  getAll(t) {
    const r = u(t).filter((n) => e(this, h).has(n)), a = [];
    return r.forEach((n) => {
      e(this, i).has(n) && a.push(e(this, i).get(n));
    }), a;
  }
}
h = new WeakMap(), i = new WeakMap(), o = new WeakMap();
const d = new c();
export {
  d as scrollEntries
};
