import { elementResizer as c } from "../../element-resizer/index.js";
import { o as l } from "../../onConnect-y5DrxJ9P.js";
function r(...e) {
  l((n) => {
    const t = e.length > 1 ? e[0] : n, o = e.length > 1 ? e[1] : e[0];
    return c.subscribe(t, o);
  });
}
export {
  r as onElementResize
};
