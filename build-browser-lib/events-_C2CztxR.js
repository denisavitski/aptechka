function t(e) {
  e.dispatchEvent(
    new CustomEvent("sizeChange", {
      bubbles: !0,
      composed: !0
    })
  );
}
export {
  t as d
};
