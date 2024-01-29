var b = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var r = (s, t, e) => (b(s, t, "read from private field"), e ? e.call(s) : t.get(s)), a = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, i = (s, t, e, n) => (b(s, t, "write to private field"), n ? n.call(s, e) : t.set(s, e), e);
var w = (s, t, e) => (b(s, t, "access private method"), e);
import { i as A } from "./browser-S4eq8AeN.js";
var l, f, S;
class k {
  constructor() {
    a(this, l, null);
    a(this, f, void 0);
    a(this, S, "");
    A && (i(this, f, document.documentElement.getAttribute("data-project") || void 0), i(this, S, r(this, f) ? r(this, f) + "-store-registry" : "store-registry"));
  }
  get projectName() {
    return r(this, f);
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
  loadState(t = localStorage.getItem(r(this, S))) {
    t && (typeof t == "string" ? i(this, l, JSON.parse(t)) : i(this, l, t), o.current.forEach((e) => {
      this.updateStore(e);
    }));
  }
  resetState() {
    o.current.forEach((t) => {
      t.reset();
    }), this.saveState();
  }
  updateStore(t) {
    var n, y;
    if (!Array.isArray((n = r(this, l)) == null ? void 0 : n.stores))
      return t;
    const e = t.passport;
    if (e) {
      const N = (y = r(this, l)) == null ? void 0 : y.stores.find((j) => j.name === e.name);
      N && (t.current = N.value);
    }
    return t;
  }
  getState() {
    const t = {
      stores: []
    };
    return o.current.forEach((e) => {
      e.passport && t.stores.push({
        value: e.current,
        name: e.passport.name
      });
    }), t;
  }
}
l = new WeakMap(), f = new WeakMap(), S = new WeakMap();
const q = new k();
var c, d, g, u, m, h, p, v, R;
class z {
  constructor(t, e) {
    a(this, v);
    a(this, c, void 0);
    a(this, d, void 0);
    a(this, g, void 0);
    a(this, u, void 0);
    a(this, m, void 0);
    a(this, h, /* @__PURE__ */ new Set());
    a(this, p, void 0);
    i(this, c, e == null ? void 0 : e.passport), i(this, d, t), i(this, g, void 0), i(this, u, t), i(this, m, (e == null ? void 0 : e.equalityCheck) || ((n, y) => n === y)), i(this, p, (e == null ? void 0 : e.validate) || ((n) => n)), r(this, c) && q.updateStore(this);
  }
  get passport() {
    return r(this, c);
  }
  get initial() {
    return r(this, d);
  }
  get previous() {
    return r(this, g);
  }
  get current() {
    return r(this, u);
  }
  set current(t) {
    r(this, m).call(this, r(this, u), t) || (i(this, g, r(this, u)), i(this, u, r(this, p).call(this, t)), w(this, v, R).call(this));
  }
  get subscribers() {
    return r(this, h);
  }
  get entry() {
    return {
      current: r(this, u),
      previous: r(this, g)
    };
  }
  subscribe(t) {
    return r(this, c) && !r(this, h).size && C(this), r(this, h).add(t), t(this.entry), () => {
      this.unsubscribe(t);
    };
  }
  unsubscribe(t) {
    r(this, h).delete(t), r(this, c) && !r(this, h).size && E(this);
  }
  reset() {
    this.current = this.initial;
  }
  close() {
    r(this, h).clear(), r(this, c) && E(this);
  }
}
c = new WeakMap(), d = new WeakMap(), g = new WeakMap(), u = new WeakMap(), m = new WeakMap(), h = new WeakMap(), p = new WeakMap(), v = new WeakSet(), R = function() {
  for (const t of r(this, h))
    t(this.entry);
};
const o = new z([]);
function C(s) {
  o.current.find((t) => t.passport.name === s.passport.name) || (o.current = [...o.current, s]);
}
function E(s) {
  o.current.includes(s) && (o.current = o.current.filter((t) => t !== s));
}
export {
  z as S,
  o as a,
  q as s
};
