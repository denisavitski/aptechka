function u(e, r) {
  return t(e.getAttribute(r));
}
function t(e) {
  return e == null ? null : e ? isNaN(Number(e)) ? e === "true" ? !0 : e === "false" ? !1 : e : Number(e) : !0;
}
export {
  u as a,
  t as p
};
