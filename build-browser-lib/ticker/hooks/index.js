var f = Object.defineProperty, g = Object.defineProperties;
var b = Object.getOwnPropertyDescriptors;
var m = Object.getOwnPropertySymbols;
var n = Object.prototype.hasOwnProperty, i = Object.prototype.propertyIsEnumerable;
var u = (e, r, c) => r in e ? f(e, r, { enumerable: !0, configurable: !0, writable: !0, value: c }) : e[r] = c, l = (e, r) => {
  for (var c in r || (r = {}))
    n.call(r, c) && u(e, c, r[c]);
  if (m)
    for (var c of m(r))
      i.call(r, c) && u(e, c, r[c]);
  return e;
}, a = (e, r) => g(e, b(r));
import "../../Store-JOKrNVEr.js";
import { o as k } from "../../onConnect-FWEekrNj.js";
import { ticker as x } from "../index.js";
function h(e, r) {
  k((c) => x.subscribe(e, a(l({}, r), {
    culling: (r == null ? void 0 : r.culling) === !0 ? c : r == null ? void 0 : r.culling
  })));
}
export {
  h as onAnimationFrame
};
