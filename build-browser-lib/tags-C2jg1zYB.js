var s = Object.defineProperty, c = Object.defineProperties;
var f = Object.getOwnPropertyDescriptors;
var a = Object.getOwnPropertySymbols;
var w = Object.prototype.hasOwnProperty, d = Object.prototype.propertyIsEnumerable;
var o = (n, e, r) => e in n ? s(n, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : n[e] = r, u = (n, e) => {
  for (var r in e || (e = {}))
    w.call(e, r) && o(n, r, e[r]);
  if (a)
    for (var r of a(e))
      d.call(e, r) && o(n, r, e[r]);
  return n;
}, i = (n, e) => c(n, f(e));
import { E as t } from "./ElementConstructor-CvNdPKJy.js";
function p(...n) {
  return new t(...n);
}
function b(n) {
  return new t("a", n);
}
function h(n) {
  return new t("abbr", n);
}
function g(n) {
  return new t("address", n);
}
function y(n) {
  return new t("area", n);
}
function k(n) {
  return new t("article", n);
}
function v(n) {
  return new t("aside", n);
}
function q(n) {
  return new t("audio", n);
}
function x(n) {
  return new t("b", n);
}
function E(n) {
  return new t("base", n);
}
function C(n) {
  return new t("bdi", n);
}
function D(n) {
  return new t("bdo", n);
}
function F(n) {
  return new t("blockquote", n);
}
function N(n) {
  return new t("body", n);
}
function T(n) {
  return new t("br", n);
}
function V(n) {
  return new t("button", n);
}
function z(n) {
  return new t("canvas", n);
}
function A(n) {
  return new t("caption", n);
}
function B(n) {
  return new t("cite", n);
}
function G(n) {
  return new t("code", n);
}
function H(n) {
  return new t("col", n);
}
function I(n) {
  return new t("colgroup", n);
}
function J(n) {
  return new t("data", n);
}
function K(n) {
  return new t("datalist", n);
}
function L(n) {
  return new t("dd", n);
}
function M(n) {
  return new t("del", n);
}
function O(n) {
  return new t("details", n);
}
function P(n) {
  return new t("dfn", n);
}
function Q(n) {
  return new t("dialog", n);
}
function R(n) {
  return new t("div", n);
}
function S(n) {
  return new t("dl", n);
}
function U(n) {
  return new t("dt", n);
}
function W(n) {
  return new t("em", n);
}
function X(n) {
  return new t("embed", n);
}
function Y(n) {
  return new t("fieldset", n);
}
function Z(n) {
  return new t("figcaption", n);
}
function _(n) {
  return new t("figure", n);
}
function $(n) {
  return new t("footer", n);
}
function j(n) {
  return new t("form", n);
}
function nn(n) {
  return new t("h1", n);
}
function tn(n) {
  return new t("h2", n);
}
function en(n) {
  return new t("h3", n);
}
function rn(n) {
  return new t("h4", n);
}
function un(n) {
  return new t("h5", n);
}
function an(n) {
  return new t("h6", n);
}
function on(n) {
  return new t("head", n);
}
function sn(n) {
  return new t("header", n);
}
function cn(n) {
  return new t("hgroup", n);
}
function fn(n) {
  return new t("hr", n);
}
function wn(n) {
  return new t("html", n);
}
function dn(n) {
  return new t("i", n);
}
function ln(n) {
  return new t("iframe", n);
}
function mn(n) {
  return new t("img", n);
}
function pn(n) {
  return new t("input", n);
}
function bn(n) {
  return new t("ins", n);
}
function hn(n) {
  return new t("kbd", n);
}
function gn(n) {
  return new t("label", n);
}
function yn(n) {
  return new t("legend", n);
}
function kn(n) {
  return new t("li", n);
}
function vn(n) {
  return new t("link", n);
}
function qn(n) {
  return new t("main", n);
}
function xn(n) {
  return new t("map", n);
}
function En(n) {
  return new t("mark", n);
}
function Cn(n) {
  return new t("menu", n);
}
function Dn(n) {
  return new t("meta", n);
}
function Fn(n) {
  return new t("meter", n);
}
function Nn(n) {
  return new t("nav", n);
}
function Tn(n) {
  return new t("noscript", n);
}
function Vn(n) {
  return new t("object", n);
}
function zn(n) {
  return new t("ol", n);
}
function An(n) {
  return new t("optgroup", n);
}
function Bn(n) {
  return new t("option", n);
}
function Gn(n) {
  return new t("output", n);
}
function Hn(n) {
  return new t("p", n);
}
function In(n) {
  return new t("picture", n);
}
function Jn(n) {
  return new t("pre", n);
}
function Kn(n) {
  return new t("progress", n);
}
function Ln(n) {
  return new t("q", n);
}
function Mn(n) {
  return new t("rp", n);
}
function On(n) {
  return new t("rt", n);
}
function Pn(n) {
  return new t("ruby", n);
}
function Qn(n) {
  return new t("s", n);
}
function Rn(n) {
  return new t("samp", n);
}
function Sn(n) {
  return new t("script", n);
}
function Un(n) {
  return new t("search", n);
}
function Wn(n) {
  return new t("section", n);
}
function Xn(n) {
  return new t("select", n);
}
function Yn(n) {
  return new t("slot", n);
}
function Zn(n) {
  return new t("small", n);
}
function _n(n) {
  return new t("source", n);
}
function $n(n) {
  return new t("span", n);
}
function jn(n) {
  return new t("strong", n);
}
function nt(n) {
  return new t("style", {
    style: n
  });
}
function tt(n) {
  return new t("sub", n);
}
function et(n) {
  return new t("summary", n);
}
function rt(n) {
  return new t("sup", n);
}
function ut(n) {
  return new t("table", n);
}
function at(n) {
  return new t("tbody", n);
}
function ot(n) {
  return new t("td", n);
}
function it(n) {
  return new t("template", n);
}
function st(n) {
  return new t("textarea", n);
}
function ct(n) {
  return new t("tfoot", n);
}
function ft(n) {
  return new t("th", n);
}
function wt(n) {
  return new t("thead", n);
}
function dt(n) {
  return new t("time", n);
}
function lt(n) {
  return new t("title", n);
}
function mt(n) {
  return new t("tr", n);
}
function pt(n) {
  return new t("track", n);
}
function bt(n) {
  return new t("u", n);
}
function ht(n) {
  return new t("ul", n);
}
function gt(n) {
  return new t("var", n);
}
function yt(n) {
  return new t("video", n);
}
function kt(n) {
  return new t("wbr", n);
}
function vt(n) {
  return new t(document.createDocumentFragment(), n);
}
function qt(n) {
  return new t(document.createTextNode(""), n);
}
function xt(n) {
  return new t("div", i(u({}, n), {
    style: u({
      display: "contents"
    }, n == null ? void 0 : n.style)
  }));
}
export {
  pn as $,
  O as A,
  P as B,
  Q as C,
  R as D,
  S as E,
  U as F,
  W as G,
  X as H,
  Y as I,
  Z as J,
  _ as K,
  $ as L,
  j as M,
  nn as N,
  tn as O,
  en as P,
  rn as Q,
  un as R,
  an as S,
  on as T,
  sn as U,
  cn as V,
  fn as W,
  wn as X,
  dn as Y,
  ln as Z,
  mn as _,
  b as a,
  bn as a0,
  hn as a1,
  gn as a2,
  yn as a3,
  kn as a4,
  vn as a5,
  qn as a6,
  xn as a7,
  En as a8,
  Cn as a9,
  $n as aA,
  jn as aB,
  nt as aC,
  tt as aD,
  et as aE,
  rt as aF,
  ut as aG,
  at as aH,
  ot as aI,
  it as aJ,
  st as aK,
  ct as aL,
  ft as aM,
  wt as aN,
  dt as aO,
  lt as aP,
  mt as aQ,
  pt as aR,
  bt as aS,
  ht as aT,
  gt as aU,
  yt as aV,
  kt as aW,
  vt as aX,
  qt as aY,
  xt as aZ,
  Dn as aa,
  Fn as ab,
  Nn as ac,
  Tn as ad,
  Vn as ae,
  zn as af,
  An as ag,
  Bn as ah,
  Gn as ai,
  Hn as aj,
  In as ak,
  Jn as al,
  Kn as am,
  Ln as an,
  Mn as ao,
  On as ap,
  Pn as aq,
  Qn as ar,
  Rn as as,
  Sn as at,
  Un as au,
  Wn as av,
  Xn as aw,
  Yn as ax,
  Zn as ay,
  _n as az,
  h as b,
  g as c,
  y as d,
  p as e,
  k as f,
  v as g,
  q as h,
  x as i,
  E as j,
  C as k,
  D as l,
  F as m,
  N as n,
  T as o,
  V as p,
  z as q,
  A as r,
  B as s,
  G as t,
  H as u,
  I as v,
  J as w,
  K as x,
  L as y,
  M as z
};
