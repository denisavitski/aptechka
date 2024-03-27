var _ = Object.defineProperty, g = Object.defineProperties;
var w = Object.getOwnPropertyDescriptors;
var s = Object.getOwnPropertySymbols;
var x = Object.prototype.hasOwnProperty, F = Object.prototype.propertyIsEnumerable;
var C = (e, n, o) => n in e ? _(e, n, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[n] = o, h = (e, n) => {
  for (var o in n || (n = {}))
    x.call(n, o) && C(e, o, n[o]);
  if (s)
    for (var o of s(n))
      F.call(n, o) && C(e, o, n[o]);
  return e;
}, y = (e, n) => g(e, w(n));
import { E } from "./ElementConstructor-CvNdPKJy.js";
import { c as T } from "./string-3lAkpJJP.js";
import { C as u, n as v } from "./ComponentElement-B8zjY3Dh.js";
function i(e) {
  const n = Array.isArray(e) ? e : [e];
  let o = [];
  return n.forEach((r) => {
    if (typeof r == "function") {
      const l = r();
      o = [...o, ...i(l)];
    } else
      o.push(r);
  }), o;
}
function D(e, n, ...o) {
  var m;
  if (typeof e == "function") {
    if (e === d)
      return d(o);
    const c = n == null ? void 0 : n.__register;
    n == null || delete n.__register;
    const p = `c-${T(e.name)}`;
    let f = customElements.get(p);
    return f || (f = (m = class extends u {
      constructor(A) {
        super(
          c ? {
            tag: e,
            attributes: n,
            children: o
          } : A
        );
      }
    }, m.formAssociated = e.formAssociated, m), customElements.define(p, f)), c ? f : () => new f({ tag: e, attributes: n, children: o });
  }
  const r = o.map((c) => i(c)).flat();
  let l = null;
  if (e === "component")
    n == null || delete n.lightChildren, l = d(r), v.value = n;
  else {
    const c = n != null && n.lightChildren ? "lightChildren" : "children";
    n == null || delete n.children, l = new E(e, y(h({}, n), {
      [c]: r
    }));
  }
  return l.node;
}
function d(e) {
  return new E(document.createDocumentFragment(), {
    children: e
  });
}
function q(e, n = null, ...o) {
  return D(e, n, ...o)();
}
export {
  d as F,
  D as h,
  q as i
};
