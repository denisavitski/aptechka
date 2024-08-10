var m = (t, e, s) => {
  if (!e.has(t))
    throw TypeError("Cannot " + s);
};
var r = (t, e, s) => (m(t, e, "read from private field"), s ? s.call(t) : e.get(t)), h = (t, e, s) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, s);
}, a = (t, e, s, o) => (m(t, e, "write to private field"), o ? o.call(t, s) : e.set(t, s), s);
var v = (t, e, s) => (m(t, e, "access private method"), s);
import { S as g } from "../Store-Qr3SNOSf.js";
import { p as y } from "../attributes-69we3byR.js";
import { i as S } from "../browser-0zX67oeU.js";
import { a as w } from "../dom-P5QbAASX.js";
var i, u, c, b, n, p;
class M extends g {
  constructor(s, o, A, f) {
    super(A, f);
    h(this, n);
    h(this, i, null);
    h(this, u, void 0);
    h(this, c, null);
    h(this, b, !1);
    a(this, u, o), S && (a(this, i, w(s)), a(this, c, new MutationObserver((l) => {
      l.forEach((d) => {
        d.type === "attributes" && d.attributeName === r(this, u) && v(this, n, p).call(this);
      });
    })), f != null && f.sync && this.subscribe((l) => {
      r(this, i).setAttribute(r(this, u), l.current.toString());
    }));
  }
  subscribe(s) {
    return this.subscribers.size || this.observe(), super.subscribe(s);
  }
  unsubscribe(s) {
    super.unsubscribe(s), this.subscribers.size || this.unobserve();
  }
  observe() {
    r(this, b) || (a(this, b, !0), r(this, c).observe(r(this, i), {
      attributes: !0
    }), v(this, n, p).call(this));
  }
  unobserve() {
    r(this, b) && (a(this, b, !1), r(this, c).disconnect());
  }
  close() {
    super.close(), this.unobserve();
  }
}
i = new WeakMap(), u = new WeakMap(), c = new WeakMap(), b = new WeakMap(), n = new WeakSet(), p = function() {
  const s = r(this, i).getAttribute(r(this, u));
  s != null && (this.current = y(s));
};
export {
  M as Attribute
};
