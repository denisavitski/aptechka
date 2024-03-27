var u = (s, r, e) => {
  if (!r.has(s))
    throw TypeError("Cannot " + e);
};
var o = (s, r, e) => (u(s, r, "read from private field"), e ? e.call(s) : r.get(s)), i = (s, r, e) => {
  if (r.has(s))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(s) : r.set(s, e);
}, n = (s, r, e, c) => (u(s, r, "write to private field"), c ? c.call(s, e) : r.set(s, e), e);
import { S as p } from "./Store-JOKrNVEr.js";
var t;
class d extends p {
  constructor(e, c, l) {
    super(null, l);
    i(this, t, void 0);
    n(this, t, e.subscribe((b) => {
      this.current = c(b.current);
    }));
  }
  close() {
    super.close(), o(this, t).call(this);
  }
}
t = new WeakMap();
export {
  d as D
};
