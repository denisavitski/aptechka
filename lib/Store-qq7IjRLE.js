var N = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var r = (s, t, e) => (N(s, t, "read from private field"), e ? e.call(s) : t.get(s)), a = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, i = (s, t, e, c) => (N(s, t, "write to private field"), c ? c.call(s, e) : t.set(s, e), e);
var w = (s, t, e) => (N(s, t, "access private method"), e);
import { i as A } from "./browser-S4eq8AeN.js";
var l, o, S;
class q {
  constructor() {
    a(this, l, null);
    a(this, o, void 0);
    a(this, S, "");
    A && (i(this, o, document.documentElement.getAttribute("data-project") || void 0), i(this, S, r(this, o) ? r(this, o) + "-store-registry" : "store-registry"));
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
  loadState(t = localStorage.getItem(r(this, S))) {
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
    var c, b;
    if (!Array.isArray((c = r(this, l)) == null ? void 0 : c.stores))
      return t;
    const e = t.passport;
    if (e) {
      const k = (b = r(this, l)) == null ? void 0 : b.stores.find((j) => j.name === e.name);
      k && (t.current = k.value);
    }
    return t;
  }
  getState() {
    const t = {
      stores: []
    };
    return f.current.forEach((e) => {
      e.passport && t.stores.push({
        value: e.current,
        name: e.passport.name
      });
    }), t;
  }
}
l = new WeakMap(), o = new WeakMap(), S = new WeakMap();
const z = new q();
var u, d, g, n, m, h, y, p, v, R;
class C {
  constructor(t, e) {
    a(this, v);
    a(this, u, void 0);
    a(this, d, void 0);
    a(this, g, void 0);
    a(this, n, void 0);
    a(this, m, void 0);
    a(this, h, /* @__PURE__ */ new Set());
    a(this, y, void 0);
    a(this, p, void 0);
    i(this, u, e == null ? void 0 : e.passport), i(this, d, t), i(this, g, void 0), i(this, n, t), i(this, m, (e == null ? void 0 : e.equalityCheck) || ((c, b) => c === b)), i(this, y, (e == null ? void 0 : e.validate) || ((c) => c)), i(this, p, (e == null ? void 0 : e.skipSubscribeNotification) || !1), r(this, u) && z.updateStore(this);
  }
  get passport() {
    return r(this, u);
  }
  get initial() {
    return r(this, d);
  }
  get previous() {
    return r(this, g);
  }
  get current() {
    return r(this, n);
  }
  set current(t) {
    r(this, m).call(this, r(this, n), t) || (i(this, g, r(this, n)), i(this, n, r(this, y).call(this, t)), w(this, v, R).call(this));
  }
  get subscribers() {
    return r(this, h);
  }
  get entry() {
    return {
      current: r(this, n),
      previous: r(this, g)
    };
  }
  subscribe(t) {
    return r(this, u) && !r(this, h).size && I(this), r(this, h).add(t), r(this, p) || t(this.entry), () => {
      this.unsubscribe(t);
    };
  }
  unsubscribe(t) {
    r(this, h).delete(t), r(this, u) && !r(this, h).size && E(this);
  }
  reset() {
    this.current = this.initial;
  }
  close() {
    r(this, h).clear(), r(this, u) && E(this);
  }
}
u = new WeakMap(), d = new WeakMap(), g = new WeakMap(), n = new WeakMap(), m = new WeakMap(), h = new WeakMap(), y = new WeakMap(), p = new WeakMap(), v = new WeakSet(), R = function() {
  for (const t of r(this, h))
    t(this.entry);
};
const f = new C([]);
function I(s) {
  f.current.find((t) => t.passport.name === s.passport.name) || (f.current = [...f.current, s]);
}
function E(s) {
  f.current.includes(s) && (f.current = f.current.filter((t) => t !== s));
}
export {
  C as S,
  f as a,
  z as s
};
