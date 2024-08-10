function u(e, t) {
  if (!e)
    return null;
  let n = e.parentElement;
  return e.parentElement instanceof t || (n = u(e.parentElement, t)), n;
}
function a(e, t = document) {
  return typeof e == "string" ? t.querySelector(e) : e;
}
function l(e, t = null) {
  if (t = t || e, !e || !(e instanceof HTMLElement))
    return document.body;
  if (t !== e) {
    const n = getComputedStyle(e);
    if (n.overflow.includes("auto") || n.overflow.includes("scroll"))
      return e;
  }
  return l(e.parentNode, t);
}
function c(e) {
  let t = [];
  return document.documentElement.addEventListener(
    "__illuminate-tree",
    (n) => {
      n.composedPath().forEach((r) => {
        r instanceof HTMLElement && t.push(r);
      });
    },
    { once: !0 }
  ), e.dispatchEvent(
    new CustomEvent("__illuminate-tree", {
      bubbles: !0,
      composed: !0
    })
  ), t;
}
export {
  a,
  l as b,
  u as f,
  c as g
};
