var d = (t, s, e) => {
  if (!s.has(t))
    throw TypeError("Cannot " + e);
};
var h = (t, s, e) => (d(t, s, "read from private field"), e ? e.call(t) : s.get(t)), n = (t, s, e) => {
  if (s.has(t))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(t) : s.set(t, e);
}, u = (t, s, e, i) => (d(t, s, "write to private field"), i ? i.call(t, e) : s.set(t, e), e);
var c = (t, s, e) => (d(t, s, "access private method"), e);
import "../Store-Qr3SNOSf.js";
import "../ticker/index.js";
import { e as f, a2 as k, aA as v, ax as b, $ as w } from "../tags-D0kLlFdQ.js";
import { c as x } from "../createStylesheet-BrFGJ8Q7.js";
import { aptechkaTheme as p } from "../theme/index.js";
const y = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path d="m243.33 90.91l-128.41 128.4a16 16 0 0 1-22.63 0l-71.62-72a16 16 0 0 1 0-22.61l24-24a16 16 0 0 1 22.57-.06l36.64 35.27l.11.11l92.73-91.37a16 16 0 0 1 22.58 0l24 23.56a16 16 0 0 1 .03 22.7Z"/></svg>', A = x({
  ":host": {
    position: "relative",
    display: "inline-block",
    width: "30px",
    height: "30px",
    borderRadius: p.borderRadiusSmall.var,
    overflow: "hidden"
  },
  "label, .fake": {
    display: "block"
  },
  "label, .fake, .default": {
    width: "100%",
    height: "100%"
  },
  ".real": {
    position: "absolute",
    top: "0",
    left: "0",
    width: "0px",
    height: "0px",
    visibility: "hidden",
    margin: "0"
  },
  ".default": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: p.colorMainAux.var
  },
  ".default svg": {
    width: "60%",
    height: "60%",
    fill: p.colorFont.var,
    opacity: 0,
    transition: "var(--duration-short)"
  },
  ":host(.checked) .default svg": {
    opacity: 1
  }
});
var a, o, l, r;
const g = class g extends HTMLElement {
  constructor() {
    super();
    n(this, l);
    n(this, a, null);
    n(this, o, void 0);
    this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(A), u(this, o, this.attachInternals()), f(this, {
      children: k({
        children: [
          v({
            class: "fake",
            children: b({
              children: [
                v({
                  class: "default",
                  children: [y]
                })
              ]
            })
          }),
          w({
            ref: (i) => {
              u(this, a, i), i.required = this.hasAttribute("required"), i.value = this.getAttribute("value") || "", i.checked = this.hasAttribute("checked"), i.name = this.getAttribute("name") || "", c(this, l, r).call(this);
            },
            class: "real",
            type: "checkbox",
            onChange: () => {
              c(this, l, r).call(this), this.dispatchEvent(
                new Event("change", {
                  composed: !0
                })
              );
            }
          })
        ]
      })
    });
  }
  get checked() {
    return h(this, a).checked;
  }
  set checked(e) {
    h(this, a).checked = e, c(this, l, r).call(this);
  }
  get value() {
    return h(this, a).value;
  }
  set value(e) {
    h(this, a).value = e, c(this, l, r).call(this);
  }
};
a = new WeakMap(), o = new WeakMap(), l = new WeakSet(), r = function() {
  this.checked ? h(this, o).setFormValue(this.value) : h(this, o).setFormValue(null), this.classList.toggle("checked", this.checked);
}, g.formAssociated = !0;
let m = g;
customElements.get("e-checkbox") || customElements.define("e-checkbox", m);
export {
  m as CheckboxElement
};
