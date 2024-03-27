var I = (e, t, s) => {
  if (!t.has(e))
    throw TypeError("Cannot " + s);
};
var H = (e, t, s) => (I(e, t, "read from private field"), s ? s.call(e) : t.get(e)), G = (e, t, s) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, s);
}, R = (e, t, s, i) => (I(e, t, "write to private field"), i ? i.call(e, s) : t.set(e, s), s);
import { CustomElement as Y, define as P } from "./custom-element/index.js";
import "./Store-JOKrNVEr.js";
import { i as D } from "./browser-0zX67oeU.js";
import { d as V } from "./events-_C2CztxR.js";
import { g as X } from "./style-j2TwriJ_.js";
import { e as x, p as j, ax as _, D as q } from "./tags-C2jg1zYB.js";
import { c as z } from "./createStylesheet-CD11E4C8.js";
import { aptechkaTheme as m } from "./theme/index.js";
var ee = Object.defineProperty, te = Object.getOwnPropertyDescriptor, se = (e, t, s, i) => {
  for (var a = i > 1 ? void 0 : i ? te(t, s) : t, r = e.length - 1, l; r >= 0; r--)
    (l = e[r]) && (a = (i ? l(t, s, a) : l(a)) || a);
  return i && a && ee(t, s, a), a;
}, A = (e, t, s) => {
  if (!t.has(e))
    throw TypeError("Cannot " + s);
}, n = (e, t, s) => (A(e, t, "read from private field"), s ? s.call(e) : t.get(e)), h = (e, t, s) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, s);
}, c = (e, t, s, i) => (A(e, t, "write to private field"), i ? i.call(e, s) : t.set(e, s), s), B = (e, t, s) => (A(e, t, "access private method"), s), E, y, o, p, v, u, O, C, W;
const ie = z({
  ":host": {
    position: "relative"
  },
  ".head": {
    width: "100%",
    cursor: "default",
    background: "none",
    border: "none",
    color: "inherit",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    textAlign: "start",
    padding: "0",
    margin: "0"
  },
  ".body": {
    boxSizing: "border-box",
    position: "var(--position, unset)",
    top: "100%",
    left: "0",
    width: "100%",
    overflow: "hidden",
    transitionDuration: `var(--duration, ${m.durationShort.var})`,
    transitionProperty: "height",
    cursor: "default"
  },
  ".body-inner": {
    display: "grid",
    gap: "var(--gap, 0px)",
    width: "100%",
    paddingTop: "var(--gap, 0px)"
  }
});
let b = class extends Y {
  constructor() {
    super(), h(this, C), h(this, E, null), h(this, y, ""), h(this, o, null), h(this, p, !1), h(this, v, void 0), h(this, u, null), h(this, O, () => {
      V(this);
    }), D && (this.openShadow(ie), c(this, E, this.attachInternals()), c(this, u, new ResizeObserver(n(this, O))), x(this, {
      children: [
        j({
          class: "head",
          children: _({ name: "head" }),
          onClick: () => {
            this.opened ? this.close() : this.open();
          }
        }),
        q({
          class: "body",
          style: {
            height: "0px"
          },
          children: q({
            class: "body-inner",
            children: _()
          }),
          ref: (e) => {
            c(this, o, e);
          }
        })
      ]
    }));
  }
  get value() {
    return n(this, y);
  }
  set value(e) {
    c(this, y, e), this.dispatchEvent(
      new Event("change", {
        bubbles: !0,
        composed: !0
      })
    );
  }
  get internals() {
    return n(this, E);
  }
  get opened() {
    return n(this, p);
  }
  open() {
    clearTimeout(n(this, v)), c(this, p, !0), n(this, o).style.display = "grid", this.classList.add("triggered"), setTimeout(() => {
      this.classList.add("opened"), n(this, o).style.height = n(this, o).scrollHeight + "px", B(this, C, W).call(this);
    }, 0);
  }
  close() {
    c(this, p, !1), n(this, o).style.height = "0px", this.classList.remove("opened"), B(this, C, W).call(this), c(this, v, setTimeout(() => {
      this.classList.remove("triggered"), n(this, o).style.display = "none";
    }, X(n(this, o))));
  }
  connectedCallback() {
    n(this, u).observe(n(this, o));
  }
  disconnectedCallback() {
    clearTimeout(n(this, v)), n(this, u).disconnect();
  }
};
E = /* @__PURE__ */ new WeakMap();
y = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakMap();
O = /* @__PURE__ */ new WeakMap();
C = /* @__PURE__ */ new WeakSet();
W = function() {
  this.dispatchEvent(
    new CustomEvent("selectToggle", {
      bubbles: !0,
      composed: !0,
      detail: {
        opened: n(this, p)
      }
    })
  );
};
b.formAssociated = !0;
b = se([
  P("e-select")
], b);
var w;
class Z extends Y {
  constructor() {
    super(...arguments);
    G(this, w, null);
  }
  get selectElement() {
    return H(this, w);
  }
  connectedCallback() {
    var i, a;
    const s = (a = (i = this.assignedSlot) == null ? void 0 : i.getRootNode()) == null ? void 0 : a.host;
    s ? R(this, w, s) : console.log(this, "e-select not found");
  }
}
w = new WeakMap();
var ae = Object.defineProperty, ne = Object.getOwnPropertyDescriptor, re = (e, t, s, i) => {
  for (var a = i > 1 ? void 0 : i ? ne(t, s) : t, r = e.length - 1, l; r >= 0; r--)
    (l = e[r]) && (a = (i ? l(t, s, a) : l(a)) || a);
  return i && a && ae(t, s, a), a;
}, J = (e, t, s) => {
  if (!t.has(e))
    throw TypeError("Cannot " + s);
}, $ = (e, t, s) => (J(e, t, "read from private field"), s ? s.call(e) : t.get(e)), F = (e, t, s) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, s);
}, K = (e, t, s) => (J(e, t, "access private method"), s), f, S, M;
const le = z({
  ":host": {
    width: "100%",
    height: m.heightInput.var,
    display: "inline-flex",
    alignItems: "center"
  }
});
let N = class extends Z {
  constructor() {
    super(), F(this, S), F(this, f, () => {
      this.selectElement.value === this.value ? this.style.display = "none" : this.style.display = "";
    }), D && (this.openShadow(le), x(this, {
      tabIndex: "0",
      onClick: () => {
        K(this, S, M).call(this);
      },
      onKeydown: (e) => {
        e.code === "Space" && K(this, S, M).call(this);
      },
      children: [_()]
    }));
  }
  get value() {
    return (this.hasAttribute("value") ? this.getAttribute("value") : this.innerText) || "";
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("default") && (this.selectElement.value || (this.selectElement.value = this.value)), this.selectElement.addEventListener("change", $(this, f)), setTimeout(() => {
      $(this, f).call(this);
    });
  }
  disconnectedCallback() {
    this.selectElement.removeEventListener("change", $(this, f));
  }
};
f = /* @__PURE__ */ new WeakMap();
S = /* @__PURE__ */ new WeakSet();
M = function() {
  this.selectElement.value = this.value, this.selectElement.close();
};
N = re([
  P("e-select-option")
], N);
const oe = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  viewBox="0 0 24 24"
>
  <path d="m12.37 15.835l6.43-6.63C19.201 8.79 18.958 8 18.43 8H5.57c-.528 0-.771.79-.37 1.205l6.43 6.63c.213.22.527.22.74 0Z" />
