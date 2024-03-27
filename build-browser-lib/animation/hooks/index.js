var f = Object.defineProperty, d = Object.defineProperties;
var w = Object.getOwnPropertyDescriptors;
var m = Object.getOwnPropertySymbols;
var D = Object.prototype.hasOwnProperty, T = Object.prototype.propertyIsEnumerable;
var a = (u, e, r) => e in u ? f(u, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : u[e] = r, l = (u, e) => {
  for (var r in e || (e = {}))
    D.call(e, r) && a(u, r, e[r]);
  if (m)
    for (var r of m(e))
      T.call(e, r) && a(u, r, e[r]);
  return u;
}, c = (u, e) => d(u, w(e));
import { _ as g } from "../../createStore-DncUX-yj.js";
import "../../Store-JOKrNVEr.js";
import { D as _ } from "../../Damped-DEHDBwBz.js";
import { Tweened as x } from "../index.js";
function q(u, e) {
  return g(
    (r) => new x(u, c(l({}, e), {
      culling: (e == null ? void 0 : e.culling) === !0 ? r : e == null ? void 0 : e.culling
    }))
  );
}
function v(u, e) {
  return g((r) => new _(u, c(l({}, e), {
    culling: (e == null ? void 0 : e.culling) === !0 ? r : e == null ? void 0 : e.culling
  })));
}
export {
  v as createDamped,
  q as createTweened
};
