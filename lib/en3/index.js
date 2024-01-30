var hs = Object.defineProperty, ls = Object.defineProperties;
var ds = Object.getOwnPropertyDescriptors;
var ct = Object.getOwnPropertySymbols;
var us = Object.prototype.hasOwnProperty, fs = Object.prototype.propertyIsEnumerable;
var xe = (a, A, e) => A in a ? hs(a, A, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[A] = e, tA = (a, A) => {
  for (var e in A || (A = {}))
    us.call(A, e) && xe(a, e, A[e]);
  if (ct)
    for (var e of ct(A))
      fs.call(A, e) && xe(a, e, A[e]);
  return a;
}, me = (a, A) => ls(a, ds(A));
var Qt = (a, A, e) => (xe(a, typeof A != "symbol" ? A + "" : A, e), e), ke = (a, A, e) => {
  if (!A.has(a))
    throw TypeError("Cannot " + e);
};
var g = (a, A, e) => (ke(a, A, "read from private field"), e ? e.call(a) : A.get(a)), u = (a, A, e) => {
  if (A.has(a))
    throw TypeError("Cannot add the same private member more than once");
  A instanceof WeakSet ? A.add(a) : A.set(a, e);
}, G = (a, A, e, s) => (ke(a, A, "write to private field"), s ? s.call(a, e) : A.set(a, e), e);
var QA = (a, A, e) => (ke(a, A, "access private method"), e);
var Me = (a, A, e) => new Promise((s, t) => {
  var i = (B) => {
    try {
      o(e.next(B));
    } catch (C) {
      t(C);
    }
  }, n = (B) => {
    try {
      o(e.throw(B));
    } catch (C) {
      t(C);
    }
  }, o = (B) => B.done ? s(B.value) : Promise.resolve(B.value).then(i, n);
  o((e = e.apply(a, A)).next());
});
import { Ladder as ht } from "../ladder/index.js";
import { LayoutBox as Kt } from "../layout-box/index.js";
import { RESIZE_ORDER as bt, TICK_ORDER as Bt } from "../order/index.js";
import { resizer as kA } from "../resizer/index.js";
import { ticker as KA } from "../ticker/index.js";
import { Mesh as Fe, REVISION as Ds, OrthographicCamera as ze, PerspectiveCamera as $e, Scene as Fs, WebGLRenderer as Gs, TrianglesDrawMode as Rs, TriangleFanDrawMode as At, TriangleStripDrawMode as Ot, Loader as rt, LoaderUtils as WA, FileLoader as FA, Color as EA, LinearSRGBColorSpace as O, SpotLight as ps, PointLight as ms, DirectionalLight as Ms, MeshBasicMaterial as qA, SRGBColorSpace as $, MeshPhysicalMaterial as AA, Vector2 as Ct, Matrix4 as bA, Vector3 as K, Quaternion as at, InstancedMesh as ws, InstancedBufferAttribute as Ss, Object3D as It, TextureLoader as _t, ImageBitmapLoader as Ls, BufferAttribute as VA, InterleavedBuffer as ys, InterleavedBufferAttribute as Js, LinearFilter as He, LinearMipmapLinearFilter as gt, RepeatWrapping as et, PointsMaterial as Hs, Material as Ke, LineBasicMaterial as Ts, MeshStandardMaterial as Pt, DoubleSide as Us, PropertyBinding as Ns, BufferGeometry as Yt, SkinnedMesh as xs, LineSegments as ks, Line as Ks, LineLoop as bs, Points as Os, Group as jA, MathUtils as _s, Skeleton as Ps, AnimationClip as Ys, Bone as qs, InterpolateLinear as qt, ColorManagement as lt, NearestFilter as Xs, NearestMipmapNearestFilter as vs, LinearMipmapNearestFilter as Ws, NearestMipmapLinearFilter as Vs, ClampToEdgeWrapping as js, MirroredRepeatWrapping as Zs, InterpolateDiscrete as zs, FrontSide as $s, Texture as dt, VectorKeyframeTrack as ut, NumberKeyframeTrack as ft, QuaternionKeyframeTrack as Dt, Box3 as Ai, Sphere as ei, Interpolant as ti, CompressedCubeTexture as si, UnsignedByteType as b, CompressedArrayTexture as ii, CompressedTexture as Xt, RGBAFormat as RA, RGBA_ASTC_4x4_Format as ni, RGBA_BPTC_Format as oi, RGBA_ETC2_EAC_Format as Bi, RGBA_PVRTC_4BPPV1_Format as ri, RGBA_S3TC_DXT5_Format as Ci, RGB_ETC1_Format as ai, RGB_ETC2_Format as Ii, RGB_PVRTC_4BPPV1_Format as gi, RGB_S3TC_DXT1_Format as Ei, FloatType as ye, HalfFloatType as Je, DataTexture as ci, Data3DTexture as Qi, DisplayP3ColorSpace as hi, LinearDisplayP3ColorSpace as li, NoColorSpace as Ft, RGFormat as XA, RedFormat as vA, RGBA_ASTC_6x6_Format as Gt, Plane as we, PlaneHelper as Se, PlaneGeometry as di, VideoTexture as ui, Raycaster as fi } from "three";
import { intersector as Rt } from "../intersector/index.js";
import { g as Di } from "../dom-bHEwc_xV.js";
import { loading as be } from "../loading/index.js";
import { S as Fi } from "../SourceManager-vXInLlh_.js";
import { S as pt } from "../Store-qq7IjRLE.js";
import "../browser-S4eq8AeN.js";
import "../css-unit-parser/index.js";
import "../scroll-entries/index.js";
import "../layout-5SJlcXTY.js";
import "../notifier/index.js";
import "../function-zwSFehNd.js";
function vt(a) {
  const A = (e) => {
    e.dispose();
    for (const s of Object.keys(e)) {
      const t = e[s];
      t && typeof t == "object" && "minFilter" in t && t.dispose();
    }
  };
  a.traverse((e) => {
    if (e instanceof Fe) {
      if (e.geometry.dispose(), !Array.isArray(e.material) && e.material.isMaterial)
        A(e.material);
      else if (Array.isArray(e.material))
        for (const s of e.material)
          A(s);
    }
  });
}
var Te, nA, N, Y, mA, oA, k, MA, wA, Z, q, SA, ZA, zA, dA, Ue, Wt, $A, tt, Ae, ee;
class Gi {
  constructor() {
    u(this, Ue);
    u(this, $A);
    u(this, Te, `https://unpkg.com/three@0.${Ds}.x`);
    u(this, nA, null);
    u(this, N, null);
    u(this, Y, null);
    u(this, mA, null);
    u(this, oA, []);
    u(this, k, new ht({
      x: 0,
      y: 0,
      z: 0
    }));
    u(this, MA, new ht({
      x: 0,
      y: 0,
      z: 0
    }));
    u(this, wA, "auto");
    u(this, Z, 0);
    u(this, q, 0);
    u(this, SA, 0);
    u(this, ZA, 2);
    u(this, zA, !0);
    u(this, dA, !1);
    u(this, Ae, () => {
      var A;
      G(this, Z, g(this, nA).clientWidth), G(this, q, g(this, nA).clientHeight), G(this, SA, Math.min(g(this, ZA), devicePixelRatio || 1)), g(this, N).setPixelRatio(g(this, SA)), g(this, N).setSize(g(this, Z), g(this, q)), QA(this, $A, tt).call(this), (A = this.onResize) == null || A.call(this);
    });
    u(this, ee, () => {
      QA(this, Ue, Wt).call(this), this.render(g(this, mA), g(this, Y));
    });
  }
  get CDNVersion() {
    return g(this, Te);
  }
  get containerElement() {
    return g(this, nA);
  }
  get webglRenderer() {
    return g(this, N);
  }
  get camera() {
    return g(this, Y);
  }
  get scene() {
    return g(this, mA);
  }
  get attachedObjects() {
    return g(this, oA);
  }
  get cameraPosition() {
    return g(this, k);
  }
  get cameraRotation() {
    return g(this, MA);
  }
  get width() {
    return g(this, Z);
  }
  get height() {
    return g(this, q);
  }
  get pixelRatio() {
    return g(this, SA);
  }
  get cameraDistance() {
    return g(this, k).getStepValue("_initial").z;
  }
  set cameraDistance(A) {
    g(this, k).setStep("_initial", "+", {
      z: A
    }), g(this, k).calculate(), QA(this, $A, tt).call(this);
  }
  attachToHTMLElement(A, e, s) {
    const t = new Kt(A, me(tA({}, s), {
      containerElement: this.containerElement,
      cartesian: !0
    }));
    return t.bindObject(e), e.userData.box = t, g(this, oA).push(e), e;
  }
  detachFromHTMLElement(A) {
    G(this, oA, g(this, oA).filter((e) => e === A ? (A.userData.box.destroy(), !1) : !0));
  }
  add(A, e, s) {
    if (this.scene.add(A), e)
      return this.attachToHTMLElement(e, A, s);
  }
  remove(A, e) {
    this.scene.remove(A), e && this.detachFromHTMLElement(A);
  }
  setup(A) {
    if (g(this, dA)) {
      console.warn("[en3.setup]: You are trying to setup en3 again.");
      return;
    }
    G(this, nA, (A == null ? void 0 : A.containerElement) || document.body), G(this, Y, (A == null ? void 0 : A.cameraType) === "orthographic" ? new ze() : new $e()), g(this, k).bind(g(this, Y).position), g(this, MA).bind(g(this, Y).rotation), g(this, k).setStep("_initial", "+", {
      z: (A == null ? void 0 : A.cameraDistance) || 1e3
    }), g(this, k).calculate(), g(this, Y).near = (A == null ? void 0 : A.cameraNear) || 1, g(this, Y).far = (A == null ? void 0 : A.cameraFar) || 11e3, G(this, wA, (A == null ? void 0 : A.cameraFov) || "auto"), G(this, mA, new Fs()), G(this, ZA, (A == null ? void 0 : A.maxPixelRatio) || 2), G(this, zA, (A == null ? void 0 : A.cameraAutoUpdate) !== !1), G(this, N, new Gs(A == null ? void 0 : A.webGLRendererParameters)), g(this, N).domElement.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    `, g(this, nA).prepend(g(this, N).domElement), G(this, dA, !0), kA.subscribe(g(this, Ae), bt.EN3), KA.subscribe(g(this, ee), { order: Bt.EN3 });
  }
  destroy() {
    if (!g(this, dA)) {
      console.warn("[en3.setup]: You are trying to destory en3 but it has not been initialized.");
      return;
    }
    g(this, oA).forEach((A) => {
      A.userData.box.destroy();
    }), kA.unsubscribe(g(this, Ae)), KA.unsubscribe(g(this, ee)), this.scene.clear(), vt(this.scene), g(this, N).dispose(), g(this, N).domElement.remove(), G(this, N, null), G(this, dA, !1);
  }
  render(A, e) {
    g(this, N).render(A, e);
  }
}
Te = new WeakMap(), nA = new WeakMap(), N = new WeakMap(), Y = new WeakMap(), mA = new WeakMap(), oA = new WeakMap(), k = new WeakMap(), MA = new WeakMap(), wA = new WeakMap(), Z = new WeakMap(), q = new WeakMap(), SA = new WeakMap(), ZA = new WeakMap(), zA = new WeakMap(), dA = new WeakMap(), Ue = new WeakSet(), Wt = function() {
  g(this, zA) && (g(this, k).calculate(), g(this, MA).calculate());
}, $A = new WeakSet(), tt = function() {
  this.camera instanceof $e ? (this.camera.aspect = g(this, Z) / g(this, q), this.camera.fov = g(this, wA) === "auto" ? 2 * Math.atan(g(this, q) / 2 / g(this, k).getStepValue("_initial").z) * (180 / Math.PI) : g(this, wA)) : this.camera instanceof ze && (this.camera.left = g(this, Z) / -2, this.camera.right = g(this, Z) / 2, this.camera.top = g(this, q) / 2, this.camera.bottom = g(this, q) / -2), this.camera.updateProjectionMatrix();
}, Ae = new WeakMap(), ee = new WeakMap();
const w = new Gi();
class Ri {
  add(A, e) {
    const s = (i) => {
      i.isIntersecting && (A.sourceManager.lazyLoad(), Rt.unsubscribe(s));
    }, t = Di(e);
    if (t)
      return Rt.subscribe(t, s);
  }
}
const Vn = new Ri();
function mt(a, A) {
  if (A === Rs)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), a;
  if (A === At || A === Ot) {
    let e = a.getIndex();
    if (e === null) {
      const n = [], o = a.getAttribute("position");
      if (o !== void 0) {
        for (let B = 0; B < o.count; B++)
          n.push(B);
        a.setIndex(n), e = a.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), a;
    }
    const s = e.count - 2, t = [];
    if (A === At)
      for (let n = 1; n <= s; n++)
        t.push(e.getX(0)), t.push(e.getX(n)), t.push(e.getX(n + 1));
    else
      for (let n = 0; n < s; n++)
        n % 2 === 0 ? (t.push(e.getX(n)), t.push(e.getX(n + 1)), t.push(e.getX(n + 2))) : (t.push(e.getX(n + 2)), t.push(e.getX(n + 1)), t.push(e.getX(n)));
    t.length / 3 !== s && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const i = a.clone();
    return i.setIndex(t), i.clearGroups(), i;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", A), a;
}
class pi extends rt {
  constructor(A) {
    super(A), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(e) {
      return new Li(e);
    }), this.register(function(e) {
      return new Ki(e);
    }), this.register(function(e) {
      return new bi(e);
    }), this.register(function(e) {
      return new Oi(e);
    }), this.register(function(e) {
      return new Ji(e);
    }), this.register(function(e) {
      return new Hi(e);
    }), this.register(function(e) {
      return new Ti(e);
    }), this.register(function(e) {
      return new Ui(e);
    }), this.register(function(e) {
      return new Si(e);
    }), this.register(function(e) {
      return new Ni(e);
    }), this.register(function(e) {
      return new yi(e);
    }), this.register(function(e) {
      return new ki(e);
    }), this.register(function(e) {
      return new xi(e);
    }), this.register(function(e) {
      return new Mi(e);
    }), this.register(function(e) {
      return new _i(e);
    }), this.register(function(e) {
      return new Pi(e);
    });
  }
  load(A, e, s, t) {
    const i = this;
    let n;
    if (this.resourcePath !== "")
      n = this.resourcePath;
    else if (this.path !== "") {
      const C = WA.extractUrlBase(A);
      n = WA.resolveURL(C, this.path);
    } else
      n = WA.extractUrlBase(A);
    this.manager.itemStart(A);
    const o = function(C) {
      t ? t(C) : console.error(C), i.manager.itemError(A), i.manager.itemEnd(A);
    }, B = new FA(this.manager);
    B.setPath(this.path), B.setResponseType("arraybuffer"), B.setRequestHeader(this.requestHeader), B.setWithCredentials(this.withCredentials), B.load(A, function(C) {
      try {
        i.parse(C, n, function(I) {
          e(I), i.manager.itemEnd(A);
        }, o);
      } catch (I) {
        o(I);
      }
    }, s, o);
  }
  setDRACOLoader(A) {
    return this.dracoLoader = A, this;
  }
  setDDSLoader() {
    throw new Error(
      'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".'
    );
  }
  setKTX2Loader(A) {
    return this.ktx2Loader = A, this;
  }
  setMeshoptDecoder(A) {
    return this.meshoptDecoder = A, this;
  }
  register(A) {
    return this.pluginCallbacks.indexOf(A) === -1 && this.pluginCallbacks.push(A), this;
  }
  unregister(A) {
    return this.pluginCallbacks.indexOf(A) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(A), 1), this;
  }
  parse(A, e, s, t) {
    let i;
    const n = {}, o = {}, B = new TextDecoder();
    if (typeof A == "string")
      i = JSON.parse(A);
    else if (A instanceof ArrayBuffer)
      if (B.decode(new Uint8Array(A, 0, 4)) === Vt) {
        try {
          n[R.KHR_BINARY_GLTF] = new Yi(A);
        } catch (r) {
          t && t(r);
          return;
        }
        i = JSON.parse(n[R.KHR_BINARY_GLTF].content);
      } else
        i = JSON.parse(B.decode(A));
    else
      i = A;
    if (i.asset === void 0 || i.asset.version[0] < 2) {
      t && t(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const C = new sn(i, {
      path: e || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    C.fileLoader.setRequestHeader(this.requestHeader);
    for (let I = 0; I < this.pluginCallbacks.length; I++) {
      const r = this.pluginCallbacks[I](C);
      r.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), o[r.name] = r, n[r.name] = !0;
    }
    if (i.extensionsUsed)
      for (let I = 0; I < i.extensionsUsed.length; ++I) {
        const r = i.extensionsUsed[I], c = i.extensionsRequired || [];
        switch (r) {
          case R.KHR_MATERIALS_UNLIT:
            n[r] = new wi();
            break;
          case R.KHR_DRACO_MESH_COMPRESSION:
            n[r] = new qi(i, this.dracoLoader);
            break;
          case R.KHR_TEXTURE_TRANSFORM:
            n[r] = new Xi();
            break;
          case R.KHR_MESH_QUANTIZATION:
            n[r] = new vi();
            break;
          default:
            c.indexOf(r) >= 0 && o[r] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + r + '".');
        }
      }
    C.setExtensions(n), C.setPlugins(o), C.parse(s, t);
  }
  parseAsync(A, e) {
    const s = this;
    return new Promise(function(t, i) {
      s.parse(A, e, t, i);
    });
  }
}
function mi() {
  let a = {};
  return {
    get: function(A) {
      return a[A];
    },
    add: function(A, e) {
      a[A] = e;
    },
    remove: function(A) {
      delete a[A];
    },
    removeAll: function() {
      a = {};
    }
  };
}
const R = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class Mi {
  constructor(A) {
    this.parser = A, this.name = R.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const A = this.parser, e = this.parser.json.nodes || [];
    for (let s = 0, t = e.length; s < t; s++) {
      const i = e[s];
      i.extensions && i.extensions[this.name] && i.extensions[this.name].light !== void 0 && A._addNodeRef(this.cache, i.extensions[this.name].light);
    }
  }
  _loadLight(A) {
    const e = this.parser, s = "light:" + A;
    let t = e.cache.get(s);
    if (t)
      return t;
    const i = e.json, B = ((i.extensions && i.extensions[this.name] || {}).lights || [])[A];
    let C;
    const I = new EA(16777215);
    B.color !== void 0 && I.setRGB(B.color[0], B.color[1], B.color[2], O);
    const r = B.range !== void 0 ? B.range : 0;
    switch (B.type) {
      case "directional":
        C = new Ms(I), C.target.position.set(0, 0, -1), C.add(C.target);
        break;
      case "point":
        C = new ms(I), C.distance = r;
        break;
      case "spot":
        C = new ps(I), C.distance = r, B.spot = B.spot || {}, B.spot.innerConeAngle = B.spot.innerConeAngle !== void 0 ? B.spot.innerConeAngle : 0, B.spot.outerConeAngle = B.spot.outerConeAngle !== void 0 ? B.spot.outerConeAngle : Math.PI / 4, C.angle = B.spot.outerConeAngle, C.penumbra = 1 - B.spot.innerConeAngle / B.spot.outerConeAngle, C.target.position.set(0, 0, -1), C.add(C.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + B.type);
    }
    return C.position.set(0, 0, 0), C.decay = 2, iA(C, B), B.intensity !== void 0 && (C.intensity = B.intensity), C.name = e.createUniqueName(B.name || "light_" + A), t = Promise.resolve(C), e.cache.add(s, t), t;
  }
  getDependency(A, e) {
    if (A === "light")
      return this._loadLight(e);
  }
  createNodeAttachment(A) {
    const e = this, s = this.parser, i = s.json.nodes[A], o = (i.extensions && i.extensions[this.name] || {}).light;
    return o === void 0 ? null : this._loadLight(o).then(function(B) {
      return s._getNodeRef(e.cache, o, B);
    });
  }
}
class wi {
  constructor() {
    this.name = R.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return qA;
  }
  extendParams(A, e, s) {
    const t = [];
    A.color = new EA(1, 1, 1), A.opacity = 1;
    const i = e.pbrMetallicRoughness;
    if (i) {
      if (Array.isArray(i.baseColorFactor)) {
        const n = i.baseColorFactor;
        A.color.setRGB(n[0], n[1], n[2], O), A.opacity = n[3];
      }
      i.baseColorTexture !== void 0 && t.push(s.assignTexture(A, "map", i.baseColorTexture, $));
    }
    return Promise.all(t);
  }
}
class Si {
  constructor(A) {
    this.parser = A, this.name = R.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(A, e) {
    const t = this.parser.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const i = t.extensions[this.name].emissiveStrength;
    return i !== void 0 && (e.emissiveIntensity = i), Promise.resolve();
  }
}
class Li {
  constructor(A) {
    this.parser = A, this.name = R.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(A) {
    const s = this.parser.json.materials[A];
    return !s.extensions || !s.extensions[this.name] ? null : AA;
  }
  extendMaterialParams(A, e) {
    const s = this.parser, t = s.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const i = [], n = t.extensions[this.name];
    if (n.clearcoatFactor !== void 0 && (e.clearcoat = n.clearcoatFactor), n.clearcoatTexture !== void 0 && i.push(s.assignTexture(e, "clearcoatMap", n.clearcoatTexture)), n.clearcoatRoughnessFactor !== void 0 && (e.clearcoatRoughness = n.clearcoatRoughnessFactor), n.clearcoatRoughnessTexture !== void 0 && i.push(s.assignTexture(e, "clearcoatRoughnessMap", n.clearcoatRoughnessTexture)), n.clearcoatNormalTexture !== void 0 && (i.push(s.assignTexture(e, "clearcoatNormalMap", n.clearcoatNormalTexture)), n.clearcoatNormalTexture.scale !== void 0)) {
      const o = n.clearcoatNormalTexture.scale;
      e.clearcoatNormalScale = new Ct(o, o);
    }
    return Promise.all(i);
  }
}
class yi {
  constructor(A) {
    this.parser = A, this.name = R.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(A) {
    const s = this.parser.json.materials[A];
    return !s.extensions || !s.extensions[this.name] ? null : AA;
  }
  extendMaterialParams(A, e) {
    const s = this.parser, t = s.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const i = [], n = t.extensions[this.name];
    return n.iridescenceFactor !== void 0 && (e.iridescence = n.iridescenceFactor), n.iridescenceTexture !== void 0 && i.push(s.assignTexture(e, "iridescenceMap", n.iridescenceTexture)), n.iridescenceIor !== void 0 && (e.iridescenceIOR = n.iridescenceIor), e.iridescenceThicknessRange === void 0 && (e.iridescenceThicknessRange = [100, 400]), n.iridescenceThicknessMinimum !== void 0 && (e.iridescenceThicknessRange[0] = n.iridescenceThicknessMinimum), n.iridescenceThicknessMaximum !== void 0 && (e.iridescenceThicknessRange[1] = n.iridescenceThicknessMaximum), n.iridescenceThicknessTexture !== void 0 && i.push(s.assignTexture(e, "iridescenceThicknessMap", n.iridescenceThicknessTexture)), Promise.all(i);
  }
}
class Ji {
  constructor(A) {
    this.parser = A, this.name = R.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(A) {
    const s = this.parser.json.materials[A];
    return !s.extensions || !s.extensions[this.name] ? null : AA;
  }
  extendMaterialParams(A, e) {
    const s = this.parser, t = s.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const i = [];
    e.sheenColor = new EA(0, 0, 0), e.sheenRoughness = 0, e.sheen = 1;
    const n = t.extensions[this.name];
    if (n.sheenColorFactor !== void 0) {
      const o = n.sheenColorFactor;
      e.sheenColor.setRGB(o[0], o[1], o[2], O);
    }
    return n.sheenRoughnessFactor !== void 0 && (e.sheenRoughness = n.sheenRoughnessFactor), n.sheenColorTexture !== void 0 && i.push(s.assignTexture(e, "sheenColorMap", n.sheenColorTexture, $)), n.sheenRoughnessTexture !== void 0 && i.push(s.assignTexture(e, "sheenRoughnessMap", n.sheenRoughnessTexture)), Promise.all(i);
  }
}
class Hi {
  constructor(A) {
    this.parser = A, this.name = R.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(A) {
    const s = this.parser.json.materials[A];
    return !s.extensions || !s.extensions[this.name] ? null : AA;
  }
  extendMaterialParams(A, e) {
    const s = this.parser, t = s.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const i = [], n = t.extensions[this.name];
    return n.transmissionFactor !== void 0 && (e.transmission = n.transmissionFactor), n.transmissionTexture !== void 0 && i.push(s.assignTexture(e, "transmissionMap", n.transmissionTexture)), Promise.all(i);
  }
}
class Ti {
  constructor(A) {
    this.parser = A, this.name = R.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(A) {
    const s = this.parser.json.materials[A];
    return !s.extensions || !s.extensions[this.name] ? null : AA;
  }
  extendMaterialParams(A, e) {
    const s = this.parser, t = s.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const i = [], n = t.extensions[this.name];
    e.thickness = n.thicknessFactor !== void 0 ? n.thicknessFactor : 0, n.thicknessTexture !== void 0 && i.push(s.assignTexture(e, "thicknessMap", n.thicknessTexture)), e.attenuationDistance = n.attenuationDistance || 1 / 0;
    const o = n.attenuationColor || [1, 1, 1];
    return e.attenuationColor = new EA().setRGB(o[0], o[1], o[2], O), Promise.all(i);
  }
}
class Ui {
  constructor(A) {
    this.parser = A, this.name = R.KHR_MATERIALS_IOR;
  }
  getMaterialType(A) {
    const s = this.parser.json.materials[A];
    return !s.extensions || !s.extensions[this.name] ? null : AA;
  }
  extendMaterialParams(A, e) {
    const t = this.parser.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const i = t.extensions[this.name];
    return e.ior = i.ior !== void 0 ? i.ior : 1.5, Promise.resolve();
  }
}
class Ni {
  constructor(A) {
    this.parser = A, this.name = R.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(A) {
    const s = this.parser.json.materials[A];
    return !s.extensions || !s.extensions[this.name] ? null : AA;
  }
  extendMaterialParams(A, e) {
    const s = this.parser, t = s.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const i = [], n = t.extensions[this.name];
    e.specularIntensity = n.specularFactor !== void 0 ? n.specularFactor : 1, n.specularTexture !== void 0 && i.push(s.assignTexture(e, "specularIntensityMap", n.specularTexture));
    const o = n.specularColorFactor || [1, 1, 1];
    return e.specularColor = new EA().setRGB(o[0], o[1], o[2], O), n.specularColorTexture !== void 0 && i.push(s.assignTexture(e, "specularColorMap", n.specularColorTexture, $)), Promise.all(i);
  }
}
class xi {
  constructor(A) {
    this.parser = A, this.name = R.EXT_MATERIALS_BUMP;
  }
  getMaterialType(A) {
    const s = this.parser.json.materials[A];
    return !s.extensions || !s.extensions[this.name] ? null : AA;
  }
  extendMaterialParams(A, e) {
    const s = this.parser, t = s.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const i = [], n = t.extensions[this.name];
    return e.bumpScale = n.bumpFactor !== void 0 ? n.bumpFactor : 1, n.bumpTexture !== void 0 && i.push(s.assignTexture(e, "bumpMap", n.bumpTexture)), Promise.all(i);
  }
}
class ki {
  constructor(A) {
    this.parser = A, this.name = R.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(A) {
    const s = this.parser.json.materials[A];
    return !s.extensions || !s.extensions[this.name] ? null : AA;
  }
  extendMaterialParams(A, e) {
    const s = this.parser, t = s.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const i = [], n = t.extensions[this.name];
    return n.anisotropyStrength !== void 0 && (e.anisotropy = n.anisotropyStrength), n.anisotropyRotation !== void 0 && (e.anisotropyRotation = n.anisotropyRotation), n.anisotropyTexture !== void 0 && i.push(s.assignTexture(e, "anisotropyMap", n.anisotropyTexture)), Promise.all(i);
  }
}
class Ki {
  constructor(A) {
    this.parser = A, this.name = R.KHR_TEXTURE_BASISU;
  }
  loadTexture(A) {
    const e = this.parser, s = e.json, t = s.textures[A];
    if (!t.extensions || !t.extensions[this.name])
      return null;
    const i = t.extensions[this.name], n = e.options.ktx2Loader;
    if (!n) {
      if (s.extensionsRequired && s.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return e.loadTextureImage(A, i.source, n);
  }
}
class bi {
  constructor(A) {
    this.parser = A, this.name = R.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(A) {
    const e = this.name, s = this.parser, t = s.json, i = t.textures[A];
    if (!i.extensions || !i.extensions[e])
      return null;
    const n = i.extensions[e], o = t.images[n.source];
    let B = s.textureLoader;
    if (o.uri) {
      const C = s.options.manager.getHandler(o.uri);
      C !== null && (B = C);
    }
    return this.detectSupport().then(function(C) {
      if (C)
        return s.loadTextureImage(A, n.source, B);
      if (t.extensionsRequired && t.extensionsRequired.indexOf(e) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return s.loadTexture(A);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(A) {
      const e = new Image();
      e.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", e.onload = e.onerror = function() {
        A(e.height === 1);
      };
    })), this.isSupported;
  }
}
class Oi {
  constructor(A) {
    this.parser = A, this.name = R.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(A) {
    const e = this.name, s = this.parser, t = s.json, i = t.textures[A];
    if (!i.extensions || !i.extensions[e])
      return null;
    const n = i.extensions[e], o = t.images[n.source];
    let B = s.textureLoader;
    if (o.uri) {
      const C = s.options.manager.getHandler(o.uri);
      C !== null && (B = C);
    }
    return this.detectSupport().then(function(C) {
      if (C)
        return s.loadTextureImage(A, n.source, B);
      if (t.extensionsRequired && t.extensionsRequired.indexOf(e) >= 0)
        throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
      return s.loadTexture(A);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(A) {
      const e = new Image();
      e.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", e.onload = e.onerror = function() {
        A(e.height === 1);
      };
    })), this.isSupported;
  }
}
class _i {
  constructor(A) {
    this.name = R.EXT_MESHOPT_COMPRESSION, this.parser = A;
  }
  loadBufferView(A) {
    const e = this.parser.json, s = e.bufferViews[A];
    if (s.extensions && s.extensions[this.name]) {
      const t = s.extensions[this.name], i = this.parser.getDependency("buffer", t.buffer), n = this.parser.options.meshoptDecoder;
      if (!n || !n.supported) {
        if (e.extensionsRequired && e.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return i.then(function(o) {
        const B = t.byteOffset || 0, C = t.byteLength || 0, I = t.count, r = t.byteStride, c = new Uint8Array(o, B, C);
        return n.decodeGltfBufferAsync ? n.decodeGltfBufferAsync(I, r, c, t.mode, t.filter).then(function(Q) {
          return Q.buffer;
        }) : n.ready.then(function() {
          const Q = new ArrayBuffer(I * r);
          return n.decodeGltfBuffer(new Uint8Array(Q), I, r, c, t.mode, t.filter), Q;
        });
      });
    } else
      return null;
  }
}
class Pi {
  constructor(A) {
    this.name = R.EXT_MESH_GPU_INSTANCING, this.parser = A;
  }
  createNodeMesh(A) {
    const e = this.parser.json, s = e.nodes[A];
    if (!s.extensions || !s.extensions[this.name] || s.mesh === void 0)
      return null;
    const t = e.meshes[s.mesh];
    for (const C of t.primitives)
      if (C.mode !== x.TRIANGLES && C.mode !== x.TRIANGLE_STRIP && C.mode !== x.TRIANGLE_FAN && C.mode !== void 0)
        return null;
    const n = s.extensions[this.name].attributes, o = [], B = {};
    for (const C in n)
      o.push(this.parser.getDependency("accessor", n[C]).then((I) => (B[C] = I, B[C])));
    return o.length < 1 ? null : (o.push(this.parser.createNodeMesh(A)), Promise.all(o).then((C) => {
      const I = C.pop(), r = I.isGroup ? I.children : [I], c = C[0].count, Q = [];
      for (const l of r) {
        const h = new bA(), E = new K(), d = new at(), f = new K(1, 1, 1), D = new ws(l.geometry, l.material, c);
        for (let F = 0; F < c; F++)
          B.TRANSLATION && E.fromBufferAttribute(B.TRANSLATION, F), B.ROTATION && d.fromBufferAttribute(B.ROTATION, F), B.SCALE && f.fromBufferAttribute(B.SCALE, F), D.setMatrixAt(F, h.compose(E, d, f));
        for (const F in B)
          if (F === "_COLOR_0") {
            const p = B[F];
            D.instanceColor = new Ss(p.array, p.itemSize, p.normalized);
          } else
            F !== "TRANSLATION" && F !== "ROTATION" && F !== "SCALE" && l.geometry.setAttribute(F, B[F]);
        It.prototype.copy.call(D, l), this.parser.assignFinalMaterial(D), Q.push(D);
      }
      return I.isGroup ? (I.clear(), I.add(...Q), I) : Q[0];
    }));
  }
}
const Vt = "glTF", PA = 12, Mt = { JSON: 1313821514, BIN: 5130562 };
class Yi {
  constructor(A) {
    this.name = R.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const e = new DataView(A, 0, PA), s = new TextDecoder();
    if (this.header = {
      magic: s.decode(new Uint8Array(A.slice(0, 4))),
      version: e.getUint32(4, !0),
      length: e.getUint32(8, !0)
    }, this.header.magic !== Vt)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const t = this.header.length - PA, i = new DataView(A, PA);
    let n = 0;
    for (; n < t; ) {
      const o = i.getUint32(n, !0);
      n += 4;
      const B = i.getUint32(n, !0);
      if (n += 4, B === Mt.JSON) {
        const C = new Uint8Array(A, PA + n, o);
        this.content = s.decode(C);
      } else if (B === Mt.BIN) {
        const C = PA + n;
        this.body = A.slice(C, C + o);
      }
      n += o;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class qi {
  constructor(A, e) {
    if (!e)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = R.KHR_DRACO_MESH_COMPRESSION, this.json = A, this.dracoLoader = e, this.dracoLoader.preload();
  }
  decodePrimitive(A, e) {
    const s = this.json, t = this.dracoLoader, i = A.extensions[this.name].bufferView, n = A.extensions[this.name].attributes, o = {}, B = {}, C = {};
    for (const I in n) {
      const r = st[I] || I.toLowerCase();
      o[r] = n[I];
    }
    for (const I in A.attributes) {
      const r = st[I] || I.toLowerCase();
      if (n[I] !== void 0) {
        const c = s.accessors[A.attributes[I]], Q = pA[c.componentType];
        C[r] = Q.name, B[r] = c.normalized === !0;
      }
    }
    return e.getDependency("bufferView", i).then(function(I) {
      return new Promise(function(r, c) {
        t.decodeDracoFile(I, function(Q) {
          for (const l in Q.attributes) {
            const h = Q.attributes[l], E = B[l];
            E !== void 0 && (h.normalized = E);
          }
          r(Q);
        }, o, C, O, c);
      });
    });
  }
}
class Xi {
  constructor() {
    this.name = R.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(A, e) {
    return (e.texCoord === void 0 || e.texCoord === A.channel) && e.offset === void 0 && e.rotation === void 0 && e.scale === void 0 || (A = A.clone(), e.texCoord !== void 0 && (A.channel = e.texCoord), e.offset !== void 0 && A.offset.fromArray(e.offset), e.rotation !== void 0 && (A.rotation = e.rotation), e.scale !== void 0 && A.repeat.fromArray(e.scale), A.needsUpdate = !0), A;
  }
}
class vi {
  constructor() {
    this.name = R.KHR_MESH_QUANTIZATION;
  }
}
class jt extends ti {
  constructor(A, e, s, t) {
    super(A, e, s, t);
  }
  copySampleValue_(A) {
    const e = this.resultBuffer, s = this.sampleValues, t = this.valueSize, i = A * t * 3 + t;
    for (let n = 0; n !== t; n++)
      e[n] = s[i + n];
    return e;
  }
  interpolate_(A, e, s, t) {
    const i = this.resultBuffer, n = this.sampleValues, o = this.valueSize, B = o * 2, C = o * 3, I = t - e, r = (s - e) / I, c = r * r, Q = c * r, l = A * C, h = l - C, E = -2 * Q + 3 * c, d = Q - c, f = 1 - E, D = d - c + r;
    for (let F = 0; F !== o; F++) {
      const p = n[h + F + o], m = n[h + F + B] * I, M = n[l + F + o], _ = n[l + F] * I;
      i[F] = f * p + D * m + E * M + d * _;
    }
    return i;
  }
}
const Wi = new at();
class Vi extends jt {
  interpolate_(A, e, s, t) {
    const i = super.interpolate_(A, e, s, t);
    return Wi.fromArray(i).normalize().toArray(i), i;
  }
}
const x = {
  FLOAT: 5126,
  //FLOAT_MAT2: 35674,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
}, pA = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, wt = {
  9728: Xs,
  9729: He,
  9984: vs,
  9985: Ws,
  9986: Vs,
  9987: gt
}, St = {
  33071: js,
  33648: Zs,
  10497: et
}, Oe = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, st = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv1",
  TEXCOORD_2: "uv2",
  TEXCOORD_3: "uv3",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
}, sA = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, ji = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: qt,
  STEP: zs
}, _e = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Zi(a) {
  return a.DefaultMaterial === void 0 && (a.DefaultMaterial = new Pt({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: $s
  })), a.DefaultMaterial;
}
function hA(a, A, e) {
  for (const s in e.extensions)
    a[s] === void 0 && (A.userData.gltfExtensions = A.userData.gltfExtensions || {}, A.userData.gltfExtensions[s] = e.extensions[s]);
}
function iA(a, A) {
  A.extras !== void 0 && (typeof A.extras == "object" ? Object.assign(a.userData, A.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + A.extras));
}
function zi(a, A, e) {
  let s = !1, t = !1, i = !1;
  for (let C = 0, I = A.length; C < I; C++) {
    const r = A[C];
    if (r.POSITION !== void 0 && (s = !0), r.NORMAL !== void 0 && (t = !0), r.COLOR_0 !== void 0 && (i = !0), s && t && i)
      break;
  }
  if (!s && !t && !i)
    return Promise.resolve(a);
  const n = [], o = [], B = [];
  for (let C = 0, I = A.length; C < I; C++) {
    const r = A[C];
    if (s) {
      const c = r.POSITION !== void 0 ? e.getDependency("accessor", r.POSITION) : a.attributes.position;
      n.push(c);
    }
    if (t) {
      const c = r.NORMAL !== void 0 ? e.getDependency("accessor", r.NORMAL) : a.attributes.normal;
      o.push(c);
    }
    if (i) {
      const c = r.COLOR_0 !== void 0 ? e.getDependency("accessor", r.COLOR_0) : a.attributes.color;
      B.push(c);
    }
  }
  return Promise.all([
    Promise.all(n),
    Promise.all(o),
    Promise.all(B)
  ]).then(function(C) {
    const I = C[0], r = C[1], c = C[2];
    return s && (a.morphAttributes.position = I), t && (a.morphAttributes.normal = r), i && (a.morphAttributes.color = c), a.morphTargetsRelative = !0, a;
  });
}
function $i(a, A) {
  if (a.updateMorphTargets(), A.weights !== void 0)
    for (let e = 0, s = A.weights.length; e < s; e++)
      a.morphTargetInfluences[e] = A.weights[e];
  if (A.extras && Array.isArray(A.extras.targetNames)) {
    const e = A.extras.targetNames;
    if (a.morphTargetInfluences.length === e.length) {
      a.morphTargetDictionary = {};
      for (let s = 0, t = e.length; s < t; s++)
        a.morphTargetDictionary[e[s]] = s;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function An(a) {
  let A;
  const e = a.extensions && a.extensions[R.KHR_DRACO_MESH_COMPRESSION];
  if (e ? A = "draco:" + e.bufferView + ":" + e.indices + ":" + Pe(e.attributes) : A = a.indices + ":" + Pe(a.attributes) + ":" + a.mode, a.targets !== void 0)
    for (let s = 0, t = a.targets.length; s < t; s++)
      A += ":" + Pe(a.targets[s]);
  return A;
}
function Pe(a) {
  let A = "";
  const e = Object.keys(a).sort();
  for (let s = 0, t = e.length; s < t; s++)
    A += e[s] + ":" + a[e[s]] + ";";
  return A;
}
function it(a) {
  switch (a) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function en(a) {
  return a.search(/\.jpe?g($|\?)/i) > 0 || a.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : a.search(/\.webp($|\?)/i) > 0 || a.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const tn = new bA();
class sn {
  constructor(A = {}, e = {}) {
    this.json = A, this.extensions = {}, this.plugins = {}, this.options = e, this.cache = new mi(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let s = !1, t = !1, i = -1;
    typeof navigator != "undefined" && (s = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0, t = navigator.userAgent.indexOf("Firefox") > -1, i = t ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap == "undefined" || s || t && i < 98 ? this.textureLoader = new _t(this.options.manager) : this.textureLoader = new Ls(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new FA(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(A) {
    this.extensions = A;
  }
  setPlugins(A) {
    this.plugins = A;
  }
  parse(A, e) {
    const s = this, t = this.json, i = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(n) {
      return n._markDefs && n._markDefs();
    }), Promise.all(this._invokeAll(function(n) {
      return n.beforeRoot && n.beforeRoot();
    })).then(function() {
      return Promise.all([
        s.getDependencies("scene"),
        s.getDependencies("animation"),
        s.getDependencies("camera")
      ]);
    }).then(function(n) {
      const o = {
        scene: n[0][t.scene || 0],
        scenes: n[0],
        animations: n[1],
        cameras: n[2],
        asset: t.asset,
        parser: s,
        userData: {}
      };
      return hA(i, o, t), iA(o, t), Promise.all(s._invokeAll(function(B) {
        return B.afterRoot && B.afterRoot(o);
      })).then(function() {
        A(o);
      });
    }).catch(e);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const A = this.json.nodes || [], e = this.json.skins || [], s = this.json.meshes || [];
    for (let t = 0, i = e.length; t < i; t++) {
      const n = e[t].joints;
      for (let o = 0, B = n.length; o < B; o++)
        A[n[o]].isBone = !0;
    }
    for (let t = 0, i = A.length; t < i; t++) {
      const n = A[t];
      n.mesh !== void 0 && (this._addNodeRef(this.meshCache, n.mesh), n.skin !== void 0 && (s[n.mesh].isSkinnedMesh = !0)), n.camera !== void 0 && this._addNodeRef(this.cameraCache, n.camera);
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   */
  _addNodeRef(A, e) {
    e !== void 0 && (A.refs[e] === void 0 && (A.refs[e] = A.uses[e] = 0), A.refs[e]++);
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(A, e, s) {
    if (A.refs[e] <= 1)
      return s;
    const t = s.clone(), i = (n, o) => {
      const B = this.associations.get(n);
      B != null && this.associations.set(o, B);
      for (const [C, I] of n.children.entries())
        i(I, o.children[C]);
    };
    return i(s, t), t.name += "_instance_" + A.uses[e]++, t;
  }
  _invokeOne(A) {
    const e = Object.values(this.plugins);
    e.push(this);
    for (let s = 0; s < e.length; s++) {
      const t = A(e[s]);
      if (t)
        return t;
    }
    return null;
  }
  _invokeAll(A) {
    const e = Object.values(this.plugins);
    e.unshift(this);
    const s = [];
    for (let t = 0; t < e.length; t++) {
      const i = A(e[t]);
      i && s.push(i);
    }
    return s;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(A, e) {
    const s = A + ":" + e;
    let t = this.cache.get(s);
    if (!t) {
      switch (A) {
        case "scene":
          t = this.loadScene(e);
          break;
        case "node":
          t = this._invokeOne(function(i) {
            return i.loadNode && i.loadNode(e);
          });
          break;
        case "mesh":
          t = this._invokeOne(function(i) {
            return i.loadMesh && i.loadMesh(e);
          });
          break;
        case "accessor":
          t = this.loadAccessor(e);
          break;
        case "bufferView":
          t = this._invokeOne(function(i) {
            return i.loadBufferView && i.loadBufferView(e);
          });
          break;
        case "buffer":
          t = this.loadBuffer(e);
          break;
        case "material":
          t = this._invokeOne(function(i) {
            return i.loadMaterial && i.loadMaterial(e);
          });
          break;
        case "texture":
          t = this._invokeOne(function(i) {
            return i.loadTexture && i.loadTexture(e);
          });
          break;
        case "skin":
          t = this.loadSkin(e);
          break;
        case "animation":
          t = this._invokeOne(function(i) {
            return i.loadAnimation && i.loadAnimation(e);
          });
          break;
        case "camera":
          t = this.loadCamera(e);
          break;
        default:
          if (t = this._invokeOne(function(i) {
            return i != this && i.getDependency && i.getDependency(A, e);
          }), !t)
            throw new Error("Unknown type: " + A);
          break;
      }
      this.cache.add(s, t);
    }
    return t;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(A) {
    let e = this.cache.get(A);
    if (!e) {
      const s = this, t = this.json[A + (A === "mesh" ? "es" : "s")] || [];
      e = Promise.all(t.map(function(i, n) {
        return s.getDependency(A, n);
      })), this.cache.add(A, e);
    }
    return e;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(A) {
    const e = this.json.buffers[A], s = this.fileLoader;
    if (e.type && e.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + e.type + " buffer type is not supported.");
    if (e.uri === void 0 && A === 0)
      return Promise.resolve(this.extensions[R.KHR_BINARY_GLTF].body);
    const t = this.options;
    return new Promise(function(i, n) {
      s.load(WA.resolveURL(e.uri, t.path), i, void 0, function() {
        n(new Error('THREE.GLTFLoader: Failed to load buffer "' + e.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(A) {
    const e = this.json.bufferViews[A];
    return this.getDependency("buffer", e.buffer).then(function(s) {
      const t = e.byteLength || 0, i = e.byteOffset || 0;
      return s.slice(i, i + t);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(A) {
    const e = this, s = this.json, t = this.json.accessors[A];
    if (t.bufferView === void 0 && t.sparse === void 0) {
      const n = Oe[t.type], o = pA[t.componentType], B = t.normalized === !0, C = new o(t.count * n);
      return Promise.resolve(new VA(C, n, B));
    }
    const i = [];
    return t.bufferView !== void 0 ? i.push(this.getDependency("bufferView", t.bufferView)) : i.push(null), t.sparse !== void 0 && (i.push(this.getDependency("bufferView", t.sparse.indices.bufferView)), i.push(this.getDependency("bufferView", t.sparse.values.bufferView))), Promise.all(i).then(function(n) {
      const o = n[0], B = Oe[t.type], C = pA[t.componentType], I = C.BYTES_PER_ELEMENT, r = I * B, c = t.byteOffset || 0, Q = t.bufferView !== void 0 ? s.bufferViews[t.bufferView].byteStride : void 0, l = t.normalized === !0;
      let h, E;
      if (Q && Q !== r) {
        const d = Math.floor(c / Q), f = "InterleavedBuffer:" + t.bufferView + ":" + t.componentType + ":" + d + ":" + t.count;
        let D = e.cache.get(f);
        D || (h = new C(o, d * Q, t.count * Q / I), D = new ys(h, Q / I), e.cache.add(f, D)), E = new Js(D, B, c % Q / I, l);
      } else
        o === null ? h = new C(t.count * B) : h = new C(o, c, t.count * B), E = new VA(h, B, l);
      if (t.sparse !== void 0) {
        const d = Oe.SCALAR, f = pA[t.sparse.indices.componentType], D = t.sparse.indices.byteOffset || 0, F = t.sparse.values.byteOffset || 0, p = new f(n[1], D, t.sparse.count * d), m = new C(n[2], F, t.sparse.count * B);
        o !== null && (E = new VA(E.array.slice(), E.itemSize, E.normalized));
        for (let M = 0, _ = p.length; M < _; M++) {
          const y = p[M];
          if (E.setX(y, m[M * B]), B >= 2 && E.setY(y, m[M * B + 1]), B >= 3 && E.setZ(y, m[M * B + 2]), B >= 4 && E.setW(y, m[M * B + 3]), B >= 5)
            throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
      }
      return E;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */
  loadTexture(A) {
    const e = this.json, s = this.options, i = e.textures[A].source, n = e.images[i];
    let o = this.textureLoader;
    if (n.uri) {
      const B = s.manager.getHandler(n.uri);
      B !== null && (o = B);
    }
    return this.loadTextureImage(A, i, o);
  }
  loadTextureImage(A, e, s) {
    const t = this, i = this.json, n = i.textures[A], o = i.images[e], B = (o.uri || o.bufferView) + ":" + n.sampler;
    if (this.textureCache[B])
      return this.textureCache[B];
    const C = this.loadImageSource(e, s).then(function(I) {
      I.flipY = !1, I.name = n.name || o.name || "", I.name === "" && typeof o.uri == "string" && o.uri.startsWith("data:image/") === !1 && (I.name = o.uri);
      const c = (i.samplers || {})[n.sampler] || {};
      return I.magFilter = wt[c.magFilter] || He, I.minFilter = wt[c.minFilter] || gt, I.wrapS = St[c.wrapS] || et, I.wrapT = St[c.wrapT] || et, t.associations.set(I, { textures: A }), I;
    }).catch(function() {
      return null;
    });
    return this.textureCache[B] = C, C;
  }
  loadImageSource(A, e) {
    const s = this, t = this.json, i = this.options;
    if (this.sourceCache[A] !== void 0)
      return this.sourceCache[A].then((r) => r.clone());
    const n = t.images[A], o = self.URL || self.webkitURL;
    let B = n.uri || "", C = !1;
    if (n.bufferView !== void 0)
      B = s.getDependency("bufferView", n.bufferView).then(function(r) {
        C = !0;
        const c = new Blob([r], { type: n.mimeType });
        return B = o.createObjectURL(c), B;
      });
    else if (n.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + A + " is missing URI and bufferView");
    const I = Promise.resolve(B).then(function(r) {
      return new Promise(function(c, Q) {
        let l = c;
        e.isImageBitmapLoader === !0 && (l = function(h) {
          const E = new dt(h);
          E.needsUpdate = !0, c(E);
        }), e.load(WA.resolveURL(r, i.path), l, void 0, Q);
      });
    }).then(function(r) {
      return C === !0 && o.revokeObjectURL(B), r.userData.mimeType = n.mimeType || en(n.uri), r;
    }).catch(function(r) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", B), r;
    });
    return this.sourceCache[A] = I, I;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */
  assignTexture(A, e, s, t) {
    const i = this;
    return this.getDependency("texture", s.index).then(function(n) {
      if (!n)
        return null;
      if (s.texCoord !== void 0 && s.texCoord > 0 && (n = n.clone(), n.channel = s.texCoord), i.extensions[R.KHR_TEXTURE_TRANSFORM]) {
        const o = s.extensions !== void 0 ? s.extensions[R.KHR_TEXTURE_TRANSFORM] : void 0;
        if (o) {
          const B = i.associations.get(n);
          n = i.extensions[R.KHR_TEXTURE_TRANSFORM].extendTexture(n, o), i.associations.set(n, B);
        }
      }
      return t !== void 0 && (n.colorSpace = t), A[e] = n, n;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   * @param  {Object3D} mesh Mesh, Line, or Points instance.
   */
  assignFinalMaterial(A) {
    const e = A.geometry;
    let s = A.material;
    const t = e.attributes.tangent === void 0, i = e.attributes.color !== void 0, n = e.attributes.normal === void 0;
    if (A.isPoints) {
      const o = "PointsMaterial:" + s.uuid;
      let B = this.cache.get(o);
      B || (B = new Hs(), Ke.prototype.copy.call(B, s), B.color.copy(s.color), B.map = s.map, B.sizeAttenuation = !1, this.cache.add(o, B)), s = B;
    } else if (A.isLine) {
      const o = "LineBasicMaterial:" + s.uuid;
      let B = this.cache.get(o);
      B || (B = new Ts(), Ke.prototype.copy.call(B, s), B.color.copy(s.color), B.map = s.map, this.cache.add(o, B)), s = B;
    }
    if (t || i || n) {
      let o = "ClonedMaterial:" + s.uuid + ":";
      t && (o += "derivative-tangents:"), i && (o += "vertex-colors:"), n && (o += "flat-shading:");
      let B = this.cache.get(o);
      B || (B = s.clone(), i && (B.vertexColors = !0), n && (B.flatShading = !0), t && (B.normalScale && (B.normalScale.y *= -1), B.clearcoatNormalScale && (B.clearcoatNormalScale.y *= -1)), this.cache.add(o, B), this.associations.set(B, this.associations.get(s))), s = B;
    }
    A.material = s;
  }
  getMaterialType() {
    return Pt;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(A) {
    const e = this, s = this.json, t = this.extensions, i = s.materials[A];
    let n;
    const o = {}, B = i.extensions || {}, C = [];
    if (B[R.KHR_MATERIALS_UNLIT]) {
      const r = t[R.KHR_MATERIALS_UNLIT];
      n = r.getMaterialType(), C.push(r.extendParams(o, i, e));
    } else {
      const r = i.pbrMetallicRoughness || {};
      if (o.color = new EA(1, 1, 1), o.opacity = 1, Array.isArray(r.baseColorFactor)) {
        const c = r.baseColorFactor;
        o.color.setRGB(c[0], c[1], c[2], O), o.opacity = c[3];
      }
      r.baseColorTexture !== void 0 && C.push(e.assignTexture(o, "map", r.baseColorTexture, $)), o.metalness = r.metallicFactor !== void 0 ? r.metallicFactor : 1, o.roughness = r.roughnessFactor !== void 0 ? r.roughnessFactor : 1, r.metallicRoughnessTexture !== void 0 && (C.push(e.assignTexture(o, "metalnessMap", r.metallicRoughnessTexture)), C.push(e.assignTexture(o, "roughnessMap", r.metallicRoughnessTexture))), n = this._invokeOne(function(c) {
        return c.getMaterialType && c.getMaterialType(A);
      }), C.push(Promise.all(this._invokeAll(function(c) {
        return c.extendMaterialParams && c.extendMaterialParams(A, o);
      })));
    }
    i.doubleSided === !0 && (o.side = Us);
    const I = i.alphaMode || _e.OPAQUE;
    if (I === _e.BLEND ? (o.transparent = !0, o.depthWrite = !1) : (o.transparent = !1, I === _e.MASK && (o.alphaTest = i.alphaCutoff !== void 0 ? i.alphaCutoff : 0.5)), i.normalTexture !== void 0 && n !== qA && (C.push(e.assignTexture(o, "normalMap", i.normalTexture)), o.normalScale = new Ct(1, 1), i.normalTexture.scale !== void 0)) {
      const r = i.normalTexture.scale;
      o.normalScale.set(r, r);
    }
    if (i.occlusionTexture !== void 0 && n !== qA && (C.push(e.assignTexture(o, "aoMap", i.occlusionTexture)), i.occlusionTexture.strength !== void 0 && (o.aoMapIntensity = i.occlusionTexture.strength)), i.emissiveFactor !== void 0 && n !== qA) {
      const r = i.emissiveFactor;
      o.emissive = new EA().setRGB(r[0], r[1], r[2], O);
    }
    return i.emissiveTexture !== void 0 && n !== qA && C.push(e.assignTexture(o, "emissiveMap", i.emissiveTexture, $)), Promise.all(C).then(function() {
      const r = new n(o);
      return i.name && (r.name = i.name), iA(r, i), e.associations.set(r, { materials: A }), i.extensions && hA(t, r, i), r;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(A) {
    const e = Ns.sanitizeNodeName(A || "");
    return e in this.nodeNamesUsed ? e + "_" + ++this.nodeNamesUsed[e] : (this.nodeNamesUsed[e] = 0, e);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(A) {
    const e = this, s = this.extensions, t = this.primitiveCache;
    function i(o) {
      return s[R.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o, e).then(function(B) {
        return Lt(B, o, e);
      });
    }
    const n = [];
    for (let o = 0, B = A.length; o < B; o++) {
      const C = A[o], I = An(C), r = t[I];
      if (r)
        n.push(r.promise);
      else {
        let c;
        C.extensions && C.extensions[R.KHR_DRACO_MESH_COMPRESSION] ? c = i(C) : c = Lt(new Yt(), C, e), t[I] = { primitive: C, promise: c }, n.push(c);
      }
    }
    return Promise.all(n);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(A) {
    const e = this, s = this.json, t = this.extensions, i = s.meshes[A], n = i.primitives, o = [];
    for (let B = 0, C = n.length; B < C; B++) {
      const I = n[B].material === void 0 ? Zi(this.cache) : this.getDependency("material", n[B].material);
      o.push(I);
    }
    return o.push(e.loadGeometries(n)), Promise.all(o).then(function(B) {
      const C = B.slice(0, B.length - 1), I = B[B.length - 1], r = [];
      for (let Q = 0, l = I.length; Q < l; Q++) {
        const h = I[Q], E = n[Q];
        let d;
        const f = C[Q];
        if (E.mode === x.TRIANGLES || E.mode === x.TRIANGLE_STRIP || E.mode === x.TRIANGLE_FAN || E.mode === void 0)
          d = i.isSkinnedMesh === !0 ? new xs(h, f) : new Fe(h, f), d.isSkinnedMesh === !0 && d.normalizeSkinWeights(), E.mode === x.TRIANGLE_STRIP ? d.geometry = mt(d.geometry, Ot) : E.mode === x.TRIANGLE_FAN && (d.geometry = mt(d.geometry, At));
        else if (E.mode === x.LINES)
          d = new ks(h, f);
        else if (E.mode === x.LINE_STRIP)
          d = new Ks(h, f);
        else if (E.mode === x.LINE_LOOP)
          d = new bs(h, f);
        else if (E.mode === x.POINTS)
          d = new Os(h, f);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + E.mode);
        Object.keys(d.geometry.morphAttributes).length > 0 && $i(d, i), d.name = e.createUniqueName(i.name || "mesh_" + A), iA(d, i), E.extensions && hA(t, d, E), e.assignFinalMaterial(d), r.push(d);
      }
      for (let Q = 0, l = r.length; Q < l; Q++)
        e.associations.set(r[Q], {
          meshes: A,
          primitives: Q
        });
      if (r.length === 1)
        return i.extensions && hA(t, r[0], i), r[0];
      const c = new jA();
      i.extensions && hA(t, c, i), e.associations.set(c, { meshes: A });
      for (let Q = 0, l = r.length; Q < l; Q++)
        c.add(r[Q]);
      return c;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(A) {
    let e;
    const s = this.json.cameras[A], t = s[s.type];
    if (!t) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return s.type === "perspective" ? e = new $e(_s.radToDeg(t.yfov), t.aspectRatio || 1, t.znear || 1, t.zfar || 2e6) : s.type === "orthographic" && (e = new ze(-t.xmag, t.xmag, t.ymag, -t.ymag, t.znear, t.zfar)), s.name && (e.name = this.createUniqueName(s.name)), iA(e, s), Promise.resolve(e);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(A) {
    const e = this.json.skins[A], s = [];
    for (let t = 0, i = e.joints.length; t < i; t++)
      s.push(this._loadNodeShallow(e.joints[t]));
    return e.inverseBindMatrices !== void 0 ? s.push(this.getDependency("accessor", e.inverseBindMatrices)) : s.push(null), Promise.all(s).then(function(t) {
      const i = t.pop(), n = t, o = [], B = [];
      for (let C = 0, I = n.length; C < I; C++) {
        const r = n[C];
        if (r) {
          o.push(r);
          const c = new bA();
          i !== null && c.fromArray(i.array, C * 16), B.push(c);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', e.joints[C]);
      }
      return new Ps(o, B);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(A) {
    const e = this.json, s = this, t = e.animations[A], i = t.name ? t.name : "animation_" + A, n = [], o = [], B = [], C = [], I = [];
    for (let r = 0, c = t.channels.length; r < c; r++) {
      const Q = t.channels[r], l = t.samplers[Q.sampler], h = Q.target, E = h.node, d = t.parameters !== void 0 ? t.parameters[l.input] : l.input, f = t.parameters !== void 0 ? t.parameters[l.output] : l.output;
      h.node !== void 0 && (n.push(this.getDependency("node", E)), o.push(this.getDependency("accessor", d)), B.push(this.getDependency("accessor", f)), C.push(l), I.push(h));
    }
    return Promise.all([
      Promise.all(n),
      Promise.all(o),
      Promise.all(B),
      Promise.all(C),
      Promise.all(I)
    ]).then(function(r) {
      const c = r[0], Q = r[1], l = r[2], h = r[3], E = r[4], d = [];
      for (let f = 0, D = c.length; f < D; f++) {
        const F = c[f], p = Q[f], m = l[f], M = h[f], _ = E[f];
        if (F === void 0)
          continue;
        F.updateMatrix && F.updateMatrix();
        const y = s._createAnimationTracks(F, p, m, M, _);
        if (y)
          for (let W = 0; W < y.length; W++)
            d.push(y[W]);
      }
      return new Ys(i, void 0, d);
    });
  }
  createNodeMesh(A) {
    const e = this.json, s = this, t = e.nodes[A];
    return t.mesh === void 0 ? null : s.getDependency("mesh", t.mesh).then(function(i) {
      const n = s._getNodeRef(s.meshCache, t.mesh, i);
      return t.weights !== void 0 && n.traverse(function(o) {
        if (o.isMesh)
          for (let B = 0, C = t.weights.length; B < C; B++)
            o.morphTargetInfluences[B] = t.weights[B];
      }), n;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(A) {
    const e = this.json, s = this, t = e.nodes[A], i = s._loadNodeShallow(A), n = [], o = t.children || [];
    for (let C = 0, I = o.length; C < I; C++)
      n.push(s.getDependency("node", o[C]));
    const B = t.skin === void 0 ? Promise.resolve(null) : s.getDependency("skin", t.skin);
    return Promise.all([
      i,
      Promise.all(n),
      B
    ]).then(function(C) {
      const I = C[0], r = C[1], c = C[2];
      c !== null && I.traverse(function(Q) {
        Q.isSkinnedMesh && Q.bind(c, tn);
      });
      for (let Q = 0, l = r.length; Q < l; Q++)
        I.add(r[Q]);
      return I;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(A) {
    const e = this.json, s = this.extensions, t = this;
    if (this.nodeCache[A] !== void 0)
      return this.nodeCache[A];
    const i = e.nodes[A], n = i.name ? t.createUniqueName(i.name) : "", o = [], B = t._invokeOne(function(C) {
      return C.createNodeMesh && C.createNodeMesh(A);
    });
    return B && o.push(B), i.camera !== void 0 && o.push(t.getDependency("camera", i.camera).then(function(C) {
      return t._getNodeRef(t.cameraCache, i.camera, C);
    })), t._invokeAll(function(C) {
      return C.createNodeAttachment && C.createNodeAttachment(A);
    }).forEach(function(C) {
      o.push(C);
    }), this.nodeCache[A] = Promise.all(o).then(function(C) {
      let I;
      if (i.isBone === !0 ? I = new qs() : C.length > 1 ? I = new jA() : C.length === 1 ? I = C[0] : I = new It(), I !== C[0])
        for (let r = 0, c = C.length; r < c; r++)
          I.add(C[r]);
      if (i.name && (I.userData.name = i.name, I.name = n), iA(I, i), i.extensions && hA(s, I, i), i.matrix !== void 0) {
        const r = new bA();
        r.fromArray(i.matrix), I.applyMatrix4(r);
      } else
        i.translation !== void 0 && I.position.fromArray(i.translation), i.rotation !== void 0 && I.quaternion.fromArray(i.rotation), i.scale !== void 0 && I.scale.fromArray(i.scale);
      return t.associations.has(I) || t.associations.set(I, {}), t.associations.get(I).nodes = A, I;
    }), this.nodeCache[A];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(A) {
    const e = this.extensions, s = this.json.scenes[A], t = this, i = new jA();
    s.name && (i.name = t.createUniqueName(s.name)), iA(i, s), s.extensions && hA(e, i, s);
    const n = s.nodes || [], o = [];
    for (let B = 0, C = n.length; B < C; B++)
      o.push(t.getDependency("node", n[B]));
    return Promise.all(o).then(function(B) {
      for (let I = 0, r = B.length; I < r; I++)
        i.add(B[I]);
      const C = (I) => {
        const r = /* @__PURE__ */ new Map();
        for (const [c, Q] of t.associations)
          (c instanceof Ke || c instanceof dt) && r.set(c, Q);
        return I.traverse((c) => {
          const Q = t.associations.get(c);
          Q != null && r.set(c, Q);
        }), r;
      };
      return t.associations = C(i), i;
    });
  }
  _createAnimationTracks(A, e, s, t, i) {
    const n = [], o = A.name ? A.name : A.uuid, B = [];
    sA[i.path] === sA.weights ? A.traverse(function(c) {
      c.morphTargetInfluences && B.push(c.name ? c.name : c.uuid);
    }) : B.push(o);
    let C;
    switch (sA[i.path]) {
      case sA.weights:
        C = ft;
        break;
      case sA.rotation:
        C = Dt;
        break;
      case sA.position:
      case sA.scale:
        C = ut;
        break;
      default:
        switch (s.itemSize) {
          case 1:
            C = ft;
            break;
          case 2:
          case 3:
          default:
            C = ut;
            break;
        }
        break;
    }
    const I = t.interpolation !== void 0 ? ji[t.interpolation] : qt, r = this._getArrayFromAccessor(s);
    for (let c = 0, Q = B.length; c < Q; c++) {
      const l = new C(
        B[c] + "." + sA[i.path],
        e.array,
        r,
        I
      );
      t.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(l), n.push(l);
    }
    return n;
  }
  _getArrayFromAccessor(A) {
    let e = A.array;
    if (A.normalized) {
      const s = it(e.constructor), t = new Float32Array(e.length);
      for (let i = 0, n = e.length; i < n; i++)
        t[i] = e[i] * s;
      e = t;
    }
    return e;
  }
  _createCubicSplineTrackInterpolant(A) {
    A.createInterpolant = function(s) {
      const t = this instanceof Dt ? Vi : jt;
      return new t(this.times, this.values, this.getValueSize() / 3, s);
    }, A.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function nn(a, A, e) {
  const s = A.attributes, t = new Ai();
  if (s.POSITION !== void 0) {
    const o = e.json.accessors[s.POSITION], B = o.min, C = o.max;
    if (B !== void 0 && C !== void 0) {
      if (t.set(
        new K(B[0], B[1], B[2]),
        new K(C[0], C[1], C[2])
      ), o.normalized) {
        const I = it(pA[o.componentType]);
        t.min.multiplyScalar(I), t.max.multiplyScalar(I);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const i = A.targets;
  if (i !== void 0) {
    const o = new K(), B = new K();
    for (let C = 0, I = i.length; C < I; C++) {
      const r = i[C];
      if (r.POSITION !== void 0) {
        const c = e.json.accessors[r.POSITION], Q = c.min, l = c.max;
        if (Q !== void 0 && l !== void 0) {
          if (B.setX(Math.max(Math.abs(Q[0]), Math.abs(l[0]))), B.setY(Math.max(Math.abs(Q[1]), Math.abs(l[1]))), B.setZ(Math.max(Math.abs(Q[2]), Math.abs(l[2]))), c.normalized) {
            const h = it(pA[c.componentType]);
            B.multiplyScalar(h);
          }
          o.max(B);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    t.expandByVector(o);
  }
  a.boundingBox = t;
  const n = new ei();
  t.getCenter(n.center), n.radius = t.min.distanceTo(t.max) / 2, a.boundingSphere = n;
}
function Lt(a, A, e) {
  const s = A.attributes, t = [];
  function i(n, o) {
    return e.getDependency("accessor", n).then(function(B) {
      a.setAttribute(o, B);
    });
  }
  for (const n in s) {
    const o = st[n] || n.toLowerCase();
    o in a.attributes || t.push(i(s[n], o));
  }
  if (A.indices !== void 0 && !a.index) {
    const n = e.getDependency("accessor", A.indices).then(function(o) {
      a.setIndex(o);
    });
    t.push(n);
  }
  return lt.workingColorSpace !== O && "COLOR_0" in s && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${lt.workingColorSpace}" not supported.`), iA(a, A), nn(a, A, e), Promise.all(t).then(function() {
    return A.targets !== void 0 ? zi(a, A.targets, e) : a;
  });
}
const Ye = /* @__PURE__ */ new WeakMap();
class on extends rt {
  constructor(A) {
    super(A), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = {
      position: "POSITION",
      normal: "NORMAL",
      color: "COLOR",
      uv: "TEX_COORD"
    }, this.defaultAttributeTypes = {
      position: "Float32Array",
      normal: "Float32Array",
      color: "Float32Array",
      uv: "Float32Array"
    };
  }
  setDecoderPath(A) {
    return this.decoderPath = A, this;
  }
  setDecoderConfig(A) {
    return this.decoderConfig = A, this;
  }
  setWorkerLimit(A) {
    return this.workerLimit = A, this;
  }
  load(A, e, s, t) {
    const i = new FA(this.manager);
    i.setPath(this.path), i.setResponseType("arraybuffer"), i.setRequestHeader(this.requestHeader), i.setWithCredentials(this.withCredentials), i.load(A, (n) => {
      this.parse(n, e, t);
    }, s, t);
  }
  parse(A, e, s = () => {
  }) {
    this.decodeDracoFile(A, e, null, null, $).catch(s);
  }
  decodeDracoFile(A, e, s, t, i = O, n = () => {
  }) {
    const o = {
      attributeIDs: s || this.defaultAttributeIDs,
      attributeTypes: t || this.defaultAttributeTypes,
      useUniqueIDs: !!s,
      vertexColorSpace: i
    };
    return this.decodeGeometry(A, o).then(e).catch(n);
  }
  decodeGeometry(A, e) {
    const s = JSON.stringify(e);
    if (Ye.has(A)) {
      const B = Ye.get(A);
      if (B.key === s)
        return B.promise;
      if (A.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let t;
    const i = this.workerNextTaskID++, n = A.byteLength, o = this._getWorker(i, n).then((B) => (t = B, new Promise((C, I) => {
      t._callbacks[i] = { resolve: C, reject: I }, t.postMessage({ type: "decode", id: i, taskConfig: e, buffer: A }, [A]);
    }))).then((B) => this._createGeometry(B.geometry));
    return o.catch(() => !0).then(() => {
      t && i && this._releaseTask(t, i);
    }), Ye.set(A, {
      key: s,
      promise: o
    }), o;
  }
  _createGeometry(A) {
    const e = new Yt();
    A.index && e.setIndex(new VA(A.index.array, 1));
    for (let s = 0; s < A.attributes.length; s++) {
      const t = A.attributes[s], i = t.name, n = t.array, o = t.itemSize, B = new VA(n, o);
      i === "color" && (this._assignVertexColorSpace(B, t.vertexColorSpace), B.normalized = !(n instanceof Float32Array)), e.setAttribute(i, B);
    }
    return e;
  }
  _assignVertexColorSpace(A, e) {
    if (e !== $)
      return;
    const s = new EA();
    for (let t = 0, i = A.count; t < i; t++)
      s.fromBufferAttribute(A, t).convertSRGBToLinear(), A.setXYZ(t, s.r, s.g, s.b);
  }
  _loadLibrary(A, e) {
    const s = new FA(this.manager);
    return s.setPath(this.decoderPath), s.setResponseType(e), s.setWithCredentials(this.withCredentials), new Promise((t, i) => {
      s.load(A, t, void 0, i);
    });
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (this.decoderPending)
      return this.decoderPending;
    const A = typeof WebAssembly != "object" || this.decoderConfig.type === "js", e = [];
    return A ? e.push(this._loadLibrary("draco_decoder.js", "text")) : (e.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), e.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(e).then((s) => {
      const t = s[0];
      A || (this.decoderConfig.wasmBinary = s[1]);
      const i = Bn.toString(), n = [
        "/* draco decoder */",
        t,
        "",
        "/* worker */",
        i.substring(i.indexOf("{") + 1, i.lastIndexOf("}"))
      ].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([n]));
    }), this.decoderPending;
  }
  _getWorker(A, e) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const t = new Worker(this.workerSourceURL);
        t._callbacks = {}, t._taskCosts = {}, t._taskLoad = 0, t.postMessage({ type: "init", decoderConfig: this.decoderConfig }), t.onmessage = function(i) {
          const n = i.data;
          switch (n.type) {
            case "decode":
              t._callbacks[n.id].resolve(n);
              break;
            case "error":
              t._callbacks[n.id].reject(n);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + n.type + '"');
          }
        }, this.workerPool.push(t);
      } else
        this.workerPool.sort(function(t, i) {
          return t._taskLoad > i._taskLoad ? -1 : 1;
        });
      const s = this.workerPool[this.workerPool.length - 1];
      return s._taskCosts[A] = e, s._taskLoad += e, s;
    });
  }
  _releaseTask(A, e) {
    A._taskLoad -= A._taskCosts[e], delete A._callbacks[e], delete A._taskCosts[e];
  }
  debug() {
    console.log("Task load: ", this.workerPool.map((A) => A._taskLoad));
  }
  dispose() {
    for (let A = 0; A < this.workerPool.length; ++A)
      this.workerPool[A].terminate();
    return this.workerPool.length = 0, this.workerSourceURL !== "" && URL.revokeObjectURL(this.workerSourceURL), this;
  }
}
function Bn() {
  let a, A;
  onmessage = function(n) {
    const o = n.data;
    switch (o.type) {
      case "init":
        a = o.decoderConfig, A = new Promise(function(I) {
          a.onModuleLoaded = function(r) {
            I({ draco: r });
          }, DracoDecoderModule(a);
        });
        break;
      case "decode":
        const B = o.buffer, C = o.taskConfig;
        A.then((I) => {
          const r = I.draco, c = new r.Decoder();
          try {
            const Q = e(r, c, new Int8Array(B), C), l = Q.attributes.map((h) => h.array.buffer);
            Q.index && l.push(Q.index.array.buffer), self.postMessage({ type: "decode", id: o.id, geometry: Q }, l);
          } catch (Q) {
            console.error(Q), self.postMessage({ type: "error", id: o.id, error: Q.message });
          } finally {
            r.destroy(c);
          }
        });
        break;
    }
  };
  function e(n, o, B, C) {
    const I = C.attributeIDs, r = C.attributeTypes;
    let c, Q;
    const l = o.GetEncodedGeometryType(B);
    if (l === n.TRIANGULAR_MESH)
      c = new n.Mesh(), Q = o.DecodeArrayToMesh(B, B.byteLength, c);
    else if (l === n.POINT_CLOUD)
      c = new n.PointCloud(), Q = o.DecodeArrayToPointCloud(B, B.byteLength, c);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!Q.ok() || c.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + Q.error_msg());
    const h = { index: null, attributes: [] };
    for (const E in I) {
      const d = self[r[E]];
      let f, D;
      if (C.useUniqueIDs)
        D = I[E], f = o.GetAttributeByUniqueId(c, D);
      else {
        if (D = o.GetAttributeId(c, n[I[E]]), D === -1)
          continue;
        f = o.GetAttribute(c, D);
      }
      const F = t(n, o, c, E, d, f);
      E === "color" && (F.vertexColorSpace = C.vertexColorSpace), h.attributes.push(F);
    }
    return l === n.TRIANGULAR_MESH && (h.index = s(n, o, c)), n.destroy(c), h;
  }
  function s(n, o, B) {
    const I = B.num_faces() * 3, r = I * 4, c = n._malloc(r);
    o.GetTrianglesUInt32Array(B, r, c);
    const Q = new Uint32Array(n.HEAPF32.buffer, c, I).slice();
    return n._free(c), { array: Q, itemSize: 1 };
  }
  function t(n, o, B, C, I, r) {
    const c = r.num_components(), l = B.num_points() * c, h = l * I.BYTES_PER_ELEMENT, E = i(n, I), d = n._malloc(h);
    o.GetAttributeDataArrayForAllPoints(B, r, E, h, d);
    const f = new I(n.HEAPF32.buffer, d, l).slice();
    return n._free(d), {
      name: C,
      array: f,
      itemSize: c
    };
  }
  function i(n, o) {
    switch (o) {
      case Float32Array:
        return n.DT_FLOAT32;
      case Int8Array:
        return n.DT_INT8;
      case Int16Array:
        return n.DT_INT16;
      case Int32Array:
        return n.DT_INT32;
      case Uint8Array:
        return n.DT_UINT8;
      case Uint16Array:
        return n.DT_UINT16;
      case Uint32Array:
        return n.DT_UINT32;
    }
  }
}
class rn {
  constructor(A = 4) {
    this.pool = A, this.queue = [], this.workers = [], this.workersResolve = [], this.workerStatus = 0;
  }
  _initWorker(A) {
    if (!this.workers[A]) {
      const e = this.workerCreator();
      e.addEventListener("message", this._onMessage.bind(this, A)), this.workers[A] = e;
    }
  }
  _getIdleWorker() {
    for (let A = 0; A < this.pool; A++)
      if (!(this.workerStatus & 1 << A))
        return A;
    return -1;
  }
  _onMessage(A, e) {
    const s = this.workersResolve[A];
    if (s && s(e), this.queue.length) {
      const { resolve: t, msg: i, transfer: n } = this.queue.shift();
      this.workersResolve[A] = t, this.workers[A].postMessage(i, n);
    } else
      this.workerStatus ^= 1 << A;
  }
  setWorkerCreator(A) {
    this.workerCreator = A;
  }
  setWorkerLimit(A) {
    this.pool = A;
  }
  postMessage(A, e) {
    return new Promise((s) => {
      const t = this._getIdleWorker();
      t !== -1 ? (this._initWorker(t), this.workerStatus |= 1 << t, this.workersResolve[t] = s, this.workers[t].postMessage(A, e)) : this.queue.push({ resolve: s, msg: A, transfer: e });
    });
  }
  dispose() {
    this.workers.forEach((A) => A.terminate()), this.workersResolve.length = 0, this.workers.length = 0, this.queue.length = 0, this.workerStatus = 0;
  }
}
const Cn = 0, yt = 2, an = 1, Jt = 2, In = 0, gn = 1, En = 10, cn = 0, Zt = 9, zt = 15, $t = 16, As = 22, es = 37, ts = 43, ss = 76, is = 83, ns = 97, os = 100, Bs = 103, rs = 109, Cs = 165, as = 166;
class Qn {
  constructor() {
    this.vkFormat = 0, this.typeSize = 1, this.pixelWidth = 0, this.pixelHeight = 0, this.pixelDepth = 0, this.layerCount = 0, this.faceCount = 1, this.supercompressionScheme = 0, this.levels = [], this.dataFormatDescriptor = [{ vendorId: 0, descriptorType: 0, descriptorBlockSize: 0, versionNumber: 2, colorModel: 0, colorPrimaries: 1, transferFunction: 2, flags: 0, texelBlockDimension: [0, 0, 0, 0], bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0], samples: [] }], this.keyValue = {}, this.globalData = null;
  }
}
class YA {
  constructor(A, e, s, t) {
    this._dataView = new DataView(A.buffer, A.byteOffset + e, s), this._littleEndian = t, this._offset = 0;
  }
  _nextUint8() {
    const A = this._dataView.getUint8(this._offset);
    return this._offset += 1, A;
  }
  _nextUint16() {
    const A = this._dataView.getUint16(this._offset, this._littleEndian);
    return this._offset += 2, A;
  }
  _nextUint32() {
    const A = this._dataView.getUint32(this._offset, this._littleEndian);
    return this._offset += 4, A;
  }
  _nextUint64() {
    const A = this._dataView.getUint32(this._offset, this._littleEndian) + 4294967296 * this._dataView.getUint32(this._offset + 4, this._littleEndian);
    return this._offset += 8, A;
  }
  _nextInt32() {
    const A = this._dataView.getInt32(this._offset, this._littleEndian);
    return this._offset += 4, A;
  }
  _skip(A) {
    return this._offset += A, this;
  }
  _scan(A, e = 0) {
    const s = this._offset;
    let t = 0;
    for (; this._dataView.getUint8(this._offset) !== e && t < A; )
      t++, this._offset++;
    return t < A && this._offset++, new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + s, t);
  }
}
const L = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function Ht(a) {
  return typeof TextDecoder != "undefined" ? new TextDecoder().decode(a) : Buffer.from(a).toString("utf8");
}
function hn(a) {
  const A = new Uint8Array(a.buffer, a.byteOffset, L.length);
  if (A[0] !== L[0] || A[1] !== L[1] || A[2] !== L[2] || A[3] !== L[3] || A[4] !== L[4] || A[5] !== L[5] || A[6] !== L[6] || A[7] !== L[7] || A[8] !== L[8] || A[9] !== L[9] || A[10] !== L[10] || A[11] !== L[11])
    throw new Error("Missing KTX 2.0 identifier.");
  const e = new Qn(), s = 17 * Uint32Array.BYTES_PER_ELEMENT, t = new YA(a, L.length, s, !0);
  e.vkFormat = t._nextUint32(), e.typeSize = t._nextUint32(), e.pixelWidth = t._nextUint32(), e.pixelHeight = t._nextUint32(), e.pixelDepth = t._nextUint32(), e.layerCount = t._nextUint32(), e.faceCount = t._nextUint32();
  const i = t._nextUint32();
  e.supercompressionScheme = t._nextUint32();
  const n = t._nextUint32(), o = t._nextUint32(), B = t._nextUint32(), C = t._nextUint32(), I = t._nextUint64(), r = t._nextUint64(), c = new YA(a, L.length + s, 3 * i * 8, !0);
  for (let S = 0; S < i; S++)
    e.levels.push({ levelData: new Uint8Array(a.buffer, a.byteOffset + c._nextUint64(), c._nextUint64()), uncompressedByteLength: c._nextUint64() });
  const Q = new YA(a, n, o, !0), l = { vendorId: Q._skip(4)._nextUint16(), descriptorType: Q._nextUint16(), versionNumber: Q._nextUint16(), descriptorBlockSize: Q._nextUint16(), colorModel: Q._nextUint8(), colorPrimaries: Q._nextUint8(), transferFunction: Q._nextUint8(), flags: Q._nextUint8(), texelBlockDimension: [Q._nextUint8(), Q._nextUint8(), Q._nextUint8(), Q._nextUint8()], bytesPlane: [Q._nextUint8(), Q._nextUint8(), Q._nextUint8(), Q._nextUint8(), Q._nextUint8(), Q._nextUint8(), Q._nextUint8(), Q._nextUint8()], samples: [] }, h = (l.descriptorBlockSize / 4 - 6) / 4;
  for (let S = 0; S < h; S++) {
    const T = { bitOffset: Q._nextUint16(), bitLength: Q._nextUint8(), channelType: Q._nextUint8(), samplePosition: [Q._nextUint8(), Q._nextUint8(), Q._nextUint8(), Q._nextUint8()], sampleLower: -1 / 0, sampleUpper: 1 / 0 };
    64 & T.channelType ? (T.sampleLower = Q._nextInt32(), T.sampleUpper = Q._nextInt32()) : (T.sampleLower = Q._nextUint32(), T.sampleUpper = Q._nextUint32()), l.samples[S] = T;
  }
  e.dataFormatDescriptor.length = 0, e.dataFormatDescriptor.push(l);
  const E = new YA(a, B, C, !0);
  for (; E._offset < C; ) {
    const S = E._nextUint32(), T = E._scan(S), _A = Ht(T), V = E._scan(S - T.byteLength);
    e.keyValue[_A] = _A.match(/^ktx/i) ? Ht(V) : V, E._offset % 4 && E._skip(4 - E._offset % 4);
  }
  if (r <= 0)
    return e;
  const d = new YA(a, I, r, !0), f = d._nextUint16(), D = d._nextUint16(), F = d._nextUint32(), p = d._nextUint32(), m = d._nextUint32(), M = d._nextUint32(), _ = [];
  for (let S = 0; S < i; S++)
    _.push({ imageFlags: d._nextUint32(), rgbSliceByteOffset: d._nextUint32(), rgbSliceByteLength: d._nextUint32(), alphaSliceByteOffset: d._nextUint32(), alphaSliceByteLength: d._nextUint32() });
  const y = I + d._offset, W = y + F, OA = W + p, Ge = OA + m, cA = new Uint8Array(a.buffer, a.byteOffset + y, F), Re = new Uint8Array(a.buffer, a.byteOffset + W, p), eA = new Uint8Array(a.buffer, a.byteOffset + OA, m), pe = new Uint8Array(a.buffer, a.byteOffset + Ge, M);
  return e.globalData = { endpointCount: f, selectorCount: D, imageDescs: _, endpointsData: cA, selectorsData: Re, tablesData: eA, extendedData: pe }, e;
}
let qe, j, nt;
const Xe = { env: { emscripten_notify_memory_growth: function(a) {
  nt = new Uint8Array(j.exports.memory.buffer);
} } };
class ln {
  init() {
    return qe || (qe = typeof fetch != "undefined" ? fetch("data:application/wasm;base64," + Tt).then((A) => A.arrayBuffer()).then((A) => WebAssembly.instantiate(A, Xe)).then(this._init) : WebAssembly.instantiate(Buffer.from(Tt, "base64"), Xe).then(this._init), qe);
  }
  _init(A) {
    j = A.instance, Xe.env.emscripten_notify_memory_growth(0);
  }
  decode(A, e = 0) {
    if (!j)
      throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const s = A.byteLength, t = j.exports.malloc(s);
    nt.set(A, t), e = e || Number(j.exports.ZSTD_findDecompressedSize(t, s));
    const i = j.exports.malloc(e), n = j.exports.ZSTD_decompress(i, e, t, s), o = nt.slice(i, i + n);
    return j.exports.free(t), j.exports.free(i), o;
  }
}
const Tt = "AGFzbQEAAAABpQEVYAF/AX9gAn9/AGADf39/AX9gBX9/f39/AX9gAX8AYAJ/fwF/YAR/f39/AX9gA39/fwBgBn9/f39/fwF/YAd/f39/f39/AX9gAn9/AX5gAn5+AX5gAABgBX9/f39/AGAGf39/f39/AGAIf39/f39/f38AYAl/f39/f39/f38AYAABf2AIf39/f39/f38Bf2ANf39/f39/f39/f39/fwF/YAF/AX4CJwEDZW52H2Vtc2NyaXB0ZW5fbm90aWZ5X21lbW9yeV9ncm93dGgABANpaAEFAAAFAgEFCwACAQABAgIFBQcAAwABDgsBAQcAEhMHAAUBDAQEAAANBwQCAgYCBAgDAwMDBgEACQkHBgICAAYGAgQUBwYGAwIGAAMCAQgBBwUGCgoEEQAEBAEIAwgDBQgDEA8IAAcABAUBcAECAgUEAQCAAgYJAX8BQaCgwAILB2AHBm1lbW9yeQIABm1hbGxvYwAoBGZyZWUAJgxaU1REX2lzRXJyb3IAaBlaU1REX2ZpbmREZWNvbXByZXNzZWRTaXplAFQPWlNURF9kZWNvbXByZXNzAEoGX3N0YXJ0ACQJBwEAQQELASQKussBaA8AIAAgACgCBCABajYCBAsZACAAKAIAIAAoAgRBH3F0QQAgAWtBH3F2CwgAIABBiH9LC34BBH9BAyEBIAAoAgQiA0EgTQRAIAAoAggiASAAKAIQTwRAIAAQDQ8LIAAoAgwiAiABRgRAQQFBAiADQSBJGw8LIAAgASABIAJrIANBA3YiBCABIARrIAJJIgEbIgJrIgQ2AgggACADIAJBA3RrNgIEIAAgBCgAADYCAAsgAQsUAQF/IAAgARACIQIgACABEAEgAgv3AQECfyACRQRAIABCADcCACAAQQA2AhAgAEIANwIIQbh/DwsgACABNgIMIAAgAUEEajYCECACQQRPBEAgACABIAJqIgFBfGoiAzYCCCAAIAMoAAA2AgAgAUF/ai0AACIBBEAgAEEIIAEQFGs2AgQgAg8LIABBADYCBEF/DwsgACABNgIIIAAgAS0AACIDNgIAIAJBfmoiBEEBTQRAIARBAWtFBEAgACABLQACQRB0IANyIgM2AgALIAAgAS0AAUEIdCADajYCAAsgASACakF/ai0AACIBRQRAIABBADYCBEFsDwsgAEEoIAEQFCACQQN0ams2AgQgAgsWACAAIAEpAAA3AAAgACABKQAINwAICy8BAX8gAUECdEGgHWooAgAgACgCAEEgIAEgACgCBGprQR9xdnEhAiAAIAEQASACCyEAIAFCz9bTvtLHq9lCfiAAfEIfiUKHla+vmLbem55/fgsdAQF/IAAoAgggACgCDEYEfyAAKAIEQSBGBUEACwuCBAEDfyACQYDAAE8EQCAAIAEgAhBnIAAPCyAAIAJqIQMCQCAAIAFzQQNxRQRAAkAgAkEBSARAIAAhAgwBCyAAQQNxRQRAIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADTw0BIAJBA3ENAAsLAkAgA0F8cSIEQcAASQ0AIAIgBEFAaiIFSw0AA0AgAiABKAIANgIAIAIgASgCBDYCBCACIAEoAgg2AgggAiABKAIMNgIMIAIgASgCEDYCECACIAEoAhQ2AhQgAiABKAIYNgIYIAIgASgCHDYCHCACIAEoAiA2AiAgAiABKAIkNgIkIAIgASgCKDYCKCACIAEoAiw2AiwgAiABKAIwNgIwIAIgASgCNDYCNCACIAEoAjg2AjggAiABKAI8NgI8IAFBQGshASACQUBrIgIgBU0NAAsLIAIgBE8NAQNAIAIgASgCADYCACABQQRqIQEgAkEEaiICIARJDQALDAELIANBBEkEQCAAIQIMAQsgA0F8aiIEIABJBEAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCyACIANJBEADQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADRw0ACwsgAAsMACAAIAEpAAA3AAALQQECfyAAKAIIIgEgACgCEEkEQEEDDwsgACAAKAIEIgJBB3E2AgQgACABIAJBA3ZrIgE2AgggACABKAAANgIAQQALDAAgACABKAIANgAAC/cCAQJ/AkAgACABRg0AAkAgASACaiAASwRAIAAgAmoiBCABSw0BCyAAIAEgAhALDwsgACABc0EDcSEDAkACQCAAIAFJBEAgAwRAIAAhAwwDCyAAQQNxRQRAIAAhAwwCCyAAIQMDQCACRQ0EIAMgAS0AADoAACABQQFqIQEgAkF/aiECIANBAWoiA0EDcQ0ACwwBCwJAIAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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", ve = /* @__PURE__ */ new WeakMap();
let We = 0, Ve;
class v extends rt {
  constructor(A) {
    super(A), this.transcoderPath = "", this.transcoderBinary = null, this.transcoderPending = null, this.workerPool = new rn(), this.workerSourceURL = "", this.workerConfig = null, typeof MSC_TRANSCODER != "undefined" && console.warn(
      'THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.'
    );
  }
  setTranscoderPath(A) {
    return this.transcoderPath = A, this;
  }
  setWorkerLimit(A) {
    return this.workerPool.setWorkerLimit(A), this;
  }
  detectSupport(A) {
    return A.isWebGPURenderer === !0 ? this.workerConfig = {
      astcSupported: A.hasFeature("texture-compression-astc"),
      etc1Supported: !1,
      etc2Supported: A.hasFeature("texture-compression-etc2"),
      dxtSupported: A.hasFeature("texture-compression-bc"),
      bptcSupported: !1,
      pvrtcSupported: !1
    } : (this.workerConfig = {
      astcSupported: A.extensions.has("WEBGL_compressed_texture_astc"),
      etc1Supported: A.extensions.has("WEBGL_compressed_texture_etc1"),
      etc2Supported: A.extensions.has("WEBGL_compressed_texture_etc"),
      dxtSupported: A.extensions.has("WEBGL_compressed_texture_s3tc"),
      bptcSupported: A.extensions.has("EXT_texture_compression_bptc"),
      pvrtcSupported: A.extensions.has("WEBGL_compressed_texture_pvrtc") || A.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")
    }, A.capabilities.isWebGL2 && (this.workerConfig.etc1Supported = !1)), this;
  }
  init() {
    if (!this.transcoderPending) {
      const A = new FA(this.manager);
      A.setPath(this.transcoderPath), A.setWithCredentials(this.withCredentials);
      const e = A.loadAsync("basis_transcoder.js"), s = new FA(this.manager);
      s.setPath(this.transcoderPath), s.setResponseType("arraybuffer"), s.setWithCredentials(this.withCredentials);
      const t = s.loadAsync("basis_transcoder.wasm");
      this.transcoderPending = Promise.all([e, t]).then(([i, n]) => {
        const o = v.BasisWorker.toString(), B = [
          "/* constants */",
          "let _EngineFormat = " + JSON.stringify(v.EngineFormat),
          "let _TranscoderFormat = " + JSON.stringify(v.TranscoderFormat),
          "let _BasisFormat = " + JSON.stringify(v.BasisFormat),
          "/* basis_transcoder.js */",
          i,
          "/* worker */",
          o.substring(o.indexOf("{") + 1, o.lastIndexOf("}"))
        ].join(`
`);
        this.workerSourceURL = URL.createObjectURL(new Blob([B])), this.transcoderBinary = n, this.workerPool.setWorkerCreator(() => {
          const C = new Worker(this.workerSourceURL), I = this.transcoderBinary.slice(0);
          return C.postMessage({ type: "init", config: this.workerConfig, transcoderBinary: I }, [I]), C;
        });
      }), We > 0 && console.warn(
        "THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."
      ), We++;
    }
    return this.transcoderPending;
  }
  load(A, e, s, t) {
    if (this.workerConfig === null)
      throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");
    const i = new FA(this.manager);
    i.setResponseType("arraybuffer"), i.setWithCredentials(this.withCredentials), i.load(A, (n) => {
      if (ve.has(n))
        return ve.get(n).promise.then(e).catch(t);
      this._createTexture(n).then((o) => e ? e(o) : null).catch(t);
    }, s, t);
  }
  _createTextureFrom(A, e) {
    const { faces: s, width: t, height: i, format: n, type: o, error: B, dfdFlags: C } = A;
    if (o === "error")
      return Promise.reject(B);
    let I;
    if (e.faceCount === 6)
      I = new si(s, n, b);
    else {
      const r = s[0].mipmaps;
      I = e.layerCount > 1 ? new ii(r, t, i, e.layerCount, n, b) : new Xt(r, t, i, n, b);
    }
    return I.minFilter = s[0].mipmaps.length === 1 ? He : gt, I.magFilter = He, I.generateMipmaps = !1, I.needsUpdate = !0, I.colorSpace = Is(e), I.premultiplyAlpha = !!(C & an), I;
  }
  /**
   * @param {ArrayBuffer} buffer
   * @param {object?} config
   * @return {Promise<CompressedTexture|CompressedArrayTexture|DataTexture|Data3DTexture>}
   */
  _createTexture(s) {
    return Me(this, arguments, function* (A, e = {}) {
      const t = hn(new Uint8Array(A));
      if (t.vkFormat !== cn)
        return un(t);
      const i = e, n = this.init().then(() => this.workerPool.postMessage({ type: "transcode", buffer: A, taskConfig: i }, [A])).then((o) => this._createTextureFrom(o.data, t));
      return ve.set(A, { promise: n }), n;
    });
  }
  dispose() {
    return this.workerPool.dispose(), this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL), We--, this;
  }
}
v.BasisFormat = {
  ETC1S: 0,
  UASTC_4x4: 1
};
v.TranscoderFormat = {
  ETC1: 0,
  ETC2: 1,
  BC1: 2,
  BC3: 3,
  BC4: 4,
  BC5: 5,
  BC7_M6_OPAQUE_ONLY: 6,
  BC7_M5: 7,
  PVRTC1_4_RGB: 8,
  PVRTC1_4_RGBA: 9,
  ASTC_4x4: 10,
  ATC_RGB: 11,
  ATC_RGBA_INTERPOLATED_ALPHA: 12,
  RGBA32: 13,
  RGB565: 14,
  BGR565: 15,
  RGBA4444: 16
};
v.EngineFormat = {
  RGBAFormat: RA,
  RGBA_ASTC_4x4_Format: ni,
  RGBA_BPTC_Format: oi,
  RGBA_ETC2_EAC_Format: Bi,
  RGBA_PVRTC_4BPPV1_Format: ri,
  RGBA_S3TC_DXT5_Format: Ci,
  RGB_ETC1_Format: ai,
  RGB_ETC2_Format: Ii,
  RGB_PVRTC_4BPPV1_Format: gi,
  RGB_S3TC_DXT1_Format: Ei
};
v.BasisWorker = function() {
  let a, A, e;
  const s = _EngineFormat, t = _TranscoderFormat, i = _BasisFormat;
  self.addEventListener("message", function(l) {
    const h = l.data;
    switch (h.type) {
      case "init":
        a = h.config, n(h.transcoderBinary);
        break;
      case "transcode":
        A.then(() => {
          try {
            const { faces: E, buffers: d, width: f, height: D, hasAlpha: F, format: p, dfdFlags: m } = o(h.buffer);
            self.postMessage({ type: "transcode", id: h.id, faces: E, width: f, height: D, hasAlpha: F, format: p, dfdFlags: m }, d);
          } catch (E) {
            console.error(E), self.postMessage({ type: "error", id: h.id, error: E.message });
          }
        });
        break;
    }
  });
  function n(l) {
    A = new Promise((h) => {
      e = { wasmBinary: l, onRuntimeInitialized: h }, BASIS(e);
    }).then(() => {
      e.initializeBasis(), e.KTX2File === void 0 && console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.");
    });
  }
  function o(l) {
    const h = new e.KTX2File(new Uint8Array(l));
    function E() {
      h.close(), h.delete();
    }
    if (!h.isValid())
      throw E(), new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");
    const d = h.isUASTC() ? i.UASTC_4x4 : i.ETC1S, f = h.getWidth(), D = h.getHeight(), F = h.getLayers() || 1, p = h.getLevels(), m = h.getFaces(), M = h.getHasAlpha(), _ = h.getDFDFlags(), { transcoderFormat: y, engineFormat: W } = r(d, f, D, M);
    if (!f || !D || !p)
      throw E(), new Error("THREE.KTX2Loader:	Invalid texture");
    if (!h.startTranscoding())
      throw E(), new Error("THREE.KTX2Loader: .startTranscoding failed");
    const OA = [], Ge = [];
    for (let cA = 0; cA < m; cA++) {
      const Re = [];
      for (let eA = 0; eA < p; eA++) {
        const pe = [];
        let S, T;
        for (let V = 0; V < F; V++) {
          const GA = h.getImageLevelInfo(eA, V, cA);
          cA === 0 && eA === 0 && V === 0 && (GA.origWidth % 4 !== 0 || GA.origHeight % 4 !== 0) && console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."), p > 1 ? (S = GA.origWidth, T = GA.origHeight) : (S = GA.width, T = GA.height);
          const Et = new Uint8Array(h.getImageTranscodedSizeInBytes(eA, V, 0, y));
          if (!h.transcodeImage(Et, eA, V, cA, y, 0, -1, -1))
            throw E(), new Error("THREE.KTX2Loader: .transcodeImage failed.");
          pe.push(Et);
        }
        const _A = Q(pe);
        Re.push({ data: _A, width: S, height: T }), Ge.push(_A.buffer);
      }
      OA.push({ mipmaps: Re, width: f, height: D, format: W });
    }
    return E(), { faces: OA, buffers: Ge, width: f, height: D, hasAlpha: M, format: W, dfdFlags: _ };
  }
  const B = [
    {
      if: "astcSupported",
      basisFormat: [i.UASTC_4x4],
      transcoderFormat: [t.ASTC_4x4, t.ASTC_4x4],
      engineFormat: [s.RGBA_ASTC_4x4_Format, s.RGBA_ASTC_4x4_Format],
      priorityETC1S: 1 / 0,
      priorityUASTC: 1,
      needsPowerOfTwo: !1
    },
    {
      if: "bptcSupported",
      basisFormat: [i.ETC1S, i.UASTC_4x4],
      transcoderFormat: [t.BC7_M5, t.BC7_M5],
      engineFormat: [s.RGBA_BPTC_Format, s.RGBA_BPTC_Format],
      priorityETC1S: 3,
      priorityUASTC: 2,
      needsPowerOfTwo: !1
    },
    {
      if: "dxtSupported",
      basisFormat: [i.ETC1S, i.UASTC_4x4],
      transcoderFormat: [t.BC1, t.BC3],
      engineFormat: [s.RGB_S3TC_DXT1_Format, s.RGBA_S3TC_DXT5_Format],
      priorityETC1S: 4,
      priorityUASTC: 5,
      needsPowerOfTwo: !1
    },
    {
      if: "etc2Supported",
      basisFormat: [i.ETC1S, i.UASTC_4x4],
      transcoderFormat: [t.ETC1, t.ETC2],
      engineFormat: [s.RGB_ETC2_Format, s.RGBA_ETC2_EAC_Format],
      priorityETC1S: 1,
      priorityUASTC: 3,
      needsPowerOfTwo: !1
    },
    {
      if: "etc1Supported",
      basisFormat: [i.ETC1S, i.UASTC_4x4],
      transcoderFormat: [t.ETC1],
      engineFormat: [s.RGB_ETC1_Format],
      priorityETC1S: 2,
      priorityUASTC: 4,
      needsPowerOfTwo: !1
    },
    {
      if: "pvrtcSupported",
      basisFormat: [i.ETC1S, i.UASTC_4x4],
      transcoderFormat: [t.PVRTC1_4_RGB, t.PVRTC1_4_RGBA],
      engineFormat: [s.RGB_PVRTC_4BPPV1_Format, s.RGBA_PVRTC_4BPPV1_Format],
      priorityETC1S: 5,
      priorityUASTC: 6,
      needsPowerOfTwo: !0
    }
  ], C = B.sort(function(l, h) {
    return l.priorityETC1S - h.priorityETC1S;
  }), I = B.sort(function(l, h) {
    return l.priorityUASTC - h.priorityUASTC;
  });
  function r(l, h, E, d) {
    let f, D;
    const F = l === i.ETC1S ? C : I;
    for (let p = 0; p < F.length; p++) {
      const m = F[p];
      if (a[m.if] && m.basisFormat.includes(l) && !(d && m.transcoderFormat.length < 2) && !(m.needsPowerOfTwo && !(c(h) && c(E))))
        return f = m.transcoderFormat[d ? 1 : 0], D = m.engineFormat[d ? 1 : 0], { transcoderFormat: f, engineFormat: D };
    }
    return console.warn("THREE.KTX2Loader: No suitable compressed texture format found. Decoding to RGBA32."), f = t.RGBA32, D = s.RGBAFormat, { transcoderFormat: f, engineFormat: D };
  }
  function c(l) {
    return l <= 2 ? !0 : (l & l - 1) === 0 && l !== 0;
  }
  function Q(l) {
    if (l.length === 1)
      return l[0];
    let h = 0;
    for (let f = 0; f < l.length; f++) {
      const D = l[f];
      h += D.byteLength;
    }
    const E = new Uint8Array(h);
    let d = 0;
    for (let f = 0; f < l.length; f++) {
      const D = l[f];
      E.set(D, d), d += D.byteLength;
    }
    return E;
  }
};
const dn = /* @__PURE__ */ new Set([RA, XA, vA]), je = {
  [rs]: RA,
  [ns]: RA,
  [es]: RA,
  [ts]: RA,
  [Bs]: XA,
  [is]: XA,
  [$t]: XA,
  [As]: XA,
  [os]: vA,
  [ss]: vA,
  [zt]: vA,
  [Zt]: vA,
  [as]: Gt,
  [Cs]: Gt
}, Ze = {
  [rs]: ye,
  [ns]: Je,
  [es]: b,
  [ts]: b,
  [Bs]: ye,
  [is]: Je,
  [$t]: b,
  [As]: b,
  [os]: ye,
  [ss]: Je,
  [zt]: b,
  [Zt]: b,
  [as]: b,
  [Cs]: b
};
function un(a) {
  return Me(this, null, function* () {
    const { vkFormat: A } = a;
    if (je[A] === void 0)
      throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");
    let e;
    a.supercompressionScheme === yt && (Ve || (Ve = new Promise((i) => Me(this, null, function* () {
      const n = new ln();
      yield n.init(), i(n);
    }))), e = yield Ve);
    const s = [];
    for (let i = 0; i < a.levels.length; i++) {
      const n = Math.max(1, a.pixelWidth >> i), o = Math.max(1, a.pixelHeight >> i), B = a.pixelDepth ? Math.max(1, a.pixelDepth >> i) : 0, C = a.levels[i];
      let I;
      if (a.supercompressionScheme === Cn)
        I = C.levelData;
      else if (a.supercompressionScheme === yt)
        I = e.decode(C.levelData, C.uncompressedByteLength);
      else
        throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");
      let r;
      Ze[A] === ye ? r = new Float32Array(
        I.buffer,
        I.byteOffset,
        I.byteLength / Float32Array.BYTES_PER_ELEMENT
      ) : Ze[A] === Je ? r = new Uint16Array(
        I.buffer,
        I.byteOffset,
        I.byteLength / Uint16Array.BYTES_PER_ELEMENT
      ) : r = I, s.push({
        data: r,
        width: n,
        height: o,
        depth: B
      });
    }
    let t;
    if (dn.has(je[A]))
      t = a.pixelDepth === 0 ? new ci(s[0].data, a.pixelWidth, a.pixelHeight) : new Qi(s[0].data, a.pixelWidth, a.pixelHeight, a.pixelDepth);
    else {
      if (a.pixelDepth > 0)
        throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");
      t = new Xt(s, a.pixelWidth, a.pixelHeight);
    }
    return t.mipmaps = s, t.type = Ze[A], t.format = je[A], t.colorSpace = Is(a), t.needsUpdate = !0, Promise.resolve(t);
  });
}
function Is(a) {
  const A = a.dataFormatDescriptor[0];
  return A.colorPrimaries === gn ? A.transferFunction === Jt ? $ : O : A.colorPrimaries === En ? A.transferFunction === Jt ? hi : li : A.colorPrimaries === In ? Ft : (console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${A.colorPrimaries}"`), Ft);
}
let Le;
const fn = () => {
  if (Le)
    return Le;
  const a = "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", A = "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", e = new Uint8Array([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    4,
    1,
    96,
    0,
    0,
    3,
    3,
    2,
    0,
    0,
    5,
    3,
    1,
    0,
    1,
    12,
    1,
    0,
    10,
    22,
    2,
    12,
    0,
    65,
    0,
    65,
    0,
    65,
    0,
    252,
    10,
    0,
    0,
    11,
    7,
    0,
    65,
    0,
    253,
    15,
    26,
    11
  ]), s = new Uint8Array([
    32,
    0,
    65,
    253,
    3,
    1,
    2,
    34,
    4,
    106,
    6,
    5,
    11,
    8,
    7,
    20,
    13,
    33,
    12,
    16,
    128,
    9,
    116,
    64,
    19,
    113,
    127,
    15,
    10,
    21,
    22,
    14,
    255,
    66,
    24,
    54,
    136,
    107,
    18,
    23,
    192,
    26,
    114,
    118,
    132,
    17,
    77,
    101,
    130,
    144,
    27,
    87,
    131,
    44,
    45,
    74,
    156,
    154,
    70,
    167
  ]);
  if (typeof WebAssembly != "object")
    return {
      supported: !1
    };
  let t = a;
  WebAssembly.validate(e) && (t = A);
  let i;
  const n = WebAssembly.instantiate(o(t), {}).then((r) => {
    i = r.instance, i.exports.__wasm_call_ctors();
  });
  function o(r) {
    const c = new Uint8Array(r.length);
    for (let l = 0; l < r.length; ++l) {
      const h = r.charCodeAt(l);
      c[l] = h > 96 ? h - 71 : h > 64 ? h - 65 : h > 47 ? h + 4 : h > 46 ? 63 : 62;
    }
    let Q = 0;
    for (let l = 0; l < r.length; ++l)
      c[Q++] = c[l] < 60 ? s[c[l]] : (c[l] - 60) * 64 + c[++l];
    return c.buffer.slice(0, Q);
  }
  function B(r, c, Q, l, h, E) {
    const d = i.exports.sbrk, f = Q + 3 & -4, D = d(f * l), F = d(h.length), p = new Uint8Array(i.exports.memory.buffer);
    p.set(h, F);
    const m = r(D, Q, l, F, h.length);
    if (m === 0 && E && E(D, f, l), c.set(p.subarray(D, D + Q * l)), d(D - d(0)), m !== 0)
      throw new Error(`Malformed buffer data: ${m}`);
  }
  const C = {
    // legacy index-based enums for glTF
    0: "",
    1: "meshopt_decodeFilterOct",
    2: "meshopt_decodeFilterQuat",
    3: "meshopt_decodeFilterExp",
    // string-based enums for glTF
    NONE: "",
    OCTAHEDRAL: "meshopt_decodeFilterOct",
    QUATERNION: "meshopt_decodeFilterQuat",
    EXPONENTIAL: "meshopt_decodeFilterExp"
  }, I = {
    // legacy index-based enums for glTF
    0: "meshopt_decodeVertexBuffer",
    1: "meshopt_decodeIndexBuffer",
    2: "meshopt_decodeIndexSequence",
    // string-based enums for glTF
    ATTRIBUTES: "meshopt_decodeVertexBuffer",
    TRIANGLES: "meshopt_decodeIndexBuffer",
    INDICES: "meshopt_decodeIndexSequence"
  };
  return Le = {
    ready: n,
    supported: !0,
    decodeVertexBuffer(r, c, Q, l, h) {
      B(
        i.exports.meshopt_decodeVertexBuffer,
        r,
        c,
        Q,
        l,
        i.exports[C[h]]
      );
    },
    decodeIndexBuffer(r, c, Q, l) {
      B(i.exports.meshopt_decodeIndexBuffer, r, c, Q, l);
    },
    decodeIndexSequence(r, c, Q, l) {
      B(i.exports.meshopt_decodeIndexSequence, r, c, Q, l);
    },
    decodeGltfBuffer(r, c, Q, l, h, E) {
      B(
        i.exports[I[h]],
        r,
        c,
        Q,
        l,
        i.exports[C[E]]
      );
    }
  }, Le;
};
var LA, te, se, ie;
class Dn {
  constructor() {
    u(this, LA, new pi());
    u(this, te, new on().setDecoderPath(
      `${w.CDNVersion}/examples/jsm/libs/draco/gltf/`
    ));
    u(this, se, new v().setTranscoderPath(
      `${w.CDNVersion}/examples/jsm/libs/basis/`
    ));
    u(this, ie, !1);
    g(this, LA).setCrossOrigin("anonymous").setDRACOLoader(g(this, te)).setMeshoptDecoder(fn);
  }
  get gltfLoader() {
    return g(this, LA);
  }
  get dracoLoader() {
    return g(this, te);
  }
  get ktx2Loader() {
    return g(this, se);
  }
  load(...A) {
    g(this, ie) || (g(this, LA).setKTX2Loader(g(this, se).detectSupport(w.webglRenderer)), G(this, ie, !0)), this.gltfLoader.load(...A);
  }
}
LA = new WeakMap(), te = new WeakMap(), se = new WeakMap(), ie = new WeakMap();
const Fn = new Dn();
var J, z, ne;
class jn {
  constructor(A) {
    u(this, J, null);
    u(this, z, []);
    u(this, ne, () => {
      const A = g(this, J).position.x - g(this, J).left, e = g(this, J).position.y - g(this, J).top;
      g(this, z)[0].constant = g(this, J).scale.y / 2 + e * -1, g(this, z)[1].constant = g(this, J).scale.y / 2 + e, g(this, z)[2].constant = g(this, J).scale.x / 2 + A, g(this, z)[3].constant = g(this, J).scale.x / 2 + A * -1;
    });
    G(this, J, new Kt(A, { cartesian: !1 })), G(this, z, [
      new we(new K(0, -1, 0)),
      new we(new K(0, 1, 0)),
      new we(new K(-1, 0, 0)),
      new we(new K(1, 0, 0))
    ]), KA.subscribe(g(this, ne), { order: Bt.LAYOUT_BOX });
  }
  get planes() {
    return g(this, z);
  }
  get layoutBox() {
    return g(this, J);
  }
  destroy() {
    KA.unsubscribe(g(this, ne)), g(this, J).destroy();
  }
}
J = new WeakMap(), z = new WeakMap(), ne = new WeakMap();
class Zn extends jA {
  constructor(A, e = 500) {
    super(), this.add(new Se(A.planes[0], e, 16711680)), this.add(new Se(A.planes[1], e, 16711680)), this.add(new Se(A.planes[2], e, 16711680)), this.add(new Se(A.planes[3], e, 16711680));
  }
}
var yA, uA, JA, oe, Be, BA, HA, re;
class gs extends Fi {
  constructor(e) {
    super(e);
    u(this, yA, new pt(null));
    u(this, uA, new pt(void 0));
    u(this, JA, void 0);
    u(this, oe, void 0);
    u(this, Be, void 0);
    u(this, BA, void 0);
    u(this, HA, !1);
    u(this, re, () => {
      if (!(g(this, BA) && !g(this, HA)) && (this.current !== this.previous && (g(this, yA).current = null), this.current)) {
        const e = g(this, Be) ? this.current.url : this.current.name + this.current.extension;
        g(this, BA) || be.setTotal(e, 1), g(this, uA).current = "start", g(this, oe).load(
          e,
          (s) => {
            g(this, yA).current = s, g(this, uA).current = "complete", g(this, BA) || be.setLoaded(e, 1);
          },
          void 0,
          () => {
            g(this, BA) || (g(this, uA).current = "error", be.setError(e, e));
          }
        );
      }
    });
    G(this, JA, e.consumer), G(this, oe, e.loader), G(this, Be, e.keepSourceParameters || !1), G(this, BA, e.lazy || !1), this.subscribe(g(this, re)), g(this, JA).addEventListener("added", () => {
      this.connect();
    }), g(this, JA).addEventListener("removed", () => {
      this.disconnect();
    });
  }
  /**
   * Resource store.
   */
  get data() {
    return g(this, yA);
  }
  /**
   * Loading store.
   */
  get loading() {
    return g(this, uA);
  }
  /**
   * Calling this method will start loading the resource.
   */
  lazyLoad() {
    g(this, HA) || (G(this, HA, !0), g(this, re).call(this));
  }
}
yA = new WeakMap(), uA = new WeakMap(), JA = new WeakMap(), oe = new WeakMap(), Be = new WeakMap(), BA = new WeakMap(), HA = new WeakMap(), re = new WeakMap();
var TA;
class zn extends jA {
  constructor(e) {
    super();
    u(this, TA, void 0);
    G(this, TA, new gs(tA({
      loader: Fn,
      consumer: this
    }, e))), g(this, TA).data.subscribe((s) => {
      s.current ? this.add(...s.current.scene.children) : this.children.forEach((t) => {
        this.remove(t), vt(t);
      });
    });
  }
  get sourceManager() {
    return g(this, TA);
  }
}
TA = new WeakMap();
function Es(a, A, e) {
  const s = A.x, t = A.y, i = e || a.image.width / a.image.height;
  let n = 0, o = 0, B = a.offset.x, C = a.offset.y, I = a.rotation, r = a.center.x, c = a.center.y;
  s / t > i ? (n = 1, o = t / s * i) : (o = 1, n = s / t / i), a.matrix.setUvTransform(B, C, n, o, I, r, c);
}
var rA, UA, fA;
class cs extends Fe {
  constructor(e) {
    super(
      new di(
        e.width,
        e.height,
        e.widthSegments,
        e.heightSegments
      ),
      e.material
    );
    u(this, rA, void 0);
    u(this, UA, void 0);
    u(this, fA, () => {
      g(this, rA).data.current && g(this, UA) && this.onCoverResize(g(this, rA).data.current);
    });
    G(this, rA, new gs(tA({
      consumer: this
    }, e))), G(this, UA, e.cover || !1), this.addEventListener("added", () => {
      kA.subscribe(g(this, fA));
    }), this.addEventListener("removed", () => {
      kA.unsubscribe(g(this, fA));
    }), g(this, rA).data.subscribe((s) => {
      !s.current && s.previous ? s.previous.dispose() : s.current && this.material && (g(this, UA) && (s.current.matrixAutoUpdate = !1), s.current.colorSpace = $, s.current.center.set(0.5, 0.5), this.material.map = s.current, this.material.needsUpdate = !0, g(this, fA).call(this));
    });
  }
  get sourceManager() {
    return g(this, rA);
  }
  updateTexture() {
    g(this, fA).call(this);
  }
  onCoverResize(e) {
    Es(e, {
      x: this.scale.x,
      y: this.scale.y
    });
  }
}
rA = new WeakMap(), UA = new WeakMap(), fA = new WeakMap();
const Gn = new _t();
class $n extends cs {
  constructor(A) {
    super(me(tA({}, A), {
      loader: Gn
    }));
  }
}
class Rn {
  load(...A) {
    const e = A[0], s = A[1], t = A[3], i = document.createElement("video");
    i.src = e, i.onloadeddata = () => {
      s(new ui(i)), i.onerror = null, i.onloadeddata = null;
    }, i.onerror = () => {
      t == null || t(e), i.onerror = null, i.onloadeddata = null;
    };
  }
}
var Ce, ae, Ie;
class Ao extends cs {
  constructor(e) {
    super(me(tA({}, e), {
      loader: new Rn()
    }));
    u(this, Ce, void 0);
    u(this, ae, void 0);
    u(this, Ie, void 0);
    G(this, Ce, e.autoplay || !1), G(this, ae, e.muted || !1), G(this, Ie, e.loop || !1), this.sourceManager.data.subscribe((s) => {
      if (s.current) {
        const t = s.current.image;
        g(this, ae) && (t.muted = !0), g(this, Ie) && (t.loop = !0), g(this, Ce) && t.play();
      }
    });
  }
  onCoverResize(e) {
    const s = e.image;
    Es(
      e,
      {
        x: this.scale.x,
        y: this.scale.y
      },
      s.videoWidth / s.videoHeight
    );
  }
}
Ce = new WeakMap(), ae = new WeakMap(), Ie = new WeakMap();
function eo(a, A) {
  a.traverse((e) => {
    e instanceof Fe && A(e);
  });
}
function to(a, A) {
  a.traverse((e) => {
    e instanceof Fe && e.material && (Array.isArray(e.material) ? e.material : [e.material]).forEach(A);
  });
}
const Ut = new K(), pn = new at(), Nt = new K();
class mn extends It {
  constructor(A = document.createElement("div")) {
    super(), this.isCSS3DObject = !0, this.element = A, this.element.style.position = "absolute", this.element.style.pointerEvents = "auto", this.element.style.userSelect = "none", this.element.setAttribute("draggable", !1), this.addEventListener("removed", function() {
      this.traverse(function(e) {
        e.element instanceof Element && e.element.parentNode !== null && e.element.parentNode.removeChild(e.element);
      });
    });
  }
  copy(A, e) {
    return super.copy(A, e), this.element = A.element.cloneNode(!0), this;
  }
}
const P = new bA(), Mn = new bA();
class wn {
  constructor(A = {}) {
    const e = this;
    let s, t, i, n;
    const o = {
      camera: { style: "" },
      objects: /* @__PURE__ */ new WeakMap()
    }, B = A.element !== void 0 ? A.element : document.createElement("div");
    B.style.overflow = "hidden", this.domElement = B;
    const C = document.createElement("div");
    C.style.transformOrigin = "0 0", C.style.pointerEvents = "none", B.appendChild(C);
    const I = document.createElement("div");
    I.style.transformStyle = "preserve-3d", C.appendChild(I), this.getSize = function() {
      return {
        width: s,
        height: t
      };
    }, this.render = function(h, E) {
      const d = E.projectionMatrix.elements[5] * n;
      E.view && E.view.enabled ? (C.style.transform = `translate( ${-E.view.offsetX * (s / E.view.width)}px, ${-E.view.offsetY * (t / E.view.height)}px )`, C.style.transform += `scale( ${E.view.fullWidth / E.view.width}, ${E.view.fullHeight / E.view.height} )`) : C.style.transform = "", h.matrixWorldAutoUpdate === !0 && h.updateMatrixWorld(), E.parent === null && E.matrixWorldAutoUpdate === !0 && E.updateMatrixWorld();
      let f, D;
      E.isOrthographicCamera && (f = -(E.right + E.left) / 2, D = (E.top + E.bottom) / 2);
      const F = E.view && E.view.enabled ? E.view.height / E.view.fullHeight : 1, p = E.isOrthographicCamera ? `scale( ${F} )scale(` + d + ")translate(" + r(f) + "px," + r(D) + "px)" + c(E.matrixWorldInverse) : `scale( ${F} )translateZ(` + d + "px)" + c(E.matrixWorldInverse), M = (E.isPerspectiveCamera ? "perspective(" + d + "px) " : "") + p + "translate(" + i + "px," + n + "px)";
      o.camera.style !== M && (I.style.transform = M, o.camera.style = M), l(h, h, E);
    }, this.setSize = function(h, E) {
      s = h, t = E, i = s / 2, n = t / 2, B.style.width = h + "px", B.style.height = E + "px", C.style.width = h + "px", C.style.height = E + "px", I.style.width = h + "px", I.style.height = E + "px";
    };
    function r(h) {
      return Math.abs(h) < 1e-10 ? 0 : h;
    }
    function c(h) {
      const E = h.elements;
      return "matrix3d(" + r(E[0]) + "," + r(-E[1]) + "," + r(E[2]) + "," + r(E[3]) + "," + r(E[4]) + "," + r(-E[5]) + "," + r(E[6]) + "," + r(E[7]) + "," + r(E[8]) + "," + r(-E[9]) + "," + r(E[10]) + "," + r(E[11]) + "," + r(E[12]) + "," + r(-E[13]) + "," + r(E[14]) + "," + r(E[15]) + ")";
    }
    function Q(h) {
      const E = h.elements;
      return "translate(-50%,-50%)" + ("matrix3d(" + r(E[0]) + "," + r(E[1]) + "," + r(E[2]) + "," + r(E[3]) + "," + r(-E[4]) + "," + r(-E[5]) + "," + r(-E[6]) + "," + r(-E[7]) + "," + r(E[8]) + "," + r(E[9]) + "," + r(E[10]) + "," + r(E[11]) + "," + r(E[12]) + "," + r(E[13]) + "," + r(E[14]) + "," + r(E[15]) + ")");
    }
    function l(h, E, d, f) {
      if (h.isCSS3DObject) {
        const D = h.visible === !0 && h.layers.test(d.layers) === !0;
        if (h.element.style.display = D === !0 ? "" : "none", D === !0) {
          h.onBeforeRender(e, E, d);
          let F;
          h.isCSS3DSprite ? (P.copy(d.matrixWorldInverse), P.transpose(), h.rotation2D !== 0 && P.multiply(Mn.makeRotationZ(h.rotation2D)), h.matrixWorld.decompose(Ut, pn, Nt), P.setPosition(Ut), P.scale(Nt), P.elements[3] = 0, P.elements[7] = 0, P.elements[11] = 0, P.elements[15] = 1, F = Q(P)) : F = Q(h.matrixWorld);
          const p = h.element, m = o.objects.get(h);
          if (m === void 0 || m.style !== F) {
            p.style.transform = F;
            const M = { style: F };
            o.objects.set(h, M);
          }
          p.parentNode !== I && I.appendChild(p), h.onAfterRender(e, E, d);
        }
      }
      for (let D = 0, F = h.children.length; D < F; D++)
        l(h.children[D], E, d);
    }
  }
}
var X, Ne, Qs, ge, Ee;
const U = class U extends mn {
  static destroy() {
    kA.unsubscribe(g(this, Ee)), KA.unsubscribe(g(this, ge)), G(this, X, null);
  }
  constructor(A) {
    var e;
    super(A.element), g(U, X) || QA(e = U, Ne, Qs).call(e);
  }
};
X = new WeakMap(), Ne = new WeakSet(), Qs = function() {
  G(U, X, new wn()), g(U, X).domElement.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
      overflow: hidden;
    `, w.containerElement.prepend(g(U, X).domElement), kA.subscribe(g(this, Ee), bt.EN3 + 1), KA.subscribe(g(this, ge), { order: Bt.EN3 + 1 });
}, ge = new WeakMap(), Ee = new WeakMap(), u(U, Ne), u(U, X, null), u(U, ge, () => {
  g(U, X).render(w.scene, w.camera);
}), u(U, Ee, () => {
  g(U, X).setSize(w.width, w.height);
});
let xt = U;
var NA, ce, Qe, CA, he;
class Sn {
  constructor(A) {
    u(this, NA, void 0);
    u(this, ce, void 0);
    u(this, Qe, void 0);
    u(this, CA, void 0);
    u(this, he, void 0);
    Qt(this, "intersection");
    G(this, NA, A.targetName || void 0), G(this, ce, A.eventDispatcher || A.object3D), G(this, Qe, A.propagation || !1), G(this, CA, A.object3D), G(this, he, g(this, NA) ? () => g(this, CA).getObjectByName(g(this, NA)) || g(this, CA) : () => g(this, CA));
  }
  get object3D() {
    return g(this, CA);
  }
  get eventDispatcher() {
    return g(this, ce);
  }
  get propagation() {
    return g(this, Qe);
  }
  get target() {
    return g(this, he).call(this);
  }
  dispatch(A, e) {
    this.eventDispatcher.dispatchEvent(tA({
      originalEvent: e,
      type: A
    }, this.intersection));
  }
}
NA = new WeakMap(), ce = new WeakMap(), Qe = new WeakMap(), CA = new WeakMap(), he = new WeakMap();
var DA, aA, H, xA, le, de, ue, fe;
const lA = class lA {
  constructor() {
    u(this, aA, []);
    u(this, H, []);
    u(this, xA, new Ct());
    u(this, le, new fi());
    u(this, de, (A) => {
      for (let e = 0; e < g(this, H).length; e++)
        g(this, H)[e].dispatch("en3-pointerdown", A);
    });
    u(this, ue, (A) => {
      for (let e = 0; e < g(this, H).length; e++)
        g(this, H)[e].dispatch("en3-pointerup", A);
    });
    u(this, fe, (A) => {
      g(this, xA).x = A.clientX / w.width * 2 - 1, g(this, xA).y = -(A.clientY / w.height) * 2 + 1, w.camera && g(this, le).setFromCamera(g(this, xA), w.camera);
      const e = [];
      for (const o of g(this, aA)) {
        const B = g(this, le).intersectObject(o.target);
        B.length && (o.intersection = B[0], e.push(o));
      }
      let s = !1;
      const t = g(this, H).filter(
        (o) => !e.find((B) => B.object3D.uuid === o.object3D.uuid)
      ), i = e.sort((o, B) => B.object3D.position.z - o.object3D.position.z).filter((o) => s ? !1 : (s = !o.propagation, !0)), n = i.filter(
        (o) => !g(this, H).find((B) => B.object3D.uuid === o.object3D.uuid)
      );
      for (let o = 0; o < t.length; o++)
        t[o].dispatch("en3-pointerleave", A);
      for (let o = 0; o < n.length; o++)
        n[o].dispatch("en3-pointerenter", A);
      G(this, H, i);
      for (let o = 0; o < g(this, H).length; o++)
        g(this, H)[o].dispatch("en3-pointermove", A);
    });
    if (g(lA, DA))
      return g(lA, DA);
    G(lA, DA, this), w.containerElement.addEventListener("pointerdown", g(this, de)), w.containerElement.addEventListener("pointerup", g(this, ue)), w.containerElement.addEventListener("pointermove", g(this, fe));
  }
  destroy() {
    w.containerElement.removeEventListener("pointerdown", g(this, de)), w.containerElement.removeEventListener("pointerup", g(this, ue)), w.containerElement.removeEventListener("pointermove", g(this, fe)), G(lA, DA, void 0);
  }
  add(A, e) {
    if (g(this, aA).find((t) => t.object3D.uuid === A.uuid))
      return;
    const s = new Sn(tA({
      object3D: A
    }, e));
    g(this, aA).push(s);
  }
  remove(A) {
    G(this, aA, g(this, aA).filter((e) => e.object3D.uuid !== A.uuid)), G(this, H, g(this, H).filter((e) => e.object3D.uuid !== A.uuid));
  }
};
DA = new WeakMap(), aA = new WeakMap(), H = new WeakMap(), xA = new WeakMap(), le = new WeakMap(), de = new WeakMap(), ue = new WeakMap(), fe = new WeakMap(), u(lA, DA, void 0);
let kt = lA;
var IA, gA, De, ot;
class so {
  constructor(A) {
    u(this, De);
    u(this, IA, void 0);
    u(this, gA, void 0);
    G(this, IA, A.material), G(this, gA, A.uniforms || {}), g(this, IA).userData.uniforms = g(this, gA);
    let e;
    const s = () => {
      e == null || e();
    };
    g(this, IA).addEventListener("dispose", s), g(this, IA).onBeforeCompile = (t) => {
      var i;
      e == null || e();
      for (const n in g(this, gA))
        t.uniforms[n] = g(this, gA)[n];
      A.vertextDeclarations && (t.vertexShader = `
          ${A.vertextDeclarations}
          ${t.vertexShader}
        `), A.fragmentDeclarations && (t.fragmentShader = `
          ${A.fragmentDeclarations}
          ${t.fragmentShader}
        `), QA(this, De, ot).call(this, t, "vertex", A), QA(this, De, ot).call(this, t, "fragment", A), e = (i = A.onReady) == null ? void 0 : i.call(A, this), A.log && (console.log("VERTEX SHADER: ", t.vertexShader), console.log("FRAGMENT SHADER: ", t.fragmentShader));
    };
  }
  get material() {
    return g(this, IA);
  }
  get uniforms() {
    return g(this, gA);
  }
}
IA = new WeakMap(), gA = new WeakMap(), De = new WeakSet(), ot = function(A, e, s) {
  const t = e === "vertex" ? "vertexChunk" : "fragmentChunk", i = e === "vertex" ? "vertexShader" : "fragmentShader";
  s[t] && (s[t].replace ? A[i] = A[i].replace(
    `#include <${s[t].replace}>`,
    s[t].content
  ) : s[t].update && (A[i] = A[i].replace(
    `#include <${s[t].update}>`,
    `
            #include <${s[t].update}>
            ${s[t].content}
          `
  )));
};
export {
  jn as En3Clip,
  Zn as En3ClipHelpers,
  zn as En3GLTF,
  xt as En3HTML,
  $n as En3Image,
  cs as En3ImageLike,
  so as En3ModifiedMaterial,
  kt as En3Raycaster,
  gs as En3SourceManager,
  Ao as En3Video,
  Es as coverTexture,
  vt as dispose,
  w as en3,
  Fn as en3GLTFLoader,
  Vn as en3LazyLoader,
  to as traverseMaterials,
  eo as traverseMeshes
};
