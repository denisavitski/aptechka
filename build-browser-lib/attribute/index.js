var l = (s, e, t) => {
  if (!e.has(s))
    throw TypeError("Cannot " + t);
};
var r = (s, e, t) => (l(s, e, "read from private field"), t ? t.call(s) : e.get(s)), h = (s, e, t) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, t);
}, o = (s, e, t, c) => (l(s, e, "write to private field"), c ? c.call(s, t) : e.set(s, t), t);
var p = (s, e, t) => (l(s, e, "access private method"), t);
import { S as g } from "../Store-JOKrNVEr.js";
import { p as A } from "../attributes-69we3byR.js";
import { i as y } from "../browser-0zX67oeU.js";
import { g as S } from "../dom-BY7JhTx5.js";
var i, u, b, n, v;
class B extends g {
  constructor(t, c, m, a) {
    super(m, a);
    h(this, n);
    h(this, i, null);
    h(this, u, void 0);
    h(this, b, null);
    o(this, u, c), y && (o(this, i, S(t)), o(this, b, new MutationObserver((f) => {
      f.forEach((d) => {
        d.type === "attributes" && d.attributeName === r(this, u) && p(this, n, v).call(this);
      });
    })), a != null && a.sync && this.subscribe((f) => {
      r(this, i).setAttribute(r(this, u), f.current.toString());
    }));
  }
  subscribe(t) {
    const c = !this.subscribers.size, m = super.subscribe(t);
    return c && (r(this, b).observe(r(this, i), {
      attributes: !0
    }), p(this, n, v).call(this)), m;
  }
  unsubscribe(t) {
    super.unsubscribe(t), this.subscribers.size || r(this, b).disconnect();
  }
  close() {
    super.close(), r(this, b).disconnect();
  }
}
i = new WeakMap(), u = new WeakMap(), b = new WeakMap(), n = new WeakSet(), v = function() {
  const t = r(this, i).getAttribute(r(this, u));
  t != null && (this.current = A(t));
};
export {
  B as Attribute
};
