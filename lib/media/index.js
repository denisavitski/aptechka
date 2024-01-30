var p = (r, e, s) => {
  if (!e.has(r))
    throw TypeError("Cannot " + s);
};
var o = (r, e, s) => (p(r, e, "read from private field"), s ? s.call(r) : e.get(r)), m = (r, e, s) => {
  if (e.has(r))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(r) : e.set(r, s);
}, c = (r, e, s, u) => (p(r, e, "write to private field"), u ? u.call(r, s) : e.set(r, s), s);
import { RESIZE_ORDER as a } from "../order/index.js";
import { resizer as h } from "../resizer/index.js";
import { S as f } from "../Store-qq7IjRLE.js";
import "../notifier/index.js";
import "../browser-S4eq8AeN.js";
import "../function-zwSFehNd.js";
var t, i;
class S extends f {
  constructor(s) {
    super(!1);
    m(this, t, void 0);
    m(this, i, void 0);
    c(this, t, s), c(this, i, h.subscribe(() => {
      matchMedia(o(this, t)).matches ? this.current = !0 : this.current = !1;
    }, a.MEDIA));
  }
  close() {
    super.close(), o(this, i).call(this);
  }
}
t = new WeakMap(), i = new WeakMap();
export {
  S as Media
};
