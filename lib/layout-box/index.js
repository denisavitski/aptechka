var K = (i, s, e) => {
  if (!s.has(i))
    throw TypeError("Cannot " + e);
};
var t = (i, s, e) => (K(i, s, "read from private field"), e ? e.call(i) : s.get(i)), h = (i, s, e) => {
  if (s.has(i))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(i) : s.set(i, e);
}, n = (i, s, e, o) => (K(i, s, "write to private field"), o ? o.call(i, e) : s.set(i, e), e);
var g = (i, s, e) => (K(i, s, "access private method"), e);
import { cssUnitParser as ot } from "../css-unit-parser/index.js";
import { Ladder as I } from "../ladder/index.js";
import { TICK_ORDER as J } from "../order/index.js";
import { resizer as N } from "../resizer/index.js";
import { scrollEnties as lt } from "../scroll-entries/index.js";
import { ticker as Q } from "../ticker/index.js";
import { i as j } from "../browser-S4eq8AeN.js";
import { g as V, a as $ } from "../layout-5SJlcXTY.js";
import "../Store-qq7IjRLE.js";
import "../notifier/index.js";
import "../function-zwSFehNd.js";
import "../intersector/index.js";
function at(i) {
  const s = Math.sqrt(
    i.m11 * i.m11 + i.m12 * i.m12 + i.m13 * i.m13
  ), e = Math.sqrt(
    i.m21 * i.m21 + i.m22 * i.m22 + i.m23 * i.m23
  ), o = Math.sqrt(
    i.m31 * i.m31 + i.m32 * i.m32 + i.m33 * i.m33
  ), v = Math.atan2(i.m32, i.m33), H = Math.atan2(
    -i.m31,
    Math.sqrt(i.m32 * i.m32 + i.m33 * i.m33)
  ), k = Math.atan2(i.m21, i.m11), u = i.m41, E = i.m42, L = i.m43;
  return {
    scaleX: s,
    scaleY: e,
    scaleZ: o,
    rotationX: v,
    rotationY: H,
    rotationZ: k,
    translationX: u,
    translationY: E,
    translationZ: L
  };
}
var l, p, f, C, R, O, b, x, M, _, P, S, d, w, X, Y, T, m, y, z, c, r, a, Z, F, B, tt, D, st, U, et, q, G, A, W;
class Ct {
  constructor(s, e) {
    h(this, Z);
    h(this, B);
    h(this, D);
    h(this, U);
    h(this, q);
    h(this, l, null);
    h(this, p, null);
    h(this, f, []);
    h(this, C, "auto");
    h(this, R, "top");
    h(this, O, !1);
    h(this, b, !0);
    h(this, x, !0);
    h(this, M, 0);
    h(this, _, 0);
    h(this, P, 0);
    h(this, S, 0);
    h(this, d, 0);
    h(this, w, 0);
    h(this, X, 0);
    h(this, Y, 0);
    h(this, T, 0);
    h(this, m, { x: 0, y: 0, z: 0 });
    h(this, y, { x: 0, y: 0, z: 0 });
    h(this, z, { x: 1, y: 1, z: 1 });
    h(this, c, new I({ x: 0, y: 0, z: 0 }));
    h(this, r, new I({ x: 0, y: 0, z: 0 }));
    h(this, a, new I({ x: 0, y: 0, z: 0 }));
    h(this, A, () => {
      j && g(this, D, st).call(this);
    });
    h(this, W, () => {
      g(this, U, et).call(this), g(this, Z, F).call(this);
    });
    j && (n(this, l, g(this, q, G).call(this, s) || document.body), n(this, p, g(this, q, G).call(this, e == null ? void 0 : e.containerElement) || document.body), n(this, C, (e == null ? void 0 : e.scrollAxis) || "auto"), n(this, R, (e == null ? void 0 : e.frontSide) || "top"), n(this, O, (e == null ? void 0 : e.cartesian) || !1), n(this, b, (e == null ? void 0 : e.sizeStep) !== void 0 ? e.sizeStep : !0), n(this, x, (e == null ? void 0 : e.positionStep) !== void 0 ? e.positionStep : !0), t(this, a).setStep("_size", "+", {
      x: 1,
      y: 1,
      z: 1
    }), t(this, r).setStep("_position", "+", {
      x: 0,
      y: 0,
      z: 0
    }), t(this, a).setStep("_scale", "*", {
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
      lt.getAll(this.element).forEach((v) => {
        this.setScrollStep(() => v);
      });
    }), Q.subscribe(t(this, W), {
      order: J.LAYOUT_BOX,
      culling: e != null && e.culling ? this.element : void 0
    }), N.subscribe(t(this, A), J.LAYOUT_BOX));
  }
  get element() {
    return t(this, l);
  }
  get containerElement() {
    return t(this, p);
  }
  get position() {
    return t(this, r).current;
  }
  get rotation() {
    return t(this, c).current;
  }
  get scale() {
    return t(this, a).current;
  }
  get left() {
    return t(this, d);
  }
  get top() {
    return t(this, S);
  }
  get front() {
    return t(this, w);
  }
  get width() {
    return t(this, M);
  }
  get height() {
    return t(this, _);
  }
  get depth() {
    return t(this, P);
  }
  bindObject(s) {
    s.position && t(this, r).bind(s.position), s.rotation && t(this, c).bind(s.rotation), s.scale && t(this, a).bind(s.scale);
  }
  unbindObject(s) {
    s.position && t(this, r).unbind(s.position), s.rotation && t(this, c).unbind(s.rotation), s.scale && t(this, a).unbind(s.scale);
  }
  setScrollStep(s) {
    return t(this, f).includes(s) || t(this, f).push(s), () => this.deleteScrollStep(s);
  }
  deleteScrollStep(s) {
    n(this, f, t(this, f).filter((e) => e !== s));
  }
  destroy() {
    Q.unsubscribe(t(this, W)), N.unsubscribe(t(this, A)), t(this, r).close(), t(this, c).close(), t(this, a).close();
  }
  setPositionStep(...s) {
    t(this, r).setStep(...s);
  }
  setRotationStep(...s) {
    t(this, c).setStep(...s);
  }
  setScaleStep(...s) {
    t(this, a).setStep(...s);
  }
  deletePositionStep(...s) {
    t(this, r).deleteStep(...s);
  }
  deleteRotationStep(...s) {
    t(this, c).deleteStep(...s);
  }
  deleteScaleStep(...s) {
    t(this, a).deleteStep(...s);
  }
}
l = new WeakMap(), p = new WeakMap(), f = new WeakMap(), C = new WeakMap(), R = new WeakMap(), O = new WeakMap(), b = new WeakMap(), x = new WeakMap(), M = new WeakMap(), _ = new WeakMap(), P = new WeakMap(), S = new WeakMap(), d = new WeakMap(), w = new WeakMap(), X = new WeakMap(), Y = new WeakMap(), T = new WeakMap(), m = new WeakMap(), y = new WeakMap(), z = new WeakMap(), c = new WeakMap(), r = new WeakMap(), a = new WeakMap(), Z = new WeakSet(), F = function() {
  t(this, a).calculate(), t(this, r).calculate(), t(this, c).calculate();
}, B = new WeakSet(), tt = function() {
  t(this, a).setStep("_size", "+", {
    x: t(this, b) ? t(this, M) : 1,
    y: t(this, b) ? t(this, _) : 1,
    z: t(this, b) ? t(this, P) : 1
  });
  const s = t(this, x) ? t(this, X) : 0, e = t(this, x) ? t(this, Y) : 0, o = t(this, x) ? t(this, T) : 0;
  t(this, r).setStep("_position", "+", {
    x: s,
    y: e,
    z: o
  }), t(this, a).setStep("_scale", "*", {
    x: t(this, z).x,
    y: t(this, z).y,
    z: t(this, z).z
  }), t(this, r).setStep("_translation", "+", {
    x: t(this, m).x,
    y: t(this, m).y,
    z: t(this, m).z
  }), t(this, c).setStep("_rotation", "+", {
    x: t(this, y).x,
    y: t(this, y).y,
    z: t(this, y).z
  });
}, D = new WeakSet(), st = function() {
  const s = getComputedStyle(t(this, l));
  n(this, M, Math.max(t(this, l).clientWidth, 1)), n(this, _, Math.max(t(this, l).clientHeight, 1)), n(this, P, Math.max(ot.parse(s.getPropertyValue("--depth") || "0px"), 1));
  const e = V(t(this, p)), o = $(t(this, p)), v = t(this, p).clientWidth, H = t(this, p).clientHeight;
  if (n(this, d, V(t(this, l)) - e), n(this, S, $(t(this, l)) - o), t(this, C) === "z") {
    const E = t(this, d) / v, L = t(this, S) / H;
    n(this, d, (E - Math.floor(E)) * v), n(this, S, (L - Math.floor(L)) * H), t(this, R) === "left" ? n(this, w, V(t(this, l)) - e - t(this, d)) : n(this, w, $(t(this, l)) - o - t(this, S));
  }
  if (n(this, d, t(this, d) + t(this, l).clientLeft), n(this, S, t(this, S) + t(this, l).clientTop), t(this, O)) {
    const E = Math.round(v / 2), L = Math.round(H / 2), it = t(this, M) ? Math.round(t(this, M) / 2) : 0, ht = t(this, _) ? Math.round(t(this, _) / 2) : 0, nt = t(this, d) - E + it, rt = (t(this, S) - L + ht) * -1;
    n(this, X, nt), n(this, Y, rt);
  } else
    n(this, X, t(this, d)), n(this, Y, t(this, S));
  n(this, T, t(this, w) * -1);
  const k = new WebKitCSSMatrix(s.transform), u = at(k);
  t(this, m).x = u.translationX, t(this, m).y = u.translationY, t(this, m).z = u.translationZ, t(this, z).x = u.scaleX, t(this, z).y = u.scaleY, t(this, z).z = u.scaleZ, t(this, y).x = u.rotationX, t(this, y).y = u.rotationY, t(this, y).z = u.rotationZ, g(this, B, tt).call(this), g(this, Z, F).call(this);
}, U = new WeakSet(), et = function() {
  for (let s = 0; s < t(this, f).length; s++) {
    const e = t(this, f)[s]();
    let o = e.axis;
    t(this, C) !== "auto" && (o = t(this, C)), t(this, r).setStep(`_scroll_${s}`, "+", {
      [o]: e.value * (o === "x" ? -1 : t(this, O) ? 1 : -1)
    });
  }
}, q = new WeakSet(), G = function(s) {
  return typeof s == "string" ? document.querySelector(s) : s;
}, A = new WeakMap(), W = new WeakMap();
export {
  Ct as LayoutBox,
  at as decomposeCSSMatrix
};
