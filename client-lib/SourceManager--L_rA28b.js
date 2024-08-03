var $ = (a, e, t) => {
  if (!e.has(a))
    throw TypeError("Cannot " + t);
};
var r = (a, e, t) => ($(a, e, "read from private field"), t ? t.call(a) : e.get(a)), o = (a, e, t) => {
  if (e.has(a))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(a) : e.set(a, t);
}, i = (a, e, t, n) => ($(a, e, "write to private field"), n ? n.call(a, t) : e.set(a, t), t);
import { RESIZE_ORDER as A } from "./order/index.js";
import { windowResizer as k } from "./window-resizer/index.js";
import { S as B } from "./Store-Qr3SNOSf.js";
var y, g, q, u, c, d, w;
class T {
  constructor(e) {
    o(this, y, void 0);
    o(this, g, void 0);
    o(this, q, void 0);
    o(this, u, void 0);
    o(this, c, void 0);
    o(this, d, void 0);
    o(this, w, void 0);
    i(this, y, e);
    const t = e.indexOf("?");
    t >= 0 && (e = e.slice(0, t));
    const n = e.split(".");
    i(this, g, n[0]);
    const f = /\d+x/g, h = n.find((m) => m.match(f));
    i(this, q, h ? parseInt(h) : 1);
    const x = /\d+max/g, M = /\d+min/g, s = /\d+mar/g, p = /\d+mir/g, I = n.find((m) => m.match(x)), V = n.find((m) => m.match(M)), b = n.find((m) => m.match(s)), S = n.find((m) => m.match(p));
    b ? (i(this, c, parseInt(b)), i(this, d, "max"), i(this, u, `(max-aspect-ratio: ${r(this, c)})`)) : S ? (i(this, c, parseInt(S)), i(this, d, "max"), i(this, u, `(min-aspect-ratio: ${r(this, c)})`)) : I ? (i(this, c, parseInt(I)), i(this, d, "max"), i(this, u, `(max-width: ${r(this, c)}px)`)) : V ? (i(this, c, parseInt(V)), i(this, u, `(min-width: ${r(this, c)}px)`), i(this, d, "min")) : (i(this, c, 0), i(this, u, `(min-width: ${r(this, c)}px)`), i(this, d, "min")), i(this, w, "." + n[n.length - 1]);
  }
  get url() {
    return r(this, y);
  }
  get name() {
    return r(this, g);
  }
  get density() {
    return r(this, q);
  }
  get query() {
    return r(this, u);
  }
  get extension() {
    return r(this, w);
  }
  get queryType() {
    return r(this, d);
  }
  get queryValue() {
    return r(this, c);
  }
}
y = new WeakMap(), g = new WeakMap(), q = new WeakMap(), u = new WeakMap(), c = new WeakMap(), d = new WeakMap(), w = new WeakMap();
var l;
class O {
  constructor(e) {
    o(this, l, void 0);
    i(this, l, /* @__PURE__ */ new Map());
    const t = typeof e == "string" ? e.trim().split(",").map((s) => s.trim()).filter((s) => !!s) : e, n = [];
    t.forEach((s) => {
      const p = new T(s);
      n.push([p.query, p]);
    });
    const f = n.filter((s) => s[1].queryType.includes("max")).sort((s, p) => p[1].queryValue - s[1].queryValue), h = n.filter((s) => s[1].queryType.includes("min") && s[1].queryValue !== 0).sort((s, p) => s[1].queryValue - p[1].queryValue), x = n.filter((s) => s[0] === "(min-width: 0px)");
    (x ? [...x, ...f, ...h] : [...f, ...h]).forEach((s) => {
      r(this, l).has(s[0]) || r(this, l).set(s[0], []), r(this, l).get(s[0]).push(s[1]);
    });
  }
  get mediaBuckets() {
    return r(this, l);
  }
}
l = new WeakMap();
var E, R;
class C extends B {
  constructor(t) {
    super(void 0);
    o(this, E, void 0);
    o(this, R, () => {
      let t;
      r(this, E).mediaBuckets.forEach((h, x) => {
        matchMedia(x).matches && (t = h);
      });
      let n, f = 0;
      t == null || t.forEach((h) => {
        h.density > f && h.density <= Math.max(devicePixelRatio, 1) && (f = h.density, n = h);
      }), t != null && t.length && !n && (n = t[0]), this.current = n;
    });
    i(this, E, new O(t.srcset));
  }
  close() {
    super.close(), this.disconnect();
  }
  connect() {
    k.subscribe(r(this, R), A.SOURCE_MANAGER);
  }
  disconnect() {
    k.unsubscribe(r(this, R));
  }
}
E = new WeakMap(), R = new WeakMap();
export {
  C as S,
  T as a,
  O as b
};
