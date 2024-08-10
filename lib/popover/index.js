var M = (o, n, t) => {
  if (!n.has(o))
    throw TypeError("Cannot " + t);
};
var e = (o, n, t) => (M(o, n, "read from private field"), t ? t.call(o) : n.get(o)), i = (o, n, t) => {
  if (n.has(o))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(o) : n.set(o, t);
}, h = (o, n, t, a) => (M(o, n, "write to private field"), a ? a.call(o, t) : n.set(o, t), t);
var $ = (o, n, t) => (M(o, n, "access private method"), t);
import { Attribute as R } from "../attribute/index.js";
import { S as q } from "../Store-Qr3SNOSf.js";
import { g as I } from "../style-j2TwriJ_.js";
import { i as B } from "../browser-0zX67oeU.js";
import "../ticker/index.js";
import { e as D } from "../tags-wG5k157g.js";
var f, c, T, l, d, u, A, N, v, y, E, L, b, H, g;
const p = class p extends HTMLElement {
  constructor() {
    super();
    i(this, A);
    i(this, v);
    i(this, b);
    i(this, f, void 0);
    i(this, c, void 0);
    i(this, T, void 0);
    i(this, l, void 0);
    i(this, d, void 0);
    i(this, u, void 0);
    i(this, E, void 0);
    i(this, L, void 0);
    i(this, g, void 0);
    h(this, f, -1), h(this, c, new q(!1)), h(this, l, new R(this, "history", !1)), h(this, d, new R(this, "single", !1)), h(this, u, !1), this.open = (t = !0) => {
      if (e(this, c).current)
        return;
      e(this, c).current = !0, e(this, d).current && (p.__opened.forEach((r) => r.close()), p.__opened = []), p.__opened.push(this), h(this, f, p.__opened.length - 1), e(this, l).current && e(this, u) && history.pushState("", "", e(this, A, N)), clearTimeout(e(this, T)), this.classList.add("triggered"), this.style.display = "block", this.dispatchEvent(new CustomEvent("popoverTriggered"));
      const a = () => {
        addEventListener("click", e(this, E)), addEventListener("keydown", e(this, L)), this.style.opacity = "1", this.classList.add("opened"), this.dispatchEvent(new CustomEvent("popoverOpened"));
      };
      t ? setTimeout(a) : a();
    }, this.close = () => {
      if (e(this, c).current) {
        if (e(this, c).current = !1, p.__opened = p.__opened.filter((t) => t !== this), e(this, l).current) {
          const t = new URL(location.href);
          t.searchParams.delete(e(this, v, y)), history.replaceState(null, "", t.href);
        }
        this.classList.remove("opened"), this.style.opacity = "0", this.dispatchEvent(new CustomEvent("popoverClosing")), removeEventListener("click", e(this, E)), removeEventListener("keydown", e(this, L)), setTimeout(() => {
          this.classList.remove("triggered"), this.style.display = "none", this.dispatchEvent(new CustomEvent("popoverClosed"));
        }, I(this) + 10);
      }
    }, h(this, E, (t) => {
      $(this, b, H).call(this, () => {
        var O;
        const r = t.composedPath()[0], _ = r instanceof HTMLElement && (this.contains(r) || ((O = this.shadowRoot) == null ? void 0 : O.contains(r))), m = r instanceof HTMLElement && r.hasAttribute("outside");
        (!_ || m) && this.close();
      });
    }), h(this, L, (t) => {
      $(this, b, H).call(this, () => {
        t.code === "Escape" && this.close();
      });
    }), h(this, g, () => {
      h(this, u, !1), e(this, c).current && e(this, l).current && !location.search.includes(e(this, v, y)) ? this.close() : !e(this, c).current && e(this, l).current && location.search.includes(e(this, v, y)) && this.open(), h(this, u, !0);
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
    e(this, l).observe(), e(this, d).observe(), this.style.opacity = "0", this.style.display = "none", addEventListener("popstate", e(this, g)), setTimeout(() => {
      e(this, g).call(this);
    }, 0);
  }
  disconnectedCallback() {
    e(this, l).unobserve(), e(this, d).unobserve(), p.__opened = p.__opened.filter((t) => t !== this), clearTimeout(e(this, T)), removeEventListener("popstate", e(this, g));
  }
};
f = new WeakMap(), c = new WeakMap(), T = new WeakMap(), l = new WeakMap(), d = new WeakMap(), u = new WeakMap(), A = new WeakSet(), N = function() {
  return `${location.pathname}${location.search ? location.search + "&" : "?"}${e(this, v, y)}`;
}, v = new WeakSet(), y = function() {
  return `modal-${this.id}`;
}, E = new WeakMap(), L = new WeakMap(), b = new WeakSet(), H = function(t) {
  (p.__opened[e(this, f) - 1] || p.__opened.length === 1) && t();
}, g = new WeakMap(), p.__opened = [];
let x = p;
customElements.get("e-popover") || customElements.define("e-popover", x);
var s, w, C, k, S;
class K extends HTMLElement {
  constructor() {
    super();
    i(this, s, void 0);
    i(this, w, () => {
      this.classList.add("triggered");
    });
    i(this, C, () => {
      this.classList.add("opened");
    });
    i(this, k, () => {
      this.classList.remove("opened");
    });
    i(this, S, () => {
      this.classList.remove("triggered");
    });
    B && D(this, {
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
      if (t === "parent") {
        const _ = this.closest("[popover-target]");
        if (_)
          r = _;
        else {
          const m = this.getRootNode();
          m instanceof ShadowRoot ? r = m.host.closest("[popover-target]") : m instanceof HTMLElement && (r = m.closest("[popover-target]"));
        }
      } else
        t === "sibling" ? r = (a = this.parentElement) == null ? void 0 : a.querySelector("[popover-target]") : r = document.querySelector(`#${t}`) || this.getRootNode().querySelector(`#${t}`);
      r instanceof HTMLElement ? (h(this, s, r), e(this, s).addEventListener(
        "popoverTriggered",
        e(this, w)
      ), e(this, s).addEventListener(
        "popoverOpened",
        e(this, C)
      ), e(this, s).addEventListener(
        "popoverClosing",
        e(this, k)
      ), e(this, s).addEventListener(
        "popoverClosed",
        e(this, S)
      )) : console.warn(this, `target ${t} not found`);
    }
  }
  disconnectedCallback() {
    e(this, s) && (e(this, s).removeEventListener(
      "popoverTriggered",
      e(this, w)
    ), e(this, s).removeEventListener(
      "popoverOpened",
      e(this, C)
    ), e(this, s).removeEventListener(
      "popoverClosing",
      e(this, k)
    ), e(this, s).removeEventListener(
      "popoverClosed",
      e(this, S)
    ));
  }
}
s = new WeakMap(), w = new WeakMap(), C = new WeakMap(), k = new WeakMap(), S = new WeakMap();
customElements.get("e-popover-button") || customElements.define("e-popover-button", K);
export {
  K as PopoverButtonElement,
  x as PopoverElement
};
