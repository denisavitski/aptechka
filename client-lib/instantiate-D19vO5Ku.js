var _ = Object.defineProperty, F = Object.defineProperties;
var M = Object.getOwnPropertyDescriptors;
var A = Object.getOwnPropertySymbols;
var R = Object.prototype.hasOwnProperty, D = Object.prototype.propertyIsEnumerable;
var L = (n, e, l) => e in n ? _(n, e, { enumerable: !0, configurable: !0, writable: !0, value: l }) : n[e] = l, r = (n, e) => {
  for (var l in e || (e = {}))
    R.call(e, l) && L(n, l, e[l]);
  if (A)
    for (var l of A(e))
      D.call(e, l) && L(n, l, e[l]);
  return n;
}, p = (n, e) => F(n, M(e));
var H = (n, e, l) => {
  if (!e.has(n))
    throw TypeError("Cannot " + l);
};
var o = (n, e, l) => (H(n, e, "read from private field"), l ? l.call(n) : e.get(n)), i = (n, e, l) => {
  if (e.has(n))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(n) : e.set(n, l);
};
import { E as k } from "./ElementConstructor-rValMo8f.js";
import { i as I } from "./object-D6MVWB4l.js";
import { c as K } from "./string-f0Dnk0L1.js";
import { c as u, n as w, a as y } from "./globals-DMjysUXI.js";
import "./Store-Qr3SNOSf.js";
import "./ticker/index.js";
var v, t, d, m, f;
class $ extends HTMLElement {
  constructor(l) {
    var h;
    super();
    i(this, v, /* @__PURE__ */ new Set());
    i(this, t, /* @__PURE__ */ new Set());
    i(this, d, /* @__PURE__ */ new Map());
    i(this, m, () => {
      y.value.unshift(o(this, d));
    });
    i(this, f, () => {
      y.value = y.value.filter(
        (l) => l !== o(this, d)
      );
    });
    const s = u.value;
    u.value = this, o(this, m).call(this);
    const C = l == null ? void 0 : l.tag(p(r({}, l.attributes), {
      this: this
    })), E = (h = w.value) != null && h.lightChildren ? "lightChildren" : "children";
    new k(this, p(r({}, w.value), {
      [E]: C
    })), u.value = s, w.value = null, o(this, f).call(this);
  }
  addConnectCallback(l) {
    o(this, v).add(l);
  }
  addDisconnectCallback(l) {
    o(this, t).add(l);
  }
  createContext(l, s) {
    o(this, d).set(l, s);
  }
  connectedCallback() {
    u.value = this, o(this, v).forEach((l) => {
      const s = l(this);
      s && o(this, t).add(s);
    }), u.value = null, this.addEventListener("beforeChildrenChange", o(this, m)), this.addEventListener("afterChildrenChange", o(this, f));
  }
  disconnectedCallback() {
    o(this, t).forEach((l) => {
      l(this);
    }), this.removeEventListener("beforeChildrenChange", o(this, m)), this.removeEventListener("afterChildrenChange", o(this, f));
  }
}
v = new WeakMap(), t = new WeakMap(), d = new WeakMap(), m = new WeakMap(), f = new WeakMap();
function j(n, e, ...l) {
  var h;
  l = l.flat().filter((c) => c != null);
  const s = [], C = [];
  e = e || {}, s.push(...l.reverse());
  const E = n === "instance";
  if (E && e.from && (n = e.from, e == null || delete e.from), typeof n == "function")
    if (E) {
      let c = null;
      return I(n) ? c = new n() : c = n(), delete e.children, () => new k(c, e).node;
    } else {
      if (e.children = s.reverse(), n === g)
        return g(e.children);
      const c = {
        noCustomElement: n.noCustomElement,
        onlyRegister: e.__register
      };
      if (e == null || delete e.__register, c.noCustomElement) {
        const T = n(r({}, e));
        return () => T;
      }
      const x = `e-${K(n.name)}`;
      let a = customElements.get(x);
      return a || (a = (h = class extends $ {
        constructor(S) {
          super(
            c.onlyRegister ? {
              tag: n,
              attributes: e
            } : S
          );
        }
      }, h.formAssociated = n.formAssociated, h), customElements.define(x, a)), () => c.onlyRegister ? a : new a({ tag: n, attributes: e });
    }
  for (; s.length; ) {
    const c = s.pop();
    Array.isArray(c) ? s.push(...c) : c != null && C.push(c);
  }
  if (n === "component") {
    const c = g(C);
    return w.value = e, c.node;
  } else {
    const c = e != null && e.lightChildren ? "lightChildren" : "children";
    return e == null || delete e.children, n ? new k(n, p(r({}, e), {
      [c]: C
    })) : null;
  }
}
function g(n) {
  return new k(document.createDocumentFragment(), {
    children: n
  });
}
function P(n, e) {
  const l = e == null ? void 0 : e.children, s = e == null ? void 0 : e.attributes;
  return (/* @__PURE__ */ j(n, r({}, s), l))();
}
export {
  g as F,
  j as h,
  P as i
};
