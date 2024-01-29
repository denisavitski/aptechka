var o = (r, t, e) => {
  if (!t.has(r))
    throw TypeError("Cannot " + e);
};
var s = (r, t, e) => (o(r, t, "read from private field"), e ? e.call(r) : t.get(r)), l = (r, t, e) => {
  if (t.has(r))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(r) : t.set(r, e);
};
var a, n;
class u {
  constructor() {
    l(this, a, /* @__PURE__ */ new Set());
    l(this, n, /* @__PURE__ */ new WeakMap());
  }
  register(t) {
    s(this, n).set(t, {
      axis: "y",
      value: 0
    }), s(this, a).add(t);
  }
  unregister(t) {
    s(this, n).delete(t), s(this, a).delete(t);
  }
  update(t, e, h) {
    const i = s(this, n).get(t);
    i.axis = e, i.value = h;
  }
  hasEntry(t) {
    return s(this, n).has(t);
  }
  getEntry(t) {
    return s(this, n).get(t);
  }
  getClosest(t) {
    let e = t.parentElement;
    for (; e && !this.hasEntry(e); )
      e = e.parentElement;
    if (e && e !== t) {
      const h = this.getEntry(e);
      return h || this.getClosest(e);
    }
    return null;
  }
  getAll(t) {
    const e = Array.from(s(this, a)).filter((i) => i !== t && i.contains(t)), h = [];
    return e.forEach((i) => {
      s(this, n).has(i) && h.push(s(this, n).get(i));
    }), h;
  }
}
a = new WeakMap(), n = new WeakMap();
const g = new u();
export {
  g as scrollEnties
};
