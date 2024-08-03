var c = (t, e, o) => {
  if (!e.has(t))
    throw TypeError("Cannot " + o);
};
var i = (t, e, o) => (c(t, e, "read from private field"), o ? o.call(t) : e.get(t)), a = (t, e, o) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, o);
}, l = (t, e, o, r) => (c(t, e, "write to private field"), r ? r.call(t, o) : e.set(t, o), o);
import "../Store-Qr3SNOSf.js";
import { i as f } from "../browser-0zX67oeU.js";
import "../ticker/index.js";
import { e as d, D as h, ax as u, aA as m } from "../tags-D0kLlFdQ.js";
import { c as b } from "../createStylesheet-BrFGJ8Q7.js";
import { PopoverElement as p } from "../popover/index.js";
import { aptechkaTheme as v } from "../theme/index.js";
const g = b({
  ":host": {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "1",
    width: "100%",
    height: "100%",
    transitionProperty: "opacity",
    transitionDuration: "var(--transition-duration)"
  },
  ":host::before": {
    content: '""',
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "-1",
    width: "100%",
    height: "100%",
    backgroundColor: "var(--backdrop, rgba(0, 0, 0, 0.8))"
  },
  ".inner": {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden auto"
  },
  ".overflow .inner": {
    alignItems: "flex-start"
  },
  ".content": {
    position: "relative"
  },
  ".close-button": {
    position: "absolute",
    zIndex: "1",
    top: "var(--close-button-top, 0.5em)",
    right: "var(--close-button-right, 0.5em)",
    background: "none",
    border: "none",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit"
  },
  ".close-button-default": {
    width: "var(--close-button-size, 1.5em)",
    height: "var(--close-button-size, 1.5em)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transitionProperty: "transform",
    transitionDuration: "var(--transition-duration)",
    willChange: "transform"
  },
  ".close-button:hover .close-button-default": {
    transform: "scale(0.9)"
  },
  ".close-button:active .close-button-default": {
    transform: "scale(0.7)"
  },
  ".close-button-default::before, .close-button-default::after": {
    content: '""',
    position: "absolute",
    width: "var(--close-button-thickness, 0.1em)",
    height: "100%",
    backgroundColor: `var(--close-button-color, ${v.colorMain.var})`
  },
  ".close-button-default::before": {
    transform: "rotate(-45deg)"
  },
  ".close-button-default::after": {
    transform: "rotate(45deg)"
  }
});
var n, s;
class w extends p {
  constructor() {
    super();
    a(this, n, null);
    a(this, s, null);
    f && (this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(g), d(this, {
      children: h({
        class: "inner",
        outside: !0,
        children: h({
          class: "content",
          children: [
            d("e-popover-button", {
              type: "close",
              target: this.id,
              class: "close-button",
              lightChildren: [
                u({
                  name: "close-button",
                  children: m({ class: "close-button-default" })
                })
              ]
            }),
            u()
          ]
        }),
        ref: (r) => l(this, s, r)
      })
    }), l(this, n, new ResizeObserver(() => {
      i(this, s).scrollHeight > i(this, s).clientHeight ? this.classList.add("overflow") : this.classList.remove("overflow");
    })));
  }
  connectedCallback() {
    super.connectedCallback(), i(this, n).observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), i(this, n).disconnect();
  }
}
n = new WeakMap(), s = new WeakMap();
customElements.get("e-modal") || customElements.define("e-modal", w);
export {
  w as ModalElement
};
