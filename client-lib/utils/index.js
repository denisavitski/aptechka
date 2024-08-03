import { a as b, p as C } from "../attributes-69we3byR.js";
import { i as w } from "../browser-0zX67oeU.js";
import { a as y, c as O, f as B, m as I } from "../canvas-DeZ0SLUJ.js";
import { g as T, n as v, s as A } from "../coordinates-CgdGoSYs.js";
import { f as D, b as M, g as R, a as z } from "../dom-P5QbAASX.js";
import { c as j, n as N, f as V, p as U, b as $, i as F, m as K, e as W, g as q, j as G, d as H, o as J, a as L, h as Y, k as Z, l as X } from "../easings-BKi40vHz.js";
import { d as ee, a as ae } from "../events-CJTUMSLU.js";
import { c as se } from "../file-lxi_oXJf.js";
import { d as ne, t as re } from "../function-C10DGppn.js";
import { s as ue } from "../gestures-D2Fdra_G.js";
import { g as le, a as fe, b as pe } from "../layout-HoBT_Da2.js";
import { e as de, f as ge, c as xe, d as he, l as be, m as Ce, r as Ee, b as we, a as Se, s as ye } from "../math-BOBiC4TN.js";
import { n as Be, p as Ie, r as Pe, t as Te } from "../polyfills-X6KXuHg-.js";
import { c as Ae, d as Qe, i as De, b as Me, a as Re, m as ze, e as ke, o as je, p as Ne } from "../object-D6MVWB4l.js";
import { c as Ue, a as $e, g as Fe, i as Ke, k as We, s as qe, t as Ge, u as He } from "../string-f0Dnk0L1.js";
import { g as Le, a as Ye } from "../style-j2TwriJ_.js";
import { c as Xe, n as _e, s as ea } from "../url-DMNfW7uN.js";
function i(a, e, ...t) {
  return [...a.slice(0, e), ...t, ...a.slice(e)];
}
function u(a, e) {
  const t = a.length;
  e = e % t;
  const s = new Array(t);
  for (let o = 0; o < t; o++) {
    const n = (o + e) % t;
    s[n] = a[o];
  }
  return s;
}
function c(a, e = 2) {
  if (!+a)
    return "0 Bytes";
  const t = 1024, s = e < 0 ? 0 : e, o = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB"
  ], n = Math.floor(Math.log(a) / Math.log(t));
  return `${parseFloat((a / Math.pow(t, n)).toFixed(s))} ${o[n]}`;
}
function l(a, e) {
  return a.x < e.x + e.width && a.x > e.x && a.y < e.y + e.height && a.y > e.y;
}
function f(a, e) {
  return Math.sqrt((a.x - e.x) ** 2 + (a.y - e.y) ** 2) < e.radius;
}
function r(a, e) {
  const t = a.styleMap.get(e);
  if (t) {
    const s = t.toString();
    return s.startsWith("var") ? r(a, s.slice(4, -1)) : s;
  }
}
function p(...a) {
  const e = {};
  return Array.from(document.styleSheets).forEach((t) => {
    Array.from(t.cssRules).forEach((s) => {
      s instanceof CSSStyleRule && s.selectorText === ":root" && a.forEach((o) => {
        const n = r(s, o);
        n && (e[o] = n);
      });
    });
  }), a.forEach((t) => {
    e[t] || console.warn(`variable named ${t} not found`);
  }), e;
}
function m(a) {
  const e = window.atob(a);
  return decodeURIComponent(window.escape(e));
}
function d(a) {
  const e = window.unescape(encodeURIComponent(a));
  return window.btoa(e);
}
function g(a) {
  return new Promise((e) => {
    setTimeout(() => {
      e();
    }, a);
  });
}
export {
  de as calculateDistance,
  ge as calculateDistanceWithRadius,
  Ue as camelToKebab,
  $e as capitalize,
  Xe as changeHistory,
  xe as clamp,
  Ae as cloneDeep,
  Qe as compareObjects,
  y as contain,
  O as cover,
  se as createJSONAndSave,
  he as damp,
  ne as debounce,
  d as decode,
  ee as dispatchBeforeSizeChangeEvent,
  ae as dispatchSizeChangeEvent,
  f as dotCircleCollision,
  l as dotRectCollision,
  j as easeInCubic,
  N as easeInExpo,
  V as easeInOutCubic,
  U as easeInOutExpo,
  $ as easeInOutQuad,
  F as easeInOutQuart,
  K as easeInOutQuint,
  W as easeInQuad,
  q as easeInQuart,
  G as easeInQuint,
  H as easeOutCubic,
  J as easeOutExpo,
  L as easeOutQuad,
  Y as easeOutQuart,
  Z as easeOutQuint,
  m as encode,
  D as findParentElement,
  M as findScrollParentElement,
  B as fixPosition,
  c as formatBytes,
  Fe as generateId,
  R as getAllParentElements,
  le as getCumulativeOffsetLeft,
  fe as getCumulativeOffsetTop,
  pe as getCumulativePosition,
  z as getElement,
  Le as getElementTransitionDurationMS,
  Ye as getElementTransitionDurationS,
  T as getPointerPosition,
  p as getRootVariables,
  i as insert,
  w as isBrowser,
  De as isESClass,
  Me as isNullish,
  Re as isObject,
  Ke as isUppercase,
  We as kebabToCamel,
  be as lerp,
  X as linear,
  Ce as mapRange,
  I as measureText,
  ze as mergeDeep,
  ke as mixin,
  v as normalize,
  _e as normalizeBase,
  Be as nullishCoalescing,
  je as omit,
  b as parseAttribute,
  C as parseAttributeValue,
  Ne as pick,
  Ie as preciseNumber,
  Ee as round,
  Pe as roundNumberTo,
  A as screenToCartesian,
  ue as setupDrag,
  u as shiftArray,
  we as smootherstep,
  Se as smoothstep,
  qe as snakeToDotted,
  ea as splitPath,
  ye as step,
  re as throttle,
  Ge as toPascalCase,
  Te as toStep,
  He as uncapitalize,
  g as wait
};
