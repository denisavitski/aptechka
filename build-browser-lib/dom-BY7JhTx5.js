function r(t, n) {
  if (!t)
    return null;
  let e = t.parentElement;
  return t.parentElement instanceof n || (e = r(t.parentElement, n)), e;
}
function f(t, n = document) {
  return typeof t == "string" ? n.querySelector(t) : t;
}
function u(t, n = null) {
  if (n = n || t, !t || !(t instanceof HTMLElement))
    return document.body;
  if (n !== t) {
    const e = getComputedStyle(t);
    if (e.overflow.includes("auto") || e.overflow.includes("scroll"))
      return t;
  }
  return u(t.parentNode, n);
}
export {
  u as a,
  r as f,
  f as g
};
