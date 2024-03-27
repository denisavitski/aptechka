var w = Object.defineProperty, v = Object.defineProperties;
var S = Object.getOwnPropertyDescriptors;
var E = Object.getOwnPropertySymbols;
var M = Object.prototype.hasOwnProperty, R = Object.prototype.propertyIsEnumerable;
var b = (e, n, t) => n in e ? w(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, C = (e, n) => {
  for (var t in n || (n = {}))
    M.call(n, t) && b(e, t, n[t]);
  if (E)
    for (var t of E(n))
      R.call(n, t) && b(e, t, n[t]);
  return e;
}, k = (e, n) => v(e, S(n));
var g = (e, n, t) => {
  if (!n.has(e))
    throw TypeError("Cannot " + t);
};
var l = (e, n, t) => (g(e, n, "read from private field"), t ? t.call(e) : n.get(e)), i = (e, n, t) => {
  if (n.has(e))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(e) : n.set(e, t);
};
var f = (e, n, t) => (g(e, n, "access private method"), t);
import { E as A } from "./ElementConstructor-CvNdPKJy.js";
let h = null;
const p = {
  value: null
};
var a, c, d, r, x;
class L extends HTMLElement {
  constructor(t) {
    super();
    i(this, r);
    i(this, a, /* @__PURE__ */ new Set());
    i(this, c, /* @__PURE__ */ new Set());
    i(this, d, /* @__PURE__ */ new Map());
    h = this;
    const o = t == null ? void 0 : t.tag(k(C({}, t.attributes), {
      children: t.children
    }));
    new A(this, C({
      children: o
    }, p.value)), h = null, p.value = null;
  }
  addConnectCallback(t) {
    l(this, a).add(t);
  }
  addDisconnectCallback(t) {
    l(this, c).add(t);
  }
  createContext(t, o) {
    l(this, d).set(t, o);
  }
  getContext(t) {
    return l(this, d).get(t);
  }
  findContext(t) {
    return f(this, r, x).call(this, t);
  }
  connectedCallback() {
    h = this, l(this, a).forEach((t) => {
      const o = t(this);
      o && l(this, c).add(o);
    }), h = null;
  }
  disconnectedCallback() {
    l(this, c).forEach((t) => {
      t(this);
    });
  }
}
a = new WeakMap(), c = new WeakMap(), d = new WeakMap(), r = new WeakSet(), x = function(t, o = this) {
  if (!o)
    return null;
  if (o && "findContext" in o) {
    const s = o.getContext(t);
    if (s)
      return s;
  }
  let u = null;
  if (o.parentElement)
    u = o.parentElement;
  else {
    const s = o.getRootNode();
    s instanceof ShadowRoot && (u = s.host);
  }
  return u ? f(this, r, x).call(this, t, u) : null;
};
export {
  L as C,
  h as c,
  p as n
};
