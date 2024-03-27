import { define as g } from "../custom-element/index.js";
import "../Store-JOKrNVEr.js";
import { i as w } from "../browser-0zX67oeU.js";
import { e as d, D as f, ax as u, aA as _ } from "../tags-C2jg1zYB.js";
import { c as y } from "../createStylesheet-CD11E4C8.js";
import { PopoverElement as C } from "../popover/index.js";
import { aptechkaTheme as h } from "../theme/index.js";
var k = Object.defineProperty, x = Object.getOwnPropertyDescriptor, z = (t, e, o, r) => {
  for (var n = r > 1 ? void 0 : r ? x(e, o) : e, l = t.length - 1, c; l >= 0; l--)
    (c = t[l]) && (n = (r ? c(e, o, n) : c(n)) || n);
  return r && n && k(e, o, n), n;
}, b = (t, e, o) => {
  if (!e.has(t))
    throw TypeError("Cannot " + o);
}, a = (t, e, o) => (b(t, e, "read from private field"), o ? o.call(t) : e.get(t)), p = (t, e, o) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, o);
}, v = (t, e, o, r) => (b(t, e, "write to private field"), r ? r.call(t, o) : e.set(t, o), o), s, i;
const P = y({
  ":host": {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "1",
    width: "100%",
    height: "100%",
    transitionProperty: "opacity",
    transitionDuration: h.durationShort.var
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
    top: "var(---close-button-top, 0.5em)",
    right: "var(---close-button-right, 0.5em)",
    background: "none",
    border: "none",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit"
  },
  ".close-button-default": {
    width: "var(---close-button-size, 1.5em)",
    height: "var(---close-button-size, 1.5em)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transitionProperty: "transform",
    transitionDuration: h.durationShort.var,
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
    width: "var(---close-button-thickness, 0.1em)",
    height: "100%",
    backgroundColor: `var(--close-button-color, ${h.colorDark.var})`
  },
  ".close-button-default::before": {
    transform: "rotate(-45deg)"
  },
  ".close-button-default::after": {
    transform: "rotate(45deg)"
  }
});
let m = class extends C {
  constructor() {
    super(), p(this, s, null), p(this, i, null), w && (this.openShadow(P), d(this, {
      children: f({
        class: "inner",
        outside: !0,
        children: f({
          class: "content",
          children: [
            d("e-popover-button", {
              type: "close",
              target: this.id,
              class: "close-button",
              children: [
                u({
                  name: "close-button",
                  children: _({ class: "close-button-default" })
                })
              ]
            }),
            u()
          ]
        }),
        ref: (t) => v(this, i, t)
      })
    }), v(this, s, new ResizeObserver(() => {
      a(this, i).scrollHeight > a(this, i).clientHeight ? this.classList.add("overflow") : this.classList.remove("overflow");
    })));
  }
  connectedCallback() {
    super.connectedCallback(), a(this, s).observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), a(this, s).disconnect();
  }
};
s = /* @__PURE__ */ new WeakMap();
i = /* @__PURE__ */ new WeakMap();
m = z([
  g("e-modal")
], m);
export {
  m as ModalElement
};
