function n(t) {
  return parseFloat(getComputedStyle(t).transitionDuration || "");
}
function e(t) {
  return n(t) * 1e3;
}
export {
  n as a,
  e as g
};
