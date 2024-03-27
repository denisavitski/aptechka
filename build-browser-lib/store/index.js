var v = (t, s, e) => {
  if (!s.has(t))
    throw TypeError("Cannot " + e);
};
var i = (t, s, e) => (v(t, s, "read from private field"), e ? e.call(t) : s.get(t)), n = (t, s, e) => {
  if (s.has(t))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(t) : s.set(t, e);
}, p = (t, s, e, r) => (v(t, s, "write to private field"), r ? r.call(t, e) : s.set(t, e), e);
var f = (t, s, e, r) => ({
  set _(a) {
    p(t, s, a, e);
  },
  get _() {
    return i(t, s, r);
  }
});
var d = (t, s, e) => new Promise((r, a) => {
  var g = (o) => {
    try {
      m(e.next(o));
    } catch (h) {
      a(h);
    }
  }, x = (o) => {
    try {
      m(e.throw(o));
    } catch (h) {
      a(h);
    }
  }, m = (o) => o.done ? r(o.value) : Promise.resolve(o.value).then(g, x);
  m((e = e.apply(t, s)).next());
});
import { S as I, a as b, s as k } from "../Store-JOKrNVEr.js";
import { D as j } from "../Derived-Bc88XJ8J.js";
import { R as A } from "../Composed-ClTo1f0b.js";
import { C as w, D as z } from "../Composed-ClTo1f0b.js";
var c, u, l;
class R extends A {
  constructor(e, r, a = 100) {
    super(e, r, {
      manualControl: !0,
      skipSubscribeNotification: !0
    });
    n(this, c, void 0);
    n(this, u, void 0);
    n(this, l, 0);
    p(this, u, a);
  }
  get step() {
    return i(this, l);
  }
  startAccumulating() {
    p(this, c, setInterval(() => d(this, null, function* () {
      ++f(this, l)._, this.refetch();
    }), i(this, u)));
  }
  stopAccumulating() {
    clearInterval(i(this, c));
  }
  close() {
    super.close(), this.stopAccumulating();
  }
}
c = new WeakMap(), u = new WeakMap(), l = new WeakMap();
export {
  w as Composed,
  R as CumulativeResource,
  j as Derived,
  z as DerivedArray,
  A as Resource,
  I as Store,
  b as activeStores,
  k as storeRegistry
};
