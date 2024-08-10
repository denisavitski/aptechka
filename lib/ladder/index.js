var w = Object.defineProperty;
var k = Object.getOwnPropertySymbols;
var V = Object.prototype.hasOwnProperty, m = Object.prototype.propertyIsEnumerable;
var S = (s, t, e) => t in s ? w(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e, v = (s, t) => {
  for (var e in t || (t = {}))
    V.call(t, e) && S(s, e, t[e]);
  if (k)
    for (var e of k(t))
      m.call(t, e) && S(s, e, t[e]);
  return s;
};
var g = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var r = (s, t, e) => (g(s, t, "read from private field"), e ? e.call(s) : t.get(s)), p = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, d = (s, t, e, i) => (g(s, t, "write to private field"), i ? i.call(s, e) : t.set(s, e), e);
var b = (s, t, e) => (g(s, t, "access private method"), e);
import { S as x } from "../Store-Qr3SNOSf.js";
var f, h, a, u, y;
class C extends x {
  constructor(e) {
    super(e, {
      equalityCheck: () => !1
    });
    p(this, u);
    p(this, f, void 0);
    p(this, h, void 0);
    p(this, a, void 0);
    d(this, f, v({}, e)), d(this, h, /* @__PURE__ */ new Map()), d(this, a, /* @__PURE__ */ new Set());
  }
  get base() {
    return r(this, f);
  }
  get steps() {
    return r(this, h);
  }
  close() {
    super.close(), r(this, a).clear(), r(this, h).clear();
  }
  bind(e) {
    r(this, a).add(e);
  }
  unbind(e) {
    r(this, a).delete(e);
  }
  deleteStep(e) {
    this.steps.delete(e);
  }
  getStepValue(e) {
    var i;
    return (i = this.steps.get(e)) == null ? void 0 : i[1];
  }
  getExcludedStepsValue(...e) {
    const i = /* @__PURE__ */ new Map();
    return e.map((c) => {
      const n = this.steps.get(c);
      n && i.set(c, n);
    }), b(this, u, y).call(this, i);
  }
  getIncludedStepsValue(...e) {
    const i = new Map(this.steps);
    return e.map((c) => {
      this.steps.has(c) && i.delete(c);
    }), b(this, u, y).call(this, i);
  }
  setStep(e, i, c) {
    const n = {};
    for (const o in this.current)
      n[o] = c[o] || 0;
    this.steps.set(e, [i, n]), this.calculate();
  }
  calculate() {
    this.current = b(this, u, y).call(this, r(this, h));
  }
}
f = new WeakMap(), h = new WeakMap(), a = new WeakMap(), u = new WeakSet(), y = function(e) {
  const i = {};
  for (const c in this.base)
    i[c] = this.base[c];
  for (const c of e) {
    const n = c[1];
    if (n[0] === "+")
      for (const o in this.base) {
        const l = n[1][o];
        i[o] += l;
      }
    else if (n[0] === "*")
      for (const o in this.base) {
        const l = n[1][o];
        i[o] *= l;
      }
    else if (n[0] === "/")
      for (const o in this.base) {
        const l = n[1][o];
        i[o] /= l;
      }
    else if (n[0] === "-")
      for (const o in this.base) {
        const l = n[1][o];
        i[o] -= l;
      }
  }
  for (const c of r(this, a))
    for (const n in i)
      c[n] = i[n];
  return i;
};
export {
  C as Ladder
};
