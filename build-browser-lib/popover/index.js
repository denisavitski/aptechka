import { Attribute as T } from "../attribute/index.js";
import { CustomElement as D, define as P } from "../custom-element/index.js";
import { S as I } from "../Store-JOKrNVEr.js";
import { g as N } from "../style-j2TwriJ_.js";
import { AbstractButtonElement as q } from "../abstract-elements/index.js";
var B = Object.defineProperty, G = Object.getOwnPropertyDescriptor, H = (e, t, s, r) => {
  for (var n = r > 1 ? void 0 : r ? G(t, s) : t, p = e.length - 1, l; p >= 0; p--)
    (l = e[p]) && (n = (r ? l(t, s, n) : l(n)) || n);
  return r && n && B(t, s, n), n;
}, M = (e, t, s) => {
  if (!t.has(e))
    throw TypeError("Cannot " + s);
}, i = (e, t, s) => (M(e, t, "read from private field"), s ? s.call(e) : t.get(e)), o = (e, t, s) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, s);
}, S = (e, t, s, r) => (M(e, t, "write to private field"), r ? r.call(e, s) : t.set(e, s), s), C = (e, t, s) => (M(e, t, "access private method"), s), L, h, g, d, m, f, W, A, u, w, y, E, k, $, v;
let a = class extends D {
  constructor() {
    super(...arguments), o(this, W), o(this, u), o(this, k), o(this, L, -1), o(this, h, new I(!1)), o(this, g, void 0), o(this, d, new T(this, "history", !1)), o(this, m, new T(this, "single", !1)), o(this, f, !1), this.open = () => {
      i(this, h).current || (i(this, h).current = !0, i(this, m).current && (a.__opened.forEach((e) => e.close()), a.__opened = []), a.__opened.push(this), S(this, L, a.__opened.length - 1), i(this, d).current && i(this, f) && history.pushState("", "", i(this, W, A)), clearTimeout(i(this, g)), this.classList.add("triggered"), this.style.display = "block", setTimeout(() => {
        addEventListener("click", i(this, y)), addEventListener("keydown", i(this, E)), this.style.opacity = "1", this.classList.add("opened");
      }));
    }, this.close = () => {
      i(this, h).current && (i(this, h).current = !1, a.__opened = a.__opened.filter((e) => e !== this), i(this, d).current && history.replaceState(
        "",
        "",
        location.href.replace(new RegExp(`[&?]${i(this, u, w)}`, "g"), "")
      ), this.classList.remove("opened"), this.style.opacity = "0", removeEventListener("click", i(this, y)), removeEventListener("keydown", i(this, E)), setTimeout(() => {
        this.classList.remove("triggered"), this.style.display = "none";
      }, N(this)));
    }, o(this, y, (e) => {
      C(this, k, $).call(this, () => {
        const t = e.composedPath();
        (!t.find((s) => s === this) && !t.find(
          (s) => s instanceof HTMLElement && s.closest("e-popover-button")
        ) || t[0] instanceof HTMLElement && t[0].hasAttribute("outside")) && this.close();
      });
    }), o(this, E, (e) => {
      C(this, k, $).call(this, () => {
        e.code === "Escape" && this.close();
      });
    }), o(this, v, () => {
      S(this, f, !1), i(this, h).current && i(this, d).current && !location.search.includes(i(this, u, w)) ? this.close() : !i(this, h).current && i(this, d).current && location.search.includes(i(this, u, w)) && this.open(), S(this, f, !0);
    });
  }
  get history() {
    return i(this, d);
  }
  get single() {
    return i(this, m);
  }
  get opened() {
    return i(this, h);
  }
  connectedCallback() {
    this.style.opacity = "0", this.style.display = "none", addEventListener("popstate", i(this, v)), setTimeout(() => {
      i(this, v).call(this);
    }, 0);
  }
  disconnectedCallback() {
    clearTimeout(i(this, g)), removeEventListener("popstate", i(this, v));
  }
};
L = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
f = /* @__PURE__ */ new WeakMap();
W = /* @__PURE__ */ new WeakSet();
A = function() {
  return `${location.pathname}${location.search ? location.search + "&" : "?"}${i(this, u, w)}`;
};
u = /* @__PURE__ */ new WeakSet();
w = function() {
  return `modal-${this.id}`;
};
y = /* @__PURE__ */ new WeakMap();
E = /* @__PURE__ */ new WeakMap();
k = /* @__PURE__ */ new WeakSet();
$ = function(e) {
  (a.__opened[i(this, L) - 1] || a.__opened.length === 1) && e();
};
v = /* @__PURE__ */ new WeakMap();
a.__opened = [];
a = H([
  P("e-popover")
], a);
var R = Object.defineProperty, z = Object.getOwnPropertyDescriptor, F = (e, t, s, r) => {
  for (var n = r > 1 ? void 0 : r ? z(t, s) : t, p = e.length - 1, l; p >= 0; p--)
    (l = e[p]) && (n = (r ? l(t, s, n) : l(n)) || n);
  return r && n && R(t, s, n), n;
}, x = (e, t, s) => {
  if (!t.has(e))
    throw TypeError("Cannot " + s);
}, _ = (e, t, s) => (x(e, t, "read from private field"), s ? s.call(e) : t.get(e)), J = (e, t, s) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, s);
}, K = (e, t, s, r) => (x(e, t, "write to private field"), r ? r.call(e, s) : t.set(e, s), s), c;
let O = class extends q {
  constructor() {
    super(...arguments), J(this, c, void 0);
  }
  get popoverElement() {
    return _(this, c);
  }
  click() {
    if (_(this, c)) {
      const e = this.getAttribute("type") || "open";
      e === "open" || e === "toggle" && !_(this, c).opened.current ? _(this, c).open() : (e === "close" || e === "toggle" && _(this, c).opened.current) && _(this, c).close();
    }
  }
  connectedCallback() {
    const e = this.getAttribute("target");
    if (e) {
      const t = document.querySelector(`#${e}`) || this.getRootNode().querySelector(`#${e}`);
      t ? K(this, c, t) : console.warn(this, `target ${e} not found`);
    }
  }
};
c = /* @__PURE__ */ new WeakMap();
O = F([
  P("e-popover-button")
], O);
export {
  O as PopoverButtonElement,
  a as PopoverElement
};
