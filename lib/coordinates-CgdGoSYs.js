function s(t, h, n = !1) {
  let i = t.x - h.width / 2, g = h.height / 2 - t.y;
  return n && (i = i / (h.width / 2), g = g / (h.height / 2)), { x: i, y: g };
}
function x(t, h) {
  const n = t.x / h.width, i = t.y / h.height;
  return { x: n, y: i };
}
function e(t, h) {
  return h = h || {
    x: 0,
    y: 0,
    width: document.documentElement.offsetWidth,
    height: innerHeight
  }, {
    x: (t.x - h.x) / h.width * h.width,
    y: (t.y - h.y) / h.height * h.height
  };
}
export {
  e as g,
  x as n,
  s
};
