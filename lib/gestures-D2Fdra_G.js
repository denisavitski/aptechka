function s(t, n) {
  const r = (i) => {
    t == null || t(i);
  }, e = () => {
    removeEventListener("pointermove", r), removeEventListener("pointerup", e), removeEventListener("touchend", e), n == null || n();
  };
  addEventListener("pointermove", r), addEventListener("pointerup", e), addEventListener("touchend", e);
}
export {
  s
};