var v = (e, r, s) => {
  if (!r.has(e))
    throw TypeError("Cannot " + s);
};
var c = (e, r, s) => (v(e, r, "read from private field"), s ? s.call(e) : r.get(e)), n = (e, r, s) => {
  if (r.has(e))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(e) : r.set(e, s);
}, o = (e, r, s, t) => (v(e, r, "write to private field"), t ? t.call(e, s) : r.set(e, s), s);
import { S as f } from "../Store-qq7IjRLE.js";
import { a as q, s as z } from "../Store-qq7IjRLE.js";
import { d as S } from "../function-zwSFehNd.js";
import "../browser-S4eq8AeN.js";
var d;
class P extends f {
  constructor(s, t, u) {
    super(null, u);
    n(this, d, void 0);
    o(this, d, s.subscribe((i) => {
      this.current = t(i.current);
    }));
  }
  close() {
    super.close(), c(this, d).call(this);
  }
}
d = new WeakMap();
var b;
class R extends f {
  constructor(s, t, u) {
    super(null, u);
    n(this, b, void 0);
    o(this, b, s.subscribe((i) => {
      const a = [];
      i.current.forEach((E, x) => {
        var g;
        i.current[x] === ((g = i.previous) == null ? void 0 : g[x]) && this.current[x] ? a.push(this.current[x]) : a.push(t(E));
      }), this.current = a;
    }));
  }
  close() {
    super.close(), c(this, b).call(this);
  }
}
b = new WeakMap();
var p, h, l;
class w extends f {
  constructor(s, t, u) {
    super(s, u);
    n(this, p, void 0);
    n(this, h, void 0);
    n(this, l, 0);
    o(this, h, new f(!1)), o(this, p, t), u != null && u.manualControl || this.refetch();
  }
  get isPending() {
    return c(this, h);
  }
  /**
   * Calls fetcher again and sets isPending to true.
   */
  refetch() {
    c(this, h).current = !0, o(this, l, c(this, l) + 1);
    const s = c(this, l);
    c(this, p).call(this).then((t) => {
      s === c(this, l) && (c(this, h).current = !1, this.current = t);
    });
  }
}
p = new WeakMap(), h = new WeakMap(), l = new WeakMap();
var m;
class A extends f {
  constructor(s, t, u) {
    super(null, u);
    n(this, m, []);
    const i = S(() => {
      this.current = t();
    }, 0);
    s.forEach((a) => {
      c(this, m).push(
        a.subscribe(() => {
          i();
        })
      );
    });
  }
  close() {
    super.close(), c(this, m).forEach((s) => s());
  }
}
m = new WeakMap();
export {
  A as Composed,
  P as Derived,
  R as DerivedArray,
  w as Resource,
  f as Store,
  q as activeStores,
  z as storeRegistry
};
