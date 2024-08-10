import { d as w } from "../../en3-THFHEReu.js";
import { g as T, t as C } from "../../traverseMaterials-BKSwwNmo.js";
import { Mesh as g } from "three";
function y(t, e, s) {
  const o = e.x, r = e.y, i = s || t.image.width / t.image.height;
  let a = 0, f = 0, c = t.offset.x, n = t.offset.y, h = t.rotation, l = t.center.x, m = t.center.y;
  o / r > i ? (a = 1, f = r / o * i) : (f = 1, a = o / r / i), t.matrix.setUvTransform(c, n, a, f, h, l, m);
}
function v(t, e) {
  t.traverse((s) => {
    s instanceof g && e(s);
  });
}
export {
  y as coverTexture,
  w as dispose,
  T as getCurrentViewport,
  C as traverseMaterials,
  v as traverseMeshes
};
