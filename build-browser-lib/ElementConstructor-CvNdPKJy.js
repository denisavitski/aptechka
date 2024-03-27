var R = (c, e, s) => {
  if (!e.has(c))
    throw TypeError("Cannot " + s);
};
var n = (c, e, s) => (R(c, e, "read from private field"), s ? s.call(c) : e.get(c)), f = (c, e, s) => {
  if (e.has(c))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(c) : e.set(c, s);
}, K = (c, e, s, t) => (R(c, e, "write to private field"), t ? t.call(c, s) : e.set(c, s), s);
var a = (c, e, s) => (R(c, e, "access private method"), s);
import { S as m } from "./Store-JOKrNVEr.js";
import { i as fe } from "./browser-0zX67oeU.js";
import { i as U } from "./object-R34VLqhp.js";
import { c as Q, u as le } from "./string-3lAkpJJP.js";
import { connector as re } from "./connector/index.js";
const ce = /* @__PURE__ */ new Set([
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
var l, d, h, N, Z, w, _, A, O, y, W, M, j, x, ee, v, te, D, se, S, q, p, z, k, ie, H, ne, E, J, g, T, b, V, F, oe, P, ae, L, Y, C, I, B, G;
const $ = class $ {
  constructor(...e) {
    f(this, N);
    f(this, w);
    f(this, A);
    f(this, y);
    f(this, M);
    f(this, x);
    f(this, v);
    f(this, D);
    f(this, S);
    f(this, p);
    f(this, k);
    f(this, H);
    f(this, E);
    f(this, g);
    f(this, b);
    f(this, F);
    f(this, P);
    f(this, L);
    f(this, C);
    f(this, l, void 0);
    f(this, d, /* @__PURE__ */ new Set());
    f(this, h, /* @__PURE__ */ new Set());
    f(this, B, () => {
      n(this, d).forEach((e) => {
        e();
      }), n(this, d).clear();
    });
    f(this, G, (e) => {
      n(this, h).forEach((s) => {
        s(e);
      }), n(this, h).clear();
    });
    const s = e[0], t = e[1];
    K(this, l, a(this, N, Z).call(this, s, t == null ? void 0 : t.forceSvg)), a(this, A, O).call(this, t);
  }
  get node() {
    return n(this, l);
  }
};
l = new WeakMap(), d = new WeakMap(), h = new WeakMap(), N = new WeakSet(), Z = function(e, s) {
  let t = null;
  if (e instanceof Node)
    t = e;
  else if (typeof e == "string")
    if (!e.includes("<") && e.includes("-"))
      t = new (customElements.get(e))();
    else if (e.includes("<")) {
      const i = document.createElement("div");
      i.innerHTML = e, t = i.firstElementChild;
    } else
      ce.has(e) || s ? t = document.createElementNS(
        "http://www.w3.org/2000/svg",
        e
      ) : t = document.createElement(e);
  else
    t = document.createElement("div");
  return t;
}, w = new WeakSet(), _ = function(e) {
  return e instanceof HTMLElement || e instanceof SVGElement;
}, A = new WeakSet(), O = function(e) {
  if (!e)
    return;
  const s = a(this, w, _).call(this, n(this, l)), t = e.ref;
  delete e.ref, e != null && e.onConnect && (n(this, d).add(e.onConnect), delete e.onConnect), e != null && e.onDisconnect && (n(this, h).add(e.onDisconnect), delete e.onDisconnect);
  let i, o;
  for (const r in e) {
    const u = e[r];
    r === "class" && s ? a(this, y, W).call(this, u) : r === "style" && s ? a(this, v, te).call(this, u) : r === "lightChildren" ? a(this, g, T).call(this, n(this, l), u) : r === "children" ? a(this, g, T).call(this, n(this, l) instanceof Element ? n(this, l).shadowRoot || n(this, l) : n(this, l), u) : r.startsWith("on") ? (o || (o = {}), o[r] = u) : (i || (i = {}), i[r] = u);
  }
  if (a(this, H, ne).call(this, i), a(this, k, ie).call(this, o), t && (typeof t == "function" ? t(n(this, l)) : t.current = n(this, l)), fe && (n(this, h).size || n(this, d).size)) {
    const r = n(this, l) instanceof DocumentFragment ? n(this, l).firstChild : n(this, l);
    re.subscribe(r, {
      connectCallback: n(this, B),
      disconnectCallback: n(this, G),
      unsubscribeAfterDisconnect: !0,
      maxWaitSec: 20
    });
  }
}, y = new WeakSet(), W = function(e) {
  const s = n(this, l);
  if (e) {
    if (typeof e == "string")
      s.classList.add(e);
    else if (Array.isArray(e))
      e.forEach((t) => {
        a(this, y, W).call(this, t);
      });
    else if (typeof e == "object")
      if (e instanceof m)
        a(this, M, j).call(this, e);
      else
        for (const t in e) {
          const i = e[t];
          i instanceof m ? a(this, x, ee).call(this, t, i) : i ? s.classList.add(t) : s.classList.remove(t);
        }
  } else
    return;
}, M = new WeakSet(), j = function(e) {
  const s = n(this, l);
  n(this, h).add(
    e.subscribe(({ current: t, previous: i }) => {
      i && [i].flat().forEach((o) => {
        o && s.classList.remove(o);
      }), t && [t].flat().forEach((o) => {
        o && s.classList.add(o);
      });
    })
  );
}, x = new WeakSet(), ee = function(e, s) {
  const t = n(this, l);
  n(this, h).add(
    s.subscribe(({ current: i }) => {
      i ? t.classList.add(e) : t.classList.remove(e);
    })
  );
}, v = new WeakSet(), te = function(e) {
  if (!e)
    return;
  const s = n(this, l);
  s.tagName === "style" || s.tagName === "STYLE" ? a(this, S, q).call(this, e) : a(this, D, se).call(this, e);
}, D = new WeakSet(), se = function(e) {
  for (const s in e) {
    const t = s, i = e[t];
    i instanceof m ? n(this, h).add(
      i.subscribe(({ current: o }) => {
        a(this, p, z).call(this, t, o);
      })
    ) : a(this, p, z).call(this, t, i);
  }
}, S = new WeakSet(), q = function(e) {
  const s = n(this, l);
  for (const t in e) {
    const i = e[t];
    if (typeof i == "object" && !(i instanceof m))
      s.appendChild(new Text(`${t} {`)), a(this, S, q).call(this, i), s.appendChild(new Text("}"));
    else if (i instanceof m) {
      const o = new Text();
      n(this, h).add(
        i.subscribe((r) => {
          r.current ? o.nodeValue = `${Q(t)}: ${r.current};` : o.nodeValue = "";
        })
      ), s.appendChild(o);
    } else
      s.appendChild(new Text(`${Q(t)}: ${i};`));
  }
}, p = new WeakSet(), z = function(e, s) {
  const t = n(this, l);
  e.includes("--") ? s ? t.style.setProperty(e, s) : t.style.removeProperty(e) : s ? t.style[e] = s : t.style[e] = "";
}, k = new WeakSet(), ie = function(e) {
  if (!e)
    return;
  const s = n(this, l);
  for (const t in e) {
    const i = t, o = le(
      i.split("on").slice(1).join("on")
    ), r = e[i];
    typeof r == "object" ? s.addEventListener(
      o,
      r.callback,
      r.options
    ) : typeof r == "function" && s.addEventListener(o, r);
  }
}, H = new WeakSet(), ne = function(e) {
  for (const s in e) {
    const t = e[s];
    t instanceof m ? n(this, h).add(
      t.subscribe(({ current: i }) => {
        a(this, E, J).call(this, s, i);
      })
    ) : a(this, E, J).call(this, s, t);
  }
}, E = new WeakSet(), J = function(e, s) {
  var i, o;
  const t = n(this, l);
  e in t && !((o = (i = t.constructor) == null ? void 0 : i.observedAttributes) != null && o.includes(e)) ? s != null && (t[e] = s.toString()) : s != null && t.setAttribute(e, s.toString());
}, g = new WeakSet(), T = function(e, s) {
  s && (s = [s].flat(), s.forEach((t) => {
    if (t instanceof m) {
      const i = document.createElement("div");
      i.style.display = "contents", e.appendChild(i), n(this, h).add(
        t.subscribe(({ current: o }) => {
          a(this, P, ae).call(this, i, a(this, F, oe).call(this, o), Array.from(i.childNodes));
        })
      );
    } else if (t instanceof $)
      a(this, b, V).call(this, e, t.node);
    else if (t instanceof Function)
      a(this, g, T).call(this, e, U(t) ? new t() : t());
    else {
      const i = a(this, C, I).call(this, t);
      i instanceof Node && a(this, b, V).call(this, e, i);
    }
  }));
}, b = new WeakSet(), V = function(e, s) {
  !(e instanceof ShadowRoot) && s instanceof HTMLElement && s.tagName === "STYLE" ? (n(this, d).add(() => {
    [...document.head.querySelectorAll("style")].find((i) => i.outerHTML === s.outerHTML) || document.head.appendChild(s);
  }), n(this, h).add(() => {
    s.remove();
  })) : e.appendChild(s);
}, F = new WeakSet(), oe = function(e) {
  return [e].flat().map((t) => t instanceof $ ? t.node : typeof t == "function" ? U(t) ? new t() : t() : a(this, C, I).call(this, t)).flat().filter(Boolean);
}, P = new WeakSet(), ae = function(e, s, t) {
  t.length > s.length && t.forEach((i) => {
    s.find((o) => a(this, L, Y).call(this, i, o)) || (e.removeChild(i), t = t.filter((o) => o !== i));
  }), t.forEach((i, o) => {
    if (o < s.length) {
      const r = s[o];
      a(this, L, Y).call(this, i, r) || e.replaceChild(r, i);
    } else
      e.removeChild(i);
  });
  for (let i = t.length; i < s.length; i++)
    e.appendChild(s[i]);
}, L = new WeakSet(), Y = function(e, s) {
  return s ? s instanceof Node ? e.isEqualNode(s) : e.textContent === s.toString() : !1;
}, C = new WeakSet(), I = function(e) {
  if (e instanceof Node)
    return e;
  if (e != null) {
    const s = String(e);
    if (s.trim().startsWith("<") && s.trim().endsWith(">")) {
      const t = document.createElement("div");
      return t.innerHTML = s, t.firstElementChild;
    } else
      return new Text(s);
  } else
    return;
}, B = new WeakMap(), G = new WeakMap();
let X = $;
export {
  X as E
};
