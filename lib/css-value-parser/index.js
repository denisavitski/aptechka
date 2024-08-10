import { cssUnitParser as h } from "../css-unit-parser/index.js";
const c = class c {
  parse(r, i) {
    var n;
    const t = parseFloat(r), e = !isNaN(t), s = e ? (n = r.match(/[a-z]+$/i)) == null ? void 0 : n[0] : void 0;
    return e && !s ? t : s ? s === "px" ? t : s === "hp" ? ((i == null ? void 0 : i.offsetHeight) || 0) * (t / 100) : s === "wp" ? ((i == null ? void 0 : i.offsetWidth) || 0) * (t / 100) : s && c.CSS_UNITS.has(s) ? h.parse(r) : r : r.includes("calc") ? r.includes("raw!") ? r.replace("raw!", "") : h.parse(r) : r === "true" ? !0 : r === "false" ? !1 : r;
  }
};
c.CSS_UNITS = /* @__PURE__ */ new Set([
  "px",
  "rem",
  "vw",
  "vh",
  "vmin",
  "vmax",
  "em",
  "cm",
  "mm",
  "Q",
  "in",
  "pc",
  "pt",
  "ex",
  "ch",
  "lh",
  "rlh",
  "vb",
  "vi",
  "svw",
  "svh",
  "lvw",
  "lvh",
  "dvw",
  "dvh"
]);
let f = c;
const o = new f();
export {
  o as cssValueParser
};
