var u = Object.defineProperty, d = Object.defineProperties;
var m = Object.getOwnPropertyDescriptors;
var n = Object.getOwnPropertySymbols;
var p = Object.prototype.hasOwnProperty, s = Object.prototype.propertyIsEnumerable;
var i = (e, r, t) => r in e ? u(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t, o = (e, r) => {
  for (var t in r || (r = {}))
    p.call(r, t) && i(e, t, r[t]);
  if (n)
    for (var t of n(r))
      s.call(r, t) && i(e, t, r[t]);
  return e;
}, a = (e, r) => d(e, m(r));
import { h as f, i as c } from "../instantiate-BYzkD4SE.js";
import { F as b } from "../instantiate-BYzkD4SE.js";
function h(e, r = null, ...t) {
  return f(e, a(o({}, r), { __register: !0 }), ...t);
}
function x(e, r = document.body) {
  r.appendChild(c(e));
}
export {
  b as Fragment,
  f as h,
  c as instantiate,
  h as register,
  x as render
};
