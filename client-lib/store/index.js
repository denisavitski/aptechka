var I = (s, r, e) => {
  if (!r.has(s))
    throw TypeError("Cannot " + e);
};
var t = (s, r, e) => (I(s, r, "read from private field"), e ? e.call(s) : r.get(s)), h = (s, r, e) => {
  if (r.has(s))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(s) : r.set(s, e);
}, d = (s, r, e, c) => (I(s, r, "write to private field"), c ? c.call(s, e) : r.set(s, e), e);
var S = (s, r, e) => new Promise((c, i) => {
  var o = (n) => {
    try {
      l(e.next(n));
    } catch (a) {
      i(a);
    }
  }, u = (n) => {
    try {
      l(e.throw(n));
    } catch (a) {
      i(a);
    }
  }, l = (n) => n.done ? c(n.value) : Promise.resolve(n.value).then(o, u);
  l((e = e.apply(s, r)).next());
});
import { S as x } from "../Store-Qr3SNOSf.js";
import { a as G, s as H } from "../Store-Qr3SNOSf.js";
import { A as K, D as L } from "../Derived-rInkx3e4.js";
import { C as O } from "../Composed-Fa7owymK.js";
var m;
class V extends x {
  constructor(e, c, i) {
    super(null, i);
    h(this, m, void 0);
    d(this, m, e.subscribe((o) => {
      this.current = o.current.map((u, l, n) => c(u, l, n));
    }));
  }
  close() {
    super.close(), t(this, m).call(this);
  }
}
m = new WeakMap();
var w;
class j extends x {
  constructor(e, c, i) {
    super(null, i);
    h(this, w, void 0);
    let o = 0;
    d(this, w, e.subscribe((u) => S(this, null, function* () {
      const l = ++o, n = u.current.map((f, k, P) => c(f, k, P)), a = yield Promise.all(n);
      l === o && (this.current = a);
    })));
  }
  close() {
    super.close(), t(this, w).call(this);
  }
}
w = new WeakMap();
var g, b;
class q extends x {
  constructor(e, c, i) {
    super(null, i);
    h(this, g, void 0);
    h(this, b, /* @__PURE__ */ new Map());
    d(this, g, e.subscribe((o) => {
      this.current = o.current.map((u, l, n) => {
        let a = t(this, b).get(u.key);
        return (a === void 0 || u.revalidate) && (a = c(u.value, l, n), t(this, b).set(u.key, a)), a;
      });
    }));
  }
  close() {
    super.close(), t(this, g).call(this), t(this, b).clear();
  }
}
g = new WeakMap(), b = new WeakMap();
var A, v;
class z extends x {
  constructor(e, c, i) {
    super(null, i);
    h(this, A, void 0);
    h(this, v, /* @__PURE__ */ new Map());
    let o = 0;
    d(this, A, e.subscribe((u) => S(this, null, function* () {
      const l = ++o, n = u.current.map((f, k, P) => {
        let D = t(this, v).get(f.key);
        return (D === void 0 || f.revalidate) && (D = c(f.value, k, P), t(this, v).set(f.key, D)), D;
      }), a = yield Promise.all(n);
      l === o && (this.current = a);
    })));
  }
  close() {
    super.close(), t(this, A).call(this), t(this, v).clear();
  }
}
A = new WeakMap(), v = new WeakMap();
var C, p, y;
class B extends x {
  constructor(e, c, i) {
    super(e, i);
    h(this, C, void 0);
    h(this, p, void 0);
    h(this, y, 0);
    d(this, p, new x(!1)), d(this, C, c), i != null && i.manualControl || this.refetch();
  }
  get isPending() {
    return t(this, p);
  }
  refetch() {
    t(this, p).current = !0, d(this, y, t(this, y) + 1);
    const e = t(this, y);
    t(this, C).call(this).then((c) => {
      e === t(this, y) && (t(this, p).current = !1, this.current = c);
    });
  }
}
C = new WeakMap(), p = new WeakMap(), y = new WeakMap();
export {
  z as AsyncCached,
  K as AsyncDerived,
  j as AsyncDerivedArray,
  q as Cached,
  O as Composed,
  L as Derived,
  V as DerivedArray,
  B as Resource,
  x as Store,
  G as activeStores,
  H as storeRegistry
};
