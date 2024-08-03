function i(r, c) {
  const u = r.measureText(c), l = u.actualBoundingBoxAscent + u.actualBoundingBoxDescent, n = u.width;
  return {
    height: l,
    width: n
  };
}
function x(r) {
  return Math.floor(r) + 0.5;
}
function m(r, c, u, l, n, e) {
  let a = r / c, s = u / l, t = 0, d = 0;
  return n = typeof n == "undefined" ? 0.5 : n, e = typeof e == "undefined" ? 0.5 : e, a > s ? (t = l, d = l * a) : (d = u, t = u / a), [
    (u - d) * n,
    (l - t) * e,
    d,
    t
  ];
}
function y(r, c, u, l, n, e) {
  let a = r / c, s = u / l, t = 0, d = 0;
  return n = typeof n == "undefined" ? 0.5 : n, e = typeof e == "undefined" ? 0.5 : e, a > s ? (d = u, t = u / a) : (t = l, d = l * a), [
    (u - d) * n,
    (l - t) * e,
    d,
    t
  ];
}
export {
  y as a,
  m as c,
  x as f,
  i as m
};
