const s = (e) => e, n = (e) => e * e, a = (e) => e * (2 - e), u = (e) => e < 0.5 ? 2 * e * e : -1 + (4 - 2 * e) * e, r = (e) => e * e * e, o = (e) => --e * e * e + 1, c = (e) => e < 0.5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1, I = (e) => e * e * e * e, O = (e) => 1 - --e * e * e * e, Q = (e) => e < 0.5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e, i = (e) => e * e * e * e * e, b = (e) => 1 + --e * e * e * e * e, p = (e) => e < 0.5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e, d = (e) => e === 0 ? 0 : 2 ** (10 * (e - 1)), x = (e) => e === 1 ? 1 : 1 - 2 ** (-10 * e), C = (e) => e === 0 || e === 1 ? e : e < 0.5 ? 0.5 * 2 ** (20 * (e - 0.5)) : 0.5 * (2 - Math.abs(2 ** (-20 * (e - 0.5))));
export {
  a,
  u as b,
  r as c,
  o as d,
  n as e,
  c as f,
  I as g,
  O as h,
  Q as i,
  i as j,
  b as k,
  s as l,
  p as m,
  d as n,
  x as o,
  C as p
};
