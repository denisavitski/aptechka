import "../../Store-JOKrNVEr.js";
import { o as m } from "../../onConnect-FWEekrNj.js";
import { elementResizer as c } from "../index.js";
function p(...e) {
  m((n) => {
    const t = e.length > 1 ? e[0] : n, o = e.length > 1 ? e[1] : e[0];
    return c.subscribe(t, o);
  });
}
export {
  p as onElementResize
};
