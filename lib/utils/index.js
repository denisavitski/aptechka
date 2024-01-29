import { a as B, p as T } from "../attributes-w0u-KiIb.js";
import { i as U } from "../browser-S4eq8AeN.js";
import { f as M, a as J, g as q } from "../dom-bHEwc_xV.js";
import { c as V, n as W, f as G, p as L, b as X, i as Y, m as Z, e as _, g as $, j as F, d as H, o as b, a as j, h as ee, k as te, l as ne } from "../easings-uF-tgahf.js";
import { d as ae, t as ie } from "../function-zwSFehNd.js";
import { g as oe, a as ue, b as ce } from "../layout-5SJlcXTY.js";
import { e as fe, f as de, c as pe, d as ye, l as me, m as he, r as xe, b as we, a as ge, s as Oe } from "../math-_a3IpKOc.js";
import { f as Ce, g as ke, r as Ae } from "../number-bCHB2GAD.js";
import { c as ve, a as Pe, k as Qe, s as Re, t as De } from "../string-GmxZA5Nq.js";
function m(e, t, ...n) {
  return [...e.slice(0, t), ...n, ...e.slice(t)];
}
function h(e, t) {
  const n = e.measureText(t), s = n.actualBoundingBoxAscent + n.actualBoundingBoxDescent, a = n.width;
  return {
    height: s,
    width: a
  };
}
function x(e) {
  return Math.floor(e) + 0.5;
}
function w(e, t, n, s, a, i) {
  let u = e / t, l = n / s, r = 0, o = 0;
  return a = typeof a == "undefined" ? 0.5 : a, i = typeof i == "undefined" ? 0.5 : i, u > l ? (r = s, o = s * u) : (o = n, r = n / u), [
    (n - o) * a,
    (s - r) * i,
    o,
    r
  ];
}
function g(e, t) {
  return e.x < t.x + t.width && e.x > t.x && e.y < t.y + t.height && e.y > t.y;
}
function O(e, t) {
  return Math.sqrt((e.x - t.x) ** 2 + (e.y - t.y) ** 2) < t.radius;
}
function I(e, t, n = !1) {
  let s = e.x - t.width / 2, a = t.height / 2 - e.y;
  return n && (s = s / (t.width / 2), a = a / (t.height / 2)), { x: s, y: a };
}
function C(e, t) {
  const n = e.x / t.x, s = e.y / t.y;
  return { x: n, y: s };
}
function k(e, t) {
  return t = t || {
    x: 0,
    y: 0,
    width: document.documentElement.offsetWidth,
    height: innerHeight
  }, {
    x: (e.x - t.x) / t.width * t.width,
    y: (e.y - t.y) / t.height * t.height
  };
}
function A(e) {
  const t = window.atob(e);
  return decodeURIComponent(window.escape(t));
}
function E(e) {
  const t = window.unescape(encodeURIComponent(e));
  return window.btoa(t);
}
function v({ ms: e = 200 } = {}) {
  setInterval(() => {
    window.dispatchEvent(new Event("resize"));
  }, e);
}
function P(e, t) {
  const n = new Blob([JSON.stringify(t)], { type: "application/json" }), s = document.createElement("a");
  s.download = e + ".json", s.href = window.URL.createObjectURL(n), s.dataset.downloadurl = ["application/json", s.download, s.href].join(":");
  const a = new MouseEvent("click", {
    view: window,
    bubbles: !0,
    cancelable: !0
  });
  s.dispatchEvent(a), s.remove();
}
function f(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function d(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Date)
    return new Date(e.getTime());
  if (e instanceof Node)
    return e;
  const t = Array.isArray(e) ? [] : {};
  for (const n in e)
    e.hasOwnProperty(n) && (t[n] = d(e[n]));
  return t;
}
function p(e, t, n = f) {
  for (const s in t)
    n(t[s]) ? (e[s] || Object.assign(e, { [s]: {} }), p(e[s], t[s], n)) : Object.assign(e, { [s]: t[s] });
  return e;
}
function y(e) {
  return e === null || typeof e == "undefined";
}
function c(e, t) {
  if (typeof e != typeof t)
    return !1;
  if ([e, t].some((n) => y(n)))
    return e === t;
  if (Array.isArray(e)) {
    const n = e.length > t.length ? e : t, s = e.length > t.length ? t : e;
    return n.every((a, i) => c(a, s[i]));
  }
  if (typeof e != "object" || e instanceof Node || typeof e == "object" && e.constructor.toString().startsWith("class"))
    return e === t;
  for (const n in e) {
    if (!t.hasOwnProperty(n))
      return !1;
    if (typeof e[n] == "object" && typeof t[n] == "object") {
      if (!c(e[n], t[n]))
        return !1;
    } else if (e[n] !== t[n])
      return !1;
  }
  return !0;
}
function Q(e, t) {
  const n = {};
  for (const s in e)
    t.includes(s) && (n[s] = e[s]);
  return n;
}
function R(e, t) {
  const n = {};
  for (const s in e)
    t.includes(s) || (n[s] = e[s]);
  return n;
}
export {
  fe as calculateDistance,
  de as calculateDistanceWithRadius,
  ve as camelToKebab,
  Pe as capitalize,
  pe as clamp,
  d as cloneDeep,
  c as compareObjects,
  w as cover,
  P as createJSONAndSave,
  ye as damp,
  ae as debounce,
  E as decode,
  O as dotCircleCollision,
  g as dotRectCollision,
  V as easeInCubic,
  W as easeInExpo,
  G as easeInOutCubic,
  L as easeInOutExpo,
  X as easeInOutQuad,
  Y as easeInOutQuart,
  Z as easeInOutQuint,
  _ as easeInQuad,
  $ as easeInQuart,
  F as easeInQuint,
  H as easeOutCubic,
  b as easeOutExpo,
  j as easeOutQuad,
  ee as easeOutQuart,
  te as easeOutQuint,
  A as encode,
  M as findParentElement,
  J as findScrollParentElement,
  Ce as fix,
  x as fixPosition,
  ke as generateId,
  oe as getCumulativeOffsetLeft,
  ue as getCumulativeOffsetTop,
  ce as getCumulativePosition,
  q as getElement,
  k as getPointerPosition,
  m as insert,
  U as isBrowser,
  y as isNullish,
  f as isObject,
  Qe as kebabToCamel,
  me as lerp,
  ne as linear,
  he as mapRange,
  h as measureText,
  p as mergeDeep,
  C as normalize,
  R as omit,
  B as parseAttribute,
  T as parseAttributeValue,
  Q as pick,
  v as resizeInterval,
  xe as round,
  Ae as roundTo,
  I as screenToCartesian,
  we as smootherstep,
  ge as smoothstep,
  Re as snakeToDotted,
  Oe as step,
  ie as throttle,
  De as toPascalCase
};
