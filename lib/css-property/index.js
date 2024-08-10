var p = (s, r, e) => {
  if (!r.has(s))
    throw TypeError("Cannot " + e);
};
var t = (s, r, e) => (p(s, r, "read from private field"), e ? e.call(s) : r.get(s)), h = (s, r, e) => {
  if (r.has(s))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(s) : r.set(s, e);
}, i = (s, r, e, a) => (p(s, r, "write to private field"), a ? a.call(s, e) : r.set(s, e), e);
import { cssValueParser as w } from "../css-value-parser/index.js";
import { RESIZE_ORDER as R } from "../order/index.js";
import { S as V } from "../Store-Qr3SNOSf.js";
import { a as v } from "../dom-P5QbAASX.js";
import { windowResizer as S } from "../window-resizer/index.js";
var b, o, u, l, c, n;
class P extends V {
  constructor(e, a, m, f) {
    super(m, f);
    h(this, b, void 0);
    h(this, o, void 0);
    h(this, u, void 0);
    h(this, l, void 0);
    h(this, c, !1);
    h(this, n, () => {
      this.check();
    });
    i(this, b, v(e)), i(this, o, a), i(this, u, m.toString()), i(this, l, (f == null ? void 0 : f.rawValueCheck) !== !1);
  }
  get currentRawValue() {
    return t(this, u);
  }
  observe() {
    t(this, c) || (i(this, c, !0), S.subscribe(t(this, n), R.CSS_VARIABLE));
  }
  unobserve() {
    t(this, c) && (i(this, c, !1), S.unsubscribe(t(this, n)));
  }
  subscribe(e) {
    return this.subscribers.size || this.observe(), super.subscribe(e);
  }
  unsubscribe(e) {
    super.unsubscribe(e), this.subscribers.size || this.unobserve();
  }
  close() {
    this.unobserve(), super.close();
  }
  check() {
    const e = getComputedStyle(t(this, b)).getPropertyValue(
      t(this, o)
    );
    if (!(t(this, l) && t(this, u) === e))
      if (i(this, u, e), e) {
        const a = w.parse(t(this, u));
        this.current = a;
      } else
        this.current = this.initial;
  }
}
b = new WeakMap(), o = new WeakMap(), u = new WeakMap(), l = new WeakMap(), c = new WeakMap(), n = new WeakMap();
export {
  P as CSSProperty
};
