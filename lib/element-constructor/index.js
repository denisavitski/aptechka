var on = Object.defineProperty, fn = Object.defineProperties;
var sn = Object.getOwnPropertyDescriptors;
var W = Object.getOwnPropertySymbols;
var cn = Object.prototype.hasOwnProperty, an = Object.prototype.propertyIsEnumerable;
var K = (n, r, t) => r in n ? on(n, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[r] = t, o = (n, r) => {
  for (var t in r || (r = {}))
    cn.call(r, t) && K(n, t, r[t]);
  if (W)
    for (var t of W(r))
      an.call(r, t) && K(n, t, r[t]);
  return n;
}, f = (n, r) => fn(n, sn(r));
var q = (n, r, t) => {
  if (!r.has(n))
    throw TypeError("Cannot " + t);
};
var U = (n, r, t) => (q(n, r, "read from private field"), t ? t.call(n) : r.get(n)), a = (n, r, t) => {
  if (r.has(n))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(n) : r.set(n, t);
}, E = (n, r, t, u) => (q(n, r, "write to private field"), u ? u.call(n, t) : r.set(n, t), t);
var c = (n, r, t) => (q(n, r, "access private method"), t);
import { S as l } from "../Store-qq7IjRLE.js";
import { i as wn } from "../browser-S4eq8AeN.js";
import { c as Y } from "../string-GmxZA5Nq.js";
var g, T, z, C, Q, d, L, p, $, M, X, k, Z, x, O, N, _, v, H, m, R, A, j, F, nn, b, J, y, V, P, en, B, tn, D, rn, S, I, G, un;
const h = class h {
  constructor(...r) {
    a(this, T);
    a(this, C);
    a(this, d);
    a(this, p);
    a(this, M);
    a(this, k);
    a(this, x);
    a(this, N);
    a(this, v);
    a(this, m);
    a(this, A);
    a(this, F);
    a(this, b);
    a(this, y);
    a(this, P);
    a(this, B);
    a(this, D);
    a(this, S);
    a(this, G);
    a(this, g, []);
    const t = r[0], u = r[1];
    if (wn)
      if (typeof t == "string") {
        const i = document.createElement("div");
        i.innerHTML = t;
        const s = i.firstElementChild;
        E(this, g, [s]), c(this, d, L).call(this, s, u);
      } else
        t instanceof HTMLElement ? (E(this, g, [t]), c(this, d, L).call(this, t, u)) : E(this, g, c(this, T, z).call(this, t));
  }
  get rootElements() {
    return U(this, g);
  }
};
g = new WeakMap(), T = new WeakSet(), z = function(r) {
  const t = [];
  for (const u in r) {
    const i = u, s = r[i], w = c(this, C, Q).call(this, i, s == null ? void 0 : s.svg);
    s && c(this, d, L).call(this, w, s), t.push(w);
  }
  return t;
}, C = new WeakSet(), Q = function(r, t = !1) {
  let u = null;
  return r.includes("-") ? u = new (customElements.get(r))() : t ? u = document.createElementNS("http://www.w3.org/2000/svg", r) : u = document.createElement(r), u;
}, d = new WeakSet(), L = function(r, t) {
  for (const u in t) {
    const i = u;
    i === "class" ? c(this, p, $).call(this, r, t[i]) : i === "style" ? c(this, x, O).call(this, r, t[i]) : i === "events" ? c(this, A, j).call(this, r, t[i]) : i === "attributes" ? c(this, F, nn).call(this, r, t[i]) : i === "children" ? c(this, y, V).call(this, r, t[i]) : i === "shadowChildren" ? c(this, y, V).call(this, r.shadowRoot || r, t[i]) : i === "parent" && c(this, G, un).call(this, r, t[i]);
  }
  t != null && t.created && t.created(r);
}, p = new WeakSet(), $ = function(r, t) {
  if (t) {
    if (typeof t == "string")
      r.classList.add(t);
    else if (Array.isArray(t))
      t.forEach((u) => {
        c(this, p, $).call(this, r, u);
      });
    else if (typeof t == "object")
      if (t instanceof l)
        c(this, M, X).call(this, r, t);
      else
        for (const u in t) {
          const i = t[u];
          i instanceof l ? c(this, k, Z).call(this, r, u, i) : i ? r.classList.add(u) : r.classList.remove(u);
        }
  } else
    return;
}, M = new WeakSet(), X = function(r, t) {
  t.subscribe(({ current: u, previous: i }) => {
    i && [i].flat().forEach((s) => {
      s && r.classList.remove(s);
    }), u && [u].flat().forEach((s) => {
      s && r.classList.add(s);
    });
  });
}, k = new WeakSet(), Z = function(r, t, u) {
  u.subscribe(({ current: i }) => {
    i ? r.classList.add(t) : r.classList.remove(t);
  });
}, x = new WeakSet(), O = function(r, t) {
  if (!t)
    return;
  r.tagName === "style" || r.tagName === "STYLE" ? c(this, v, H).call(this, r, t) : c(this, N, _).call(this, r, t);
}, N = new WeakSet(), _ = function(r, t) {
  for (const u in t) {
    const i = u, s = t[i];
    s instanceof l ? s.subscribe(({ current: w }) => {
      c(this, m, R).call(this, r, i, w);
    }) : c(this, m, R).call(this, r, i, s);
  }
}, v = new WeakSet(), H = function(r, t) {
  for (const u in t) {
    const i = t[u];
    if (typeof i == "object" && !(i instanceof l))
      r.appendChild(new Text(`${u} {`)), c(this, v, H).call(this, r, i), r.appendChild(new Text("}"));
    else if (i instanceof l) {
      const s = new Text();
      i.subscribe((w) => {
        w.current ? s.nodeValue = `${Y(u)}: ${w.current};` : s.nodeValue = "";
      }), r.appendChild(s);
    } else
      r.appendChild(new Text(`${Y(u)}: ${i};`));
  }
}, m = new WeakSet(), R = function(r, t, u) {
  t.includes("--") ? u ? r.style.setProperty(t, u) : r.style.removeProperty(t) : u ? r.style[t] = u : r.style[t] = "";
}, A = new WeakSet(), j = function(r, t) {
  if (t)
    for (const u in t) {
      const i = u, s = t[i];
      typeof s == "object" ? r.addEventListener(i, s.callback, s.options) : typeof s == "function" && r.addEventListener(i, s);
    }
}, F = new WeakSet(), nn = function(r, t) {
  for (const u in t) {
    const i = t[u];
    i instanceof l ? i.subscribe(({ current: s }) => {
      c(this, b, J).call(this, r, u, s);
    }) : c(this, b, J).call(this, r, u, i);
  }
}, b = new WeakSet(), J = function(r, t, u) {
  var i, s;
  t in r && !((s = (i = r.constructor) == null ? void 0 : i.observedAttributes) != null && s.includes(t)) ? u != null && (r[t] = u.toString()) : u != null && r.setAttribute(t, u.toString());
}, y = new WeakSet(), V = function(r, t) {
  t && t.forEach((u) => {
    if (u instanceof l) {
      const i = document.createElement("div");
      i.style.display = "contents", r.appendChild(i), u.subscribe(({ current: s }) => {
        c(this, B, tn).call(this, i, c(this, P, en).call(this, s), Array.from(i.childNodes));
      });
    } else if (u instanceof h)
      r.append(...u.rootElements);
    else {
      const i = c(this, S, I).call(this, u);
      i instanceof Node && r.append(i);
    }
  });
}, P = new WeakSet(), en = function(r) {
  return [r].flat().map((u) => u instanceof h ? u.rootElements : c(this, S, I).call(this, u)).flat().filter(Boolean);
}, B = new WeakSet(), tn = function(r, t, u) {
  u.forEach((i, s) => {
    if (s < t.length) {
      const w = t[s];
      c(this, D, rn).call(this, i, w) || r.replaceChild(w, i);
    } else
      r.removeChild(i);
  });
  for (let i = u.length; i < t.length; i++)
    r.appendChild(t[i]);
}, D = new WeakSet(), rn = function(r, t) {
  return t ? t instanceof Node ? r.isEqualNode(t) : r.textContent === t.toString() : !1;
}, S = new WeakSet(), I = function(r) {
  if (r instanceof Node)
    return r;
  if (r != null) {
    const t = String(r);
    if (t.trim().startsWith("<") && t.trim().endsWith(">")) {
      const u = document.createElement("div");
      return u.innerHTML = t, u.firstElementChild;
    } else
      return new Text(t);
  } else
    return;
}, G = new WeakSet(), un = function(r, t) {
  if (!t)
    return;
  (t instanceof h ? t.rootElements[0] : t).appendChild(r);
};
let e = h;
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
function he(n) {
  return new e({
    iframe: n
  });
}
function pe(n) {
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
function ht(n) {
  return new e({
    tr: n
  });
}
function pt(n) {
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
  const r = new CSSStyleSheet();
  return r.replaceSync(ln(n).rootElements[0].innerHTML), r;
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
function hr(n) {
  return new e({
    polygon: f(o({}, n), {
      svg: !0
    })
  });
}
function pr(n) {
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
  he as iframe,
  or as image,
  pe as img,
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
  hr as polygon,
  pr as polyline,
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
  ht as tr,
  pt as track,
  Nr as tspan,
  vt as u,
  mt as ul,
  Ar as use,
  yt as video,
  Fr as view,
  St as wbr
};
