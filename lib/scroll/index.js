var _t = (s, e, i) => {
  if (!e.has(s))
    throw TypeError("Cannot " + i);
};
var h = (s, e, i) => (_t(s, e, "read from private field"), i ? i.call(s) : e.get(s)), D = (s, e, i) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, i);
}, $ = (s, e, i, o) => (_t(s, e, "write to private field"), o ? o.call(s, i) : e.set(s, i), i);
import { S as Vt } from "../Store-2hWEUGTj.js";
import { i as St } from "../browser-S4eq8AeN.js";
import { a as xt, g as yt } from "../layout-5SJlcXTY.js";
import { c as Wt } from "../math-_a3IpKOc.js";
import "../ticker/index.js";
import { D as $t } from "../Damped-523xgzT3.js";
import { Attribute as k } from "../attribute/index.js";
import { W as Pt, K as Tt } from "../WheelControls-F-xg5-oq.js";
import { CustomElement as kt, define as Ct } from "../custom-element/index.js";
import { TICK_ORDER as Rt, RESIZE_ORDER as Mt } from "../order/index.js";
import { resizer as lt } from "../resizer/index.js";
import { scrollEnties as G } from "../scroll-entries/index.js";
import { f as Dt } from "../dom-bHEwc_xV.js";
import "../intersector/index.js";
import "../number-bCHB2GAD.js";
import "../attributes-w0u-KiIb.js";
import "../notifier/index.js";
import "../function-zwSFehNd.js";
var Ht = Object.defineProperty, It = Object.getOwnPropertyDescriptor, Kt = (s, e, i, o) => {
  for (var u = o > 1 ? void 0 : o ? It(e, i) : e, n = s.length - 1, E; n >= 0; n--)
    (E = s[n]) && (u = (o ? E(e, i, u) : E(u)) || u);
  return o && u && Ht(e, i, u), u;
}, vt = (s, e, i) => {
  if (!e.has(s))
    throw TypeError("Cannot " + i);
}, t = (s, e, i) => (vt(s, e, "read from private field"), i ? i.call(s) : e.get(s)), l = (s, e, i) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, i);
}, g = (s, e, i, o) => (vt(s, e, "write to private field"), o ? o.call(s, i) : e.set(s, i), i), f = (s, e, i) => (vt(s, e, "access private method"), i), a, M, A, L, x, y, H, I, K, p, c, Y, w, d, V, q, m, J, P, N, ot, B, Q, at, gt, ct, wt, j, dt, tt, ft, R, pt, mt, At, et, st, bt, _, v, T, W;
class Gt {
  constructor(e, i) {
    D(this, _, void 0);
    D(this, v, void 0);
    D(this, T, 0);
    D(this, W, 0);
    $(this, _, e), $(this, v, i), G.register(h(this, _));
  }
  get size() {
    return h(this, T);
  }
  get position() {
    return h(this, W);
  }
  destroy() {
    G.unregister(h(this, _)), h(this, _).style.transform = "";
  }
  resize() {
    $(this, T, h(this, v).vertical ? h(this, _).offsetHeight : h(this, _).offsetWidth), $(this, W, h(this, v).vertical ? xt(h(this, _)) : yt(h(this, _))), $(this, W, h(this, W) - h(this, v).position);
  }
  transform() {
    let e = 0;
    h(this, v).infiniteAttribute.current && h(this, v).overscroll && h(this, W) + h(this, T) < h(this, v).currentScrollValue && (e = h(this, v).distance * -1), G.update(h(this, _), h(this, v).axisAttibute.current, e);
    const i = Wt(
      h(this, v).currentScrollValue + e,
      h(this, W) - h(this, v).viewportSize,
      h(this, W) + h(this, T)
    );
    h(this, v).vertical ? h(this, _).style.transform = `translate3d(0px, ${i * -1}px, 0px)` : h(this, _).style.transform = `translate3d(${i * -1}px, 0px, 0px)`;
  }
}
_ = new WeakMap(), v = new WeakMap(), T = new WeakMap(), W = new WeakMap();
let ut = class extends kt {
  constructor() {
    if (super(), l(this, N), l(this, B), l(this, at), l(this, ct), l(this, j), l(this, tt), l(this, mt), l(this, st), l(this, a, null), l(this, M, new k(this, "axis", "y")), l(this, A, new k(this, "pages", 0, {
      validate: (s) => Math.max(0, s - 1)
    })), l(this, L, new k(this, "sectional", !1)), l(this, x, new k(this, "infinite", !1)), l(this, y, new k(this, "split", !1)), l(this, H, new k(this, "damping", 0.03)), l(this, I, new k(this, "disabled", !1)), l(this, K, new k(this, "hibernated", !1)), l(this, p, null), l(this, c, []), l(this, Y, 0), l(this, w, 0), l(this, d, 0), l(this, V, null), l(this, q, null), l(this, m, new Vt(0)), l(this, J, 0), l(this, P, 0), l(this, R, () => {
      const s = this.currentScrollValue / t(this, d);
      if (g(this, Y, this.vertical ? xt(this) : yt(this)), g(this, w, this.vertical ? this.offsetHeight : this.offsetWidth), t(this, A).current) {
        g(this, d, t(this, w) * t(this, A).current);
        const e = t(this, d) + t(this, w);
        this.vertical ? (t(this, p).style.width = e + "px", t(this, p).style.height = "100%") : (t(this, p).style.height = e + "px", t(this, p).style.width = "100%");
      } else
        this.vertical ? (t(this, p).style.width = "100%", t(this, p).style.height = "max-content", g(this, d, t(this, p).offsetHeight - t(this, w))) : (t(this, p).style.width = "max-content", t(this, p).style.height = "100%", g(this, d, t(this, p).offsetWidth - t(this, w)));
      if (t(this, x) || (t(this, a).max = t(this, d)), t(this, c).forEach((e) => {
        e.resize(), e.transform();
      }), t(this, x).current && t(this, c).length) {
        const e = t(this, c)[t(this, c).length - 1], i = e.position + e.size - t(this, w), o = t(this, d) - i;
        g(this, P, e.position + e.size + o);
      } else
        g(this, P, t(this, d));
      if (t(this, L).current && t(this, c).length) {
        const e = t(this, c)[t(this, m).current];
        t(this, a).set(e.position, !0);
      } else
        t(this, a).set(s * t(this, d), !0);
    }), l(this, pt, () => {
      if (t(this, c).length) {
        let s = 0;
        for (let e = 0; e < t(this, c).length; e++) {
          const i = t(this, c)[e];
          i.transform(), this.targetScrollValue >= i.position && (s = e);
        }
        t(this, m).current = s;
      } else
        this.vertical ? t(this, p).style.transform = `translate3d(0px, ${this.currentScrollValue * -1}px, 0px)` : t(this, p).style.transform = `translate3d(${this.currentScrollValue * -1}px, 0px, 0px)`;
      G.update(this, t(this, M).current, this.currentScrollValue);
    }), l(this, et, (s) => {
      if (typeof s == "number")
        if (t(this, L).current) {
          const e = Math.sign(s);
          t(this, c).length ? this.shiftSections(e) : t(this, a).shift(e * t(this, w));
        } else
          t(this, a).shift(s);
      else
        s === "min" ? t(this, a).set(t(this, a).min) : s === "max" && t(this, a).set(t(this, a).delta);
    }), St) {
      g(this, a, new $t({ damping: 0.01, min: 0, order: Rt.SCROLL }));
      const s = this.attachShadow({ mode: "open" }), e = document.createElement("style");
      e.textContent = `
        :host {
          position: relative;

          width: 100%;
          height: 100%;

          display: block;
          outline: none;
        }

        :host([hibernated="true"]) {
          display: contents;
        }

        .static {
          position: absolute;
          top: 0;
          left: 0;

          z-index: 1;

          width: 100%;
          height: 100%;

        }
  
        .content {
          display: flex;
        }

        :host([hibernated="true"]) .content {
          display: contents;
        }
  
        ::slotted(*) {
          flex-shrink: 0;
        }
      `, s.appendChild(e), this.tabIndex = 0;
      const i = document.createElement("div");
      i.classList.add("static"), s.appendChild(i);
      const o = document.createElement("slot");
      o.setAttribute("name", "static"), i.appendChild(o), g(this, p, document.createElement("div")), t(this, p).classList.add("content"), s.appendChild(t(this, p));
      const u = document.createElement("slot");
      t(this, p).appendChild(u), g(this, V, new Pt({ element: this })), t(this, V).changeEvent.subscribe(t(this, et)), g(this, q, new Tt({ element: this })), t(this, q).changeEvent.subscribe(t(this, et)), t(this, M).subscribe(({ current: n }) => {
        t(this, p).style.flexDirection = n === "x" ? "row" : "column", t(this, V).axis = n, this.isConnected && t(this, R).call(this);
      }), t(this, A).subscribe(() => {
        this.isConnected && t(this, R).call(this);
      }), t(this, L).subscribe((n) => {
        t(this, m).current = 0, t(this, V).debounce = n.current, t(this, a).reset(), this.isConnected && (n.current && !n.previous ? f(this, N, ot).call(this) : !n.current && n.previous && f(this, B, Q).call(this));
      }), t(this, x).subscribe((n) => {
        n.current ? (this.isConnected && (t(this, c).length || (t(this, y).current = !0)), t(this, c).length && (t(this, a).max = 1 / 0, t(this, a).min = -1 / 0)) : (g(this, J, 0), t(this, a).max = t(this, d), t(this, a).min = 0);
      }), t(this, y).subscribe(({ current: n }) => {
        this.isConnected && (n ? f(this, N, ot).call(this) : f(this, B, Q).call(this));
      }), t(this, H).subscribe((n) => {
        t(this, a).damping = n.current;
      }), t(this, I).subscribe((n) => {
        n.current && !n.previous ? f(this, at, gt).call(this) : !n.current && n.previous && f(this, ct, wt).call(this);
      }), t(this, K).subscribe((n) => {
        n.current && !n.previous ? f(this, j, dt).call(this) : !n.current && n.previous && f(this, tt, ft).call(this);
      });
    }
  }
  get currentScrollValue() {
    return f(this, st, bt).call(this, "current");
  }
  get targetScrollValue() {
    return f(this, st, bt).call(this, "target");
  }
  get damped() {
    return t(this, a);
  }
  get dampedAttibute() {
    return t(this, a);
  }
  get axisAttibute() {
    return t(this, M);
  }
  get pagesAttibute() {
    return t(this, A);
  }
  get sectionalAttibute() {
    return t(this, L);
  }
  get infiniteAttribute() {
    return t(this, x);
  }
  get splitAttibute() {
    return t(this, y);
  }
  get dampingAttibute() {
    return t(this, H);
  }
  get disabledAttibute() {
    return t(this, I);
  }
  get hibernatedAttibute() {
    return t(this, K);
  }
  get position() {
    return t(this, Y);
  }
  get viewportSize() {
    return t(this, w);
  }
  get scrollSize() {
    return t(this, d);
  }
  get counter() {
    return t(this, m);
  }
  get distance() {
    return t(this, P);
  }
  get overscroll() {
    return t(this, J);
  }
  get vertical() {
    return t(this, M).current === "y";
  }
  get currentProgress() {
    return this.currentScrollValue / t(this, P);
  }
  get targetProgress() {
    return this.targetScrollValue / t(this, P);
  }
  // TODO: Поправить значение когда скролл не секционный ??
  scrollToSection(s, e = "smooth") {
    if (!t(this, c).length)
      return;
    const i = t(this, m).current;
    f(this, mt, At).call(this, s);
    const o = t(this, c)[i], u = t(this, c)[t(this, m).current];
    if (o && u) {
      let n = 0;
      const E = t(this, c).length - 1;
      t(this, m).current === 0 && i === E ? n = t(this, d) + t(this, w) - o.position : t(this, m).current === E && i === 0 ? n = u.position - (t(this, d) + t(this, w)) : n = u.position - o.position, t(this, a).shift(n, e === "instant");
    }
  }
  shiftSections(s, e = "smooth") {
    t(this, c).length && this.scrollToSection(t(this, m).current + s, e);
  }
  connectedCallback() {
    f(this, tt, ft).call(this), t(this, M).observe(), t(this, A).observe(), t(this, L).observe(), t(this, x).observe(), t(this, y).observe(), t(this, H).observe(), t(this, I).observe(), t(this, K).observe();
  }
  disconnectedCallback() {
    f(this, j, dt).call(this), t(this, M).unobserve(), t(this, A).unobserve(), t(this, L).unobserve(), t(this, x).unobserve(), t(this, y).unobserve(), t(this, H).unobserve(), t(this, I).unobserve(), t(this, K).unobserve();
  }
};
a = /* @__PURE__ */ new WeakMap();
M = /* @__PURE__ */ new WeakMap();
A = /* @__PURE__ */ new WeakMap();
L = /* @__PURE__ */ new WeakMap();
x = /* @__PURE__ */ new WeakMap();
y = /* @__PURE__ */ new WeakMap();
H = /* @__PURE__ */ new WeakMap();
I = /* @__PURE__ */ new WeakMap();
K = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakMap();
Y = /* @__PURE__ */ new WeakMap();
w = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakMap();
V = /* @__PURE__ */ new WeakMap();
q = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
J = /* @__PURE__ */ new WeakMap();
P = /* @__PURE__ */ new WeakMap();
N = /* @__PURE__ */ new WeakSet();
ot = function() {
  f(this, B, Q).call(this), t(this, p).querySelector("slot").assignedElements().forEach((e) => {
    e instanceof HTMLElement && t(this, c).push(new Gt(e, this));
  }), t(this, p).style.transform = "", t(this, R).call(this);
};
B = /* @__PURE__ */ new WeakSet();
Q = function() {
  t(this, c).forEach((s) => {
    s.destroy();
  }), g(this, c, []);
};
at = /* @__PURE__ */ new WeakSet();
gt = function() {
  t(this, a).unsubscribe(t(this, pt)), t(this, a).unlistenAnimationFrame(), t(this, V).disconnect(), t(this, q).disconnect();
};
ct = /* @__PURE__ */ new WeakSet();
wt = function() {
  t(this, a).subscribe(t(this, pt)), t(this, V).connect(), t(this, q).connect();
};
j = /* @__PURE__ */ new WeakSet();
dt = function() {
  lt.unsubscribe(t(this, R)), t(this, a).reset(), f(this, at, gt).call(this), t(this, p).style.transform = "", t(this, y).current && f(this, B, Q).call(this), G.unregister(this);
};
tt = /* @__PURE__ */ new WeakSet();
ft = function() {
  t(this, y).current && f(this, N, ot).call(this), G.register(this), lt.subscribe(t(this, R), Mt.SCROLL), f(this, ct, wt).call(this);
};
R = /* @__PURE__ */ new WeakMap();
pt = /* @__PURE__ */ new WeakMap();
mt = /* @__PURE__ */ new WeakSet();
At = function(s) {
  t(this, x).current ? (t(this, m).current = s % t(this, c).length, t(this, m).current = t(this, m).current < 0 ? t(this, c).length + t(this, m).current : t(this, m).current) : t(this, m).current = Wt(s, 0, t(this, c).length - 1);
};
et = /* @__PURE__ */ new WeakMap();
st = /* @__PURE__ */ new WeakSet();
bt = function(s = "current") {
  if (t(this, x).current && t(this, c).length) {
    const e = t(this, a)[s] % (t(this, d) + t(this, w)), i = e < 0 ? t(this, d) + e + t(this, w) : e;
    return g(this, J, Math.max(0, i - t(this, d))), i;
  } else
    return t(this, a)[s];
};
ut = Kt([
  Ct("e-scroll")
], ut);
var X;
class qt extends kt {
  constructor() {
    super(...arguments);
    D(this, X, null);
  }
  get scrollElement() {
    return h(this, X);
  }
  connectedCallback() {
    const i = Dt(this, ut);
    i instanceof ut ? $(this, X, i) : console.error(this, "e-scroll not found");
  }
}
X = new WeakMap();
var Bt = Object.defineProperty, Ft = Object.getOwnPropertyDescriptor, Ut = (s, e, i, o) => {
  for (var u = o > 1 ? void 0 : o ? Ft(e, i) : e, n = s.length - 1, E; n >= 0; n--)
    (E = s[n]) && (u = (o ? E(e, i, u) : E(u)) || u);
  return o && u && Bt(e, i, u), u;
}, Lt = (s, e, i) => {
  if (!e.has(s))
    throw TypeError("Cannot " + i);
}, r = (s, e, i) => (Lt(s, e, "read from private field"), i ? i.call(s) : e.get(s)), S = (s, e, i) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, i);
}, C = (s, e, i, o) => (Lt(s, e, "write to private field"), o ? o.call(s, i) : e.set(s, i), i), F, b, z, O, U, Z, it, nt, rt, ht;
let Et = class extends qt {
  constructor() {
    if (super(), S(this, F, null), S(this, b, null), S(this, z, !1), S(this, O, 0), S(this, U, 0), S(this, Z, 0), S(this, it, () => {
      C(this, z, this.offsetWidth > this.offsetHeight);
      const s = r(this, z) ? this.offsetWidth : this.offsetHeight;
      C(this, O, s / ((this.scrollElement.scrollSize + this.scrollElement.viewportSize) / s)), C(this, O, Math.max(r(this, O), 30)), r(this, z) ? (r(this, b).style.width = r(this, O) + "px", r(this, b).style.height = "100%") : (r(this, b).style.width = "100%", r(this, b).style.height = r(this, O) + "px"), C(this, U, s - r(this, O)), this.scrollElement.scrollSize || (this.style.display = "none");
    }), S(this, nt, () => {
      C(this, Z, this.scrollElement.currentProgress * r(this, U)), r(this, z) ? r(this, b).style.transform = `translate3d(${r(this, Z)}px, 0px, 0px)` : r(this, b).style.transform = `translate3d(0px, ${r(this, Z)}px, 0px)`;
    }), S(this, rt, () => {
      this.setAttribute("axis", this.scrollElement.axisAttibute.current);
    }), S(this, ht, (s) => {
      const e = (n) => {
        const E = r(this, z) ? n.x : n.y, zt = this.scrollElement.distance / r(this, U), Ot = (E - u) * zt;
        this.scrollElement.damped.set(o + Ot);
      }, i = () => {
        removeEventListener("pointermove", e), removeEventListener("pointerup", i), removeEventListener("touchend", i);
      };
      addEventListener("pointermove", e), addEventListener("pointerup", i), addEventListener("touchend", i);
      const o = this.scrollElement.damped.target, u = r(this, z) ? s.x : s.y;
    }), St) {
      const s = this.attachShadow({ mode: "open" }), e = document.createElement("style");
      e.textContent = `
        :host {
          display: inline-block;
          z-index: 1;
          background-color: #efefef;
        }

        :host([axis="y"]) {
          position: absolute;
          right: 0;
          top: 0;
          width: 1vmin;
          height: 100%;
        }

        :host([axis="x"]) {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1vmin;
        }

        .default-thumb {
          background-color: #181818;
          border-radius: 1vmin;
          touch-action: none;
        }

        ::slotted(*) {
          touch-action: none;
        }
      `, s.appendChild(e), C(this, F, document.createElement("slot")), s.appendChild(r(this, F));
    }
  }
  get thumbElement() {
    return r(this, b);
  }
  connectedCallback() {
    super.connectedCallback();
    const s = r(this, F).assignedElements()[0];
    s instanceof HTMLElement ? C(this, b, s) : (C(this, b, document.createElement("div")), r(this, b).classList.add("default-thumb"), this.shadowRoot.appendChild(r(this, b))), r(this, b).addEventListener("pointerdown", r(this, ht)), lt.subscribe(r(this, it), Mt.SCROLL + 1), this.scrollElement.damped.subscribe(r(this, nt)), this.scrollElement.axisAttibute.subscribe(r(this, rt));
  }
  disconnectedCallback() {
    r(this, b).removeEventListener("pointerdown", r(this, ht)), lt.unsubscribe(r(this, it)), this.scrollElement.damped.unsubscribe(r(this, nt)), this.scrollElement.axisAttibute.unsubscribe(r(this, rt));
  }
};
F = /* @__PURE__ */ new WeakMap();
b = /* @__PURE__ */ new WeakMap();
z = /* @__PURE__ */ new WeakMap();
O = /* @__PURE__ */ new WeakMap();
U = /* @__PURE__ */ new WeakMap();
Z = /* @__PURE__ */ new WeakMap();
it = /* @__PURE__ */ new WeakMap();
nt = /* @__PURE__ */ new WeakMap();
rt = /* @__PURE__ */ new WeakMap();
ht = /* @__PURE__ */ new WeakMap();
Et = Ut([
  Ct("e-scrollbar")
], Et);
export {
  ut as ScrollElement,
  Et as ScrollbarElement
};
