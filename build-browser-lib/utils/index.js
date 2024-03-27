import { a as S, p as I } from "../attributes-69we3byR.js";
import { i as Q } from "../browser-0zX67oeU.js";
import { f as D, a as T, g as P } from "../dom-BY7JhTx5.js";
import { c as k, n as B, f as M, p as N, b as j, i as z, m as U, e as V, g as q, j as J, d as K, o as $, a as F, h as G, k as W, l as X } from "../easings-BKi40vHz.js";
import { d as Z } from "../events-_C2CztxR.js";
import { c as H } from "../file-lxi_oXJf.js";
import { d as ee, t as te } from "../function-C10DGppn.js";
import { g as se, a as ne, b as oe } from "../layout-HoBT_Da2.js";
import { e as re, f as ue, c as le, d as ce, l as de, m as me, r as pe, b as fe, a as xe, s as he } from "../math-BOBiC4TN.js";
import { p as be, r as ye } from "../number-Bo5RdrA1.js";
import { c as Ce, d as Oe, i as Ee, b as Se, a as Ie, m as Re, e as Qe, o as ve, p as De } from "../object-R34VLqhp.js";
import { n as Pe } from "../polyfills-DJUYczFm.js";
import { c as ke, a as Be, g as Me, k as Ne, s as je, t as ze, u as Ue } from "../string-3lAkpJJP.js";
import { g as qe, a as Je } from "../style-j2TwriJ_.js";
function c(t, e, ...a) {
  return [...t.slice(0, e), ...a, ...t.slice(e)];
}
function d(t, e) {
  const a = t.measureText(e), s = a.actualBoundingBoxAscent + a.actualBoundingBoxDescent, n = a.width;
  return {
    height: s,
    width: n
  };
}
function m(t) {
  return Math.floor(t) + 0.5;
}
function p(t, e, a, s, n, o) {
  let u = t / e, l = a / s, i = 0, r = 0;
  return n = typeof n == "undefined" ? 0.5 : n, o = typeof o == "undefined" ? 0.5 : o, u > l ? (i = s, r = s * u) : (r = a, i = a / u), [
    (a - r) * n,
    (s - i) * o,
    r,
    i
  ];
}
function f(t, e) {
  return t.x < e.x + e.width && t.x > e.x && t.y < e.y + e.height && t.y > e.y;
}
function x(t, e) {
  return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2) < e.radius;
}
function h(t, e, a = !1) {
  let s = t.x - e.width / 2, n = e.height / 2 - t.y;
  return a && (s = s / (e.width / 2), n = n / (e.height / 2)), { x: s, y: n };
}
function g(t, e) {
  const a = t.x / e.x, s = t.y / e.y;
  return { x: a, y: s };
}
function b(t, e) {
  return e = e || {
    x: 0,
    y: 0,
    width: document.documentElement.offsetWidth,
    height: innerHeight
  }, {
    x: (t.x - e.x) / e.width * e.width,
    y: (t.y - e.y) / e.height * e.height
  };
}
function y(...t) {
  const e = {};
  return Array.from(document.styleSheets).forEach((a) => {
    Array.from(a.cssRules).forEach((s) => {
      s instanceof CSSStyleRule && s.selectorText === ":root" && t.forEach((n) => {
        const o = s.styleMap.get(n);
        o ? e[n] = o.toString() : console.warn(`variable named ${n} not found`);
      });
    });
  }), e;
}
function w(t) {
  const e = window.atob(t);
  return decodeURIComponent(window.escape(e));
}
function C(t) {
  const e = window.unescape(encodeURIComponent(t));
  return window.btoa(e);
}
export {
  re as calculateDistance,
  ue as calculateDistanceWithRadius,
  ke as camelToKebab,
  Be as capitalize,
  le as clamp,
  Ce as cloneDeep,
  Oe as compareObjects,
  p as cover,
  H as createJSONAndSave,
  ce as damp,
  ee as debounce,
  C as decode,
  Z as dispatchSizeChangeEvent,
  x as dotCircleCollision,
  f as dotRectCollision,
  k as easeInCubic,
  B as easeInExpo,
  M as easeInOutCubic,
  N as easeInOutExpo,
  j as easeInOutQuad,
  z as easeInOutQuart,
  U as easeInOutQuint,
  V as easeInQuad,
  q as easeInQuart,
  J as easeInQuint,
  K as easeOutCubic,
  $ as easeOutExpo,
  F as easeOutQuad,
  G as easeOutQuart,
  W as easeOutQuint,
  w as encode,
  D as findParentElement,
  T as findScrollParentElement,
  m as fixPosition,
  Me as generateId,
  se as getCumulativeOffsetLeft,
  ne as getCumulativeOffsetTop,
  oe as getCumulativePosition,
  P as getElement,
  qe as getElementTransitionDurationMS,
  Je as getElementTransitionDurationS,
  b as getPointerPosition,
  y as getRootVariables,
  c as insert,
  Q as isBrowser,
  Ee as isESClass,
  Se as isNullish,
  Ie as isObject,
  Ne as kebabToCamel,
  de as lerp,
  X as linear,
  me as mapRange,
  d as measureText,
  Re as mergeDeep,
  Qe as mixin,
  g as normalize,
  Pe as nullishCoalescing,
  ve as omit,
  S as parseAttribute,
  I as parseAttributeValue,
  De as pick,
  be as preciseNumber,
  pe as round,
  ye as roundNumberTo,
  h as screenToCartesian,
  fe as smootherstep,
  xe as smoothstep,
  je as snakeToDotted,
  he as step,
  te as throttle,
  ze as toPascalCase,
  Ue as uncapitalize
};
