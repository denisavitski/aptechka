var g = (e, r, s) => {
  if (!r.has(e))
    throw TypeError("Cannot " + s);
};
var t = (e, r, s) => (g(e, r, "read from private field"), s ? s.call(e) : r.get(e)), n = (e, r, s) => {
  if (r.has(e))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(e) : r.set(e, s);
}, f = (e, r, s, c) => (g(e, r, "write to private field"), c ? c.call(e, s) : r.set(e, s), s);
import { S as m } from "./Store-JOKrNVEr.js";
import { d as E } from "./function-C10DGppn.js";
var d;
class P extends m {
  constructor(s, c, u) {
    super(null, u);
    n(this, d, void 0);
    f(this, d, s.subscribe((o) => {
      const a = [];
      o.current.forEach((C, l) => {
        var x;
        o.current[l] === ((x = o.previous) == null ? void 0 : x[l]) && this.current[l] ? a.push(this.current[l]) : a.push(c(C, l));
      }), this.current = a;
    }));
  }
  close() {
    super.close(), t(this, d).call(this);
  }
}
d = new WeakMap();
var b, h, i;
class R extends m {
  constructor(s, c, u) {
    super(s, u);
    n(this, b, void 0);
    n(this, h, void 0);
    n(this, i, 0);
    f(this, h, new m(!1)), f(this, b, c), u != null && u.manualControl || this.refetch();
  }
  get isPending() {
    return t(this, h);
  }
  /**
   * Calls fetcher again and sets isPending to true.
   */
  refetch() {
    t(this, h).current = !0, f(this, i, t(this, i) + 1);
    const s = t(this, i);
    t(this, b).call(this).then((c) => {
      s === t(this, i) && (t(this, h).current = !1, this.current = c);
    });
  }
}
b = new WeakMap(), h = new WeakMap(), i = new WeakMap();
var p;
class S extends m {
  constructor(s, c, u) {
    super(null, u);
    n(this, p, []);
    const o = E(() => {
      this.current = c();
    }, 0);
    s.forEach((a) => {
      t(this, p).push(
        a.subscribe(() => {
          o();
        })
      );
    });
  }
  close() {
    super.close(), t(this, p).forEach((s) => s());
  }
}
p = new WeakMap();
export {
  S as C,
  P as D,
  R
};
