var E = (i, s, e) => {
  if (!s.has(i))
    throw TypeError("Cannot " + e);
};
var t = (i, s, e) => (E(i, s, "read from private field"), e ? e.call(i) : s.get(i)), h = (i, s, e) => {
  if (s.has(i))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(i) : s.set(i, e);
}, r = (i, s, e, n) => (E(i, s, "write to private field"), n ? n.call(i, e) : s.set(i, e), e);
var c = (i, s, e) => (E(i, s, "access private method"), e);
import { CSSProperty as F } from "../css-property/index.js";
import "../Store-Qr3SNOSf.js";
import { c as B } from "../math-BOBiC4TN.js";
import { ticker as S } from "../ticker/index.js";
import { e as L, q } from "../tags-D0kLlFdQ.js";
import { c as A } from "../createStylesheet-BrFGJ8Q7.js";
import { elementResizer as k } from "../element-resizer/index.js";
const H = A({
  ":host, canvas": {
    display: "block",
    width: "100%",
    height: "100%"
  }
});
var a, o, p, m, l, d, v, b, f, C, w, P, g, u, x, y, R, z;
class M extends HTMLElement {
  constructor() {
    super();
    h(this, f);
    h(this, w);
    h(this, x);
    h(this, R);
    h(this, a, new F(this, "--fps", 0));
    h(this, o, null);
    h(this, p, null);
    h(this, m, 0);
    h(this, l, 0);
    h(this, d, 1);
    h(this, v, 0);
    h(this, b, 1);
    h(this, g, (e) => {
      r(this, d, B(devicePixelRatio, 1, 2)), r(this, m, e.contentRect.width), r(this, l, e.contentRect.height), t(this, o).width = t(this, m) * this.pixelRatio, t(this, o).height = t(this, l) * this.pixelRatio, this.context.scale(this.pixelRatio, this.pixelRatio), c(this, R, z).call(this), c(this, x, y).call(this);
    });
    h(this, u, (e) => {
      r(this, v, e.timestamp), r(this, b, e.timeBetweenFrames), c(this, x, y).call(this);
    });
    this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(H), L(this, {
      children: q({
        ref: (n) => {
          r(this, o, n), r(this, p, n.getContext("2d"));
        }
      })
    }), t(this, a).subscribe((n) => {
      typeof n.previous != "undefined" && n.current !== n.previous && c(this, f, C).call(this);
    });
  }
  get fpsCSSProperty() {
    return t(this, a);
  }
  get canvasElement() {
    return t(this, o);
  }
  get context() {
    return t(this, p);
  }
  get pixelRatio() {
    return t(this, d);
  }
  get width() {
    return t(this, m);
  }
  get height() {
    return t(this, l);
  }
  get detail() {
    return {
      width: t(this, m),
      height: t(this, l),
      element: this,
      canvasElement: t(this, o),
      pixelRatio: t(this, d),
      context: t(this, p),
      timestamp: t(this, v),
      timeBetweenFrames: t(this, b)
    };
  }
  connectedCallback() {
    t(this, a).observe(), k.subscribe(this, t(this, g)), c(this, f, C).call(this);
  }
  disconnectedCallback() {
    t(this, a).unobserve(), k.unsubscribe(t(this, g)), c(this, w, P).call(this);
  }
}
a = new WeakMap(), o = new WeakMap(), p = new WeakMap(), m = new WeakMap(), l = new WeakMap(), d = new WeakMap(), v = new WeakMap(), b = new WeakMap(), f = new WeakSet(), C = function() {
  S.unsubscribe(t(this, u)), this.hasAttribute("static") || S.subscribe(t(this, u), {
    culling: this,
    maxFPS: t(this, a).current
  });
}, w = new WeakSet(), P = function() {
  S.unsubscribe(t(this, u));
}, g = new WeakMap(), u = new WeakMap(), x = new WeakSet(), y = function() {
  this.dispatchEvent(
    new CustomEvent("canvasRender", {
      composed: !0,
      detail: this.detail
    })
  );
}, R = new WeakSet(), z = function() {
  this.dispatchEvent(
    new CustomEvent("canvasResize", {
      composed: !0,
      detail: this.detail
    })
  );
};
customElements.get("e-canvas") || customElements.define("e-canvas", M);
export {
  M as CanvasElement
};
