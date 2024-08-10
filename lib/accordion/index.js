var B = (l, i, t) => {
  if (!i.has(l))
    throw TypeError("Cannot " + t);
};
var e = (l, i, t) => (B(l, i, "read from private field"), t ? t.call(l) : i.get(l)), s = (l, i, t) => {
  if (i.has(l))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(l) : i.set(l, t);
}, a = (l, i, t, h) => (B(l, i, "write to private field"), h ? h.call(l, t) : i.set(l, t), t);
var o = (l, i, t) => (B(l, i, "access private method"), t);
import { Attribute as P } from "../attribute/index.js";
import { i as q } from "../browser-0zX67oeU.js";
import { g as F } from "../dom-P5QbAASX.js";
import { d as G, a as J } from "../events-CJTUMSLU.js";
import { g as K } from "../style-j2TwriJ_.js";
var c, r, f, n, v, M, L, m, y, H, j, T, I, A, z, R, C, d, g, E, b, w, W, k;
class $ {
  constructor(i, t) {
    s(this, H);
    s(this, T);
    s(this, d);
    s(this, E);
    s(this, w);
    s(this, c, null);
    s(this, r, null);
    s(this, f, null);
    s(this, n, null);
    s(this, v, null);
    s(this, M, !1);
    s(this, L, void 0);
    s(this, m, !1);
    s(this, y, []);
    s(this, A, () => {
      e(this, m) ? this.close() : this.open();
    });
    s(this, z, () => {
      e(this, m) && (o(this, d, g).call(this, 0, !0), o(this, d, g).call(this, e(this, T, I)));
    });
    s(this, R, () => {
      o(this, E, b).call(this, "size-change");
    });
    s(this, C, (i) => {
      e(this, m) && (o(this, d, g).call(this, 0, !0), o(this, d, g).call(this, e(this, T, I)), e(this, y).forEach((t) => {
        t.element.scroll({
          left: e(this, c).axisAttribute.current === "x" ? t.scroll : 0,
          top: e(this, c).axisAttribute.current === "y" ? t.scroll : 0
        });
      }));
    });
    s(this, k, () => {
      const i = F(e(this, r));
      a(this, y, i.map((t) => ({
        element: t,
        scroll: e(this, c).axisAttribute.current === "y" ? t.scrollTop : t.scrollLeft
      })));
    });
    t.firstElementChild instanceof HTMLElement && t.lastElementChild instanceof HTMLElement ? (a(this, c, i), a(this, r, t), a(this, f, t.firstElementChild), a(this, n, t.lastElementChild), e(this, f).style.cursor = "default", e(this, n).style.overflow = "hidden", e(this, c).axisAttribute.current === "y" ? e(this, n).style.height = "0px" : e(this, n).style.width = "0px", a(this, v, new ResizeObserver(e(this, R))), addEventListener("resize", e(this, z)), e(this, f).addEventListener("click", e(this, A)), e(this, r).addEventListener(
      "beforeSizeChange",
      e(this, k)
    ), e(this, r).addEventListener(
      "sizeChange",
      e(this, C)
    ), e(this, r).hasAttribute("data-opened") && this.open({ skipTransition: !0 })) : i.removeItem(e(this, r));
  }
  get element() {
    return e(this, r);
  }
  destroy() {
    e(this, f) && (e(this, r).classList.remove("opened", "triggered"), e(this, f).style.cursor = "", o(this, d, g).call(this, void 0), e(this, v).disconnect(), removeEventListener("resize", e(this, z)), e(this, f).removeEventListener("click", e(this, A)), e(this, r).removeEventListener(
      "beforeSizeChange",
      e(this, k)
    ), e(this, r).removeEventListener(
      "sizeChange",
      e(this, C)
    ), clearTimeout(e(this, L)));
  }
  open(i) {
    o(this, E, b).call(this, "before-toggle"), i != null && i.skipTransition && o(this, w, W).call(this), e(this, c).multipleAttribute.current || e(this, c).closeAll({ exclude: e(this, r) }), e(this, M) || e(this, v).observe(e(this, n)), a(this, m, !0), clearTimeout(e(this, L)), e(this, r).classList.add("triggered"), o(this, d, g).call(this, e(this, T, I)), setTimeout(() => {
      e(this, r).classList.add("opened");
    }, 0), o(this, E, b).call(this, "toggle");
  }
  close(i) {
    o(this, E, b).call(this, "before-toggle"), i != null && i.skipTransition && o(this, w, W).call(this), a(this, m, !1), e(this, r).classList.remove("opened"), o(this, d, g).call(this, 0), a(this, L, setTimeout(() => {
      e(this, r).classList.remove("triggered");
    }, K(e(this, n)))), o(this, E, b).call(this, "toggle");
  }
}
c = new WeakMap(), r = new WeakMap(), f = new WeakMap(), n = new WeakMap(), v = new WeakMap(), M = new WeakMap(), L = new WeakMap(), m = new WeakMap(), y = new WeakMap(), H = new WeakSet(), j = function() {
  return e(this, r).parentElement || e(this, r).getRootNode();
}, T = new WeakSet(), I = function() {
  return e(this, c).axisAttribute.current === "x" ? e(this, n).scrollWidth : e(this, n).scrollHeight;
}, A = new WeakMap(), z = new WeakMap(), R = new WeakMap(), C = new WeakMap(), d = new WeakSet(), g = function(i, t = !1) {
  t && (e(this, n).style.transition = "all 0s", setTimeout(() => {
    e(this, n).style.transition = "";
  }));
  const h = e(this, c).axisAttribute.current === "x" ? "width" : "height";
  i != null ? e(this, n).style[h] = `${i}px` : e(this, n).style[h] = "";
}, E = new WeakSet(), b = function(i) {
  i === "before-toggle" ? G(e(this, r)) : i === "toggle" ? e(this, r).dispatchEvent(
    new CustomEvent("accordionItemToggle", {
      bubbles: !0,
      composed: !0,
      detail: {
        opened: e(this, m)
      }
    })
  ) : i === "size-change" && J(e(this, H, j));
}, w = new WeakSet(), W = function() {
  e(this, n).style.transition = "all 0s", setTimeout(() => {
    e(this, n).style.transition = "";
  }, 50);
}, k = new WeakMap();
var O, N, u, p, S, D;
class Q extends HTMLElement {
  constructor() {
    super();
    s(this, S);
    s(this, O, new P(this, "axis", "y"));
    s(this, N, new P(this, "multiple", !1));
    s(this, u, []);
    s(this, p, null);
    q && a(this, p, new MutationObserver((t) => {
      t.forEach((h) => {
        h.removedNodes.forEach((x) => {
          x instanceof HTMLElement && this.removeItem(x);
        }), h.addedNodes.forEach((x) => {
          x instanceof HTMLElement && this.createItem(x);
        });
      });
    }));
  }
  get axisAttribute() {
    return e(this, O);
  }
  get multipleAttribute() {
    return e(this, N);
  }
  createItem(t) {
    e(this, u).find((h) => h.element === t) || e(this, u).push(new $(this, t));
  }
  removeItem(t) {
    a(this, u, e(this, u).filter((h) => {
      if (h.element !== t)
        return !0;
      h.destroy();
    }));
  }
  closeAll(t) {
    e(this, u).forEach((h) => {
      (t == null ? void 0 : t.exclude) !== h.element && h.close(t);
    });
  }
  openAll(t) {
    e(this, u).forEach((h) => {
      (t == null ? void 0 : t.exclude) !== h.element && h.open(t);
    });
  }
  connectedCallback() {
    e(this, p).observe(e(this, S, D), {
      childList: !0
    }), a(this, u, [...e(this, S, D).children].map((t) => {
      if (t instanceof HTMLElement)
        return new $(this, t);
    }).filter((t) => !!t));
  }
  disconnectedCallback() {
    e(this, p).disconnect();
  }
}
O = new WeakMap(), N = new WeakMap(), u = new WeakMap(), p = new WeakMap(), S = new WeakSet(), D = function() {
  return this.shadowRoot ? this.shadowRoot : this;
};
customElements.get("e-accordion") || customElements.define("e-accordion", Q);
export {
  Q as AccordionElement
};
