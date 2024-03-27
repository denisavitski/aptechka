var f = (e, i, s) => {
  if (!i.has(e))
    throw TypeError("Cannot " + s);
};
var r = (e, i, s) => (f(e, i, "read from private field"), s ? s.call(e) : i.get(e)), d = (e, i, s) => {
  if (i.has(e))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(e) : i.set(e, s);
}, h = (e, i, s, o) => (f(e, i, "write to private field"), o ? o.call(e, s) : i.set(e, s), s);
import { Notifier as p } from "../notifier/index.js";
import { i as z } from "../browser-0zX67oeU.js";
import { d as u } from "../function-C10DGppn.js";
const l = u((e) => {
  e ? window.dispatchEvent(
    new CustomEvent("resize", {
      detail: {
        cause: e
      }
    })
  ) : window.dispatchEvent(new Event("resize"));
}, 0);
var t, n, w;
class a extends p {
  constructor() {
    super();
    d(this, t, !1);
    d(this, n, () => {
      r(this, t) || (h(this, t, !0), r(this, w).call(this));
    });
    d(this, w, u(() => {
      this.notify(), h(this, t, !1);
    }, 0));
    z && (window.addEventListener("resize", r(this, n)), r(this, n).call(this));
  }
  subscribe(s, o) {
    const c = super.subscribe(s, o);
    return r(this, t) || s(), c;
  }
}
t = new WeakMap(), n = new WeakMap(), w = new WeakMap();
const R = new a();
export {
  a as WindowResizer,
  l as dispatchWindowResizeEvent,
  R as windowResizer
};
