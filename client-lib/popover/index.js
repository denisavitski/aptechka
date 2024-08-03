var S = (o, n, t) => {
  if (!n.has(o))
    throw TypeError("Cannot " + t);
};
var e = (o, n, t) => (S(o, n, "read from private field"), t ? t.call(o) : n.get(o)), i = (o, n, t) => {
  if (n.has(o))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(o) : n.set(o, t);
}, h = (o, n, t, a) => (S(o, n, "write to private field"), a ? a.call(o, t) : n.set(o, t), t);
var A = (o, n, t) => (S(o, n, "access private method"), t);
import { Attribute as O } from "../attribute/index.js";
import { S as R } from "../Store-Qr3SNOSf.js";
import { g as B } from "../style-j2TwriJ_.js";
import { i as N } from "../browser-0zX67oeU.js";
import "../ticker/index.js";
import { e as D } from "../tags-D0kLlFdQ.js";
var g, c, y, l, d, u, _, H, v, L, f, E, b, x, m;
const p = class p extends HTMLElement {
  constructor() {
    super();
    i(this, _);
    i(this, v);
    i(this, b);
    i(this, g, void 0);
    i(this, c, void 0);
    i(this, y, void 0);
    i(this, l, void 0);
    i(this, d, void 0);
    i(this, u, void 0);
    i(this, f, void 0);
    i(this, E, void 0);
    i(this, m, void 0);
    h(this, g, -1), h(this, c, new R(!1)), h(this, l, new O(this, "history", !1)), h(this, d, new O(this, "single", !1)), h(this, u, !1), this.open = (t = !0) => {
      if (e(this, c).current)
        return;
      e(this, c).current = !0, e(this, d).current && (p.__opened.forEach((r) => r.close()), p.__opened = []), p.__opened.push(this), h(this, g, p.__opened.length - 1), e(this, l).current && e(this, u) && history.pushState("", "", e(this, _, H)), clearTimeout(e(this, y)), this.classList.add("triggered"), this.style.display = "block", this.dispatchEvent(new CustomEvent("popoverTriggered"));
      const a = () => {
        addEventListener("click", e(this, f)), addEventListener("keydown", e(this, E)), this.style.opacity = "1", this.classList.add("opened"), this.dispatchEvent(new CustomEvent("popoverOpened"));
      };
      t ? setTimeout(a) : a();
    }, this.close = () => {
      if (e(this, c).current) {
        if (e(this, c).current = !1, p.__opened = p.__opened.filter((t) => t !== this), e(this, l).current) {
          const t = new URL(location.href);
          t.searchParams.delete(e(this, v, L)), history.replaceState(null, "", t.href);
        }
        this.classList.remove("opened"), this.style.opacity = "0", this.dispatchEvent(new CustomEvent("popoverClosing")), removeEventListener("click", e(this, f)), removeEventListener("keydown", e(this, E)), setTimeout(() => {
          this.classList.remove("triggered"), this.style.display = "none", this.dispatchEvent(new CustomEvent("popoverClosed"));
        }, B(this) + 10);
      }
    }, h(this, f, (t) => {
      A(this, b, x).call(this, () => {
        var M;
        const r = t.composedPath()[0], q = r instanceof HTMLElement && (this.contains(r) || ((M = this.shadowRoot) == null ? void 0 : M.contains(r))), I = r instanceof HTMLElement && r.hasAttribute("outside");
        (!q || I) && this.close();
      });
    }), h(this, E, (t) => {
      A(this, b, x).call(this, () => {
        t.code === "Escape" && this.close();
      });
    }), h(this, m, () => {
      h(this, u, !1), e(this, c).current && e(this, l).current && !location.search.includes(e(this, v, L)) ? this.close() : !e(this, c).current && e(this, l).current && location.search.includes(e(this, v, L)) && this.open(), h(this, u, !0);
    }), this.setAttribute("popover-target", "");
  }
  get history() {
    return e(this, l);
  }
  get single() {
    return e(this, d);
  }
  get opened() {
    return e(this, c);
  }
  connectedCallback() {
    e(this, l).observe(), e(this, d).observe(), this.style.opacity = "0", this.style.display = "none", addEventListener("popstate", e(this, m)), setTimeout(() => {
      e(this, m).call(this);
    }, 0);
  }
  disconnectedCallback() {
    e(this, l).unobserve(), e(this, d).unobserve(), p.__opened = p.__opened.filter((t) => t !== this), clearTimeout(e(this, y)), removeEventListener("popstate", e(this, m));
  }
};
g = new WeakMap(), c = new WeakMap(), y = new WeakMap(), l = new WeakMap(), d = new WeakMap(), u = new WeakMap(), _ = new WeakSet(), H = function() {
  return `${location.pathname}${location.search ? location.search + "&" : "?"}${e(this, v, L)}`;
}, v = new WeakSet(), L = function() {
  return `modal-${this.id}`;
}, f = new WeakMap(), E = new WeakMap(), b = new WeakSet(), x = function(t) {
  (p.__opened[e(this, g) - 1] || p.__opened.length === 1) && t();
}, m = new WeakMap(), p.__opened = [];
let $ = p;
customElements.get("e-popover") || customElements.define("e-popover", $);
var s, T, w, C, k;
class K extends HTMLElement {
  constructor() {
    super();
    i(this, s, void 0);
    i(this, T, () => {
      this.classList.add("triggered");
    });
    i(this, w, () => {
      this.classList.add("opened");
    });
    i(this, C, () => {
      this.classList.remove("opened");
    });
    i(this, k, () => {
      this.classList.remove("triggered");
    });
    N && D(this, {
      tabindex: this.getAttribute("tabindex") || "0",
      onClick: () => {
        if (e(this, s)) {
          const t = this.getAttribute("type") || "open";
          t === "open" || t === "toggle" && !e(this, s).opened.current ? e(this, s).open() : (t === "close" || t === "toggle" && e(this, s).opened.current) && e(this, s).close();
        }
      },
      onKeydown: (t) => {
        t.code === "Space" && t.currentTarget.click();
      }
    });
  }
  get popoverElement() {
    return e(this, s);
  }
  connectedCallback() {
    var a;
    const t = this.getAttribute("target");
    if (t) {
      let r = null;
      t === "parent" ? r = this.closest("[popover-target]") : t === "sibling" ? r = (a = this.parentElement) == null ? void 0 : a.querySelector("[popover-target]") : r = document.querySelector(`#${t}`) || this.getRootNode().querySelector(`#${t}`), r instanceof HTMLElement ? (h(this, s, r), e(this, s).addEventListener(
        "popoverTriggered",
        e(this, T)
      ), e(this, s).addEventListener(
        "popoverOpened",
        e(this, w)
      ), e(this, s).addEventListener(
        "popoverClosing",
        e(this, C)
      ), e(this, s).addEventListener(
        "popoverClosed",
        e(this, k)
      )) : console.warn(this, `target ${t} not found`);
    }
  }
  disconnectedCallback() {
    e(this, s) && (e(this, s).removeEventListener(
      "popoverTriggered",
      e(this, T)
    ), e(this, s).removeEventListener(
      "popoverOpened",
      e(this, w)
    ), e(this, s).removeEventListener(
      "popoverClosing",
      e(this, C)
    ), e(this, s).removeEventListener(
      "popoverClosed",
      e(this, k)
    ));
  }
}
s = new WeakMap(), T = new WeakMap(), w = new WeakMap(), C = new WeakMap(), k = new WeakMap();
customElements.get("e-popover-button") || customElements.define("e-popover-button", K);
export {
  K as PopoverButtonElement,
  $ as PopoverElement
};
