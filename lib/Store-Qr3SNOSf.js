var N = (i, t, e) => {
  if (!t.has(i))
    throw TypeError("Cannot " + e);
};
var r = (i, t, e) => (N(i, t, "read from private field"), e ? e.call(i) : t.get(i)), s = (i, t, e) => {
  if (t.has(i))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(i) : t.set(i, e);
}, a = (i, t, e, c) => (N(i, t, "write to private field"), c ? c.call(i, e) : t.set(i, e), e);
var A = (i, t, e) => (N(i, t, "access private method"), e);
import { i as R } from "./browser-0zX67oeU.js";
var f, d, S;
class j {
  constructor() {
    s(this, f, null);
    s(this, d, "");
    s(this, S, "");
    R && (a(this, d, document.documentElement.getAttribute("data-project") || "unnamed"), a(this, S, r(this, d) ? r(this, d) + "-store-registry" : "store-registry"));
  }
  get projectName() {
    return r(this, d);
  }
  get localStoreRegistryName() {
    return r(this, S);
  }
  get loadedState() {
    return r(this, f);
  }
  saveState() {
    const t = this.getState(), e = JSON.stringify(t);
    localStorage.setItem(r(this, S), e);
  }
  loadState(t = localStorage.getItem(
    r(this, S)
  )) {
    t && (typeof t == "string" ? a(this, f, JSON.parse(t)) : a(this, f, t), l.current.forEach((e) => {
      e.passport && this.updateStore(e);
    }));
  }
  resetState() {
    l.current.forEach((t) => {
      t.passport && t.reset();
    }), this.saveState();
  }
  updateStore(t) {
    var c, v;
    if (!Array.isArray((c = r(this, f)) == null ? void 0 : c.stores))
      return t;
    const e = t.passport;
    if (e) {
      const p = (v = r(this, f)) == null ? void 0 : v.stores.find(
        (E) => E.name === e.name
      );
      p && (t.current = p.value);
    }
    return t;
  }
  getState() {
    const t = {
      stores: []
    };
    return l.current.forEach((e) => {
      e.passport && (t.stores.find((c) => c.name === e.passport.name) || t.stores.push({
        value: e.current,
        name: e.passport.name
      }));
    }), t;
  }
}
f = new WeakMap(), d = new WeakMap(), S = new WeakMap();
const z = new j();
var g, h, m, n, o, u, y, b, w, C;
class M {
  constructor(t, e) {
    s(this, w);
    s(this, g, void 0);
    s(this, h, void 0);
    s(this, m, void 0);
    s(this, n, /* @__PURE__ */ new Set());
    s(this, o, void 0);
    s(this, u, void 0);
    s(this, y, void 0);
    s(this, b, void 0);
    a(this, g, e == null ? void 0 : e.passport), a(this, h, {
      initial: t,
      previous: void 0,
      current: t
    }), a(this, m, (e == null ? void 0 : e.equalityCheck) || ((c, v) => c === v)), e != null && e.validate && this.addMiddleware(e.validate), a(this, y, (e == null ? void 0 : e.notifyAndClose) || !1), a(this, b, (e == null ? void 0 : e.invisible) || !1), a(this, o, (e == null ? void 0 : e.skipSubscribeNotification) || !1), r(this, g) && z.updateStore(this);
  }
  get passport() {
    return r(this, g);
  }
  get initial() {
    return r(this, h).initial;
  }
  get previous() {
    return r(this, h).previous;
  }
  get current() {
    return r(this, h).current;
  }
  set current(t) {
    if (!r(this, m).call(this, r(this, h).current, t)) {
      if (r(this, h).previous = r(this, h).current, r(this, u))
        for (const e of r(this, u))
          t = e(t);
      r(this, h).current = t, A(this, w, C).call(this), r(this, y) && this.close();
    }
  }
  get subscribers() {
    return r(this, n);
  }
  addMiddleware(t) {
    r(this, u) || a(this, u, /* @__PURE__ */ new Set()), r(this, u).add(t);
  }
  removeMiddleware(t) {
    var e, c;
    (e = r(this, u)) == null || e.delete(t), (c = r(this, u)) != null && c.size || a(this, u, void 0);
  }
  subscribe(t) {
    return !r(this, b) && !r(this, n).size && q(this), r(this, n).add(t), r(this, o) || t(r(this, h)), () => {
      this.unsubscribe(t);
    };
  }
  unsubscribe(t) {
    r(this, n).delete(t), r(this, n).size || k(this);
  }
  reset() {
    this.current = Array.isArray(this.initial) ? [...this.initial] : this.initial;
  }
  close() {
    r(this, n).clear(), k(this);
  }
}
g = new WeakMap(), h = new WeakMap(), m = new WeakMap(), n = new WeakMap(), o = new WeakMap(), u = new WeakMap(), y = new WeakMap(), b = new WeakMap(), w = new WeakSet(), C = function() {
  for (const t of r(this, n))
    t(r(this, h));
};
const l = new M([], {
  invisible: !0
});
function q(i) {
  l.current.includes(i) || (l.current = [...l.current, i]);
}
function k(i) {
  l.current.includes(i) && (l.current = l.current.filter((t) => t !== i));
}
export {
  M as S,
  l as a,
  z as s
};
