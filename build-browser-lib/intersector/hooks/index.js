import "../../Store-JOKrNVEr.js";
import { o as c } from "../../onConnect-FWEekrNj.js";
import { intersector as r } from "../index.js";
function p(...t) {
  c((e) => {
    const o = t.length > 1 ? t[0] : e, n = t.length > 1 ? t[1] : t[0];
    return r.subscribe(o, n);
  });
}
export {
  p as useIntersector
};
