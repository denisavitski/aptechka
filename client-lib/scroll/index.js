var Me = Object.defineProperty;
var de = Object.getOwnPropertySymbols;
var Re = Object.prototype.hasOwnProperty, Oe = Object.prototype.propertyIsEnumerable;
var pe = (f, n, e) => n in f ? Me(f, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : f[n] = e, Se = (f, n) => {
  for (var e in n || (n = {}))
    Re.call(n, e) && pe(f, e, n[e]);
  if (de)
    for (var e of de(n))
      Oe.call(n, e) && pe(f, e, n[e]);
  return f;
};
var Ys = (f, n, e) => {
  if (!n.has(f))
    throw TypeError("Cannot " + e);
};
var t = (f, n, e) => (Ys(f, n, "read from private field"), e ? e.call(f) : n.get(f)), i = (f, n, e) => {
  if (n.has(f))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(f) : n.set(f, e);
}, r = (f, n, e, s) => (Ys(f, n, "write to private field"), s ? s.call(f, e) : n.set(f, e), e);
var o = (f, n, e) => (Ys(f, n, "access private method"), e);
import { S as kt } from "../Store-Qr3SNOSf.js";
import { D as Ae } from "../Derived-rInkx3e4.js";
import { i as le } from "../browser-0zX67oeU.js";
import { p as Te } from "../easings-BKi40vHz.js";
import { a as $s, g as Bs } from "../layout-HoBT_Da2.js";
import { c as ge, s as He } from "../math-BOBiC4TN.js";
import "../ticker/index.js";
import { TICK_ORDER as ve, RESIZE_ORDER as ue } from "../order/index.js";
import { D as ye } from "../Damped-yrNXlkDE.js";
import { T as $e } from "../Tweened-CjgvoOwL.js";
import { WheelControls as Be, KeyboardControls as We, DragControls as qe, AutoplayControls as Ue } from "../controls/index.js";
import { windowResizer as ps } from "../window-resizer/index.js";
import { scrollEntries as Yt } from "../scroll-entries/index.js";
import { e as ae, D as te, ax as Ws, p as Ge } from "../tags-D0kLlFdQ.js";
import { c as fe } from "../createStylesheet-BrFGJ8Q7.js";
import { cssUnitParser as me } from "../css-unit-parser/index.js";
import { CSSProperty as c } from "../css-property/index.js";
import { d as Ne } from "../Viewport-Cgtq2I_K.js";
import { elementResizer as qs } from "../element-resizer/index.js";
import { s as Ke } from "../gestures-D2Fdra_G.js";
import { aptechkaTheme as be } from "../theme/index.js";
import { f as _e } from "../dom-P5QbAASX.js";
import { d as Ce } from "../function-C10DGppn.js";
var S, ms, v, Mt, _, ft;
class Ze {
  constructor(n, e, s) {
    i(this, S, void 0);
    i(this, ms, void 0);
    i(this, v, void 0);
    i(this, Mt, 0);
    i(this, _, 0);
    i(this, ft, null);
    r(this, S, n), r(this, ms, e), r(this, v, s), Yt.register(t(this, S));
  }
  get index() {
    return t(this, ms);
  }
  get size() {
    return t(this, Mt);
  }
  get position() {
    return t(this, _);
  }
  destroy() {
    Yt.unregister(t(this, S)), t(this, S).style.transform = "", this.mark(null);
  }
  setSize(n) {
    n ? (t(this, S).style.setProperty("--size", n + "px"), t(this, v).axisCSSProperty.current === "x" ? (t(this, S).style.width = n + "px", t(this, S).style.height = "") : (t(this, S).style.height = n + "px", t(this, S).style.width = "")) : (t(this, S).style.width = "", t(this, S).style.height = "", t(this, S).style.removeProperty("--size"));
  }
  resize() {
    r(this, Mt, t(this, v).vertical ? t(this, S).offsetHeight : t(this, S).offsetWidth), r(this, _, t(this, v).vertical ? $s(t(this, S)) : Bs(t(this, S))), r(this, _, t(this, _) - t(this, v).contentPosition);
  }
  transform() {
    let n = 0;
    const e = t(this, v).viewportSize * t(this, v).sectionDistanceScaleCSSProperty.current;
    t(this, v).loopCSSProperty.current && t(this, v).overscroll && t(this, _) + t(this, Mt) < t(this, v).currentScrollValue && (n = t(this, v).distance * -1 - t(this, v).gap), Yt.update(
      t(this, S),
      t(this, v).axisCSSProperty.current,
      n
    );
    const s = t(this, v).currentScrollValue + n, h = t(this, _) - t(this, v).viewportSize - e, u = t(this, _) + t(this, Mt) + e, m = ge(s, h, u);
    t(this, v).vertical ? t(this, S).style.transform = `translate3d(0px, ${m * -1}px, 0px)` : t(this, S).style.transform = `translate3d(${m * -1}px, 0px, 0px)`;
  }
  mark(n) {
    t(this, ft) !== n && (t(this, ft) && t(this, S).classList.remove(t(this, ft)), n && t(this, S).classList.add(n), r(this, ft, n), t(this, S).dispatchEvent(
      new CustomEvent(
        "sectionsChange",
        {
          composed: !0,
          detail: {
            mark: t(this, ft)
          }
        }
      )
    ));
  }
}
S = new WeakMap(), ms = new WeakMap(), v = new WeakMap(), Mt = new WeakMap(), _ = new WeakMap(), ft = new WeakMap();
const je = fe({
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
    position: "var(--static-position, absolute)",
    top: "var(--static-top, 0)",
    left: "var(--static-left, 0)",
    width: "var(--static-width, 100%)",
    height: "var(--static-height, 100%)"
  },
  ".content": {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%",
    gap: "var(--gap, 0px)",
    willChange: "var(--will-change, transform)"
  },
  ':host([hibernated="true"]) .content': {
    display: "contents"
  },
  "::slotted(*)": {
    flexShrink: "0"
  }
});
var a, Rt, z, Z, j, W, J, dt, pt, q, F, Ot, At, Tt, Ht, es, U, $t, St, G, mt, Q, bt, Bt, Wt, qt, p, bs, l, gs, vs, C, b, M, N, gt, X, x, g, is, vt, Ut, Gt, rs, Y, Nt, Ss, yt, ss, ys, ee, Cs, ie, Ps, re, ws, he, R, Es, Us, Pe, hs, xs, Ls, ne, tt, Dt, Vs, oe;
class se extends HTMLElement {
  constructor() {
    super();
    i(this, Nt);
    i(this, yt);
    i(this, ys);
    i(this, Cs);
    i(this, Ps);
    i(this, ws);
    i(this, Us);
    i(this, Ls);
    i(this, tt);
    i(this, Vs);
    i(this, a, null);
    i(this, Rt, new c(this, "--controls", !0));
    i(this, z, new c(this, "--axis", "y"));
    i(this, Z, new c(this, "--direction", 0));
    i(this, j, new c(this, "--pages", 0, {
      validate: (e) => Math.max(0, e - 1)
    }));
    i(this, W, new c(this, "--split", !1));
    i(this, J, new c(this, "--sectional", !1));
    i(this, dt, new c(this, "--auto-size", !1));
    i(this, pt, new c(
      this,
      "--wheel-max-delta",
      !1
    ));
    i(this, q, new c(
      this,
      "--sections-in-view",
      1
    ));
    i(this, F, new c(this, "--loop", !1));
    i(this, Ot, new c(this, "--damping", 20));
    i(this, At, new c(this, "--mass", 0));
    i(this, Tt, new c(this, "--stiffness", 0));
    i(this, Ht, new c(this, "--mouse-drag", !1));
    i(this, es, new c(
      this,
      "--section-distance-scale",
      0.5
    ));
    i(this, U, new c(this, "--autoplay", 0));
    i(this, $t, new c(
      this,
      "--autoplay-pause-duration",
      0
    ));
    i(this, St, new c(
      this,
      "--autoplay-user-direction",
      !1
    ));
    i(this, G, new c(this, "--classes", 0));
    i(this, mt, new c(
      this,
      "--current-index-start-offset",
      0
    ));
    i(this, Q, new c(
      this,
      "--current-index-end-offset",
      0
    ));
    i(this, bt, new c(this, "--focus-delay", 0));
    i(this, Bt, new c(
      this,
      "--focus-duration",
      3e3
    ));
    i(this, Wt, new c(this, "--disabled", !1));
    i(this, qt, new c(this, "--hibernated", !1));
    i(this, p, null);
    i(this, bs, null);
    i(this, l, []);
    i(this, gs, 0);
    i(this, vs, 0);
    i(this, C, 0);
    i(this, b, 0);
    i(this, M, 0);
    i(this, N, null);
    i(this, gt, null);
    i(this, X, null);
    i(this, x, null);
    i(this, g, new kt(0));
    i(this, is, 0);
    i(this, vt, 0);
    i(this, Ut, !0);
    i(this, Gt, !0);
    i(this, rs, void 0);
    i(this, Y, new $e());
    i(this, R, () => {
      t(this, a).unlistenAnimationFrame();
      const e = this.currentScrollValue / t(this, b) || 0, s = t(this, g).current;
      if (r(this, gs, this.vertical ? $s(this) : Bs(this)), r(this, vs, this.vertical ? $s(t(this, p)) : Bs(t(this, p))), r(this, C, this.vertical ? this.offsetHeight : this.offsetWidth), this.vertical ? r(this, M, me.parse(
        getComputedStyle(t(this, p)).rowGap
      )) : r(this, M, me.parse(
        getComputedStyle(t(this, p)).columnGap
      )), t(this, dt).current && t(this, l).length) {
        const h = t(this, q).current, u = (t(this, C) - t(this, M) * (h - 1)) / h;
        t(this, l).forEach((m) => {
          m.setSize(u);
        });
      } else
        t(this, l).forEach((h) => {
          h.setSize();
        });
      if (t(this, l).forEach((h) => {
        h.resize();
      }), t(this, j).current) {
        r(this, b, t(this, C) * t(this, j).current);
        const h = t(this, b) + t(this, C);
        this.vertical ? (t(this, p).style.width = h + "px", t(this, p).style.height = "100%") : (t(this, p).style.height = h + "px", t(this, p).style.width = "100%");
      } else
        this.vertical ? (t(this, p).style.width = "100%", t(this, p).style.height = "max-content", r(this, b, t(this, p).offsetHeight - t(this, C))) : (t(this, p).style.width = "max-content", t(this, p).style.height = "100%", r(this, b, t(this, p).offsetWidth - t(this, C)));
      if (!t(this, F).current) {
        const h = getComputedStyle(this), u = this.vertical ? parseFloat(h.paddingBlockStart) + parseFloat(h.paddingBlockEnd) : parseFloat(h.paddingInlineStart) + parseFloat(h.paddingInlineEnd);
        r(this, b, t(this, b) + u), t(this, a).max = t(this, b);
      }
      if (t(this, F).current && t(this, l).length) {
        const h = t(this, l)[t(this, l).length - 1], u = h.position + h.size - t(this, C), m = t(this, b) - u;
        r(this, vt, h.position + h.size + m);
      } else
        r(this, vt, t(this, b));
      if (t(this, J).current && t(this, l).length) {
        const h = t(this, l)[s];
        t(this, a).set(h.position, {
          equalize: !0
        });
      } else
        t(this, a).set(e * t(this, b), {
          equalize: !0
        });
    });
    i(this, Es, () => {
      const e = this.currentScrollValue;
      if (r(this, is, Math.max(0, e - t(this, b))), t(this, l).length) {
        let s = 0;
        for (let h = 0; h < t(this, l).length; h++) {
          const u = t(this, l)[h];
          u.transform(), this.targetScrollValue + u.size / 2 >= u.position && (s = h);
        }
        t(this, g).current = s;
      } else
        this.vertical ? t(this, p).style.transform = `translate3d(0px, ${e * -1}px, 0px)` : t(this, p).style.transform = `translate3d(${e * -1}px, 0px, 0px)`;
      Yt.update(
        this,
        t(this, z).current,
        e
      );
    });
    i(this, hs, (e, s) => {
      t(this, Rt).current && (t(this, St).current && (t(this, x).pauseAndContinue(
        t(this, $t).current
      ), t(this, x).direction = Math.sign(s) || 1), t(this, xs).call(this, e, s));
    });
    i(this, xs, (e, s) => {
      if (t(this, Z).current) {
        if (t(this, Z).current < 0 && s > 0)
          return;
        if (t(this, Z).current > 0 && s < 0)
          return;
      }
      if (t(this, Y).unlistenAnimationFrame(), !t(this, U).current && t(this, bt).current && (clearInterval(t(this, rs)), r(this, rs, setTimeout(() => {
        const h = o(this, Vs, oe).call(this);
        h && this.scrollToSection(h.index, {
          tween: {
            duration: t(this, Bt).current,
            easing: Te
          }
        });
      }, t(this, bt).current))), !(e === "drag" && !Ne.isMobile && !t(this, Ht).current))
        if (t(this, J).current) {
          const h = Math.sign(s);
          t(this, l).length ? this.shiftSections(h) : t(this, a).shift(h * t(this, C));
        } else
          t(this, a).shift(s);
    });
    le && (r(this, a, new ye(0, {
      damping: 0.01,
      min: 0,
      order: ve.SCROLL
    })), this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(je), ae(this, {
      tabIndex: 0,
      children: [
        te({
          class: "static",
          children: [Ws({ name: "static" })]
        }),
        te({
          class: "content",
          children: [Ws({ ref: (s) => r(this, bs, s) })],
          style: {
            flexDirection: new Ae(
              t(this, z),
              (s) => s === "x" ? "row" : "column"
            )
          },
          ref: (s) => r(this, p, s)
        })
      ]
    }), r(this, N, new Be({ element: t(this, p) })), t(this, N).changeEvent.subscribe(
      t(this, hs)
    ), r(this, gt, new We({
      element: this
    })), t(this, gt).changeEvent.subscribe(
      t(this, hs)
    ), r(this, X, new qe({ element: t(this, p) })), t(this, X).changeEvent.subscribe(t(this, hs)), r(this, x, new Ue({
      culling: this
    })), t(this, x).changeEvent.subscribe(t(this, xs)), t(this, z).subscribe(({ current: s }) => {
      t(this, p).style.flexDirection = s === "x" ? "row" : "column", t(this, N).axis = t(this, pt).current ? "max" : s, t(this, gt).dimension = s === "x" ? "width" : "height", t(this, X).axis = s, s === "x" ? this.style.touchAction = "pan-y" : s === "y" && (this.style.touchAction = "pan-x"), this.isConnected && t(this, R).call(this);
    }), t(this, pt).subscribe((s) => {
      t(this, N).axis = s.current ? "max" : t(this, z).current;
    }), t(this, j).subscribe(() => {
      this.isConnected && t(this, R).call(this);
    }), t(this, W).subscribe(({ current: s }) => {
      this.isConnected && (s ? o(this, Nt, Ss).call(this) : o(this, yt, ss).call(this));
    }), t(this, J).subscribe((s) => {
      t(this, N).debounce = s.current, t(this, X).swipe = s.current, t(this, x).interval = s.current, this.isConnected && (s.current && !s.previous && !t(this, l).length ? o(this, Nt, Ss).call(this) : !s.current && s.previous && t(this, l).length && o(this, yt, ss).call(this));
    }), t(this, dt).subscribe((s) => {
      this.isConnected && (t(this, R).call(this), s.current && !s.previous && !t(this, l).length ? o(this, Nt, Ss).call(this) : !s.current && s.previous && t(this, l).length && o(this, yt, ss).call(this));
    }), t(this, q).subscribe((s) => {
      this.isConnected && (t(this, R).call(this), o(this, tt, Dt).call(this));
    }), t(this, F).subscribe((s) => {
      s.current ? (this.isConnected && (t(this, l).length || (t(this, W).current = !0)), t(this, l).length && (t(this, a).max = 1 / 0, t(this, a).min = -1 / 0)) : (r(this, is, 0), t(this, a).max = t(this, b), t(this, a).min = 0);
    }), t(this, Ot).subscribe((s) => {
      t(this, a).damping = s.current;
    }), t(this, At).subscribe((s) => {
      t(this, a).mass = s.current;
    }), t(this, Tt).subscribe((s) => {
      t(this, a).stiffness = s.current;
    }), t(this, Wt).subscribe((s) => {
      s.current && !s.previous ? o(this, ys, ee).call(this) : !s.current && s.previous && o(this, Cs, ie).call(this);
    }), t(this, qt).subscribe((s) => {
      s.current && !s.previous ? o(this, Ps, re).call(this) : !s.current && s.previous && o(this, ws, he).call(this);
    }), t(this, U).subscribe((s) => {
      t(this, x).speed = s.current, s.current && !s.previous ? t(this, x).connect() : !s.current && s.previous && t(this, x).disconnect();
    }), t(this, St).subscribe((s) => {
      s.current || (t(this, x).direction = 1);
    }), t(this, G).subscribe((s) => {
      this.isConnected && o(this, tt, Dt).call(this);
    }), t(this, mt).subscribe((s) => {
      this.isConnected && t(this, G).current && o(this, tt, Dt).call(this);
    }), t(this, Q).subscribe((s) => {
      this.isConnected && t(this, G).current && o(this, tt, Dt).call(this);
    }), t(this, a).isRunning.subscribe((s) => {
      this.classList.toggle("active", s.current);
    }), t(this, g).subscribe((s) => {
      t(this, l).length && o(this, tt, Dt).call(this);
    }), t(this, Y).subscribe((s) => {
      t(this, Y).isRunning.current && t(this, a).set(s.current);
    }));
  }
  get damped() {
    return t(this, a);
  }
  get controlsCSSProperty() {
    return t(this, Rt);
  }
  get axisCSSProperty() {
    return t(this, z);
  }
  get directionCSSProperty() {
    return t(this, Z);
  }
  get pagesCSSProperty() {
    return t(this, j);
  }
  get splitCSSProperty() {
    return t(this, W);
  }
  get sectionalCSSProperty() {
    return t(this, J);
  }
  get autoSizeCSSProperty() {
    return t(this, dt);
  }
  get wheelMaxDeltaCSSProperty() {
    return t(this, pt);
  }
  get sectionsInViewCSSProperty() {
    return t(this, q);
  }
  get loopCSSProperty() {
    return t(this, F);
  }
  get dampingCSSProperty() {
    return t(this, Ot);
  }
  get massCSSProperty() {
    return t(this, At);
  }
  get stiffnessCSSProperty() {
    return t(this, Tt);
  }
  get mouseDragCSSProperty() {
    return t(this, Ht);
  }
  get sectionDistanceScaleCSSProperty() {
    return t(this, es);
  }
  get autoplayCSSProperty() {
    return t(this, U);
  }
  get autoplayPauseDurationCSSProperty() {
    return t(this, $t);
  }
  get autoplayUserDirectionCSSProperty() {
    return t(this, St);
  }
  get classesCSSProperty() {
    return t(this, G);
  }
  get currentIndexStartOffsetCSSProperty() {
    return t(this, mt);
  }
  get currentIndexEndOffsetCSSProperty() {
    return t(this, Q);
  }
  get focusDelayCSSProperty() {
    return t(this, bt);
  }
  get focusDurationCSSProperty() {
    return t(this, Bt);
  }
  get disabledCSSProperty() {
    return t(this, Wt);
  }
  get hibernatedCSSProperty() {
    return t(this, qt);
  }
  get currentScrollValue() {
    return o(this, Ls, ne).call(this, "current");
  }
  get targetScrollValue() {
    return o(this, Ls, ne).call(this, "target");
  }
  get contentElement() {
    return t(this, p);
  }
  get sections() {
    return t(this, l);
  }
  get position() {
    return t(this, gs);
  }
  get contentPosition() {
    return t(this, vs);
  }
  get viewportSize() {
    return t(this, C);
  }
  get scrollSize() {
    return t(this, b);
  }
  get gap() {
    return t(this, M);
  }
  get counter() {
    return t(this, g);
  }
  get limit() {
    return t(this, l).length - t(this, q).current;
  }
  get distance() {
    return t(this, vt);
  }
  get loopDistance() {
    return t(this, F).current ? t(this, vt) + t(this, M) : t(this, vt);
  }
  get overscroll() {
    return t(this, is);
  }
  get vertical() {
    return t(this, z).current === "y";
  }
  get currentProgress() {
    return this.currentScrollValue / this.loopDistance || 0;
  }
  get targetProgress() {
    return this.targetScrollValue / this.loopDistance || 0;
  }
  get scrollWidth() {
    return t(this, z).current === "y" ? 0 : t(this, a).distance;
  }
  get scrollHeight() {
    return t(this, z).current === "x" ? 0 : t(this, a).distance;
  }
  onScroll(...e) {
    return t(this, a).subscribe(...e);
  }
  offScroll(...e) {
    t(this, a).unsubscribe(...e);
  }
  //https://github.com/pmndrs/drei/blob/d3282cdd02d170ef603a5e096505d83dc93cd57a/src/web/ScrollControls.tsx#L85C7-L100C9
  range(e, s, h = 0) {
    const u = e - h, m = u + s + h * 2;
    return this.currentProgress < u ? 0 : this.currentProgress > m ? 1 : (this.currentProgress - u) / (m - u);
  }
  curve(e, s, h = 0) {
    return Math.sin(this.range(e, s, h) * Math.PI);
  }
  visible(e, s, h = 0) {
    const u = e - h, m = u + s + h * 2;
    return this.currentProgress >= u && this.currentProgress <= m;
  }
  scrollToSection(e, s) {
    if (!t(this, l).length)
      return;
    const h = t(this, g).current;
    o(this, Us, Pe).call(this, e);
    const u = t(this, l)[h], m = t(this, l)[t(this, g).current];
    if (u && m) {
      let I = 0;
      const ts = o(this, Vs, oe).call(this), Ie = ts ? this.targetScrollValue - ts.position : 0;
      t(this, F).current ? t(this, g).current === 0 && h === t(this, l).length - 1 ? I = t(this, b) + t(this, C) - u.position + t(this, M) : t(this, g).current === t(this, l).length - 1 && h === 0 ? I = m.position - (t(this, b) + t(this, C) + t(this, M)) : I = m.position - u.position : I = m.position - u.position, this.shiftPosition(I - Ie, s);
    }
  }
  shiftSections(e, s) {
    t(this, l).length && this.scrollToSection(t(this, g).current + e, s);
  }
  setPosition(e, s) {
    s != null && s.tween ? (t(this, Y).set(t(this, a).current, { equalize: !0 }), t(this, Y).set(e, Se({}, s.tween))) : t(this, a).set(e, {
      equalize: (s == null ? void 0 : s.behaviour) === "instant"
    });
  }
  shiftPosition(e, s) {
    this.setPosition(t(this, a).target + e, s);
  }
  connectedCallback() {
    t(this, Rt).observe(), t(this, z).observe(), t(this, Z).observe(), t(this, j).observe(), t(this, W).observe(), t(this, J).observe(), t(this, dt).observe(), t(this, pt).observe(), t(this, q).observe(), t(this, F).observe(), t(this, Ot).observe(), t(this, At).observe(), t(this, Tt).observe(), t(this, Ht).observe(), t(this, es).observe(), t(this, U).observe(), t(this, U).observe(), t(this, $t).observe(), t(this, St).observe(), t(this, G).observe(), t(this, mt).observe(), t(this, Q).observe(), t(this, bt).observe(), t(this, Bt).observe(), t(this, Wt).observe(), t(this, qt).observe(), o(this, ws, he).call(this);
  }
  disconnectedCallback() {
    t(this, Rt).unobserve(), t(this, z).unobserve(), t(this, Z).unobserve(), t(this, j).unobserve(), t(this, W).unobserve(), t(this, J).unobserve(), t(this, dt).unobserve(), t(this, pt).unobserve(), t(this, q).unobserve(), t(this, F).unobserve(), t(this, Ot).unobserve(), t(this, At).unobserve(), t(this, Tt).unobserve(), t(this, Ht).unobserve(), t(this, es).unobserve(), t(this, U).unobserve(), t(this, $t).unobserve(), t(this, St).unobserve(), t(this, G).unobserve(), t(this, mt).unobserve(), t(this, Q).unobserve(), t(this, bt).unobserve(), t(this, Bt).unobserve(), t(this, Wt).unobserve(), t(this, qt).unobserve(), o(this, Ps, re).call(this);
  }
}
a = new WeakMap(), Rt = new WeakMap(), z = new WeakMap(), Z = new WeakMap(), j = new WeakMap(), W = new WeakMap(), J = new WeakMap(), dt = new WeakMap(), pt = new WeakMap(), q = new WeakMap(), F = new WeakMap(), Ot = new WeakMap(), At = new WeakMap(), Tt = new WeakMap(), Ht = new WeakMap(), es = new WeakMap(), U = new WeakMap(), $t = new WeakMap(), St = new WeakMap(), G = new WeakMap(), mt = new WeakMap(), Q = new WeakMap(), bt = new WeakMap(), Bt = new WeakMap(), Wt = new WeakMap(), qt = new WeakMap(), p = new WeakMap(), bs = new WeakMap(), l = new WeakMap(), gs = new WeakMap(), vs = new WeakMap(), C = new WeakMap(), b = new WeakMap(), M = new WeakMap(), N = new WeakMap(), gt = new WeakMap(), X = new WeakMap(), x = new WeakMap(), g = new WeakMap(), is = new WeakMap(), vt = new WeakMap(), Ut = new WeakMap(), Gt = new WeakMap(), rs = new WeakMap(), Y = new WeakMap(), Nt = new WeakSet(), Ss = function() {
  o(this, yt, ss).call(this), t(this, bs).assignedElements().forEach((e, s) => {
    e instanceof HTMLElement && t(this, l).push(new Ze(e, s, this));
  }), t(this, p).style.transform = "", this.dispatchEvent(
    new CustomEvent("sectionsChange", {
      composed: !0
    })
  ), t(this, R).call(this), o(this, tt, Dt).call(this);
}, yt = new WeakSet(), ss = function() {
  t(this, l).forEach((e) => {
    e.destroy();
  }), r(this, l, []), t(this, g).current = 0, t(this, a).reset(), this.dispatchEvent(
    new CustomEvent("sectionsChange", {
      composed: !0
    })
  );
}, ys = new WeakSet(), ee = function() {
  t(this, Ut) || (r(this, Ut, !0), t(this, a).unsubscribe(t(this, Es)), t(this, a).unlistenAnimationFrame(), t(this, N).disconnect(), t(this, gt).disconnect(), t(this, X).disconnect(), t(this, x).disconnect(), clearInterval(t(this, rs)), t(this, Y).unlistenAnimationFrame());
}, Cs = new WeakSet(), ie = function() {
  t(this, Ut) && (r(this, Ut, !1), t(this, a).subscribe(t(this, Es)), t(this, N).connect(), t(this, gt).connect(), t(this, X).connect(), t(this, U).current && t(this, x).connect());
}, Ps = new WeakSet(), re = function() {
  t(this, Gt) || (r(this, Gt, !0), ps.unsubscribe(t(this, R)), qs.unsubscribe(t(this, R)), t(this, a).reset(), o(this, ys, ee).call(this), t(this, p).style.transform = "", t(this, W).current && o(this, yt, ss).call(this), Yt.unregister(this));
}, ws = new WeakSet(), he = function() {
  t(this, Gt) && (r(this, Gt, !1), t(this, W).current && o(this, Nt, Ss).call(this), Yt.register(this), ps.subscribe(t(this, R), ue.SCROLL), qs.subscribe(this, t(this, R)), o(this, Cs, ie).call(this));
}, R = new WeakMap(), Es = new WeakMap(), Us = new WeakSet(), Pe = function(e) {
  t(this, F).current ? (t(this, g).current = e % t(this, l).length, t(this, g).current = t(this, g).current < 0 ? t(this, l).length + t(this, g).current : t(this, g).current) : t(this, g).current = ge(e, 0, this.limit);
}, hs = new WeakMap(), xs = new WeakMap(), Ls = new WeakSet(), ne = function(e = "current") {
  if (t(this, F).current && t(this, l).length) {
    const s = t(this, a)[e] % (t(this, b) + t(this, C) + t(this, M));
    return s < 0 ? t(this, b) + s + t(this, C) + t(this, M) : s;
  } else
    return t(this, a)[e];
}, tt = new WeakSet(), Dt = function() {
  if (t(this, G).current && t(this, l).length) {
    const e = t(this, g).current + t(this, mt).current;
    e === 0 ? this.classList.add("start") : this.classList.remove("start"), e === this.limit ? this.classList.add("end") : this.classList.remove("end");
    const s = t(this, q).current + t(this, Q).current;
    t(this, l).forEach((h, u) => {
      const m = e - this.limit - 1 + t(this, Q).current, I = e + s, ts = this.sections.length - I;
      u >= e && u < I || u <= m ? h.mark("current") : u >= I && u < I + ts / 2 || u <= m + s ? h.mark("next") : h.mark("previous");
    });
  }
}, Vs = new WeakSet(), oe = function() {
  let e = null, s = 1 / 0;
  for (let h = 0; h < t(this, l).length; h++) {
    const u = Math.abs(t(this, l)[h].position - this.targetScrollValue);
    u < s && (s = u, e = h);
  }
  return e !== null ? t(this, l)[e] : null;
};
customElements.get("e-scroll") || customElements.define("e-scroll", se);
var zs;
class Xs extends HTMLElement {
  constructor() {
    super(...arguments);
    i(this, zs, null);
  }
  get scrollElement() {
    return t(this, zs);
  }
  connectedCallback() {
    const e = _e(this, se);
    e instanceof se ? r(this, zs, e) : console.error(this, "e-scroll not found");
  }
}
zs = new WeakMap();
const Je = fe({
  ":host": {
    display: "inline-block",
    zIndex: "1",
    backgroundColor: be.colorFont.var
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
    backgroundColor: be.colorMain.var,
    borderRadius: "1vmin",
    touchAction: "none"
  },
  "::slotted(*)": {
    touchAction: "none"
  }
});
var ns, k, st, et, os, cs, Kt, Fs, ks, Ds;
class Qe extends Xs {
  constructor() {
    super();
    i(this, ns, null);
    i(this, k, null);
    i(this, st, !1);
    i(this, et, 0);
    i(this, os, 0);
    i(this, cs, 0);
    i(this, Kt, () => {
      r(this, st, this.offsetWidth > this.offsetHeight);
      const e = t(this, st) ? this.offsetWidth : this.offsetHeight;
      r(this, et, e / ((this.scrollElement.scrollSize + this.scrollElement.viewportSize) / e)), r(this, et, Math.max(t(this, et), 30)), t(this, st) ? (t(this, k).style.width = t(this, et) + "px", t(this, k).style.height = "100%") : (t(this, k).style.width = "100%", t(this, k).style.height = t(this, et) + "px"), r(this, os, e - t(this, et)), this.scrollElement.scrollSize || (this.style.display = "none");
    });
    i(this, Fs, () => {
      r(this, cs, this.scrollElement.currentProgress * t(this, os)), t(this, st) ? t(this, k).style.transform = `translate3d(${t(this, cs)}px, 0px, 0px)` : t(this, k).style.transform = `translate3d(0px, ${t(this, cs)}px, 0px)`;
    });
    i(this, ks, () => {
      this.setAttribute("axis", this.scrollElement.axisCSSProperty.current);
    });
    i(this, Ds, (e) => {
      document.documentElement.classList.add("grabbing"), Ke(
        (u) => {
          const m = t(this, st) ? u.x : u.y, I = this.scrollElement.distance / t(this, os), ts = (m - h) * I;
          this.scrollElement.setPosition(s + ts);
        },
        () => {
          document.documentElement.classList.remove("grabbing");
        }
      );
      const s = this.scrollElement.targetScrollValue, h = t(this, st) ? e.x : e.y;
    });
    le && (this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(Je), ae(this, {
      slot: "static",
      "drag-dead-zone": "",
      children: [
        Ws({
          ref: (s) => r(this, ns, s),
          children: te({ class: "default-thumb" })
        })
      ]
    }));
  }
  get thumbElement() {
    return t(this, k);
  }
  connectedCallback() {
    super.connectedCallback();
    const e = t(this, ns).assignedElements()[0] || t(this, ns).firstElementChild;
    r(this, k, e), t(this, k).addEventListener("pointerdown", t(this, Ds)), ps.subscribe(t(this, Kt), ue.SCROLL + 1), qs.subscribe(this, t(this, Kt)), this.scrollElement.onScroll(t(this, Fs)), this.scrollElement.axisCSSProperty.subscribe(t(this, ks));
  }
  disconnectedCallback() {
    t(this, k).removeEventListener("pointerdown", t(this, Ds)), ps.unsubscribe(t(this, Kt)), qs.unsubscribe(t(this, Kt)), this.scrollElement.offScroll(t(this, Fs)), this.scrollElement.axisCSSProperty.unsubscribe(t(this, ks));
  }
}
ns = new WeakMap(), k = new WeakMap(), st = new WeakMap(), et = new WeakMap(), os = new WeakMap(), cs = new WeakMap(), Kt = new WeakMap(), Fs = new WeakMap(), ks = new WeakMap(), Ds = new WeakMap();
customElements.get("e-scrollbar") || customElements.define("e-scrollbar", Qe);
const Xe = fe({
  button: {
    all: "inherit"
  }
});
class we extends Xs {
  constructor() {
    super(), this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(Xe), le && ae(this, {
      children: [
        Ge({
          onClick: () => {
            this.handleClick();
          },
          children: [Ws()]
        })
      ]
    });
  }
}
class Ye extends we {
  handleClick() {
    const n = this.getAttribute("index"), e = this.getAttribute("behaviour");
    this.scrollElement.scrollToSection(parseInt(n || "0"), { behaviour: e });
  }
}
customElements.get("e-scroll-set-button") || customElements.define("e-scroll-set-button", Ye);
class ti extends we {
  handleClick() {
    const n = this.getAttribute("step"), e = this.getAttribute("behaviour");
    this.scrollElement.shiftSections(parseInt(n || "1"), { behaviour: e });
  }
}
customElements.get("e-scroll-step-button") || customElements.define("e-scroll-step-button", ti);
var it, Ct, ls, Is, Ms, us;
class si {
  constructor(n, e, s) {
    i(this, it, void 0);
    i(this, Ct, void 0);
    i(this, ls, void 0);
    i(this, Is, void 0);
    i(this, Ms, () => {
      t(this, Ct).scrollToSection(t(this, ls), {
        behaviour: t(this, Is)
      });
    });
    i(this, us, () => {
      t(this, it).classList.toggle(
        "current",
        t(this, Ct).counter.current === t(this, ls)
      );
    });
    r(this, it, document.createElement("button")), r(this, Ct, n), r(this, Is, s), r(this, ls, e), t(this, it).addEventListener("click", t(this, Ms)), t(this, Ct).counter.subscribe(t(this, us)), t(this, us).call(this);
  }
  get element() {
    return t(this, it);
  }
  destroy() {
    t(this, it).removeEventListener("click", t(this, Ms)), t(this, Ct).counter.unsubscribe(t(this, us)), t(this, it).remove();
  }
}
it = new WeakMap(), Ct = new WeakMap(), ls = new WeakMap(), Is = new WeakMap(), Ms = new WeakMap(), us = new WeakMap();
var Pt, as;
class ei extends Xs {
  constructor() {
    super(...arguments);
    i(this, Pt, []);
    i(this, as, Ce(() => {
      t(this, Pt).forEach((e) => e.destroy()), r(this, Pt, []);
      for (let e = 0; e < this.scrollElement.sections.length; e++) {
        const s = new si(
          this.scrollElement,
          e,
          this.getAttribute("behaviour") || "smooth"
        );
        this.appendChild(s.element), t(this, Pt).push(s);
      }
    }, 0));
  }
  connectedCallback() {
    super.connectedCallback(), this.scrollElement.addEventListener(
      "sectionsChange",
      t(this, as)
    ), t(this, as).call(this);
  }
  disconnectedCallback() {
    this.scrollElement.removeEventListener(
      "sectionsChange",
      t(this, as)
    ), t(this, Pt).forEach((e) => e.destroy()), r(this, Pt, []);
  }
}
Pt = new WeakMap(), as = new WeakMap();
customElements.get("e-scroll-bullet-buttons") || customElements.define("e-scroll-bullet-buttons", ei);
var _t, Zt, jt, Jt, wt, Et, xt, Lt, L, O, A, T, Vt, P, rt, ht, nt, ot, ct, w, H, $, lt, ut, K, Rs, d, Qt, Xt, Os, E, zt, D, V, B, fs, Ft, y, Gs, Ee, Ns, xe, Ks, Le, _s, Ve, Zs, ze, js, Fe, As, ds, at, It, Js, ke, Qs, De, Ts, ce, Hs;
class ii extends Xs {
  constructor() {
    super();
    i(this, Gs);
    i(this, Ns);
    i(this, Ks);
    i(this, _s);
    i(this, Zs);
    i(this, js);
    i(this, at);
    i(this, Js);
    i(this, Qs);
    i(this, Ts);
    i(this, _t, new c(this, "--damping", 20));
    i(this, Zt, new c(this, "--mass", 0));
    i(this, jt, new c(this, "--stiffness", 0));
    i(this, Jt, new c(this, "--target", ""));
    i(this, wt, new c(this, "--disabled", !1));
    i(this, Et, new c(
      this,
      "--distance-offset",
      0,
      { rawValueCheck: !1 }
    ));
    i(this, xt, new c(this, "--start-offset", 0, {
      rawValueCheck: !1
    }));
    i(this, Lt, new c(
      this,
      "--capture-once",
      !1
    ));
    i(this, L, new c(this, "--captured", ""));
    i(this, O, new c(this, "--released", ""));
    i(this, A, new c(
      this,
      "--captured-from-start",
      ""
    ));
    i(this, T, new c(
      this,
      "--captured-from-finish",
      ""
    ));
    i(this, Vt, new c(
      this,
      "--released-from-start",
      ""
    ));
    i(this, P, new c(
      this,
      "--released-from-finish",
      ""
    ));
    i(this, rt, new c(this, "--passed-var", ""));
    i(this, ht, new c(this, "--progress-var", ""));
    i(this, nt, new c(this, "--distance-var", ""));
    i(this, ot, new c(this, "--start-var", ""));
    i(this, ct, new c(this, "--finish-var", ""));
    i(this, w, new kt(!1));
    i(this, H, new kt(!1));
    i(this, $, new kt(!1));
    i(this, lt, new kt(!1));
    i(this, ut, new kt(!1));
    i(this, K, new kt(!1));
    i(this, Rs, []);
    i(this, d, this);
    i(this, Qt, 0);
    i(this, Xt, 0);
    i(this, Os, 0);
    i(this, E, new ye(0, { order: ve.SCROLL - 1, min: 0, max: 1 }));
    i(this, zt, 0);
    i(this, D, 0);
    i(this, V, 0);
    i(this, B, 0);
    i(this, fs, !1);
    i(this, Ft, !1);
    i(this, y, !0);
    i(this, As, () => {
      t(this, y) || (this.resize(), t(this, ds).call(this));
    });
    i(this, ds, () => {
      !t(this, y) && t(this, fs) && this.tick();
    });
    i(this, Hs, Ce(() => {
      const e = Yt.getAll(this).reverse();
      let s = 0;
      e.forEach((h, u) => {
        h.element === this.scrollElement && (s = u);
      }), r(this, Rs, e.slice(s + 1));
    }, 0));
  }
  get distanceOffsetCSSProperty() {
    return t(this, Et);
  }
  get startOffsetCSSProperty() {
    return t(this, xt);
  }
  get captureOnceCSSProperty() {
    return t(this, Lt);
  }
  get capturedCSSProperty() {
    return t(this, L);
  }
  get releasedCSSProperty() {
    return t(this, O);
  }
  get capturedFromStartCSSProperty() {
    return t(this, A);
  }
  get capturedFromFinishCSSProperty() {
    return t(this, T);
  }
  get releasedFromStartCSSProperty() {
    return t(this, Vt);
  }
  get releasedFromFinishCSSProperty() {
    return t(this, P);
  }
  get passedVarCSSProperty() {
    return t(this, rt);
  }
  get progressVarCSSProperty() {
    return t(this, ht);
  }
  get distanceVarCSSProperty() {
    return t(this, nt);
  }
  get startVarCSSProperty() {
    return t(this, ot);
  }
  get finishVarCSSProperty() {
    return t(this, ct);
  }
  get disabledCSSProperty() {
    return t(this, wt);
  }
  get dampingCSSProperty() {
    return t(this, _t);
  }
  get massCSSProperty() {
    return t(this, Zt);
  }
  get stiffnessCSSProperty() {
    return t(this, jt);
  }
  get targetCSSProperty() {
    return t(this, Jt);
  }
  get isCaptured() {
    return t(this, w);
  }
  get isReleased() {
    return t(this, H);
  }
  get isCapturedFromStart() {
    return t(this, $);
  }
  get isReleasedFromStart() {
    return t(this, lt);
  }
  get isCapturedFromFinish() {
    return t(this, ut);
  }
  get isReleasedFromFinish() {
    return t(this, K);
  }
  get directionPosition() {
    return t(this, Qt);
  }
  get directionSize() {
    return t(this, Xt);
  }
  get passed() {
    return t(this, E);
  }
  get progress() {
    return t(this, zt);
  }
  get start() {
    return t(this, D);
  }
  get finish() {
    return t(this, B);
  }
  get distance() {
    return t(this, V);
  }
  get isCapturedOnce() {
    return t(this, Ft);
  }
  get isDisabled() {
    return t(this, y);
  }
  resize() {
    r(this, Xt, this.scrollElement.vertical ? this.offsetHeight : this.offsetWidth), r(this, Qt, this.scrollElement.vertical ? $s(this, this.scrollElement) : Bs(this, this.scrollElement)), r(this, D, this.getStart()), r(this, V, this.getDistance()), r(this, D, t(this, D) + t(this, xt).current), r(this, V, t(this, V) + t(this, Et).current), r(this, B, t(this, D) + t(this, V)), this.scrollElement.currentScrollValue > t(this, B) && !t(this, w).current && !t(this, H).current && (t(this, w).current = !0), this.setVar(t(this, ot).current, t(this, D)), this.setVar(t(this, ct).current, t(this, B)), this.setVar(t(this, nt).current, t(this, V)), t(this, E).max = t(this, V), r(this, fs, !0);
  }
  tick() {
    let e = this.scrollElement.currentScrollValue;
    t(this, Rs).forEach((h) => {
      e += h.value;
    }), t(this, E).set(e - t(this, D));
    const s = Math.round(e);
    t(this, w).current && (s > t(this, D) ? t(this, $).current || o(this, Ks, Le).call(this) : t(this, $).current && !t(this, lt).current && o(this, Zs, ze).call(this), s < t(this, B) ? t(this, K).current && !t(this, ut).current && o(this, _s, Ve).call(this) : t(this, $).current && !t(this, K).current && o(this, js, Fe).call(this)), s > t(this, D) && s < t(this, B) ? t(this, w).current || o(this, Gs, Ee).call(this) : t(this, w).current && (t(this, E).set(
      He(t(this, V) / 2, t(this, E).current, 0, t(this, V))
    ), o(this, Ns, xe).call(this)), t(this, Ft) && t(this, Lt).current && (t(this, L).current && t(this, d).classList.add(t(this, L).current), r(this, y, !0));
  }
  disable() {
    this.style.cssText = "", r(this, Qt, 0), r(this, Xt, 0), t(this, E).reset(), r(this, zt, 0), r(this, D, 0), r(this, V, 0), r(this, B, 0), r(this, fs, !1), t(this, w).current = !1, t(this, H).current = !1, t(this, $).current = !1, t(this, lt).current = !1, t(this, ut).current = !1, t(this, K).current = !1, r(this, Ft, !1), r(this, y, !0), o(this, Ts, ce).call(this);
  }
  enable() {
    r(this, y, !1);
  }
  connectedCallback() {
    super.connectedCallback(), t(this, _t).observe(), t(this, Zt).observe(), t(this, jt).observe(), t(this, Jt).observe(), t(this, wt).observe(), t(this, Et).observe(), t(this, xt).observe(), t(this, Lt).observe(), t(this, L).observe(), t(this, O).observe(), t(this, A).observe(), t(this, T).observe(), t(this, Vt).observe(), t(this, P).observe(), t(this, rt).observe(), t(this, ht).observe(), t(this, nt).observe(), t(this, ot).observe(), t(this, ct).observe();
    let e = !1;
    this.scrollElement.addEventListener(
      "sectionsChange",
      t(this, Hs)
    ), t(this, Hs).call(this), t(this, wt).current || this.enable(), t(this, _t).subscribe((s) => {
      t(this, E).damping = s.current;
    }), t(this, Zt).subscribe((s) => {
      t(this, E).mass = s.current;
    }), t(this, jt).subscribe((s) => {
      t(this, E).stiffness = s.current;
    }), t(this, Jt).subscribe((s) => {
      s.previous && o(this, Ts, ce).call(this), s.current ? s.current === "parent" ? r(this, d, this.parentElement || this) : r(this, d, document.querySelector(s.current) || this) : r(this, d, this);
    }), t(this, wt).subscribe((s) => {
      s.current && !s.previous ? this.disable() : !s.current && s.previous && (this.resize(), this.enable());
    }), t(this, xt).subscribe(() => {
      e && !t(this, y) && this.resize();
    }), t(this, Et).subscribe(() => {
      e && !t(this, y) && this.resize();
    }), t(this, L).subscribe((s) => {
      o(this, at, It).call(this, s);
    }), t(this, A).subscribe((s) => {
      o(this, at, It).call(this, s);
    }), t(this, T).subscribe((s) => {
      o(this, at, It).call(this, s);
    }), t(this, O).subscribe((s) => {
      o(this, at, It).call(this, s);
    }), t(this, Vt).subscribe((s) => {
      o(this, at, It).call(this, s);
    }), t(this, P).subscribe((s) => {
      o(this, at, It).call(this, s);
    }), t(this, Lt).subscribe((s) => {
      t(this, y) || !s.current && s.previous && (this.resize(), this.enable());
    }), t(this, rt).subscribe((s) => {
      t(this, y) || (this.removeVar(s.previous), this.setVar(s.current, this.passed.current));
    }), t(this, ht).subscribe((s) => {
      t(this, y) || (this.removeVar(s.previous), this.setVar(s.current, t(this, zt)));
    }), t(this, ot).subscribe((s) => {
      t(this, y) || (this.removeVar(s.previous), this.setVar(s.current, t(this, D)));
    }), t(this, ct).subscribe((s) => {
      t(this, y) || (this.removeVar(s.previous), this.setVar(s.current, t(this, B)));
    }), t(this, nt).subscribe((s) => {
      t(this, y) || (this.removeVar(s.previous), this.setVar(s.current, t(this, V)));
    }), t(this, E).subscribe((s) => {
      r(this, zt, t(this, E).current / t(this, V) || 0), this.setVar(
        t(this, rt).current,
        t(this, E).current.toFixed(6)
      ), this.setVar(
        t(this, ht).current,
        t(this, zt).toFixed(6)
      );
    }), ps.subscribe(t(this, As), ue.SEGMENT), this.scrollElement.onScroll(t(this, ds)), e = !0;
  }
  disconnectedCallback() {
    ps.unsubscribe(t(this, As)), this.scrollElement.offScroll(t(this, ds)), t(this, _t).close(), t(this, Zt).close(), t(this, jt).close(), t(this, Jt).close(), t(this, wt).close(), t(this, Et).close(), t(this, xt).close(), t(this, Lt).close(), t(this, L).close(), t(this, O).close(), t(this, A).close(), t(this, T).close(), t(this, Vt).close(), t(this, P).close(), t(this, rt).close(), t(this, ht).close(), t(this, nt).close(), t(this, ot).close(), t(this, ct).close(), t(this, w).close(), t(this, H).close(), t(this, $).close(), t(this, lt).close(), t(this, ut).close(), t(this, K).close(), this.disable();
  }
  removeVar(e) {
    e && t(this, d).style.removeProperty(`--${e}`);
  }
  setVar(e, s) {
    e && t(this, d).style.setProperty(`--${e}`, s.toString());
  }
  getDistance() {
    return t(this, Xt) + t(this, Os);
  }
  getStart() {
    return t(this, Qt) - t(this, Os);
  }
}
_t = new WeakMap(), Zt = new WeakMap(), jt = new WeakMap(), Jt = new WeakMap(), wt = new WeakMap(), Et = new WeakMap(), xt = new WeakMap(), Lt = new WeakMap(), L = new WeakMap(), O = new WeakMap(), A = new WeakMap(), T = new WeakMap(), Vt = new WeakMap(), P = new WeakMap(), rt = new WeakMap(), ht = new WeakMap(), nt = new WeakMap(), ot = new WeakMap(), ct = new WeakMap(), w = new WeakMap(), H = new WeakMap(), $ = new WeakMap(), lt = new WeakMap(), ut = new WeakMap(), K = new WeakMap(), Rs = new WeakMap(), d = new WeakMap(), Qt = new WeakMap(), Xt = new WeakMap(), Os = new WeakMap(), E = new WeakMap(), zt = new WeakMap(), D = new WeakMap(), V = new WeakMap(), B = new WeakMap(), fs = new WeakMap(), Ft = new WeakMap(), y = new WeakMap(), Gs = new WeakSet(), Ee = function() {
  t(this, w).current = !0, t(this, H).current = !1, r(this, Ft, !0), t(this, O).current && t(this, d).classList.remove(t(this, O).current), t(this, P).current && t(this, d).classList.remove(
    t(this, P).current
  ), t(this, P).current && t(this, d).classList.remove(
    t(this, P).current
  ), t(this, L).current && t(this, d).classList.add(t(this, L).current);
}, Ns = new WeakSet(), xe = function() {
  t(this, H).current = !0, t(this, w).current = !1, r(this, Ft, !0), t(this, L).current && t(this, d).classList.remove(t(this, L).current), t(this, A).current && t(this, d).classList.remove(
    t(this, A).current
  ), t(this, T).current && t(this, d).classList.remove(
    t(this, T).current
  ), t(this, O).current && t(this, d).classList.add(t(this, O).current);
}, Ks = new WeakSet(), Le = function() {
  t(this, w).current = !0, t(this, $).current = !0, t(this, lt).current = !1, t(this, A).current && t(this, d).classList.add(
    t(this, A).current
  );
}, _s = new WeakSet(), Ve = function() {
  t(this, w).current = !0, t(this, ut).current = !0, t(this, K).current = !1, t(this, T).current && t(this, d).classList.add(
    t(this, T).current
  );
}, Zs = new WeakSet(), ze = function() {
  t(this, H).current = !0, t(this, lt).current = !0, t(this, $).current = !1, t(this, P).current && t(this, d).classList.add(
    t(this, P).current
  );
}, js = new WeakSet(), Fe = function() {
  t(this, H).current = !0, t(this, K).current = !0, t(this, ut).current = !1, t(this, P).current && t(this, d).classList.add(
    t(this, P).current
  );
}, As = new WeakMap(), ds = new WeakMap(), at = new WeakSet(), It = function(e) {
  if (t(this, y)) {
    e.previous && t(this, d).classList.remove(e.previous), e.current && t(this, d).classList.remove(e.current);
    return;
  }
  e.current && t(this, w).current ? (e.previous && t(this, d).classList.remove(e.previous), t(this, d).classList.add(e.current)) : !e.current && e.previous && t(this, d).classList.remove(e.previous);
}, Js = new WeakSet(), ke = function(...e) {
  e.forEach((s) => {
    s && t(this, d).classList.remove(s);
  });
}, Qs = new WeakSet(), De = function(...e) {
  e.forEach((s) => {
    s && t(this, d).style.removeProperty(`--${s}`);
  });
}, Ts = new WeakSet(), ce = function() {
  o(this, Js, ke).call(this, t(this, L).current, t(this, A).current, t(this, T).current, t(this, O).current, t(this, Vt).current, t(this, P).current), o(this, Qs, De).call(this, t(this, rt).current, t(this, ht).current, t(this, nt).current, t(this, ot).current, t(this, ct).current);
}, Hs = new WeakMap();
customElements.get("e-scroll-segment") || customElements.define("e-scroll-segment", ii);
export {
  ei as ScrollBulletButtonsElement,
  se as ScrollElement,
  ii as ScrollSegmentElement,
  Ye as ScrollSetButtonElement,
  ti as ScrollStepButtonElement,
  Qe as ScrollbarElement
};
