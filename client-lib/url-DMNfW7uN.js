function h(t, n = "") {
  n = n.endsWith("/") ? n.slice(0, -1) : n, t = t.replace(n, ""), t.startsWith("/") && (t = t.slice(1));
  const i = t.split("#"), s = i[0].split("?"), c = s[0].startsWith("/") ? s[0] : "/" + s[0], r = n + c, e = s == null ? void 0 : s[1], o = i == null ? void 0 : i[1];
  return {
    leaf: c,
    pathname: r,
    parameters: e,
    hash: o
  };
}
function p(t) {
  return t.endsWith("/") || (t += "/"), t;
}
function a(t, n, i, s) {
  const c = i || location.search, r = s ? s.startsWith("#") ? s : "#" + s : "", e = c ? c.startsWith("?") ? c : "?" + c : "", o = `${n}${r}${e}`;
  t === "push" ? history.pushState(o, "", o) : t === "replace" && history.replaceState(o, "", o);
}
export {
  a as c,
  p as n,
  h as s
};
