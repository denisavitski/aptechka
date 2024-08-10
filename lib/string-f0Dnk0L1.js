function u(e, t = !1) {
  let a = "";
  return e.split("-").forEach((n, s) => {
    if (s === 0 && !t)
      a += n;
    else {
      const r = n[0], c = n.slice(1), l = r.toUpperCase() + c;
      a += l;
    }
  }), a;
}
function f(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function p(e) {
  return e.split("_").join(".");
}
function d(e) {
  return /^[a-z\d]+$/i.test(e) ? e.charAt(0).toUpperCase() + e.slice(1) : e.replace(
    /([a-z\d])([a-z\d]*)/gi,
    (t, a, n) => a.toUpperCase() + n.toLowerCase()
  ).replace(/[^a-z\d]/gi, "");
}
function i(e, t) {
  return e.slice(0, 1)[t]() + e.slice(1);
}
function o(e, t = !1, a) {
  return t ? e.split(" ").map((n) => i(n, a)).join(" ") : i(e, a);
}
function z(e, t = !1) {
  return o(e, t, "toUpperCase");
}
function C(e, t = !1) {
  return o(e, t, "toLowerCase");
}
function g(e, t = "abcdefghijklmnopqrstuvwxyz0123456789") {
  const a = t.length, n = crypto.getRandomValues(new Uint8Array(e));
  let s = "";
  for (let r = 0; r < e; r++)
    s += t.charAt(n[r] % a);
  return s;
}
function y(e) {
  return new RegExp("^\\p{Lu}", "u").test(e);
}
export {
  z as a,
  f as c,
  g,
  y as i,
  u as k,
  p as s,
  d as t,
  C as u
};