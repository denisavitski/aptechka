var cs = Object.defineProperty, Qs = Object.defineProperties;
var hs = Object.getOwnPropertyDescriptors;
var Et = Object.getOwnPropertySymbols;
var ls = Object.prototype.hasOwnProperty, ds = Object.prototype.propertyIsEnumerable;
var ct = (C, A, e) => A in C ? cs(C, A, { enumerable: !0, configurable: !0, writable: !0, value: e }) : C[A] = e, tA = (C, A) => {
  for (var e in A || (A = {}))
    ls.call(A, e) && ct(C, e, A[e]);
  if (Et)
    for (var e of Et(A))
      ds.call(A, e) && ct(C, e, A[e]);
  return C;
}, me = (C, A) => Qs(C, hs(A));
var xe = (C, A, e) => {
  if (!A.has(C))
    throw TypeError("Cannot " + e);
};
var g = (C, A, e) => (xe(C, A, "read from private field"), e ? e.call(C) : A.get(C)), u = (C, A, e) => {
  if (A.has(C))
    throw TypeError("Cannot add the same private member more than once");
  A instanceof WeakSet ? A.add(C) : A.set(C, e);
}, G = (C, A, e, s) => (xe(C, A, "write to private field"), s ? s.call(C, e) : A.set(C, e), e);
var QA = (C, A, e) => (xe(C, A, "access private method"), e);
var _A = (C, A, e) => new Promise((s, t) => {
  var i = (o) => {
    try {
      B(e.next(o));
    } catch (r) {
      t(r);
    }
  }, n = (o) => {
    try {
      B(e.throw(o));
    } catch (r) {
      t(r);
    }
  }, B = (o) => o.done ? s(o.value) : Promise.resolve(o.value).then(i, n);
  B((e = e.apply(C, A)).next());
});
import { Ladder as Qt } from "../ladder/index.js";
import { LayoutBox as xt } from "../layout-box/index.js";
import { RESIZE_ORDER as kt, TICK_ORDER as ot } from "../order/index.js";
import { windowResizer as xA } from "../window-resizer/index.js";
import { ticker as kA } from "../ticker/index.js";
import { Mesh as Fe, REVISION as us, OrthographicCamera as He, PerspectiveCamera as ze, Scene as fs, WebGLRenderer as Ds, TrianglesDrawMode as Fs, TriangleFanDrawMode as $e, TriangleStripDrawMode as bt, Loader as Bt, LoaderUtils as WA, FileLoader as fA, Color as EA, LinearSRGBColorSpace as O, SpotLight as Gs, PointLight as Rs, DirectionalLight as ps, MeshBasicMaterial as qA, SRGBColorSpace as $, MeshPhysicalMaterial as AA, Vector2 as rt, Matrix4 as bA, Vector3 as y, Quaternion as at, InstancedMesh as ms, InstancedBufferAttribute as Ms, Object3D as Ct, TextureLoader as Kt, ImageBitmapLoader as ws, BufferAttribute as VA, InterleavedBuffer as Ss, InterleavedBufferAttribute as Ls, LinearFilter as Je, LinearMipmapLinearFilter as It, RepeatWrapping as At, PointsMaterial as ys, Material as ke, LineBasicMaterial as Hs, MeshStandardMaterial as Ot, DoubleSide as Js, PropertyBinding as Ts, BufferGeometry as _t, SkinnedMesh as Us, LineSegments as Ns, Line as xs, LineLoop as ks, Points as bs, Group as jA, MathUtils as Ks, Skeleton as Os, AnimationClip as _s, Bone as Ps, InterpolateLinear as Pt, ColorManagement as ht, NearestFilter as Ys, NearestMipmapNearestFilter as qs, LinearMipmapNearestFilter as Xs, NearestMipmapLinearFilter as vs, ClampToEdgeWrapping as Ws, MirroredRepeatWrapping as Vs, InterpolateDiscrete as js, FrontSide as Zs, Texture as lt, VectorKeyframeTrack as dt, NumberKeyframeTrack as ut, QuaternionKeyframeTrack as ft, Box3 as zs, Sphere as $s, Interpolant as Ai, CompressedCubeTexture as ei, UnsignedByteType as K, CompressedArrayTexture as ti, CompressedTexture as Yt, RGBAFormat as FA, RGBA_ASTC_4x4_Format as si, RGBA_BPTC_Format as ii, RGBA_ETC2_EAC_Format as ni, RGBA_PVRTC_4BPPV1_Format as oi, RGBA_S3TC_DXT5_Format as Bi, RGB_ETC1_Format as ri, RGB_ETC2_Format as ai, RGB_PVRTC_4BPPV1_Format as Ci, RGB_S3TC_DXT1_Format as Ii, FloatType as Le, HalfFloatType as ye, DataTexture as gi, Data3DTexture as Ei, DisplayP3ColorSpace as ci, LinearDisplayP3ColorSpace as Qi, NoColorSpace as Dt, RGFormat as XA, RedFormat as vA, RGBA_ASTC_6x6_Format as Ft, Plane as Me, PlaneHelper as we, PlaneGeometry as hi, VideoTexture as li, Raycaster as di } from "three";
import { intersector as Gt } from "../intersector/index.js";
import { S as Rt } from "../Store-JOKrNVEr.js";
import { g as ui } from "../dom-BY7JhTx5.js";
import { loading as be } from "../loading/index.js";
import { S as fi } from "../SourceManager-BoP9RAJr.js";
function qt(C) {
  const A = (e) => {
    e.dispose();
    for (const s of Object.keys(e)) {
      const t = e[s];
      t && typeof t == "object" && "minFilter" in t && t.dispose();
    }
  };
  C.traverse((e) => {
    if (e instanceof Fe) {
      if (e.geometry.dispose(), !Array.isArray(e.material) && e.material.isMaterial)
        A(e.material);
      else if (Array.isArray(e.material))
        for (const s of e.material)
          A(s);
    }
  });
}
var Te, nA, N, Y, RA, pA, oA, k, mA, MA, Z, q, wA, ZA, zA, lA, Ue, Xt, $A, et, Ae, ee;
class Di {
  constructor() {
    u(this, Ue);
    u(this, $A);
    u(this, Te, `https://unpkg.com/three@0.${us}.x`);
    u(this, nA, null);
    u(this, N, null);
    u(this, Y, null);
    u(this, RA, null);
    u(this, pA, null);
    u(this, oA, []);
    u(this, k, new Qt({
      x: 0,
      y: 0,
      z: 0
    }));
    u(this, mA, new Qt({
      x: 0,
      y: 0,
      z: 0
    }));
    u(this, MA, "auto");
    u(this, Z, 0);
    u(this, q, 0);
    u(this, wA, 0);
    u(this, ZA, 2);
    u(this, zA, !0);
    u(this, lA, !1);
    u(this, Ae, () => {
      var A;
      G(this, Z, g(this, nA).clientWidth), G(this, q, g(this, nA).clientHeight), G(this, wA, Math.min(g(this, ZA), devicePixelRatio || 1)), g(this, N).setPixelRatio(g(this, wA)), g(this, N).setSize(g(this, Z), g(this, q)), QA(this, $A, et).call(this), (A = this.onResize) == null || A.call(this);
    });
    u(this, ee, () => {
      QA(this, Ue, Xt).call(this), this.render(g(this, RA), g(this, Y));
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
    return g(this, RA);
  }
  get raycaster() {
    return g(this, pA);
  }
  get attachedObjects() {
    return g(this, oA);
  }
  get cameraPosition() {
    return g(this, k);
  }
  get cameraRotation() {
    return g(this, mA);
  }
  get width() {
    return g(this, Z);
  }
  get height() {
    return g(this, q);
  }
  get pixelRatio() {
    return g(this, wA);
  }
  get cameraDistance() {
    return g(this, k).getStepValue("_initial").z;
  }
  set cameraDistance(A) {
    g(this, k).setStep("_initial", "+", {
      z: A
    }), g(this, k).calculate(), QA(this, $A, et).call(this);
  }
  attachToHTMLElement(A, e, s) {
    const t = new xt(A, me(tA({}, s), {
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
    if (g(this, lA)) {
      console.warn("[en3.setup]: You are trying to setup en3 again.");
      return;
    }
    G(this, nA, (A == null ? void 0 : A.containerElement) || document.body), G(this, Y, (A == null ? void 0 : A.cameraType) === "orthographic" ? new He() : new ze()), g(this, k).bind(g(this, Y).position), g(this, mA).bind(g(this, Y).rotation), g(this, k).setStep("_initial", "+", {
      z: (A == null ? void 0 : A.cameraDistance) || 1e3
    }), g(this, k).calculate(), g(this, Y).near = (A == null ? void 0 : A.cameraNear) || 1, g(this, Y).far = (A == null ? void 0 : A.cameraFar) || 11e3, G(this, MA, (A == null ? void 0 : A.cameraFov) || "auto"), G(this, RA, new fs()), G(this, ZA, (A == null ? void 0 : A.maxPixelRatio) || 2), G(this, zA, (A == null ? void 0 : A.cameraAutoUpdate) !== !1), G(this, N, new Ds(A == null ? void 0 : A.webGLRendererParameters)), g(this, N).domElement.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    `, g(this, nA).prepend(g(this, N).domElement), G(this, pA, new Sn()), G(this, lA, !0), xA.subscribe(g(this, Ae), kt.EN3), kA.subscribe(g(this, ee), { order: ot.EN3 });
  }
  destroy() {
    if (!g(this, lA)) {
      console.warn(
        "[en3.setup]: You are trying to destory en3 but it has not been initialized."
      );
      return;
    }
    g(this, oA).forEach((A) => {
      A.userData.box.destroy();
    }), xA.unsubscribe(g(this, Ae)), kA.unsubscribe(g(this, ee)), this.scene.clear(), qt(this.scene), g(this, N).dispose(), g(this, N).domElement.remove(), G(this, N, null), g(this, pA).destroy(), G(this, lA, !1);
  }
  render(A, e) {
    g(this, N).render(A, e);
  }
}
Te = new WeakMap(), nA = new WeakMap(), N = new WeakMap(), Y = new WeakMap(), RA = new WeakMap(), pA = new WeakMap(), oA = new WeakMap(), k = new WeakMap(), mA = new WeakMap(), MA = new WeakMap(), Z = new WeakMap(), q = new WeakMap(), wA = new WeakMap(), ZA = new WeakMap(), zA = new WeakMap(), lA = new WeakMap(), Ue = new WeakSet(), Xt = function() {
  g(this, zA) && (g(this, k).calculate(), g(this, mA).calculate());
}, $A = new WeakSet(), et = function() {
  this.camera instanceof ze ? (this.camera.aspect = g(this, Z) / g(this, q), this.camera.fov = g(this, MA) === "auto" ? 2 * Math.atan(
    g(this, q) / 2 / g(this, k).getStepValue("_initial").z
  ) * (180 / Math.PI) : g(this, MA)) : this.camera instanceof He && (this.camera.left = g(this, Z) / -2, this.camera.right = g(this, Z) / 2, this.camera.top = g(this, q) / 2, this.camera.bottom = g(this, q) / -2), this.camera.updateProjectionMatrix();
}, Ae = new WeakMap(), ee = new WeakMap();
const M = new Di();
class Fi {
  add(A, e) {
    const s = (i) => {
      i.isIntersecting && (A.sourceManager.lazyLoad(), Gt.unsubscribe(s));
    }, t = ui(e);
    if (t)
      return Gt.subscribe(t, s);
  }
}
const Pn = new Fi();
function pt(C, A) {
  if (A === Fs)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), C;
  if (A === $e || A === bt) {
    let e = C.getIndex();
    if (e === null) {
      const n = [], B = C.getAttribute("position");
      if (B !== void 0) {
        for (let o = 0; o < B.count; o++)
          n.push(o);
        C.setIndex(n), e = C.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), C;
    }
    const s = e.count - 2, t = [];
    if (A === $e)
      for (let n = 1; n <= s; n++)
        t.push(e.getX(0)), t.push(e.getX(n)), t.push(e.getX(n + 1));
    else
      for (let n = 0; n < s; n++)
        n % 2 === 0 ? (t.push(e.getX(n)), t.push(e.getX(n + 1)), t.push(e.getX(n + 2))) : (t.push(e.getX(n + 2)), t.push(e.getX(n + 1)), t.push(e.getX(n)));
    t.length / 3 !== s && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const i = C.clone();
    return i.setIndex(t), i.clearGroups(), i;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", A), C;
}
class Gi extends Bt {
  constructor(A) {
    super(A), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(e) {
      return new wi(e);
    }), this.register(function(e) {
      return new xi(e);
    }), this.register(function(e) {
      return new ki(e);
    }), this.register(function(e) {
      return new bi(e);
    }), this.register(function(e) {
      return new Li(e);
    }), this.register(function(e) {
      return new yi(e);
    }), this.register(function(e) {
      return new Hi(e);
    }), this.register(function(e) {
      return new Ji(e);
    }), this.register(function(e) {
      return new Mi(e);
    }), this.register(function(e) {
      return new Ti(e);
    }), this.register(function(e) {
      return new Si(e);
    }), this.register(function(e) {
      return new Ni(e);
    }), this.register(function(e) {
      return new Ui(e);
    }), this.register(function(e) {
      return new pi(e);
    }), this.register(function(e) {
      return new Ki(e);
    }), this.register(function(e) {
      return new Oi(e);
    });
  }
  load(A, e, s, t) {
    const i = this;
    let n;
    if (this.resourcePath !== "")
      n = this.resourcePath;
    else if (this.path !== "") {
      const r = WA.extractUrlBase(A);
      n = WA.resolveURL(r, this.path);
    } else
      n = WA.extractUrlBase(A);
    this.manager.itemStart(A);
    const B = function(r) {
      t ? t(r) : console.error(r), i.manager.itemError(A), i.manager.itemEnd(A);
    }, o = new fA(this.manager);
    o.setPath(this.path), o.setResponseType("arraybuffer"), o.setRequestHeader(this.requestHeader), o.setWithCredentials(this.withCredentials), o.load(A, function(r) {
      try {
        i.parse(r, n, function(I) {
          e(I), i.manager.itemEnd(A);
        }, B);
      } catch (I) {
        B(I);
      }
    }, s, B);
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
    const n = {}, B = {}, o = new TextDecoder();
    if (typeof A == "string")
      i = JSON.parse(A);
    else if (A instanceof ArrayBuffer)
      if (o.decode(new Uint8Array(A, 0, 4)) === vt) {
        try {
          n[R.KHR_BINARY_GLTF] = new _i(A);
        } catch (a) {
          t && t(a);
          return;
        }
        i = JSON.parse(n[R.KHR_BINARY_GLTF].content);
      } else
        i = JSON.parse(o.decode(A));
    else
      i = A;
    if (i.asset === void 0 || i.asset.version[0] < 2) {
      t && t(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const r = new en(i, {
      path: e || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    r.fileLoader.setRequestHeader(this.requestHeader);
    for (let I = 0; I < this.pluginCallbacks.length; I++) {
      const a = this.pluginCallbacks[I](r);
      a.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), B[a.name] = a, n[a.name] = !0;
    }
    if (i.extensionsUsed)
      for (let I = 0; I < i.extensionsUsed.length; ++I) {
        const a = i.extensionsUsed[I], c = i.extensionsRequired || [];
        switch (a) {
          case R.KHR_MATERIALS_UNLIT:
            n[a] = new mi();
            break;
          case R.KHR_DRACO_MESH_COMPRESSION:
            n[a] = new Pi(i, this.dracoLoader);
            break;
          case R.KHR_TEXTURE_TRANSFORM:
            n[a] = new Yi();
            break;
          case R.KHR_MESH_QUANTIZATION:
            n[a] = new qi();
            break;
          default:
            c.indexOf(a) >= 0 && B[a] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + a + '".');
        }
      }
    r.setExtensions(n), r.setPlugins(B), r.parse(s, t);
  }
  parseAsync(A, e) {
    const s = this;
    return new Promise(function(t, i) {
      s.parse(A, e, t, i);
    });
  }
}
function Ri() {
  let C = {};
  return {
    get: function(A) {
      return C[A];
    },
    add: function(A, e) {
      C[A] = e;
    },
    remove: function(A) {
      delete C[A];
    },
    removeAll: function() {
      C = {};
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
class pi {
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
    const i = e.json, o = ((i.extensions && i.extensions[this.name] || {}).lights || [])[A];
    let r;
    const I = new EA(16777215);
    o.color !== void 0 && I.setRGB(o.color[0], o.color[1], o.color[2], O);
    const a = o.range !== void 0 ? o.range : 0;
    switch (o.type) {
      case "directional":
        r = new ps(I), r.target.position.set(0, 0, -1), r.add(r.target);
        break;
      case "point":
        r = new Rs(I), r.distance = a;
        break;
      case "spot":
        r = new Gs(I), r.distance = a, o.spot = o.spot || {}, o.spot.innerConeAngle = o.spot.innerConeAngle !== void 0 ? o.spot.innerConeAngle : 0, o.spot.outerConeAngle = o.spot.outerConeAngle !== void 0 ? o.spot.outerConeAngle : Math.PI / 4, r.angle = o.spot.outerConeAngle, r.penumbra = 1 - o.spot.innerConeAngle / o.spot.outerConeAngle, r.target.position.set(0, 0, -1), r.add(r.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + o.type);
    }
    return r.position.set(0, 0, 0), r.decay = 2, iA(r, o), o.intensity !== void 0 && (r.intensity = o.intensity), r.name = e.createUniqueName(o.name || "light_" + A), t = Promise.resolve(r), e.cache.add(s, t), t;
  }
  getDependency(A, e) {
    if (A === "light")
      return this._loadLight(e);
  }
  createNodeAttachment(A) {
    const e = this, s = this.parser, i = s.json.nodes[A], B = (i.extensions && i.extensions[this.name] || {}).light;
    return B === void 0 ? null : this._loadLight(B).then(function(o) {
      return s._getNodeRef(e.cache, B, o);
    });
  }
}
class mi {
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
class Mi {
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
class wi {
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
      const B = n.clearcoatNormalTexture.scale;
      e.clearcoatNormalScale = new rt(B, B);
    }
    return Promise.all(i);
  }
}
class Si {
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
class Li {
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
      const B = n.sheenColorFactor;
      e.sheenColor.setRGB(B[0], B[1], B[2], O);
    }
    return n.sheenRoughnessFactor !== void 0 && (e.sheenRoughness = n.sheenRoughnessFactor), n.sheenColorTexture !== void 0 && i.push(s.assignTexture(e, "sheenColorMap", n.sheenColorTexture, $)), n.sheenRoughnessTexture !== void 0 && i.push(s.assignTexture(e, "sheenRoughnessMap", n.sheenRoughnessTexture)), Promise.all(i);
  }
}
class yi {
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
class Hi {
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
    const B = n.attenuationColor || [1, 1, 1];
    return e.attenuationColor = new EA().setRGB(B[0], B[1], B[2], O), Promise.all(i);
  }
}
class Ji {
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
class Ti {
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
    const B = n.specularColorFactor || [1, 1, 1];
    return e.specularColor = new EA().setRGB(B[0], B[1], B[2], O), n.specularColorTexture !== void 0 && i.push(s.assignTexture(e, "specularColorMap", n.specularColorTexture, $)), Promise.all(i);
  }
}
class Ui {
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
class Ni {
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
class xi {
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
class ki {
  constructor(A) {
    this.parser = A, this.name = R.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(A) {
    const e = this.name, s = this.parser, t = s.json, i = t.textures[A];
    if (!i.extensions || !i.extensions[e])
      return null;
    const n = i.extensions[e], B = t.images[n.source];
    let o = s.textureLoader;
    if (B.uri) {
      const r = s.options.manager.getHandler(B.uri);
      r !== null && (o = r);
    }
    return this.detectSupport().then(function(r) {
      if (r)
        return s.loadTextureImage(A, n.source, o);
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
class bi {
  constructor(A) {
    this.parser = A, this.name = R.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(A) {
    const e = this.name, s = this.parser, t = s.json, i = t.textures[A];
    if (!i.extensions || !i.extensions[e])
      return null;
    const n = i.extensions[e], B = t.images[n.source];
    let o = s.textureLoader;
    if (B.uri) {
      const r = s.options.manager.getHandler(B.uri);
      r !== null && (o = r);
    }
    return this.detectSupport().then(function(r) {
      if (r)
        return s.loadTextureImage(A, n.source, o);
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
class Ki {
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
      return i.then(function(B) {
        const o = t.byteOffset || 0, r = t.byteLength || 0, I = t.count, a = t.byteStride, c = new Uint8Array(B, o, r);
        return n.decodeGltfBufferAsync ? n.decodeGltfBufferAsync(I, a, c, t.mode, t.filter).then(function(Q) {
          return Q.buffer;
        }) : n.ready.then(function() {
          const Q = new ArrayBuffer(I * a);
          return n.decodeGltfBuffer(new Uint8Array(Q), I, a, c, t.mode, t.filter), Q;
        });
      });
    } else
      return null;
  }
}
class Oi {
  constructor(A) {
    this.name = R.EXT_MESH_GPU_INSTANCING, this.parser = A;
  }
  createNodeMesh(A) {
    const e = this.parser.json, s = e.nodes[A];
    if (!s.extensions || !s.extensions[this.name] || s.mesh === void 0)
      return null;
    const t = e.meshes[s.mesh];
    for (const r of t.primitives)
      if (r.mode !== x.TRIANGLES && r.mode !== x.TRIANGLE_STRIP && r.mode !== x.TRIANGLE_FAN && r.mode !== void 0)
        return null;
    const n = s.extensions[this.name].attributes, B = [], o = {};
    for (const r in n)
      B.push(this.parser.getDependency("accessor", n[r]).then((I) => (o[r] = I, o[r])));
    return B.length < 1 ? null : (B.push(this.parser.createNodeMesh(A)), Promise.all(B).then((r) => {
      const I = r.pop(), a = I.isGroup ? I.children : [I], c = r[0].count, Q = [];
      for (const l of a) {
        const h = new bA(), E = new y(), d = new at(), f = new y(1, 1, 1), D = new ms(l.geometry, l.material, c);
        for (let F = 0; F < c; F++)
          o.TRANSLATION && E.fromBufferAttribute(o.TRANSLATION, F), o.ROTATION && d.fromBufferAttribute(o.ROTATION, F), o.SCALE && f.fromBufferAttribute(o.SCALE, F), D.setMatrixAt(F, h.compose(E, d, f));
        for (const F in o)
          if (F === "_COLOR_0") {
            const p = o[F];
            D.instanceColor = new Ms(p.array, p.itemSize, p.normalized);
          } else
            F !== "TRANSLATION" && F !== "ROTATION" && F !== "SCALE" && l.geometry.setAttribute(F, o[F]);
        Ct.prototype.copy.call(D, l), this.parser.assignFinalMaterial(D), Q.push(D);
      }
      return I.isGroup ? (I.clear(), I.add(...Q), I) : Q[0];
    }));
  }
}
const vt = "glTF", PA = 12, mt = { JSON: 1313821514, BIN: 5130562 };
class _i {
  constructor(A) {
    this.name = R.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const e = new DataView(A, 0, PA), s = new TextDecoder();
    if (this.header = {
      magic: s.decode(new Uint8Array(A.slice(0, 4))),
      version: e.getUint32(4, !0),
      length: e.getUint32(8, !0)
    }, this.header.magic !== vt)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const t = this.header.length - PA, i = new DataView(A, PA);
    let n = 0;
    for (; n < t; ) {
      const B = i.getUint32(n, !0);
      n += 4;
      const o = i.getUint32(n, !0);
      if (n += 4, o === mt.JSON) {
        const r = new Uint8Array(A, PA + n, B);
        this.content = s.decode(r);
      } else if (o === mt.BIN) {
        const r = PA + n;
        this.body = A.slice(r, r + B);
      }
      n += B;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Pi {
  constructor(A, e) {
    if (!e)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = R.KHR_DRACO_MESH_COMPRESSION, this.json = A, this.dracoLoader = e, this.dracoLoader.preload();
  }
  decodePrimitive(A, e) {
    const s = this.json, t = this.dracoLoader, i = A.extensions[this.name].bufferView, n = A.extensions[this.name].attributes, B = {}, o = {}, r = {};
    for (const I in n) {
      const a = tt[I] || I.toLowerCase();
      B[a] = n[I];
    }
    for (const I in A.attributes) {
      const a = tt[I] || I.toLowerCase();
      if (n[I] !== void 0) {
        const c = s.accessors[A.attributes[I]], Q = GA[c.componentType];
        r[a] = Q.name, o[a] = c.normalized === !0;
      }
    }
    return e.getDependency("bufferView", i).then(function(I) {
      return new Promise(function(a, c) {
        t.decodeDracoFile(I, function(Q) {
          for (const l in Q.attributes) {
            const h = Q.attributes[l], E = o[l];
            E !== void 0 && (h.normalized = E);
          }
          a(Q);
        }, B, r, O, c);
      });
    });
  }
}
class Yi {
  constructor() {
    this.name = R.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(A, e) {
    return (e.texCoord === void 0 || e.texCoord === A.channel) && e.offset === void 0 && e.rotation === void 0 && e.scale === void 0 || (A = A.clone(), e.texCoord !== void 0 && (A.channel = e.texCoord), e.offset !== void 0 && A.offset.fromArray(e.offset), e.rotation !== void 0 && (A.rotation = e.rotation), e.scale !== void 0 && A.repeat.fromArray(e.scale), A.needsUpdate = !0), A;
  }
}
class qi {
  constructor() {
    this.name = R.KHR_MESH_QUANTIZATION;
  }
}
class Wt extends Ai {
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
    const i = this.resultBuffer, n = this.sampleValues, B = this.valueSize, o = B * 2, r = B * 3, I = t - e, a = (s - e) / I, c = a * a, Q = c * a, l = A * r, h = l - r, E = -2 * Q + 3 * c, d = Q - c, f = 1 - E, D = d - c + a;
    for (let F = 0; F !== B; F++) {
      const p = n[h + F + B], m = n[h + F + o] * I, w = n[l + F + B], _ = n[l + F] * I;
      i[F] = f * p + D * m + E * w + d * _;
    }
    return i;
  }
}
const Xi = new at();
class vi extends Wt {
  interpolate_(A, e, s, t) {
    const i = super.interpolate_(A, e, s, t);
    return Xi.fromArray(i).normalize().toArray(i), i;
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
}, GA = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, Mt = {
  9728: Ys,
  9729: Je,
  9984: qs,
  9985: Xs,
  9986: vs,
  9987: It
}, wt = {
  33071: Ws,
  33648: Vs,
  10497: At
}, Ke = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, tt = {
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
}, Wi = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: Pt,
  STEP: js
}, Oe = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Vi(C) {
  return C.DefaultMaterial === void 0 && (C.DefaultMaterial = new Ot({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: Zs
  })), C.DefaultMaterial;
}
function hA(C, A, e) {
  for (const s in e.extensions)
    C[s] === void 0 && (A.userData.gltfExtensions = A.userData.gltfExtensions || {}, A.userData.gltfExtensions[s] = e.extensions[s]);
}
function iA(C, A) {
  A.extras !== void 0 && (typeof A.extras == "object" ? Object.assign(C.userData, A.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + A.extras));
}
function ji(C, A, e) {
  let s = !1, t = !1, i = !1;
  for (let r = 0, I = A.length; r < I; r++) {
    const a = A[r];
    if (a.POSITION !== void 0 && (s = !0), a.NORMAL !== void 0 && (t = !0), a.COLOR_0 !== void 0 && (i = !0), s && t && i)
      break;
  }
  if (!s && !t && !i)
    return Promise.resolve(C);
  const n = [], B = [], o = [];
  for (let r = 0, I = A.length; r < I; r++) {
    const a = A[r];
    if (s) {
      const c = a.POSITION !== void 0 ? e.getDependency("accessor", a.POSITION) : C.attributes.position;
      n.push(c);
    }
    if (t) {
      const c = a.NORMAL !== void 0 ? e.getDependency("accessor", a.NORMAL) : C.attributes.normal;
      B.push(c);
    }
    if (i) {
      const c = a.COLOR_0 !== void 0 ? e.getDependency("accessor", a.COLOR_0) : C.attributes.color;
      o.push(c);
    }
  }
  return Promise.all([
    Promise.all(n),
    Promise.all(B),
    Promise.all(o)
  ]).then(function(r) {
    const I = r[0], a = r[1], c = r[2];
    return s && (C.morphAttributes.position = I), t && (C.morphAttributes.normal = a), i && (C.morphAttributes.color = c), C.morphTargetsRelative = !0, C;
  });
}
function Zi(C, A) {
  if (C.updateMorphTargets(), A.weights !== void 0)
    for (let e = 0, s = A.weights.length; e < s; e++)
      C.morphTargetInfluences[e] = A.weights[e];
  if (A.extras && Array.isArray(A.extras.targetNames)) {
    const e = A.extras.targetNames;
    if (C.morphTargetInfluences.length === e.length) {
      C.morphTargetDictionary = {};
      for (let s = 0, t = e.length; s < t; s++)
        C.morphTargetDictionary[e[s]] = s;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function zi(C) {
  let A;
  const e = C.extensions && C.extensions[R.KHR_DRACO_MESH_COMPRESSION];
  if (e ? A = "draco:" + e.bufferView + ":" + e.indices + ":" + _e(e.attributes) : A = C.indices + ":" + _e(C.attributes) + ":" + C.mode, C.targets !== void 0)
    for (let s = 0, t = C.targets.length; s < t; s++)
      A += ":" + _e(C.targets[s]);
  return A;
}
function _e(C) {
  let A = "";
  const e = Object.keys(C).sort();
  for (let s = 0, t = e.length; s < t; s++)
    A += e[s] + ":" + C[e[s]] + ";";
  return A;
}
function st(C) {
  switch (C) {
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
function $i(C) {
  return C.search(/\.jpe?g($|\?)/i) > 0 || C.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : C.search(/\.webp($|\?)/i) > 0 || C.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const An = new bA();
class en {
  constructor(A = {}, e = {}) {
    this.json = A, this.extensions = {}, this.plugins = {}, this.options = e, this.cache = new Ri(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let s = !1, t = !1, i = -1;
    typeof navigator != "undefined" && (s = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0, t = navigator.userAgent.indexOf("Firefox") > -1, i = t ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap == "undefined" || s || t && i < 98 ? this.textureLoader = new Kt(this.options.manager) : this.textureLoader = new ws(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new fA(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
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
      const B = {
        scene: n[0][t.scene || 0],
        scenes: n[0],
        animations: n[1],
        cameras: n[2],
        asset: t.asset,
        parser: s,
        userData: {}
      };
      return hA(i, B, t), iA(B, t), Promise.all(s._invokeAll(function(o) {
        return o.afterRoot && o.afterRoot(B);
      })).then(function() {
        A(B);
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
      for (let B = 0, o = n.length; B < o; B++)
        A[n[B]].isBone = !0;
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
    const t = s.clone(), i = (n, B) => {
      const o = this.associations.get(n);
      o != null && this.associations.set(B, o);
      for (const [r, I] of n.children.entries())
        i(I, B.children[r]);
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
      const n = Ke[t.type], B = GA[t.componentType], o = t.normalized === !0, r = new B(t.count * n);
      return Promise.resolve(new VA(r, n, o));
    }
    const i = [];
    return t.bufferView !== void 0 ? i.push(this.getDependency("bufferView", t.bufferView)) : i.push(null), t.sparse !== void 0 && (i.push(this.getDependency("bufferView", t.sparse.indices.bufferView)), i.push(this.getDependency("bufferView", t.sparse.values.bufferView))), Promise.all(i).then(function(n) {
      const B = n[0], o = Ke[t.type], r = GA[t.componentType], I = r.BYTES_PER_ELEMENT, a = I * o, c = t.byteOffset || 0, Q = t.bufferView !== void 0 ? s.bufferViews[t.bufferView].byteStride : void 0, l = t.normalized === !0;
      let h, E;
      if (Q && Q !== a) {
        const d = Math.floor(c / Q), f = "InterleavedBuffer:" + t.bufferView + ":" + t.componentType + ":" + d + ":" + t.count;
        let D = e.cache.get(f);
        D || (h = new r(B, d * Q, t.count * Q / I), D = new Ss(h, Q / I), e.cache.add(f, D)), E = new Ls(D, o, c % Q / I, l);
      } else
        B === null ? h = new r(t.count * o) : h = new r(B, c, t.count * o), E = new VA(h, o, l);
      if (t.sparse !== void 0) {
        const d = Ke.SCALAR, f = GA[t.sparse.indices.componentType], D = t.sparse.indices.byteOffset || 0, F = t.sparse.values.byteOffset || 0, p = new f(n[1], D, t.sparse.count * d), m = new r(n[2], F, t.sparse.count * o);
        B !== null && (E = new VA(E.array.slice(), E.itemSize, E.normalized));
        for (let w = 0, _ = p.length; w < _; w++) {
          const H = p[w];
          if (E.setX(H, m[w * o]), o >= 2 && E.setY(H, m[w * o + 1]), o >= 3 && E.setZ(H, m[w * o + 2]), o >= 4 && E.setW(H, m[w * o + 3]), o >= 5)
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
    let B = this.textureLoader;
    if (n.uri) {
      const o = s.manager.getHandler(n.uri);
      o !== null && (B = o);
    }
    return this.loadTextureImage(A, i, B);
  }
  loadTextureImage(A, e, s) {
    const t = this, i = this.json, n = i.textures[A], B = i.images[e], o = (B.uri || B.bufferView) + ":" + n.sampler;
    if (this.textureCache[o])
      return this.textureCache[o];
    const r = this.loadImageSource(e, s).then(function(I) {
      I.flipY = !1, I.name = n.name || B.name || "", I.name === "" && typeof B.uri == "string" && B.uri.startsWith("data:image/") === !1 && (I.name = B.uri);
      const c = (i.samplers || {})[n.sampler] || {};
      return I.magFilter = Mt[c.magFilter] || Je, I.minFilter = Mt[c.minFilter] || It, I.wrapS = wt[c.wrapS] || At, I.wrapT = wt[c.wrapT] || At, t.associations.set(I, { textures: A }), I;
    }).catch(function() {
      return null;
    });
    return this.textureCache[o] = r, r;
  }
  loadImageSource(A, e) {
    const s = this, t = this.json, i = this.options;
    if (this.sourceCache[A] !== void 0)
      return this.sourceCache[A].then((a) => a.clone());
    const n = t.images[A], B = self.URL || self.webkitURL;
    let o = n.uri || "", r = !1;
    if (n.bufferView !== void 0)
      o = s.getDependency("bufferView", n.bufferView).then(function(a) {
        r = !0;
        const c = new Blob([a], { type: n.mimeType });
        return o = B.createObjectURL(c), o;
      });
    else if (n.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + A + " is missing URI and bufferView");
    const I = Promise.resolve(o).then(function(a) {
      return new Promise(function(c, Q) {
        let l = c;
        e.isImageBitmapLoader === !0 && (l = function(h) {
          const E = new lt(h);
          E.needsUpdate = !0, c(E);
        }), e.load(WA.resolveURL(a, i.path), l, void 0, Q);
      });
    }).then(function(a) {
      return r === !0 && B.revokeObjectURL(o), a.userData.mimeType = n.mimeType || $i(n.uri), a;
    }).catch(function(a) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", o), a;
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
        const B = s.extensions !== void 0 ? s.extensions[R.KHR_TEXTURE_TRANSFORM] : void 0;
        if (B) {
          const o = i.associations.get(n);
          n = i.extensions[R.KHR_TEXTURE_TRANSFORM].extendTexture(n, B), i.associations.set(n, o);
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
      const B = "PointsMaterial:" + s.uuid;
      let o = this.cache.get(B);
      o || (o = new ys(), ke.prototype.copy.call(o, s), o.color.copy(s.color), o.map = s.map, o.sizeAttenuation = !1, this.cache.add(B, o)), s = o;
    } else if (A.isLine) {
      const B = "LineBasicMaterial:" + s.uuid;
      let o = this.cache.get(B);
      o || (o = new Hs(), ke.prototype.copy.call(o, s), o.color.copy(s.color), o.map = s.map, this.cache.add(B, o)), s = o;
    }
    if (t || i || n) {
      let B = "ClonedMaterial:" + s.uuid + ":";
      t && (B += "derivative-tangents:"), i && (B += "vertex-colors:"), n && (B += "flat-shading:");
      let o = this.cache.get(B);
      o || (o = s.clone(), i && (o.vertexColors = !0), n && (o.flatShading = !0), t && (o.normalScale && (o.normalScale.y *= -1), o.clearcoatNormalScale && (o.clearcoatNormalScale.y *= -1)), this.cache.add(B, o), this.associations.set(o, this.associations.get(s))), s = o;
    }
    A.material = s;
  }
  getMaterialType() {
    return Ot;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(A) {
    const e = this, s = this.json, t = this.extensions, i = s.materials[A];
    let n;
    const B = {}, o = i.extensions || {}, r = [];
    if (o[R.KHR_MATERIALS_UNLIT]) {
      const a = t[R.KHR_MATERIALS_UNLIT];
      n = a.getMaterialType(), r.push(a.extendParams(B, i, e));
    } else {
      const a = i.pbrMetallicRoughness || {};
      if (B.color = new EA(1, 1, 1), B.opacity = 1, Array.isArray(a.baseColorFactor)) {
        const c = a.baseColorFactor;
        B.color.setRGB(c[0], c[1], c[2], O), B.opacity = c[3];
      }
      a.baseColorTexture !== void 0 && r.push(e.assignTexture(B, "map", a.baseColorTexture, $)), B.metalness = a.metallicFactor !== void 0 ? a.metallicFactor : 1, B.roughness = a.roughnessFactor !== void 0 ? a.roughnessFactor : 1, a.metallicRoughnessTexture !== void 0 && (r.push(e.assignTexture(B, "metalnessMap", a.metallicRoughnessTexture)), r.push(e.assignTexture(B, "roughnessMap", a.metallicRoughnessTexture))), n = this._invokeOne(function(c) {
        return c.getMaterialType && c.getMaterialType(A);
      }), r.push(Promise.all(this._invokeAll(function(c) {
        return c.extendMaterialParams && c.extendMaterialParams(A, B);
      })));
    }
    i.doubleSided === !0 && (B.side = Js);
    const I = i.alphaMode || Oe.OPAQUE;
    if (I === Oe.BLEND ? (B.transparent = !0, B.depthWrite = !1) : (B.transparent = !1, I === Oe.MASK && (B.alphaTest = i.alphaCutoff !== void 0 ? i.alphaCutoff : 0.5)), i.normalTexture !== void 0 && n !== qA && (r.push(e.assignTexture(B, "normalMap", i.normalTexture)), B.normalScale = new rt(1, 1), i.normalTexture.scale !== void 0)) {
      const a = i.normalTexture.scale;
      B.normalScale.set(a, a);
    }
    if (i.occlusionTexture !== void 0 && n !== qA && (r.push(e.assignTexture(B, "aoMap", i.occlusionTexture)), i.occlusionTexture.strength !== void 0 && (B.aoMapIntensity = i.occlusionTexture.strength)), i.emissiveFactor !== void 0 && n !== qA) {
      const a = i.emissiveFactor;
      B.emissive = new EA().setRGB(a[0], a[1], a[2], O);
    }
    return i.emissiveTexture !== void 0 && n !== qA && r.push(e.assignTexture(B, "emissiveMap", i.emissiveTexture, $)), Promise.all(r).then(function() {
      const a = new n(B);
      return i.name && (a.name = i.name), iA(a, i), e.associations.set(a, { materials: A }), i.extensions && hA(t, a, i), a;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(A) {
    const e = Ts.sanitizeNodeName(A || "");
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
    function i(B) {
      return s[R.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(B, e).then(function(o) {
        return St(o, B, e);
      });
    }
    const n = [];
    for (let B = 0, o = A.length; B < o; B++) {
      const r = A[B], I = zi(r), a = t[I];
      if (a)
        n.push(a.promise);
      else {
        let c;
        r.extensions && r.extensions[R.KHR_DRACO_MESH_COMPRESSION] ? c = i(r) : c = St(new _t(), r, e), t[I] = { primitive: r, promise: c }, n.push(c);
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
    const e = this, s = this.json, t = this.extensions, i = s.meshes[A], n = i.primitives, B = [];
    for (let o = 0, r = n.length; o < r; o++) {
      const I = n[o].material === void 0 ? Vi(this.cache) : this.getDependency("material", n[o].material);
      B.push(I);
    }
    return B.push(e.loadGeometries(n)), Promise.all(B).then(function(o) {
      const r = o.slice(0, o.length - 1), I = o[o.length - 1], a = [];
      for (let Q = 0, l = I.length; Q < l; Q++) {
        const h = I[Q], E = n[Q];
        let d;
        const f = r[Q];
        if (E.mode === x.TRIANGLES || E.mode === x.TRIANGLE_STRIP || E.mode === x.TRIANGLE_FAN || E.mode === void 0)
          d = i.isSkinnedMesh === !0 ? new Us(h, f) : new Fe(h, f), d.isSkinnedMesh === !0 && d.normalizeSkinWeights(), E.mode === x.TRIANGLE_STRIP ? d.geometry = pt(d.geometry, bt) : E.mode === x.TRIANGLE_FAN && (d.geometry = pt(d.geometry, $e));
        else if (E.mode === x.LINES)
          d = new Ns(h, f);
        else if (E.mode === x.LINE_STRIP)
          d = new xs(h, f);
        else if (E.mode === x.LINE_LOOP)
          d = new ks(h, f);
        else if (E.mode === x.POINTS)
          d = new bs(h, f);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + E.mode);
        Object.keys(d.geometry.morphAttributes).length > 0 && Zi(d, i), d.name = e.createUniqueName(i.name || "mesh_" + A), iA(d, i), E.extensions && hA(t, d, E), e.assignFinalMaterial(d), a.push(d);
      }
      for (let Q = 0, l = a.length; Q < l; Q++)
        e.associations.set(a[Q], {
          meshes: A,
          primitives: Q
        });
      if (a.length === 1)
        return i.extensions && hA(t, a[0], i), a[0];
      const c = new jA();
      i.extensions && hA(t, c, i), e.associations.set(c, { meshes: A });
      for (let Q = 0, l = a.length; Q < l; Q++)
        c.add(a[Q]);
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
    return s.type === "perspective" ? e = new ze(Ks.radToDeg(t.yfov), t.aspectRatio || 1, t.znear || 1, t.zfar || 2e6) : s.type === "orthographic" && (e = new He(-t.xmag, t.xmag, t.ymag, -t.ymag, t.znear, t.zfar)), s.name && (e.name = this.createUniqueName(s.name)), iA(e, s), Promise.resolve(e);
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
      const i = t.pop(), n = t, B = [], o = [];
      for (let r = 0, I = n.length; r < I; r++) {
        const a = n[r];
        if (a) {
          B.push(a);
          const c = new bA();
          i !== null && c.fromArray(i.array, r * 16), o.push(c);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', e.joints[r]);
      }
      return new Os(B, o);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(A) {
    const e = this.json, s = this, t = e.animations[A], i = t.name ? t.name : "animation_" + A, n = [], B = [], o = [], r = [], I = [];
    for (let a = 0, c = t.channels.length; a < c; a++) {
      const Q = t.channels[a], l = t.samplers[Q.sampler], h = Q.target, E = h.node, d = t.parameters !== void 0 ? t.parameters[l.input] : l.input, f = t.parameters !== void 0 ? t.parameters[l.output] : l.output;
      h.node !== void 0 && (n.push(this.getDependency("node", E)), B.push(this.getDependency("accessor", d)), o.push(this.getDependency("accessor", f)), r.push(l), I.push(h));
    }
    return Promise.all([
      Promise.all(n),
      Promise.all(B),
      Promise.all(o),
      Promise.all(r),
      Promise.all(I)
    ]).then(function(a) {
      const c = a[0], Q = a[1], l = a[2], h = a[3], E = a[4], d = [];
      for (let f = 0, D = c.length; f < D; f++) {
        const F = c[f], p = Q[f], m = l[f], w = h[f], _ = E[f];
        if (F === void 0)
          continue;
        F.updateMatrix && F.updateMatrix();
        const H = s._createAnimationTracks(F, p, m, w, _);
        if (H)
          for (let W = 0; W < H.length; W++)
            d.push(H[W]);
      }
      return new _s(i, void 0, d);
    });
  }
  createNodeMesh(A) {
    const e = this.json, s = this, t = e.nodes[A];
    return t.mesh === void 0 ? null : s.getDependency("mesh", t.mesh).then(function(i) {
      const n = s._getNodeRef(s.meshCache, t.mesh, i);
      return t.weights !== void 0 && n.traverse(function(B) {
        if (B.isMesh)
          for (let o = 0, r = t.weights.length; o < r; o++)
            B.morphTargetInfluences[o] = t.weights[o];
      }), n;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(A) {
    const e = this.json, s = this, t = e.nodes[A], i = s._loadNodeShallow(A), n = [], B = t.children || [];
    for (let r = 0, I = B.length; r < I; r++)
      n.push(s.getDependency("node", B[r]));
    const o = t.skin === void 0 ? Promise.resolve(null) : s.getDependency("skin", t.skin);
    return Promise.all([
      i,
      Promise.all(n),
      o
    ]).then(function(r) {
      const I = r[0], a = r[1], c = r[2];
      c !== null && I.traverse(function(Q) {
        Q.isSkinnedMesh && Q.bind(c, An);
      });
      for (let Q = 0, l = a.length; Q < l; Q++)
        I.add(a[Q]);
      return I;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(A) {
    const e = this.json, s = this.extensions, t = this;
    if (this.nodeCache[A] !== void 0)
      return this.nodeCache[A];
    const i = e.nodes[A], n = i.name ? t.createUniqueName(i.name) : "", B = [], o = t._invokeOne(function(r) {
      return r.createNodeMesh && r.createNodeMesh(A);
    });
    return o && B.push(o), i.camera !== void 0 && B.push(t.getDependency("camera", i.camera).then(function(r) {
      return t._getNodeRef(t.cameraCache, i.camera, r);
    })), t._invokeAll(function(r) {
      return r.createNodeAttachment && r.createNodeAttachment(A);
    }).forEach(function(r) {
      B.push(r);
    }), this.nodeCache[A] = Promise.all(B).then(function(r) {
      let I;
      if (i.isBone === !0 ? I = new Ps() : r.length > 1 ? I = new jA() : r.length === 1 ? I = r[0] : I = new Ct(), I !== r[0])
        for (let a = 0, c = r.length; a < c; a++)
          I.add(r[a]);
      if (i.name && (I.userData.name = i.name, I.name = n), iA(I, i), i.extensions && hA(s, I, i), i.matrix !== void 0) {
        const a = new bA();
        a.fromArray(i.matrix), I.applyMatrix4(a);
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
    const n = s.nodes || [], B = [];
    for (let o = 0, r = n.length; o < r; o++)
      B.push(t.getDependency("node", n[o]));
    return Promise.all(B).then(function(o) {
      for (let I = 0, a = o.length; I < a; I++)
        i.add(o[I]);
      const r = (I) => {
        const a = /* @__PURE__ */ new Map();
        for (const [c, Q] of t.associations)
          (c instanceof ke || c instanceof lt) && a.set(c, Q);
        return I.traverse((c) => {
          const Q = t.associations.get(c);
          Q != null && a.set(c, Q);
        }), a;
      };
      return t.associations = r(i), i;
    });
  }
  _createAnimationTracks(A, e, s, t, i) {
    const n = [], B = A.name ? A.name : A.uuid, o = [];
    sA[i.path] === sA.weights ? A.traverse(function(c) {
      c.morphTargetInfluences && o.push(c.name ? c.name : c.uuid);
    }) : o.push(B);
    let r;
    switch (sA[i.path]) {
      case sA.weights:
        r = ut;
        break;
      case sA.rotation:
        r = ft;
        break;
      case sA.position:
      case sA.scale:
        r = dt;
        break;
      default:
        switch (s.itemSize) {
          case 1:
            r = ut;
            break;
          case 2:
          case 3:
          default:
            r = dt;
            break;
        }
        break;
    }
    const I = t.interpolation !== void 0 ? Wi[t.interpolation] : Pt, a = this._getArrayFromAccessor(s);
    for (let c = 0, Q = o.length; c < Q; c++) {
      const l = new r(
        o[c] + "." + sA[i.path],
        e.array,
        a,
        I
      );
      t.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(l), n.push(l);
    }
    return n;
  }
  _getArrayFromAccessor(A) {
    let e = A.array;
    if (A.normalized) {
      const s = st(e.constructor), t = new Float32Array(e.length);
      for (let i = 0, n = e.length; i < n; i++)
        t[i] = e[i] * s;
      e = t;
    }
    return e;
  }
  _createCubicSplineTrackInterpolant(A) {
    A.createInterpolant = function(s) {
      const t = this instanceof ft ? vi : Wt;
      return new t(this.times, this.values, this.getValueSize() / 3, s);
    }, A.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function tn(C, A, e) {
  const s = A.attributes, t = new zs();
  if (s.POSITION !== void 0) {
    const B = e.json.accessors[s.POSITION], o = B.min, r = B.max;
    if (o !== void 0 && r !== void 0) {
      if (t.set(
        new y(o[0], o[1], o[2]),
        new y(r[0], r[1], r[2])
      ), B.normalized) {
        const I = st(GA[B.componentType]);
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
    const B = new y(), o = new y();
    for (let r = 0, I = i.length; r < I; r++) {
      const a = i[r];
      if (a.POSITION !== void 0) {
        const c = e.json.accessors[a.POSITION], Q = c.min, l = c.max;
        if (Q !== void 0 && l !== void 0) {
          if (o.setX(Math.max(Math.abs(Q[0]), Math.abs(l[0]))), o.setY(Math.max(Math.abs(Q[1]), Math.abs(l[1]))), o.setZ(Math.max(Math.abs(Q[2]), Math.abs(l[2]))), c.normalized) {
            const h = st(GA[c.componentType]);
            o.multiplyScalar(h);
          }
          B.max(o);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    t.expandByVector(B);
  }
  C.boundingBox = t;
  const n = new $s();
  t.getCenter(n.center), n.radius = t.min.distanceTo(t.max) / 2, C.boundingSphere = n;
}
function St(C, A, e) {
  const s = A.attributes, t = [];
  function i(n, B) {
    return e.getDependency("accessor", n).then(function(o) {
      C.setAttribute(B, o);
    });
  }
  for (const n in s) {
    const B = tt[n] || n.toLowerCase();
    B in C.attributes || t.push(i(s[n], B));
  }
  if (A.indices !== void 0 && !C.index) {
    const n = e.getDependency("accessor", A.indices).then(function(B) {
      C.setIndex(B);
    });
    t.push(n);
  }
  return ht.workingColorSpace !== O && "COLOR_0" in s && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ht.workingColorSpace}" not supported.`), iA(C, A), tn(C, A, e), Promise.all(t).then(function() {
    return A.targets !== void 0 ? ji(C, A.targets, e) : C;
  });
}
const Pe = /* @__PURE__ */ new WeakMap();
class sn extends Bt {
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
    const i = new fA(this.manager);
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
    const B = {
      attributeIDs: s || this.defaultAttributeIDs,
      attributeTypes: t || this.defaultAttributeTypes,
      useUniqueIDs: !!s,
      vertexColorSpace: i
    };
    return this.decodeGeometry(A, B).then(e).catch(n);
  }
  decodeGeometry(A, e) {
    const s = JSON.stringify(e);
    if (Pe.has(A)) {
      const o = Pe.get(A);
      if (o.key === s)
        return o.promise;
      if (A.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let t;
    const i = this.workerNextTaskID++, n = A.byteLength, B = this._getWorker(i, n).then((o) => (t = o, new Promise((r, I) => {
      t._callbacks[i] = { resolve: r, reject: I }, t.postMessage({ type: "decode", id: i, taskConfig: e, buffer: A }, [A]);
    }))).then((o) => this._createGeometry(o.geometry));
    return B.catch(() => !0).then(() => {
      t && i && this._releaseTask(t, i);
    }), Pe.set(A, {
      key: s,
      promise: B
    }), B;
  }
  _createGeometry(A) {
    const e = new _t();
    A.index && e.setIndex(new VA(A.index.array, 1));
    for (let s = 0; s < A.attributes.length; s++) {
      const t = A.attributes[s], i = t.name, n = t.array, B = t.itemSize, o = new VA(n, B);
      i === "color" && (this._assignVertexColorSpace(o, t.vertexColorSpace), o.normalized = !(n instanceof Float32Array)), e.setAttribute(i, o);
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
    const s = new fA(this.manager);
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
      const i = nn.toString(), n = [
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
function nn() {
  let C, A;
  onmessage = function(n) {
    const B = n.data;
    switch (B.type) {
      case "init":
        C = B.decoderConfig, A = new Promise(function(I) {
          C.onModuleLoaded = function(a) {
            I({ draco: a });
          }, DracoDecoderModule(C);
        });
        break;
      case "decode":
        const o = B.buffer, r = B.taskConfig;
        A.then((I) => {
          const a = I.draco, c = new a.Decoder();
          try {
            const Q = e(a, c, new Int8Array(o), r), l = Q.attributes.map((h) => h.array.buffer);
            Q.index && l.push(Q.index.array.buffer), self.postMessage({ type: "decode", id: B.id, geometry: Q }, l);
          } catch (Q) {
            console.error(Q), self.postMessage({ type: "error", id: B.id, error: Q.message });
          } finally {
            a.destroy(c);
          }
        });
        break;
    }
  };
  function e(n, B, o, r) {
    const I = r.attributeIDs, a = r.attributeTypes;
    let c, Q;
    const l = B.GetEncodedGeometryType(o);
    if (l === n.TRIANGULAR_MESH)
      c = new n.Mesh(), Q = B.DecodeArrayToMesh(o, o.byteLength, c);
    else if (l === n.POINT_CLOUD)
      c = new n.PointCloud(), Q = B.DecodeArrayToPointCloud(o, o.byteLength, c);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!Q.ok() || c.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + Q.error_msg());
    const h = { index: null, attributes: [] };
    for (const E in I) {
      const d = self[a[E]];
      let f, D;
      if (r.useUniqueIDs)
        D = I[E], f = B.GetAttributeByUniqueId(c, D);
      else {
        if (D = B.GetAttributeId(c, n[I[E]]), D === -1)
          continue;
        f = B.GetAttribute(c, D);
      }
      const F = t(n, B, c, E, d, f);
      E === "color" && (F.vertexColorSpace = r.vertexColorSpace), h.attributes.push(F);
    }
    return l === n.TRIANGULAR_MESH && (h.index = s(n, B, c)), n.destroy(c), h;
  }
  function s(n, B, o) {
    const I = o.num_faces() * 3, a = I * 4, c = n._malloc(a);
    B.GetTrianglesUInt32Array(o, a, c);
    const Q = new Uint32Array(n.HEAPF32.buffer, c, I).slice();
    return n._free(c), { array: Q, itemSize: 1 };
  }
  function t(n, B, o, r, I, a) {
    const c = a.num_components(), l = o.num_points() * c, h = l * I.BYTES_PER_ELEMENT, E = i(n, I), d = n._malloc(h);
    B.GetAttributeDataArrayForAllPoints(o, a, E, h, d);
    const f = new I(n.HEAPF32.buffer, d, l).slice();
    return n._free(d), {
      name: r,
      array: f,
      itemSize: c
    };
  }
  function i(n, B) {
    switch (B) {
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
class on {
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
const Bn = 0, Lt = 2, rn = 1, yt = 2, an = 0, Cn = 1, In = 10, gn = 0, Vt = 9, jt = 15, Zt = 16, zt = 22, $t = 37, As = 43, es = 76, ts = 83, ss = 97, is = 100, ns = 103, os = 109, Bs = 165, rs = 166;
class En {
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
function Ht(C) {
  return typeof TextDecoder != "undefined" ? new TextDecoder().decode(C) : Buffer.from(C).toString("utf8");
}
function cn(C) {
  const A = new Uint8Array(C.buffer, C.byteOffset, L.length);
  if (A[0] !== L[0] || A[1] !== L[1] || A[2] !== L[2] || A[3] !== L[3] || A[4] !== L[4] || A[5] !== L[5] || A[6] !== L[6] || A[7] !== L[7] || A[8] !== L[8] || A[9] !== L[9] || A[10] !== L[10] || A[11] !== L[11])
    throw new Error("Missing KTX 2.0 identifier.");
  const e = new En(), s = 17 * Uint32Array.BYTES_PER_ELEMENT, t = new YA(C, L.length, s, !0);
  e.vkFormat = t._nextUint32(), e.typeSize = t._nextUint32(), e.pixelWidth = t._nextUint32(), e.pixelHeight = t._nextUint32(), e.pixelDepth = t._nextUint32(), e.layerCount = t._nextUint32(), e.faceCount = t._nextUint32();
  const i = t._nextUint32();
  e.supercompressionScheme = t._nextUint32();
  const n = t._nextUint32(), B = t._nextUint32(), o = t._nextUint32(), r = t._nextUint32(), I = t._nextUint64(), a = t._nextUint64(), c = new YA(C, L.length + s, 3 * i * 8, !0);
  for (let S = 0; S < i; S++)
    e.levels.push({ levelData: new Uint8Array(C.buffer, C.byteOffset + c._nextUint64(), c._nextUint64()), uncompressedByteLength: c._nextUint64() });
  const Q = new YA(C, n, B, !0), l = { vendorId: Q._skip(4)._nextUint16(), descriptorType: Q._nextUint16(), versionNumber: Q._nextUint16(), descriptorBlockSize: Q._nextUint16(), colorModel: Q._nextUint8(), colorPrimaries: Q._nextUint8(), transferFunction: Q._nextUint8(), flags: Q._nextUint8(), texelBlockDimension: [Q._nextUint8(), Q._nextUint8(), Q._nextUint8(), Q._nextUint8()], bytesPlane: [Q._nextUint8(), Q._nextUint8(), Q._nextUint8(), Q._nextUint8(), Q._nextUint8(), Q._nextUint8(), Q._nextUint8(), Q._nextUint8()], samples: [] }, h = (l.descriptorBlockSize / 4 - 6) / 4;
  for (let S = 0; S < h; S++) {
    const T = { bitOffset: Q._nextUint16(), bitLength: Q._nextUint8(), channelType: Q._nextUint8(), samplePosition: [Q._nextUint8(), Q._nextUint8(), Q._nextUint8(), Q._nextUint8()], sampleLower: -1 / 0, sampleUpper: 1 / 0 };
    64 & T.channelType ? (T.sampleLower = Q._nextInt32(), T.sampleUpper = Q._nextInt32()) : (T.sampleLower = Q._nextUint32(), T.sampleUpper = Q._nextUint32()), l.samples[S] = T;
  }
  e.dataFormatDescriptor.length = 0, e.dataFormatDescriptor.push(l);
  const E = new YA(C, o, r, !0);
  for (; E._offset < r; ) {
    const S = E._nextUint32(), T = E._scan(S), OA = Ht(T), V = E._scan(S - T.byteLength);
    e.keyValue[OA] = OA.match(/^ktx/i) ? Ht(V) : V, E._offset % 4 && E._skip(4 - E._offset % 4);
  }
  if (a <= 0)
    return e;
  const d = new YA(C, I, a, !0), f = d._nextUint16(), D = d._nextUint16(), F = d._nextUint32(), p = d._nextUint32(), m = d._nextUint32(), w = d._nextUint32(), _ = [];
  for (let S = 0; S < i; S++)
    _.push({ imageFlags: d._nextUint32(), rgbSliceByteOffset: d._nextUint32(), rgbSliceByteLength: d._nextUint32(), alphaSliceByteOffset: d._nextUint32(), alphaSliceByteLength: d._nextUint32() });
  const H = I + d._offset, W = H + F, KA = W + p, Ge = KA + m, cA = new Uint8Array(C.buffer, C.byteOffset + H, F), Re = new Uint8Array(C.buffer, C.byteOffset + W, p), eA = new Uint8Array(C.buffer, C.byteOffset + KA, m), pe = new Uint8Array(C.buffer, C.byteOffset + Ge, w);
  return e.globalData = { endpointCount: f, selectorCount: D, imageDescs: _, endpointsData: cA, selectorsData: Re, tablesData: eA, extendedData: pe }, e;
}
let Ye, j, it;
const qe = { env: { emscripten_notify_memory_growth: function(C) {
  it = new Uint8Array(j.exports.memory.buffer);
} } };
class Qn {
  init() {
    return Ye || (Ye = typeof fetch != "undefined" ? fetch("data:application/wasm;base64," + Jt).then((A) => A.arrayBuffer()).then((A) => WebAssembly.instantiate(A, qe)).then(this._init) : WebAssembly.instantiate(Buffer.from(Jt, "base64"), qe).then(this._init), Ye);
  }
  _init(A) {
    j = A.instance, qe.env.emscripten_notify_memory_growth(0);
  }
  decode(A, e = 0) {
    if (!j)
      throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const s = A.byteLength, t = j.exports.malloc(s);
    it.set(A, t), e = e || Number(j.exports.ZSTD_findDecompressedSize(t, s));
    const i = j.exports.malloc(e), n = j.exports.ZSTD_decompress(i, e, t, s), B = it.slice(i, i + n);
    return j.exports.free(t), j.exports.free(i), B;
  }
}
const Jt = "AGFzbQEAAAABpQEVYAF/AX9gAn9/AGADf39/AX9gBX9/f39/AX9gAX8AYAJ/fwF/YAR/f39/AX9gA39/fwBgBn9/f39/fwF/YAd/f39/f39/AX9gAn9/AX5gAn5+AX5gAABgBX9/f39/AGAGf39/f39/AGAIf39/f39/f38AYAl/f39/f39/f38AYAABf2AIf39/f39/f38Bf2ANf39/f39/f39/f39/fwF/YAF/AX4CJwEDZW52H2Vtc2NyaXB0ZW5fbm90aWZ5X21lbW9yeV9ncm93dGgABANpaAEFAAAFAgEFCwACAQABAgIFBQcAAwABDgsBAQcAEhMHAAUBDAQEAAANBwQCAgYCBAgDAwMDBgEACQkHBgICAAYGAgQUBwYGAwIGAAMCAQgBBwUGCgoEEQAEBAEIAwgDBQgDEA8IAAcABAUBcAECAgUEAQCAAgYJAX8BQaCgwAILB2AHBm1lbW9yeQIABm1hbGxvYwAoBGZyZWUAJgxaU1REX2lzRXJyb3IAaBlaU1REX2ZpbmREZWNvbXByZXNzZWRTaXplAFQPWlNURF9kZWNvbXByZXNzAEoGX3N0YXJ0ACQJBwEAQQELASQKussBaA8AIAAgACgCBCABajYCBAsZACAAKAIAIAAoAgRBH3F0QQAgAWtBH3F2CwgAIABBiH9LC34BBH9BAyEBIAAoAgQiA0EgTQRAIAAoAggiASAAKAIQTwRAIAAQDQ8LIAAoAgwiAiABRgRAQQFBAiADQSBJGw8LIAAgASABIAJrIANBA3YiBCABIARrIAJJIgEbIgJrIgQ2AgggACADIAJBA3RrNgIEIAAgBCgAADYCAAsgAQsUAQF/IAAgARACIQIgACABEAEgAgv3AQECfyACRQRAIABCADcCACAAQQA2AhAgAEIANwIIQbh/DwsgACABNgIMIAAgAUEEajYCECACQQRPBEAgACABIAJqIgFBfGoiAzYCCCAAIAMoAAA2AgAgAUF/ai0AACIBBEAgAEEIIAEQFGs2AgQgAg8LIABBADYCBEF/DwsgACABNgIIIAAgAS0AACIDNgIAIAJBfmoiBEEBTQRAIARBAWtFBEAgACABLQACQRB0IANyIgM2AgALIAAgAS0AAUEIdCADajYCAAsgASACakF/ai0AACIBRQRAIABBADYCBEFsDwsgAEEoIAEQFCACQQN0ams2AgQgAgsWACAAIAEpAAA3AAAgACABKQAINwAICy8BAX8gAUECdEGgHWooAgAgACgCAEEgIAEgACgCBGprQR9xdnEhAiAAIAEQASACCyEAIAFCz9bTvtLHq9lCfiAAfEIfiUKHla+vmLbem55/fgsdAQF/IAAoAgggACgCDEYEfyAAKAIEQSBGBUEACwuCBAEDfyACQYDAAE8EQCAAIAEgAhBnIAAPCyAAIAJqIQMCQCAAIAFzQQNxRQRAAkAgAkEBSARAIAAhAgwBCyAAQQNxRQRAIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADTw0BIAJBA3ENAAsLAkAgA0F8cSIEQcAASQ0AIAIgBEFAaiIFSw0AA0AgAiABKAIANgIAIAIgASgCBDYCBCACIAEoAgg2AgggAiABKAIMNgIMIAIgASgCEDYCECACIAEoAhQ2AhQgAiABKAIYNgIYIAIgASgCHDYCHCACIAEoAiA2AiAgAiABKAIkNgIkIAIgASgCKDYCKCACIAEoAiw2AiwgAiABKAIwNgIwIAIgASgCNDYCNCACIAEoAjg2AjggAiABKAI8NgI8IAFBQGshASACQUBrIgIgBU0NAAsLIAIgBE8NAQNAIAIgASgCADYCACABQQRqIQEgAkEEaiICIARJDQALDAELIANBBEkEQCAAIQIMAQsgA0F8aiIEIABJBEAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCyACIANJBEADQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADRw0ACwsgAAsMACAAIAEpAAA3AAALQQECfyAAKAIIIgEgACgCEEkEQEEDDwsgACAAKAIEIgJBB3E2AgQgACABIAJBA3ZrIgE2AgggACABKAAANgIAQQALDAAgACABKAIANgAAC/cCAQJ/AkAgACABRg0AAkAgASACaiAASwRAIAAgAmoiBCABSw0BCyAAIAEgAhALDwsgACABc0EDcSEDAkACQCAAIAFJBEAgAwRAIAAhAwwDCyAAQQNxRQRAIAAhAwwCCyAAIQMDQCACRQ0EIAMgAS0AADoAACABQQFqIQEgAkF/aiECIANBAWoiA0EDcQ0ACwwBCwJAIAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigCACACaiAAQQZ2IgFBAnRBsB5qKAIAaiAAQSBxIgBFaiABRSAAQQV2cWoFQbh/CwsdACAAKAKQ4gEQWiAAQQA2AqDiASAAQgA3A5DiAQu1AwEFfyMAQZACayIKJABBuH8hBgJAIAVFDQAgBCwAACIIQf8BcSEHAkAgCEF/TARAIAdBgn9qQQF2IgggBU8NAkFsIQYgB0GBf2oiBUGAAk8NAiAEQQFqIQdBACEGA0AgBiAFTwRAIAUhBiAIIQcMAwUgACAGaiAHIAZBAXZqIgQtAABBBHY6AAAgACAGQQFyaiAELQAAQQ9xOgAAIAZBAmohBgwBCwAACwALIAcgBU8NASAAIARBAWogByAKEFMiBhADDQELIAYhBEEAIQYgAUEAQTQQECEJQQAhBQNAIAQgBkcEQCAAIAZqIggtAAAiAUELSwRAQWwhBgwDBSAJIAFBAnRqIgEgASgCAEEBajYCACAGQQFqIQZBASAILQAAdEEBdSAFaiEFDAILAAsLQWwhBiAFRQ0AIAUQFEEBaiIBQQxLDQAgAyABNgIAQQFBASABdCAFayIDEBQiAXQgA0cNACAAIARqIAFBAWoiADoAACAJIABBAnRqIgAgACgCAEEBajYCACAJKAIEIgBBAkkgAEEBcXINACACIARBAWo2AgAgB0EBaiEGCyAKQZACaiQAIAYLxhEBDH8jAEHwAGsiBSQAQWwhCwJAIANBCkkNACACLwAAIQogAi8AAiEJIAIvAAQhByAFQQhqIAQQDgJAIAMgByAJIApqakEGaiIMSQ0AIAUtAAohCCAFQdgAaiACQQZqIgIgChAGIgsQAw0BIAVBQGsgAiAKaiICIAkQBiILEAMNASAFQShqIAIgCWoiAiAHEAYiCxADDQEgBUEQaiACIAdqIAMgDGsQBiILEAMNASAAIAFqIg9BfWohECAEQQRqIQZBASELIAAgAUEDakECdiIDaiIMIANqIgIgA2oiDiEDIAIhBCAMIQcDQCALIAMgEElxBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgCS0AAyELIAcgBiAFQUBrIAgQAkECdGoiCS8BADsAACAFQUBrIAktAAIQASAJLQADIQogBCAGIAVBKGogCBACQQJ0aiIJLwEAOwAAIAVBKGogCS0AAhABIAktAAMhCSADIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgDS0AAyENIAAgC2oiCyAGIAVB2ABqIAgQAkECdGoiAC8BADsAACAFQdgAaiAALQACEAEgAC0AAyEAIAcgCmoiCiAGIAVBQGsgCBACQQJ0aiIHLwEAOwAAIAVBQGsgBy0AAhABIActAAMhByAEIAlqIgkgBiAFQShqIAgQAkECdGoiBC8BADsAACAFQShqIAQtAAIQASAELQADIQQgAyANaiIDIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgACALaiEAIAcgCmohByAEIAlqIQQgAyANLQADaiEDIAVB2ABqEA0gBUFAaxANciAFQShqEA1yIAVBEGoQDXJFIQsMAQsLIAQgDksgByACS3INAEFsIQsgACAMSw0BIAxBfWohCQNAQQAgACAJSSAFQdgAahAEGwRAIAAgBiAFQdgAaiAIEAJBAnRqIgovAQA7AAAgBUHYAGogCi0AAhABIAAgCi0AA2oiACAGIAVB2ABqIAgQAkECdGoiCi8BADsAACAFQdgAaiAKLQACEAEgACAKLQADaiEADAEFIAxBfmohCgNAIAVB2ABqEAQgACAKS3JFBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgACAJLQADaiEADAELCwNAIAAgCk0EQCAAIAYgBUHYAGogCBACQQJ0aiIJLwEAOwAAIAVB2ABqIAktAAIQASAAIAktAANqIQAMAQsLAkAgACAMTw0AIAAgBiAFQdgAaiAIEAIiAEECdGoiDC0AADoAACAMLQADQQFGBEAgBUHYAGogDC0AAhABDAELIAUoAlxBH0sNACAFQdgAaiAGIABBAnRqLQACEAEgBSgCXEEhSQ0AIAVBIDYCXAsgAkF9aiEMA0BBACAHIAxJIAVBQGsQBBsEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiIAIAYgBUFAayAIEAJBAnRqIgcvAQA7AAAgBUFAayAHLQACEAEgACAHLQADaiEHDAEFIAJBfmohDANAIAVBQGsQBCAHIAxLckUEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwNAIAcgDE0EQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwJAIAcgAk8NACAHIAYgBUFAayAIEAIiAEECdGoiAi0AADoAACACLQADQQFGBEAgBUFAayACLQACEAEMAQsgBSgCREEfSw0AIAVBQGsgBiAAQQJ0ai0AAhABIAUoAkRBIUkNACAFQSA2AkQLIA5BfWohAgNAQQAgBCACSSAFQShqEAQbBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2oiACAGIAVBKGogCBACQQJ0aiIELwEAOwAAIAVBKGogBC0AAhABIAAgBC0AA2ohBAwBBSAOQX5qIQIDQCAFQShqEAQgBCACS3JFBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsDQCAEIAJNBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsCQCAEIA5PDQAgBCAGIAVBKGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBKGogAi0AAhABDAELIAUoAixBH0sNACAFQShqIAYgAEECdGotAAIQASAFKAIsQSFJDQAgBUEgNgIsCwNAQQAgAyAQSSAFQRBqEAQbBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2oiACAGIAVBEGogCBACQQJ0aiICLwEAOwAAIAVBEGogAi0AAhABIAAgAi0AA2ohAwwBBSAPQX5qIQIDQCAFQRBqEAQgAyACS3JFBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsDQCADIAJNBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsCQCADIA9PDQAgAyAGIAVBEGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBEGogAi0AAhABDAELIAUoAhRBH0sNACAFQRBqIAYgAEECdGotAAIQASAFKAIUQSFJDQAgBUEgNgIUCyABQWwgBUHYAGoQCiAFQUBrEApxIAVBKGoQCnEgBUEQahAKcRshCwwJCwAACwALAAALAAsAAAsACwAACwALQWwhCwsgBUHwAGokACALC7UEAQ5/IwBBEGsiBiQAIAZBBGogABAOQVQhBQJAIARB3AtJDQAgBi0ABCEHIANB8ARqQQBB7AAQECEIIAdBDEsNACADQdwJaiIJIAggBkEIaiAGQQxqIAEgAhAxIhAQA0UEQCAGKAIMIgQgB0sNASADQdwFaiEPIANBpAVqIREgAEEEaiESIANBqAVqIQEgBCEFA0AgBSICQX9qIQUgCCACQQJ0aigCAEUNAAsgAkEBaiEOQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgASALaiAKNgIAIAVBAWohBSAKIAxqIQoMAQsLIAEgCjYCAEEAIQUgBigCCCELA0AgBSALRkUEQCABIAUgCWotAAAiDEECdGoiDSANKAIAIg1BAWo2AgAgDyANQQF0aiINIAw6AAEgDSAFOgAAIAVBAWohBQwBCwtBACEBIANBADYCqAUgBEF/cyAHaiEJQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgAyALaiABNgIAIAwgBSAJanQgAWohASAFQQFqIQUMAQsLIAcgBEEBaiIBIAJrIgRrQQFqIQgDQEEBIQUgBCAIT0UEQANAIAUgDk9FBEAgBUECdCIJIAMgBEE0bGpqIAMgCWooAgAgBHY2AgAgBUEBaiEFDAELCyAEQQFqIQQMAQsLIBIgByAPIAogESADIAIgARBkIAZBAToABSAGIAc6AAYgACAGKAIENgIACyAQIQULIAZBEGokACAFC8ENAQt/IwBB8ABrIgUkAEFsIQkCQCADQQpJDQAgAi8AACEKIAIvAAIhDCACLwAEIQYgBUEIaiAEEA4CQCADIAYgCiAMampBBmoiDUkNACAFLQAKIQcgBUHYAGogAkEGaiICIAoQBiIJEAMNASAFQUBrIAIgCmoiAiAMEAYiCRADDQEgBUEoaiACIAxqIgIgBhAGIgkQAw0BIAVBEGogAiAGaiADIA1rEAYiCRADDQEgACABaiIOQX1qIQ8gBEEEaiEGQQEhCSAAIAFBA2pBAnYiAmoiCiACaiIMIAJqIg0hAyAMIQQgCiECA0AgCSADIA9JcQRAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAACAGIAVBQGsgBxACQQF0aiIILQAAIQsgBUFAayAILQABEAEgAiALOgAAIAYgBUEoaiAHEAJBAXRqIggtAAAhCyAFQShqIAgtAAEQASAEIAs6AAAgBiAFQRBqIAcQAkEBdGoiCC0AACELIAVBEGogCC0AARABIAMgCzoAACAGIAVB2ABqIAcQAkEBdGoiCC0AACELIAVB2ABqIAgtAAEQASAAIAs6AAEgBiAFQUBrIAcQAkEBdGoiCC0AACELIAVBQGsgCC0AARABIAIgCzoAASAGIAVBKGogBxACQQF0aiIILQAAIQsgBUEoaiAILQABEAEgBCALOgABIAYgBUEQaiAHEAJBAXRqIggtAAAhCyAFQRBqIAgtAAEQASADIAs6AAEgA0ECaiEDIARBAmohBCACQQJqIQIgAEECaiEAIAkgBUHYAGoQDUVxIAVBQGsQDUVxIAVBKGoQDUVxIAVBEGoQDUVxIQkMAQsLIAQgDUsgAiAMS3INAEFsIQkgACAKSw0BIApBfWohCQNAIAVB2ABqEAQgACAJT3JFBEAgBiAFQdgAaiAHEAJBAXRqIggtAAAhCyAFQdgAaiAILQABEAEgACALOgAAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAASAAQQJqIQAMAQsLA0AgBUHYAGoQBCAAIApPckUEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCwNAIAAgCkkEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCyAMQX1qIQADQCAFQUBrEAQgAiAAT3JFBEAgBiAFQUBrIAcQAkEBdGoiCi0AACEJIAVBQGsgCi0AARABIAIgCToAACAGIAVBQGsgBxACQQF0aiIKLQAAIQkgBUFAayAKLQABEAEgAiAJOgABIAJBAmohAgwBCwsDQCAFQUBrEAQgAiAMT3JFBEAgBiAFQUBrIAcQAkEBdGoiAC0AACEKIAVBQGsgAC0AARABIAIgCjoAACACQQFqIQIMAQsLA0AgAiAMSQRAIAYgBUFAayAHEAJBAXRqIgAtAAAhCiAFQUBrIAAtAAEQASACIAo6AAAgAkEBaiECDAELCyANQX1qIQADQCAFQShqEAQgBCAAT3JFBEAgBiAFQShqIAcQAkEBdGoiAi0AACEKIAVBKGogAi0AARABIAQgCjoAACAGIAVBKGogBxACQQF0aiICLQAAIQogBUEoaiACLQABEAEgBCAKOgABIARBAmohBAwBCwsDQCAFQShqEAQgBCANT3JFBEAgBiAFQShqIAcQAkEBdGoiAC0AACECIAVBKGogAC0AARABIAQgAjoAACAEQQFqIQQMAQsLA0AgBCANSQRAIAYgBUEoaiAHEAJBAXRqIgAtAAAhAiAFQShqIAAtAAEQASAEIAI6AAAgBEEBaiEEDAELCwNAIAVBEGoQBCADIA9PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIAYgBUEQaiAHEAJBAXRqIgAtAAAhAiAFQRBqIAAtAAEQASADIAI6AAEgA0ECaiEDDAELCwNAIAVBEGoQBCADIA5PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIANBAWohAwwBCwsDQCADIA5JBEAgBiAFQRBqIAcQAkEBdGoiAC0AACECIAVBEGogAC0AARABIAMgAjoAACADQQFqIQMMAQsLIAFBbCAFQdgAahAKIAVBQGsQCnEgBUEoahAKcSAFQRBqEApxGyEJDAELQWwhCQsgBUHwAGokACAJC8oCAQR/IwBBIGsiBSQAIAUgBBAOIAUtAAIhByAFQQhqIAIgAxAGIgIQA0UEQCAEQQRqIQIgACABaiIDQX1qIQQDQCAFQQhqEAQgACAET3JFBEAgAiAFQQhqIAcQAkEBdGoiBi0AACEIIAVBCGogBi0AARABIAAgCDoAACACIAVBCGogBxACQQF0aiIGLQAAIQggBUEIaiAGLQABEAEgACAIOgABIABBAmohAAwBCwsDQCAFQQhqEAQgACADT3JFBEAgAiAFQQhqIAcQAkEBdGoiBC0AACEGIAVBCGogBC0AARABIAAgBjoAACAAQQFqIQAMAQsLA0AgACADT0UEQCACIAVBCGogBxACQQF0aiIELQAAIQYgBUEIaiAELQABEAEgACAGOgAAIABBAWohAAwBCwsgAUFsIAVBCGoQChshAgsgBUEgaiQAIAILtgMBCX8jAEEQayIGJAAgBkEANgIMIAZBADYCCEFUIQQCQAJAIANBQGsiDCADIAZBCGogBkEMaiABIAIQMSICEAMNACAGQQRqIAAQDiAGKAIMIgcgBi0ABEEBaksNASAAQQRqIQogBkEAOgAFIAYgBzoABiAAIAYoAgQ2AgAgB0EBaiEJQQEhBANAIAQgCUkEQCADIARBAnRqIgEoAgAhACABIAU2AgAgACAEQX9qdCAFaiEFIARBAWohBAwBCwsgB0EBaiEHQQAhBSAGKAIIIQkDQCAFIAlGDQEgAyAFIAxqLQAAIgRBAnRqIgBBASAEdEEBdSILIAAoAgAiAWoiADYCACAHIARrIQhBACEEAkAgC0EDTQRAA0AgBCALRg0CIAogASAEakEBdGoiACAIOgABIAAgBToAACAEQQFqIQQMAAALAAsDQCABIABPDQEgCiABQQF0aiIEIAg6AAEgBCAFOgAAIAQgCDoAAyAEIAU6AAIgBCAIOgAFIAQgBToABCAEIAg6AAcgBCAFOgAGIAFBBGohAQwAAAsACyAFQQFqIQUMAAALAAsgAiEECyAGQRBqJAAgBAutAQECfwJAQYQgKAIAIABHIAAoAgBBAXYiAyABa0F4aiICQXhxQQhHcgR/IAIFIAMQJ0UNASACQQhqC0EQSQ0AIAAgACgCACICQQFxIAAgAWpBD2pBeHEiASAAa0EBdHI2AgAgASAANgIEIAEgASgCAEEBcSAAIAJBAXZqIAFrIgJBAXRyNgIAQYQgIAEgAkH/////B3FqQQRqQYQgKAIAIABGGyABNgIAIAEQJQsLygIBBX8CQAJAAkAgAEEIIABBCEsbZ0EfcyAAaUEBR2oiAUEESSAAIAF2cg0AIAFBAnRB/B5qKAIAIgJFDQADQCACQXhqIgMoAgBBAXZBeGoiBSAATwRAIAIgBUEIIAVBCEsbZ0Efc0ECdEGAH2oiASgCAEYEQCABIAIoAgQ2AgALDAMLIARBHksNASAEQQFqIQQgAigCBCICDQALC0EAIQMgAUEgTw0BA0AgAUECdEGAH2ooAgAiAkUEQCABQR5LIQIgAUEBaiEBIAJFDQEMAwsLIAIgAkF4aiIDKAIAQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgBGBEAgASACKAIENgIACwsgAigCACIBBEAgASACKAIENgIECyACKAIEIgEEQCABIAIoAgA2AgALIAMgAygCAEEBcjYCACADIAAQNwsgAwvhCwINfwV+IwBB8ABrIgckACAHIAAoAvDhASIINgJcIAEgAmohDSAIIAAoAoDiAWohDwJAAkAgBUUEQCABIQQMAQsgACgCxOABIRAgACgCwOABIREgACgCvOABIQ4gAEEBNgKM4QFBACEIA0AgCEEDRwRAIAcgCEECdCICaiAAIAJqQazQAWooAgA2AkQgCEEBaiEIDAELC0FsIQwgB0EYaiADIAQQBhADDQEgB0EsaiAHQRhqIAAoAgAQEyAHQTRqIAdBGGogACgCCBATIAdBPGogB0EYaiAAKAIEEBMgDUFgaiESIAEhBEEAIQwDQCAHKAIwIAcoAixBA3RqKQIAIhRCEIinQf8BcSEIIAcoAkAgBygCPEEDdGopAgAiFUIQiKdB/wFxIQsgBygCOCAHKAI0QQN0aikCACIWQiCIpyEJIBVCIIghFyAUQiCIpyECAkAgFkIQiKdB/wFxIgNBAk8EQAJAIAZFIANBGUlyRQRAIAkgB0EYaiADQSAgBygCHGsiCiAKIANLGyIKEAUgAyAKayIDdGohCSAHQRhqEAQaIANFDQEgB0EYaiADEAUgCWohCQwBCyAHQRhqIAMQBSAJaiEJIAdBGGoQBBoLIAcpAkQhGCAHIAk2AkQgByAYNwNIDAELAkAgA0UEQCACBEAgBygCRCEJDAMLIAcoAkghCQwBCwJAAkAgB0EYakEBEAUgCSACRWpqIgNBA0YEQCAHKAJEQX9qIgMgA0VqIQkMAQsgA0ECdCAHaigCRCIJIAlFaiEJIANBAUYNAQsgByAHKAJINgJMCwsgByAHKAJENgJIIAcgCTYCRAsgF6chAyALBEAgB0EYaiALEAUgA2ohAwsgCCALakEUTwRAIAdBGGoQBBoLIAgEQCAHQRhqIAgQBSACaiECCyAHQRhqEAQaIAcgB0EYaiAUQhiIp0H/AXEQCCAUp0H//wNxajYCLCAHIAdBGGogFUIYiKdB/wFxEAggFadB//8DcWo2AjwgB0EYahAEGiAHIAdBGGogFkIYiKdB/wFxEAggFqdB//8DcWo2AjQgByACNgJgIAcoAlwhCiAHIAk2AmggByADNgJkAkACQAJAIAQgAiADaiILaiASSw0AIAIgCmoiEyAPSw0AIA0gBGsgC0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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", Xe = /* @__PURE__ */ new WeakMap();
let ve = 0, We;
class v extends Bt {
  constructor(A) {
    super(A), this.transcoderPath = "", this.transcoderBinary = null, this.transcoderPending = null, this.workerPool = new on(), this.workerSourceURL = "", this.workerConfig = null, typeof MSC_TRANSCODER != "undefined" && console.warn(
      'THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.'
    );
  }
  setTranscoderPath(A) {
    return this.transcoderPath = A, this;
  }
  setWorkerLimit(A) {
    return this.workerPool.setWorkerLimit(A), this;
  }
  detectSupportAsync(A) {
    return _A(this, null, function* () {
      return this.workerConfig = {
        astcSupported: yield A.hasFeatureAsync("texture-compression-astc"),
        etc1Supported: yield A.hasFeatureAsync("texture-compression-etc1"),
        etc2Supported: yield A.hasFeatureAsync("texture-compression-etc2"),
        dxtSupported: yield A.hasFeatureAsync("texture-compression-bc"),
        bptcSupported: yield A.hasFeatureAsync("texture-compression-bptc"),
        pvrtcSupported: yield A.hasFeatureAsync("texture-compression-pvrtc")
      }, this;
    });
  }
  detectSupport(A) {
    return A.isWebGPURenderer === !0 ? this.workerConfig = {
      astcSupported: A.hasFeature("texture-compression-astc"),
      etc1Supported: A.hasFeature("texture-compression-etc1"),
      etc2Supported: A.hasFeature("texture-compression-etc2"),
      dxtSupported: A.hasFeature("texture-compression-bc"),
      bptcSupported: A.hasFeature("texture-compression-bptc"),
      pvrtcSupported: A.hasFeature("texture-compression-pvrtc")
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
      const A = new fA(this.manager);
      A.setPath(this.transcoderPath), A.setWithCredentials(this.withCredentials);
      const e = A.loadAsync("basis_transcoder.js"), s = new fA(this.manager);
      s.setPath(this.transcoderPath), s.setResponseType("arraybuffer"), s.setWithCredentials(this.withCredentials);
      const t = s.loadAsync("basis_transcoder.wasm");
      this.transcoderPending = Promise.all([e, t]).then(([i, n]) => {
        const B = v.BasisWorker.toString(), o = [
          "/* constants */",
          "let _EngineFormat = " + JSON.stringify(v.EngineFormat),
          "let _TranscoderFormat = " + JSON.stringify(v.TranscoderFormat),
          "let _BasisFormat = " + JSON.stringify(v.BasisFormat),
          "/* basis_transcoder.js */",
          i,
          "/* worker */",
          B.substring(B.indexOf("{") + 1, B.lastIndexOf("}"))
        ].join(`
`);
        this.workerSourceURL = URL.createObjectURL(new Blob([o])), this.transcoderBinary = n, this.workerPool.setWorkerCreator(() => {
          const r = new Worker(this.workerSourceURL), I = this.transcoderBinary.slice(0);
          return r.postMessage({ type: "init", config: this.workerConfig, transcoderBinary: I }, [I]), r;
        });
      }), ve > 0 && console.warn(
        "THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."
      ), ve++;
    }
    return this.transcoderPending;
  }
  load(A, e, s, t) {
    if (this.workerConfig === null)
      throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");
    const i = new fA(this.manager);
    i.setResponseType("arraybuffer"), i.setWithCredentials(this.withCredentials), i.load(A, (n) => {
      if (Xe.has(n))
        return Xe.get(n).promise.then(e).catch(t);
      this._createTexture(n).then((B) => e ? e(B) : null).catch(t);
    }, s, t);
  }
  _createTextureFrom(A, e) {
    const { faces: s, width: t, height: i, format: n, type: B, error: o, dfdFlags: r } = A;
    if (B === "error")
      return Promise.reject(o);
    let I;
    if (e.faceCount === 6)
      I = new ei(s, n, K);
    else {
      const a = s[0].mipmaps;
      I = e.layerCount > 1 ? new ti(a, t, i, e.layerCount, n, K) : new Yt(a, t, i, n, K);
    }
    return I.minFilter = s[0].mipmaps.length === 1 ? Je : It, I.magFilter = Je, I.generateMipmaps = !1, I.needsUpdate = !0, I.colorSpace = as(e), I.premultiplyAlpha = !!(r & rn), I;
  }
  /**
   * @param {ArrayBuffer} buffer
   * @param {object?} config
   * @return {Promise<CompressedTexture|CompressedArrayTexture|DataTexture|Data3DTexture>}
   */
  _createTexture(s) {
    return _A(this, arguments, function* (A, e = {}) {
      const t = cn(new Uint8Array(A));
      if (t.vkFormat !== gn)
        return ln(t);
      const i = e, n = this.init().then(() => this.workerPool.postMessage({ type: "transcode", buffer: A, taskConfig: i }, [A])).then((B) => this._createTextureFrom(B.data, t));
      return Xe.set(A, { promise: n }), n;
    });
  }
  dispose() {
    return this.workerPool.dispose(), this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL), ve--, this;
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
  RGBAFormat: FA,
  RGBA_ASTC_4x4_Format: si,
  RGBA_BPTC_Format: ii,
  RGBA_ETC2_EAC_Format: ni,
  RGBA_PVRTC_4BPPV1_Format: oi,
  RGBA_S3TC_DXT5_Format: Bi,
  RGB_ETC1_Format: ri,
  RGB_ETC2_Format: ai,
  RGB_PVRTC_4BPPV1_Format: Ci,
  RGB_S3TC_DXT1_Format: Ii
};
v.BasisWorker = function() {
  let C, A, e;
  const s = _EngineFormat, t = _TranscoderFormat, i = _BasisFormat;
  self.addEventListener("message", function(l) {
    const h = l.data;
    switch (h.type) {
      case "init":
        C = h.config, n(h.transcoderBinary);
        break;
      case "transcode":
        A.then(() => {
          try {
            const { faces: E, buffers: d, width: f, height: D, hasAlpha: F, format: p, dfdFlags: m } = B(h.buffer);
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
  function B(l) {
    const h = new e.KTX2File(new Uint8Array(l));
    function E() {
      h.close(), h.delete();
    }
    if (!h.isValid())
      throw E(), new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");
    const d = h.isUASTC() ? i.UASTC_4x4 : i.ETC1S, f = h.getWidth(), D = h.getHeight(), F = h.getLayers() || 1, p = h.getLevels(), m = h.getFaces(), w = h.getHasAlpha(), _ = h.getDFDFlags(), { transcoderFormat: H, engineFormat: W } = a(d, f, D, w);
    if (!f || !D || !p)
      throw E(), new Error("THREE.KTX2Loader:	Invalid texture");
    if (!h.startTranscoding())
      throw E(), new Error("THREE.KTX2Loader: .startTranscoding failed");
    const KA = [], Ge = [];
    for (let cA = 0; cA < m; cA++) {
      const Re = [];
      for (let eA = 0; eA < p; eA++) {
        const pe = [];
        let S, T;
        for (let V = 0; V < F; V++) {
          const DA = h.getImageLevelInfo(eA, V, cA);
          cA === 0 && eA === 0 && V === 0 && (DA.origWidth % 4 !== 0 || DA.origHeight % 4 !== 0) && console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."), p > 1 ? (S = DA.origWidth, T = DA.origHeight) : (S = DA.width, T = DA.height);
          const gt = new Uint8Array(h.getImageTranscodedSizeInBytes(eA, V, 0, H));
          if (!h.transcodeImage(gt, eA, V, cA, H, 0, -1, -1))
            throw E(), new Error("THREE.KTX2Loader: .transcodeImage failed.");
          pe.push(gt);
        }
        const OA = Q(pe);
        Re.push({ data: OA, width: S, height: T }), Ge.push(OA.buffer);
      }
      KA.push({ mipmaps: Re, width: f, height: D, format: W });
    }
    return E(), { faces: KA, buffers: Ge, width: f, height: D, hasAlpha: w, format: W, dfdFlags: _ };
  }
  const o = [
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
  ], r = o.sort(function(l, h) {
    return l.priorityETC1S - h.priorityETC1S;
  }), I = o.sort(function(l, h) {
    return l.priorityUASTC - h.priorityUASTC;
  });
  function a(l, h, E, d) {
    let f, D;
    const F = l === i.ETC1S ? r : I;
    for (let p = 0; p < F.length; p++) {
      const m = F[p];
      if (C[m.if] && m.basisFormat.includes(l) && !(d && m.transcoderFormat.length < 2) && !(m.needsPowerOfTwo && !(c(h) && c(E))))
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
const hn = /* @__PURE__ */ new Set([FA, XA, vA]), Ve = {
  [os]: FA,
  [ss]: FA,
  [$t]: FA,
  [As]: FA,
  [ns]: XA,
  [ts]: XA,
  [Zt]: XA,
  [zt]: XA,
  [is]: vA,
  [es]: vA,
  [jt]: vA,
  [Vt]: vA,
  [rs]: Ft,
  [Bs]: Ft
}, je = {
  [os]: Le,
  [ss]: ye,
  [$t]: K,
  [As]: K,
  [ns]: Le,
  [ts]: ye,
  [Zt]: K,
  [zt]: K,
  [is]: Le,
  [es]: ye,
  [jt]: K,
  [Vt]: K,
  [rs]: K,
  [Bs]: K
};
function ln(C) {
  return _A(this, null, function* () {
    const { vkFormat: A } = C;
    if (Ve[A] === void 0)
      throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");
    let e;
    C.supercompressionScheme === Lt && (We || (We = new Promise((i) => _A(this, null, function* () {
      const n = new Qn();
      yield n.init(), i(n);
    }))), e = yield We);
    const s = [];
    for (let i = 0; i < C.levels.length; i++) {
      const n = Math.max(1, C.pixelWidth >> i), B = Math.max(1, C.pixelHeight >> i), o = C.pixelDepth ? Math.max(1, C.pixelDepth >> i) : 0, r = C.levels[i];
      let I;
      if (C.supercompressionScheme === Bn)
        I = r.levelData;
      else if (C.supercompressionScheme === Lt)
        I = e.decode(r.levelData, r.uncompressedByteLength);
      else
        throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");
      let a;
      je[A] === Le ? a = new Float32Array(
        I.buffer,
        I.byteOffset,
        I.byteLength / Float32Array.BYTES_PER_ELEMENT
      ) : je[A] === ye ? a = new Uint16Array(
        I.buffer,
        I.byteOffset,
        I.byteLength / Uint16Array.BYTES_PER_ELEMENT
      ) : a = I, s.push({
        data: a,
        width: n,
        height: B,
        depth: o
      });
    }
    let t;
    if (hn.has(Ve[A]))
      t = C.pixelDepth === 0 ? new gi(s[0].data, C.pixelWidth, C.pixelHeight) : new Ei(s[0].data, C.pixelWidth, C.pixelHeight, C.pixelDepth);
    else {
      if (C.pixelDepth > 0)
        throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");
      t = new Yt(s, C.pixelWidth, C.pixelHeight);
    }
    return t.mipmaps = s, t.type = je[A], t.format = Ve[A], t.colorSpace = as(C), t.needsUpdate = !0, Promise.resolve(t);
  });
}
function as(C) {
  const A = C.dataFormatDescriptor[0];
  return A.colorPrimaries === Cn ? A.transferFunction === yt ? $ : O : A.colorPrimaries === In ? A.transferFunction === yt ? ci : Qi : A.colorPrimaries === an ? Dt : (console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${A.colorPrimaries}"`), Dt);
}
let Se;
const dn = () => {
  if (Se)
    return Se;
  const C = "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", A = "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", e = new Uint8Array([
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
  let t = C;
  WebAssembly.validate(e) && (t = A);
  let i;
  const n = WebAssembly.instantiate(B(t), {}).then((a) => {
    i = a.instance, i.exports.__wasm_call_ctors();
  });
  function B(a) {
    const c = new Uint8Array(a.length);
    for (let l = 0; l < a.length; ++l) {
      const h = a.charCodeAt(l);
      c[l] = h > 96 ? h - 71 : h > 64 ? h - 65 : h > 47 ? h + 4 : h > 46 ? 63 : 62;
    }
    let Q = 0;
    for (let l = 0; l < a.length; ++l)
      c[Q++] = c[l] < 60 ? s[c[l]] : (c[l] - 60) * 64 + c[++l];
    return c.buffer.slice(0, Q);
  }
  function o(a, c, Q, l, h, E) {
    const d = i.exports.sbrk, f = Q + 3 & -4, D = d(f * l), F = d(h.length), p = new Uint8Array(i.exports.memory.buffer);
    p.set(h, F);
    const m = a(D, Q, l, F, h.length);
    if (m === 0 && E && E(D, f, l), c.set(p.subarray(D, D + Q * l)), d(D - d(0)), m !== 0)
      throw new Error(`Malformed buffer data: ${m}`);
  }
  const r = {
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
  return Se = {
    ready: n,
    supported: !0,
    decodeVertexBuffer(a, c, Q, l, h) {
      o(
        i.exports.meshopt_decodeVertexBuffer,
        a,
        c,
        Q,
        l,
        i.exports[r[h]]
      );
    },
    decodeIndexBuffer(a, c, Q, l) {
      o(i.exports.meshopt_decodeIndexBuffer, a, c, Q, l);
    },
    decodeIndexSequence(a, c, Q, l) {
      o(i.exports.meshopt_decodeIndexSequence, a, c, Q, l);
    },
    decodeGltfBuffer(a, c, Q, l, h, E) {
      o(
        i.exports[I[h]],
        a,
        c,
        Q,
        l,
        i.exports[r[E]]
      );
    }
  }, Se;
};
var SA, te, se, ie;
class un {
  constructor() {
    u(this, SA, new Gi());
    u(this, te, new sn().setDecoderPath(
      `${M.CDNVersion}/examples/jsm/libs/draco/gltf/`
    ));
    u(this, se, new v().setTranscoderPath(
      `${M.CDNVersion}/examples/jsm/libs/basis/`
    ));
    u(this, ie, !1);
    g(this, SA).setCrossOrigin("anonymous").setDRACOLoader(g(this, te)).setMeshoptDecoder(dn);
  }
  get gltfLoader() {
    return g(this, SA);
  }
  get dracoLoader() {
    return g(this, te);
  }
  get ktx2Loader() {
    return g(this, se);
  }
  load(...A) {
    g(this, ie) || (g(this, SA).setKTX2Loader(g(this, se).detectSupport(M.webglRenderer)), G(this, ie, !0)), this.gltfLoader.load(...A);
  }
}
SA = new WeakMap(), te = new WeakMap(), se = new WeakMap(), ie = new WeakMap();
const fn = new un();
var b, z, ne;
class Yn {
  constructor(A, e = 1) {
    u(this, b, null);
    u(this, z, []);
    u(this, ne, () => {
      const A = g(this, b).position.x, e = g(this, b).position.y;
      g(this, z)[0].constant = g(this, b).scale.y / 2 + e * -1, g(this, z)[1].constant = g(this, b).scale.y / 2 + e, g(this, z)[2].constant = g(this, b).scale.x / 2 + A, g(this, z)[3].constant = g(this, b).scale.x / 2 + A * -1;
    });
    G(this, b, new xt(A, { cartesian: !1 })), G(this, z, [
      new Me(new y(0, -1 * e, 0)),
      new Me(new y(0, 1 * e, 0)),
      new Me(new y(-1 * e, 0, 0)),
      new Me(new y(1 * e, 0, 0))
    ]), kA.subscribe(g(this, ne), { order: ot.LAYOUT_BOX });
  }
  get planes() {
    return g(this, z);
  }
  get layoutBox() {
    return g(this, b);
  }
  destroy() {
    kA.unsubscribe(g(this, ne)), g(this, b).destroy();
  }
}
b = new WeakMap(), z = new WeakMap(), ne = new WeakMap();
class qn extends jA {
  constructor(A, e = 500) {
    super(), this.add(new we(A.planes[0], e, 16711680)), this.add(new we(A.planes[1], e, 16711680)), this.add(new we(A.planes[2], e, 16711680)), this.add(new we(A.planes[3], e, 16711680));
  }
}
var LA, dA, yA, oe, Be, BA, HA, re;
class Cs extends fi {
  constructor(e) {
    super(e);
    u(this, LA, new Rt(null));
    u(this, dA, new Rt(void 0));
    u(this, yA, void 0);
    u(this, oe, void 0);
    u(this, Be, void 0);
    u(this, BA, void 0);
    u(this, HA, !1);
    u(this, re, () => {
      if (!(g(this, BA) && !g(this, HA)) && (this.current !== this.previous && (g(this, LA).current = null), this.current)) {
        const e = g(this, Be) ? this.current.url : this.current.name + this.current.extension;
        g(this, BA) || be.setTotal(e, 1), g(this, dA).current = "start", g(this, oe).load(
          e,
          (s) => {
            g(this, LA).current = s, g(this, dA).current = "complete", g(this, BA) || be.setLoaded(e, 1);
          },
          void 0,
          () => {
            g(this, BA) || (g(this, dA).current = "error", be.setError(e, e));
          }
        );
      }
    });
    G(this, yA, e.consumer), G(this, oe, e.loader), G(this, Be, e.keepSourceParameters || !1), G(this, BA, e.lazy || !1), this.subscribe(g(this, re)), g(this, yA).addEventListener("added", () => {
      this.connect();
    }), g(this, yA).addEventListener("removed", () => {
      this.disconnect();
    });
  }
  /**
   * Resource store.
   */
  get data() {
    return g(this, LA);
  }
  /**
   * Loading store.
   */
  get loading() {
    return g(this, dA);
  }
  /**
   * Calling this method will start loading the resource.
   */
  lazyLoad() {
    g(this, HA) || (G(this, HA, !0), g(this, re).call(this));
  }
}
LA = new WeakMap(), dA = new WeakMap(), yA = new WeakMap(), oe = new WeakMap(), Be = new WeakMap(), BA = new WeakMap(), HA = new WeakMap(), re = new WeakMap();
var JA;
class Xn extends jA {
  constructor(e) {
    super();
    u(this, JA, void 0);
    G(this, JA, new Cs(tA({
      loader: fn,
      consumer: this
    }, e))), g(this, JA).data.subscribe((s) => {
      s.current ? this.add(...s.current.scene.children) : this.children.forEach((t) => {
        this.remove(t), qt(t);
      });
    });
  }
  get sourceManager() {
    return g(this, JA);
  }
}
JA = new WeakMap();
function Is(C, A, e) {
  const s = A.x, t = A.y, i = e || C.image.width / C.image.height;
  let n = 0, B = 0, o = C.offset.x, r = C.offset.y, I = C.rotation, a = C.center.x, c = C.center.y;
  s / t > i ? (n = 1, B = t / s * i) : (B = 1, n = s / t / i), C.matrix.setUvTransform(o, r, n, B, I, a, c);
}
var rA, TA, uA;
class gs extends Fe {
  constructor(e) {
    super(
      new hi(
        e.width,
        e.height,
        e.widthSegments,
        e.heightSegments
      ),
      e.material
    );
    u(this, rA, void 0);
    u(this, TA, void 0);
    u(this, uA, () => {
      g(this, rA).data.current && g(this, TA) && this.onCoverResize(g(this, rA).data.current);
    });
    G(this, rA, new Cs(tA({
      consumer: this
    }, e))), G(this, TA, e.cover || !1), this.addEventListener("added", () => {
      xA.subscribe(g(this, uA));
    }), this.addEventListener("removed", () => {
      xA.unsubscribe(g(this, uA));
    }), g(this, rA).data.subscribe((s) => {
      !s.current && s.previous ? s.previous.dispose() : s.current && this.material && (g(this, TA) && (s.current.matrixAutoUpdate = !1), s.current.colorSpace = $, s.current.center.set(0.5, 0.5), this.material.map = s.current, this.material.needsUpdate = !0, g(this, uA).call(this));
    });
  }
  get sourceManager() {
    return g(this, rA);
  }
  updateTexture() {
    g(this, uA).call(this);
  }
  onCoverResize(e) {
    Is(e, {
      x: this.scale.x,
      y: this.scale.y
    });
  }
}
rA = new WeakMap(), TA = new WeakMap(), uA = new WeakMap();
const Dn = new Kt();
class vn extends gs {
  constructor(A) {
    super(me(tA({}, A), {
      loader: Dn
    }));
  }
}
class Fn {
  load(...A) {
    const e = A[0], s = A[1], t = A[3], i = document.createElement("video");
    i.src = e, i.onloadeddata = () => {
      s(new li(i)), i.onerror = null, i.onloadeddata = null;
    }, i.onerror = () => {
      t == null || t(e), i.onerror = null, i.onloadeddata = null;
    };
  }
}
var ae, Ce, Ie;
class Wn extends gs {
  constructor(e) {
    super(me(tA({}, e), {
      loader: new Fn()
    }));
    u(this, ae, void 0);
    u(this, Ce, void 0);
    u(this, Ie, void 0);
    G(this, ae, e.autoplay || !1), G(this, Ce, e.muted || !1), G(this, Ie, e.loop || !1), this.sourceManager.data.subscribe((s) => {
      if (s.current) {
        const t = s.current.image;
        g(this, Ce) && (t.muted = !0), g(this, Ie) && (t.loop = !0), g(this, ae) && t.play();
      }
    });
  }
  onCoverResize(e) {
    const s = e.image;
    Is(
      e,
      {
        x: this.scale.x,
        y: this.scale.y
      },
      s.videoWidth / s.videoHeight
    );
  }
}
ae = new WeakMap(), Ce = new WeakMap(), Ie = new WeakMap();
function Vn(C, A) {
  C.traverse((e) => {
    e instanceof Fe && A(e);
  });
}
function jn(C, A) {
  C.traverse((e) => {
    e instanceof Fe && e.material && (Array.isArray(e.material) ? e.material : [e.material]).forEach(A);
  });
}
const Ze = new y(), Gn = new y();
function Zn(C) {
  const { width: A, height: e } = M, s = A / e;
  C instanceof y ? Ze.copy(C) : Ze.set(...C);
  const t = M.camera.getWorldPosition(Gn).distanceTo(Ze);
  if (M.camera instanceof He)
    return {
      width: A / M.camera.zoom,
      height: e / M.camera.zoom,
      factor: 1,
      distance: t,
      aspect: s
    };
  {
    const i = M.camera.fov * Math.PI / 180, n = 2 * Math.tan(i / 2) * t, B = n * (A / e);
    return { width: B, height: n, factor: A / B, distance: t, aspect: s };
  }
}
const Tt = new y(), Rn = new at(), Ut = new y();
class pn extends Ct {
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
const P = new bA(), mn = new bA();
class Mn {
  constructor(A = {}) {
    const e = this;
    let s, t, i, n;
    const B = {
      camera: { style: "" },
      objects: /* @__PURE__ */ new WeakMap()
    }, o = A.element !== void 0 ? A.element : document.createElement("div");
    o.style.overflow = "hidden", this.domElement = o;
    const r = document.createElement("div");
    r.style.transformOrigin = "0 0", r.style.pointerEvents = "none", o.appendChild(r);
    const I = document.createElement("div");
    I.style.transformStyle = "preserve-3d", r.appendChild(I), this.getSize = function() {
      return {
        width: s,
        height: t
      };
    }, this.render = function(h, E) {
      const d = E.projectionMatrix.elements[5] * n;
      E.view && E.view.enabled ? (r.style.transform = `translate( ${-E.view.offsetX * (s / E.view.width)}px, ${-E.view.offsetY * (t / E.view.height)}px )`, r.style.transform += `scale( ${E.view.fullWidth / E.view.width}, ${E.view.fullHeight / E.view.height} )`) : r.style.transform = "", h.matrixWorldAutoUpdate === !0 && h.updateMatrixWorld(), E.parent === null && E.matrixWorldAutoUpdate === !0 && E.updateMatrixWorld();
      let f, D;
      E.isOrthographicCamera && (f = -(E.right + E.left) / 2, D = (E.top + E.bottom) / 2);
      const F = E.view && E.view.enabled ? E.view.height / E.view.fullHeight : 1, p = E.isOrthographicCamera ? `scale( ${F} )scale(` + d + ")translate(" + a(f) + "px," + a(D) + "px)" + c(E.matrixWorldInverse) : `scale( ${F} )translateZ(` + d + "px)" + c(E.matrixWorldInverse), w = (E.isPerspectiveCamera ? "perspective(" + d + "px) " : "") + p + "translate(" + i + "px," + n + "px)";
      B.camera.style !== w && (I.style.transform = w, B.camera.style = w), l(h, h, E);
    }, this.setSize = function(h, E) {
      s = h, t = E, i = s / 2, n = t / 2, o.style.width = h + "px", o.style.height = E + "px", r.style.width = h + "px", r.style.height = E + "px", I.style.width = h + "px", I.style.height = E + "px";
    };
    function a(h) {
      return Math.abs(h) < 1e-10 ? 0 : h;
    }
    function c(h) {
      const E = h.elements;
      return "matrix3d(" + a(E[0]) + "," + a(-E[1]) + "," + a(E[2]) + "," + a(E[3]) + "," + a(E[4]) + "," + a(-E[5]) + "," + a(E[6]) + "," + a(E[7]) + "," + a(E[8]) + "," + a(-E[9]) + "," + a(E[10]) + "," + a(E[11]) + "," + a(E[12]) + "," + a(-E[13]) + "," + a(E[14]) + "," + a(E[15]) + ")";
    }
    function Q(h) {
      const E = h.elements;
      return "translate(-50%,-50%)" + ("matrix3d(" + a(E[0]) + "," + a(E[1]) + "," + a(E[2]) + "," + a(E[3]) + "," + a(-E[4]) + "," + a(-E[5]) + "," + a(-E[6]) + "," + a(-E[7]) + "," + a(E[8]) + "," + a(E[9]) + "," + a(E[10]) + "," + a(E[11]) + "," + a(E[12]) + "," + a(E[13]) + "," + a(E[14]) + "," + a(E[15]) + ")");
    }
    function l(h, E, d, f) {
      if (h.isCSS3DObject) {
        const D = h.visible === !0 && h.layers.test(d.layers) === !0;
        if (h.element.style.display = D === !0 ? "" : "none", D === !0) {
          h.onBeforeRender(e, E, d);
          let F;
          h.isCSS3DSprite ? (P.copy(d.matrixWorldInverse), P.transpose(), h.rotation2D !== 0 && P.multiply(mn.makeRotationZ(h.rotation2D)), h.matrixWorld.decompose(Tt, Rn, Ut), P.setPosition(Tt), P.scale(Ut), P.elements[3] = 0, P.elements[7] = 0, P.elements[11] = 0, P.elements[15] = 1, F = Q(P)) : F = Q(h.matrixWorld);
          const p = h.element, m = B.objects.get(h);
          if (m === void 0 || m.style !== F) {
            p.style.transform = F;
            const w = { style: F };
            B.objects.set(h, w);
          }
          p.parentNode !== I && I.appendChild(p), h.onAfterRender(e, E, d);
        }
      }
      for (let D = 0, F = h.children.length; D < F; D++)
        l(h.children[D], E, d);
    }
  }
}
var X, Ne, Es, ge, Ee;
const U = class U extends pn {
  static destroy() {
    xA.unsubscribe(g(this, Ee)), kA.unsubscribe(g(this, ge)), G(this, X, null);
  }
  constructor(A) {
    var e;
    super(A.element), g(U, X) || QA(e = U, Ne, Es).call(e);
  }
};
X = new WeakMap(), Ne = new WeakSet(), Es = function() {
  G(U, X, new Mn()), g(U, X).domElement.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
      overflow: hidden;
    `, M.containerElement.prepend(g(U, X).domElement), xA.subscribe(g(this, Ee), kt.EN3 + 1), kA.subscribe(g(this, ge), { order: ot.EN3 + 1 });
}, ge = new WeakMap(), Ee = new WeakMap(), u(U, Ne), u(U, X, null), u(U, ge, () => {
  g(U, X).render(M.scene, M.camera);
}), u(U, Ee, () => {
  g(U, X).setSize(M.width, M.height);
});
let Nt = U;
var UA, ce, Qe, aA, he;
class wn {
  constructor(A) {
    u(this, UA, void 0);
    u(this, ce, void 0);
    u(this, Qe, void 0);
    u(this, aA, void 0);
    u(this, he, void 0);
    G(this, UA, A.targetName || void 0), G(this, ce, A.eventDispatcher || A.object3D), G(this, Qe, A.propagation || !1), G(this, aA, A.object3D), G(this, he, g(this, UA) ? () => g(this, aA).getObjectByName(g(this, UA)) || g(this, aA) : () => g(this, aA));
  }
  get object3D() {
    return g(this, aA);
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
UA = new WeakMap(), ce = new WeakMap(), Qe = new WeakMap(), aA = new WeakMap(), he = new WeakMap();
var CA, J, NA, le, de, ue, fe;
class Sn {
  constructor() {
    u(this, CA, []);
    u(this, J, []);
    u(this, NA, new rt());
    u(this, le, new di());
    u(this, de, (A) => {
      for (let e = 0; e < g(this, J).length; e++)
        g(this, J)[e].dispatch("en3PointerDown", A);
    });
    u(this, ue, (A) => {
      for (let e = 0; e < g(this, J).length; e++)
        g(this, J)[e].dispatch("en3PointerUp", A);
    });
    u(this, fe, (A) => {
      g(this, NA).x = A.clientX / M.width * 2 - 1, g(this, NA).y = -(A.clientY / M.height) * 2 + 1, M.camera && g(this, le).setFromCamera(g(this, NA), M.camera);
      const e = [];
      for (const o of g(this, CA)) {
        const r = g(this, le).intersectObject(o.target);
        r.length && (o.intersection = r[0], e.push(o));
      }
      let s = !1;
      const t = g(this, J).filter(
        (o) => !e.find((r) => r.object3D.uuid === o.object3D.uuid)
      ), n = e.sort(
        (o, r) => r.object3D.position.z - o.object3D.position.z
      ).filter((o, r) => s ? (t.push(o), !1) : (s = !o.propagation, !0)), B = n.filter(
        (o) => !g(this, J).find((r) => r.object3D.uuid === o.object3D.uuid)
      );
      for (let o = 0; o < t.length; o++)
        t[o].dispatch("en3PointerLeave", A);
      for (let o = 0; o < B.length; o++)
        B[o].dispatch("en3PointerEnter", A);
      G(this, J, n);
      for (let o = 0; o < g(this, J).length; o++)
        g(this, J)[o].dispatch("en3PointerMove", A);
    });
    M.containerElement.addEventListener(
      "pointerdown",
      g(this, de)
    ), M.containerElement.addEventListener("pointerup", g(this, ue)), M.containerElement.addEventListener(
      "pointermove",
      g(this, fe)
    );
  }
  destroy() {
    M.containerElement.removeEventListener(
      "pointerdown",
      g(this, de)
    ), M.containerElement.removeEventListener(
      "pointerup",
      g(this, ue)
    ), M.containerElement.removeEventListener(
      "pointermove",
      g(this, fe)
    );
  }
  add(A, e) {
    if (g(this, CA).find((t) => t.object3D.uuid === A.uuid))
      return;
    const s = new wn(tA({
      object3D: A
    }, e));
    g(this, CA).push(s);
  }
  remove(A) {
    G(this, CA, g(this, CA).filter(
      (e) => e.object3D.uuid !== A.uuid
    )), G(this, J, g(this, J).filter((e) => e.object3D.uuid !== A.uuid));
  }
}
CA = new WeakMap(), J = new WeakMap(), NA = new WeakMap(), le = new WeakMap(), de = new WeakMap(), ue = new WeakMap(), fe = new WeakMap();
var IA, gA, De, nt;
class zn {
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
        `), QA(this, De, nt).call(this, t, "vertex", A), QA(this, De, nt).call(this, t, "fragment", A), e = (i = A.onReady) == null ? void 0 : i.call(A, this), A.log && (console.log("VERTEX SHADER: ", t.vertexShader), console.log("FRAGMENT SHADER: ", t.fragmentShader));
    };
  }
  get material() {
    return g(this, IA);
  }
  get uniforms() {
    return g(this, gA);
  }
}
IA = new WeakMap(), gA = new WeakMap(), De = new WeakSet(), nt = function(A, e, s) {
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
  Yn as En3Clip,
  qn as En3ClipHelpers,
  Xn as En3GLTF,
  Nt as En3HTML,
  vn as En3Image,
  gs as En3ImageLike,
  zn as En3ModifiedMaterial,
  Sn as En3Raycaster,
  Cs as En3SourceManager,
  Wn as En3Video,
  Is as coverTexture,
  qt as dispose,
  M as en3,
  fn as en3GLTFLoader,
  Pn as en3LazyLoader,
  Zn as getCurrentViewport,
  jn as traverseMaterials,
  Vn as traverseMeshes
};
