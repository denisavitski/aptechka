function t(e) {
  e.dispatchEvent(
    new CustomEvent("sizeChange", {
      bubbles: !0,
      composed: !0
    })
  );
}
function n(e) {
  e.dispatchEvent(
    new CustomEvent("beforeSizeChange", {
      bubbles: !0,
      composed: !0
    })
  );
}
export {
  t as a,
  n as d
};