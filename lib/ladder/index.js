var k = Object.defineProperty;
var p = Object.getOwnPropertySymbols;
var S = Object.prototype.hasOwnProperty, g = Object.prototype.propertyIsEnumerable;
var d = (t, s, e) => s in t ? k(t, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[s] = e, b = (t, s) => {
  for (var e in s || (s = {}))
    S.call(s, e) && d(t, e, s[e]);
  if (p)
    for (var e of p(s))
      g.call(s, e) && d(t, e, s[e]);
  return t;
};
var y = (t, s, e) => {
  if (!s.has(t))
    throw TypeError("Cannot " + e);
};
var c = (t, s, e) => (y(t, s, "read from private field"), e ? e.call(t) : s.get(t)), u = (t, s, e) => {
  if (s.has(t))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(t) : s.set(t, e);
}, f = (t, s, e, o) => (y(t, s, "write to private field"), o ? o.call(t, e) : s.set(t, e), e);
import { S as m } from "../Store-qq7IjRLE.js";
import "../browser-S4eq8AeN.js";
var l, h, a;
class V extends m {
  constructor(e) {
    super(e, {
      equalityCheck: () => !1
    });
    u(this, l, void 0);
    u(this, h, void 0);
    u(this, a, void 0);
    f(this, l, b({}, e)), f(this, h, /* @__PURE__ */ new Map()), f(this, a, /* @__PURE__ */ new Set());
  }
  get base() {
    return c(this, l);
  }
  get steps() {
    return c(this, h);
  }
  close() {
    super.close(), c(this, a).clear(), c(this, h).clear();
  }
  bind(e) {
    c(this, a).add(e);
  }
  unbind(e) {
    c(this, a).delete(e);
  }
  deleteStep(e) {
    this.steps.delete(e);
  }
  getStepValue(e) {
    return this.steps.get(e)[1];
  }
  setStep(e, o, n) {
    const i = {};
    for (const r in this.current)
      i[r] = n[r] || 0;
    this.steps.set(e, [o, i]);
  }
  calculate() {
    const e = {};
    for (const o in this.base)
      e[o] = this.base[o];
    for (const o of this.steps) {
      const n = o[1];
      if (n[0] === "+")
        for (const i in this.base) {
          const r = n[1][i];
          e[i] += r;
        }
      else if (n[0] === "*")
        for (const i in this.base) {
          const r = n[1][i];
          e[i] *= r;
        }
      else if (n[0] === "/")
        for (const i in this.base) {
          const r = n[1][i];
          e[i] /= r;
        }
      else if (n[0] === "-")
        for (const i in this.base) {
          const r = n[1][i];
          e[i] -= r;
        }
    }
    for (const o of c(this, a))
      for (const n in e)
        o[n] = e[n];
    this.current = e;
  }
}
l = new WeakMap(), h = new WeakMap(), a = new WeakMap();
export {
  V as Ladder
};
