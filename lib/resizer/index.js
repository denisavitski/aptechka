var u = (e, s, i) => {
  if (!s.has(e))
    throw TypeError("Cannot " + i);
};
var r = (e, s, i) => (u(e, s, "read from private field"), i ? i.call(e) : s.get(e)), d = (e, s, i) => {
  if (s.has(e))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(e) : s.set(e, i);
}, f = (e, s, i, o) => (u(e, s, "write to private field"), o ? o.call(e, i) : s.set(e, i), i);
import { Notifier as z } from "../notifier/index.js";
import { i as w } from "../browser-S4eq8AeN.js";
import { d as c } from "../function-zwSFehNd.js";
const l = c((e) => {
  e ? window.dispatchEvent(
    new CustomEvent("resize", {
      detail: {
        cause: e
      }
    })
  ) : window.dispatchEvent(new Event("resize"));
}, 0);
var t, n, h;
class a extends z {
  constructor() {
    super();
    d(this, t, !1);
    d(this, n, () => {
      r(this, t) || (f(this, t, !0), r(this, h).call(this));
    });
    d(this, h, c(() => {
      this.notify(), f(this, t, !1);
    }, 0));
    w && (addEventListener("resize", r(this, n)), r(this, n).call(this));
  }
  subscribe(i, o) {
    const p = super.subscribe(i, o);
    return r(this, t) || i(), p;
  }
}
t = new WeakMap(), n = new WeakMap(), h = new WeakMap();
const R = new a();
export {
  l as dispatchResizeEvent,
  R as resizer
};
