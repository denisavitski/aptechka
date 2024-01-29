var R = (r, s, t) => {
  if (!s.has(r))
    throw TypeError("Cannot " + t);
};
var n = (r, s, t) => (R(r, s, "read from private field"), t ? t.call(r) : s.get(r)), a = (r, s, t) => {
  if (s.has(r))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(r) : s.set(r, t);
}, h = (r, s, t, i) => (R(r, s, "write to private field"), i ? i.call(r, t) : s.set(r, t), t);
import { RESIZE_ORDER as I } from "./order/index.js";
import { resizer as b } from "./resizer/index.js";
import { S } from "./Store-2hWEUGTj.js";
var l, g, q, d, o, p, E;
class k {
  constructor(s) {
    a(this, l, void 0);
    a(this, g, void 0);
    a(this, q, void 0);
    a(this, d, void 0);
    a(this, o, void 0);
    a(this, p, void 0);
    a(this, E, void 0);
    h(this, l, s);
    const t = s.indexOf("?");
    t >= 0 && (s = s.slice(0, t));
    const i = s.split(".");
    h(this, g, i[0]);
    const x = /\d+x/g, c = i.find((y) => y.match(x));
    h(this, q, c ? parseInt(c) : 1);
    const f = /\d+max/g, M = /\d+min/g, e = i.find((y) => y.match(f)), m = i.find((y) => y.match(M));
    e ? (h(this, o, parseInt(e)), h(this, p, "max"), h(this, d, `(max-width: ${n(this, o)}px)`)) : m ? (h(this, o, parseInt(m)), h(this, d, `(min-width: ${n(this, o)}px)`), h(this, p, "min")) : (h(this, o, 0), h(this, d, `(min-width: ${n(this, o)}px)`), h(this, p, "min")), h(this, E, "." + i[i.length - 1]);
  }
  get url() {
    return n(this, l);
  }
  get name() {
    return n(this, g);
  }
  get density() {
    return n(this, q);
  }
  get query() {
    return n(this, d);
  }
  get extension() {
    return n(this, E);
  }
  get queryType() {
    return n(this, p);
  }
  get queryPx() {
    return n(this, o);
  }
}
l = new WeakMap(), g = new WeakMap(), q = new WeakMap(), d = new WeakMap(), o = new WeakMap(), p = new WeakMap(), E = new WeakMap();
var u;
class B {
  constructor(s) {
    a(this, u, void 0);
    h(this, u, /* @__PURE__ */ new Map());
    const t = typeof s == "string" ? s.trim().split(",").map((e) => e.trim()).filter((e) => !!e) : s, i = [];
    t.forEach((e) => {
      const m = new k(e);
      i.push([m.query, m]);
    });
    const x = i.filter((e) => e[1].queryType === "max").sort((e, m) => m[1].queryPx - e[1].queryPx), c = i.filter((e) => e[1].queryType === "min" && e[1].queryPx !== 0).sort((e, m) => e[1].queryPx - m[1].queryPx), f = i.filter((e) => e[0] === "(min-width: 0px)");
    (f ? [...f, ...x, ...c] : [...x, ...c]).forEach((e) => {
      n(this, u).has(e[0]) || n(this, u).set(e[0], []), n(this, u).get(e[0]).push(e[1]);
    });
  }
  get mediaBuckets() {
    return n(this, u);
  }
}
u = new WeakMap();
var P, w;
class A extends S {
  constructor(t) {
    super(void 0);
    a(this, P, void 0);
    a(this, w, () => {
      let t;
      n(this, P).mediaBuckets.forEach((c, f) => {
        matchMedia(f).matches && (t = c);
      });
      let i, x = 0;
      t == null || t.forEach((c) => {
        c.density > x && c.density <= Math.max(devicePixelRatio, 1) && (x = c.density, i = c);
      }), t != null && t.length && !i && (i = t[0]), this.current = i;
    });
    h(this, P, new B(t.srcset));
  }
  close() {
    super.close(), this.disconnect();
  }
  connect() {
    b.subscribe(n(this, w), I.SOURCE_MANAGER);
  }
  disconnect() {
    b.unsubscribe(n(this, w));
  }
}
P = new WeakMap(), w = new WeakMap();
export {
  A as S,
  k as a,
  B as b
};
