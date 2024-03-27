import { c as l } from "./string-3lAkpJJP.js";
function m(r, a) {
  const f = (a == null ? void 0 : a.prefix) || "", c = {
    style: {}
  };
  for (const e in r)
    c[e] = {
      var: `var(--${f}${l(e)})`,
      value: r[e]
    }, c.style[`--${f}${l(e)}`] = r[e];
  return c;
}
export {
  m as c
};
