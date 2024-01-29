function o(t, n, a) {
  return (1 - a) * t + a * n;
}
function p(t, n, a, s) {
  return o(t, n, 1 - Math.exp(-a * s));
}
function d(t, n, a = 0, s = 1) {
  return n < t ? a : s;
}
function l(t, n = 5) {
  return +t.toFixed(n);
}
function i(t, n = 0, a = 0) {
  return Math.max(n, Math.min(t, a));
}
function h(t, n, a) {
  const c = (t - n[0]) / (n[1] - n[0]) * (a[1] - a[0]) + a[0];
  return i(c, a[0], a[1]);
}
function M(t, n, a) {
  return t <= n ? 0 : t >= a ? 1 : (t = (t - n) / (a - n), t * t * (3 - 2 * t));
}
function m(t, n, a) {
  return t <= n ? 0 : t >= a ? 1 : (t = (t - n) / (a - n), t * t * t * (t * (t * 6 - 15) + 10));
}
function y(t, n) {
  const a = n.x - t.x, s = n.y - t.y;
  return Math.sqrt(Math.pow(a, 2) + Math.pow(s, 2));
}
function D(t, n, a, s, c, e) {
  const r = s - t, u = c - n;
  return Math.sqrt(r * r + u * u) - (a + e);
}
export {
  M as a,
  m as b,
  i as c,
  p as d,
  y as e,
  D as f,
  o as l,
  h as m,
  l as r,
  d as s
};
