var Mt = (e, s, i) => {
  if (!s.has(e))
    throw TypeError("Cannot " + i);
};
var n = (e, s, i) => (Mt(e, s, "read from private field"), i ? i.call(e) : s.get(e)), D = (e, s, i) => {
  if (s.has(e))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(e) : s.set(e, i);
}, V = (e, s, i, r) => (Mt(e, s, "write to private field"), r ? r.call(e, i) : s.set(e, i), i);
import { D as Ft } from "../Damped-DEHDBwBz.js";
import { S as Bt } from "../Store-JOKrNVEr.js";
import { D as Kt } from "../Derived-Bc88XJ8J.js";
import { i as At } from "../browser-0zX67oeU.js";
import { a as wt, g as vt } from "../layout-HoBT_Da2.js";
import { c as zt } from "../math-BOBiC4TN.js";
import "../ticker/index.js";
import { Attribute as E } from "../attribute/index.js";
import { W as Gt, K as Ut } from "../WheelControls-BJdZsEkS.js";
import { CustomElement as Lt, define as Vt } from "../custom-element/index.js";
import { TICK_ORDER as Zt, RESIZE_ORDER as $t } from "../order/index.js";
import { windowResizer as ct } from "../window-resizer/index.js";
import { scrollEntries as H } from "../scroll-entries/index.js";
import { e as Ot, D as Ct, ax as bt } from "../tags-C2jg1zYB.js";
import { c as Rt } from "../createStylesheet-CD11E4C8.js";
import { cssUnitParser as qt } from "../css-unit-parser/index.js";
import { f as Jt } from "../dom-BY7JhTx5.js";
var Nt = Object.defineProperty, Qt = Object.getOwnPropertyDescriptor, Xt = (e, s, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Qt(s, i) : s, f = e.length - 1, v; f >= 0; f--)
    (v = e[f]) && (a = (r ? v(s, i, a) : v(a)) || a);
  return r && a && Nt(s, i, a), a;
}, kt = (e, s, i) => {
  if (!s.has(e))
    throw TypeError("Cannot " + i);
}, t = (e, s, i) => (kt(e, s, "read from private field"), i ? i.call(e) : s.get(e)), h = (e, s, i) => {
  if (s.has(e))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(e) : s.set(e, i);
}, d = (e, s, i, r) => (kt(e, s, "write to private field"), r ? r.call(e, i) : s.set(e, i), i), m = (e, s, i) => (kt(e, s, "access private method"), i), l, C, T, O, I, Q, k, K, X, Y, u, ut, c, j, tt, _, p, z, W, F, w, G, $, q, pt, B, J, ft, Wt, dt, yt, et, _t, st, St, R, gt, xt, Dt, it, rt, Et, S, g, L, y;
class Yt {
  constructor(s, i) {
    D(this, S, void 0);
    D(this, g, void 0);
    D(this, L, 0);
    D(this, y, 0);
    V(this, S, s), V(this, g, i), H.register(n(this, S));
  }
  get size() {
    return n(this, L);
  }
  get position() {
    return n(this, y);
  }
  destroy() {
    H.unregister(n(this, S)), n(this, S).style.transform = "";
  }
  resize() {
    V(this, L, n(this, g).vertical ? n(this, S).offsetHeight : n(this, S).offsetWidth), V(this, y, n(this, g).vertical ? wt(n(this, S)) : vt(n(this, S))), V(this, y, n(this, y) - n(this, g).contentPosition);
  }
  transform() {
    let s = 0;
    const i = n(this, g).viewportSize - n(this, L);
    n(this, g).infiniteAttribute.current && n(this, g).overscroll && n(this, y) + n(this, L) < n(this, g).currentScrollValue && (s = n(this, g).distance * -1 - n(this, g).gap), H.update(
      n(this, S),
      n(this, g).axisAttibute.current,
      s
    );
    const r = n(this, g).currentScrollValue + s, a = n(this, y) - n(this, g).viewportSize - i, f = n(this, y) + n(this, L) + i, v = zt(r, a, f);
    n(this, g).vertical ? n(this, S).style.transform = `translate3d(0px, ${v * -1}px, 0px)` : n(this, S).style.transform = `translate3d(${v * -1}px, 0px, 0px)`;
  }
}
S = new WeakMap(), g = new WeakMap(), L = new WeakMap(), y = new WeakMap();
const jt = Rt({
  ":host": {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "block",
    outline: "none"
  },
  ':host([hibernated="true"])': {
    display: "contents"
  },
  ".static": {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%"
  },
  ".content": {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%",
    gap: "var(--gap, 0px)"
  },
  ':host([hibernated="true"]) .content': {
    display: "contents"
  },
  "::slotted(*)": {
    flexShrink: "0"
  }
});
let mt = class extends Lt {
  constructor() {
    super(), h(this, q), h(this, B), h(this, ft), h(this, dt), h(this, et), h(this, st), h(this, xt), h(this, rt), h(this, l, null), h(this, C, new E(this, "axis", "y")), h(this, T, new E(this, "pages", 0, {
      validate: (e) => Math.max(0, e - 1)
    })), h(this, O, new E(this, "split", !1)), h(this, I, new E(this, "sectional", !1)), h(this, Q, new E(
      this,
      "wheel-max-delta",
      !1
    )), h(this, k, new E(this, "infinite", !1)), h(this, K, new E(this, "damping", 0.03)), h(this, X, new E(this, "disabled", !1)), h(this, Y, new E(this, "hibernated", !1)), h(this, u, null), h(this, ut, null), h(this, c, []), h(this, j, 0), h(this, tt, 0), h(this, _, 0), h(this, p, 0), h(this, z, 0), h(this, W, null), h(this, F, null), h(this, w, new Bt(0)), h(this, G, 0), h(this, $, 0), h(this, R, () => {
      const e = this.currentScrollValue / t(this, p) || 0;
      if (d(this, j, this.vertical ? wt(this) : vt(this)), d(this, tt, this.vertical ? wt(t(this, u)) : vt(t(this, u))), d(this, _, this.vertical ? this.offsetHeight : this.offsetWidth), t(this, T).current) {
        d(this, p, t(this, _) * t(this, T).current);
        const s = t(this, p) + t(this, _);
        this.vertical ? (t(this, u).style.width = s + "px", t(this, u).style.height = "100%") : (t(this, u).style.height = s + "px", t(this, u).style.width = "100%");
      } else
        this.vertical ? (t(this, u).style.width = "100%", t(this, u).style.height = "max-content", d(this, p, t(this, u).offsetHeight - t(this, _))) : (t(this, u).style.width = "max-content", t(this, u).style.height = "100%", d(this, p, t(this, u).offsetWidth - t(this, _)));
      if (d(this, z, qt.parse(getComputedStyle(t(this, u)).gap)), !t(this, k).current) {
        const s = getComputedStyle(this);
        d(this, p, t(this, p) + (this.vertical ? parseFloat(s.paddingBlockStart) + parseFloat(s.paddingBlockEnd) : parseFloat(s.paddingInlineStart) + parseFloat(s.paddingInlineEnd))), t(this, l).max = t(this, p);
      }
      if (t(this, c).forEach((s) => {
        s.resize(), s.transform();
      }), t(this, k).current && t(this, c).length) {
        const s = t(this, c)[t(this, c).length - 1], i = s.position + s.size - t(this, _), r = t(this, p) - i;
        d(this, $, s.position + s.size + r);
      } else
        d(this, $, t(this, p));
      if (t(this, I).current && t(this, c).length) {
        const s = t(this, c)[t(this, w).current];
        t(this, l).set(s.position, !0);
      } else
        t(this, l).set(e * t(this, p), !0);
    }), h(this, gt, () => {
      const e = this.currentScrollValue;
      if (d(this, G, Math.max(0, e - t(this, p))), t(this, c).length) {
        let s = 0;
        for (let i = 0; i < t(this, c).length; i++) {
          const r = t(this, c)[i];
          r.transform(), // this.targetScrollValue + this.viewportSize / 2 >=
          this.targetScrollValue + this.viewportSize / 2 >= r.position && (s = i);
        }
        t(this, w).current = s;
      } else
        this.vertical ? t(this, u).style.transform = `translate3d(0px, ${e * -1}px, 0px)` : t(this, u).style.transform = `translate3d(${e * -1}px, 0px, 0px)`;
      H.update(this, t(this, C).current, e);
    }), h(this, it, (e) => {
      if (typeof e == "number")
        if (t(this, I).current) {
          const s = Math.sign(e);
          t(this, c).length ? this.shiftSections(s) : t(this, l).shift(s * t(this, _));
        } else
          t(this, l).shift(e);
      else
        e === "min" ? t(this, l).set(t(this, l).min) : e === "max" && t(this, l).set(t(this, l).length);
    }), At && (d(this, l, new Ft(0, {
      damping: 0.01,
      min: 0,
      order: Zt.SCROLL
    })), this.openShadow(jt), Ot(this, {
      tabIndex: 0,
      children: [
        Ct({
          class: "static",
          children: [bt({ name: "static" })]
        }),
        Ct({
          class: "content",
          children: [bt({ ref: (e) => d(this, ut, e) })],
          style: {
            flexDirection: new Kt(
              t(this, C),
              (e) => e === "x" ? "row" : "column"
            )
          },
          ref: (e) => d(this, u, e)
        })
      ]
    }), d(this, W, new Gt({ element: this })), t(this, W).changeEvent.subscribe(t(this, it)), d(this, F, new Ut({ element: this })), t(this, F).changeEvent.subscribe(t(this, it)), t(this, C).subscribe(({ current: e }) => {
      t(this, u).style.flexDirection = e === "x" ? "row" : "column", t(this, W).axis = t(this, Q).current ? "max" : e, this.isConnected && t(this, R).call(this);
    }), t(this, Q).subscribe((e) => {
      t(this, W).axis = e.current ? "max" : t(this, C).current;
    }), t(this, T).subscribe(() => {
      this.isConnected && t(this, R).call(this);
    }), t(this, O).subscribe(({ current: e }) => {
      this.isConnected && (e ? m(this, q, pt).call(this) : m(this, B, J).call(this));
    }), t(this, I).subscribe((e) => {
      t(this, w).current = 0, t(this, W).debounce = e.current, t(this, l).reset(), this.isConnected && (e.current && !e.previous ? m(this, q, pt).call(this) : !e.current && e.previous && m(this, B, J).call(this));
    }), t(this, k).subscribe((e) => {
      e.current ? (this.isConnected && (t(this, c).length || (t(this, O).current = !0)), t(this, c).length && (t(this, l).max = 1 / 0, t(this, l).min = -1 / 0)) : (d(this, G, 0), t(this, l).max = t(this, p), t(this, l).min = 0);
    }), t(this, K).subscribe((e) => {
      t(this, l).damping = e.current;
    }), t(this, X).subscribe((e) => {
      e.current && !e.previous ? m(this, ft, Wt).call(this) : !e.current && e.previous && m(this, dt, yt).call(this);
    }), t(this, Y).subscribe((e) => {
      e.current && !e.previous ? m(this, et, _t).call(this) : !e.current && e.previous && m(this, st, St).call(this);
    }));
  }
  get dampingAttribute() {
    return t(this, K);
  }
  get axisAttibute() {
    return t(this, C);
  }
  get pagesAttibute() {
    return t(this, T);
  }
  get splitAttibute() {
    return t(this, O);
  }
  get sectionalAttibute() {
    return t(this, I);
  }
  get infiniteAttribute() {
    return t(this, k);
  }
  get dampingAttibute() {
    return t(this, K);
  }
  get disabledAttibute() {
    return t(this, X);
  }
  get hibernatedAttibute() {
    return t(this, Y);
  }
  get currentScrollValue() {
    return m(this, rt, Et).call(this, "current");
  }
  get targetScrollValue() {
    return m(this, rt, Et).call(this, "target");
  }
  get contentElement() {
    return t(this, u);
  }
  get position() {
    return t(this, j);
  }
  get contentPosition() {
    return t(this, tt);
  }
  get viewportSize() {
    return t(this, _);
  }
  get scrollSize() {
    return t(this, p);
  }
  get gap() {
    return t(this, z);
  }
  get counter() {
    return t(this, w);
  }
  get distance() {
    return t(this, $);
  }
  get overscroll() {
    return t(this, G);
  }
  get vertical() {
    return t(this, C).current === "y";
  }
  get currentProgress() {
    return this.currentScrollValue / t(this, $) || 0;
  }
  get targetProgress() {
    return this.targetScrollValue / t(this, $) || 0;
  }
  get speed() {
    return t(this, l).speed;
  }
  get direction() {
    return t(this, l).direction;
  }
  get isRunning() {
    return t(this, l).isRunning;
  }
  onScroll(...e) {
    return t(this, l).subscribe(...e);
  }
  offScroll(...e) {
    t(this, l).unsubscribe(...e);
  }
  get context() {
    return {
      currentScrollValue: this.currentScrollValue,
      targetScrollValue: this.targetScrollValue,
      contentElement: this.contentElement,
      position: this.position,
      contentPosition: this.contentPosition,
      viewportSize: this.viewportSize,
      scrollSize: this.scrollSize,
      gap: this.gap,
      counter: this.counter,
      distance: this.distance,
      overscroll: this.overscroll,
      vertical: this.vertical,
      currentProgress: this.currentProgress,
      targetProgress: this.targetProgress,
      speed: this.speed,
      direction: this.direction,
      isRunning: this.isRunning,
      range: this.range,
      curve: this.curve,
      visible: this.visible
    };
  }
  //https://github.com/pmndrs/drei/blob/d3282cdd02d170ef603a5e096505d83dc93cd57a/src/web/ScrollControls.tsx#L85C7-L100C9
  range(e, s, i = 0) {
    const r = e - i, a = r + s + i * 2;
    return this.currentProgress < r ? 0 : this.currentProgress > a ? 1 : (this.currentProgress - r) / (a - r);
  }
  curve(e, s, i = 0) {
    return Math.sin(this.range(e, s, i) * Math.PI);
  }
  visible(e, s, i = 0) {
    const r = e - i, a = r + s + i * 2;
    return this.currentProgress >= r && this.currentProgress <= a;
  }
  // TODO: Поправить значение когда скролл не секционный ??
  scrollToSection(e, s = "smooth") {
    if (!t(this, c).length)
      return;
    const i = t(this, w).current;
    m(this, xt, Dt).call(this, e);
    const r = t(this, c)[i], a = t(this, c)[t(this, w).current];
    if (r && a) {
      let f = 0;
      const v = t(this, c).length - 1;
      t(this, k).current ? t(this, w).current === 0 && i === v ? f = t(this, p) + t(this, _) - r.position + t(this, z) : t(this, w).current === v && i === 0 ? f = a.position - (t(this, p) + t(this, _) + t(this, z)) : f = a.position - r.position : f = a.position - r.position, t(this, l).shift(f, s === "instant");
    }
  }
  shiftSections(e, s = "smooth") {
    t(this, c).length && this.scrollToSection(t(this, w).current + e, s);
  }
  setPosition(e, s = "smooth") {
    t(this, l).set(e, s === "instant");
  }
  connectedCallback() {
    m(this, st, St).call(this);
  }
  disconnectedCallback() {
    m(this, et, _t).call(this);
  }
};
l = /* @__PURE__ */ new WeakMap();
C = /* @__PURE__ */ new WeakMap();
T = /* @__PURE__ */ new WeakMap();
O = /* @__PURE__ */ new WeakMap();
I = /* @__PURE__ */ new WeakMap();
Q = /* @__PURE__ */ new WeakMap();
k = /* @__PURE__ */ new WeakMap();
K = /* @__PURE__ */ new WeakMap();
X = /* @__PURE__ */ new WeakMap();
Y = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakMap();
ut = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakMap();
j = /* @__PURE__ */ new WeakMap();
tt = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
z = /* @__PURE__ */ new WeakMap();
W = /* @__PURE__ */ new WeakMap();
F = /* @__PURE__ */ new WeakMap();
w = /* @__PURE__ */ new WeakMap();
G = /* @__PURE__ */ new WeakMap();
$ = /* @__PURE__ */ new WeakMap();
q = /* @__PURE__ */ new WeakSet();
pt = function() {
  m(this, B, J).call(this), t(this, ut).assignedElements().forEach((e) => {
    e instanceof HTMLElement && t(this, c).push(new Yt(e, this));
  }), t(this, u).style.transform = "", t(this, R).call(this);
};
B = /* @__PURE__ */ new WeakSet();
J = function() {
  t(this, c).forEach((e) => {
    e.destroy();
  }), d(this, c, []);
};
ft = /* @__PURE__ */ new WeakSet();
Wt = function() {
  t(this, l).unsubscribe(t(this, gt)), t(this, l).stopAnimation(), t(this, W).disconnect(), t(this, F).disconnect();
};
dt = /* @__PURE__ */ new WeakSet();
yt = function() {
  t(this, l).subscribe(t(this, gt)), t(this, W).connect(), t(this, F).connect();
};
et = /* @__PURE__ */ new WeakSet();
_t = function() {
  ct.unsubscribe(t(this, R)), t(this, l).reset(), m(this, ft, Wt).call(this), t(this, u).style.transform = "", t(this, O).current && m(this, B, J).call(this), H.unregister(this);
};
st = /* @__PURE__ */ new WeakSet();
St = function() {
  t(this, O).current && m(this, q, pt).call(this), H.register(this), ct.subscribe(t(this, R), $t.SCROLL), m(this, dt, yt).call(this);
};
R = /* @__PURE__ */ new WeakMap();
gt = /* @__PURE__ */ new WeakMap();
xt = /* @__PURE__ */ new WeakSet();
Dt = function(e) {
  t(this, k).current ? (t(this, w).current = e % t(this, c).length, t(this, w).current = t(this, w).current < 0 ? t(this, c).length + t(this, w).current : t(this, w).current) : t(this, w).current = zt(e, 0, t(this, c).length - 1);
};
it = /* @__PURE__ */ new WeakMap();
rt = /* @__PURE__ */ new WeakSet();
Et = function(e = "current") {
  if (t(this, k).current && t(this, c).length) {
    const s = t(this, l)[e] % (t(this, p) + t(this, _) + t(this, z));
    return s < 0 ? t(this, p) + s + t(this, _) + t(this, z) : s;
  } else
    return t(this, l)[e];
};
mt = Xt([
  Vt("e-scroll")
], mt);
var N;
class te extends Lt {
  constructor() {
    super(...arguments);
    D(this, N, null);
  }
  get scrollElement() {
    return n(this, N);
  }
  connectedCallback() {
    const i = Jt(this, mt);
    i instanceof mt ? V(this, N, i) : console.error(this, "e-scroll not found");
  }
}
N = new WeakMap();
var ee = Object.defineProperty, se = Object.getOwnPropertyDescriptor, ie = (e, s, i, r) => {
  for (var a = r > 1 ? void 0 : r ? se(s, i) : s, f = e.length - 1, v; f >= 0; f--)
    (v = e[f]) && (a = (r ? v(s, i, a) : v(a)) || a);
  return r && a && ee(s, i, a), a;
}, Tt = (e, s, i) => {
  if (!s.has(e))
    throw TypeError("Cannot " + i);
}, o = (e, s, i) => (Tt(e, s, "read from private field"), i ? i.call(e) : s.get(e)), x = (e, s, i) => {
  if (s.has(e))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(e) : s.set(e, i);
}, M = (e, s, i, r) => (Tt(e, s, "write to private field"), r ? r.call(e, i) : s.set(e, i), i), nt, b, P, A, U, Z, ht, ot, lt, at;
const re = Rt({
  ":host": {
    display: "inline-block",
    zIndex: "1",
    backgroundColor: "#efefef"
  },
  ':host([axis="y"])': {
    position: "absolute",
    right: "0",
    top: "0",
    width: "1vmin",
    height: "100%"
  },
  ':host([axis="x"])': {
    position: "absolute",
    left: "0",
    bottom: "0",
    width: "100%",
    height: "1vmin"
  },
  ".default-thumb": {
    backgroundColor: "#181818",
    borderRadius: "1vmin",
    touchAction: "none"
  },
  "::slotted(*)": {
    touchAction: "none"
  }
});
let Pt = class extends te {
  constructor() {
    super(), x(this, nt, null), x(this, b, null), x(this, P, !1), x(this, A, 0), x(this, U, 0), x(this, Z, 0), x(this, ht, () => {
      M(this, P, this.offsetWidth > this.offsetHeight);
      const e = o(this, P) ? this.offsetWidth : this.offsetHeight;
      M(this, A, e / ((this.scrollElement.scrollSize + this.scrollElement.viewportSize) / e)), M(this, A, Math.max(o(this, A), 30)), o(this, P) ? (o(this, b).style.width = o(this, A) + "px", o(this, b).style.height = "100%") : (o(this, b).style.width = "100%", o(this, b).style.height = o(this, A) + "px"), M(this, U, e - o(this, A)), this.scrollElement.scrollSize || (this.style.display = "none");
    }), x(this, ot, () => {
      M(this, Z, this.scrollElement.currentProgress * o(this, U)), o(this, P) ? o(this, b).style.transform = `translate3d(${o(this, Z)}px, 0px, 0px)` : o(this, b).style.transform = `translate3d(0px, ${o(this, Z)}px, 0px)`;
    }), x(this, lt, () => {
      this.setAttribute("axis", this.scrollElement.axisAttibute.current);
    }), x(this, at, (e) => {
      const s = (f) => {
        const v = o(this, P) ? f.x : f.y, It = this.scrollElement.distance / o(this, U), Ht = (v - a) * It;
        this.scrollElement.setPosition(r + Ht);
      }, i = () => {
        removeEventListener("pointermove", s), removeEventListener("pointerup", i), removeEventListener("touchend", i);
      };
      addEventListener("pointermove", s), addEventListener("pointerup", i), addEventListener("touchend", i);
      const r = this.scrollElement.targetScrollValue, a = o(this, P) ? e.x : e.y;
    }), At && (this.openShadow(re), Ot(this, {
      children: [bt({ ref: (e) => M(this, nt, e) })]
    }));
  }
  get thumbElement() {
    return o(this, b);
  }
  connectedCallback() {
    super.connectedCallback();
    const e = o(this, nt).assignedElements()[0];
    e instanceof HTMLElement ? M(this, b, e) : (M(this, b, document.createElement("div")), o(this, b).classList.add("default-thumb"), this.shadowRoot.appendChild(o(this, b))), o(this, b).addEventListener("pointerdown", o(this, at)), ct.subscribe(o(this, ht), $t.SCROLL + 1), this.scrollElement.onScroll(o(this, ot)), this.scrollElement.axisAttibute.subscribe(o(this, lt));
  }
  disconnectedCallback() {
    o(this, b).removeEventListener("pointerdown", o(this, at)), ct.unsubscribe(o(this, ht)), this.scrollElement.offScroll(o(this, ot)), this.scrollElement.axisAttibute.unsubscribe(o(this, lt));
  }
};
nt = /* @__PURE__ */ new WeakMap();
b = /* @__PURE__ */ new WeakMap();
P = /* @__PURE__ */ new WeakMap();
A = /* @__PURE__ */ new WeakMap();
U = /* @__PURE__ */ new WeakMap();
Z = /* @__PURE__ */ new WeakMap();
ht = /* @__PURE__ */ new WeakMap();
ot = /* @__PURE__ */ new WeakMap();
lt = /* @__PURE__ */ new WeakMap();
at = /* @__PURE__ */ new WeakMap();
Pt = ie([
  Vt("e-scrollbar")
], Pt);
export {
  mt as ScrollElement,
  Pt as ScrollbarElement
};