</svg>
`;
var he = Object.defineProperty, ce = Object.getOwnPropertyDescriptor, de = (e, t, s, i) => {
  for (var a = i > 1 ? void 0 : i ? ce(t, s) : t, r = e.length - 1, l; r >= 0; r--)
    (l = e[r]) && (a = (i ? l(t, s, a) : l(a)) || a);
  return i && a && he(t, s, a), a;
}, Q = (e, t, s) => {
  if (!t.has(e))
    throw TypeError("Cannot " + s);
}, d = (e, t, s) => (Q(e, t, "read from private field"), s ? s.call(e) : t.get(e)), L = (e, t, s) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, s);
}, pe = (e, t, s, i) => (Q(e, t, "write to private field"), i ? i.call(e, s) : t.set(e, s), s), T, g, k;
const ve = z({
  ":host": {
    width: "100%",
    height: m.heightInput.var,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  ".default-arrow": {
    flexShrink: "0",
    width: "var(--arrow-size, 1em)",
    height: "var(--arrow-size, 1em)",
    fill: `var(--arrow-color, ${m.colorDark.var})`,
    transitionProperty: "transform",
    transitionDuration: `var(--duration, ${m.durationShort.var})`
  },
  ":host(.opened) .default-arrow": {
    transform: "scaleY(-1)"
  }
});
let U = class extends Z {
  constructor() {
    super(), L(this, T, null), L(this, g, () => {
      const t = this.selectElement.shadowRoot.querySelector(
        ".body slot"
      ).assignedElements().find((s) => s.value === this.selectElement.value);
      t && (d(this, T).innerHTML = t.innerHTML);
    }), L(this, k, () => {
      this.classList.toggle("opened", this.selectElement.opened);
    }), D && (this.openShadow(ve), x(this, {
      children: [
        _(),
        _({
          name: "arrow",
          children: x(oe, { class: "default-arrow" })
        })
      ]
    }), this.slot = "head");
  }
  connectedCallback() {
    super.connectedCallback(), pe(this, T, this.querySelector("[data-value-holder]") || this), this.selectElement.addEventListener("change", d(this, g)), d(this, g).call(this), this.selectElement.addEventListener("selectToggle", d(this, k));
  }
  disconnectedCallback() {
    this.selectElement.removeEventListener("change", d(this, g)), this.selectElement.removeEventListener("selectToggle", d(this, k));
  }
};
T = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakMap();
k = /* @__PURE__ */ new WeakMap();
U = de([
  P("e-select-head")
], U);
export {
  b as S,
  oe as a,
  Z as b,
  N as c,
  U as d
};
