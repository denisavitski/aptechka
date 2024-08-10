var a = (e, s, r) => {
  if (!s.has(e))
    throw TypeError("Cannot " + r);
};
var o = (e, s, r) => (a(e, s, "read from private field"), r ? r.call(e) : s.get(e)), c = (e, s, r) => {
  if (s.has(e))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(e) : s.set(e, r);
}, u = (e, s, r, m) => (a(e, s, "write to private field"), m ? m.call(e, r) : s.set(e, r), r);
import { RESIZE_ORDER as h } from "../order/index.js";
import { windowResizer as n } from "../window-resizer/index.js";
import { S as f } from "../Store-Qr3SNOSf.js";
var t, i;
class b extends f {
  constructor(r) {
    super(!1);
    c(this, t, void 0);
    c(this, i, void 0);
    u(this, t, r), u(this, i, n.subscribe(() => {
      matchMedia(o(this, t)).matches ? this.current = !0 : this.current = !1;
    }, h.MEDIA));
  }
  close() {
    super.close(), o(this, i).call(this);
  }
}
t = new WeakMap(), i = new WeakMap();
export {
  b as Media
};
