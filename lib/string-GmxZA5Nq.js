function n(e, s = !1) {
  let t = "";
  return e.split("-").forEach((a, o) => {
    if (o === 0 && !s)
      t += a;
    else {
      const c = a[0], r = a.slice(1), i = c.toUpperCase() + r;
      t += i;
    }
  }), t;
}
function l(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function p(e) {
  return e.split("_").join(".");
}
function f(e) {
  return /^[a-z\d]+$/i.test(e) ? e.charAt(0).toUpperCase() + e.slice(1) : e.replace(/([a-z\d])([a-z\d]*)/gi, (s, t, a) => t.toUpperCase() + a.toLowerCase()).replace(/[^a-z\d]/gi, "");
}
function u(e, s = !1) {
  const t = (a) => a.slice(0, 1).toUpperCase() + a.slice(1);
  return s ? e.split(" ").map((a) => t(a)).join(" ") : t(e);
}
export {
  u as a,
  l as c,
  n as k,
  p as s,
  f as t
};
