var F = (i, e, s) => {
  if (!e.has(i))
    throw TypeError("Cannot " + s);
};
var t = (i, e, s) => (F(i, e, "read from private field"), s ? s.call(i) : e.get(i)), h = (i, e, s) => {
  if (e.has(i))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(i) : e.set(i, s);
}, r = (i, e, s, l) => (F(i, e, "write to private field"), l ? l.call(i, s) : e.set(i, s), s);
var O = (i, e, s) => (F(i, e, "access private method"), s);
import { cssUnitParser as dt } from "../css-unit-parser/index.js";
import { Ladder as G } from "../ladder/index.js";
import { RESIZE_ORDER as ft, TICK_ORDER as pt } from "../order/index.js";
import { scrollEntries as J } from "../scroll-entries/index.js";
import { ticker as et } from "../ticker/index.js";
import { i as st } from "../browser-0zX67oeU.js";
import { a as it } from "../dom-P5QbAASX.js";
import { g as Q, a as j } from "../layout-HoBT_Da2.js";
import { elementResizer as ht } from "../element-resizer/index.js";
import { windowResizer as rt } from "../window-resizer/index.js";
import { Notifier as mt } from "../notifier/index.js";
function gt(i) {
  const e = Math.sqrt(
    i.m11 * i.m11 + i.m12 * i.m12 + i.m13 * i.m13
  ), s = Math.sqrt(
    i.m21 * i.m21 + i.m22 * i.m22 + i.m23 * i.m23
  ), l = Math.sqrt(
    i.m31 * i.m31 + i.m32 * i.m32 + i.m33 * i.m33
  ), b = Math.atan2(i.m32, i.m33), Z = Math.atan2(
    -i.m31,
    Math.sqrt(i.m32 * i.m32 + i.m33 * i.m33)
  ), $ = Math.atan2(i.m21, i.m11), u = i.m41, P = i.m42 * -1, V = i.m43;
  return {
    scaleX: e,
    scaleY: s,
    scaleZ: l,
    rotationX: b,
    rotationY: Z,
    rotationZ: $,
    translationX: u,
    translationY: P,
    translationZ: V
  };
}
var a, g, z, R, A, L, _, v, W, q, y, x, X, S, d, w, Y, H, B, f, p, m, c, n, o, M, E, I, D, tt, k, nt, K, lt, N, ot, C, U, T;
class Vt {
  constructor(e, s) {
    h(this, D);
    h(this, k);
    h(this, K);
    h(this, N);
    h(this, a, null);
    h(this, g, null);
    h(this, z, []);
    h(this, R, "auto");
    h(this, A, "top");
    h(this, L, !1);
    h(this, _, !0);
    h(this, v, !0);
    h(this, W, !0);
    h(this, q, !0);
    h(this, y, 0);
    h(this, x, 0);
    h(this, X, 0);
    h(this, S, 0);
    h(this, d, 0);
    h(this, w, 0);
    h(this, Y, 0);
    h(this, H, 0);
    h(this, B, 0);
    h(this, f, { x: 0, y: 0, z: 0 });
    h(this, p, { x: 0, y: 0, z: 0 });
    h(this, m, { x: 1, y: 1, z: 1 });
    h(this, c, new G({ x: 0, y: 0, z: 0 }));
    h(this, n, new G({ x: 0, y: 0, z: 0 }));
    h(this, o, new G({ x: 0, y: 0, z: 0 }));
    h(this, M, { x: 0, y: 0, z: 0 });
    h(this, E, /* @__PURE__ */ new Map());
    h(this, I, new mt());
    h(this, C, () => {
      st && O(this, K, lt).call(this);
    });
    h(this, U, () => {
      O(this, N, ot).call(this), O(this, D, tt).call(this);
    });
    h(this, T, () => {
      const e = J.getAll(this.element);
      t(this, E).forEach((s, l) => {
        e.includes(l) || (this.deleteScrollStep(s), t(this, E).delete(l));
      }), e.forEach((s) => {
        if (!t(this, E).has(s)) {
          const l = () => s;
          t(this, E).set(s, l), this.setScrollStep(l);
        }
      });
    });
    st && (r(this, a, it(e) || document.body), r(this, g, it(s == null ? void 0 : s.containerElement) || document.body), r(this, R, (s == null ? void 0 : s.scrollAxis) || "auto"), r(this, A, (s == null ? void 0 : s.frontSide) || "top"), r(this, L, (s == null ? void 0 : s.cartesian) || !1), r(this, _, (s == null ? void 0 : s.sizeStep) !== void 0 ? s.sizeStep : !0), r(this, v, (s == null ? void 0 : s.positionStep) !== void 0 ? s.positionStep : !0), r(this, W, (s == null ? void 0 : s.transformStep) !== void 0 ? s.transformStep : !0), r(this, q, (s == null ? void 0 : s.scrollStep) !== void 0 ? s.scrollStep : !0), t(this, o).setStep("_size", "+", {
      x: 1,
      y: 1,
      z: 1
    }), t(this, n).setStep("_position", "+", {
      x: 0,
      y: 0,
      z: 0
    }), t(this, o).setStep("_scale", "*", {
      x: 1,
      y: 1,
      z: 1
    }), t(this, n).setStep("_translation", "+", {
      x: 0,
      y: 0,
      z: 0
    }), t(this, c).setStep("_rotation", "+", {
      x: 0,
      y: 0,
      z: 0
    }), t(this, q) && (J.notifier.subscribe(t(this, T)), t(this, T).call(this)), ht.subscribe(this.element, t(this, C)), rt.subscribe(t(this, C), ft.LAYOUT_BOX), et.subscribe(t(this, U), {
      order: pt.LAYOUT_BOX,
      culling: s != null && s.culling ? this.element : void 0
    }));
  }
  get element() {
    return t(this, a);
  }
  get containerElement() {
    return t(this, g);
  }
  get position() {
    return t(this, n).current;
  }
  get rotation() {
    return t(this, c).current;
  }
  get scale() {
    return t(this, o).current;
  }
  get scrollValue() {
    return t(this, M);
  }
  get left() {
    return t(this, d);
  }
  get top() {
    return t(this, S);
  }
  get CSSTranslation() {
    return t(this, f);
  }
  get CSSRotation() {
    return t(this, p);
  }
  get CSSScale() {
    return t(this, m);
  }
  get front() {
    return t(this, w);
  }
  get width() {
    return t(this, y);
  }
  get height() {
    return t(this, x);
  }
  get depth() {
    return t(this, X);
  }
  destroy() {
    et.unsubscribe(t(this, U)), ht.unsubscribe(t(this, C)), rt.unsubscribe(t(this, C)), J.notifier.unsubscribe(t(this, T)), t(this, E).clear(), t(this, n).close(), t(this, c).close(), t(this, o).close();
  }
  bindObject(e) {
    e.position && t(this, n).bind(e.position), e.rotation && t(this, c).bind(e.rotation), e.scale && t(this, o).bind(e.scale);
  }
  unbindObject(e) {
    e.position && t(this, n).unbind(e.position), e.rotation && t(this, c).unbind(e.rotation), e.scale && t(this, o).unbind(e.scale);
  }
  setScrollStep(e) {
    return t(this, z).includes(e) || t(this, z).push(e), () => this.deleteScrollStep(e);
  }
  deleteScrollStep(e) {
    r(this, z, t(this, z).filter(
      (s) => s !== e
    ));
  }
  setPositionStep(...e) {
    t(this, n).setStep(...e);
  }
  getPositionStep(...e) {
    return t(this, n).getStepValue(...e);
  }
  setRotationStep(...e) {
    t(this, c).setStep(...e);
  }
  getRotationStep(...e) {
    return t(this, c).getStepValue(...e);
  }
  getExcludedRotationSteps(...e) {
    return t(this, c).getExcludedStepsValue(...e);
  }
  getIncludedRotationSteps(...e) {
    return t(this, c).getIncludedStepsValue(...e);
  }
  setScaleStep(...e) {
    t(this, o).setStep(...e);
  }
  getScaleStep(...e) {
    return t(this, o).getStepValue(...e);
  }
  getExcludedScaleSteps(...e) {
    return t(this, o).getExcludedStepsValue(...e);
  }
  getIncludedScaleSteps(...e) {
    return t(this, o).getIncludedStepsValue(...e);
  }
  deletePositionStep(...e) {
    t(this, n).deleteStep(...e);
  }
  getExcludedPositionSteps(...e) {
    return t(this, n).getExcludedStepsValue(...e);
  }
  getIncludedPositionSteps(...e) {
    return t(this, n).getIncludedStepsValue(...e);
  }
  deleteRotationStep(...e) {
    t(this, c).deleteStep(...e);
  }
  deleteScaleStep(...e) {
    t(this, o).deleteStep(...e);
  }
  onPosition(...e) {
    return t(this, n).subscribe(...e);
  }
  offPosition(...e) {
    t(this, n).unsubscribe(...e);
  }
  onScale(...e) {
    return t(this, o).subscribe(...e);
  }
  offScale(...e) {
    t(this, o).unsubscribe(...e);
  }
  onRotation(...e) {
    return t(this, c).subscribe(...e);
  }
  offRotation(...e) {
    t(this, c).unsubscribe(...e);
  }
  onResize(...e) {
    return t(this, I).subscribe(...e);
  }
  offResize(...e) {
    return t(this, I).unsubscribe(...e);
  }
}
a = new WeakMap(), g = new WeakMap(), z = new WeakMap(), R = new WeakMap(), A = new WeakMap(), L = new WeakMap(), _ = new WeakMap(), v = new WeakMap(), W = new WeakMap(), q = new WeakMap(), y = new WeakMap(), x = new WeakMap(), X = new WeakMap(), S = new WeakMap(), d = new WeakMap(), w = new WeakMap(), Y = new WeakMap(), H = new WeakMap(), B = new WeakMap(), f = new WeakMap(), p = new WeakMap(), m = new WeakMap(), c = new WeakMap(), n = new WeakMap(), o = new WeakMap(), M = new WeakMap(), E = new WeakMap(), I = new WeakMap(), D = new WeakSet(), tt = function() {
  t(this, o).calculate(), t(this, n).calculate(), t(this, c).calculate();
}, k = new WeakSet(), nt = function() {
  t(this, o).setStep("_size", "+", {
    x: t(this, _) ? t(this, y) : 1,
    y: t(this, _) ? t(this, x) : 1,
    z: t(this, _) ? t(this, X) : 1
  });
  const e = t(this, v) ? t(this, Y) : 0, s = t(this, v) ? t(this, H) : 0, l = t(this, v) ? t(this, B) : 0;
  t(this, n).setStep("_position", "+", {
    x: e,
    y: s,
    z: l
  }), t(this, W) ? (t(this, o).setStep("_scale", "*", {
    x: t(this, m).x,
    y: t(this, m).y,
    z: t(this, m).z
  }), t(this, n).setStep("_translation", "+", {
    x: t(this, f).x,
    y: t(this, f).y,
    z: t(this, f).z
  }), t(this, c).setStep("_rotation", "+", {
    x: t(this, p).x,
    y: t(this, p).y,
    z: t(this, p).z
  })) : (t(this, o).setStep("_scale", "*", {
    x: 1,
    y: 1,
    z: 1
  }), t(this, n).setStep("_translation", "+", {
    x: 0,
    y: 0,
    z: 0
  }), t(this, c).setStep("_rotation", "+", {
    x: 0,
    y: 0,
    z: 0
  }));
}, K = new WeakSet(), lt = function() {
  const e = getComputedStyle(t(this, a));
  r(this, y, Math.max(t(this, a).clientWidth, 1)), r(this, x, Math.max(t(this, a).clientHeight, 1)), r(this, X, Math.max(
    dt.parse(e.getPropertyValue("--depth") || "0px"),
    1
  ));
  const s = Q(t(this, g)), l = j(t(this, g)), b = t(this, g).clientWidth, Z = t(this, g).clientHeight;
  if (r(this, d, Q(t(this, a)) - s), r(this, S, j(t(this, a)) - l), t(this, R) === "z") {
    const P = t(this, d) / b, V = t(this, S) / Z;
    r(this, d, (P - Math.floor(P)) * b), r(this, S, (V - Math.floor(V)) * Z), t(this, A) === "left" ? r(this, w, Q(t(this, a)) - s - t(this, d)) : r(this, w, j(t(this, a)) - l - t(this, S));
  }
  if (r(this, d, t(this, d) + t(this, a).clientLeft), r(this, S, t(this, S) + t(this, a).clientTop), t(this, L)) {
    const P = Math.round(b / 2), V = Math.round(Z / 2), ct = t(this, y) ? Math.round(t(this, y) / 2) : 0, at = t(this, x) ? Math.round(t(this, x) / 2) : 0, ut = t(this, d) - P + ct, St = (t(this, S) - V + at) * -1;
    r(this, Y, ut), r(this, H, St);
  } else
    r(this, Y, t(this, d)), r(this, H, t(this, S));
  r(this, B, t(this, w) * -1);
  const $ = new WebKitCSSMatrix(e.transform), u = gt($);
  t(this, f).x = u.translationX, t(this, f).y = u.translationY, t(this, f).z = u.translationZ, t(this, m).x = u.scaleX, t(this, m).y = u.scaleY, t(this, m).z = u.scaleZ, t(this, p).x = u.rotationX, t(this, p).y = u.rotationY, t(this, p).z = u.rotationZ, O(this, k, nt).call(this), O(this, D, tt).call(this), t(this, I).notify();
}, N = new WeakSet(), ot = function() {
  t(this, M).x = 0, t(this, M).y = 0, t(this, M).z = 0;
  for (let e = 0; e < t(this, z).length; e++) {
    const s = t(this, z)[e]();
    let l = s.axis;
    t(this, R) !== "auto" && (l = t(this, R));
    const b = s.value * (l === "x" ? -1 : t(this, L) ? 1 : -1);
    t(this, M)[l] += b, t(this, n).setStep(`_scroll_${e}`, "+", {
      [l]: b
    });
  }
}, C = new WeakMap(), U = new WeakMap(), T = new WeakMap();
export {
  Vt as LayoutBox,
  gt as decomposeCSSMatrix
};
