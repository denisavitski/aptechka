var T = (s, i, t) => {
  if (!i.has(s))
    throw TypeError("Cannot " + t);
};
var e = (s, i, t) => (T(s, i, "read from private field"), t ? t.call(s) : i.get(s)), n = (s, i, t) => {
  if (i.has(s))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(s) : i.set(s, t);
}, a = (s, i, t, o) => (T(s, i, "write to private field"), o ? o.call(s, t) : i.set(s, t), t);
var g = (s, i, t) => (T(s, i, "access private method"), t);
import "./Store-Qr3SNOSf.js";
import { i as H } from "./browser-0zX67oeU.js";
import { a as $, d as D } from "./events-CJTUMSLU.js";
import { g as B } from "./style-j2TwriJ_.js";
import "./ticker/index.js";
import { e as S, p as R, ax as v, D as I } from "./tags-D0kLlFdQ.js";
import { c as M } from "./createStylesheet-BrFGJ8Q7.js";
import { aptechkaTheme as q } from "./theme/index.js";
const F = M({
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
    transitionDuration: "var(--duration, var(--duration-short))",
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
var r, c, l, h, d, u, L, f, k;
const A = class A extends HTMLElement {
  constructor() {
    super();
    n(this, f);
    n(this, r, null);
    n(this, c, "");
    n(this, l, null);
    n(this, h, !1);
    n(this, d, void 0);
    n(this, u, null);
    n(this, L, () => {
      $(this);
    });
    H && (this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(F), a(this, r, this.attachInternals()), a(this, u, new ResizeObserver(e(this, L))), S(this, {
      children: [
        R({
          class: "head",
          children: v({ name: "head" }),
          onClick: () => {
            this.opened ? this.close() : this.open();
          }
        }),
        I({
          class: "body",
          style: {
            height: "0px"
          },
          children: I({
            class: "body-inner",
            children: v()
          }),
          ref: (o) => {
            a(this, l, o);
          }
        })
      ]
    }));
  }
  get value() {
    return e(this, c);
  }
  set value(t) {
    a(this, c, t), this.dispatchEvent(
      new Event("change", {
        bubbles: !0,
        composed: !0
      })
    ), e(this, r).setFormValue(e(this, c));
  }
  get internals() {
    return e(this, r);
  }
  get opened() {
    return e(this, h);
  }
  open() {
    clearTimeout(e(this, d)), a(this, h, !0), e(this, l).style.display = "grid", this.classList.add("triggered"), setTimeout(() => {
      this.classList.add("opened"), e(this, l).style.height = e(this, l).scrollHeight + "px", g(this, f, k).call(this);
    }, 0);
  }
  close() {
    a(this, h, !1), e(this, l).style.height = "0px", this.classList.remove("opened"), g(this, f, k).call(this), a(this, d, setTimeout(() => {
      this.classList.remove("triggered"), e(this, l).style.display = "none";
    }, B(e(this, l))));
  }
  connectedCallback() {
    e(this, u).observe(e(this, l));
  }
  disconnectedCallback() {
    clearTimeout(e(this, d)), e(this, u).disconnect();
  }
};
r = new WeakMap(), c = new WeakMap(), l = new WeakMap(), h = new WeakMap(), d = new WeakMap(), u = new WeakMap(), L = new WeakMap(), f = new WeakSet(), k = function() {
  D(this), this.dispatchEvent(
    new CustomEvent("selectToggle", {
      bubbles: !0,
      composed: !0,
      detail: {
        opened: e(this, h)
      }
    })
  );
}, A.formAssociated = !0;
let C = A;
customElements.get("e-select") || customElements.define("e-select", C);
var E;
class O extends HTMLElement {
  constructor() {
    super(...arguments);
    n(this, E, null);
  }
  get selectElement() {
    return e(this, E);
  }
  connectedCallback() {
    var o, x;
    const t = (x = (o = this.assignedSlot) == null ? void 0 : o.getRootNode()) == null ? void 0 : x.host;
    t ? a(this, E, t) : console.log(this, "e-select not found");
  }
}
E = new WeakMap();
const P = M({
  ":host": {
    width: "100%",
    height: "40px",
    display: "inline-flex",
    alignItems: "center"
  }
});
var m, b, z;
class j extends O {
  constructor() {
    super();
    n(this, b);
    n(this, m, () => {
      this.selectElement.value === this.value ? this.style.display = "none" : this.style.display = "";
    });
    H && (this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(P), S(this, {
      tabindex: 0,
      onClick: () => {
        g(this, b, z).call(this);
      },
      onKeydown: (o) => {
        o.code === "Space" && g(this, b, z).call(this);
      },
      children: v()
    }));
  }
  get value() {
    return (this.hasAttribute("value") ? this.getAttribute("value") : this.innerText) || "";
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("default") && (this.selectElement.value || (this.selectElement.value = this.value)), this.selectElement.addEventListener("change", e(this, m)), setTimeout(() => {
      e(this, m).call(this);
    });
  }
  disconnectedCallback() {
    this.selectElement.removeEventListener("change", e(this, m));
  }
}
m = new WeakMap(), b = new WeakSet(), z = function() {
  this.selectElement.value = this.value, this.selectElement.close();
};
customElements.get("e-select-option") || customElements.define("e-select-option", j);
const K = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  viewBox="0 0 24 24"
>
  <path d="m12.37 15.835l6.43-6.63C19.201 8.79 18.958 8 18.43 8H5.57c-.528 0-.771.79-.37 1.205l6.43 6.63c.213.22.527.22.74 0Z" />
</svg>
`, N = M({
  ":host": {
    width: "100%",
    height: "40px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  ".default-arrow": {
    flexShrink: "0",
    width: "var(--arrow-size, 1em)",
    height: "var(--arrow-size, 1em)",
    fill: `var(--arrow-color, ${q.colorMain.var})`,
    transitionProperty: "transform",
    transitionDuration: "var(--duration, var(--duration-short))"
  },
  ":host(.opened) .default-arrow": {
    transform: "scaleY(-1)"
  }
});
var w, p, y;
class U extends O {
  constructor() {
    super();
    n(this, w, null);
    n(this, p, () => {
      const o = this.selectElement.shadowRoot.querySelector(
        ".body slot"
      ).assignedElements().find((x) => x.value === this.selectElement.value);
      o && (e(this, w).innerHTML = o.innerHTML);
    });
    n(this, y, () => {
      this.classList.toggle("opened", this.selectElement.opened);
    });
    H && (this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(N), S(this, {
      children: [
        v(),
        v({
          name: "arrow",
          children: S(K, { class: "default-arrow" })
        })
      ]
    }), this.slot = "head");
  }
  connectedCallback() {
    super.connectedCallback(), a(this, w, this.querySelector("[data-value-holder]") || this), this.selectElement.addEventListener("change", e(this, p)), e(this, p).call(this), this.selectElement.addEventListener("selectToggle", e(this, y));
  }
  disconnectedCallback() {
    this.selectElement.removeEventListener("change", e(this, p)), this.selectElement.removeEventListener("selectToggle", e(this, y));
  }
}
w = new WeakMap(), p = new WeakMap(), y = new WeakMap();
customElements.get("e-select-head") || customElements.define("e-select-head", U);
export {
  C as S,
  K as a,
  O as b,
  j as c,
  U as d
};
