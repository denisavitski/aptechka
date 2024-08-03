var ii = Object.defineProperty;
var dn = Object.getOwnPropertySymbols;
var si = Object.prototype.hasOwnProperty, oi = Object.prototype.propertyIsEnumerable;
var un = (m, t, o) => t in m ? ii(m, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : m[t] = o, pe = (m, t) => {
  for (var o in t || (t = {}))
    si.call(t, o) && un(m, o, t[o]);
  if (dn)
    for (var o of dn(t))
      oi.call(t, o) && un(m, o, t[o]);
  return m;
};
var Xt = (m, t, o) => {
  if (!t.has(m))
    throw TypeError("Cannot " + o);
};
var s = (m, t, o) => (Xt(m, t, "read from private field"), o ? o.call(m) : t.get(m)), d = (m, t, o) => {
  if (t.has(m))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(m) : t.set(m, o);
}, x = (m, t, o, e) => (Xt(m, t, "write to private field"), e ? e.call(m, o) : t.set(m, o), o);
var P = (m, t, o) => (Xt(m, t, "access private method"), o);
import { e as b } from "../../en3-THFHEReu.js";
import { S as Z } from "../../Store-Qr3SNOSf.js";
import * as Pe from "three";
import { Light as fn, PointLight as ai, PointLightHelper as ri, DirectionalLight as li, DirectionalLightHelper as ci, SpotLight as hi, SpotLightHelper as pi, HemisphereLight as mi, HemisphereLightHelper as di, Camera as yn, CameraHelper as ui, Mesh as p, Material as fi, Ray as yi, Plane as bi, MathUtils as wi, EventDispatcher as gi, Vector3 as y, MOUSE as Re, TOUCH as Ye, Quaternion as K, Spherical as bn, Vector2 as V, Raycaster as Ei, Object3D as Gt, Euler as Pi, Matrix4 as Dn, MeshBasicMaterial as On, LineBasicMaterial as Mi, CylinderGeometry as F, BoxGeometry as X, BufferGeometry as wn, Float32BufferAttribute as gn, OctahedronGeometry as vt, Line as me, SphereGeometry as Si, TorusGeometry as Ve, PlaneGeometry as xi, DoubleSide as vi, GridHelper as _i } from "three";
import { a as Ti } from "../../object-D6MVWB4l.js";
import { ticker as En } from "../../ticker/index.js";
import { C as Ii } from "../../Composed-Fa7owymK.js";
import { t as Ai } from "../../traverseMaterials-BKSwwNmo.js";
const Li = [
  "AddEquation",
  "SubtractEquation",
  "ReverseSubtractEquation",
  "MinEquation",
  "MaxEquation"
], jn = [
  "ZeroFactor",
  "OneFactor",
  "SrcColorFactor",
  "OneMinusSrcColorFactor",
  "SrcAlphaFactor",
  "OneMinusSrcAlphaFactor",
  "DstAlphaFactor",
  "OneMinusDstAlphaFactor",
  "DstColorFactor",
  "OneMinusDstColorFactor",
  "SrcAlphaSaturateFactor",
  "ConstantColorFactor",
  "OneMinusConstantColorFactor",
  "ConstantAlphaFactor",
  "OneMinusConstantAlphaFactor"
], Di = [...jn, "SrcAlphaSaturateFactor"], Oi = [
  "NoBlending",
  "NormalBlending",
  "AdditiveBlending",
  "SubtractiveBlending",
  "MultiplyBlending",
  "CustomBlending"
], ji = [
  "NeverDepth",
  "AlwaysDepth",
  "EqualDepth",
  "LessDepth",
  "LessEqualDepth ",
  "GreaterEqualDepth ",
  "GreaterDepth",
  "NotEqualDepth"
], ki = [
  "NeverStencilFunc",
  "LessStencilFunc",
  "EqualStencilFunc",
  "LessEqualStencilFunc ",
  "GreaterStencilFunc",
  "NotEqualStencilFunc ",
  "GreaterEqualStencilFunc",
  "AlwaysStencilFunc"
], Zt = [
  "ZeroStencilOp",
  "KeepStencilOp",
  "ReplaceStencilOp",
  "IncrementStencilOp",
  "DecrementStencilOp",
  "IncrementWrapStencilOp",
  "DecrementWrapStencilOp",
  "InvertStencilOp"
], Ci = ["FrontSide", "BackSide", "DoubleSide"], Ri = ["TangentSpaceNormalMap", "ObjectSpaceNormalMap"], Yi = ["round", "bevel", "miter"], Hi = [
  "NoToneMapping",
  "LinearToneMapping",
  "ReinhardToneMapping",
  "CineonToneMapping",
  "ACESFilmicToneMapping",
  "AgXToneMapping",
  "NeutralToneMapping",
  "CustomToneMapping"
], zi = {
  intensity: {
    type: "number",
    min: 0,
    max: 20,
    step: 1e-4
  },
  renderOrder: {
    type: "number",
    step: 1
  },
  alphaTest: {
    type: "number",
    min: 0,
    max: 1,
    step: 1e-3
  },
  blendAlpha: {
    type: "number",
    min: 0,
    max: 1,
    step: 1e-3
  },
  blendDst: {
    type: "select",
    variants: Di
  },
  blendDstAlpha: {
    type: "number",
    min: 0,
    max: 1,
    step: 1e-3
  },
  blendEquation: {
    type: "select",
    variants: Li
  },
  blendEquationAlpha: {
    type: "number",
    min: 0,
    max: 1,
    step: 1e-3
  },
  blending: {
    type: "select",
    variants: Oi
  },
  blendSrc: {
    type: "select",
    variants: jn
  },
  blendSrcAlpha: {
    type: "number",
    min: 0,
    max: 1,
    step: 1e-3
  },
  depthFunc: {
    type: "select",
    variants: ji
  },
  stencilFunc: {
    type: "select",
    variants: ki
  },
  stencilRef: {
    type: "number",
    min: 0,
    step: 1
  },
  stencilFail: {
    type: "select",
    variants: Zt
  },
  stencilZFail: {
    type: "select",
    variants: Zt
  },
  stencilZPass: {
    type: "select",
    variants: Zt
  },
  opacity: {
    type: "number",
    min: 0,
    max: 1,
    step: 1e-4
  },
  side: {
    type: "select",
    variants: Ci
  },
  roughness: {
    type: "number",
    min: 0,
    max: 1,
    step: 1e-4
  },
  metalness: {
    type: "number",
    min: 0,
    max: 1,
    step: 1e-4
  },
  lightMapIntensity: {
    type: "number",
    min: 0,
    max: 20,
    step: 1e-4
  },
  aoMapIntensity: {
    type: "number",
    min: 0,
    max: 20,
    step: 1e-4
  },
  bumpScale: {
    type: "number",
    min: 0,
    step: 1e-4
  },
  normalMapType: {
    type: "select",
    variants: Ri
  },
  wireframeLinejoin: {
    type: "select",
    variants: Yi
  },
  envMapIntensity: {
    type: "number",
    min: 0,
    max: 20,
    step: 1e-4
  },
  emissiveIntensity: {
    type: "number",
    min: 0,
    max: 20,
    step: 1e-4
  },
  fov: {
    type: "number",
    min: 0,
    max: 180,
    step: 1
  },
  zoom: {
    type: "number",
    min: 0,
    step: 1e-4
  },
  near: {
    type: "number",
    min: 0,
    step: 1e-4
  },
  far: {
    type: "number",
    min: 0,
    step: 1
  },
  filmGauge: {
    type: "number",
    min: 0,
    step: 1e-4
  },
  filmOffset: {
    type: "number",
    min: 0,
    step: 1e-4
  },
  distance: {
    type: "number",
    min: 0,
    step: 0.1
  },
  decay: {
    type: "number",
    min: 0,
    step: 1e-5,
    ease: 1e-3
  },
  focus: {
    type: "number",
    min: 0,
    max: 1,
    step: 1e-5
  },
  bias: {
    type: "number",
    min: 0,
    max: 0.01,
    step: 1e-6,
    ease: 0.01
  },
  blurSamples: {
    type: "number",
    min: 0,
    step: 1
  },
  normalBias: {
    type: "number",
    min: 0,
    step: 1e-3,
    ease: 0.01
  },
  radius: {
    type: "number",
    min: 0,
    step: 1e-3,
    ease: 0.01
  },
  penumbra: {
    type: "number",
    min: 0,
    max: 1,
    step: 1e-6
  },
  power: {
    type: "number",
    min: 0,
    step: 1e-3,
    ease: 0.01
  },
  angle: {
    type: "number",
    min: 0,
    step: 1e-6,
    ease: 1e-3
  },
  toneMapping: {
    type: "select",
    variants: Hi
  },
  toneMappingExposure: {
    type: "number",
    min: 0,
    step: 1e-3,
    ease: 0.1
  },
  mapSize: {
    type: "number",
    min: 0,
    step: 1
  },
  damp: {
    type: "number",
    min: 0,
    max: 1,
    step: 1e-6
  },
  strength: {
    type: "number",
    min: 0,
    step: 0.01
  },
  threshold: {
    type: "number",
    min: 0,
    max: 1,
    step: 1e-4
  }
}, Ni = /* @__PURE__ */ new Set([
  "stencilFuncMask",
  "needsUpdate",
  "version",
  "wireframeLinewidth",
  "position",
  "scale",
  "rotation",
  "coordinateSystem",
  "aspect",
  "autoUpdate",
  "up"
]);
var He, ae, Ot, kn, jt, Cn, kt, Rn, Ct, Yn, Rt, Hn, nt, Wt, it, Ut, re, Se, le, xe;
class be {
  constructor(t, o) {
    d(this, Ot);
    d(this, jt);
    d(this, kt);
    d(this, Ct);
    d(this, Rt);
    d(this, nt);
    d(this, it);
    d(this, re);
    d(this, le);
    d(this, He, void 0);
    d(this, ae, []);
    x(this, He, t);
    const e = pe(pe({}, zi), o == null ? void 0 : o.optionsCatalog), a = /* @__PURE__ */ new Set([...Ni, ...(o == null ? void 0 : o.skipKeys) || []]), r = (o == null ? void 0 : o.folderName) || s(this, He).name, i = o == null ? void 0 : o.afterChange;
    P(this, Ot, kn).call(this, {
      subject: s(this, He),
      skipKeys: a,
      optionsCatalog: e,
      folderKey: r,
      afterChange: i
    });
  }
  destroy() {
    s(this, ae).forEach((t) => {
      t.close();
    });
  }
}
He = new WeakMap(), ae = new WeakMap(), Ot = new WeakSet(), kn = function(t) {
  const { subject: o, folderKey: e, optionsCatalog: a, afterChange: r, skipKeys: i } = t;
  for (const l in o) {
    if (l.startsWith("_") || i.has(l))
      continue;
    const u = o[l], h = P(this, re, Se).call(this, u), f = `${e}.${l}`, g = a[l];
    typeof h == "number" ? (g == null ? void 0 : g.type) === "select" ? P(this, nt, Wt).call(this, {
      name: f,
      value: u,
      subject: o,
      key: l,
      managerOptions: g,
      afterChange: r
    }) : P(this, jt, Cn).call(this, {
      name: f,
      value: u,
      subject: o,
      key: l,
      managerOptions: g,
      afterChange: r
    }) : h instanceof Pe.Vector2 || h instanceof Pe.Vector3 ? P(this, kt, Rn).call(this, {
      name: f,
      value: u,
      subject: o,
      key: l,
      managerOptions: g,
      afterChange: r
    }) : typeof h == "boolean" && !l.startsWith("is") && !l.startsWith("matrix") ? P(this, Ct, Yn).call(this, {
      name: f,
      value: u,
      subject: o,
      key: l,
      managerOptions: g,
      afterChange: r
    }) : h instanceof Pe.Color ? P(this, Rt, Hn).call(this, {
      name: f,
      value: u,
      subject: o,
      key: l,
      managerOptions: g,
      afterChange: r
    }) : g && (g == null ? void 0 : g.type) === "select" && P(this, nt, Wt).call(this, {
      name: f,
      value: u,
      subject: o,
      key: l,
      managerOptions: g,
      afterChange: r
    });
  }
}, jt = new WeakSet(), Cn = function({
  name: t,
  value: o,
  subject: e,
  key: a,
  managerOptions: r,
  afterChange: i
}) {
  const l = new Z(P(this, re, Se).call(this, o), {
    passport: {
      name: t,
      manager: pe({
        type: "number"
      }, r)
    }
  });
  l.subscribe((u) => {
    P(this, le, xe).call(this, e, a, (h, f) => h[f] = u.current), i == null || i();
  }), s(this, ae).push(l);
}, kt = new WeakSet(), Rn = function({
  name: t,
  value: o,
  subject: e,
  key: a,
  managerOptions: r,
  afterChange: i
}) {
  const l = (h) => {
    const f = [h.x, h.y];
    return h instanceof Pe.Vector3 && f.push(h.z), f;
  }, u = new Z(l(P(this, re, Se).call(this, o)), {
    passport: {
      name: t,
      manager: pe({
        type: "number"
      }, r)
    }
  });
  u.subscribe((h) => {
    P(this, le, xe).call(this, e, a, (f, g) => f[g].set(...h.current)), i == null || i();
  }), s(this, ae).push(u);
}, Ct = new WeakSet(), Yn = function({
  name: t,
  value: o,
  subject: e,
  key: a,
  managerOptions: r,
  afterChange: i
}) {
  const l = new Z(P(this, re, Se).call(this, o), {
    passport: {
      name: t,
      manager: pe({
        type: "boolean"
      }, r)
    }
  });
  l.subscribe((u) => {
    P(this, le, xe).call(this, e, a, (h, f) => h[f] = u.current), i == null || i();
  }), s(this, ae).push(l);
}, Rt = new WeakSet(), Hn = function({
  name: t,
  value: o,
  subject: e,
  key: a,
  managerOptions: r,
  afterChange: i
}) {
  const l = new Z(`#${P(this, re, Se).call(this, o).getHexString()}`, {
    passport: {
      name: t,
      manager: pe({
        type: "color"
      }, r)
    }
  });
  l.subscribe((u) => {
    P(this, le, xe).call(this, e, a, (h, f) => h[f] = new Pe.Color(u.current)), i == null || i();
  }), s(this, ae).push(l);
}, nt = new WeakSet(), Wt = function({
  name: t,
  value: o,
  subject: e,
  key: a,
  managerOptions: r,
  afterChange: i
}) {
  const l = r == null ? void 0 : r.variants;
  if (l) {
    let u = null;
    for (const f of l)
      o === Pe[f] && (u = f);
    const h = new Z(u || P(this, re, Se).call(this, o), {
      passport: {
        name: t,
        manager: pe({}, r)
      }
    });
    h.subscribe((f) => {
      typeof f.current == "string" && (f.current[0] === f.current[0].toUpperCase() ? P(this, le, xe).call(this, e, a, (g, L) => g[L] = Pe[f.current]) : P(this, le, xe).call(this, e, a, (g, L) => g[L] = f.current)), i == null || i();
    }), s(this, ae).push(h);
  }
}, it = new WeakSet(), Ut = function(t) {
  return Ti(t) && "value" in t;
}, re = new WeakSet(), Se = function(t) {
  return P(this, it, Ut).call(this, t) ? t.value : t;
}, le = new WeakSet(), xe = function(t, o, e) {
  P(this, it, Ut).call(this, t[o]) ? e(t[o], "value") : e(t, o);
};
var E, ue, _e, Te, Ie, st, $, ze, Lt, ot;
class zn {
  constructor(t, o) {
    d(this, ze);
    d(this, E, void 0);
    d(this, ue, []);
    d(this, _e, void 0);
    d(this, Te, void 0);
    d(this, Ie, void 0);
    d(this, st, !0);
    d(this, $, []);
    d(this, ot, () => {
      s(this, $).forEach((t) => {
        "update" in t && t.update();
      });
    });
    var l, u;
    x(this, E, t);
    let e = !1;
    t.name.startsWith("T.") && (t.name = t.name.slice(2)), t.name.includes("P.") && (e = !0, t.name = t.name.replace("P.", ""));
    const a = t.name;
    s(this, E).userData.controlled = !0;
    const r = (o == null ? void 0 : o.step) || 1e-4, i = ((l = t.userData) == null ? void 0 : l.box) || t;
    if (s(this, E) instanceof fn) {
      let h;
      s(this, E) instanceof ai ? h = new ri(s(this, E), 100) : s(this, E) instanceof li ? (s(this, E).scale.setScalar(100), h = new ci(s(this, E), 1)) : s(this, E) instanceof hi ? h = new pi(s(this, E)) : s(this, E) instanceof mi && (h = new di(s(this, E), 100)), s(this, $).push(h);
      const f = (u = s(this, E).shadow) == null ? void 0 : u.camera;
      if (f instanceof yn) {
        const g = new ui(f);
        s(this, $).push(g);
      }
    }
    if (s(this, $).forEach((h) => {
      b.view.add(h);
    }), x(this, _e, new Z([i.position.x, i.position.y, i.position.z], {
      passport: {
        name: `${a}.Transformation.Position`,
        manager: {
          type: "number",
          step: r
        }
      }
    })), x(this, Te, new Z([i.rotation.x, i.rotation.y, i.rotation.z], {
      passport: {
        name: `${a}.Transformation.Rotation`,
        manager: {
          type: "number",
          step: r,
          ease: 0.01
        }
      }
    })), x(this, Ie, new Z([i.scale.x, i.scale.y, i.scale.z], {
      passport: {
        name: `${a}.Transformation.Scale`,
        manager: {
          type: "number",
          step: r
        }
      }
    })), this.save(), x(this, st, !1), s(this, _e).subscribe((h) => {
      P(this, ze, Lt).call(this, "position", h.current);
    }), s(this, Te).subscribe((h) => {
      P(this, ze, Lt).call(this, "rotation", h.current);
    }), s(this, Ie).subscribe((h) => {
      P(this, ze, Lt).call(this, "scale", h.current);
    }), e) {
      if (s(this, ue).push(
        new be(s(this, E), {
          folderName: `${s(this, E).name}.Parameters`,
          afterChange: s(this, E) instanceof yn ? () => {
            b.view.resize();
          } : void 0
        })
      ), s(this, E) instanceof p) {
        const h = s(this, E).material;
        h instanceof fi && s(this, ue).push(
          new be(h, {
            folderName: `${s(this, E).name}.Parameters.Material`,
            afterChange: () => {
              h.needsUpdate = !0;
            }
          })
        );
      } else if (s(this, E) instanceof fn) {
        const h = s(this, E).shadow;
        h && s(this, ue).push(
          new be(h, {
            folderName: `${s(this, E).name}.Parameters.Shadow`,
            afterChange: () => {
              h.needsUpdate = !0;
            }
          })
        ), h.camera && s(this, ue).push(
          new be(h, {
            folderName: `${s(this, E).name}.Parameters.Shadow.Camera`,
            afterChange: () => {
              h.camera.updateProjectionMatrix();
            }
          })
        );
      }
    }
    s(this, $).length && En.subscribe(s(this, ot));
  }
  get object3d() {
    return s(this, E);
  }
  get helpers() {
    return s(this, $);
  }
  get raycasterTarget() {
    return s(this, $)[0] || s(this, E);
  }
  destroy() {
    s(this, ue).forEach((t) => t.destroy()), s(this, _e).close(), s(this, Te).close(), s(this, Ie).close(), s(this, E).userData.controlled = !1, s(this, $).forEach((t) => {
      t && "dispose" in t && (t.dispose(), b.view.remove(t));
    }), En.unsubscribe(s(this, ot));
  }
  save() {
    const t = (o, e) => {
      (!s(this, st) || o.initial === o.current) && (o.current = [e.x, e.y, e.z]);
    };
    t(s(this, _e), s(this, E).position), t(s(this, Te), s(this, E).rotation), t(s(this, Ie), s(this, E).scale);
  }
}
E = new WeakMap(), ue = new WeakMap(), _e = new WeakMap(), Te = new WeakMap(), Ie = new WeakMap(), st = new WeakMap(), $ = new WeakMap(), ze = new WeakSet(), Lt = function(t, o) {
  const e = s(this, E).userData.box;
  if (e) {
    const a = (r) => ({
      x: o[0] - r.x,
      y: o[1] - r.y,
      z: o[2] - r.z
    });
    t === "position" ? e.setPositionStep(
      "_manager",
      "+",
      a(e.getIncludedPositionSteps("_manager"))
    ) : t === "rotation" ? e.setRotationStep(
      "_manager",
      "+",
      a(e.getIncludedRotationSteps("_manager"))
    ) : t === "scale" && e.setScaleStep(
      "_manager",
      "+",
      a(e.getIncludedScaleSteps("_manager"))
    );
  } else
    s(this, E)[t].set(...o);
}, ot = new WeakMap();
const Pn = { type: "change" }, Ft = { type: "start" }, Mn = { type: "end" }, _t = new yi(), Sn = new bi(), Xi = Math.cos(70 * wi.DEG2RAD);
class Zi extends gi {
  constructor(t, o) {
    super(), this.object = t, this.domElement = o, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new y(), this.cursor = new y(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Re.ROTATE, MIDDLE: Re.DOLLY, RIGHT: Re.PAN }, this.touches = { ONE: Ye.ROTATE, TWO: Ye.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return l.phi;
    }, this.getAzimuthalAngle = function() {
      return l.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(n) {
      n.addEventListener("keydown", Nt), this._domElementKeyEvents = n;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", Nt), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      e.target0.copy(e.target), e.position0.copy(e.object.position), e.zoom0 = e.object.zoom;
    }, this.reset = function() {
      e.target.copy(e.target0), e.object.position.copy(e.position0), e.object.zoom = e.zoom0, e.object.updateProjectionMatrix(), e.dispatchEvent(Pn), e.update(), r = a.NONE;
    }, this.update = function() {
      const n = new y(), c = new K().setFromUnitVectors(t.up, new y(0, 1, 0)), w = c.clone().invert(), S = new y(), N = new K(), he = new y(), G = 2 * Math.PI;
      return function(ni = null) {
        const pn = e.object.position;
        n.copy(pn).sub(e.target), n.applyQuaternion(c), l.setFromVector3(n), e.autoRotate && r === a.NONE && ge(Ht(ni)), e.enableDamping ? (l.theta += u.theta * e.dampingFactor, l.phi += u.phi * e.dampingFactor) : (l.theta += u.theta, l.phi += u.phi);
        let ie = e.minAzimuthAngle, se = e.maxAzimuthAngle;
        isFinite(ie) && isFinite(se) && (ie < -Math.PI ? ie += G : ie > Math.PI && (ie -= G), se < -Math.PI ? se += G : se > Math.PI && (se -= G), ie <= se ? l.theta = Math.max(ie, Math.min(se, l.theta)) : l.theta = l.theta > (ie + se) / 2 ? Math.max(ie, l.theta) : Math.min(se, l.theta)), l.phi = Math.max(e.minPolarAngle, Math.min(e.maxPolarAngle, l.phi)), l.makeSafe(), e.enableDamping === !0 ? e.target.addScaledVector(f, e.dampingFactor) : e.target.add(f), e.target.sub(e.cursor), e.target.clampLength(e.minTargetRadius, e.maxTargetRadius), e.target.add(e.cursor);
        let Ke = !1;
        if (e.zoomToCursor && De || e.object.isOrthographicCamera)
          l.radius = ce(l.radius);
        else {
          const oe = l.radius;
          l.radius = ce(l.radius * h), Ke = oe != l.radius;
        }
        if (n.setFromSpherical(l), n.applyQuaternion(w), pn.copy(e.target).add(n), e.object.lookAt(e.target), e.enableDamping === !0 ? (u.theta *= 1 - e.dampingFactor, u.phi *= 1 - e.dampingFactor, f.multiplyScalar(1 - e.dampingFactor)) : (u.set(0, 0, 0), f.set(0, 0, 0)), e.zoomToCursor && De) {
          let oe = null;
          if (e.object.isPerspectiveCamera) {
            const Be = n.length();
            oe = ce(Be * h);
            const xt = Be - oe;
            e.object.position.addScaledVector(te, xt), e.object.updateMatrixWorld(), Ke = !!xt;
          } else if (e.object.isOrthographicCamera) {
            const Be = new y(C.x, C.y, 0);
            Be.unproject(e.object);
            const xt = e.object.zoom;
            e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / h)), e.object.updateProjectionMatrix(), Ke = xt !== e.object.zoom;
            const mn = new y(C.x, C.y, 0);
            mn.unproject(e.object), e.object.position.sub(mn).add(Be), e.object.updateMatrixWorld(), oe = n.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), e.zoomToCursor = !1;
          oe !== null && (this.screenSpacePanning ? e.target.set(0, 0, -1).transformDirection(e.object.matrix).multiplyScalar(oe).add(e.object.position) : (_t.origin.copy(e.object.position), _t.direction.set(0, 0, -1).transformDirection(e.object.matrix), Math.abs(e.object.up.dot(_t.direction)) < Xi ? t.lookAt(e.target) : (Sn.setFromNormalAndCoplanarPoint(e.object.up, e.target), _t.intersectPlane(Sn, e.target))));
        } else if (e.object.isOrthographicCamera) {
          const oe = e.object.zoom;
          e.object.zoom = Math.max(e.minZoom, Math.min(e.maxZoom, e.object.zoom / h)), oe !== e.object.zoom && (e.object.updateProjectionMatrix(), Ke = !0);
        }
        return h = 1, De = !1, Ke || S.distanceToSquared(e.object.position) > i || 8 * (1 - N.dot(e.object.quaternion)) > i || he.distanceToSquared(e.target) > i ? (e.dispatchEvent(Pn), S.copy(e.object.position), N.copy(e.object.quaternion), he.copy(e.target), !0) : !1;
      };
    }(), this.dispose = function() {
      e.domElement.removeEventListener("contextmenu", cn), e.domElement.removeEventListener("pointerdown", sn), e.domElement.removeEventListener("pointercancel", Ue), e.domElement.removeEventListener("wheel", on), e.domElement.removeEventListener("pointermove", zt), e.domElement.removeEventListener("pointerup", Ue), e.domElement.getRootNode().removeEventListener("keydown", an, { capture: !0 }), e._domElementKeyEvents !== null && (e._domElementKeyEvents.removeEventListener("keydown", Nt), e._domElementKeyEvents = null);
    };
    const e = this, a = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let r = a.NONE;
    const i = 1e-6, l = new bn(), u = new bn();
    let h = 1;
    const f = new y(), g = new V(), L = new V(), ee = new V(), Q = new V(), D = new V(), k = new V(), O = new V(), _ = new V(), T = new V(), te = new y(), C = new V();
    let De = !1;
    const I = [], we = {};
    let We = !1;
    function Ht(n) {
      return n !== null ? 2 * Math.PI / 60 * e.autoRotateSpeed * n : 2 * Math.PI / 60 / 60 * e.autoRotateSpeed;
    }
    function Oe(n) {
      const c = Math.abs(n * 0.01);
      return Math.pow(0.95, e.zoomSpeed * c);
    }
    function ge(n) {
      u.theta -= n;
    }
    function je(n) {
      u.phi -= n;
    }
    const q = function() {
      const n = new y();
      return function(w, S) {
        n.setFromMatrixColumn(S, 0), n.multiplyScalar(-w), f.add(n);
      };
    }(), H = function() {
      const n = new y();
      return function(w, S) {
        e.screenSpacePanning === !0 ? n.setFromMatrixColumn(S, 1) : (n.setFromMatrixColumn(S, 0), n.crossVectors(e.object.up, n)), n.multiplyScalar(w), f.add(n);
      };
    }(), B = function() {
      const n = new y();
      return function(w, S) {
        const N = e.domElement;
        if (e.object.isPerspectiveCamera) {
          const he = e.object.position;
          n.copy(he).sub(e.target);
          let G = n.length();
          G *= Math.tan(e.object.fov / 2 * Math.PI / 180), q(2 * w * G / N.clientHeight, e.object.matrix), H(2 * S * G / N.clientHeight, e.object.matrix);
        } else
          e.object.isOrthographicCamera ? (q(w * (e.object.right - e.object.left) / e.object.zoom / N.clientWidth, e.object.matrix), H(S * (e.object.top - e.object.bottom) / e.object.zoom / N.clientHeight, e.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), e.enablePan = !1);
      };
    }();
    function z(n) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? h /= n : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function ne(n) {
      e.object.isPerspectiveCamera || e.object.isOrthographicCamera ? h *= n : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), e.enableZoom = !1);
    }
    function A(n, c) {
      if (!e.zoomToCursor)
        return;
      De = !0;
      const w = e.domElement.getBoundingClientRect(), S = n - w.left, N = c - w.top, he = w.width, G = w.height;
      C.x = S / he * 2 - 1, C.y = -(N / G) * 2 + 1, te.set(C.x, C.y, 1).unproject(e.object).sub(e.object.position).normalize();
    }
    function ce(n) {
      return Math.max(e.minDistance, Math.min(e.maxDistance, n));
    }
    function Ee(n) {
      g.set(n.clientX, n.clientY);
    }
    function ke(n) {
      A(n.clientX, n.clientX), O.set(n.clientX, n.clientY);
    }
    function Mt(n) {
      Q.set(n.clientX, n.clientY);
    }
    function St(n) {
      L.set(n.clientX, n.clientY), ee.subVectors(L, g).multiplyScalar(e.rotateSpeed);
      const c = e.domElement;
      ge(2 * Math.PI * ee.x / c.clientHeight), je(2 * Math.PI * ee.y / c.clientHeight), g.copy(L), e.update();
    }
    function Xn(n) {
      _.set(n.clientX, n.clientY), T.subVectors(_, O), T.y > 0 ? z(Oe(T.y)) : T.y < 0 && ne(Oe(T.y)), O.copy(_), e.update();
    }
    function Zn(n) {
      D.set(n.clientX, n.clientY), k.subVectors(D, Q).multiplyScalar(e.panSpeed), B(k.x, k.y), Q.copy(D), e.update();
    }
    function Fn(n) {
      A(n.clientX, n.clientY), n.deltaY < 0 ? ne(Oe(n.deltaY)) : n.deltaY > 0 && z(Oe(n.deltaY)), e.update();
    }
    function Qn(n) {
      let c = !1;
      switch (n.code) {
        case e.keys.UP:
          n.ctrlKey || n.metaKey || n.shiftKey ? je(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : B(0, e.keyPanSpeed), c = !0;
          break;
        case e.keys.BOTTOM:
          n.ctrlKey || n.metaKey || n.shiftKey ? je(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : B(0, -e.keyPanSpeed), c = !0;
          break;
        case e.keys.LEFT:
          n.ctrlKey || n.metaKey || n.shiftKey ? ge(2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : B(e.keyPanSpeed, 0), c = !0;
          break;
        case e.keys.RIGHT:
          n.ctrlKey || n.metaKey || n.shiftKey ? ge(-2 * Math.PI * e.rotateSpeed / e.domElement.clientHeight) : B(-e.keyPanSpeed, 0), c = !0;
          break;
      }
      c && (n.preventDefault(), e.update());
    }
    function Vt(n) {
      if (I.length === 1)
        g.set(n.pageX, n.pageY);
      else {
        const c = Ce(n), w = 0.5 * (n.pageX + c.x), S = 0.5 * (n.pageY + c.y);
        g.set(w, S);
      }
    }
    function $t(n) {
      if (I.length === 1)
        Q.set(n.pageX, n.pageY);
      else {
        const c = Ce(n), w = 0.5 * (n.pageX + c.x), S = 0.5 * (n.pageY + c.y);
        Q.set(w, S);
      }
    }
    function Jt(n) {
      const c = Ce(n), w = n.pageX - c.x, S = n.pageY - c.y, N = Math.sqrt(w * w + S * S);
      O.set(0, N);
    }
    function qn(n) {
      e.enableZoom && Jt(n), e.enablePan && $t(n);
    }
    function Gn(n) {
      e.enableZoom && Jt(n), e.enableRotate && Vt(n);
    }
    function en(n) {
      if (I.length == 1)
        L.set(n.pageX, n.pageY);
      else {
        const w = Ce(n), S = 0.5 * (n.pageX + w.x), N = 0.5 * (n.pageY + w.y);
        L.set(S, N);
      }
      ee.subVectors(L, g).multiplyScalar(e.rotateSpeed);
      const c = e.domElement;
      ge(2 * Math.PI * ee.x / c.clientHeight), je(2 * Math.PI * ee.y / c.clientHeight), g.copy(L);
    }
    function tn(n) {
      if (I.length === 1)
        D.set(n.pageX, n.pageY);
      else {
        const c = Ce(n), w = 0.5 * (n.pageX + c.x), S = 0.5 * (n.pageY + c.y);
        D.set(w, S);
      }
      k.subVectors(D, Q).multiplyScalar(e.panSpeed), B(k.x, k.y), Q.copy(D);
    }
    function nn(n) {
      const c = Ce(n), w = n.pageX - c.x, S = n.pageY - c.y, N = Math.sqrt(w * w + S * S);
      _.set(0, N), T.set(0, Math.pow(_.y / O.y, e.zoomSpeed)), z(T.y), O.copy(_);
      const he = (n.pageX + c.x) * 0.5, G = (n.pageY + c.y) * 0.5;
      A(he, G);
    }
    function Wn(n) {
      e.enableZoom && nn(n), e.enablePan && tn(n);
    }
    function Un(n) {
      e.enableZoom && nn(n), e.enableRotate && en(n);
    }
    function sn(n) {
      e.enabled !== !1 && (I.length === 0 && (e.domElement.setPointerCapture(n.pointerId), e.domElement.addEventListener("pointermove", zt), e.domElement.addEventListener("pointerup", Ue)), !ti(n) && (Jn(n), n.pointerType === "touch" ? ln(n) : Kn(n)));
    }
    function zt(n) {
      e.enabled !== !1 && (n.pointerType === "touch" ? $n(n) : Bn(n));
    }
    function Ue(n) {
      switch (ei(n), I.length) {
        case 0:
          e.domElement.releasePointerCapture(n.pointerId), e.domElement.removeEventListener("pointermove", zt), e.domElement.removeEventListener("pointerup", Ue), e.dispatchEvent(Mn), r = a.NONE;
          break;
        case 1:
          const c = I[0], w = we[c];
          ln({ pointerId: c, pageX: w.x, pageY: w.y });
          break;
      }
    }
    function Kn(n) {
      let c;
      switch (n.button) {
        case 0:
          c = e.mouseButtons.LEFT;
          break;
        case 1:
          c = e.mouseButtons.MIDDLE;
          break;
        case 2:
          c = e.mouseButtons.RIGHT;
          break;
        default:
          c = -1;
      }
      switch (c) {
        case Re.DOLLY:
          if (e.enableZoom === !1)
            return;
          ke(n), r = a.DOLLY;
          break;
        case Re.ROTATE:
          if (n.ctrlKey || n.metaKey || n.shiftKey) {
            if (e.enablePan === !1)
              return;
            Mt(n), r = a.PAN;
          } else {
            if (e.enableRotate === !1)
              return;
            Ee(n), r = a.ROTATE;
          }
          break;
        case Re.PAN:
          if (n.ctrlKey || n.metaKey || n.shiftKey) {
            if (e.enableRotate === !1)
              return;
            Ee(n), r = a.ROTATE;
          } else {
            if (e.enablePan === !1)
              return;
            Mt(n), r = a.PAN;
          }
          break;
        default:
          r = a.NONE;
      }
      r !== a.NONE && e.dispatchEvent(Ft);
    }
    function Bn(n) {
      switch (r) {
        case a.ROTATE:
          if (e.enableRotate === !1)
            return;
          St(n);
          break;
        case a.DOLLY:
          if (e.enableZoom === !1)
            return;
          Xn(n);
          break;
        case a.PAN:
          if (e.enablePan === !1)
            return;
          Zn(n);
          break;
      }
    }
    function on(n) {
      e.enabled === !1 || e.enableZoom === !1 || r !== a.NONE || (n.preventDefault(), e.dispatchEvent(Ft), Fn(Vn(n)), e.dispatchEvent(Mn));
    }
    function Vn(n) {
      const c = n.deltaMode, w = {
        clientX: n.clientX,
        clientY: n.clientY,
        deltaY: n.deltaY
      };
      switch (c) {
        case 1:
          w.deltaY *= 16;
          break;
        case 2:
          w.deltaY *= 100;
          break;
      }
      return n.ctrlKey && !We && (w.deltaY *= 10), w;
    }
    function an(n) {
      n.key === "Control" && (We = !0, e.domElement.getRootNode().addEventListener("keyup", rn, { passive: !0, capture: !0 }));
    }
    function rn(n) {
      n.key === "Control" && (We = !1, e.domElement.getRootNode().removeEventListener("keyup", rn, { passive: !0, capture: !0 }));
    }
    function Nt(n) {
      e.enabled === !1 || e.enablePan === !1 || Qn(n);
    }
    function ln(n) {
      switch (hn(n), I.length) {
        case 1:
          switch (e.touches.ONE) {
            case Ye.ROTATE:
              if (e.enableRotate === !1)
                return;
              Vt(n), r = a.TOUCH_ROTATE;
              break;
            case Ye.PAN:
              if (e.enablePan === !1)
                return;
              $t(n), r = a.TOUCH_PAN;
              break;
            default:
              r = a.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case Ye.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1)
                return;
              qn(n), r = a.TOUCH_DOLLY_PAN;
              break;
            case Ye.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1)
                return;
              Gn(n), r = a.TOUCH_DOLLY_ROTATE;
              break;
            default:
              r = a.NONE;
          }
          break;
        default:
          r = a.NONE;
      }
      r !== a.NONE && e.dispatchEvent(Ft);
    }
    function $n(n) {
      switch (hn(n), r) {
        case a.TOUCH_ROTATE:
          if (e.enableRotate === !1)
            return;
          en(n), e.update();
          break;
        case a.TOUCH_PAN:
          if (e.enablePan === !1)
            return;
          tn(n), e.update();
          break;
        case a.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1)
            return;
          Wn(n), e.update();
          break;
        case a.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1)
            return;
          Un(n), e.update();
          break;
        default:
          r = a.NONE;
      }
    }
    function cn(n) {
      e.enabled !== !1 && n.preventDefault();
    }
    function Jn(n) {
      I.push(n.pointerId);
    }
    function ei(n) {
      delete we[n.pointerId];
      for (let c = 0; c < I.length; c++)
        if (I[c] == n.pointerId) {
          I.splice(c, 1);
          return;
        }
    }
    function ti(n) {
      for (let c = 0; c < I.length; c++)
        if (I[c] == n.pointerId)
          return !0;
      return !1;
    }
    function hn(n) {
      let c = we[n.pointerId];
      c === void 0 && (c = new V(), we[n.pointerId] = c), c.set(n.pageX, n.pageY);
    }
    function Ce(n) {
      const c = n.pointerId === I[0] ? I[1] : I[0];
      return we[c];
    }
    e.domElement.addEventListener("contextmenu", cn), e.domElement.addEventListener("pointerdown", sn), e.domElement.addEventListener("pointercancel", Ue), e.domElement.addEventListener("wheel", on, { passive: !1 }), e.domElement.getRootNode().addEventListener("keydown", an, { passive: !0, capture: !0 }), this.update();
  }
}
const Me = new Ei(), Y = new y(), de = new y(), v = new K(), xn = {
  X: new y(1, 0, 0),
  Y: new y(0, 1, 0),
  Z: new y(0, 0, 1)
}, Qt = { type: "change" }, vn = { type: "mouseDown", mode: null }, _n = { type: "mouseUp", mode: null }, Tn = { type: "objectChange" };
class Fi extends Gt {
  constructor(t, o) {
    super(), o === void 0 && (console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.'), o = document), this.isTransformControls = !0, this.visible = !1, this.domElement = o, this.domElement.style.touchAction = "none";
    const e = new Ki();
    this._gizmo = e, this.add(e);
    const a = new Bi();
    this._plane = a, this.add(a);
    const r = this;
    function i(_, T) {
      let te = T;
      Object.defineProperty(r, _, {
        get: function() {
          return te !== void 0 ? te : T;
        },
        set: function(C) {
          te !== C && (te = C, a[_] = C, e[_] = C, r.dispatchEvent({ type: _ + "-changed", value: C }), r.dispatchEvent(Qt));
        }
      }), r[_] = T, a[_] = T, e[_] = T;
    }
    i("camera", t), i("object", void 0), i("enabled", !0), i("axis", null), i("mode", "translate"), i("translationSnap", null), i("rotationSnap", null), i("scaleSnap", null), i("space", "world"), i("size", 1), i("dragging", !1), i("showX", !0), i("showY", !0), i("showZ", !0);
    const l = new y(), u = new y(), h = new K(), f = new K(), g = new y(), L = new K(), ee = new y(), Q = new y(), D = new y(), k = 0, O = new y();
    i("worldPosition", l), i("worldPositionStart", u), i("worldQuaternion", h), i("worldQuaternionStart", f), i("cameraPosition", g), i("cameraQuaternion", L), i("pointStart", ee), i("pointEnd", Q), i("rotationAxis", D), i("rotationAngle", k), i("eye", O), this._offset = new y(), this._startNorm = new y(), this._endNorm = new y(), this._cameraScale = new y(), this._parentPosition = new y(), this._parentQuaternion = new K(), this._parentQuaternionInv = new K(), this._parentScale = new y(), this._worldScaleStart = new y(), this._worldQuaternionInv = new K(), this._worldScale = new y(), this._positionStart = new y(), this._quaternionStart = new K(), this._scaleStart = new y(), this._getPointer = Qi.bind(this), this._onPointerDown = Gi.bind(this), this._onPointerHover = qi.bind(this), this._onPointerMove = Wi.bind(this), this._onPointerUp = Ui.bind(this), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointermove", this._onPointerHover), this.domElement.addEventListener("pointerup", this._onPointerUp);
  }
  // updateMatrixWorld updates key transformation variables
  updateMatrixWorld(t) {
    this.object !== void 0 && (this.object.updateMatrixWorld(), this.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : this.object.parent.matrixWorld.decompose(this._parentPosition, this._parentQuaternion, this._parentScale), this.object.matrixWorld.decompose(this.worldPosition, this.worldQuaternion, this._worldScale), this._parentQuaternionInv.copy(this._parentQuaternion).invert(), this._worldQuaternionInv.copy(this.worldQuaternion).invert()), this.camera.updateMatrixWorld(), this.camera.matrixWorld.decompose(this.cameraPosition, this.cameraQuaternion, this._cameraScale), this.camera.isOrthographicCamera ? this.camera.getWorldDirection(this.eye).negate() : this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(), super.updateMatrixWorld(t);
  }
  pointerHover(t) {
    if (this.object === void 0 || this.dragging === !0)
      return;
    t !== null && Me.setFromCamera(t, this.camera);
    const o = qt(this._gizmo.picker[this.mode], Me);
    o ? this.axis = o.object.name : this.axis = null;
  }
  pointerDown(t) {
    if (!(this.object === void 0 || this.dragging === !0 || t != null && t.button !== 0) && this.axis !== null) {
      t !== null && Me.setFromCamera(t, this.camera);
      const o = qt(this._plane, Me, !0);
      o && (this.object.updateMatrixWorld(), this.object.parent.updateMatrixWorld(), this._positionStart.copy(this.object.position), this._quaternionStart.copy(this.object.quaternion), this._scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart), this.pointStart.copy(o.point).sub(this.worldPositionStart)), this.dragging = !0, vn.mode = this.mode, this.dispatchEvent(vn);
    }
  }
  pointerMove(t) {
    const o = this.axis, e = this.mode, a = this.object;
    let r = this.space;
    if (e === "scale" ? r = "local" : (o === "E" || o === "XYZE" || o === "XYZ") && (r = "world"), a === void 0 || o === null || this.dragging === !1 || t !== null && t.button !== -1)
      return;
    t !== null && Me.setFromCamera(t, this.camera);
    const i = qt(this._plane, Me, !0);
    if (i) {
      if (this.pointEnd.copy(i.point).sub(this.worldPositionStart), e === "translate")
        this._offset.copy(this.pointEnd).sub(this.pointStart), r === "local" && o !== "XYZ" && this._offset.applyQuaternion(this._worldQuaternionInv), o.indexOf("X") === -1 && (this._offset.x = 0), o.indexOf("Y") === -1 && (this._offset.y = 0), o.indexOf("Z") === -1 && (this._offset.z = 0), r === "local" && o !== "XYZ" ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale) : this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale), a.position.copy(this._offset).add(this._positionStart), this.translationSnap && (r === "local" && (a.position.applyQuaternion(v.copy(this._quaternionStart).invert()), o.search("X") !== -1 && (a.position.x = Math.round(a.position.x / this.translationSnap) * this.translationSnap), o.search("Y") !== -1 && (a.position.y = Math.round(a.position.y / this.translationSnap) * this.translationSnap), o.search("Z") !== -1 && (a.position.z = Math.round(a.position.z / this.translationSnap) * this.translationSnap), a.position.applyQuaternion(this._quaternionStart)), r === "world" && (a.parent && a.position.add(Y.setFromMatrixPosition(a.parent.matrixWorld)), o.search("X") !== -1 && (a.position.x = Math.round(a.position.x / this.translationSnap) * this.translationSnap), o.search("Y") !== -1 && (a.position.y = Math.round(a.position.y / this.translationSnap) * this.translationSnap), o.search("Z") !== -1 && (a.position.z = Math.round(a.position.z / this.translationSnap) * this.translationSnap), a.parent && a.position.sub(Y.setFromMatrixPosition(a.parent.matrixWorld))));
      else if (e === "scale") {
        if (o.search("XYZ") !== -1) {
          let l = this.pointEnd.length() / this.pointStart.length();
          this.pointEnd.dot(this.pointStart) < 0 && (l *= -1), de.set(l, l, l);
        } else
          Y.copy(this.pointStart), de.copy(this.pointEnd), Y.applyQuaternion(this._worldQuaternionInv), de.applyQuaternion(this._worldQuaternionInv), de.divide(Y), o.search("X") === -1 && (de.x = 1), o.search("Y") === -1 && (de.y = 1), o.search("Z") === -1 && (de.z = 1);
        a.scale.copy(this._scaleStart).multiply(de), this.scaleSnap && (o.search("X") !== -1 && (a.scale.x = Math.round(a.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), o.search("Y") !== -1 && (a.scale.y = Math.round(a.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), o.search("Z") !== -1 && (a.scale.z = Math.round(a.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
      } else if (e === "rotate") {
        this._offset.copy(this.pointEnd).sub(this.pointStart);
        const l = 20 / this.worldPosition.distanceTo(Y.setFromMatrixPosition(this.camera.matrixWorld));
        let u = !1;
        o === "XYZE" ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(), this.rotationAngle = this._offset.dot(Y.copy(this.rotationAxis).cross(this.eye)) * l) : (o === "X" || o === "Y" || o === "Z") && (this.rotationAxis.copy(xn[o]), Y.copy(xn[o]), r === "local" && Y.applyQuaternion(this.worldQuaternion), Y.cross(this.eye), Y.length() === 0 ? u = !0 : this.rotationAngle = this._offset.dot(Y.normalize()) * l), (o === "E" || u) && (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this._startNorm.copy(this.pointStart).normalize(), this._endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), r === "local" && o !== "E" && o !== "XYZE" ? (a.quaternion.copy(this._quaternionStart), a.quaternion.multiply(v.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv), a.quaternion.copy(v.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), a.quaternion.multiply(this._quaternionStart).normalize());
      }
      this.dispatchEvent(Qt), this.dispatchEvent(Tn);
    }
  }
  pointerUp(t) {
    t !== null && t.button !== 0 || (this.dragging && this.axis !== null && (_n.mode = this.mode, this.dispatchEvent(_n)), this.dragging = !1, this.axis = null);
  }
  dispose() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerHover), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.traverse(function(t) {
      t.geometry && t.geometry.dispose(), t.material && t.material.dispose();
    });
  }
  // Set current object
  attach(t) {
    return this.object = t, this.visible = !0, this;
  }
  // Detach from object
  detach() {
    return this.object = void 0, this.visible = !1, this.axis = null, this;
  }
  reset() {
    this.enabled && this.dragging && (this.object.position.copy(this._positionStart), this.object.quaternion.copy(this._quaternionStart), this.object.scale.copy(this._scaleStart), this.dispatchEvent(Qt), this.dispatchEvent(Tn), this.pointStart.copy(this.pointEnd));
  }
  getRaycaster() {
    return Me;
  }
  // TODO: deprecate
  getMode() {
    return this.mode;
  }
  setMode(t) {
    this.mode = t;
  }
  setTranslationSnap(t) {
    this.translationSnap = t;
  }
  setRotationSnap(t) {
    this.rotationSnap = t;
  }
  setScaleSnap(t) {
    this.scaleSnap = t;
  }
  setSize(t) {
    this.size = t;
  }
  setSpace(t) {
    this.space = t;
  }
}
function Qi(m) {
  if (this.domElement.ownerDocument.pointerLockElement)
    return {
      x: 0,
      y: 0,
      button: m.button
    };
  {
    const t = this.domElement.getBoundingClientRect();
    return {
      x: (m.clientX - t.left) / t.width * 2 - 1,
      y: -(m.clientY - t.top) / t.height * 2 + 1,
      button: m.button
    };
  }
}
function qi(m) {
  if (this.enabled)
    switch (m.pointerType) {
      case "mouse":
      case "pen":
        this.pointerHover(this._getPointer(m));
        break;
    }
}
function Gi(m) {
  this.enabled && (document.pointerLockElement || this.domElement.setPointerCapture(m.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.pointerHover(this._getPointer(m)), this.pointerDown(this._getPointer(m)));
}
function Wi(m) {
  this.enabled && this.pointerMove(this._getPointer(m));
}
function Ui(m) {
  this.enabled && (this.domElement.releasePointerCapture(m.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.pointerUp(this._getPointer(m)));
}
function qt(m, t, o) {
  const e = t.intersectObject(m, !0);
  for (let a = 0; a < e.length; a++)
    if (e[a].object.visible || o)
      return e[a];
  return !1;
}
const Tt = new Pi(), M = new y(0, 1, 0), In = new y(0, 0, 0), An = new Dn(), It = new K(), Dt = new K(), J = new y(), Ln = new Dn(), et = new y(1, 0, 0), ve = new y(0, 1, 0), tt = new y(0, 0, 1), At = new y(), $e = new y(), Je = new y();
class Ki extends Gt {
  constructor() {
    super(), this.isTransformControlsGizmo = !0, this.type = "TransformControlsGizmo";
    const t = new On({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), o = new Mi({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), e = t.clone();
    e.opacity = 0.15;
    const a = o.clone();
    a.opacity = 0.5;
    const r = t.clone();
    r.color.setHex(16711680);
    const i = t.clone();
    i.color.setHex(65280);
    const l = t.clone();
    l.color.setHex(255);
    const u = t.clone();
    u.color.setHex(16711680), u.opacity = 0.5;
    const h = t.clone();
    h.color.setHex(65280), h.opacity = 0.5;
    const f = t.clone();
    f.color.setHex(255), f.opacity = 0.5;
    const g = t.clone();
    g.opacity = 0.25;
    const L = t.clone();
    L.color.setHex(16776960), L.opacity = 0.25, t.clone().color.setHex(16776960);
    const Q = t.clone();
    Q.color.setHex(7895160);
    const D = new F(0, 0.04, 0.1, 12);
    D.translate(0, 0.05, 0);
    const k = new X(0.08, 0.08, 0.08);
    k.translate(0, 0.04, 0);
    const O = new wn();
    O.setAttribute("position", new gn([0, 0, 0, 1, 0, 0], 3));
    const _ = new F(75e-4, 75e-4, 0.5, 3);
    _.translate(0, 0.25, 0);
    function T(H, B) {
      const z = new Ve(H, 75e-4, 3, 64, B * Math.PI * 2);
      return z.rotateY(Math.PI / 2), z.rotateX(Math.PI / 2), z;
    }
    function te() {
      const H = new wn();
      return H.setAttribute("position", new gn([0, 0, 0, 1, 1, 1], 3)), H;
    }
    const C = {
      X: [
        [new p(D, r), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new p(D, r), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
        [new p(_, r), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      Y: [
        [new p(D, i), [0, 0.5, 0]],
        [new p(D, i), [0, -0.5, 0], [Math.PI, 0, 0]],
        [new p(_, i)]
      ],
      Z: [
        [new p(D, l), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new p(D, l), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
        [new p(_, l), null, [Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new p(new vt(0.1, 0), g.clone()), [0, 0, 0]]
      ],
      XY: [
        [new p(new X(0.15, 0.15, 0.01), f.clone()), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new p(new X(0.15, 0.15, 0.01), u.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new p(new X(0.15, 0.15, 0.01), h.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, De = {
      X: [
        [new p(new F(0.2, 0, 0.6, 4), e), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new p(new F(0.2, 0, 0.6, 4), e), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new p(new F(0.2, 0, 0.6, 4), e), [0, 0.3, 0]],
        [new p(new F(0.2, 0, 0.6, 4), e), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new p(new F(0.2, 0, 0.6, 4), e), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new p(new F(0.2, 0, 0.6, 4), e), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new p(new vt(0.2, 0), e)]
      ],
      XY: [
        [new p(new X(0.2, 0.2, 0.01), e), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new p(new X(0.2, 0.2, 0.01), e), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new p(new X(0.2, 0.2, 0.01), e), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, I = {
      START: [
        [new p(new vt(0.01, 2), a), null, null, null, "helper"]
      ],
      END: [
        [new p(new vt(0.01, 2), a), null, null, null, "helper"]
      ],
      DELTA: [
        [new me(te(), a), null, null, null, "helper"]
      ],
      X: [
        [new me(O, a.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new me(O, a.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new me(O, a.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    }, we = {
      XYZE: [
        [new p(T(0.5, 1), Q), null, [0, Math.PI / 2, 0]]
      ],
      X: [
        [new p(T(0.5, 0.5), r)]
      ],
      Y: [
        [new p(T(0.5, 0.5), i), null, [0, 0, -Math.PI / 2]]
      ],
      Z: [
        [new p(T(0.5, 0.5), l), null, [0, Math.PI / 2, 0]]
      ],
      E: [
        [new p(T(0.75, 1), L), null, [0, Math.PI / 2, 0]]
      ]
    }, We = {
      AXIS: [
        [new me(O, a.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ]
    }, Ht = {
      XYZE: [
        [new p(new Si(0.25, 10, 8), e)]
      ],
      X: [
        [new p(new Ve(0.5, 0.1, 4, 24), e), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]
      ],
      Y: [
        [new p(new Ve(0.5, 0.1, 4, 24), e), [0, 0, 0], [Math.PI / 2, 0, 0]]
      ],
      Z: [
        [new p(new Ve(0.5, 0.1, 4, 24), e), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      E: [
        [new p(new Ve(0.75, 0.1, 2, 24), e)]
      ]
    }, Oe = {
      X: [
        [new p(k, r), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new p(_, r), [0, 0, 0], [0, 0, -Math.PI / 2]],
        [new p(k, r), [-0.5, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new p(k, i), [0, 0.5, 0]],
        [new p(_, i)],
        [new p(k, i), [0, -0.5, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new p(k, l), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new p(_, l), [0, 0, 0], [Math.PI / 2, 0, 0]],
        [new p(k, l), [0, 0, -0.5], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new p(new X(0.15, 0.15, 0.01), f), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new p(new X(0.15, 0.15, 0.01), u), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new p(new X(0.15, 0.15, 0.01), h), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new p(new X(0.1, 0.1, 0.1), g.clone())]
      ]
    }, ge = {
      X: [
        [new p(new F(0.2, 0, 0.6, 4), e), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new p(new F(0.2, 0, 0.6, 4), e), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new p(new F(0.2, 0, 0.6, 4), e), [0, 0.3, 0]],
        [new p(new F(0.2, 0, 0.6, 4), e), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new p(new F(0.2, 0, 0.6, 4), e), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new p(new F(0.2, 0, 0.6, 4), e), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new p(new X(0.2, 0.2, 0.01), e), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new p(new X(0.2, 0.2, 0.01), e), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new p(new X(0.2, 0.2, 0.01), e), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new p(new X(0.2, 0.2, 0.2), e), [0, 0, 0]]
      ]
    }, je = {
      X: [
        [new me(O, a.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new me(O, a.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new me(O, a.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    };
    function q(H) {
      const B = new Gt();
      for (const z in H)
        for (let ne = H[z].length; ne--; ) {
          const A = H[z][ne][0].clone(), ce = H[z][ne][1], Ee = H[z][ne][2], ke = H[z][ne][3], Mt = H[z][ne][4];
          A.name = z, A.tag = Mt, ce && A.position.set(ce[0], ce[1], ce[2]), Ee && A.rotation.set(Ee[0], Ee[1], Ee[2]), ke && A.scale.set(ke[0], ke[1], ke[2]), A.updateMatrix();
          const St = A.geometry.clone();
          St.applyMatrix4(A.matrix), A.geometry = St, A.renderOrder = 1 / 0, A.position.set(0, 0, 0), A.rotation.set(0, 0, 0), A.scale.set(1, 1, 1), B.add(A);
        }
      return B;
    }
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = q(C)), this.add(this.gizmo.rotate = q(we)), this.add(this.gizmo.scale = q(Oe)), this.add(this.picker.translate = q(De)), this.add(this.picker.rotate = q(Ht)), this.add(this.picker.scale = q(ge)), this.add(this.helper.translate = q(I)), this.add(this.helper.rotate = q(We)), this.add(this.helper.scale = q(je)), this.picker.translate.visible = !1, this.picker.rotate.visible = !1, this.picker.scale.visible = !1;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
  updateMatrixWorld(t) {
    const e = (this.mode === "scale" ? "local" : this.space) === "local" ? this.worldQuaternion : Dt;
    this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
    let a = [];
    a = a.concat(this.picker[this.mode].children), a = a.concat(this.gizmo[this.mode].children), a = a.concat(this.helper[this.mode].children);
    for (let r = 0; r < a.length; r++) {
      const i = a[r];
      i.visible = !0, i.rotation.set(0, 0, 0), i.position.copy(this.worldPosition);
      let l;
      if (this.camera.isOrthographicCamera ? l = (this.camera.top - this.camera.bottom) / this.camera.zoom : l = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), i.scale.set(1, 1, 1).multiplyScalar(l * this.size / 4), i.tag === "helper") {
        i.visible = !1, i.name === "AXIS" ? (i.visible = !!this.axis, this.axis === "X" && (v.setFromEuler(Tt.set(0, 0, 0)), i.quaternion.copy(e).multiply(v), Math.abs(M.copy(et).applyQuaternion(e).dot(this.eye)) > 0.9 && (i.visible = !1)), this.axis === "Y" && (v.setFromEuler(Tt.set(0, 0, Math.PI / 2)), i.quaternion.copy(e).multiply(v), Math.abs(M.copy(ve).applyQuaternion(e).dot(this.eye)) > 0.9 && (i.visible = !1)), this.axis === "Z" && (v.setFromEuler(Tt.set(0, Math.PI / 2, 0)), i.quaternion.copy(e).multiply(v), Math.abs(M.copy(tt).applyQuaternion(e).dot(this.eye)) > 0.9 && (i.visible = !1)), this.axis === "XYZE" && (v.setFromEuler(Tt.set(0, Math.PI / 2, 0)), M.copy(this.rotationAxis), i.quaternion.setFromRotationMatrix(An.lookAt(In, M, ve)), i.quaternion.multiply(v), i.visible = this.dragging), this.axis === "E" && (i.visible = !1)) : i.name === "START" ? (i.position.copy(this.worldPositionStart), i.visible = this.dragging) : i.name === "END" ? (i.position.copy(this.worldPosition), i.visible = this.dragging) : i.name === "DELTA" ? (i.position.copy(this.worldPositionStart), i.quaternion.copy(this.worldQuaternionStart), Y.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), Y.applyQuaternion(this.worldQuaternionStart.clone().invert()), i.scale.copy(Y), i.visible = this.dragging) : (i.quaternion.copy(e), this.dragging ? i.position.copy(this.worldPositionStart) : i.position.copy(this.worldPosition), this.axis && (i.visible = this.axis.search(i.name) !== -1));
        continue;
      }
      i.quaternion.copy(e), this.mode === "translate" || this.mode === "scale" ? (i.name === "X" && Math.abs(M.copy(et).applyQuaternion(e).dot(this.eye)) > 0.99 && (i.scale.set(1e-10, 1e-10, 1e-10), i.visible = !1), i.name === "Y" && Math.abs(M.copy(ve).applyQuaternion(e).dot(this.eye)) > 0.99 && (i.scale.set(1e-10, 1e-10, 1e-10), i.visible = !1), i.name === "Z" && Math.abs(M.copy(tt).applyQuaternion(e).dot(this.eye)) > 0.99 && (i.scale.set(1e-10, 1e-10, 1e-10), i.visible = !1), i.name === "XY" && Math.abs(M.copy(tt).applyQuaternion(e).dot(this.eye)) < 0.2 && (i.scale.set(1e-10, 1e-10, 1e-10), i.visible = !1), i.name === "YZ" && Math.abs(M.copy(et).applyQuaternion(e).dot(this.eye)) < 0.2 && (i.scale.set(1e-10, 1e-10, 1e-10), i.visible = !1), i.name === "XZ" && Math.abs(M.copy(ve).applyQuaternion(e).dot(this.eye)) < 0.2 && (i.scale.set(1e-10, 1e-10, 1e-10), i.visible = !1)) : this.mode === "rotate" && (It.copy(e), M.copy(this.eye).applyQuaternion(v.copy(e).invert()), i.name.search("E") !== -1 && i.quaternion.setFromRotationMatrix(An.lookAt(this.eye, In, ve)), i.name === "X" && (v.setFromAxisAngle(et, Math.atan2(-M.y, M.z)), v.multiplyQuaternions(It, v), i.quaternion.copy(v)), i.name === "Y" && (v.setFromAxisAngle(ve, Math.atan2(M.x, M.z)), v.multiplyQuaternions(It, v), i.quaternion.copy(v)), i.name === "Z" && (v.setFromAxisAngle(tt, Math.atan2(M.y, M.x)), v.multiplyQuaternions(It, v), i.quaternion.copy(v))), i.visible = i.visible && (i.name.indexOf("X") === -1 || this.showX), i.visible = i.visible && (i.name.indexOf("Y") === -1 || this.showY), i.visible = i.visible && (i.name.indexOf("Z") === -1 || this.showZ), i.visible = i.visible && (i.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), i.material._color = i.material._color || i.material.color.clone(), i.material._opacity = i.material._opacity || i.material.opacity, i.material.color.copy(i.material._color), i.material.opacity = i.material._opacity, this.enabled && this.axis && (i.name === this.axis || this.axis.split("").some(function(u) {
        return i.name === u;
      })) && (i.material.color.setHex(16776960), i.material.opacity = 1);
    }
    super.updateMatrixWorld(t);
  }
}
class Bi extends p {
  constructor() {
    super(
      new xi(1e5, 1e5, 2, 2),
      new On({ visible: !1, wireframe: !0, side: vi, transparent: !0, opacity: 0.1, toneMapped: !1 })
    ), this.isTransformControlsPlane = !0, this.type = "TransformControlsPlane";
  }
  updateMatrixWorld(t) {
    let o = this.space;
    switch (this.position.copy(this.worldPosition), this.mode === "scale" && (o = "local"), At.copy(et).applyQuaternion(o === "local" ? this.worldQuaternion : Dt), $e.copy(ve).applyQuaternion(o === "local" ? this.worldQuaternion : Dt), Je.copy(tt).applyQuaternion(o === "local" ? this.worldQuaternion : Dt), M.copy($e), this.mode) {
      case "translate":
      case "scale":
        switch (this.axis) {
          case "X":
            M.copy(this.eye).cross(At), J.copy(At).cross(M);
            break;
          case "Y":
            M.copy(this.eye).cross($e), J.copy($e).cross(M);
            break;
          case "Z":
            M.copy(this.eye).cross(Je), J.copy(Je).cross(M);
            break;
          case "XY":
            J.copy(Je);
            break;
          case "YZ":
            J.copy(At);
            break;
          case "XZ":
            M.copy(Je), J.copy($e);
            break;
          case "XYZ":
          case "E":
            J.set(0, 0, 0);
            break;
        }
        break;
      case "rotate":
      default:
        J.set(0, 0, 0);
    }
    J.length() === 0 ? this.quaternion.copy(this.cameraQuaternion) : (Ln.lookAt(Y.set(0, 0, 0), J, M), this.quaternion.setFromRotationMatrix(Ln)), super.updateMatrixWorld(t);
  }
}
var W, Ae;
class Vi {
  constructor() {
    d(this, W, void 0);
    d(this, Ae, void 0);
    x(this, W, new Zi(b.camera, b.webglRenderer.domElement)), x(this, Ae, new Z([0, 0, 0], {
      passport: {
        name: "Controls.OrbitControls.Target",
        manager: {
          type: "number",
          invisible: !0
        }
      }
    }));
    let t = !0;
    s(this, Ae).subscribe((o) => {
      s(this, W).target.set(...o.current), t && s(this, W).update();
    }), s(this, W).addEventListener("change", () => {
      t = !1, s(this, Ae).current = [
        s(this, W).target.x,
        s(this, W).target.y,
        s(this, W).target.z
      ], t = !0;
    });
  }
  get controls() {
    return s(this, W);
  }
  destroy() {
    s(this, W).dispose(), s(this, Ae).close();
  }
}
W = new WeakMap(), Ae = new WeakMap();
var R, at, rt, lt, ct, ht, pt, mt, dt;
class $i {
  constructor() {
    d(this, R, null);
    d(this, at, new Z(b.camera.far, {
      passport: {
        name: "Helpers.Grid.Size",
        manager: {
          type: "number",
          step: 1
        }
      }
    }));
    d(this, rt, new Z(100, {
      passport: {
        name: "Helpers.Grid.Divisions",
        manager: {
          type: "number"
        }
      }
    }));
    d(this, lt, new Z("#0000ff", {
      passport: {
        name: "Helpers.Grid.Color 1",
        manager: {
          type: "color"
        }
      }
    }));
    d(this, ct, new Z("#808080", {
      passport: {
        name: "Helpers.Grid.Color 2",
        manager: {
          type: "color"
        }
      }
    }));
    d(this, ht, new Z(!1, {
      passport: {
        name: "Helpers.Grid.Vertical",
        manager: {
          type: "boolean"
        }
      }
    }));
    d(this, pt, new Z(!0, {
      passport: {
        name: "Helpers.Grid.Visible",
        manager: {
          type: "boolean"
        }
      }
    }));
    d(this, mt, void 0);
    d(this, dt, (t) => {
      t.key === "g" && (s(this, R).visible = !s(this, R).visible);
    });
    x(this, mt, new Ii(
      [
        s(this, at),
        s(this, rt),
        s(this, lt),
        s(this, ct),
        s(this, ht),
        s(this, pt)
      ],
      () => {
        s(this, R) && (b.view.remove(s(this, R)), s(this, R).dispose()), x(this, R, new _i(
          s(this, at).current,
          s(this, rt).current,
          s(this, lt).current,
          s(this, ct).current
        )), s(this, R).rotation.x = s(this, ht).current ? Math.PI / 2 : 0, s(this, R).visible = s(this, pt).current, b.view.add(s(this, R));
      }
    )), addEventListener("keydown", s(this, dt));
  }
  get helper() {
    return s(this, R);
  }
  destroy() {
    s(this, mt).close(), s(this, R) && (b.view.remove(s(this, R)), s(this, R).dispose()), removeEventListener("keydown", s(this, dt));
  }
}
R = new WeakMap(), at = new WeakMap(), rt = new WeakMap(), lt = new WeakMap(), ct = new WeakMap(), ht = new WeakMap(), pt = new WeakMap(), mt = new WeakMap(), dt = new WeakMap();
var j, U, fe, ye, ut, Ne, ft, yt, Kt;
class Ji {
  constructor() {
    d(this, yt);
    d(this, j, void 0);
    d(this, U, []);
    d(this, fe, null);
    d(this, ye, (t) => {
      if (t.child.name.startsWith("T.") && !s(this, U).find((o) => o.object3d === t.child)) {
        const o = new zn(t.child);
        s(this, U).push(o), b.raycaster.add(o.raycasterTarget, {
          eventDispatcher: o.raycasterTarget
        }), o.raycasterTarget.addEventListener(
          "pointerDown",
          s(this, Ne)
        ), o.object3d.addEventListener("childadded", s(this, ye));
      }
    });
    d(this, ut, (t) => {
      const o = P(this, yt, Kt).call(this, t.child);
      o && (b.raycaster.remove(o.raycasterTarget), o.destroy(), o.raycasterTarget.removeEventListener(
        "pointerDown",
        s(this, Ne)
      ), o.object3d.removeEventListener(
        "childadded",
        s(this, ye)
      ), x(this, U, s(this, U).filter((e) => e !== o)));
    });
    d(this, Ne, (t) => {
      const o = P(this, yt, Kt).call(this, t.target);
      o && (x(this, fe, s(this, U).find((e) => e.object3d === (o == null ? void 0 : o.object3d)) || null), s(this, fe) && s(this, j).attach(s(this, fe).object3d));
    });
    d(this, ft, (t) => {
      t.key === "t" ? s(this, j).setMode("translate") : t.key === "r" ? s(this, j).setMode("rotate") : t.key === "s" ? s(this, j).setMode("scale") : t.key === "Escape" ? s(this, j).detach() : t.key === "+" || t.key === "=" ? s(this, j).setSize(s(this, j).size + 0.1) : t.key === "-" || t.key === "_" ? s(this, j).setSize(s(this, j).size - 0.1) : t.key === "h" && s(this, U).forEach((o) => {
        o.helpers.forEach((e) => {
          e.visible = !e.visible;
        });
      });
    });
    x(this, j, new Fi(
      b.camera,
      b.webglRenderer.domElement
    )), s(this, j).addEventListener("objectChange", (t) => {
      s(this, fe) && s(this, fe).save();
    }), b.view.add(s(this, j)), b.scene.addEventListener("childadded", s(this, ye)), b.scene.addEventListener("childremoved", s(this, ut)), window.addEventListener("keydown", s(this, ft));
  }
  get controls() {
    return s(this, j);
  }
  destroy() {
    b.scene.removeEventListener("childadded", s(this, ye)), b.scene.removeEventListener("childremoved", s(this, ut)), window.removeEventListener("keydown", s(this, ft)), s(this, j).dispose(), s(this, U).forEach((t) => {
      t.raycasterTarget.removeEventListener(
        "pointerDown",
        s(this, Ne)
      ), t.object3d.removeEventListener(
        "childadded",
        s(this, ye)
      ), t.destroy();
    }), x(this, U, []);
  }
}
j = new WeakMap(), U = new WeakMap(), fe = new WeakMap(), ye = new WeakMap(), ut = new WeakMap(), Ne = new WeakMap(), ft = new WeakMap(), yt = new WeakSet(), Kt = function(t) {
  return s(this, U).find(
    (e) => e.object3d === t || e.raycasterTarget === t
  );
};
var Xe, Ze, Fe, Qe, bt, Bt, Yt, Nn;
class es {
  constructor() {
    d(this, bt);
    d(this, Yt);
    d(this, Xe, void 0);
    d(this, Ze, void 0);
    d(this, Fe, void 0);
    d(this, Qe, []);
    x(this, Xe, b.composer.addPass = b.composer.addPass.bind(
      b.composer
    )), b.composer.addPass = (...t) => {
      P(this, bt, Bt).call(this, t[0]), s(this, Xe).call(this, ...t);
    }, x(this, Ze, b.composer.removePass = b.composer.removePass.bind(b.composer)), b.composer.removePass = (...t) => {
      P(this, Yt, Nn).call(this, t[0]), s(this, Ze).call(this, ...t);
    }, x(this, Fe, b.composer.insertPass = b.composer.insertPass.bind(b.composer)), b.composer.insertPass = (...t) => {
      P(this, bt, Bt).call(this, t[0]), s(this, Fe).call(this, ...t);
    };
  }
  destroy() {
    b.composer.addPass = s(this, Xe), b.composer.removePass = s(this, Ze), b.composer.insertPass = s(this, Fe), s(this, Qe).forEach((t) => {
      t.destroy();
    });
  }
}
Xe = new WeakMap(), Ze = new WeakMap(), Fe = new WeakMap(), Qe = new WeakMap(), bt = new WeakSet(), Bt = function(t) {
  s(this, Qe).push(
    new be(t, {
      folderName: `EffectComposer.${t.constructor.name}`,
      skipKeys: [
        "renderToScreen",
        "needsSwap",
        "nMips",
        "oldClearAlpha",
        "clearColor",
        "resolution"
      ]
    })
  ), "uniforms" in t && s(this, Qe).push(
    new be(t.uniforms, {
      folderName: `EffectComposer.${t.constructor.name}.Uniforms`,
      optionsCatalog: {
        maxblur: {
          type: "number",
          min: 0,
          max: 1,
          step: 1e-5,
          ease: 0.1
        },
        aperture: {
          type: "number",
          min: 0,
          max: 0.01,
          step: 1e-6
        },
        focus: {
          type: "number",
          min: 0,
          step: 0.01
        }
      },
      skipKeys: ["time", "resolution"]
    })
  );
}, Yt = new WeakSet(), Nn = function(t) {
};
var wt, gt, Et, Pt, qe, Le, Ge;
class ps {
  constructor() {
    d(this, wt, void 0);
    d(this, gt, void 0);
    d(this, Et, null);
    d(this, Pt, void 0);
    d(this, qe, void 0);
    d(this, Le, void 0);
    d(this, Ge, void 0);
    x(this, wt, new be(b.webglRenderer, {
      folderName: "Renderer"
    })), x(this, gt, new be(
      b.webglRenderer.shadowMap,
      {
        folderName: "Renderer.shadowMap",
        optionsCatalog: {
          type: {
            type: "select",
            variants: [
              "BasicShadowMap",
              "PCFShadowMap",
              "PCFSoftShadowMap",
              "VSMShadowMap"
            ]
          }
        },
        afterChange: () => {
          b.webglRenderer.shadowMap.needsUpdate = !0, Ai(b.scene, (t) => {
            t.needsUpdate = !0;
          });
        }
      }
    )), b.composer && x(this, Et, new es()), x(this, Pt, new $i()), x(this, qe, new zn(b.camera)), x(this, Le, new Vi()), s(this, Le).controls.addEventListener("change", () => {
      s(this, qe).save();
    }), x(this, Ge, new Ji()), s(this, Ge).controls.addEventListener(
      "dragging-changed",
      (t) => {
        s(this, Le).controls.enabled = !t.value;
      }
    );
  }
  destroy() {
    var t;
    s(this, wt).destroy(), s(this, gt).destroy(), (t = s(this, Et)) == null || t.destroy(), s(this, Pt).destroy(), s(this, qe).destroy(), s(this, Le).destroy(), s(this, Ge).destroy();
  }
}
wt = new WeakMap(), gt = new WeakMap(), Et = new WeakMap(), Pt = new WeakMap(), qe = new WeakMap(), Le = new WeakMap(), Ge = new WeakMap();
export {
  ps as En3Helpers,
  zn as En3Object3dManager
};
