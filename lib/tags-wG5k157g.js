var Te = Object.defineProperty, Ae = Object.defineProperties;
var xe = Object.getOwnPropertyDescriptors;
var le = Object.getOwnPropertySymbols;
var Me = Object.prototype.hasOwnProperty, De = Object.prototype.propertyIsEnumerable;
var de = (e, n, s) => n in e ? Te(e, n, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[n] = s, _ = (e, n) => {
  for (var s in n || (n = {}))
    Me.call(n, s) && de(e, s, n[s]);
  if (le)
    for (var s of le(n))
      De.call(n, s) && de(e, s, n[s]);
  return e;
}, he = (e, n) => Ae(e, xe(n));
var O = (e, n, s) => {
  if (!n.has(e))
    throw TypeError("Cannot " + s);
};
var r = (e, n, s) => (O(e, n, "read from private field"), s ? s.call(e) : n.get(e)), c = (e, n, s) => {
  if (n.has(e))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(e) : n.set(e, s);
}, g = (e, n, s, i) => (O(e, n, "write to private field"), i ? i.call(e, s) : n.set(e, s), s);
var u = (e, n, s) => (O(e, n, "access private method"), s);
import { S as y } from "./Store-Qr3SNOSf.js";
import { i as we } from "./browser-0zX67oeU.js";
import { i as me } from "./object-D6MVWB4l.js";
import { c as pe, u as Fe } from "./string-f0Dnk0L1.js";
import { connector as qe } from "./connector/index.js";
const He = /* @__PURE__ */ new Set([
  // 'a', 'style', 'title', 'script',
  "animate",
  "animateMotion",
  "animateTransform",
  "circle",
  "clipPath",
  "defs",
  "desc",
  "ellipse",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "filter",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "listener",
  "marker",
  "mask",
  "metadata",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "set",
  "solidColor",
  "stop",
  "svg",
  "switch",
  "symbol",
  "text",
  "textPath",
  "title",
  "tspan",
  "view",
  "use"
]);
var o, w, d, v, m, p, R, be, B, ge, G, ye, k, j, L, ee, V, Ee, W, Ce, $, Se, z, Ne, T, ne, A, te, J, ve, x, se, M, ie, I, ke, D, re, S, P, F, ae, q, oe, H, ue, U, Y;
const K = class K {
  constructor(...n) {
    c(this, R);
    c(this, B);
    c(this, G);
    c(this, k);
    c(this, L);
    c(this, V);
    c(this, W);
    c(this, $);
    c(this, z);
    c(this, T);
    c(this, A);
    c(this, J);
    c(this, x);
    c(this, M);
    c(this, I);
    c(this, D);
    c(this, S);
    c(this, F);
    c(this, q);
    c(this, H);
    c(this, o, null);
    c(this, w, /* @__PURE__ */ new Set());
    c(this, d, /* @__PURE__ */ new Set());
    c(this, v, void 0);
    c(this, m, void 0);
    c(this, p, void 0);
    c(this, U, (n) => {
      r(this, w).forEach((s) => {
        s(n);
      }), r(this, w).clear();
    });
    c(this, Y, (n, s) => {
      r(this, d).forEach((i) => {
        i(n, s);
      }), r(this, d).clear(), u(this, M, ie).call(this);
    });
    if (we) {
      const s = n[0], i = n[1];
      g(this, o, u(this, R, be).call(this, s, i == null ? void 0 : i.forceSvg)), u(this, G, ye).call(this, i);
    }
  }
  get node() {
    return r(this, o);
  }
  set node(n) {
    var s;
    u(this, M, ie).call(this), g(this, o, n), (s = r(this, v)) == null || s.call(this), r(this, o) instanceof Element && g(this, m, [
      ...r(this, o).querySelectorAll("store-root")
    ]), u(this, x, se).call(this), u(this, k, j).call(this);
  }
};
o = new WeakMap(), w = new WeakMap(), d = new WeakMap(), v = new WeakMap(), m = new WeakMap(), p = new WeakMap(), R = new WeakSet(), be = function(n, s) {
  let i = null;
  if (n instanceof Node)
    i = n;
  else if (typeof n == "string")
    if (!n.includes("<") && n.includes("-"))
      i = new (customElements.get(n))();
    else if (n.includes("<")) {
      const a = document.createElement("div");
      a.innerHTML = n, i = a.firstElementChild;
    } else
      He.has(n) || s ? i = document.createElementNS(
        "http://www.w3.org/2000/svg",
        n
      ) : i = document.createElement(n);
  else
    i = document.createElement("div");
  return i;
}, B = new WeakSet(), ge = function(n) {
  return n instanceof HTMLElement || n instanceof SVGElement;
}, G = new WeakSet(), ye = function(n) {
  if (!n)
    return;
  const s = u(this, B, ge).call(this, r(this, o)), i = n.ref;
  delete n.ref, n != null && n.onConnect && (r(this, w).add(n.onConnect), delete n.onConnect), n != null && n.onDisconnect && (r(this, d).add(n.onDisconnect), delete n.onDisconnect);
  let a, f;
  for (const l in n) {
    const h = n[l];
    l === "class" && s ? u(this, L, ee).call(this, h) : l === "style" && s ? u(this, $, Se).call(this, h) : l === "lightChildren" ? u(this, S, P).call(this, r(this, o), h) : l === "children" ? u(this, S, P).call(this, r(this, o) instanceof Element ? r(this, o).shadowRoot || r(this, o) : r(this, o), h) : l === "connectedClass" ? r(this, w).add(() => {
      requestAnimationFrame(() => {
        r(this, o).classList.add(
          typeof h == "boolean" ? "connected" : h
        );
      });
    }) : l.startsWith("on") ? (f || (f = {}), f[l] = h) : (a || (a = {}), a[l] = h);
  }
  u(this, I, ke).call(this, a), u(this, J, ve).call(this, f), i && (typeof i == "function" ? i(r(this, o)) : i.current = r(this, o)), u(this, k, j).call(this);
}, k = new WeakSet(), j = function() {
  if (we && (r(this, d).size || r(this, w).size)) {
    const n = r(this, o) instanceof DocumentFragment ? r(this, o).firstChild : r(this, o);
    g(this, v, qe.subscribe(
      n,
      {
        connectCallback: r(this, U),
        disconnectCallback: r(this, Y),
        unsubscribeAfterDisconnect: !0,
        maxWaitSec: 20
      }
    ));
  }
}, L = new WeakSet(), ee = function(n) {
  if (n) {
    if (typeof n == "string")
      r(this, o).classList.add(n);
    else if (Array.isArray(n))
      n.forEach((s) => {
        s && u(this, L, ee).call(this, s);
      });
    else if (typeof n == "object")
      if (n instanceof y)
        u(this, V, Ee).call(this, n);
      else
        for (const s in n) {
          const i = n[s];
          i instanceof y ? u(this, W, Ce).call(this, s, i) : i ? r(this, o).classList.add(s) : r(this, o).classList.remove(s);
        }
  } else
    return;
}, V = new WeakSet(), Ee = function(n) {
  r(this, d).add(
    n.subscribe(({ current: s, previous: i }) => {
      i && [i].flat().forEach((a) => {
        a && r(this, o).classList.remove(a);
      }), s && [s].flat().forEach((a) => {
        a && r(this, o).classList.add(a);
      });
    })
  );
}, W = new WeakSet(), Ce = function(n, s) {
  r(this, d).add(
    s.subscribe(({ current: i }) => {
      i ? r(this, o).classList.add(n) : r(this, o).classList.remove(n);
    })
  );
}, $ = new WeakSet(), Se = function(n) {
  if (!n)
    return;
  r(this, o).tagName === "style" || r(this, o).tagName === "STYLE" ? u(this, T, ne).call(this, n) : u(this, z, Ne).call(this, n);
}, z = new WeakSet(), Ne = function(n) {
  for (const s in n) {
    const i = s, a = n[i];
    a instanceof y ? r(this, d).add(
      a.subscribe(({ current: f }) => {
        u(this, A, te).call(this, i, f);
      })
    ) : u(this, A, te).call(this, i, a);
  }
}, T = new WeakSet(), ne = function(n) {
  for (const s in n) {
    const i = n[s];
    if (typeof i == "object" && !(i instanceof y))
      r(this, o).appendChild(
        document.createTextNode(`${s} {`)
      ), u(this, T, ne).call(this, i), r(this, o).appendChild(document.createTextNode("}"));
    else if (i instanceof y) {
      const a = document.createTextNode("");
      r(this, d).add(
        i.subscribe((f) => {
          f.current ? a.nodeValue = `${pe(s)}: ${f.current};` : a.nodeValue = "";
        })
      ), r(this, o).appendChild(a);
    } else
      r(this, o).appendChild(
        document.createTextNode(`${pe(s)}: ${i};`)
      );
  }
}, A = new WeakSet(), te = function(n, s) {
  n.includes("--") ? s ? r(this, o).style.setProperty(n, s.toString()) : r(this, o).style.removeProperty(n) : s ? r(this, o).style[n] = s.toString() : r(this, o).style[n] = "";
}, J = new WeakSet(), ve = function(n) {
  if (n) {
    r(this, p) || g(this, p, []);
    for (const s in n) {
      const i = s, a = Fe(
        i.split("on").slice(1).join("on")
      ), f = n[i];
      typeof f == "object" ? r(this, p).push({
        name: a,
        callback: f.callback,
        options: f.options
      }) : typeof f == "function" && r(this, p).push({
        name: a,
        callback: f
      });
    }
    u(this, x, se).call(this);
  }
}, x = new WeakSet(), se = function() {
  var n;
  (n = r(this, p)) == null || n.forEach((s) => {
    r(this, o).addEventListener(
      s.name,
      s.callback,
      s.options
    );
  });
}, M = new WeakSet(), ie = function() {
  var n;
  (n = r(this, p)) == null || n.forEach((s) => {
    r(this, o).removeEventListener(
      s.name,
      s.callback,
      s.options
    );
  });
}, I = new WeakSet(), ke = function(n) {
  for (const s in n) {
    const i = n[s];
    i instanceof y ? r(this, d).add(
      i.subscribe(({ current: a }) => {
        u(this, D, re).call(this, s, a);
      })
    ) : u(this, D, re).call(this, s, i);
  }
}, D = new WeakSet(), re = function(n, s) {
  var a, f;
  const i = r(this, o);
  if (n in i && !((f = (a = i.constructor) == null ? void 0 : a.observedAttributes) != null && f.includes(n)))
    s != null && (i[n] = s.toString());
  else if (s != null) {
    const l = s.toString();
    n.includes("xlink") ? i.setAttributeNS("http://www.w3.org/1999/xlink", n, l) : i.setAttribute(n, l);
  }
}, S = new WeakSet(), P = function(n, s) {
  s && (s = [s].flat(), s.forEach((i) => {
    if (i instanceof y) {
      const a = document.createElement("div");
      a.style.display = "contents", n.appendChild(a), r(this, m) || g(this, m, []);
      const f = r(this, m).length;
      a.setAttribute("store-root", ""), r(this, m).push(a), r(this, d).add(
        i.subscribe(({ current: l, previous: h }) => {
          const E = r(this, m)[f];
          E.dispatchEvent(
            new CustomEvent("beforeChildrenChange", {
              bubbles: !0,
              composed: !0
            })
          );
          const Q = Array.from(E.childNodes), ce = Array.isArray(l) ? l : [l], Le = Array.isArray(h) ? h : [h], fe = [], X = [];
          Q.length && Le.forEach((b, N) => {
            ce.includes(b) ? X.push(b) : fe.push(Q[N]);
          }), ce.forEach((b, N) => {
            if (X[N] != null) {
              if (b !== X[N]) {
                const C = u(this, q, oe).call(this, b), Z = Q[N];
                C instanceof Node && !Z.isEqualNode(C) ? E.replaceChild(C, Z) : E.removeChild(Z);
              }
            } else {
              const C = u(this, q, oe).call(this, b);
              C instanceof Node && a.appendChild(C);
            }
          }), fe.forEach((b) => {
            E.removeChild(b);
          }), E.dispatchEvent(
            new CustomEvent("afterChildrenChange", {
              bubbles: !0,
              composed: !0
            })
          );
        })
      );
    } else if (i instanceof K)
      u(this, F, ae).call(this, n, i.node);
    else if (i instanceof Function)
      u(this, S, P).call(this, n, me(i) ? new i() : i());
    else {
      const a = u(this, H, ue).call(this, i);
      a instanceof Node && u(this, F, ae).call(this, n, a);
    }
  }));
}, F = new WeakSet(), ae = function(n, s) {
  !(n instanceof ShadowRoot) && s instanceof HTMLElement && s.tagName === "STYLE" ? (r(this, w).add(() => {
    [...document.head.querySelectorAll("style")].find((a) => a.outerHTML === s.outerHTML) || document.head.appendChild(s);
  }), r(this, d).add(() => {
    s.remove();
  })) : n.appendChild(s);
}, q = new WeakSet(), oe = function(n) {
  return n instanceof K ? n.node : typeof n == "function" ? me(n) ? new n() : n() : u(this, H, ue).call(this, n);
}, H = new WeakSet(), ue = function(n) {
  if (n instanceof Node)
    return n;
  if (n != null) {
    const s = String(n);
    if (s.trim().startsWith("<") && s.trim().endsWith(">")) {
      const i = document.createElement("div");
      return i.innerHTML = s, i.firstElementChild;
    } else
      return document.createTextNode(s);
  } else
    return;
}, U = new WeakMap(), Y = new WeakMap();
let t = K;
function $e(...e) {
  return new t(...e);
}
function ze(e) {
  return new t("a", e);
}
function Je(e) {
  return new t("abbr", e);
}
function Ie(e) {
  return new t("address", e);
}
function Ue(e) {
  return new t("area", e);
}
function Ye(e) {
  return new t("article", e);
}
function Ke(e) {
  return new t("aside", e);
}
function Qe(e) {
  return new t("audio", e);
}
function Xe(e) {
  return new t("b", e);
}
function Ze(e) {
  return new t("base", e);
}
function _e(e) {
  return new t("bdi", e);
}
function Oe(e) {
  return new t("bdo", e);
}
function je(e) {
  return new t("blockquote", e);
}
function en(e) {
  return new t("body", e);
}
function nn(e) {
  return new t("br", e);
}
function tn(e) {
  return new t("button", e);
}
function sn(e) {
  return new t("canvas", e);
}
function rn(e) {
  return new t("caption", e);
}
function an(e) {
  return new t("cite", e);
}
function on(e) {
  return new t("code", e);
}
function un(e) {
  return new t("col", e);
}
function cn(e) {
  return new t("colgroup", e);
}
function fn(e) {
  return new t("data", e);
}
function ln(e) {
  return new t("datalist", e);
}
function dn(e) {
  return new t("dd", e);
}
function hn(e) {
  return new t("del", e);
}
function wn(e) {
  return new t("details", e);
}
function mn(e) {
  return new t("dfn", e);
}
function pn(e) {
  return new t("dialog", e);
}
function bn(e) {
  return new t("div", e);
}
function gn(e) {
  return new t("dl", e);
}
function yn(e) {
  return new t("dt", e);
}
function En(e) {
  return new t("em", e);
}
function Cn(e) {
  return new t("embed", e);
}
function Sn(e) {
  return new t("fieldset", e);
}
function Nn(e) {
  return new t("figcaption", e);
}
function vn(e) {
  return new t("figure", e);
}
function kn(e) {
  return new t("footer", e);
}
function Ln(e) {
  return new t("form", e);
}
function Tn(e) {
  return new t("h1", e);
}
function An(e) {
  return new t("h2", e);
}
function xn(e) {
  return new t("h3", e);
}
function Mn(e) {
  return new t("h4", e);
}
function Dn(e) {
  return new t("h5", e);
}
function Fn(e) {
  return new t("h6", e);
}
function qn(e) {
  return new t("head", e);
}
function Hn(e) {
  return new t("header", e);
}
function Pn(e) {
  return new t("hgroup", e);
}
function Rn(e) {
  return new t("hr", e);
}
function Bn(e) {
  return new t("html", e);
}
function Gn(e) {
  return new t("i", e);
}
function Vn(e) {
  return new t("iframe", e);
}
function Wn(e) {
  return new t("img", e);
}
function $n(e) {
  return new t("input", e);
}
function zn(e) {
  return new t("ins", e);
}
function Jn(e) {
  return new t("kbd", e);
}
function In(e) {
  return new t("label", e);
}
function Un(e) {
  return new t("legend", e);
}
function Yn(e) {
  return new t("li", e);
}
function Kn(e) {
  return new t("link", e);
}
function Qn(e) {
  return new t("main", e);
}
function Xn(e) {
  return new t("map", e);
}
function Zn(e) {
  return new t("mark", e);
}
function _n(e) {
  return new t("menu", e);
}
function On(e) {
  return new t("meta", e);
}
function jn(e) {
  return new t("meter", e);
}
function et(e) {
  return new t("nav", e);
}
function nt(e) {
  return new t("noscript", e);
}
function tt(e) {
  return new t("object", e);
}
function st(e) {
  return new t("ol", e);
}
function it(e) {
  return new t("optgroup", e);
}
function rt(e) {
  return new t("option", e);
}
function at(e) {
  return new t("output", e);
}
function ot(e) {
  return new t("p", e);
}
function ut(e) {
  return new t("picture", e);
}
function ct(e) {
  return new t("pre", e);
}
function ft(e) {
  return new t("progress", e);
}
function lt(e) {
  return new t("q", e);
}
function dt(e) {
  return new t("rp", e);
}
function ht(e) {
  return new t("rt", e);
}
function wt(e) {
  return new t("ruby", e);
}
function mt(e) {
  return new t("s", e);
}
function pt(e) {
  return new t("samp", e);
}
function bt(e) {
  return new t("script", e);
}
function gt(e) {
  return new t("search", e);
}
function yt(e) {
  return new t("section", e);
}
function Et(e) {
  return new t("select", e);
}
function Ct(e) {
  return new t("slot", e);
}
function St(e) {
  return new t("small", e);
}
function Nt(e) {
  return new t("source", e);
}
function vt(e) {
  return new t("span", e);
}
function kt(e) {
  return new t("strong", e);
}
function Lt(e) {
  return new t("style", {
    style: e
  });
}
function Tt(e) {
  return new t("sub", e);
}
function At(e) {
  return new t("summary", e);
}
function xt(e) {
  return new t("sup", e);
}
function Mt(e) {
  return new t("table", e);
}
function Dt(e) {
  return new t("tbody", e);
}
function Ft(e) {
  return new t("td", e);
}
function qt(e) {
  return new t("template", e);
}
function Ht(e) {
  return new t("textarea", e);
}
function Pt(e) {
  return new t("tfoot", e);
}
function Rt(e) {
  return new t("th", e);
}
function Bt(e) {
  return new t("thead", e);
}
function Gt(e) {
  return new t("time", e);
}
function Vt(e) {
  return new t("title", e);
}
function Wt(e) {
  return new t("tr", e);
}
function $t(e) {
  return new t("track", e);
}
function zt(e) {
  return new t("u", e);
}
function Jt(e) {
  return new t("ul", e);
}
function It(e) {
  return new t("var", e);
}
function Ut(e) {
  return new t("video", e);
}
function Yt(e) {
  return new t("wbr", e);
}
function Kt(e) {
  return new t(document.createDocumentFragment(), e);
}
function Qt(e) {
  return new t(document.createTextNode(""), e);
}
function Xt(e) {
  return new t("div", he(_({}, e), {
    style: _({
      display: "contents"
    }, e == null ? void 0 : e.style)
  }));
}
export {
  Wn as $,
  wn as A,
  mn as B,
  pn as C,
  bn as D,
  t as E,
  gn as F,
  yn as G,
  En as H,
  Cn as I,
  Sn as J,
  Nn as K,
  vn as L,
  kn as M,
  Ln as N,
  Tn as O,
  An as P,
  xn as Q,
  Mn as R,
  Dn as S,
  Fn as T,
  qn as U,
  Hn as V,
  Pn as W,
  Rn as X,
  Bn as Y,
  Gn as Z,
  Vn as _,
  ze as a,
  $n as a0,
  zn as a1,
  Jn as a2,
  In as a3,
  Un as a4,
  Yn as a5,
  Kn as a6,
  Qn as a7,
  Xn as a8,
  Zn as a9,
  Nt as aA,
  vt as aB,
  kt as aC,
  Lt as aD,
  Tt as aE,
  At as aF,
  xt as aG,
  Mt as aH,
  Dt as aI,
  Ft as aJ,
  qt as aK,
  Ht as aL,
  Pt as aM,
  Rt as aN,
  Bt as aO,
  Gt as aP,
  Vt as aQ,
  Wt as aR,
  $t as aS,
  zt as aT,
  Jt as aU,
  It as aV,
  Ut as aW,
  Yt as aX,
  Kt as aY,
  Qt as aZ,
  Xt as a_,
  _n as aa,
  On as ab,
  jn as ac,
  et as ad,
  nt as ae,
  tt as af,
  st as ag,
  it as ah,
  rt as ai,
  at as aj,
  ot as ak,
  ut as al,
  ct as am,
  ft as an,
  lt as ao,
  dt as ap,
  ht as aq,
  wt as ar,
  mt as as,
  pt as at,
  bt as au,
  gt as av,
  yt as aw,
  Et as ax,
  Ct as ay,
  St as az,
  Je as b,
  Ie as c,
  Ue as d,
  $e as e,
  Ye as f,
  Ke as g,
  Qe as h,
  Xe as i,
  Ze as j,
  _e as k,
  Oe as l,
  je as m,
  en as n,
  nn as o,
  tn as p,
  sn as q,
  rn as r,
  an as s,
  on as t,
  un as u,
  cn as v,
  fn as w,
  ln as x,
  dn as y,
  hn as z
};
