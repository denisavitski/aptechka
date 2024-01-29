const s = (e, o = 100) => {
  let t;
  return (...r) => {
    clearTimeout(t), t = setTimeout(() => e(...r), o);
  };
}, u = (e, o = 0) => {
  let t = !1;
  return (...r) => {
    t || (t = !0, setTimeout(() => {
      e(...r), t = !1;
    }, o));
  };
};
export {
  s as d,
  u as t
};
