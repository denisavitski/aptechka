var v = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var r = (s, t, e) => (v(s, t, "read from private field"), e ? e.call(s) : t.get(s)), a = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, i = (s, t, e, h) => (v(s, t, "write to private field"), h ? h.call(s, e) : t.set(s, e), e);
var k = (s, t, e) => (v(s, t, "access private method"), e);
import { i as z } from "./browser-0zX67oeU.js";
var l, o, S;
class A {
  constructor() {
    a(this, l, null);
    a(this, o, "");
    a(this, S, "");
    z && (i(this, o, document.documentElement.getAttribute("data-project") || "unnamed"), i(this, S, r(this, o) ? r(this, o) + "-store-registry" : "store-registry"));
  }
  get projectName() {
    return r(this, o);
  }
  get localStoreRegistryName() {
    return r(this, S);
  }
  get loadedState() {
    return r(this, l);
  }
  saveState() {
    const t = this.getState(), e = JSON.stringify(t);
    localStorage.setItem(r(this, S), e);
  }
  loadState(t = localStorage.getItem(
    r(this, S)
  )) {
    t && (typeof t == "string" ? i(this, l, JSON.parse(t)) : i(this, l, t), f.current.forEach((e) => {
      this.updateStore(e);
    }));
  }
  resetState() {
    f.current.forEach((t) => {
      t.reset();
    }), this.saveState();
  }
  updateStore(t) {
    var h, p;
    if (!Array.isArray((h = r(this, l)) == null ? void 0 : h.stores))
      return t;
    const e = t.passport;
    if (e) {
      const N = (p = r(this, l)) == null ? void 0 : p.stores.find(
        (j) => j.name === e.name
      );
      N && (t.current = N.value);
    }
    return t;
  }
  getState() {
    const t = {
      stores: []
    };
    return f.current.forEach((e) => {
      e.passport && (t.stores.find((h) => h.name === e.passport.name) || t.stores.push({
        value: e.current,
        name: e.passport.name
      }));
    }), t;
  }
}
l = new WeakMap(), o = new WeakMap(), S = new WeakMap();
const M = new A();
var u, m, g, d, y, n, b, c, w, R;
class q {
  constructor(t, e) {
    a(this, w);
    a(this, u, void 0);
    a(this, m, void 0);
    a(this, g, void 0);
    a(this, d, void 0);
    a(this, y, void 0);
    a(this, n, /* @__PURE__ */ new Set());
    a(this, b, void 0);
    a(this, c, void 0);
    i(this, u, e == null ? void 0 : e.passport), i(this, m, t), i(this, g, void 0), i(this, d, t), i(this, y, (e == null ? void 0 : e.equalityCheck) || ((h, p) => h === p)), e != null && e.validate && this.addMiddleware(e.validate), i(this, b, (e == null ? void 0 : e.skipSubscribeNotification) || !1), r(this, u) && M.updateStore(this);
  }
  get passport() {
    return r(this, u);
  }
  get initial() {
    return r(this, m);
  }
  get previous() {
    return r(this, g);
  }
  get current() {
    return r(this, d);
  }
  set current(t) {
    if (!r(this, y).call(this, r(this, d), t)) {
      if (i(this, g, r(this, d)), r(this, c))
        for (const e of r(this, c))
          t = e(t);
      i(this, d, t), k(this, w, R).call(this);
    }
  }
  get subscribers() {
    return r(this, n);
  }
  get entry() {
    return {
      current: r(this, d),
      previous: r(this, g)
    };
  }
  addMiddleware(t) {
    r(this, c) || i(this, c, /* @__PURE__ */ new Set()), r(this, c).add(t);
  }
  removeMiddleware(t) {
    var e, h;
    (e = r(this, c)) == null || e.delete(t), (h = r(this, c)) != null && h.size || i(this, c, void 0);
  }
  subscribe(t) {
    return r(this, u) && !r(this, n).size && C(this), r(this, n).add(t), r(this, b) || t(this.entry), () => {
      this.unsubscribe(t);
    };
  }
  unsubscribe(t) {
    r(this, n).delete(t), r(this, u) && !r(this, n).size && E(this);
  }
  reset() {
    this.current = this.initial;
  }
  close() {
    r(this, n).clear(), r(this, u) && E(this);
  }
}
u = new WeakMap(), m = new WeakMap(), g = new WeakMap(), d = new WeakMap(), y = new WeakMap(), n = new WeakMap(), b = new WeakMap(), c = new WeakMap(), w = new WeakSet(), R = function() {
  for (const t of r(this, n))
    t(this.entry);
};
const f = new q([]);
function C(s) {
  f.current.includes(s) || (f.current = [...f.current, s]);
}
function E(s) {
  f.current.includes(s) && (f.current = f.current.filter((t) => t !== s));
}
export {
  q as S,
  f as a,
  M as s
};
