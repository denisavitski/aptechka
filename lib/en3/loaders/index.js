var ce = (d, t, e) => {
  if (!t.has(d))
    throw TypeError("Cannot " + e);
};
var S = (d, t, e) => (ce(d, t, "read from private field"), e ? e.call(d) : t.get(d)), j = (d, t, e) => {
  if (t.has(d))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(d) : t.set(d, e);
}, Z = (d, t, e, r) => (ce(d, t, "write to private field"), r ? r.call(d, e) : t.set(d, e), e);
var ue = (d, t, e) => new Promise((r, n) => {
  var s = (o) => {
    try {
      a(e.next(o));
    } catch (c) {
      n(c);
    }
  }, i = (o) => {
    try {
      a(e.throw(o));
    } catch (c) {
      n(c);
    }
  }, a = (o) => o.done ? r(o.value) : Promise.resolve(o.value).then(s, i);
  a((e = e.apply(d, t)).next());
});
import { TrianglesDrawMode as De, TriangleFanDrawMode as re, TriangleStripDrawMode as Ee, Loader as Fe, LoaderUtils as X, FileLoader as Le, Color as G, LinearSRGBColorSpace as I, SpotLight as Pe, PointLight as ke, DirectionalLight as He, MeshBasicMaterial as V, SRGBColorSpace as z, MeshPhysicalMaterial as y, Vector2 as _e, Matrix4 as Y, Vector3 as B, Quaternion as Se, InstancedMesh as Ge, InstancedBufferAttribute as Be, Object3D as Me, TextureLoader as ye, ImageBitmapLoader as Ue, BufferAttribute as J, InterleavedBuffer as ve, InterleavedBufferAttribute as je, LinearFilter as we, LinearMipmapLinearFilter as be, RepeatWrapping as ie, PointsMaterial as Ke, Material as $, LineBasicMaterial as Ve, MeshStandardMaterial as Ne, DoubleSide as Xe, PropertyBinding as ze, BufferGeometry as qe, SkinnedMesh as We, Mesh as Ye, LineSegments as Qe, Line as Ze, LineLoop as Je, Points as $e, Group as ee, PerspectiveCamera as et, MathUtils as tt, OrthographicCamera as nt, Skeleton as st, AnimationClip as rt, Bone as it, InterpolateLinear as Ie, ColorManagement as le, NearestFilter as ot, NearestMipmapNearestFilter as at, LinearMipmapNearestFilter as ct, NearestMipmapLinearFilter as ut, ClampToEdgeWrapping as lt, MirroredRepeatWrapping as dt, InterpolateDiscrete as ft, FrontSide as ht, Texture as de, VectorKeyframeTrack as fe, NumberKeyframeTrack as he, QuaternionKeyframeTrack as pe, Box3 as pt, Sphere as mt, Interpolant as At } from "three";
import { e as N, a as b, d as me } from "../../en3-THFHEReu.js";
function Ae(d, t) {
  if (t === De)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), d;
  if (t === re || t === Ee) {
    let e = d.getIndex();
    if (e === null) {
      const i = [], a = d.getAttribute("position");
      if (a !== void 0) {
        for (let o = 0; o < a.count; o++)
          i.push(o);
        d.setIndex(i), e = d.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), d;
    }
    const r = e.count - 2, n = [];
    if (t === re)
      for (let i = 1; i <= r; i++)
        n.push(e.getX(0)), n.push(e.getX(i)), n.push(e.getX(i + 1));
    else
      for (let i = 0; i < r; i++)
        i % 2 === 0 ? (n.push(e.getX(i)), n.push(e.getX(i + 1)), n.push(e.getX(i + 2))) : (n.push(e.getX(i + 2)), n.push(e.getX(i + 1)), n.push(e.getX(i)));
    n.length / 3 !== r && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const s = d.clone();
    return s.setIndex(n), s.clearGroups(), s;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", t), d;
}
class gt extends Fe {
  constructor(t) {
    super(t), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(e) {
      return new Lt(e);
    }), this.register(function(e) {
      return new _t(e);
    }), this.register(function(e) {
      return new Ct(e);
    }), this.register(function(e) {
      return new Dt(e);
    }), this.register(function(e) {
      return new Ft(e);
    }), this.register(function(e) {
      return new Mt(e);
    }), this.register(function(e) {
      return new yt(e);
    }), this.register(function(e) {
      return new wt(e);
    }), this.register(function(e) {
      return new bt(e);
    }), this.register(function(e) {
      return new Et(e);
    }), this.register(function(e) {
      return new Nt(e);
    }), this.register(function(e) {
      return new St(e);
    }), this.register(function(e) {
      return new Ot(e);
    }), this.register(function(e) {
      return new It(e);
    }), this.register(function(e) {
      return new xt(e);
    }), this.register(function(e) {
      return new Pt(e);
    }), this.register(function(e) {
      return new kt(e);
    });
  }
  load(t, e, r, n) {
    const s = this;
    let i;
    if (this.resourcePath !== "")
      i = this.resourcePath;
    else if (this.path !== "") {
      const c = X.extractUrlBase(t);
      i = X.resolveURL(c, this.path);
    } else
      i = X.extractUrlBase(t);
    this.manager.itemStart(t);
    const a = function(c) {
      n ? n(c) : console.error(c), s.manager.itemError(t), s.manager.itemEnd(t);
    }, o = new Le(this.manager);
    o.setPath(this.path), o.setResponseType("arraybuffer"), o.setRequestHeader(this.requestHeader), o.setWithCredentials(this.withCredentials), o.load(t, function(c) {
      try {
        s.parse(c, i, function(l) {
          e(l), s.manager.itemEnd(t);
        }, a);
      } catch (l) {
        a(l);
      }
    }, r, a);
  }
  setDRACOLoader(t) {
    return this.dracoLoader = t, this;
  }
  setDDSLoader() {
    throw new Error(
      'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".'
    );
  }
  setKTX2Loader(t) {
    return this.ktx2Loader = t, this;
  }
  setMeshoptDecoder(t) {
    return this.meshoptDecoder = t, this;
  }
  register(t) {
    return this.pluginCallbacks.indexOf(t) === -1 && this.pluginCallbacks.push(t), this;
  }
  unregister(t) {
    return this.pluginCallbacks.indexOf(t) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t), 1), this;
  }
  parse(t, e, r, n) {
    let s;
    const i = {}, a = {}, o = new TextDecoder();
    if (typeof t == "string")
      s = JSON.parse(t);
    else if (t instanceof ArrayBuffer)
      if (o.decode(new Uint8Array(t, 0, 4)) === Oe) {
        try {
          i[A.KHR_BINARY_GLTF] = new Ht(t);
        } catch (u) {
          n && n(u);
          return;
        }
        s = JSON.parse(i[A.KHR_BINARY_GLTF].content);
      } else
        s = JSON.parse(o.decode(t));
    else
      s = t;
    if (s.asset === void 0 || s.asset.version[0] < 2) {
      n && n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const c = new Qt(s, {
      path: e || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    c.fileLoader.setRequestHeader(this.requestHeader);
    for (let l = 0; l < this.pluginCallbacks.length; l++) {
      const u = this.pluginCallbacks[l](c);
      u.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), a[u.name] = u, i[u.name] = !0;
    }
    if (s.extensionsUsed)
      for (let l = 0; l < s.extensionsUsed.length; ++l) {
        const u = s.extensionsUsed[l], f = s.extensionsRequired || [];
        switch (u) {
          case A.KHR_MATERIALS_UNLIT:
            i[u] = new Rt();
            break;
          case A.KHR_DRACO_MESH_COMPRESSION:
            i[u] = new Gt(s, this.dracoLoader);
            break;
          case A.KHR_TEXTURE_TRANSFORM:
            i[u] = new Bt();
            break;
          case A.KHR_MESH_QUANTIZATION:
            i[u] = new Ut();
            break;
          default:
            f.indexOf(u) >= 0 && a[u] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + u + '".');
        }
      }
    c.setExtensions(i), c.setPlugins(a), c.parse(r, n);
  }
  parseAsync(t, e) {
    const r = this;
    return new Promise(function(n, s) {
      r.parse(t, e, n, s);
    });
  }
}
function Tt() {
  let d = {};
  return {
    get: function(t) {
      return d[t];
    },
    add: function(t, e) {
      d[t] = e;
    },
    remove: function(t) {
      delete d[t];
    },
    removeAll: function() {
      d = {};
    }
  };
}
const A = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
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
class xt {
  constructor(t) {
    this.parser = t, this.name = A.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const t = this.parser, e = this.parser.json.nodes || [];
    for (let r = 0, n = e.length; r < n; r++) {
      const s = e[r];
      s.extensions && s.extensions[this.name] && s.extensions[this.name].light !== void 0 && t._addNodeRef(this.cache, s.extensions[this.name].light);
    }
  }
  _loadLight(t) {
    const e = this.parser, r = "light:" + t;
    let n = e.cache.get(r);
    if (n)
      return n;
    const s = e.json, o = ((s.extensions && s.extensions[this.name] || {}).lights || [])[t];
    let c;
    const l = new G(16777215);
    o.color !== void 0 && l.setRGB(o.color[0], o.color[1], o.color[2], I);
    const u = o.range !== void 0 ? o.range : 0;
    switch (o.type) {
      case "directional":
        c = new He(l), c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      case "point":
        c = new ke(l), c.distance = u;
        break;
      case "spot":
        c = new Pe(l), c.distance = u, o.spot = o.spot || {}, o.spot.innerConeAngle = o.spot.innerConeAngle !== void 0 ? o.spot.innerConeAngle : 0, o.spot.outerConeAngle = o.spot.outerConeAngle !== void 0 ? o.spot.outerConeAngle : Math.PI / 4, c.angle = o.spot.outerConeAngle, c.penumbra = 1 - o.spot.innerConeAngle / o.spot.outerConeAngle, c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + o.type);
    }
    return c.position.set(0, 0, 0), c.decay = 2, w(c, o), o.intensity !== void 0 && (c.intensity = o.intensity), c.name = e.createUniqueName(o.name || "light_" + t), n = Promise.resolve(c), e.cache.add(r, n), n;
  }
  getDependency(t, e) {
    if (t === "light")
      return this._loadLight(e);
  }
  createNodeAttachment(t) {
    const e = this, r = this.parser, s = r.json.nodes[t], a = (s.extensions && s.extensions[this.name] || {}).light;
    return a === void 0 ? null : this._loadLight(a).then(function(o) {
      return r._getNodeRef(e.cache, a, o);
    });
  }
}
class Rt {
  constructor() {
    this.name = A.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return V;
  }
  extendParams(t, e, r) {
    const n = [];
    t.color = new G(1, 1, 1), t.opacity = 1;
    const s = e.pbrMetallicRoughness;
    if (s) {
      if (Array.isArray(s.baseColorFactor)) {
        const i = s.baseColorFactor;
        t.color.setRGB(i[0], i[1], i[2], I), t.opacity = i[3];
      }
      s.baseColorTexture !== void 0 && n.push(r.assignTexture(t, "map", s.baseColorTexture, z));
    }
    return Promise.all(n);
  }
}
class Et {
  constructor(t) {
    this.parser = t, this.name = A.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(t, e) {
    const n = this.parser.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = n.extensions[this.name].emissiveStrength;
    return s !== void 0 && (e.emissiveIntensity = s), Promise.resolve();
  }
}
class Lt {
  constructor(t) {
    this.parser = t, this.name = A.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(t) {
    const r = this.parser.json.materials[t];
    return !r.extensions || !r.extensions[this.name] ? null : y;
  }
  extendMaterialParams(t, e) {
    const r = this.parser, n = r.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = [], i = n.extensions[this.name];
    if (i.clearcoatFactor !== void 0 && (e.clearcoat = i.clearcoatFactor), i.clearcoatTexture !== void 0 && s.push(r.assignTexture(e, "clearcoatMap", i.clearcoatTexture)), i.clearcoatRoughnessFactor !== void 0 && (e.clearcoatRoughness = i.clearcoatRoughnessFactor), i.clearcoatRoughnessTexture !== void 0 && s.push(r.assignTexture(e, "clearcoatRoughnessMap", i.clearcoatRoughnessTexture)), i.clearcoatNormalTexture !== void 0 && (s.push(r.assignTexture(e, "clearcoatNormalMap", i.clearcoatNormalTexture)), i.clearcoatNormalTexture.scale !== void 0)) {
      const a = i.clearcoatNormalTexture.scale;
      e.clearcoatNormalScale = new _e(a, a);
    }
    return Promise.all(s);
  }
}
class _t {
  constructor(t) {
    this.parser = t, this.name = A.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(t) {
    const r = this.parser.json.materials[t];
    return !r.extensions || !r.extensions[this.name] ? null : y;
  }
  extendMaterialParams(t, e) {
    const n = this.parser.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = n.extensions[this.name];
    return e.dispersion = s.dispersion !== void 0 ? s.dispersion : 0, Promise.resolve();
  }
}
class St {
  constructor(t) {
    this.parser = t, this.name = A.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(t) {
    const r = this.parser.json.materials[t];
    return !r.extensions || !r.extensions[this.name] ? null : y;
  }
  extendMaterialParams(t, e) {
    const r = this.parser, n = r.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = [], i = n.extensions[this.name];
    return i.iridescenceFactor !== void 0 && (e.iridescence = i.iridescenceFactor), i.iridescenceTexture !== void 0 && s.push(r.assignTexture(e, "iridescenceMap", i.iridescenceTexture)), i.iridescenceIor !== void 0 && (e.iridescenceIOR = i.iridescenceIor), e.iridescenceThicknessRange === void 0 && (e.iridescenceThicknessRange = [100, 400]), i.iridescenceThicknessMinimum !== void 0 && (e.iridescenceThicknessRange[0] = i.iridescenceThicknessMinimum), i.iridescenceThicknessMaximum !== void 0 && (e.iridescenceThicknessRange[1] = i.iridescenceThicknessMaximum), i.iridescenceThicknessTexture !== void 0 && s.push(r.assignTexture(e, "iridescenceThicknessMap", i.iridescenceThicknessTexture)), Promise.all(s);
  }
}
class Mt {
  constructor(t) {
    this.parser = t, this.name = A.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(t) {
    const r = this.parser.json.materials[t];
    return !r.extensions || !r.extensions[this.name] ? null : y;
  }
  extendMaterialParams(t, e) {
    const r = this.parser, n = r.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = [];
    e.sheenColor = new G(0, 0, 0), e.sheenRoughness = 0, e.sheen = 1;
    const i = n.extensions[this.name];
    if (i.sheenColorFactor !== void 0) {
      const a = i.sheenColorFactor;
      e.sheenColor.setRGB(a[0], a[1], a[2], I);
    }
    return i.sheenRoughnessFactor !== void 0 && (e.sheenRoughness = i.sheenRoughnessFactor), i.sheenColorTexture !== void 0 && s.push(r.assignTexture(e, "sheenColorMap", i.sheenColorTexture, z)), i.sheenRoughnessTexture !== void 0 && s.push(r.assignTexture(e, "sheenRoughnessMap", i.sheenRoughnessTexture)), Promise.all(s);
  }
}
class yt {
  constructor(t) {
    this.parser = t, this.name = A.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(t) {
    const r = this.parser.json.materials[t];
    return !r.extensions || !r.extensions[this.name] ? null : y;
  }
  extendMaterialParams(t, e) {
    const r = this.parser, n = r.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = [], i = n.extensions[this.name];
    return i.transmissionFactor !== void 0 && (e.transmission = i.transmissionFactor), i.transmissionTexture !== void 0 && s.push(r.assignTexture(e, "transmissionMap", i.transmissionTexture)), Promise.all(s);
  }
}
class wt {
  constructor(t) {
    this.parser = t, this.name = A.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(t) {
    const r = this.parser.json.materials[t];
    return !r.extensions || !r.extensions[this.name] ? null : y;
  }
  extendMaterialParams(t, e) {
    const r = this.parser, n = r.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = [], i = n.extensions[this.name];
    e.thickness = i.thicknessFactor !== void 0 ? i.thicknessFactor : 0, i.thicknessTexture !== void 0 && s.push(r.assignTexture(e, "thicknessMap", i.thicknessTexture)), e.attenuationDistance = i.attenuationDistance || 1 / 0;
    const a = i.attenuationColor || [1, 1, 1];
    return e.attenuationColor = new G().setRGB(a[0], a[1], a[2], I), Promise.all(s);
  }
}
class bt {
  constructor(t) {
    this.parser = t, this.name = A.KHR_MATERIALS_IOR;
  }
  getMaterialType(t) {
    const r = this.parser.json.materials[t];
    return !r.extensions || !r.extensions[this.name] ? null : y;
  }
  extendMaterialParams(t, e) {
    const n = this.parser.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = n.extensions[this.name];
    return e.ior = s.ior !== void 0 ? s.ior : 1.5, Promise.resolve();
  }
}
class Nt {
  constructor(t) {
    this.parser = t, this.name = A.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(t) {
    const r = this.parser.json.materials[t];
    return !r.extensions || !r.extensions[this.name] ? null : y;
  }
  extendMaterialParams(t, e) {
    const r = this.parser, n = r.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = [], i = n.extensions[this.name];
    e.specularIntensity = i.specularFactor !== void 0 ? i.specularFactor : 1, i.specularTexture !== void 0 && s.push(r.assignTexture(e, "specularIntensityMap", i.specularTexture));
    const a = i.specularColorFactor || [1, 1, 1];
    return e.specularColor = new G().setRGB(a[0], a[1], a[2], I), i.specularColorTexture !== void 0 && s.push(r.assignTexture(e, "specularColorMap", i.specularColorTexture, z)), Promise.all(s);
  }
}
class It {
  constructor(t) {
    this.parser = t, this.name = A.EXT_MATERIALS_BUMP;
  }
  getMaterialType(t) {
    const r = this.parser.json.materials[t];
    return !r.extensions || !r.extensions[this.name] ? null : y;
  }
  extendMaterialParams(t, e) {
    const r = this.parser, n = r.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = [], i = n.extensions[this.name];
    return e.bumpScale = i.bumpFactor !== void 0 ? i.bumpFactor : 1, i.bumpTexture !== void 0 && s.push(r.assignTexture(e, "bumpMap", i.bumpTexture)), Promise.all(s);
  }
}
class Ot {
  constructor(t) {
    this.parser = t, this.name = A.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(t) {
    const r = this.parser.json.materials[t];
    return !r.extensions || !r.extensions[this.name] ? null : y;
  }
  extendMaterialParams(t, e) {
    const r = this.parser, n = r.json.materials[t];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const s = [], i = n.extensions[this.name];
    return i.anisotropyStrength !== void 0 && (e.anisotropy = i.anisotropyStrength), i.anisotropyRotation !== void 0 && (e.anisotropyRotation = i.anisotropyRotation), i.anisotropyTexture !== void 0 && s.push(r.assignTexture(e, "anisotropyMap", i.anisotropyTexture)), Promise.all(s);
  }
}
class Ct {
  constructor(t) {
    this.parser = t, this.name = A.KHR_TEXTURE_BASISU;
  }
  loadTexture(t) {
    const e = this.parser, r = e.json, n = r.textures[t];
    if (!n.extensions || !n.extensions[this.name])
      return null;
    const s = n.extensions[this.name], i = e.options.ktx2Loader;
    if (!i) {
      if (r.extensionsRequired && r.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return e.loadTextureImage(t, s.source, i);
  }
}
class Dt {
  constructor(t) {
    this.parser = t, this.name = A.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(t) {
    const e = this.name, r = this.parser, n = r.json, s = n.textures[t];
    if (!s.extensions || !s.extensions[e])
      return null;
    const i = s.extensions[e], a = n.images[i.source];
    let o = r.textureLoader;
    if (a.uri) {
      const c = r.options.manager.getHandler(a.uri);
      c !== null && (o = c);
    }
    return this.detectSupport().then(function(c) {
      if (c)
        return r.loadTextureImage(t, i.source, o);
      if (n.extensionsRequired && n.extensionsRequired.indexOf(e) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return r.loadTexture(t);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(t) {
      const e = new Image();
      e.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", e.onload = e.onerror = function() {
        t(e.height === 1);
      };
    })), this.isSupported;
  }
}
class Ft {
  constructor(t) {
    this.parser = t, this.name = A.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(t) {
    const e = this.name, r = this.parser, n = r.json, s = n.textures[t];
    if (!s.extensions || !s.extensions[e])
      return null;
    const i = s.extensions[e], a = n.images[i.source];
    let o = r.textureLoader;
    if (a.uri) {
      const c = r.options.manager.getHandler(a.uri);
      c !== null && (o = c);
    }
    return this.detectSupport().then(function(c) {
      if (c)
        return r.loadTextureImage(t, i.source, o);
      if (n.extensionsRequired && n.extensionsRequired.indexOf(e) >= 0)
        throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
      return r.loadTexture(t);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(t) {
      const e = new Image();
      e.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", e.onload = e.onerror = function() {
        t(e.height === 1);
      };
    })), this.isSupported;
  }
}
class Pt {
  constructor(t) {
    this.name = A.EXT_MESHOPT_COMPRESSION, this.parser = t;
  }
  loadBufferView(t) {
    const e = this.parser.json, r = e.bufferViews[t];
    if (r.extensions && r.extensions[this.name]) {
      const n = r.extensions[this.name], s = this.parser.getDependency("buffer", n.buffer), i = this.parser.options.meshoptDecoder;
      if (!i || !i.supported) {
        if (e.extensionsRequired && e.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return s.then(function(a) {
        const o = n.byteOffset || 0, c = n.byteLength || 0, l = n.count, u = n.byteStride, f = new Uint8Array(a, o, c);
        return i.decodeGltfBufferAsync ? i.decodeGltfBufferAsync(l, u, f, n.mode, n.filter).then(function(h) {
          return h.buffer;
        }) : i.ready.then(function() {
          const h = new ArrayBuffer(l * u);
          return i.decodeGltfBuffer(new Uint8Array(h), l, u, f, n.mode, n.filter), h;
        });
      });
    } else
      return null;
  }
}
class kt {
  constructor(t) {
    this.name = A.EXT_MESH_GPU_INSTANCING, this.parser = t;
  }
  createNodeMesh(t) {
    const e = this.parser.json, r = e.nodes[t];
    if (!r.extensions || !r.extensions[this.name] || r.mesh === void 0)
      return null;
    const n = e.meshes[r.mesh];
    for (const c of n.primitives)
      if (c.mode !== L.TRIANGLES && c.mode !== L.TRIANGLE_STRIP && c.mode !== L.TRIANGLE_FAN && c.mode !== void 0)
        return null;
    const i = r.extensions[this.name].attributes, a = [], o = {};
    for (const c in i)
      a.push(this.parser.getDependency("accessor", i[c]).then((l) => (o[c] = l, o[c])));
    return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(t)), Promise.all(a).then((c) => {
      const l = c.pop(), u = l.isGroup ? l.children : [l], f = c[0].count, h = [];
      for (const p of u) {
        const T = new Y(), m = new B(), g = new Se(), R = new B(1, 1, 1), E = new Ge(p.geometry, p.material, f);
        for (let x = 0; x < f; x++)
          o.TRANSLATION && m.fromBufferAttribute(o.TRANSLATION, x), o.ROTATION && g.fromBufferAttribute(o.ROTATION, x), o.SCALE && R.fromBufferAttribute(o.SCALE, x), E.setMatrixAt(x, T.compose(m, g, R));
        for (const x in o)
          if (x === "_COLOR_0") {
            const M = o[x];
            E.instanceColor = new Be(M.array, M.itemSize, M.normalized);
          } else
            x !== "TRANSLATION" && x !== "ROTATION" && x !== "SCALE" && p.geometry.setAttribute(x, o[x]);
        Me.prototype.copy.call(E, p), this.parser.assignFinalMaterial(E), h.push(E);
      }
      return l.isGroup ? (l.clear(), l.add(...h), l) : h[0];
    }));
  }
}
const Oe = "glTF", K = 12, ge = { JSON: 1313821514, BIN: 5130562 };
class Ht {
  constructor(t) {
    this.name = A.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const e = new DataView(t, 0, K), r = new TextDecoder();
    if (this.header = {
      magic: r.decode(new Uint8Array(t.slice(0, 4))),
      version: e.getUint32(4, !0),
      length: e.getUint32(8, !0)
    }, this.header.magic !== Oe)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const n = this.header.length - K, s = new DataView(t, K);
    let i = 0;
    for (; i < n; ) {
      const a = s.getUint32(i, !0);
      i += 4;
      const o = s.getUint32(i, !0);
      if (i += 4, o === ge.JSON) {
        const c = new Uint8Array(t, K + i, a);
        this.content = r.decode(c);
      } else if (o === ge.BIN) {
        const c = K + i;
        this.body = t.slice(c, c + a);
      }
      i += a;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Gt {
  constructor(t, e) {
    if (!e)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = A.KHR_DRACO_MESH_COMPRESSION, this.json = t, this.dracoLoader = e, this.dracoLoader.preload();
  }
  decodePrimitive(t, e) {
    const r = this.json, n = this.dracoLoader, s = t.extensions[this.name].bufferView, i = t.extensions[this.name].attributes, a = {}, o = {}, c = {};
    for (const l in i) {
      const u = oe[l] || l.toLowerCase();
      a[u] = i[l];
    }
    for (const l in t.attributes) {
      const u = oe[l] || l.toLowerCase();
      if (i[l] !== void 0) {
        const f = r.accessors[t.attributes[l]], h = U[f.componentType];
        c[u] = h.name, o[u] = f.normalized === !0;
      }
    }
    return e.getDependency("bufferView", s).then(function(l) {
      return new Promise(function(u, f) {
        n.decodeDracoFile(l, function(h) {
          for (const p in h.attributes) {
            const T = h.attributes[p], m = o[p];
            m !== void 0 && (T.normalized = m);
          }
          u(h);
        }, a, c, I, f);
      });
    });
  }
}
class Bt {
  constructor() {
    this.name = A.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(t, e) {
    return (e.texCoord === void 0 || e.texCoord === t.channel) && e.offset === void 0 && e.rotation === void 0 && e.scale === void 0 || (t = t.clone(), e.texCoord !== void 0 && (t.channel = e.texCoord), e.offset !== void 0 && t.offset.fromArray(e.offset), e.rotation !== void 0 && (t.rotation = e.rotation), e.scale !== void 0 && t.repeat.fromArray(e.scale), t.needsUpdate = !0), t;
  }
}
class Ut {
  constructor() {
    this.name = A.KHR_MESH_QUANTIZATION;
  }
}
class Ce extends At {
  constructor(t, e, r, n) {
    super(t, e, r, n);
  }
  copySampleValue_(t) {
    const e = this.resultBuffer, r = this.sampleValues, n = this.valueSize, s = t * n * 3 + n;
    for (let i = 0; i !== n; i++)
      e[i] = r[s + i];
    return e;
  }
  interpolate_(t, e, r, n) {
    const s = this.resultBuffer, i = this.sampleValues, a = this.valueSize, o = a * 2, c = a * 3, l = n - e, u = (r - e) / l, f = u * u, h = f * u, p = t * c, T = p - c, m = -2 * h + 3 * f, g = h - f, R = 1 - m, E = g - f + u;
    for (let x = 0; x !== a; x++) {
      const M = i[T + x + a], O = i[T + x + o] * l, _ = i[p + x + a], v = i[p + x] * l;
      s[x] = R * M + E * O + m * _ + g * v;
    }
    return s;
  }
}
const vt = new Se();
class jt extends Ce {
  interpolate_(t, e, r, n) {
    const s = super.interpolate_(t, e, r, n);
    return vt.fromArray(s).normalize().toArray(s), s;
  }
}
const L = {
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
}, U = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, Te = {
  9728: ot,
  9729: we,
  9984: at,
  9985: ct,
  9986: ut,
  9987: be
}, xe = {
  33071: lt,
  33648: dt,
  10497: ie
}, te = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, oe = {
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
}, D = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, Kt = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: Ie,
  STEP: ft
}, ne = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Vt(d) {
  return d.DefaultMaterial === void 0 && (d.DefaultMaterial = new Ne({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: ht
  })), d.DefaultMaterial;
}
function P(d, t, e) {
  for (const r in e.extensions)
    d[r] === void 0 && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[r] = e.extensions[r]);
}
function w(d, t) {
  t.extras !== void 0 && (typeof t.extras == "object" ? Object.assign(d.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras));
}
function Xt(d, t, e) {
  let r = !1, n = !1, s = !1;
  for (let c = 0, l = t.length; c < l; c++) {
    const u = t[c];
    if (u.POSITION !== void 0 && (r = !0), u.NORMAL !== void 0 && (n = !0), u.COLOR_0 !== void 0 && (s = !0), r && n && s)
      break;
  }
  if (!r && !n && !s)
    return Promise.resolve(d);
  const i = [], a = [], o = [];
  for (let c = 0, l = t.length; c < l; c++) {
    const u = t[c];
    if (r) {
      const f = u.POSITION !== void 0 ? e.getDependency("accessor", u.POSITION) : d.attributes.position;
      i.push(f);
    }
    if (n) {
      const f = u.NORMAL !== void 0 ? e.getDependency("accessor", u.NORMAL) : d.attributes.normal;
      a.push(f);
    }
    if (s) {
      const f = u.COLOR_0 !== void 0 ? e.getDependency("accessor", u.COLOR_0) : d.attributes.color;
      o.push(f);
    }
  }
  return Promise.all([
    Promise.all(i),
    Promise.all(a),
    Promise.all(o)
  ]).then(function(c) {
    const l = c[0], u = c[1], f = c[2];
    return r && (d.morphAttributes.position = l), n && (d.morphAttributes.normal = u), s && (d.morphAttributes.color = f), d.morphTargetsRelative = !0, d;
  });
}
function zt(d, t) {
  if (d.updateMorphTargets(), t.weights !== void 0)
    for (let e = 0, r = t.weights.length; e < r; e++)
      d.morphTargetInfluences[e] = t.weights[e];
  if (t.extras && Array.isArray(t.extras.targetNames)) {
    const e = t.extras.targetNames;
    if (d.morphTargetInfluences.length === e.length) {
      d.morphTargetDictionary = {};
      for (let r = 0, n = e.length; r < n; r++)
        d.morphTargetDictionary[e[r]] = r;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function qt(d) {
  let t;
  const e = d.extensions && d.extensions[A.KHR_DRACO_MESH_COMPRESSION];
  if (e ? t = "draco:" + e.bufferView + ":" + e.indices + ":" + se(e.attributes) : t = d.indices + ":" + se(d.attributes) + ":" + d.mode, d.targets !== void 0)
    for (let r = 0, n = d.targets.length; r < n; r++)
      t += ":" + se(d.targets[r]);
  return t;
}
function se(d) {
  let t = "";
  const e = Object.keys(d).sort();
  for (let r = 0, n = e.length; r < n; r++)
    t += e[r] + ":" + d[e[r]] + ";";
  return t;
}
function ae(d) {
  switch (d) {
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
function Wt(d) {
  return d.search(/\.jpe?g($|\?)/i) > 0 || d.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : d.search(/\.webp($|\?)/i) > 0 || d.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const Yt = new Y();
class Qt {
  constructor(t = {}, e = {}) {
    this.json = t, this.extensions = {}, this.plugins = {}, this.options = e, this.cache = new Tt(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let r = !1, n = -1, s = !1, i = -1;
    if (typeof navigator != "undefined") {
      const a = navigator.userAgent;
      r = /^((?!chrome|android).)*safari/i.test(a) === !0;
      const o = a.match(/Version\/(\d+)/);
      n = r && o ? parseInt(o[1], 10) : -1, s = a.indexOf("Firefox") > -1, i = s ? a.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap == "undefined" || r && n < 17 || s && i < 98 ? this.textureLoader = new ye(this.options.manager) : this.textureLoader = new Ue(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new Le(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(t) {
    this.extensions = t;
  }
  setPlugins(t) {
    this.plugins = t;
  }
  parse(t, e) {
    const r = this, n = this.json, s = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(i) {
      return i._markDefs && i._markDefs();
    }), Promise.all(this._invokeAll(function(i) {
      return i.beforeRoot && i.beforeRoot();
    })).then(function() {
      return Promise.all([
        r.getDependencies("scene"),
        r.getDependencies("animation"),
        r.getDependencies("camera")
      ]);
    }).then(function(i) {
      const a = {
        scene: i[0][n.scene || 0],
        scenes: i[0],
        animations: i[1],
        cameras: i[2],
        asset: n.asset,
        parser: r,
        userData: {}
      };
      return P(s, a, n), w(a, n), Promise.all(r._invokeAll(function(o) {
        return o.afterRoot && o.afterRoot(a);
      })).then(function() {
        for (const o of a.scenes)
          o.updateMatrixWorld();
        t(a);
      });
    }).catch(e);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const t = this.json.nodes || [], e = this.json.skins || [], r = this.json.meshes || [];
    for (let n = 0, s = e.length; n < s; n++) {
      const i = e[n].joints;
      for (let a = 0, o = i.length; a < o; a++)
        t[i[a]].isBone = !0;
    }
    for (let n = 0, s = t.length; n < s; n++) {
      const i = t[n];
      i.mesh !== void 0 && (this._addNodeRef(this.meshCache, i.mesh), i.skin !== void 0 && (r[i.mesh].isSkinnedMesh = !0)), i.camera !== void 0 && this._addNodeRef(this.cameraCache, i.camera);
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
  _addNodeRef(t, e) {
    e !== void 0 && (t.refs[e] === void 0 && (t.refs[e] = t.uses[e] = 0), t.refs[e]++);
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(t, e, r) {
    if (t.refs[e] <= 1)
      return r;
    const n = r.clone(), s = (i, a) => {
      const o = this.associations.get(i);
      o != null && this.associations.set(a, o);
      for (const [c, l] of i.children.entries())
        s(l, a.children[c]);
    };
    return s(r, n), n.name += "_instance_" + t.uses[e]++, n;
  }
  _invokeOne(t) {
    const e = Object.values(this.plugins);
    e.push(this);
    for (let r = 0; r < e.length; r++) {
      const n = t(e[r]);
      if (n)
        return n;
    }
    return null;
  }
  _invokeAll(t) {
    const e = Object.values(this.plugins);
    e.unshift(this);
    const r = [];
    for (let n = 0; n < e.length; n++) {
      const s = t(e[n]);
      s && r.push(s);
    }
    return r;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(t, e) {
    const r = t + ":" + e;
    let n = this.cache.get(r);
    if (!n) {
      switch (t) {
        case "scene":
          n = this.loadScene(e);
          break;
        case "node":
          n = this._invokeOne(function(s) {
            return s.loadNode && s.loadNode(e);
          });
          break;
        case "mesh":
          n = this._invokeOne(function(s) {
            return s.loadMesh && s.loadMesh(e);
          });
          break;
        case "accessor":
          n = this.loadAccessor(e);
          break;
        case "bufferView":
          n = this._invokeOne(function(s) {
            return s.loadBufferView && s.loadBufferView(e);
          });
          break;
        case "buffer":
          n = this.loadBuffer(e);
          break;
        case "material":
          n = this._invokeOne(function(s) {
            return s.loadMaterial && s.loadMaterial(e);
          });
          break;
        case "texture":
          n = this._invokeOne(function(s) {
            return s.loadTexture && s.loadTexture(e);
          });
          break;
        case "skin":
          n = this.loadSkin(e);
          break;
        case "animation":
          n = this._invokeOne(function(s) {
            return s.loadAnimation && s.loadAnimation(e);
          });
          break;
        case "camera":
          n = this.loadCamera(e);
          break;
        default:
          if (n = this._invokeOne(function(s) {
            return s != this && s.getDependency && s.getDependency(t, e);
          }), !n)
            throw new Error("Unknown type: " + t);
          break;
      }
      this.cache.add(r, n);
    }
    return n;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(t) {
    let e = this.cache.get(t);
    if (!e) {
      const r = this, n = this.json[t + (t === "mesh" ? "es" : "s")] || [];
      e = Promise.all(n.map(function(s, i) {
        return r.getDependency(t, i);
      })), this.cache.add(t, e);
    }
    return e;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(t) {
    const e = this.json.buffers[t], r = this.fileLoader;
    if (e.type && e.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + e.type + " buffer type is not supported.");
    if (e.uri === void 0 && t === 0)
      return Promise.resolve(this.extensions[A.KHR_BINARY_GLTF].body);
    const n = this.options;
    return new Promise(function(s, i) {
      r.load(X.resolveURL(e.uri, n.path), s, void 0, function() {
        i(new Error('THREE.GLTFLoader: Failed to load buffer "' + e.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(t) {
    const e = this.json.bufferViews[t];
    return this.getDependency("buffer", e.buffer).then(function(r) {
      const n = e.byteLength || 0, s = e.byteOffset || 0;
      return r.slice(s, s + n);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(t) {
    const e = this, r = this.json, n = this.json.accessors[t];
    if (n.bufferView === void 0 && n.sparse === void 0) {
      const i = te[n.type], a = U[n.componentType], o = n.normalized === !0, c = new a(n.count * i);
      return Promise.resolve(new J(c, i, o));
    }
    const s = [];
    return n.bufferView !== void 0 ? s.push(this.getDependency("bufferView", n.bufferView)) : s.push(null), n.sparse !== void 0 && (s.push(this.getDependency("bufferView", n.sparse.indices.bufferView)), s.push(this.getDependency("bufferView", n.sparse.values.bufferView))), Promise.all(s).then(function(i) {
      const a = i[0], o = te[n.type], c = U[n.componentType], l = c.BYTES_PER_ELEMENT, u = l * o, f = n.byteOffset || 0, h = n.bufferView !== void 0 ? r.bufferViews[n.bufferView].byteStride : void 0, p = n.normalized === !0;
      let T, m;
      if (h && h !== u) {
        const g = Math.floor(f / h), R = "InterleavedBuffer:" + n.bufferView + ":" + n.componentType + ":" + g + ":" + n.count;
        let E = e.cache.get(R);
        E || (T = new c(a, g * h, n.count * h / l), E = new ve(T, h / l), e.cache.add(R, E)), m = new je(E, o, f % h / l, p);
      } else
        a === null ? T = new c(n.count * o) : T = new c(a, f, n.count * o), m = new J(T, o, p);
      if (n.sparse !== void 0) {
        const g = te.SCALAR, R = U[n.sparse.indices.componentType], E = n.sparse.indices.byteOffset || 0, x = n.sparse.values.byteOffset || 0, M = new R(i[1], E, n.sparse.count * g), O = new c(i[2], x, n.sparse.count * o);
        a !== null && (m = new J(m.array.slice(), m.itemSize, m.normalized));
        for (let _ = 0, v = M.length; _ < v; _++) {
          const C = M[_];
          if (m.setX(C, O[_ * o]), o >= 2 && m.setY(C, O[_ * o + 1]), o >= 3 && m.setZ(C, O[_ * o + 2]), o >= 4 && m.setW(C, O[_ * o + 3]), o >= 5)
            throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
      }
      return m;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */
  loadTexture(t) {
    const e = this.json, r = this.options, s = e.textures[t].source, i = e.images[s];
    let a = this.textureLoader;
    if (i.uri) {
      const o = r.manager.getHandler(i.uri);
      o !== null && (a = o);
    }
    return this.loadTextureImage(t, s, a);
  }
  loadTextureImage(t, e, r) {
    const n = this, s = this.json, i = s.textures[t], a = s.images[e], o = (a.uri || a.bufferView) + ":" + i.sampler;
    if (this.textureCache[o])
      return this.textureCache[o];
    const c = this.loadImageSource(e, r).then(function(l) {
      l.flipY = !1, l.name = i.name || a.name || "", l.name === "" && typeof a.uri == "string" && a.uri.startsWith("data:image/") === !1 && (l.name = a.uri);
      const f = (s.samplers || {})[i.sampler] || {};
      return l.magFilter = Te[f.magFilter] || we, l.minFilter = Te[f.minFilter] || be, l.wrapS = xe[f.wrapS] || ie, l.wrapT = xe[f.wrapT] || ie, n.associations.set(l, { textures: t }), l;
    }).catch(function() {
      return null;
    });
    return this.textureCache[o] = c, c;
  }
  loadImageSource(t, e) {
    const r = this, n = this.json, s = this.options;
    if (this.sourceCache[t] !== void 0)
      return this.sourceCache[t].then((u) => u.clone());
    const i = n.images[t], a = self.URL || self.webkitURL;
    let o = i.uri || "", c = !1;
    if (i.bufferView !== void 0)
      o = r.getDependency("bufferView", i.bufferView).then(function(u) {
        c = !0;
        const f = new Blob([u], { type: i.mimeType });
        return o = a.createObjectURL(f), o;
      });
    else if (i.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + t + " is missing URI and bufferView");
    const l = Promise.resolve(o).then(function(u) {
      return new Promise(function(f, h) {
        let p = f;
        e.isImageBitmapLoader === !0 && (p = function(T) {
          const m = new de(T);
          m.needsUpdate = !0, f(m);
        }), e.load(X.resolveURL(u, s.path), p, void 0, h);
      });
    }).then(function(u) {
      return c === !0 && a.revokeObjectURL(o), w(u, i), u.userData.mimeType = i.mimeType || Wt(i.uri), u;
    }).catch(function(u) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", o), u;
    });
    return this.sourceCache[t] = l, l;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */
  assignTexture(t, e, r, n) {
    const s = this;
    return this.getDependency("texture", r.index).then(function(i) {
      if (!i)
        return null;
      if (r.texCoord !== void 0 && r.texCoord > 0 && (i = i.clone(), i.channel = r.texCoord), s.extensions[A.KHR_TEXTURE_TRANSFORM]) {
        const a = r.extensions !== void 0 ? r.extensions[A.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const o = s.associations.get(i);
          i = s.extensions[A.KHR_TEXTURE_TRANSFORM].extendTexture(i, a), s.associations.set(i, o);
        }
      }
      return n !== void 0 && (i.colorSpace = n), t[e] = i, i;
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
  assignFinalMaterial(t) {
    const e = t.geometry;
    let r = t.material;
    const n = e.attributes.tangent === void 0, s = e.attributes.color !== void 0, i = e.attributes.normal === void 0;
    if (t.isPoints) {
      const a = "PointsMaterial:" + r.uuid;
      let o = this.cache.get(a);
      o || (o = new Ke(), $.prototype.copy.call(o, r), o.color.copy(r.color), o.map = r.map, o.sizeAttenuation = !1, this.cache.add(a, o)), r = o;
    } else if (t.isLine) {
      const a = "LineBasicMaterial:" + r.uuid;
      let o = this.cache.get(a);
      o || (o = new Ve(), $.prototype.copy.call(o, r), o.color.copy(r.color), o.map = r.map, this.cache.add(a, o)), r = o;
    }
    if (n || s || i) {
      let a = "ClonedMaterial:" + r.uuid + ":";
      n && (a += "derivative-tangents:"), s && (a += "vertex-colors:"), i && (a += "flat-shading:");
      let o = this.cache.get(a);
      o || (o = r.clone(), s && (o.vertexColors = !0), i && (o.flatShading = !0), n && (o.normalScale && (o.normalScale.y *= -1), o.clearcoatNormalScale && (o.clearcoatNormalScale.y *= -1)), this.cache.add(a, o), this.associations.set(o, this.associations.get(r))), r = o;
    }
    t.material = r;
  }
  getMaterialType() {
    return Ne;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(t) {
    const e = this, r = this.json, n = this.extensions, s = r.materials[t];
    let i;
    const a = {}, o = s.extensions || {}, c = [];
    if (o[A.KHR_MATERIALS_UNLIT]) {
      const u = n[A.KHR_MATERIALS_UNLIT];
      i = u.getMaterialType(), c.push(u.extendParams(a, s, e));
    } else {
      const u = s.pbrMetallicRoughness || {};
      if (a.color = new G(1, 1, 1), a.opacity = 1, Array.isArray(u.baseColorFactor)) {
        const f = u.baseColorFactor;
        a.color.setRGB(f[0], f[1], f[2], I), a.opacity = f[3];
      }
      u.baseColorTexture !== void 0 && c.push(e.assignTexture(a, "map", u.baseColorTexture, z)), a.metalness = u.metallicFactor !== void 0 ? u.metallicFactor : 1, a.roughness = u.roughnessFactor !== void 0 ? u.roughnessFactor : 1, u.metallicRoughnessTexture !== void 0 && (c.push(e.assignTexture(a, "metalnessMap", u.metallicRoughnessTexture)), c.push(e.assignTexture(a, "roughnessMap", u.metallicRoughnessTexture))), i = this._invokeOne(function(f) {
        return f.getMaterialType && f.getMaterialType(t);
      }), c.push(Promise.all(this._invokeAll(function(f) {
        return f.extendMaterialParams && f.extendMaterialParams(t, a);
      })));
    }
    s.doubleSided === !0 && (a.side = Xe);
    const l = s.alphaMode || ne.OPAQUE;
    if (l === ne.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, l === ne.MASK && (a.alphaTest = s.alphaCutoff !== void 0 ? s.alphaCutoff : 0.5)), s.normalTexture !== void 0 && i !== V && (c.push(e.assignTexture(a, "normalMap", s.normalTexture)), a.normalScale = new _e(1, 1), s.normalTexture.scale !== void 0)) {
      const u = s.normalTexture.scale;
      a.normalScale.set(u, u);
    }
    if (s.occlusionTexture !== void 0 && i !== V && (c.push(e.assignTexture(a, "aoMap", s.occlusionTexture)), s.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = s.occlusionTexture.strength)), s.emissiveFactor !== void 0 && i !== V) {
      const u = s.emissiveFactor;
      a.emissive = new G().setRGB(u[0], u[1], u[2], I);
    }
    return s.emissiveTexture !== void 0 && i !== V && c.push(e.assignTexture(a, "emissiveMap", s.emissiveTexture, z)), Promise.all(c).then(function() {
      const u = new i(a);
      return s.name && (u.name = s.name), w(u, s), e.associations.set(u, { materials: t }), s.extensions && P(n, u, s), u;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(t) {
    const e = ze.sanitizeNodeName(t || "");
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
  loadGeometries(t) {
    const e = this, r = this.extensions, n = this.primitiveCache;
    function s(a) {
      return r[A.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, e).then(function(o) {
        return Re(o, a, e);
      });
    }
    const i = [];
    for (let a = 0, o = t.length; a < o; a++) {
      const c = t[a], l = qt(c), u = n[l];
      if (u)
        i.push(u.promise);
      else {
        let f;
        c.extensions && c.extensions[A.KHR_DRACO_MESH_COMPRESSION] ? f = s(c) : f = Re(new qe(), c, e), n[l] = { primitive: c, promise: f }, i.push(f);
      }
    }
    return Promise.all(i);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(t) {
    const e = this, r = this.json, n = this.extensions, s = r.meshes[t], i = s.primitives, a = [];
    for (let o = 0, c = i.length; o < c; o++) {
      const l = i[o].material === void 0 ? Vt(this.cache) : this.getDependency("material", i[o].material);
      a.push(l);
    }
    return a.push(e.loadGeometries(i)), Promise.all(a).then(function(o) {
      const c = o.slice(0, o.length - 1), l = o[o.length - 1], u = [];
      for (let h = 0, p = l.length; h < p; h++) {
        const T = l[h], m = i[h];
        let g;
        const R = c[h];
        if (m.mode === L.TRIANGLES || m.mode === L.TRIANGLE_STRIP || m.mode === L.TRIANGLE_FAN || m.mode === void 0)
          g = s.isSkinnedMesh === !0 ? new We(T, R) : new Ye(T, R), g.isSkinnedMesh === !0 && g.normalizeSkinWeights(), m.mode === L.TRIANGLE_STRIP ? g.geometry = Ae(g.geometry, Ee) : m.mode === L.TRIANGLE_FAN && (g.geometry = Ae(g.geometry, re));
        else if (m.mode === L.LINES)
          g = new Qe(T, R);
        else if (m.mode === L.LINE_STRIP)
          g = new Ze(T, R);
        else if (m.mode === L.LINE_LOOP)
          g = new Je(T, R);
        else if (m.mode === L.POINTS)
          g = new $e(T, R);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + m.mode);
        Object.keys(g.geometry.morphAttributes).length > 0 && zt(g, s), g.name = e.createUniqueName(s.name || "mesh_" + t), w(g, s), m.extensions && P(n, g, m), e.assignFinalMaterial(g), u.push(g);
      }
      for (let h = 0, p = u.length; h < p; h++)
        e.associations.set(u[h], {
          meshes: t,
          primitives: h
        });
      if (u.length === 1)
        return s.extensions && P(n, u[0], s), u[0];
      const f = new ee();
      s.extensions && P(n, f, s), e.associations.set(f, { meshes: t });
      for (let h = 0, p = u.length; h < p; h++)
        f.add(u[h]);
      return f;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(t) {
    let e;
    const r = this.json.cameras[t], n = r[r.type];
    if (!n) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return r.type === "perspective" ? e = new et(tt.radToDeg(n.yfov), n.aspectRatio || 1, n.znear || 1, n.zfar || 2e6) : r.type === "orthographic" && (e = new nt(-n.xmag, n.xmag, n.ymag, -n.ymag, n.znear, n.zfar)), r.name && (e.name = this.createUniqueName(r.name)), w(e, r), Promise.resolve(e);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(t) {
    const e = this.json.skins[t], r = [];
    for (let n = 0, s = e.joints.length; n < s; n++)
      r.push(this._loadNodeShallow(e.joints[n]));
    return e.inverseBindMatrices !== void 0 ? r.push(this.getDependency("accessor", e.inverseBindMatrices)) : r.push(null), Promise.all(r).then(function(n) {
      const s = n.pop(), i = n, a = [], o = [];
      for (let c = 0, l = i.length; c < l; c++) {
        const u = i[c];
        if (u) {
          a.push(u);
          const f = new Y();
          s !== null && f.fromArray(s.array, c * 16), o.push(f);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', e.joints[c]);
      }
      return new st(a, o);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(t) {
    const e = this.json, r = this, n = e.animations[t], s = n.name ? n.name : "animation_" + t, i = [], a = [], o = [], c = [], l = [];
    for (let u = 0, f = n.channels.length; u < f; u++) {
      const h = n.channels[u], p = n.samplers[h.sampler], T = h.target, m = T.node, g = n.parameters !== void 0 ? n.parameters[p.input] : p.input, R = n.parameters !== void 0 ? n.parameters[p.output] : p.output;
      T.node !== void 0 && (i.push(this.getDependency("node", m)), a.push(this.getDependency("accessor", g)), o.push(this.getDependency("accessor", R)), c.push(p), l.push(T));
    }
    return Promise.all([
      Promise.all(i),
      Promise.all(a),
      Promise.all(o),
      Promise.all(c),
      Promise.all(l)
    ]).then(function(u) {
      const f = u[0], h = u[1], p = u[2], T = u[3], m = u[4], g = [];
      for (let R = 0, E = f.length; R < E; R++) {
        const x = f[R], M = h[R], O = p[R], _ = T[R], v = m[R];
        if (x === void 0)
          continue;
        x.updateMatrix && x.updateMatrix();
        const C = r._createAnimationTracks(x, M, O, _, v);
        if (C)
          for (let Q = 0; Q < C.length; Q++)
            g.push(C[Q]);
      }
      return new rt(s, void 0, g);
    });
  }
  createNodeMesh(t) {
    const e = this.json, r = this, n = e.nodes[t];
    return n.mesh === void 0 ? null : r.getDependency("mesh", n.mesh).then(function(s) {
      const i = r._getNodeRef(r.meshCache, n.mesh, s);
      return n.weights !== void 0 && i.traverse(function(a) {
        if (a.isMesh)
          for (let o = 0, c = n.weights.length; o < c; o++)
            a.morphTargetInfluences[o] = n.weights[o];
      }), i;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(t) {
    const e = this.json, r = this, n = e.nodes[t], s = r._loadNodeShallow(t), i = [], a = n.children || [];
    for (let c = 0, l = a.length; c < l; c++)
      i.push(r.getDependency("node", a[c]));
    const o = n.skin === void 0 ? Promise.resolve(null) : r.getDependency("skin", n.skin);
    return Promise.all([
      s,
      Promise.all(i),
      o
    ]).then(function(c) {
      const l = c[0], u = c[1], f = c[2];
      f !== null && l.traverse(function(h) {
        h.isSkinnedMesh && h.bind(f, Yt);
      });
      for (let h = 0, p = u.length; h < p; h++)
        l.add(u[h]);
      return l;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(t) {
    const e = this.json, r = this.extensions, n = this;
    if (this.nodeCache[t] !== void 0)
      return this.nodeCache[t];
    const s = e.nodes[t], i = s.name ? n.createUniqueName(s.name) : "", a = [], o = n._invokeOne(function(c) {
      return c.createNodeMesh && c.createNodeMesh(t);
    });
    return o && a.push(o), s.camera !== void 0 && a.push(n.getDependency("camera", s.camera).then(function(c) {
      return n._getNodeRef(n.cameraCache, s.camera, c);
    })), n._invokeAll(function(c) {
      return c.createNodeAttachment && c.createNodeAttachment(t);
    }).forEach(function(c) {
      a.push(c);
    }), this.nodeCache[t] = Promise.all(a).then(function(c) {
      let l;
      if (s.isBone === !0 ? l = new it() : c.length > 1 ? l = new ee() : c.length === 1 ? l = c[0] : l = new Me(), l !== c[0])
        for (let u = 0, f = c.length; u < f; u++)
          l.add(c[u]);
      if (s.name && (l.userData.name = s.name, l.name = i), w(l, s), s.extensions && P(r, l, s), s.matrix !== void 0) {
        const u = new Y();
        u.fromArray(s.matrix), l.applyMatrix4(u);
      } else
        s.translation !== void 0 && l.position.fromArray(s.translation), s.rotation !== void 0 && l.quaternion.fromArray(s.rotation), s.scale !== void 0 && l.scale.fromArray(s.scale);
      return n.associations.has(l) || n.associations.set(l, {}), n.associations.get(l).nodes = t, l;
    }), this.nodeCache[t];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(t) {
    const e = this.extensions, r = this.json.scenes[t], n = this, s = new ee();
    r.name && (s.name = n.createUniqueName(r.name)), w(s, r), r.extensions && P(e, s, r);
    const i = r.nodes || [], a = [];
    for (let o = 0, c = i.length; o < c; o++)
      a.push(n.getDependency("node", i[o]));
    return Promise.all(a).then(function(o) {
      for (let l = 0, u = o.length; l < u; l++)
        s.add(o[l]);
      const c = (l) => {
        const u = /* @__PURE__ */ new Map();
        for (const [f, h] of n.associations)
          (f instanceof $ || f instanceof de) && u.set(f, h);
        return l.traverse((f) => {
          const h = n.associations.get(f);
          h != null && u.set(f, h);
        }), u;
      };
      return n.associations = c(s), s;
    });
  }
  _createAnimationTracks(t, e, r, n, s) {
    const i = [], a = t.name ? t.name : t.uuid, o = [];
    D[s.path] === D.weights ? t.traverse(function(f) {
      f.morphTargetInfluences && o.push(f.name ? f.name : f.uuid);
    }) : o.push(a);
    let c;
    switch (D[s.path]) {
      case D.weights:
        c = he;
        break;
      case D.rotation:
        c = pe;
        break;
      case D.position:
      case D.scale:
        c = fe;
        break;
      default:
        switch (r.itemSize) {
          case 1:
            c = he;
            break;
          case 2:
          case 3:
          default:
            c = fe;
            break;
        }
        break;
    }
    const l = n.interpolation !== void 0 ? Kt[n.interpolation] : Ie, u = this._getArrayFromAccessor(r);
    for (let f = 0, h = o.length; f < h; f++) {
      const p = new c(
        o[f] + "." + D[s.path],
        e.array,
        u,
        l
      );
      n.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(p), i.push(p);
    }
    return i;
  }
  _getArrayFromAccessor(t) {
    let e = t.array;
    if (t.normalized) {
      const r = ae(e.constructor), n = new Float32Array(e.length);
      for (let s = 0, i = e.length; s < i; s++)
        n[s] = e[s] * r;
      e = n;
    }
    return e;
  }
  _createCubicSplineTrackInterpolant(t) {
    t.createInterpolant = function(r) {
      const n = this instanceof pe ? jt : Ce;
      return new n(this.times, this.values, this.getValueSize() / 3, r);
    }, t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function Zt(d, t, e) {
  const r = t.attributes, n = new pt();
  if (r.POSITION !== void 0) {
    const a = e.json.accessors[r.POSITION], o = a.min, c = a.max;
    if (o !== void 0 && c !== void 0) {
      if (n.set(
        new B(o[0], o[1], o[2]),
        new B(c[0], c[1], c[2])
      ), a.normalized) {
        const l = ae(U[a.componentType]);
        n.min.multiplyScalar(l), n.max.multiplyScalar(l);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const s = t.targets;
  if (s !== void 0) {
    const a = new B(), o = new B();
    for (let c = 0, l = s.length; c < l; c++) {
      const u = s[c];
      if (u.POSITION !== void 0) {
        const f = e.json.accessors[u.POSITION], h = f.min, p = f.max;
        if (h !== void 0 && p !== void 0) {
          if (o.setX(Math.max(Math.abs(h[0]), Math.abs(p[0]))), o.setY(Math.max(Math.abs(h[1]), Math.abs(p[1]))), o.setZ(Math.max(Math.abs(h[2]), Math.abs(p[2]))), f.normalized) {
            const T = ae(U[f.componentType]);
            o.multiplyScalar(T);
          }
          a.max(o);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    n.expandByVector(a);
  }
  d.boundingBox = n;
  const i = new mt();
  n.getCenter(i.center), i.radius = n.min.distanceTo(n.max) / 2, d.boundingSphere = i;
}
function Re(d, t, e) {
  const r = t.attributes, n = [];
  function s(i, a) {
    return e.getDependency("accessor", i).then(function(o) {
      d.setAttribute(a, o);
    });
  }
  for (const i in r) {
    const a = oe[i] || i.toLowerCase();
    a in d.attributes || n.push(s(r[i], a));
  }
  if (t.indices !== void 0 && !d.index) {
    const i = e.getDependency("accessor", t.indices).then(function(a) {
      d.setIndex(a);
    });
    n.push(i);
  }
  return le.workingColorSpace !== I && "COLOR_0" in r && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${le.workingColorSpace}" not supported.`), w(d, t), Zt(d, t, e), Promise.all(n).then(function() {
    return t.targets !== void 0 ? Xt(d, t.targets, e) : d;
  });
}
var k;
class tn {
  constructor() {
    j(this, k, new gt());
  }
  get gltfLoader() {
    return S(this, k);
  }
  setLoaders(t) {
    if (t != null && t.draco && F.dracoLoader) {
      const e = typeof t.draco == "boolean" ? `${N.CDNVersion}/examples/jsm/libs/draco/gltf/` : t.draco;
      F.dracoLoader.setDecoderPath(e), S(this, k).setDRACOLoader(F.dracoLoader);
    }
    if (t != null && t.ktx2 && F.ktx2Loader) {
      const e = typeof t.ktx2 == "boolean" ? `${N.CDNVersion}/examples/jsm/libs/basis/` : t.ktx2;
      F.ktx2Loader.setTranscoderPath(e), S(this, k).setKTX2Loader(
        F.ktx2Loader.detectSupport(N.webglRenderer)
      );
    }
    t != null && t.meshopt && F.meshoptDecoder && S(this, k).setMeshoptDecoder(F.meshoptDecoder);
  }
  load(...t) {
    const [e, r, ...n] = t;
    if (N.cacheAssets && b.has(e)) {
      const s = b.get(e).data;
      r(s);
    } else
      this.gltfLoader.load(
        e,
        (s) => {
          N.cacheAssets && b.set(e, {
            data: s,
            dispose: () => {
              s.cameras.forEach((i) => me(i)), s.scenes.forEach((i) => {
                me(i);
              });
            }
          }), r(s);
        },
        ...n
      );
  }
}
k = new WeakMap();
var H, q, W;
class nn {
  constructor() {
    j(this, H, new ye());
    j(this, q, void 0);
    j(this, W, void 0);
    Z(this, q, S(this, H).load.bind(S(this, H))), Z(this, W, S(this, H).loadAsync.bind(S(this, H)));
  }
  load(...t) {
    const [e, r, ...n] = t;
    if (N.cacheAssets && b.has(e)) {
      const s = b.get(e);
      return r == null || r(s.data), s.data;
    }
    return S(this, q).call(this, e, (s) => {
      N.cacheAssets && b.set(e, {
        data: s,
        dispose: () => s.dispose()
      }), r == null || r(s);
    }, ...n);
  }
  loadSync(...t) {
    return ue(this, null, function* () {
      const [e, ...r] = t;
      if (N.cacheAssets && b.has(e))
        return b.get(e).data;
      const n = yield S(this, W).call(this, e, ...r);
      return N.cacheAssets && b.set(e, {
        data: n,
        dispose: () => n.dispose()
      }), n;
    });
  }
}
H = new WeakMap(), q = new WeakMap(), W = new WeakMap();
const F = {
  gltfLoader: null,
  textureLoader: null,
  dracoLoader: null,
  ktx2Loader: null,
  meshoptDecoder: null
};
export {
  tn as En3GLTFLoader,
  nn as En3TextureLoader,
  F as loaders
};
