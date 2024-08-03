var Z = (f, e, t) => {
  if (!e.has(f))
    throw TypeError("Cannot " + t);
};
var i = (f, e, t) => (Z(f, e, "read from private field"), t ? t.call(f) : e.get(f)), r = (f, e, t) => {
  if (e.has(f))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(f) : e.set(f, t);
}, E = (f, e, t, s) => (Z(f, e, "write to private field"), s ? s.call(f, t) : e.set(f, t), t);
var a = (f, e, t) => (Z(f, e, "access private method"), t);
import { S as p } from "./Store-Qr3SNOSf.js";
import { i as fe } from "./browser-0zX67oeU.js";
import { i as le } from "./object-D6MVWB4l.js";
import { c as he, u as we } from "./string-f0Dnk0L1.js";
import { connector as Le } from "./connector/index.js";
const Te = /* @__PURE__ */ new Set([
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
  "view"
]);
var o, m, l, w, u, g, R, me, B, ue, G, ge, L, _, T, O, $, ye, q, Ee, W, pe, z, Ce, A, j, v, ee, J, be, k, te, M, se, V, Se, x, ie, S, P, D, ne, F, oe, H, ae, I, U;
const Y = class Y {
  constructor(...e) {
    r(this, R);
    r(this, B);
    r(this, G);
    r(this, L);
    r(this, T);
    r(this, $);
    r(this, q);
    r(this, W);
    r(this, z);
    r(this, A);
    r(this, v);
    r(this, J);
    r(this, k);
    r(this, M);
    r(this, V);
    r(this, x);
    r(this, S);
    r(this, D);
    r(this, F);
    r(this, H);
    r(this, o, null);
    r(this, m, /* @__PURE__ */ new Set());
    r(this, l, /* @__PURE__ */ new Set());
    r(this, w, void 0);
    r(this, u, void 0);
    r(this, g, void 0);
    r(this, I, (e) => {
      i(this, m).forEach((t) => {
        t(e);
      }), i(this, m).clear();
    });
    r(this, U, (e, t) => {
      i(this, l).forEach((s) => {
        s(e, t);
      }), i(this, l).clear(), a(this, M, se).call(this);
    });
    if (fe) {
      const t = e[0], s = e[1];
      E(this, o, a(this, R, me).call(this, t, s == null ? void 0 : s.forceSvg)), a(this, G, ge).call(this, s);
    }
  }
  get node() {
    return i(this, o);
  }
  set node(e) {
    var t;
    a(this, M, se).call(this), E(this, o, e), (t = i(this, w)) == null || t.call(this), i(this, o) instanceof Element && E(this, u, [
      ...i(this, o).querySelectorAll("store-root")
    ]), a(this, k, te).call(this), a(this, L, _).call(this);
  }
};
o = new WeakMap(), m = new WeakMap(), l = new WeakMap(), w = new WeakMap(), u = new WeakMap(), g = new WeakMap(), R = new WeakSet(), me = function(e, t) {
  let s = null;
  if (e instanceof Node)
    s = e;
  else if (typeof e == "string")
    if (!e.includes("<") && e.includes("-"))
      s = new (customElements.get(e))();
    else if (e.includes("<")) {
      const n = document.createElement("div");
      n.innerHTML = e, s = n.firstElementChild;
    } else
      Te.has(e) || t ? s = document.createElementNS(
        "http://www.w3.org/2000/svg",
        e
      ) : s = document.createElement(e);
  else
    s = document.createElement("div");
  return s;
}, B = new WeakSet(), ue = function(e) {
  return e instanceof HTMLElement || e instanceof SVGElement;
}, G = new WeakSet(), ge = function(e) {
  if (!e)
    return;
  const t = a(this, B, ue).call(this, i(this, o)), s = e.ref;
  delete e.ref, e != null && e.onConnect && (i(this, m).add(e.onConnect), delete e.onConnect), e != null && e.onDisconnect && (i(this, l).add(e.onDisconnect), delete e.onDisconnect);
  let n, c;
  for (const h in e) {
    const d = e[h];
    h === "class" && t ? a(this, T, O).call(this, d) : h === "style" && t ? a(this, W, pe).call(this, d) : h === "lightChildren" ? a(this, S, P).call(this, i(this, o), d) : h === "children" ? a(this, S, P).call(this, i(this, o) instanceof Element ? i(this, o).shadowRoot || i(this, o) : i(this, o), d) : h === "connectedClass" ? i(this, m).add(() => {
      requestAnimationFrame(() => {
        i(this, o).classList.add(
          typeof d == "boolean" ? "connected" : d
        );
      });
    }) : h.startsWith("on") ? (c || (c = {}), c[h] = d) : (n || (n = {}), n[h] = d);
  }
  a(this, V, Se).call(this, n), a(this, J, be).call(this, c), s && (typeof s == "function" ? s(i(this, o)) : s.current = i(this, o)), a(this, L, _).call(this);
}, L = new WeakSet(), _ = function() {
  if (fe && (i(this, l).size || i(this, m).size)) {
    const e = i(this, o) instanceof DocumentFragment ? i(this, o).firstChild : i(this, o);
    E(this, w, Le.subscribe(
      e,
      {
        connectCallback: i(this, I),
        disconnectCallback: i(this, U),
        unsubscribeAfterDisconnect: !0,
        maxWaitSec: 20
      }
    ));
  }
}, T = new WeakSet(), O = function(e) {
  if (e) {
    if (typeof e == "string")
      i(this, o).classList.add(e);
    else if (Array.isArray(e))
      e.forEach((t) => {
        t && a(this, T, O).call(this, t);
      });
    else if (typeof e == "object")
      if (e instanceof p)
        a(this, $, ye).call(this, e);
      else
        for (const t in e) {
          const s = e[t];
          s instanceof p ? a(this, q, Ee).call(this, t, s) : s ? i(this, o).classList.add(t) : i(this, o).classList.remove(t);
        }
  } else
    return;
}, $ = new WeakSet(), ye = function(e) {
  i(this, l).add(
    e.subscribe(({ current: t, previous: s }) => {
      s && [s].flat().forEach((n) => {
        n && i(this, o).classList.remove(n);
      }), t && [t].flat().forEach((n) => {
        n && i(this, o).classList.add(n);
      });
    })
  );
}, q = new WeakSet(), Ee = function(e, t) {
  i(this, l).add(
    t.subscribe(({ current: s }) => {
      s ? i(this, o).classList.add(e) : i(this, o).classList.remove(e);
    })
  );
}, W = new WeakSet(), pe = function(e) {
  if (!e)
    return;
  i(this, o).tagName === "style" || i(this, o).tagName === "STYLE" ? a(this, A, j).call(this, e) : a(this, z, Ce).call(this, e);
}, z = new WeakSet(), Ce = function(e) {
  for (const t in e) {
    const s = t, n = e[s];
    n instanceof p ? i(this, l).add(
      n.subscribe(({ current: c }) => {
        a(this, v, ee).call(this, s, c);
      })
    ) : a(this, v, ee).call(this, s, n);
  }
}, A = new WeakSet(), j = function(e) {
  for (const t in e) {
    const s = e[t];
    if (typeof s == "object" && !(s instanceof p))
      i(this, o).appendChild(
        document.createTextNode(`${t} {`)
      ), a(this, A, j).call(this, s), i(this, o).appendChild(document.createTextNode("}"));
    else if (s instanceof p) {
      const n = document.createTextNode("");
      i(this, l).add(
        s.subscribe((c) => {
          c.current ? n.nodeValue = `${he(t)}: ${c.current};` : n.nodeValue = "";
        })
      ), i(this, o).appendChild(n);
    } else
      i(this, o).appendChild(
        document.createTextNode(`${he(t)}: ${s};`)
      );
  }
}, v = new WeakSet(), ee = function(e, t) {
  e.includes("--") ? t ? i(this, o).style.setProperty(e, t.toString()) : i(this, o).style.removeProperty(e) : t ? i(this, o).style[e] = t.toString() : i(this, o).style[e] = "";
}, J = new WeakSet(), be = function(e) {
  if (e) {
    i(this, g) || E(this, g, []);
    for (const t in e) {
      const s = t, n = we(
        s.split("on").slice(1).join("on")
      ), c = e[s];
      typeof c == "object" ? i(this, g).push({
        name: n,
        callback: c.callback,
        options: c.options
      }) : typeof c == "function" && i(this, g).push({
        name: n,
        callback: c
      });
    }
    a(this, k, te).call(this);
  }
}, k = new WeakSet(), te = function() {
  var e;
  (e = i(this, g)) == null || e.forEach((t) => {
    i(this, o).addEventListener(
      t.name,
      t.callback,
      t.options
    );
  });
}, M = new WeakSet(), se = function() {
  var e;
  (e = i(this, g)) == null || e.forEach((t) => {
    i(this, o).removeEventListener(
      t.name,
      t.callback,
      t.options
    );
  });
}, V = new WeakSet(), Se = function(e) {
  for (const t in e) {
    const s = e[t];
    s instanceof p ? i(this, l).add(
      s.subscribe(({ current: n }) => {
        a(this, x, ie).call(this, t, n);
      })
    ) : a(this, x, ie).call(this, t, s);
  }
}, x = new WeakSet(), ie = function(e, t) {
  var n, c;
  const s = i(this, o);
  e in s && !((c = (n = s.constructor) == null ? void 0 : n.observedAttributes) != null && c.includes(e)) ? t != null && (s[e] = t.toString()) : t != null && s.setAttribute(e, t.toString());
}, S = new WeakSet(), P = function(e, t) {
  t && (t = [t].flat(), t.forEach((s) => {
    if (s instanceof p) {
      const n = document.createElement("div");
      n.style.display = "contents", e.appendChild(n), i(this, u) || E(this, u, []);
      const c = i(this, u).length;
      n.setAttribute("store-root", ""), i(this, u).push(n), i(this, l).add(
        s.subscribe(({ current: h, previous: d }) => {
          const C = i(this, u)[c];
          C.dispatchEvent(
            new CustomEvent("beforeChildrenChange", {
              bubbles: !0,
              composed: !0
            })
          );
          const K = Array.from(C.childNodes), re = Array.isArray(h) ? h : [h], Ne = Array.isArray(d) ? d : [d], ce = [], Q = [];
          K.length && Ne.forEach((y, N) => {
            re.includes(y) ? Q.push(y) : ce.push(K[N]);
          }), re.forEach((y, N) => {
            if (Q[N] != null) {
              if (y !== Q[N]) {
                const b = a(this, F, oe).call(this, y), X = K[N];
                b instanceof Node && !X.isEqualNode(b) ? C.replaceChild(b, X) : C.removeChild(X);
              }
            } else {
              const b = a(this, F, oe).call(this, y);
              b instanceof Node && n.appendChild(b);
            }
          }), ce.forEach((y) => {
            C.removeChild(y);
          }), C.dispatchEvent(
            new CustomEvent("afterChildrenChange", {
              bubbles: !0,
              composed: !0
            })
          );
        })
      );
    } else if (s instanceof Y)
      a(this, D, ne).call(this, e, s.node);
    else if (s instanceof Function)
      a(this, S, P).call(this, e, le(s) ? new s() : s());
    else {
      const n = a(this, H, ae).call(this, s);
      n instanceof Node && a(this, D, ne).call(this, e, n);
    }
  }));
}, D = new WeakSet(), ne = function(e, t) {
  !(e instanceof ShadowRoot) && t instanceof HTMLElement && t.tagName === "STYLE" ? (i(this, m).add(() => {
    [...document.head.querySelectorAll("style")].find((n) => n.outerHTML === t.outerHTML) || document.head.appendChild(t);
  }), i(this, l).add(() => {
    t.remove();
  })) : e.appendChild(t);
}, F = new WeakSet(), oe = function(e) {
  return e instanceof Y ? e.node : typeof e == "function" ? le(e) ? new e() : e() : a(this, H, ae).call(this, e);
}, H = new WeakSet(), ae = function(e) {
  if (e instanceof Node)
    return e;
  if (e != null) {
    const t = String(e);
    if (t.trim().startsWith("<") && t.trim().endsWith(">")) {
      const s = document.createElement("div");
      return s.innerHTML = t, s.firstElementChild;
    } else
      return document.createTextNode(t);
  } else
    return;
}, I = new WeakMap(), U = new WeakMap();
let de = Y;
export {
  de as E
};
