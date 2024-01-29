const o = [
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
function u(n, e = 5) {
  return (0.5 + n * o[e] << 0) / o[e];
}
function i(n, e) {
  return Math.round(n / e) * e;
}
function s(n, e = "abcdefghijklmnopqrstuvwxyz0123456789") {
  const a = e.length, c = crypto.getRandomValues(new Uint8Array(n));
  let r = "";
  for (let t = 0; t < n; t++)
    r += e.charAt(c[t] % a);
  return r;
}
export {
  u as f,
  s as g,
  i as r
};
