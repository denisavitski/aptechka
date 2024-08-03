import { Attribute as n } from "../../attribute/index.js";
import { c } from "../../globals-DMjysUXI.js";
import { o as u } from "../../onConnect-y5DrxJ9P.js";
function b(t, m, e) {
  const r = new n(
    (e == null ? void 0 : e.elementOrSelector) || c.value,
    t,
    m,
    e
  );
  return u(() => (r.observe(), () => {
    r.close();
  })), r;
}
export {
  b as watchAttribute
};
