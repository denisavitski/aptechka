var m = Object.defineProperty;
var u = Object.getOwnPropertySymbols;
var p = Object.prototype.hasOwnProperty, w = Object.prototype.propertyIsEnumerable;
var f = (e, t, o) => t in e ? m(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o, i = (e, t) => {
  for (var o in t || (t = {}))
    p.call(t, o) && f(e, o, t[o]);
  if (u)
    for (var o of u(t))
      w.call(t, o) && f(e, o, t[o]);
  return e;
};
import { _ as q, o as v } from "../../createStore-DncUX-yj.js";
import { o as d } from "../../onConnect-FWEekrNj.js";
import { w as r } from "../../withCurrentComponent-Cd8KOtNf.js";
import "../../Store-JOKrNVEr.js";
import { aC as y } from "../../tags-C2jg1zYB.js";
import { c as l } from "../../createStylesheet-CD11E4C8.js";
function E(e, t) {
  d((o) => {
    const n = o.findContext(e);
    if (!n) {
      console.warn(o, `Context "${e}" not found`);
      return;
    }
    return t(n);
  });
}
function H(e, t) {
  r((o) => {
    o.createContext(e, t);
  });
}
function I() {
  return r((e) => e.attachInternals());
}
function L(e) {
  return r((t) => t.attachShadow(i({ mode: "open" }, e)));
}
function M(e) {
  r((t) => {
    t.shadowRoot && t.shadowRoot.adoptedStyleSheets.push(l(e));
  }), d((t) => {
    if (t.shadowRoot)
      return;
    const o = t.getRootNode();
    if (o === document) {
      const n = y(e).node;
      if (![...document.head.querySelectorAll("style")].find((a) => a.outerHTML === n.outerHTML))
        return document.head.appendChild(n), () => {
          n.remove();
        };
    } else if (o instanceof ShadowRoot) {
      const n = l(e);
      o.adoptedStyleSheets.filter((s) => {
        const a = Array.from(s.cssRules);
        Array.from(n.cssRules).filter(
          (c) => !a.find(
            (h) => h.cssText === c.cssText
          )
        ).forEach((c) => {
          s.insertRule(c.cssText);
        });
      });
    }
  });
}
export {
  q as _createStore,
  I as attachInternals,
  L as attachShadow,
  M as attachStylesheet,
  H as createContext,
  d as onConnect,
  E as onContext,
  v as onDisconnect,
  r as withCurrentComponent
};
