var f = Object.defineProperty, g = Object.defineProperties;
var b = Object.getOwnPropertyDescriptors;
var u = Object.getOwnPropertySymbols;
var n = Object.prototype.hasOwnProperty, k = Object.prototype.propertyIsEnumerable;
var l = (e, r, c) => r in e ? f(e, r, { enumerable: !0, configurable: !0, writable: !0, value: c }) : e[r] = c, m = (e, r) => {
  for (var c in r || (r = {}))
    n.call(r, c) && l(e, c, r[c]);
  if (u)
    for (var c of u(r))
      k.call(r, c) && l(e, c, r[c]);
  return e;
}, a = (e, r) => g(e, b(r));
import { ticker as x } from "../../ticker/index.js";
import { o as A } from "../../onConnect-y5DrxJ9P.js";
function h(e, r) {
  A((c) => x.subscribe(e, a(m({}, r), {
    culling: (r == null ? void 0 : r.culling) === !0 ? c : r == null ? void 0 : r.culling
  })));
}
export {
  h as onAnimationFrame
};
