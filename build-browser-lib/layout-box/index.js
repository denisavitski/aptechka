var k = (i, e, s) => {
  if (!e.has(i))
    throw TypeError("Cannot " + s);
};
var t = (i, e, s) => (k(i, e, "read from private field"), s ? s.call(i) : e.get(i)), h = (i, e, s) => {
  if (e.has(i))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(i) : e.set(i, s);
}, n = (i, e, s, o) => (k(i, e, "write to private field"), o ? o.call(i, s) : e.set(i, s), s);
var E = (i, e, s) => (k(i, e, "access private method"), s);
import { cssUnitParser as lt } from "../css-unit-parser/index.js";
import { Ladder as I } from "../ladder/index.js";
import { TICK_ORDER as ot, RESIZE_ORDER as at } from "../order/index.js";
import { scrollEntries as ct } from "../scroll-entries/index.js";
import { ticker as G } from "../ticker/index.js";
import { i as J } from "../browser-0zX67oeU.js";
import { g as N } from "../dom-BY7JhTx5.js";
import { g as K, a as $ } from "../layout-HoBT_Da2.js";
import { elementResizer as Q } from "../element-resizer/index.js";
import { windowResizer as j } from "../window-resizer/index.js";
function ut(i) {
  const e = Math.sqrt(
    i.m11 * i.m11 + i.m12 * i.m12 + i.m13 * i.m13
  ), s = Math.sqrt(
    i.m21 * i.m21 + i.m22 * i.m22 + i.m23 * i.m23
  ), o = Math.sqrt(
    i.m31 * i.m31 + i.m32 * i.m32 + i.m33 * i.m33
  ), Y = Math.atan2(i.m32, i.m33), H = Math.atan2(
    -i.m31,
    Math.sqrt(i.m32 * i.m32 + i.m33 * i.m33)
  ), U = Math.atan2(i.m21, i.m11), u = i.m41, C = i.m42 * -1, R = i.m43;
  return {
    scaleX: e,
    scaleY: s,
    scaleZ: o,
    rotationX: Y,
    rotationY: H,
    rotationZ: U,
    translationX: u,
    translationY: C,
    translationZ: R
  };
}
var a, m, p, _, T, O, b, v, Z, y, M, L, S, d, x, P, X, A, f, z, g, c, r, l, W, F, B, tt, D, et, V, st, w, q;
class vt {
  constructor(e, s) {
    h(this, W);
    h(this, B);
    h(this, D);
    h(this, V);
    h(this, a, null);
    h(this, m, null);
    h(this, p, []);
    h(this, _, "auto");
    h(this, T, "top");
    h(this, O, !1);
    h(this, b, !0);
    h(this, v, !0);
    h(this, Z, !0);
    h(this, y, 0);
    h(this, M, 0);
    h(this, L, 0);
    h(this, S, 0);
    h(this, d, 0);
    h(this, x, 0);
    h(this, P, 0);
    h(this, X, 0);
    h(this, A, 0);
    h(this, f, { x: 0, y: 0, z: 0 });
    h(this, z, { x: 0, y: 0, z: 0 });
    h(this, g, { x: 1, y: 1, z: 1 });
    h(this, c, new I({ x: 0, y: 0, z: 0 }));
    h(this, r, new I({ x: 0, y: 0, z: 0 }));
    h(this, l, new I({ x: 0, y: 0, z: 0 }));
    h(this, w, () => {
      J && E(this, D, et).call(this);
    });
    h(this, q, () => {
      E(this, V, st).call(this), E(this, W, F).call(this);
    });
    J && (n(this, a, N(e) || document.body), n(this, m, N(s == null ? void 0 : s.containerElement) || document.body), n(this, _, (s == null ? void 0 : s.scrollAxis) || "auto"), n(this, T, (s == null ? void 0 : s.frontSide) || "top"), n(this, O, (s == null ? void 0 : s.cartesian) || !1), n(this, b, (s == null ? void 0 : s.sizeStep) !== void 0 ? s.sizeStep : !0), n(this, v, (s == null ? void 0 : s.positionStep) !== void 0 ? s.positionStep : !0), n(this, Z, (s == null ? void 0 : s.transformStep) !== void 0 ? s.transformStep : !0), t(this, l).setStep("_size", "+", {
      x: 1,
      y: 1,
      z: 1
    }), t(this, r).setStep("_position", "+", {
      x: 0,
      y: 0,
      z: 0
    }), t(this, l).setStep("_scale", "*", {
      x: 1,
      y: 1,
      z: 1
    }), t(this, r).setStep("_translation", "+", {
      x: 0,
      y: 0,
      z: 0
    }), t(this, c).setStep("_rotation", "+", {
      x: 0,
      y: 0,
      z: 0
    }), addEventListener("DOMContentLoaded", () => {
      ct.getAll(this.element).forEach((o) => {
        this.setScrollStep(() => o);
      });
    }), G.subscribe(t(this, q), {
      order: ot.LAYOUT_BOX,
      culling: s != null && s.culling ? this.element : void 0
    }), Q.subscribe(this.element, t(this, w)), j.subscribe(t(this, w), at.LAYOUT_BOX));
  }
  get element() {
    return t(this, a);
  }
  get containerElement() {
    return t(this, m);
  }
  get position() {
    return t(this, r).current;
  }
  get rotation() {
    return t(this, c).current;
  }
  get scale() {
    return t(this, l).current;
  }
  get left() {
    return t(this, d);
  }
  get top() {
    return t(this, S);
  }
  get front() {
    return t(this, x);
  }
  get width() {
    return t(this, y);
  }
  get height() {
    return t(this, M);
  }
  get depth() {
    return t(this, L);
  }
  bindObject(e) {
    e.position && t(this, r).bind(e.position), e.rotation && t(this, c).bind(e.rotation), e.scale && t(this, l).bind(e.scale);
  }
  unbindObject(e) {
    e.position && t(this, r).unbind(e.position), e.rotation && t(this, c).unbind(e.rotation), e.scale && t(this, l).unbind(e.scale);
  }
  setScrollStep(e) {
    return t(this, p).includes(e) || t(this, p).push(e), () => this.deleteScrollStep(e);
  }
  deleteScrollStep(e) {
    n(this, p, t(this, p).filter(
      (s) => s !== e
    ));
  }
  destroy() {
    G.unsubscribe(t(this, q)), Q.unsubscribe(t(this, w)), j.unsubscribe(t(this, w)), t(this, r).close(), t(this, c).close(), t(this, l).close();
  }
  setPositionStep(...e) {
    t(this, r).setStep(...e);
  }
  getPositionStep(...e) {
    return t(this, r).getStepValue(...e);
  }
  setRotationStep(...e) {
    t(this, c).setStep(...e);
  }
  getRotationStep(...e) {
    return t(this, c).getStepValue(...e);
  }
  setScaleStep(...e) {
    t(this, l).setStep(...e);
  }
  getScaleStep(...e) {
    return t(this, l).getStepValue(...e);
  }
  deletePositionStep(...e) {
    t(this, r).deleteStep(...e);
  }
  deleteRotationStep(...e) {
    t(this, c).deleteStep(...e);
  }
  deleteScaleStep(...e) {
    t(this, l).deleteStep(...e);
  }
}
a = new WeakMap(), m = new WeakMap(), p = new WeakMap(), _ = new WeakMap(), T = new WeakMap(), O = new WeakMap(), b = new WeakMap(), v = new WeakMap(), Z = new WeakMap(), y = new WeakMap(), M = new WeakMap(), L = new WeakMap(), S = new WeakMap(), d = new WeakMap(), x = new WeakMap(), P = new WeakMap(), X = new WeakMap(), A = new WeakMap(), f = new WeakMap(), z = new WeakMap(), g = new WeakMap(), c = new WeakMap(), r = new WeakMap(), l = new WeakMap(), W = new WeakSet(), F = function() {
  t(this, l).calculate(), t(this, r).calculate(), t(this, c).calculate();
}, B = new WeakSet(), tt = function() {
  t(this, l).setStep("_size", "+", {
    x: t(this, b) ? t(this, y) : 1,
    y: t(this, b) ? t(this, M) : 1,
    z: t(this, b) ? t(this, L) : 1
  });
  const e = t(this, v) ? t(this, P) : 0, s = t(this, v) ? t(this, X) : 0, o = t(this, v) ? t(this, A) : 0;
  t(this, r).setStep("_position", "+", {
    x: e,
    y: s,
    z: o
  }), t(this, Z) ? (t(this, l).setStep("_scale", "*", {
    x: t(this, g).x,
    y: t(this, g).y,
    z: t(this, g).z
  }), t(this, r).setStep("_translation", "+", {
    x: t(this, f).x,
    y: t(this, f).y,
    z: t(this, f).z
  }), t(this, c).setStep("_rotation", "+", {
    x: t(this, z).x,
    y: t(this, z).y,
    z: t(this, z).z
  })) : (t(this, l).setStep("_scale", "*", {
    x: 1,
    y: 1,
    z: 1
  }), t(this, r).setStep("_translation", "+", {
    x: 0,
    y: 0,
    z: 0
  }), t(this, c).setStep("_rotation", "+", {
    x: 0,
    y: 0,
    z: 0
  }));
}, D = new WeakSet(), et = function() {
  const e = getComputedStyle(t(this, a));
  n(this, y, Math.max(t(this, a).clientWidth, 1)), n(this, M, Math.max(t(this, a).clientHeight, 1)), n(this, L, Math.max(
    lt.parse(e.getPropertyValue("--depth") || "0px"),
    1
  ));
  const s = K(t(this, m)), o = $(t(this, m)), Y = t(this, m).clientWidth, H = t(this, m).clientHeight;
  if (n(this, d, K(t(this, a)) - s), n(this, S, $(t(this, a)) - o), t(this, _) === "z") {
    const C = t(this, d) / Y, R = t(this, S) / H;
    n(this, d, (C - Math.floor(C)) * Y), n(this, S, (R - Math.floor(R)) * H), t(this, T) === "left" ? n(this, x, K(t(this, a)) - s - t(this, d)) : n(this, x, $(t(this, a)) - o - t(this, S));
  }
  if (n(this, d, t(this, d) + t(this, a).clientLeft), n(this, S, t(this, S) + t(this, a).clientTop), t(this, O)) {
    const C = Math.round(Y / 2), R = Math.round(H / 2), it = t(this, y) ? Math.round(t(this, y) / 2) : 0, ht = t(this, M) ? Math.round(t(this, M) / 2) : 0, nt = t(this, d) - C + it, rt = (t(this, S) - R + ht) * -1;
    n(this, P, nt), n(this, X, rt);
  } else
    n(this, P, t(this, d)), n(this, X, t(this, S));
  n(this, A, t(this, x) * -1);
  const U = new WebKitCSSMatrix(e.transform), u = ut(U);
  t(this, f).x = u.translationX, t(this, f).y = u.translationY, t(this, f).z = u.translationZ, t(this, g).x = u.scaleX, t(this, g).y = u.scaleY, t(this, g).z = u.scaleZ, t(this, z).x = u.rotationX, t(this, z).y = u.rotationY, t(this, z).z = u.rotationZ, E(this, B, tt).call(this), E(this, W, F).call(this);
}, V = new WeakSet(), st = function() {
  for (let e = 0; e < t(this, p).length; e++) {
    const s = t(this, p)[e]();
    let o = s.axis;
    t(this, _) !== "auto" && (o = t(this, _)), t(this, r).setStep(`_scroll_${e}`, "+", {
      [o]: s.value * (o === "x" ? -1 : t(this, O) ? 1 : -1)
    });
  }
}, w = new WeakMap(), q = new WeakMap();
export {
  vt as LayoutBox,
  ut as decomposeCSSMatrix
};
