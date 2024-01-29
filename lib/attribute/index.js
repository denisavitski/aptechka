var f = (e, s, t) => {
  if (!s.has(e))
    throw TypeError("Cannot " + t);
};
var i = (e, s, t) => (f(e, s, "read from private field"), t ? t.call(e) : s.get(e)), a = (e, s, t) => {
  if (s.has(e))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(e) : s.set(e, t);
}, m = (e, s, t, b) => (f(e, s, "write to private field"), b ? b.call(e, t) : s.set(e, t), t);
var p = (e, s, t) => (f(e, s, "access private method"), t);
import { S as A } from "../Store-2hWEUGTj.js";
import { p as S } from "../attributes-w0u-KiIb.js";
import { i as l } from "../browser-S4eq8AeN.js";
import { g as w } from "../dom-bHEwc_xV.js";
var r, o, u, n, v;
class M extends A {
  constructor(t, b, d, g) {
    super(d, g);
    a(this, n);
    a(this, r, null);
    a(this, o, void 0);
    a(this, u, null);
    m(this, o, b), this.subscribe((c) => {
      var h;
      (h = i(this, r)) == null || h.setAttribute(i(this, o), c.current.toString());
    }), l && (m(this, r, w(t)), m(this, u, new MutationObserver((c) => {
      c.forEach((h) => {
        h.type === "attributes" && h.attributeName === i(this, o) && p(this, n, v).call(this);
      });
    })));
  }
  unobserve() {
    l && i(this, u).disconnect();
  }
  observe() {
    l && i(this, r) && (i(this, u).observe(i(this, r), {
      attributes: !0
    }), p(this, n, v).call(this));
  }
}
r = new WeakMap(), o = new WeakMap(), u = new WeakMap(), n = new WeakSet(), v = function() {
  const t = i(this, r).getAttribute(i(this, o));
  t != null && (this.current = S(t));
};
export {
  M as Attribute
};
