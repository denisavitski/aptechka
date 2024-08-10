import { Vector3 as c, OrthographicCamera as p, Mesh as w } from "three";
import { e as h } from "./en3-THFHEReu.js";
const s = new c(), g = new c();
function M(a, r = "default") {
  const t = h.getView(r), { width: e, height: o } = h, n = e / o;
  a instanceof c ? s.copy(a) : s.set(...a);
  const i = t.camera.getWorldPosition(g).distanceTo(s);
  if (t.camera instanceof p)
    return {
      width: e / t.camera.zoom,
      height: o / t.camera.zoom,
      factor: 1,
      distance: i,
      aspect: n
    };
  {
    const l = t.camera.fov * Math.PI / 180, m = 2 * Math.tan(l / 2) * i, f = m * (e / o);
    return { width: f, height: m, factor: e / f, distance: i, aspect: n };
  }
}
function d(a, r) {
  a.traverse((t) => {
    t instanceof w && t.material && (Array.isArray(t.material) ? t.material : [t.material]).forEach(r);
  });
}
export {
  M as g,
  d as t
};
