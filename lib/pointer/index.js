var j = Object.defineProperty;
var k = Object.getOwnPropertySymbols;
var q = Object.prototype.hasOwnProperty, A = Object.prototype.propertyIsEnumerable;
var D = (i, s, e) => s in i ? j(i, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[s] = e, H = (i, s) => {
  for (var e in s || (s = {}))
    q.call(s, e) && D(i, e, s[e]);
  if (k)
    for (var e of k(s))
      A.call(s, e) && D(i, e, s[e]);
  return i;
};
var M = (i, s, e) => {
  if (!s.has(i))
    throw TypeError("Cannot " + e);
};
var t = (i, s, e) => (M(i, s, "read from private field"), e ? e.call(i) : s.get(i)), n = (i, s, e) => {
  if (s.has(i))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(i) : s.set(i, e);
}, c = (i, s, e, m) => (M(i, s, "write to private field"), m ? m.call(i, e) : s.set(i, e), e);
import "../Store-Qr3SNOSf.js";
import { g as F, s as G, n as I } from "../coordinates-CgdGoSYs.js";
import { a as J } from "../dom-P5QbAASX.js";
import { c as T } from "../math-BOBiC4TN.js";
import "../ticker/index.js";
import { D as R } from "../Damped-yrNXlkDE.js";
import { elementResizer as B } from "../element-resizer/index.js";
import { windowResizer as W } from "../window-resizer/index.js";
import { CSSProperty as P } from "../css-property/index.js";
var o, a, l, y, b, u, d, f, S, w, E, p;
class K {
  constructor(s) {
    n(this, o, void 0);
    n(this, a, void 0);
    n(this, l, void 0);
    n(this, y, void 0);
    n(this, b, void 0);
    n(this, u, void 0);
    n(this, d, 0);
    n(this, f, 0);
    n(this, S, (s) => {
      t(this, y).set(1);
    });
    n(this, w, (s) => {
      t(this, y).set(0);
    });
    n(this, E, (s) => {
      const e = F(s, t(this, o).getBoundingClientRect()), m = {
        width: t(this, d),
        height: t(this, f)
      }, h = {
        x: e.x,
        y: e.y
      };
      if (t(this, b)) {
        const z = G(h, m);
        h.x = z.x, h.y = z.y;
      }
      if (t(this, u)) {
        const z = I(h, m);
        h.x = T(z.x * 2, -1, 1), h.y = T(z.y * 2, -1, 1);
      }
      t(this, a).set(h.x), t(this, l).set(h.y);
    });
    n(this, p, () => {
      c(this, d, this.element.clientWidth), c(this, f, this.element.clientHeight);
      let s = 0, e = 0, m = 0, h = 0;
      t(this, b) ? t(this, u) ? (s = -1, e = 1, m = -1, h = 1) : (s = t(this, d) / 2 * -1, e = t(this, d) / 2 * 1, m = t(this, f) / 2 * -1, h = t(this, f) / 2 * 1) : t(this, u) ? (s = 0, e = 1, m = 0, h = 1) : (s = 0, e = t(this, d), m = 0, h = t(this, f)), t(this, a).min = s, t(this, a).max = e, t(this, l).min = m, t(this, l).max = h;
    });
    c(this, o, J(s.element)), c(this, a, new R(0, s.damped)), c(this, l, new R(0, s.damped)), c(this, y, new R(0, H({ min: 0, max: 1 }, s.damped))), c(this, b, s.cartesian || !1), c(this, u, s.normalize || !1);
  }
  get element() {
    return t(this, o);
  }
  get x() {
    return t(this, a);
  }
  get y() {
    return t(this, l);
  }
  get z() {
    return t(this, y);
  }
  get cartesian() {
    return t(this, b);
  }
  set cartesian(s) {
    c(this, b, s), t(this, p).call(this);
  }
  get normalize() {
    return t(this, u);
  }
  set normalize(s) {
    c(this, u, s), t(this, p).call(this);
  }
  connect() {
    t(this, o).addEventListener("pointerenter", t(this, S)), t(this, o).addEventListener("pointerleave", t(this, w)), t(this, o).addEventListener("pointermove", t(this, E)), B.subscribe(t(this, o), t(this, p)), W.subscribe(t(this, p));
  }
  disconnect() {
    t(this, o).removeEventListener(
      "pointerenter",
      t(this, S)
    ), t(this, o).removeEventListener(
      "pointerleave",
      t(this, w)
    ), t(this, o).removeEventListener("pointermove", t(this, E)), B.unsubscribe(t(this, p)), W.unsubscribe(t(this, p)), t(this, a).reset(), t(this, l).reset(), t(this, y).reset();
  }
}
o = new WeakMap(), a = new WeakMap(), l = new WeakMap(), y = new WeakMap(), b = new WeakMap(), u = new WeakMap(), d = new WeakMap(), f = new WeakMap(), S = new WeakMap(), w = new WeakMap(), E = new WeakMap(), p = new WeakMap();
var r, g, v, x, L, C;
class N extends HTMLElement {
  constructor() {
    super();
    n(this, r, void 0);
    n(this, g, new P(this, "--damping", 20));
    n(this, v, new P(this, "--mass", 0));
    n(this, x, new P(this, "--stiffness", 0));
    n(this, L, new P(this, "--cartesian", !1));
    n(this, C, new P(this, "--normalize", !1));
    c(this, r, new K({
      element: this
    })), t(this, g).subscribe((e) => {
      t(this, r).x.damping = e.current, t(this, r).y.damping = e.current, t(this, r).z.damping = e.current;
    }), t(this, L).subscribe((e) => {
      t(this, r).cartesian = e.current;
    }), t(this, C).subscribe((e) => {
      t(this, r).normalize = e.current;
    }), t(this, v).subscribe((e) => {
      t(this, r).x.mass = e.current, t(this, r).y.mass = e.current, t(this, r).z.mass = e.current;
    }), t(this, x).subscribe((e) => {
      t(this, r).x.stiffness = e.current, t(this, r).y.stiffness = e.current, t(this, r).z.stiffness = e.current;
    }), t(this, r).x.subscribe((e) => {
      this.style.setProperty("--x", e.current.toString());
    }), t(this, r).y.subscribe((e) => {
      this.style.setProperty("--y", e.current.toString());
    }), t(this, r).z.subscribe((e) => {
      this.style.setProperty("--z", e.current.toString());
    });
  }
  get pointer() {
    return t(this, r);
  }
  connectedCallback() {
    t(this, r).connect(), t(this, g).observe(), t(this, v).observe(), t(this, x).observe();
  }
  disconnectedCallback() {
    t(this, r).disconnect(), t(this, g).unobserve(), t(this, v).unobserve(), t(this, x).unobserve(), this.style.removeProperty("--x"), this.style.removeProperty("--y"), this.style.removeProperty("--z");
  }
}
r = new WeakMap(), g = new WeakMap(), v = new WeakMap(), x = new WeakMap(), L = new WeakMap(), C = new WeakMap();
customElements.get("e-pointer") || customElements.define("e-pointer", N);
export {
  K as Pointer,
  N as PointerElement
};
