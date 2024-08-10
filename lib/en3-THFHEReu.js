var ae = Object.defineProperty, ne = Object.defineProperties;
var ce = Object.getOwnPropertyDescriptors;
var U = Object.getOwnPropertySymbols;
var le = Object.prototype.hasOwnProperty, de = Object.prototype.propertyIsEnumerable;
var X = (h, t, i) => t in h ? ae(h, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : h[t] = i, P = (h, t) => {
  for (var i in t || (t = {}))
    le.call(t, i) && X(h, i, t[i]);
  if (U)
    for (var i of U(t))
      de.call(t, i) && X(h, i, t[i]);
  return h;
}, Z = (h, t) => ne(h, ce(t));
var q = (h, t, i) => {
  if (!t.has(h))
    throw TypeError("Cannot " + i);
};
var e = (h, t, i) => (q(h, t, "read from private field"), i ? i.call(h) : t.get(h)), s = (h, t, i) => {
  if (t.has(h))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(h) : t.set(h, i);
}, r = (h, t, i, n) => (q(h, t, "write to private field"), n ? n.call(h, i) : t.set(h, i), i);
import { RESIZE_ORDER as oe, TICK_ORDER as ue } from "./order/index.js";
import { windowResizer as J } from "./window-resizer/index.js";
import { ticker as Q } from "./ticker/index.js";
import { a as he } from "./dom-P5QbAASX.js";
import { Mesh as me, OrthographicCamera as ee, PerspectiveCamera as te, Scene as fe, Vector2 as ge, Raycaster as Ee, REVISION as be, WebGLRenderer as xe } from "three";
import { LayoutBox as ie } from "./layout-box/index.js";
function ye(h) {
  const t = (i) => {
    i.dispose();
    for (const n of Object.keys(i)) {
      const l = i[n];
      l && typeof l == "object" && "minFilter" in l && l.dispose();
    }
  };
  h.traverse((i) => {
    if (i instanceof me) {
      if (i.geometry.dispose(), !Array.isArray(i.material) && i.material.isMaterial)
        t(i.material);
      else if (Array.isArray(i.material))
        for (const n of i.material)
          t(n);
    }
  });
}
var T, c, R, y, x, V, w, D;
class se {
  constructor(t, i) {
    s(this, T, void 0);
    s(this, c, void 0);
    s(this, R, void 0);
    s(this, y, void 0);
    s(this, x, void 0);
    s(this, V, void 0);
    s(this, w, void 0);
    s(this, D, void 0);
    r(this, T, t), r(this, c, (i == null ? void 0 : i.cameraType) === "orthographic" ? new ee() : new te()), r(this, R, new fe()), r(this, y, []), r(this, x, (i == null ? void 0 : i.cameraDistance) || 1e3), e(this, c).near = (i == null ? void 0 : i.cameraNear) || 1, e(this, c).far = (i == null ? void 0 : i.cameraFar) || 11e3, r(this, V, (i == null ? void 0 : i.cameraFov) || "auto"), e(this, c).position.z = e(this, x), e(this, c).name = `Cameras.${e(this, T)}`, r(this, w, he(i == null ? void 0 : i.sizeElement) || document.documentElement), this.beforeRenderCallback = i == null ? void 0 : i.beforeRender, r(this, D, new ie(e(this, w))), e(this, D).onResize(() => {
      this.resize();
    });
  }
  get name() {
    return e(this, T);
  }
  get camera() {
    return e(this, c);
  }
  get scene() {
    return e(this, R);
  }
  get box() {
    return e(this, D);
  }
  get cameraDistance() {
    return e(this, x);
  }
  set cameraDistance(t) {
    r(this, x, t), this.resize();
  }
  get sizeElement() {
    return e(this, w);
  }
  get isClipped() {
    return e(this, w) !== m.containerElement;
  }
  resize() {
    const { width: t, height: i } = e(this, D);
    e(this, c).userData.controlled || (e(this, c).position.z = e(this, x)), e(this, c) instanceof te ? (e(this, c).aspect = t / i, e(this, c).fov = e(this, V) === "auto" ? 2 * Math.atan(i / 2 / e(this, x)) * (180 / Math.PI) : e(this, c).userData.controlled ? e(this, c).fov : e(this, V)) : e(this, c) instanceof ee && (e(this, c).left = t / -2, e(this, c).right = t / 2, e(this, c).top = i / 2, e(this, c).bottom = i / -2), e(this, c).updateProjectionMatrix();
  }
  destroy() {
    e(this, y).forEach((t) => {
      t.userData.box.destroy();
    }), e(this, R).clear(), ye(e(this, R)), m.destroyView(this.name), e(this, D).destroy();
  }
  attachToHTMLElement(t, i, n) {
    const l = new ie(t, Z(P({}, n), {
      containerElement: e(this, w),
      cartesian: !0,
      scrollStep: !this.isClipped
    }));
    return l.bindObject(i), i.userData.box = l, e(this, y).push(i), i;
  }
  detachFromHTMLElement(t) {
    r(this, y, e(this, y).filter((i) => i === t ? (t.userData.box.destroy(), !1) : !0));
  }
  add(...t) {
    const i = t[0], n = t[1], l = t[2];
    return n && this.attachToHTMLElement(n, i, l), this.scene.add(i), i;
  }
  remove(t, i) {
    this.scene.remove(t), i && this.detachFromHTMLElement(t);
  }
}
T = new WeakMap(), c = new WeakMap(), R = new WeakMap(), y = new WeakMap(), x = new WeakMap(), V = new WeakMap(), w = new WeakMap(), D = new WeakMap();
const re = /* @__PURE__ */ new Map();
var M, O, j, p, k;
class we {
  constructor(t) {
    s(this, M, void 0);
    s(this, O, void 0);
    s(this, j, void 0);
    s(this, p, void 0);
    s(this, k, void 0);
    r(this, M, t.targetName || void 0), r(this, O, t.eventDispatcher || t.object3D), r(this, j, t.propagation || !1), r(this, p, t.object3D), r(this, k, e(this, M) ? () => e(this, p).getObjectByName(e(this, M)) || e(this, p) : () => e(this, p));
  }
  get object3D() {
    return e(this, p);
  }
  get eventDispatcher() {
    return e(this, O);
  }
  get propagation() {
    return e(this, j);
  }
  get target() {
    return e(this, k).call(this);
  }
  dispatch(t, i) {
    this.eventDispatcher.dispatchEvent(P({
      originalEvent: i,
      type: t
    }, this.intersection));
  }
}
M = new WeakMap(), O = new WeakMap(), j = new WeakMap(), p = new WeakMap(), k = new WeakMap();
var g, o, S, A, F, N, I;
class De {
  constructor() {
    s(this, g, []);
    s(this, o, []);
    s(this, S, new ge());
    s(this, A, new Ee());
    s(this, F, (t) => {
      for (let i = 0; i < e(this, o).length; i++)
        e(this, o)[i].dispatch("pointerDown", t);
    });
    s(this, N, (t) => {
      for (let i = 0; i < e(this, o).length; i++)
        e(this, o)[i].dispatch("pointerUp", t);
    });
    s(this, I, (t) => {
      if (!e(this, g).length)
        return;
      e(this, S).x = t.clientX / m.width * 2 - 1, e(this, S).y = -(t.clientY / m.height) * 2 + 1, m.camera && e(this, A).setFromCamera(e(this, S), m.camera);
      const i = [];
      for (const a of e(this, g)) {
        const b = e(this, A).intersectObject(a.target);
        b.length && (a.intersection = b[0], i.push(a));
      }
      let n = !1;
      const l = e(this, o).filter(
        (a) => !i.find((b) => b.object3D.uuid === a.object3D.uuid)
      ), _ = i.sort(
        (a, b) => b.object3D.position.z - a.object3D.position.z
      ).filter((a, b) => n ? (l.push(a), !1) : (n = !a.propagation, !0)), K = _.filter(
        (a) => !e(this, o).find((b) => b.object3D.uuid === a.object3D.uuid)
      );
      for (let a = 0; a < l.length; a++)
        l[a].dispatch("pointerLeave", t);
      for (let a = 0; a < K.length; a++)
        K[a].dispatch("pointerEnter", t);
      r(this, o, _);
      for (let a = 0; a < e(this, o).length; a++)
        e(this, o)[a].dispatch("pointerMove", t);
    });
    m.containerElement.addEventListener(
      "pointerdown",
      e(this, F)
    ), m.containerElement.addEventListener("pointerup", e(this, N)), m.containerElement.addEventListener(
      "pointermove",
      e(this, I)
    );
  }
  destroy() {
    m.containerElement.removeEventListener(
      "pointerdown",
      e(this, F)
    ), m.containerElement.removeEventListener(
      "pointerup",
      e(this, N)
    ), m.containerElement.removeEventListener(
      "pointermove",
      e(this, I)
    ), r(this, g, []), r(this, o, []);
  }
  add(t, i) {
    if (e(this, g).find((l) => l.object3D.uuid === t.uuid))
      return;
    const n = new we(P({
      object3D: t
    }, i));
    e(this, g).push(n);
  }
  remove(t) {
    r(this, g, e(this, g).filter(
      (i) => i.object3D.uuid !== t.uuid
    )), r(this, o, e(this, o).filter((i) => i.object3D.uuid !== t.uuid));
  }
}
g = new WeakMap(), o = new WeakMap(), S = new WeakMap(), A = new WeakMap(), F = new WeakMap(), N = new WeakMap(), I = new WeakMap();
var W, E, d, H, u, z, L, v, Y, C, $, f, B, G;
class pe {
  constructor() {
    s(this, W, `https://unpkg.com/three@0.${be}.x`);
    s(this, E, null);
    s(this, d, null);
    s(this, H, null);
    s(this, u, /* @__PURE__ */ new Map());
    s(this, z, 0);
    s(this, L, 0);
    s(this, v, 0);
    s(this, Y, 2);
    s(this, C, !1);
    s(this, $, !1);
    s(this, f, null);
    s(this, B, () => {
      r(this, z, e(this, E).clientWidth), r(this, L, e(this, E).clientHeight), r(this, v, Math.min(e(this, Y), devicePixelRatio || 1)), e(this, d).setPixelRatio(e(this, v)), e(this, d).setSize(e(this, z), e(this, L)), e(this, f) && (e(this, f).setPixelRatio(e(this, v)), e(this, f).setSize(e(this, z), e(this, L)));
    });
    s(this, G, () => {
      e(this, d).setRenderTarget(null), e(this, u).forEach((t) => {
        this.render(t);
      });
    });
  }
  get CDNVersion() {
    return e(this, W);
  }
  get containerElement() {
    return e(this, E);
  }
  get webglRenderer() {
    return e(this, d);
  }
  get raycaster() {
    return e(this, H);
  }
  get views() {
    return e(this, u);
  }
  get view() {
    return this.getView("default");
  }
  get camera() {
    return this.getView("default").camera;
  }
  get scene() {
    return this.getView("default").scene;
  }
  get width() {
    return e(this, z);
  }
  get height() {
    return e(this, L);
  }
  get pixelRatio() {
    return e(this, v);
  }
  get cacheAssets() {
    return e(this, $);
  }
  get composer() {
    return e(this, f);
  }
  setup(t) {
    if (e(this, C)) {
      console.warn("[en3.setup]: You are trying to setup en3 again.");
      return;
    }
    r(this, E, he(t == null ? void 0 : t.containerElement) || document.body), r(this, Y, (t == null ? void 0 : t.maxPixelRatio) || 2), r(this, d, new xe(t == null ? void 0 : t.webGLRendererParameters)), e(this, d).domElement.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: ${(t == null ? void 0 : t.zIndex) || 0};
    `, (e(this, E).shadowRoot || e(this, E)).append(e(this, d).domElement), e(this, u).set(
      "default",
      new se("default", P({
        sizeElement: e(this, E)
      }, t == null ? void 0 : t.view))
    ), r(this, H, new De()), t != null && t.composer && (r(this, f, new t.composer(e(this, d))), this.render = () => {
      e(this, f).render();
    }), r(this, $, (t == null ? void 0 : t.cacheAssets) || !1), r(this, C, !0), J.subscribe(e(this, B), oe.EN3), Q.subscribe(e(this, G), { order: ue.EN3 });
  }
  destroy() {
    if (!e(this, C)) {
      console.warn(
        "[en3.setup]: You are trying to destory en3 but it has not been initialized."
      );
      return;
    }
    J.unsubscribe(e(this, B)), Q.unsubscribe(e(this, G)), e(this, H).destroy(), e(this, u).forEach((t) => {
      t.destroy();
    }), e(this, d).dispose(), e(this, d).domElement.remove(), r(this, d, null), e(this, f).dispose(), r(this, f, null), r(this, C, !1), re.forEach((t) => {
      t.dispose();
    }), re.clear();
  }
  createView(t, i) {
    const n = e(this, u).size, l = new se(t, i);
    return e(this, u).set(t, l), n === 1 && e(this, d).setScissorTest(!0), l;
  }
  getView(t) {
    return e(this, u).get(t);
  }
  destroyView(t) {
    const i = e(this, u).get(t);
    i && (e(this, u).delete(t), i.destroy(), e(this, u).size <= 1 && e(this, d).setScissorTest(!1));
  }
  render(t) {
    var i;
    if (e(this, u).size > 1 || this.view.isClipped) {
      const n = t.box.left + t.box.CSSTranslation.x + t.box.scrollValue.x, l = m.height - t.box.height - t.box.top + t.box.CSSTranslation.y + t.box.scrollValue.y * -1;
      e(this, d).setScissor(n, l, t.box.width, t.box.height), e(this, d).setViewport(
        n,
        l,
        t.box.width,
        t.box.height
      );
    }
    (i = t.beforeRenderCallback) == null || i.call(t), e(this, d).render(t.scene, t.camera);
  }
}
W = new WeakMap(), E = new WeakMap(), d = new WeakMap(), H = new WeakMap(), u = new WeakMap(), z = new WeakMap(), L = new WeakMap(), v = new WeakMap(), Y = new WeakMap(), C = new WeakMap(), $ = new WeakMap(), f = new WeakMap(), B = new WeakMap(), G = new WeakMap();
const m = new pe();
export {
  se as E,
  re as a,
  ye as d,
  m as e
};
