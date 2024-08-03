var n = (s, r, o) => {
  if (!r.has(s))
    throw TypeError("Cannot " + o);
};
var t = (s, r, o) => (n(s, r, "read from private field"), o ? o.call(s) : r.get(s)), c = (s, r, o) => {
  if (r.has(s))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(s) : r.set(s, o);
};
import { d as h } from "./function-C10DGppn.js";
import { S as b } from "./Store-Qr3SNOSf.js";
var e;
class f extends b {
  constructor(o, u, p) {
    super(null, p);
    c(this, e, []);
    const a = h(() => {
      this.current = u();
    }, 0);
    o.forEach((i) => {
      t(this, e).push(
        i.subscribe(() => {
          a();
        })
      );
    });
  }
  close() {
    super.close(), t(this, e).forEach((o) => o());
  }
}
e = new WeakMap();
export {
  f as C
};
