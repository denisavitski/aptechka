var g = (r, e, s) => {
  if (!e.has(r))
    throw TypeError("Cannot " + s);
};
var c = (r, e, s) => (g(r, e, "read from private field"), s ? s.call(r) : e.get(r)), o = (r, e, s) => {
  if (e.has(r))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(r) : e.set(r, s);
}, l = (r, e, s, t) => (g(r, e, "write to private field"), t ? t.call(r, s) : e.set(r, s), s);
import { S as p } from "../Store-2hWEUGTj.js";
import { a as q, s as z } from "../Store-2hWEUGTj.js";
import { d as E } from "../function-zwSFehNd.js";
import "../browser-S4eq8AeN.js";
var a;
class R extends p {
  constructor(s, t, u) {
    super(null, u);
    o(this, a, void 0);
    l(this, a, s.subscribe((i) => {
      this.current = t(i.current);
    }));
  }
  close() {
    super.close(), c(this, a).call(this);
  }
}
a = new WeakMap();
var b;
class w extends p {
  constructor(s, t, u) {
    super(null, u);
    o(this, b, void 0);
    l(this, b, s.subscribe((i) => {
      const h = [];
      i.current.forEach((v, m) => {
        var x;
        i.current[m] === ((x = i.previous) == null ? void 0 : x[m]) && this.current[m] ? h.push(this.current[m]) : h.push(t(v));
      }), this.current = h;
    }));
  }
  close() {
    super.close(), c(this, b).call(this);
  }
}
b = new WeakMap();
var d, n;
class A extends p {
  constructor(s, t, u) {
    super(s, u);
    o(this, d, void 0);
    o(this, n, void 0);
    l(this, n, new p(!1)), l(this, d, t), this.refetch();
  }
  get isPending() {
    return c(this, n);
  }
  /**
   * Calls fetcher again and sets isPending to true.
   */
  refetch() {
    c(this, n).current = !0, c(this, d).call(this).then((s) => {
      c(this, n).current = !1, this.current = s;
    });
  }
}
d = new WeakMap(), n = new WeakMap();
var f;
class C extends p {
  constructor(s, t, u) {
    super(null, u);
    o(this, f, []);
    const i = E(() => {
      this.current = t();
    }, 0);
    s.forEach((h) => {
      c(this, f).push(
        h.subscribe(() => {
          i();
        })
      );
    });
  }
  close() {
    super.close(), c(this, f).forEach((s) => s());
  }
}
f = new WeakMap();
export {
  C as Composed,
  R as Derived,
  w as DerivedArray,
  A as Resource,
  p as Store,
  q as activeStores,
  z as storeRegistry
};
