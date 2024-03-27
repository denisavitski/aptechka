import { CustomElement as M, define as b } from "../custom-element/index.js";
import "../Store-JOKrNVEr.js";
import { c as P } from "../math-BOBiC4TN.js";
import { e as S, q as y } from "../tags-C2jg1zYB.js";
import { c as A } from "../createStylesheet-CD11E4C8.js";
import { elementResizer as k } from "../element-resizer/index.js";
import { ticker as E } from "../ticker/index.js";
var O = Object.defineProperty, z = Object.getOwnPropertyDescriptor, D = (t, i, s, r) => {
  for (var n = r > 1 ? void 0 : r ? z(i, s) : i, w = t.length - 1, x; w >= 0; w--)
    (x = t[w]) && (n = (r ? x(i, s, n) : x(n)) || n);
  return r && n && O(i, s, n), n;
}, R = (t, i, s) => {
  if (!i.has(t))
    throw TypeError("Cannot " + s);
}, e = (t, i, s) => (R(t, i, "read from private field"), s ? s.call(t) : i.get(t)), a = (t, i, s) => {
  if (i.has(t))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(t) : i.set(t, s);
}, c = (t, i, s, r) => (R(t, i, "write to private field"), r ? r.call(t, s) : i.set(t, s), s), W = (t, i, s) => (R(t, i, "access private method"), s), h, l, p, o, d, v, m, u, _, f, g;
const L = A({
  ":host, canvas": {
    display: "block",
    width: "100%",
    height: "100%"
  }
});
let C = class extends M {
  constructor() {
    super(), a(this, f), a(this, h, null), a(this, l, null), a(this, p, 0), a(this, o, 0), a(this, d, 1), a(this, v, 0), a(this, m, 1), a(this, u, (t) => {
      c(this, d, P(devicePixelRatio, 1, 2)), c(this, p, t.contentRect.width), c(this, o, t.contentRect.height), e(this, h).width = e(this, p) * this.pixelRatio, e(this, h).height = e(this, o) * this.pixelRatio, this.context.scale(this.pixelRatio, this.pixelRatio), W(this, f, g).call(this);
    }), a(this, _, (t) => {
      c(this, v, t.timestamp), c(this, m, t.elapsed), W(this, f, g).call(this);
    }), this.openShadow(L), S(this, {
      children: y({
        ref: (t) => {
          c(this, h, t), c(this, l, t.getContext("2d"));
        }
      })
    });
  }
  get canvasElement() {
    return e(this, h);
  }
  get context() {
    return e(this, l);
  }
  get pixelRatio() {
    return e(this, d);
  }
  get width() {
    return e(this, p);
  }
  get height() {
    return e(this, o);
  }
  get detail() {
    return {
      width: e(this, p),
      height: e(this, o),
      element: this,
      canvasElement: e(this, h),
      pixelRatio: e(this, d),
      context: e(this, l),
      timestamp: e(this, v),
      elapsed: e(this, m)
    };
  }
  connectedCallback() {
    k.subscribe(this, e(this, u)), this.hasAttribute("static") || E.subscribe(e(this, _), {
      culling: this,
      maxFPS: this.hasAttribute("fps") ? parseInt(this.getAttribute("fps")) : void 0
    });
  }
  disconnectedCallback() {
    k.unsubscribe(e(this, u)), E.unsubscribe(e(this, _)), e(this, h).remove();
  }
};
h = /* @__PURE__ */ new WeakMap();
l = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakMap();
f = /* @__PURE__ */ new WeakSet();
g = function() {
  this.dispatchEvent(
    new CustomEvent("canvasRender", {
      composed: !0,
      detail: this.detail
    })
  );
};
C = D([
  b("e-canvas")
], C);
export {
  C as CanvasElement
};
