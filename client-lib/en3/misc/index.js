var m = (o, i, t) => {
  if (!i.has(o))
    throw TypeError("Cannot " + t);
};
var e = (o, i, t) => (m(o, i, "read from private field"), t ? t.call(o) : i.get(o)), r = (o, i, t) => {
  if (i.has(o))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(o) : i.set(o, t);
}, c = (o, i, t, s) => (m(o, i, "write to private field"), s ? s.call(o, t) : i.set(o, t), t);
var L = (o, i, t) => (m(o, i, "access private method"), t);
import { loading as $ } from "../../loading/index.js";
import { S as z } from "../../SourceManager--L_rA28b.js";
import { S as R } from "../../Store-Qr3SNOSf.js";
var h, u, S, k;
class b {
  constructor(i) {
    r(this, S);
    r(this, h, void 0);
    r(this, u, void 0);
    c(this, h, i.material), c(this, u, i.uniforms || {}), e(this, h).userData.uniforms = e(this, u);
    let t;
    const s = () => {
      t == null || t();
    };
    e(this, h).addEventListener("dispose", s), e(this, h).onBeforeCompile = (n) => {
      var f;
      t == null || t();
      for (const M in e(this, u))
        n.uniforms[M] = e(this, u)[M];
      i.vertextDeclarations && (n.vertexShader = `
          ${i.vertextDeclarations}
          ${n.vertexShader}
        `), i.fragmentDeclarations && (n.fragmentShader = `
          ${i.fragmentDeclarations}
          ${n.fragmentShader}
        `), L(this, S, k).call(this, n, "vertex", i), L(this, S, k).call(this, n, "fragment", i), t = (f = i.onReady) == null ? void 0 : f.call(i, this), i.log && (console.log("VERTEX SHADER: ", n.vertexShader), console.log("FRAGMENT SHADER: ", n.fragmentShader));
    };
  }
  get material() {
    return e(this, h);
  }
  get uniforms() {
    return e(this, u);
  }
}
h = new WeakMap(), u = new WeakMap(), S = new WeakSet(), k = function(i, t, s) {
  const n = t === "vertex" ? "vertexChunk" : "fragmentChunk", f = t === "vertex" ? "vertexShader" : "fragmentShader";
  s[n] && (s[n].replace ? i[f] = i[f].replace(
    `#include <${s[n].replace}>`,
    s[n].content
  ) : s[n].update && (i[f] = i[f].replace(
    `#include <${s[n].update}>`,
    `
            #include <${s[n].update}>
            ${s[n].content}
          `
  )));
};
var a, d, g, x, E, l, v, D;
class w extends z {
  constructor(t) {
    super(t);
    r(this, a, new R(null));
    r(this, d, new R(void 0));
    r(this, g, void 0);
    r(this, x, void 0);
    r(this, E, void 0);
    r(this, l, void 0);
    r(this, v, !1);
    r(this, D, () => {
      if (!(e(this, l) && !e(this, v)) && (this.current !== this.previous && (e(this, a).current = null), this.current)) {
        const t = e(this, E) ? this.current.url : this.current.name + this.current.extension;
        e(this, l) || $.setTotal(t, 1), e(this, d).current = "start", e(this, x).load(
          t,
          (s) => {
            var n;
            e(this, a).current = ((n = this.processData) == null ? void 0 : n.call(this, s)) || s, e(this, d).current = "complete", e(this, l) || $.setLoaded(t, 1);
          },
          void 0,
          () => {
            e(this, l) || (e(this, d).current = "error", $.setError(t, t));
          }
        );
      }
    });
    c(this, g, t.consumer), c(this, x, t.loader), c(this, E, t.keepSourceParameters || !1), c(this, l, t.lazy || !1), this.subscribe(e(this, D)), e(this, g).addEventListener("added", () => {
      this.connect();
    }), e(this, g).addEventListener("removed", () => {
      this.disconnect();
    });
  }
  /**
   * Resource store.
   */
  get data() {
    return e(this, a);
  }
  /**
   * Loading store.
   */
  get loading() {
    return e(this, d);
  }
  /**
   * Calling this method will start loading the resource.
   */
  lazyLoad() {
    e(this, v) || (c(this, v, !0), e(this, D).call(this));
  }
}
a = new WeakMap(), d = new WeakMap(), g = new WeakMap(), x = new WeakMap(), E = new WeakMap(), l = new WeakMap(), v = new WeakMap(), D = new WeakMap();
export {
  b as En3ModifiedMaterial,
  w as En3SourceManager
};
