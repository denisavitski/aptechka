var p = Object.defineProperty, y = Object.defineProperties;
var R = Object.getOwnPropertyDescriptors;
var i = Object.getOwnPropertySymbols;
var x = Object.prototype.hasOwnProperty, S = Object.prototype.propertyIsEnumerable;
var f = (t, e, n) => e in t ? p(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, l = (t, e) => {
  for (var n in e || (e = {}))
    x.call(e, n) && f(t, n, e[n]);
  if (i)
    for (var n of i(e))
      S.call(e, n) && f(t, n, e[n]);
  return t;
}, d = (t, e) => y(t, R(e));
import { i as C, h as g } from "../instantiate-D19vO5Ku.js";
import { F as V } from "../instantiate-D19vO5Ku.js";
import { c as a, a as w } from "../globals-DMjysUXI.js";
import "../Store-Qr3SNOSf.js";
import "../ticker/index.js";
import { o as v } from "../_createStore-D3qHYaSz.js";
import { _ as X } from "../_createStore-D3qHYaSz.js";
import { aC as E } from "../tags-D0kLlFdQ.js";
import { c as m } from "../createStylesheet-BrFGJ8Q7.js";
import { o as T } from "../onConnect-y5DrxJ9P.js";
function q(t, e) {
  ((e == null ? void 0 : e.containerElement) || document.body).appendChild(C(t, e));
}
function D(t, e = null, ...n) {
  return g(t, d(l({}, e), { __register: !0 }), ...n);
}
function z() {
  return a.value.attachInternals();
}
function B(t) {
  return a.value.attachShadow(l({ mode: "open" }, t));
}
function G(t) {
  a.value.shadowRoot && a.value.shadowRoot.adoptedStyleSheets.push(
    m(t)
  ), T((e) => {
    if (e.shadowRoot)
      return;
    const n = e.getRootNode();
    if (n === document) {
      const r = E(t).node;
      if (![...document.head.querySelectorAll("style")].find((o) => o.outerHTML === r.outerHTML))
        return document.head.appendChild(r), () => {
          r.remove();
        };
    } else if (n instanceof ShadowRoot) {
      const r = m(t), s = [];
      return n.adoptedStyleSheets.filter((o) => {
        const h = Array.from(o.cssRules);
        Array.from(r.cssRules).filter(
          (c) => !h.find(
            (u) => u.cssText === c.cssText
          )
        ).forEach((c) => {
          const u = o.insertRule(c.cssText);
          s.push(() => {
            o.deleteRule(u);
          });
        });
      }), () => {
        s.forEach((o) => o());
      };
    }
  });
}
function J(t) {
  const e = w.value.find(
    (n) => n.has(t)
  );
  if (e)
    return e.get(t);
}
function K(t, e) {
  a.value.createContext(t, e);
}
function O(t) {
  return {
    current: t
  };
}
function P(t, e) {
  const n = t.subscribe(e);
  v(() => {
    n();
  });
}
export {
  V as Fragment,
  X as _createStore,
  z as attachInternals,
  B as attachShadow,
  G as attachStylesheet,
  K as createContext,
  O as createRef,
  a as currentComponentElement,
  J as getContext,
  g as h,
  C as instantiate,
  T as onConnect,
  v as onDisconnect,
  P as onStoreChange,
  D as register,
  q as render
};
