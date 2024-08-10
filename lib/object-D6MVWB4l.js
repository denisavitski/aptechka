function c(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function y(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Date)
    return new Date(e.getTime());
  if (e instanceof Node)
    return e;
  const t = Array.isArray(e) ? [] : {};
  for (const r in e)
    e.hasOwnProperty(r) && (t[r] = y(e[r]));
  return t;
}
function a(e, t, r = c) {
  for (const n in t)
    r(t[n]) ? (e[n] || Object.assign(e, { [n]: {} }), a(e[n], t[n], r)) : Object.assign(e, { [n]: t[n] });
  return e;
}
function u(e) {
  return e === null || typeof e == "undefined";
}
function i(e, t) {
  if (typeof e != typeof t)
    return !1;
  if ([e, t].some((r) => u(r)))
    return e === t;
  if (Array.isArray(e)) {
    const r = e.length > t.length ? e : t, n = e.length > t.length ? t : e;
    return r.every(
      (s, f) => i(s, n[f])
    );
  }
  if (typeof e != "object" || e instanceof Node || typeof e == "object" && e.constructor.toString().startsWith("class"))
    return e === t;
  for (const r in e) {
    if (!t.hasOwnProperty(r))
      return !1;
    if (typeof e[r] == "object" && typeof t[r] == "object") {
      if (!i(e[r], t[r]))
        return !1;
    } else if (e[r] !== t[r])
      return !1;
  }
  return !0;
}
function p(e, t) {
  const r = {};
  for (const n in e)
    t.includes(n) && (r[n] = e[n]);
  return r;
}
function o(e, t) {
  const r = {};
  for (const n in e)
    t.includes(n) || (r[n] = e[n]);
  return r;
}
function l(e) {
  var t;
  return typeof e == "function" && ((t = Object.getOwnPropertyDescriptor(e, "prototype")) == null ? void 0 : t.writable) === !1;
}
function O(e, ...t) {
  t.forEach((r) => {
    Object.getOwnPropertyNames(r.prototype).forEach((n) => {
      Object.defineProperty(
        e.prototype,
        n,
        Object.getOwnPropertyDescriptor(r.prototype, n) || /* @__PURE__ */ Object.create(null)
      );
    });
  });
}
export {
  c as a,
  u as b,
  y as c,
  i as d,
  O as e,
  l as i,
  a as m,
  o,
  p
};
