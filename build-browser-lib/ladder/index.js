var E = Object.defineProperty;
var x = Object.getOwnPropertySymbols;
var M = Object.prototype.hasOwnProperty, j = Object.prototype.propertyIsEnumerable;
var U = (s, e, t) => e in s ? E(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, S = (s, e) => {
  for (var t in e || (e = {}))
    M.call(e, t) && U(s, t, e[t]);
  if (x)
    for (var t of x(e))
      j.call(e, t) && U(s, t, e[t]);
  return s;
};
var w = (s, e, t) => {
  if (!e.has(s))
    throw TypeError("Cannot " + t);
};
var i = (s, e, t) => (w(s, e, "read from private field"), t ? t.call(s) : e.get(s)), u = (s, e, t) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, t);
}, h = (s, e, t, n) => (w(s, e, "write to private field"), n ? n.call(s, t) : e.set(s, t), t);
var V = (s, e, t) => (w(s, e, "access private method"), t);
import { S as z } from "../Store-JOKrNVEr.js";
import { d as A } from "../math-BOBiC4TN.js";
import { p as q } from "../number-Bo5RdrA1.js";
import { ticker as k } from "../ticker/index.js";
var v, c, l, d;
class B {
  constructor(e) {
    u(this, v, void 0);
    u(this, c, void 0);
    u(this, l, void 0);
    u(this, d, void 0);
    h(this, v, e.operation), h(this, c, e.value), h(this, l, i(this, c)), h(this, d, e.damping || 0);
  }
  get operation() {
    return i(this, v);
  }
  get value() {
    return i(this, c);
  }
  set value(e) {
    h(this, l, e), i(this, d) || h(this, c, e);
  }
  get damping() {
    return i(this, d);
  }
  set damping(e) {
    h(this, d, e);
  }
  update(e) {
    let t = 0;
    for (const n in i(this, c))
      i(this, c)[n] = A(
        i(this, c)[n],
        i(this, l)[n],
        this.damping,
        e
      ), q(i(this, c)[n], 4) !== q(i(this, l)[n], 4) && t++;
    return t === 0;
  }
}
v = new WeakMap(), c = new WeakMap(), l = new WeakMap(), d = new WeakMap();
var g, f, p, y, C, b;
class J extends z {
  constructor(t) {
    super(t, {
      equalityCheck: () => !1
    });
    u(this, y);
    u(this, g, void 0);
    u(this, f, void 0);
    u(this, p, void 0);
    u(this, b, (t) => {
      let n = 0;
      for (const o of this.steps) {
        const a = o[1].update(t.elapsed);
        n += a ? 0 : 1;
      }
      this.calculate(), n || k.unsubscribe(i(this, b));
    });
    h(this, g, S({}, t)), h(this, f, /* @__PURE__ */ new Map()), h(this, p, /* @__PURE__ */ new Set());
  }
  get base() {
    return i(this, g);
  }
  get steps() {
    return i(this, f);
  }
  close() {
    super.close(), i(this, p).clear(), i(this, f).clear(), k.unsubscribe(i(this, b));
  }
  bind(t) {
    i(this, p).add(t);
  }
  unbind(t) {
    i(this, p).delete(t);
  }
  deleteStep(t) {
    this.steps.delete(t);
  }
  getStepValue(t) {
    return this.steps.get(t).value;
  }
  setStep(t, n, o, r) {
    const a = {};
    for (const L in this.current)
      a[L] = o[L] || 0;
    let m = this.steps.get(t);
    m || (m = new B({ operation: n, value: S({}, i(this, g)), damping: r }), this.steps.set(t, m)), m.damping = r || 0, m.value = a, V(this, y, C).call(this);
  }
  calculate() {
    const t = {};
    for (const n in this.base)
      t[n] = this.base[n];
    for (const n of this.steps) {
      const o = n[1];
      if (o.operation === "+")
        for (const r in this.base) {
          const a = o.value[r];
          t[r] += a;
        }
      else if (o.operation === "*")
        for (const r in this.base) {
          const a = o.value[r];
          t[r] *= a;
        }
      else if (o.operation === "/")
        for (const r in this.base) {
          const a = o.value[r];
          t[r] /= a;
        }
      else if (o.operation === "-")
        for (const r in this.base) {
          const a = o.value[r];
          t[r] -= a;
        }
    }
    for (const n of i(this, p))
      for (const o in t)
        n[o] = t[o];
    this.current = t;
  }
}
g = new WeakMap(), f = new WeakMap(), p = new WeakMap(), y = new WeakSet(), C = function() {
  let t = !1;
  i(this, f).forEach((n) => {
    n.damping && (t = !0);
  }), t ? k.subscribe(i(this, b)) : k.unsubscribe(i(this, b));
}, b = new WeakMap();
export {
  J as Ladder
};
