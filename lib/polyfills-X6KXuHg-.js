const i = [
  1,
  10,
  100,
  1e3,
  1e4,
  1e5,
  1e6,
  1e7,
  1e8,
  1e9,
  1e10
];
function o(e, n = 5) {
  return Math.round(e * i[n]) / i[n];
}
function u(e, n) {
  return Math.round(e / n) * n;
}
function s(e, n) {
  var r;
  const t = ((r = n.toString().split(".")[1]) == null ? void 0 : r.length) || 0;
  return t ? +e.toFixed(t) : Math.ceil(e);
}
function c(e, n) {
  return typeof e == "undefined" ? n : e;
}
export {
  c as n,
  o as p,
  u as r,
  s as t
};
