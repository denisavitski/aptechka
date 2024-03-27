var S = (t, e, s) => {
  if (!e.has(t))
    throw TypeError("Cannot " + s);
};
var i = (t, e, s) => (S(t, e, "read from private field"), s ? s.call(t) : e.get(t)), h = (t, e, s) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, s);
}, d = (t, e, s, o) => (S(t, e, "write to private field"), o ? o.call(t, s) : e.set(t, s), s);
var l = (t, e, s) => (S(t, e, "access private method"), s);
import { CustomElement as J, define as K } from "../custom-element/index.js";
import { Attribute as B } from "../attribute/index.js";
import { i as Q } from "../browser-0zX67oeU.js";
import { d as U } from "../events-_C2CztxR.js";
import { g as V } from "../style-j2TwriJ_.js";
var X = Object.defineProperty, Y = Object.getOwnPropertyDescriptor, Z = (t, e, s, o) => {
  for (var g = o > 1 ? void 0 : o ? Y(e, s) : e, I = t.length - 1, O; I >= 0; I--)
    (O = t[I]) && (g = (o ? O(e, s, g) : O(g)) || g);
  return o && g && X(e, s, g), g;
}, q = (t, e, s) => {
  if (!e.has(t))
    throw TypeError("Cannot " + s);
}, a = (t, e, s) => (q(t, e, "read from private field"), s ? s.call(t) : e.get(t)), T = (t, e, s) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, s);
}, R = (t, e, s, o) => (q(t, e, "write to private field"), o ? o.call(t, s) : e.set(t, s), s), W, P, f, _, z, D, p, r, u, n, E, M, w, m, x, F, y, C, H, b, c, v, L, k, A, N;
class G {
  constructor(e, s) {
    h(this, x);
    h(this, c);
    h(this, L);
    h(this, A);
    h(this, p, null);
    h(this, r, null);
    h(this, u, null);
    h(this, n, null);
    h(this, E, null);
    h(this, M, !1);
    h(this, w, void 0);
    h(this, m, !1);
    h(this, y, () => {
      i(this, m) ? this.close() : this.open();
    });
    h(this, C, () => {
      i(this, m) && (l(this, c, v).call(this, 0, !0), l(this, c, v).call(this, i(this, n).scrollHeight));
    });
    h(this, H, () => {
      l(this, L, k).call(this, "size-change");
    });
    h(this, b, () => {
      i(this, m) && (l(this, c, v).call(this, 0, !0), l(this, c, v).call(this, i(this, n).scrollHeight));
    });
    s.firstElementChild instanceof HTMLElement && s.lastElementChild instanceof HTMLElement ? (d(this, p, e), d(this, r, s), d(this, u, s.firstElementChild), d(this, n, s.lastElementChild), i(this, u).style.cursor = "default", i(this, n).style.height = "0px", i(this, n).style.overflow = "hidden", d(this, E, new ResizeObserver(i(this, H))), addEventListener("resize", i(this, C)), i(this, u).addEventListener("click", i(this, y)), i(this, r).addEventListener(
      "sizeChange",
      i(this, b)
    ), i(this, r).hasAttribute("data-opened") && this.open({ skipTransition: !0 })) : e.removeItem(i(this, r));
  }
  get element() {
    return i(this, r);
  }
  destroy() {
    i(this, u) && (i(this, r).classList.remove("opened", "triggered"), i(this, u).style.cursor = "", l(this, c, v).call(this, void 0), i(this, E).disconnect(), removeEventListener("resize", i(this, C)), i(this, u).removeEventListener("click", i(this, y)), i(this, r).removeEventListener(
      "sizeChange",
      i(this, b)
    ), clearTimeout(i(this, w)));
  }
  open(e) {
    e != null && e.skipTransition && l(this, A, N).call(this), i(this, p).multipleAttribute.current || i(this, p).closeAll({ exclude: i(this, r) }), i(this, M) || i(this, E).observe(i(this, n)), d(this, m, !0), clearTimeout(i(this, w)), i(this, r).classList.add("triggered"), l(this, c, v).call(this, i(this, n).scrollHeight), setTimeout(() => {
      i(this, r).classList.add("opened");
    }, 0), l(this, L, k).call(this, "toggle");
  }
  close(e) {
    e != null && e.skipTransition && l(this, A, N).call(this), d(this, m, !1), i(this, r).classList.remove("opened"), l(this, c, v).call(this, 0), d(this, w, setTimeout(() => {
      i(this, r).classList.remove("triggered");
    }, V(i(this, n)))), l(this, L, k).call(this, "toggle");
  }
}
p = new WeakMap(), r = new WeakMap(), u = new WeakMap(), n = new WeakMap(), E = new WeakMap(), M = new WeakMap(), w = new WeakMap(), m = new WeakMap(), x = new WeakSet(), F = function() {
  return i(this, r).parentElement || i(this, r).getRootNode();
}, y = new WeakMap(), C = new WeakMap(), H = new WeakMap(), b = new WeakMap(), c = new WeakSet(), v = function(e, s = !1) {
  s && (i(this, n).style.transition = "all 0s", setTimeout(() => {
    i(this, n).style.transition = "";
  })), e != null ? i(this, n).style.height = `${e}px` : i(this, n).style.height = "";
}, L = new WeakSet(), k = function(e) {
  e === "toggle" ? i(this, r).dispatchEvent(
    new CustomEvent("accordionItemToggle", {
      bubbles: !0,
      composed: !0,
      detail: {
        opened: i(this, m)
      }
    })
  ) : e === "size-change" && U(i(this, x, F));
}, A = new WeakSet(), N = function() {
  i(this, n).style.transition = "all 0s", setTimeout(() => {
    i(this, n).style.transition = "";
  }, 50);
};
let $ = class extends J {
  constructor() {
    super(), T(this, z), T(this, W, new B(this, "axis", "y")), T(this, P, new B(this, "multiple", !1)), T(this, f, []), T(this, _, null), Q && R(this, _, new MutationObserver((t) => {
      t.forEach((e) => {
        e.removedNodes.forEach((s) => {
          s instanceof HTMLElement && this.removeItem(s);
        }), e.addedNodes.forEach((s) => {
          s instanceof HTMLElement && this.createItem(s);
        });
      });
    }));
  }
  get axisAttribute() {
    return a(this, W);
  }
  get multipleAttribute() {
    return a(this, P);
  }
  createItem(t) {
    a(this, f).find((e) => e.element === t) || a(this, f).push(new G(this, t));
  }
  removeItem(t) {
    R(this, f, a(this, f).filter((e) => {
      if (e.element !== t)
        return !0;
      e.destroy();
    }));
  }
  closeAll(t) {
    a(this, f).forEach((e) => {
      (t == null ? void 0 : t.exclude) !== e.element && e.close(t);
    });
  }
  openAll(t) {
    a(this, f).forEach((e) => {
      (t == null ? void 0 : t.exclude) !== e.element && e.open(t);
    });
  }
  connectedCallback() {
    a(this, _).observe(a(this, z, D), {
      childList: !0
    }), R(this, f, [...a(this, z, D).children].map((t) => {
      if (t instanceof HTMLElement)
        return new G(this, t);
    }).filter((t) => !!t));
  }
  disconnectedCallback() {
    a(this, _).disconnect();
  }
};
W = /* @__PURE__ */ new WeakMap();
P = /* @__PURE__ */ new WeakMap();
f = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakMap();
z = /* @__PURE__ */ new WeakSet();
D = function() {
  return this.shadowRoot ? this.shadowRoot : this;
};
$ = Z([
  K("e-accordion")
], $);
export {
  $ as AccordionElement
};
