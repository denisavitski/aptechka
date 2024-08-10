import { CSSProperty as o } from "../css-property/index.js";
import { a as t } from "../Store-Qr3SNOSf.js";
import { ticker as c } from "../ticker/index.js";
function s() {
  c.subscribe(() => {
    for (let r = 0; r < t.current.length; r++) {
      const e = t.current[r];
      e instanceof o && e.check();
    }
  });
}
export {
  s as devMode
};
