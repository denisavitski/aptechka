import { intersector as c } from "../../intersector/index.js";
import { o as r } from "../../onConnect-y5DrxJ9P.js";
function m(...n) {
  r((t) => {
    const o = n.length > 1 ? n[0] : t, e = n.length > 1 ? n[1] : n[0];
    return c.subscribe(o, e);
  });
}
export {
  m as onIntersection
};
