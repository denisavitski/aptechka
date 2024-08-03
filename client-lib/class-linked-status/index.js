var p = Object.defineProperty, d = Object.defineProperties;
var L = Object.getOwnPropertyDescriptors;
var a = Object.getOwnPropertySymbols;
var S = Object.prototype.hasOwnProperty, b = Object.prototype.propertyIsEnumerable;
var c = (e, t, s) => t in e ? p(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s, o = (e, t) => {
  for (var s in t || (t = {}))
    S.call(t, s) && c(e, s, t[s]);
  if (a)
    for (var s of a(t))
      b.call(t, s) && c(e, s, t[s]);
  return e;
}, u = (e, t) => d(e, L(t));
var h = (e, t, s) => {
  if (!t.has(e))
    throw TypeError("Cannot " + s);
};
var n = (e, t, s) => (h(e, t, "read from private field"), s ? s.call(e) : t.get(e)), l = (e, t, s) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, s);
}, m = (e, t, s, r) => (h(e, t, "write to private field"), r ? r.call(e, s) : t.set(e, s), s);
import { S as x } from "../Store-Qr3SNOSf.js";
import { c as f } from "../string-f0Dnk0L1.js";
var i;
class K extends x {
  constructor(s, r) {
    super(r);
    l(this, i, void 0);
    m(this, i, s);
  }
  isTrue(s) {
    return this.current[s] === !0;
  }
  isFalse(s) {
    return this.current[s] === !1;
  }
  reset() {
    super.reset();
    for (const s in this.initial)
      this.set(s, this.initial[s]);
  }
  set(s, r = !0) {
    this.current = u(o({}, this.current), { [s]: r }), r ? n(this, i).classList.add(f(s)) : n(this, i).classList.remove(f(s));
  }
}
i = new WeakMap();
export {
  K as ClassLinkedStatus
};
