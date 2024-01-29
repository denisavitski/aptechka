var on = Object.defineProperty, fn = Object.defineProperties;
var sn = Object.getOwnPropertyDescriptors;
var W = Object.getOwnPropertySymbols;
var cn = Object.prototype.hasOwnProperty, an = Object.prototype.propertyIsEnumerable;
var K = (n, t, r) => t in n ? on(n, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : n[t] = r, o = (n, t) => {
  for (var r in t || (t = {}))
    cn.call(t, r) && K(n, r, t[r]);
  if (W)
    for (var r of W(t))
      an.call(t, r) && K(n, r, t[r]);
  return n;
}, f = (n, t) => fn(n, sn(t));
var q = (n, t, r) => {
  if (!t.has(n))
    throw TypeError("Cannot " + r);
};
var U = (n, t, r) => (q(n, t, "read from private field"), r ? r.call(n) : t.get(n)), a = (n, t, r) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, r);
}, E = (n, t, r, i) => (q(n, t, "write to private field"), i ? i.call(n, r) : t.set(n, r), r);
var c = (n, t, r) => (q(n, t, "access private method"), r);
import { S as l } from "../Store-2hWEUGTj.js";
import { i as wn } from "../browser-S4eq8AeN.js";
import { c as Y } from "../string-GmxZA5Nq.js";
var g, T, z, C, Q, d, L, h, $, M, X, k, Z, x, O, N, _, v, H, m, R, A, j, F, nn, b, J, y, V, P, en, B, tn, D, rn, S, I, G, un;
const p = class p {
  constructor(...t) {
    a(this, T);
    a(this, C);
    a(this, d);
    // Class
    a(this, h);
    a(this, M);
    a(this, k);
    // Style
    a(this, x);
    a(this, N);
    a(this, v);
    a(this, m);
    // Events
    a(this, A);
    // Attributes
    a(this, F);
    a(this, b);
    // Children
    a(this, y);
    a(this, P);
    a(this, B);
    a(this, D);
    a(this, S);
    // Parent
    a(this, G);
    a(this, g, []);
    const r = t[0], i = t[1];
    if (wn)
      if (typeof r == "string") {
        const u = document.createElement("div");
        u.innerHTML = r;
        const s = u.firstElementChild;
        E(this, g, [s]), c(this, d, L).call(this, s, i);
      } else
        r instanceof HTMLElement ? (E(this, g, [r]), c(this, d, L).call(this, r, i)) : E(this, g, c(this, T, z).call(this, r));
  }
  get rootElements() {
    return U(this, g);
  }
};
g = new WeakMap(), T = new WeakSet(), z = function(t) {
  const r = [];
  for (const i in t) {
    const u = i, s = t[u], w = c(this, C, Q).call(this, u, s == null ? void 0 : s.svg);
    s && c(this, d, L).call(this, w, s), r.push(w);
  }
  return r;
}, C = new WeakSet(), Q = function(t, r = !1) {
  let i = null;
  return t.includes("-") ? i = new (customElements.get(t))() : r ? i = document.createElementNS("http://www.w3.org/2000/svg", t) : i = document.createElement(t), i;
}, d = new WeakSet(), L = function(t, r) {
  for (const i in r) {
    const u = i;
    u === "class" ? c(this, h, $).call(this, t, r[u]) : u === "style" ? c(this, x, O).call(this, t, r[u]) : u === "events" ? c(this, A, j).call(this, t, r[u]) : u === "attributes" ? c(this, F, nn).call(this, t, r[u]) : u === "children" ? c(this, y, V).call(this, t, r[u]) : u === "shadowChildren" ? c(this, y, V).call(this, t.shadowRoot || t, r[u]) : u === "parent" && c(this, G, un).call(this, t, r[u]);
  }
  r != null && r.created && r.created(t);
}, h = new WeakSet(), $ = function(t, r) {
  if (r) {
    if (typeof r == "string")
      t.classList.add(r);
    else if (Array.isArray(r))
      r.forEach((i) => {
        c(this, h, $).call(this, t, i);
      });
    else if (typeof r == "object")
      if (r instanceof l)
        c(this, M, X).call(this, t, r);
      else
        for (const i in r) {
          const u = r[i];
          u instanceof l ? c(this, k, Z).call(this, t, i, u) : u ? t.classList.add(i) : t.classList.remove(i);
        }
  } else
    return;
}, M = new WeakSet(), X = function(t, r) {
  r.subscribe(({ current: i, previous: u }) => {
    u && [u].flat().forEach((s) => {
      s && t.classList.remove(s);
    }), i && [i].flat().forEach((s) => {
      s && t.classList.add(s);
    });
  });
}, k = new WeakSet(), Z = function(t, r, i) {
  i.subscribe(({ current: u }) => {
    u ? t.classList.add(r) : t.classList.remove(r);
  });
}, x = new WeakSet(), O = function(t, r) {
  if (!r)
    return;
  t.tagName === "style" || t.tagName === "STYLE" ? c(this, v, H).call(this, t, r) : c(this, N, _).call(this, t, r);
}, N = new WeakSet(), _ = function(t, r) {
  for (const i in r) {
    const u = i, s = r[u];
    s instanceof l ? s.subscribe(({ current: w }) => {
      c(this, m, R).call(this, t, u, w);
    }) : c(this, m, R).call(this, t, u, s);
  }
}, v = new WeakSet(), H = function(t, r) {
  for (const i in r) {
    const u = r[i];
    if (typeof u == "object" && !(u instanceof l))
      t.appendChild(new Text(`${i} {`)), c(this, v, H).call(this, t, u), t.appendChild(new Text("}"));
    else if (u instanceof l) {
      const s = new Text();
      u.subscribe((w) => {
        w.current ? s.nodeValue = `${Y(i)}: ${w.current};` : s.nodeValue = "";
      }), t.appendChild(s);
    } else
      t.appendChild(new Text(`${Y(i)}: ${u};`));
  }
}, m = new WeakSet(), R = function(t, r, i) {
  r.includes("--") ? i ? t.style.setProperty(r, i) : t.style.removeProperty(r) : i ? t.style[r] = i : t.style[r] = "";
}, A = new WeakSet(), j = function(t, r) {
  if (r)
    for (const i in r) {
      const u = i, s = r[u];
      typeof s == "object" ? t.addEventListener(u, s.callback, s.options) : typeof s == "function" && t.addEventListener(u, s);
    }
}, F = new WeakSet(), nn = function(t, r) {
  for (const i in r) {
    const u = r[i];
    u instanceof l ? u.subscribe(({ current: s }) => {
      c(this, b, J).call(this, t, i, s);
    }) : c(this, b, J).call(this, t, i, u);
  }
}, b = new WeakSet(), J = function(t, r, i) {
  var u, s;
  r in t && !((s = (u = t.constructor) == null ? void 0 : u.observedAttributes) != null && s.includes(r)) ? i != null && (t[r] = i.toString()) : i != null && t.setAttribute(r, i.toString());
}, y = new WeakSet(), V = function(t, r) {
  r && r.forEach((i) => {
    if (i instanceof l) {
      const u = document.createElement("div");
      u.style.display = "contents", t.appendChild(u), i.subscribe(({ current: s }) => {
        c(this, B, tn).call(this, u, c(this, P, en).call(this, s), Array.from(u.childNodes));
      });
    } else if (i instanceof p)
      t.append(...i.rootElements);
    else if (typeof i == "string" && i.trim().startsWith("<") && i.trim().endsWith(">")) {
      const u = document.createElement("div");
      u.innerHTML = i, t.append(u.firstElementChild);
    } else {
      const u = c(this, S, I).call(this, i);
      u instanceof Node && t.append(u);
    }
  });
}, P = new WeakSet(), en = function(t) {
  return [t].flat().map((i) => i instanceof p ? i.rootElements : c(this, S, I).call(this, i)).flat().filter(Boolean);
}, B = new WeakSet(), tn = function(t, r, i) {
  i.forEach((u, s) => {
    if (s < r.length) {
      const w = r[s];
      c(this, D, rn).call(this, u, w) || t.replaceChild(w, u);
    } else
      t.removeChild(u);
  });
  for (let u = i.length; u < r.length; u++)
    t.appendChild(r[u]);
}, D = new WeakSet(), rn = function(t, r) {
  return r ? r instanceof Node ? t.isEqualNode(r) : t.textContent === r.toString() : !1;
}, S = new WeakSet(), I = function(t) {
  return t instanceof Node ? t : t != null ? new Text(String(t)) : void 0;
}, G = new WeakSet(), un = function(t, r) {
  if (!r)
    return;
  (r instanceof p ? r.rootElements[0] : r).appendChild(t);
};
let e = p;
function vn(...n) {
  return new e(...n);
}
function mn(...n) {
  return () => new e(...n);
}
function bn(n) {
  return new e({
    a: n
  });
}
function yn(n) {
  return new e({
    abbr: n
  });
}
function Sn(n) {
  return new e({
    address: n
  });
}
function En(n) {
  return new e({
    area: n
  });
}
function Ln(n) {
  return new e({
    article: n
  });
}
function Tn(n) {
  return new e({
    aside: n
  });
}
function Cn(n) {
  return new e({
    audio: n
  });
}
function Mn(n) {
  return new e({
    b: n
  });
}
function kn(n) {
  return new e({
    base: n
  });
}
function xn(n) {
  return new e({
    bdi: n
  });
}
function Nn(n) {
  return new e({
    bdo: n
  });
}
function An(n) {
  return new e({
    blockquote: n
  });
}
function Fn(n) {
  return new e({
    body: n
  });
}
function Pn(n) {
  return new e({
    br: n
  });
}
function Bn(n) {
  return new e({
    button: n
  });
}
function Dn(n) {
  return new e({
    canvas: n
  });
}
function Gn(n) {
  return new e({
    caption: n
  });
}
function qn(n) {
  return new e({
    cite: n
  });
}
function $n(n) {
  return new e({
    code: n
  });
}
function Hn(n) {
  return new e({
    col: n
  });
}
function Rn(n) {
  return new e({
    colgroup: n
  });
}
function Jn(n) {
  return new e({
    data: n
  });
}
function Vn(n) {
  return new e({
    datalist: n
  });
}
function In(n) {
  return new e({
    dd: n
  });
}
function Wn(n) {
  return new e({
    del: n
  });
}
function Kn(n) {
  return new e({
    details: n
  });
}
function Un(n) {
  return new e({
    dfn: n
  });
}
function Yn(n) {
  return new e({
    dialog: n
  });
}
function zn(n) {
  return new e({
    div: n
  });
}
function Qn(n) {
  return new e({
    dl: n
  });
}
function Xn(n) {
  return new e({
    dt: n
  });
}
function Zn(n) {
  return new e({
    em: n
  });
}
function On(n) {
  return new e({
    embed: n
  });
}
function _n(n) {
  return new e({
    fieldset: n
  });
}
function jn(n) {
  return new e({
    figcaption: n
  });
}
function ne(n) {
  return new e({
    figure: n
  });
}
function ee(n) {
  return new e({
    footer: n
  });
}
function te(n) {
  return new e({
    form: n
  });
}
function re(n) {
  return new e({
    h1: n
  });
}
function ue(n) {
  return new e({
    h2: n
  });
}
function ie(n) {
  return new e({
    h3: n
  });
}
function oe(n) {
  return new e({
    h4: n
  });
}
function fe(n) {
  return new e({
    h5: n
  });
}
function se(n) {
  return new e({
    h6: n
  });
}
function ce(n) {
  return new e({
    head: n
  });
}
function ae(n) {
  return new e({
    header: n
  });
}
function we(n) {
  return new e({
    hgroup: n
  });
}
function le(n) {
  return new e({
    hr: n
  });
}
function ge(n) {
  return new e({
    html: n
  });
}
function de(n) {
  return new e({
    i: n
  });
}
function pe(n) {
  return new e({
    iframe: n
  });
}
function he(n) {
  return new e({
    img: n
  });
}
function ve(n) {
  return new e({
    input: n
  });
}
function me(n) {
  return new e({
    ins: n
  });
}
function be(n) {
  return new e({
    kbd: n
  });
}
function ye(n) {
  return new e({
    label: n
  });
}
function Se(n) {
  return new e({
    legend: n
  });
}
function Ee(n) {
  return new e({
    li: n
  });
}
function Le(n) {
  return new e({
    link: n
  });
}
function Te(n) {
  return new e({
    main: n
  });
}
function Ce(n) {
  return new e({
    map: n
  });
}
function Me(n) {
  return new e({
    mark: n
  });
}
function ke(n) {
  return new e({
    menu: n
  });
}
function xe(n) {
  return new e({
    meta: n
  });
}
function Ne(n) {
  return new e({
    meter: n
  });
}
function Ae(n) {
  return new e({
    nav: n
  });
}
function Fe(n) {
  return new e({
    noscript: n
  });
}
function Pe(n) {
  return new e({
    object: n
  });
}
function Be(n) {
  return new e({
    ol: n
  });
}
function De(n) {
  return new e({
    optgroup: n
  });
}
function Ge(n) {
  return new e({
    option: n
  });
}
function qe(n) {
  return new e({
    output: n
  });
}
function $e(n) {
  return new e({
    p: n
  });
}
function He(n) {
  return new e({
    picture: n
  });
}
function Re(n) {
  return new e({
    pre: n
  });
}
function Je(n) {
  return new e({
    progress: n
  });
}
function Ve(n) {
  return new e({
    q: n
  });
}
function Ie(n) {
  return new e({
    rp: n
  });
}
function We(n) {
  return new e({
    rt: n
  });
}
function Ke(n) {
  return new e({
    ruby: n
  });
}
function Ue(n) {
  return new e({
    s: n
  });
}
function Ye(n) {
  return new e({
    samp: n
  });
}
function ze(n) {
  return new e({
    script: n
  });
}
function Qe(n) {
  return new e({
    search: n
  });
}
function Xe(n) {
  return new e({
    section: n
  });
}
function Ze(n) {
  return new e({
    select: n
  });
}
function Oe(n) {
  return new e({
    slot: n
  });
}
function _e(n) {
  return new e({
    small: n
  });
}
function je(n) {
  return new e({
    source: n
  });
}
function nt(n) {
  return new e({
    span: n
  });
}
function et(n) {
  return new e({
    strong: n
  });
}
function ln(n) {
  return new e({
    style: {
      style: n
    }
  });
}
function tt(n) {
  return new e({
    sub: n
  });
}
function rt(n) {
  return new e({
    summary: n
  });
}
function ut(n) {
  return new e({
    sup: n
  });
}
function it(n) {
  return new e({
    table: n
  });
}
function ot(n) {
  return new e({
    tbody: n
  });
}
function ft(n) {
  return new e({
    td: n
  });
}
function st(n) {
  return new e({
    template: n
  });
}
function ct(n) {
  return new e({
    textarea: n
  });
}
function at(n) {
  return new e({
    tfoot: n
  });
}
function wt(n) {
  return new e({
    th: n
  });
}
function lt(n) {
  return new e({
    thead: n
  });
}
function gt(n) {
  return new e({
    time: n
  });
}
function dt(n) {
  return new e({
    title: n
  });
}
function pt(n) {
  return new e({
    tr: n
  });
}
function ht(n) {
  return new e({
    track: n
  });
}
function vt(n) {
  return new e({
    u: n
  });
}
function mt(n) {
  return new e({
    ul: n
  });
}
function bt(n) {
  return new e({
    var: n
  });
}
function yt(n) {
  return new e({
    video: n
  });
}
function St(n) {
  return new e({
    wbr: n
  });
}
function Et(n) {
  const t = new CSSStyleSheet();
  return t.replaceSync(ln(n).rootElements[0].innerHTML), t;
}
function Lt(n) {
  return new e({
    a: f(o({}, n), {
      svg: !0
    })
  });
}
function Tt(n) {
  return new e({
    animate: f(o({}, n), {
      svg: !0
    })
  });
}
function Ct(n) {
  return new e({
    animateMotion: f(o({}, n), {
      svg: !0
    })
  });
}
function Mt(n) {
  return new e({
    animateTransform: f(o({}, n), {
      svg: !0
    })
  });
}
function kt(n) {
  return new e({
    circle: f(o({}, n), {
      svg: !0
    })
  });
}
function xt(n) {
  return new e({
    clipPath: f(o({}, n), {
      svg: !0
    })
  });
}
function Nt(n) {
  return new e({
    defs: f(o({}, n), {
      svg: !0
    })
  });
}
function At(n) {
  return new e({
    desc: f(o({}, n), {
      svg: !0
    })
  });
}
function Ft(n) {
  return new e({
    ellipse: f(o({}, n), {
      svg: !0
    })
  });
}
function Pt(n) {
  return new e({
    feBlend: f(o({}, n), {
      svg: !0
    })
  });
}
function Bt(n) {
  return new e({
    feColorMatrix: f(o({}, n), {
      svg: !0
    })
  });
}
function Dt(n) {
  return new e({
    feComponentTransfer: f(o({}, n), {
      svg: !0
    })
  });
}
function Gt(n) {
  return new e({
    feComposite: f(o({}, n), {
      svg: !0
    })
  });
}
function qt(n) {
  return new e({
    feConvolveMatrix: f(o({}, n), {
      svg: !0
    })
  });
}
function $t(n) {
  return new e({
    feDiffuseLighting: f(o({}, n), {
      svg: !0
    })
  });
}
function Ht(n) {
  return new e({
    feDisplacementMap: f(o({}, n), {
      svg: !0
    })
  });
}
function Rt(n) {
  return new e({
    feDistantLight: f(o({}, n), {
      svg: !0
    })
  });
}
function Jt(n) {
  return new e({
    feDropShadow: f(o({}, n), {
      svg: !0
    })
  });
}
function Vt(n) {
  return new e({
    feFlood: f(o({}, n), {
      svg: !0
    })
  });
}
function It(n) {
  return new e({
    feFuncA: f(o({}, n), {
      svg: !0
    })
  });
}
function Wt(n) {
  return new e({
    feFuncB: f(o({}, n), {
      svg: !0
    })
  });
}
function Kt(n) {
  return new e({
    feFuncG: f(o({}, n), {
      svg: !0
    })
  });
}
function Ut(n) {
  return new e({
    feFuncR: f(o({}, n), {
      svg: !0
    })
  });
}
function Yt(n) {
  return new e({
    feGaussianBlur: f(o({}, n), {
      svg: !0
    })
  });
}
function zt(n) {
  return new e({
    feImage: f(o({}, n), {
      svg: !0
    })
  });
}
function Qt(n) {
  return new e({
    feMerge: f(o({}, n), {
      svg: !0
    })
  });
}
function Xt(n) {
  return new e({
    feMergeNode: f(o({}, n), {
      svg: !0
    })
  });
}
function Zt(n) {
  return new e({
    feMorphology: f(o({}, n), {
      svg: !0
    })
  });
}
function Ot(n) {
  return new e({
    feOffset: f(o({}, n), {
      svg: !0
    })
  });
}
function _t(n) {
  return new e({
    fePointLight: f(o({}, n), {
      svg: !0
    })
  });
}
function jt(n) {
  return new e({
    feSpecularLighting: f(o({}, n), {
      svg: !0
    })
  });
}
function nr(n) {
  return new e({
    feSpotLight: f(o({}, n), {
      svg: !0
    })
  });
}
function er(n) {
  return new e({
    feTile: f(o({}, n), {
      svg: !0
    })
  });
}
function tr(n) {
  return new e({
    feTurbulence: f(o({}, n), {
      svg: !0
    })
  });
}
function rr(n) {
  return new e({
    filter: f(o({}, n), {
      svg: !0
    })
  });
}
function ur(n) {
  return new e({
    foreignObject: f(o({}, n), {
      svg: !0
    })
  });
}
function ir(n) {
  return new e({
    g: f(o({}, n), {
      svg: !0
    })
  });
}
function or(n) {
  return new e({
    image: f(o({}, n), {
      svg: !0
    })
  });
}
function fr(n) {
  return new e({
    line: f(o({}, n), {
      svg: !0
    })
  });
}
function sr(n) {
  return new e({
    linearGradient: f(o({}, n), {
      svg: !0
    })
  });
}
function cr(n) {
  return new e({
    marker: f(o({}, n), {
      svg: !0
    })
  });
}
function ar(n) {
  return new e({
    mask: f(o({}, n), {
      svg: !0
    })
  });
}
function wr(n) {
  return new e({
    metadata: f(o({}, n), {
      svg: !0
    })
  });
}
function lr(n) {
  return new e({
    mpath: f(o({}, n), {
      svg: !0
    })
  });
}
function gr(n) {
  return new e({
    path: f(o({}, n), {
      svg: !0
    })
  });
}
function dr(n) {
  return new e({
    pattern: f(o({}, n), {
      svg: !0
    })
  });
}
function pr(n) {
  return new e({
    polygon: f(o({}, n), {
      svg: !0
    })
  });
}
function hr(n) {
  return new e({
    polyline: f(o({}, n), {
      svg: !0
    })
  });
}
function vr(n) {
  return new e({
    radialGradient: f(o({}, n), {
      svg: !0
    })
  });
}
function mr(n) {
  return new e({
    rect: f(o({}, n), {
      svg: !0
    })
  });
}
function br(n) {
  return new e({
    script: f(o({}, n), {
      svg: !0
    })
  });
}
function yr(n) {
  return new e({
    set: f(o({}, n), {
      svg: !0
    })
  });
}
function Sr(n) {
  return new e({
    stop: f(o({}, n), {
      svg: !0
    })
  });
}
function Er(n) {
  return new e({
    style: f(o({}, n), {
      svg: !0
    })
  });
}
function Lr(n) {
  return new e({
    svg: f(o({}, n), {
      svg: !0
    })
  });
}
function Tr(n) {
  return new e({
    switch: f(o({}, n), {
      svg: !0
    })
  });
}
function Cr(n) {
  return new e({
    symbol: f(o({}, n), {
      svg: !0
    })
  });
}
function Mr(n) {
  return new e({
    text: f(o({}, n), {
      svg: !0
    })
  });
}
function kr(n) {
  return new e({
    textPath: f(o({}, n), {
      svg: !0
    })
  });
}
function xr(n) {
  return new e({
    title: f(o({}, n), {
      svg: !0
    })
  });
}
function Nr(n) {
  return new e({
    tspan: f(o({}, n), {
      svg: !0
    })
  });
}
function Ar(n) {
  return new e({
    use: f(o({}, n), {
      svg: !0
    })
  });
}
function Fr(n) {
  return new e({
    view: f(o({}, n), {
      svg: !0
    })
  });
}
export {
  e as ElementConstructor,
  bn as a,
  yn as abbr,
  Sn as address,
  Tt as animate,
  Ct as animateMotion,
  Mt as animateTransform,
  En as area,
  Ln as article,
  Tn as aside,
  Cn as audio,
  Mn as b,
  kn as base,
  xn as bdi,
  Nn as bdo,
  An as blockquote,
  Fn as body,
  Pn as br,
  Bn as button,
  Dn as canvas,
  Gn as caption,
  kt as circle,
  qn as cite,
  xt as clipPath,
  $n as code,
  Hn as col,
  Rn as colgroup,
  Jn as data,
  Vn as datalist,
  In as dd,
  Nt as defs,
  Wn as del,
  At as desc,
  Kn as details,
  Un as dfn,
  Yn as dialog,
  zn as div,
  Qn as dl,
  Xn as dt,
  vn as element,
  mn as elementFactory,
  Ft as ellipse,
  Zn as em,
  On as embed,
  Pt as feBlend,
  Bt as feColorMatrix,
  Dt as feComponentTransfer,
  Gt as feComposite,
  qt as feConvolveMatrix,
  $t as feDiffuseLighting,
  Ht as feDisplacementMap,
  Rt as feDistantLight,
  Jt as feDropShadow,
  Vt as feFlood,
  It as feFuncA,
  Wt as feFuncB,
  Kt as feFuncG,
  Ut as feFuncR,
  Yt as feGaussianBlur,
  zt as feImage,
  Qt as feMerge,
  Xt as feMergeNode,
  Zt as feMorphology,
  Ot as feOffset,
  _t as fePointLight,
  jt as feSpecularLighting,
  nr as feSpotLight,
  er as feTile,
  tr as feTurbulence,
  _n as fieldset,
  jn as figcaption,
  ne as figure,
  rr as filter,
  ee as footer,
  ur as foreignObject,
  te as form,
  ir as g,
  re as h1,
  ue as h2,
  ie as h3,
  oe as h4,
  fe as h5,
  se as h6,
  ce as head,
  ae as header,
  we as hgroup,
  le as hr,
  ge as html,
  bt as htmlVar,
  de as i,
  pe as iframe,
  or as image,
  he as img,
  ve as input,
  me as ins,
  be as kbd,
  ye as label,
  Se as legend,
  Ee as li,
  fr as line,
  sr as linearGradient,
  Le as link,
  Te as main,
  Ce as map,
  Me as mark,
  cr as marker,
  ar as mask,
  ke as menu,
  xe as meta,
  wr as metadata,
  Ne as meter,
  lr as mpath,
  Ae as nav,
  Fe as noscript,
  Pe as object,
  Be as ol,
  De as optgroup,
  Ge as option,
  qe as output,
  $e as p,
  gr as path,
  dr as pattern,
  He as picture,
  pr as polygon,
  hr as polyline,
  Re as pre,
  Je as progress,
  Ve as q,
  vr as radialGradient,
  mr as rect,
  Ie as rp,
  We as rt,
  Ke as ruby,
  Ue as s,
  Ye as samp,
  ze as script,
  Qe as search,
  Xe as section,
  Ze as select,
  yr as set,
  Oe as slot,
  _e as small,
  je as source,
  nt as span,
  Sr as stop,
  et as strong,
  ln as style,
  Et as stylesheet,
  tt as sub,
  rt as summary,
  ut as sup,
  Lr as svg,
  Lt as svgA,
  br as svgScript,
  Er as svgStyle,
  Tr as svgSwitch,
  xr as svgTitle,
  Cr as symbol,
  it as table,
  ot as tbody,
  ft as td,
  st as template,
  Mr as text,
  kr as textPath,
  ct as textarea,
  at as tfoot,
  wt as th,
  lt as thead,
  gt as time,
  dt as title,
  pt as tr,
  ht as track,
  Nr as tspan,
  vt as u,
  mt as ul,
  Ar as use,
  yt as video,
  Fr as view,
  St as wbr
};
