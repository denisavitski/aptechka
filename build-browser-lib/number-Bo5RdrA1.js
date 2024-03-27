const n = [
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
function u(r, e = 5) {
  return (0.5 + r * n[e] << 0) / n[e];
}
function o(r, e) {
  return Math.round(r / e) * e;
}
export {
  u as p,
  o as r
};
