const o = (e, t = "offsetLeft", s) => {
  let f = 0;
  do
    f += e[t] || 0, e = e.offsetParent;
  while (e && e !== s);
  return f;
}, u = (e, t) => o(e, "offsetLeft", t), n = (e, t) => o(e, "offsetTop", t);
export {
  n as a,
  o as b,
  u as g
};
