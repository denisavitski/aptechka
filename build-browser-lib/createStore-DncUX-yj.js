import { c as t } from "./ComponentElement-B8zjY3Dh.js";
import { w as e } from "./withCurrentComponent-Cd8KOtNf.js";
function c(o) {
  e((n) => {
    n.addDisconnectCallback(o);
  });
}
function s(o) {
  const n = typeof o == "function" ? o(t) : o;
  return t && c(() => n.close()), n;
}
export {
  s as _,
  c as o
};
