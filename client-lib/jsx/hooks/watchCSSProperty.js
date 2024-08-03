import { CSSProperty as c } from "../../css-property/index.js";
import { c as m } from "../../globals-DMjysUXI.js";
import { o as n } from "../../onConnect-y5DrxJ9P.js";
function a(t, o, r) {
  const e = new c(
    (r == null ? void 0 : r.elementOrSelector) || m.value,
    t,
    o,
    r
  );
  return n(() => (e.observe(), () => {
    e.close();
  })), e;
}
export {
  a as watchCSSProperty
};
