var ve = (l, r, e) => {
  if (!r.has(l))
    throw TypeError("Cannot " + e);
};
var t = (l, r, e) => (ve(l, r, "read from private field"), e ? e.call(l) : r.get(l)), o = (l, r, e) => {
  if (r.has(l))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(l) : r.set(l, e);
}, n = (l, r, e, s) => (ve(l, r, "write to private field"), s ? s.call(l, e) : r.set(l, e), e);
var m = (l, r, e) => (ve(l, r, "access private method"), e);
import { i as Je } from "../browser-0zX67oeU.js";
import { s as R, a as $, S as Ce } from "../Store-Qr3SNOSf.js";
import { c as We } from "../file-lxi_oXJf.js";
import { d as Xe } from "../function-C10DGppn.js";
import { s as Te } from "../gestures-D2Fdra_G.js";
import "../ticker/index.js";
import { e as g, a0 as me, a as Ye, D as u, aB as qe, p as W, a3 as Ge } from "../tags-wG5k157g.js";
import { c as E } from "../createStylesheet-DNG2b5X4.js";
import { a as Qe } from "../Viewport-Cgtq2I_K.js";
import { aptechkaTheme as h } from "../theme/index.js";
import { a as Ue } from "../index-BuvwT3dS.js";
import { a as _e } from "../events-CJTUMSLU.js";
import "../checkbox/index.js";
import { c as et } from "../math-BOBiC4TN.js";
import { n as ze, t as tt } from "../polyfills-X6KXuHg-.js";
import { elementResizer as Re } from "../element-resizer/index.js";
const Fe = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M20.536 3.464C19.07 2 16.714 2 12 2C7.286 2 4.929 2 3.464 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536M16.75 12a.75.75 0 0 1-.75.75H9.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 1 1 1.06 1.06l-1.72 1.72H16a.75.75 0 0 1 .75.75" clip-rule="evenodd"/></svg>', Me = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M15.24 2h-3.894c-1.764 0-3.162 0-4.255.148c-1.126.152-2.037.472-2.755 1.193c-.719.721-1.038 1.636-1.189 2.766C3 7.205 3 8.608 3 10.379v5.838c0 1.508.92 2.8 2.227 3.342c-.067-.91-.067-2.185-.067-3.247v-5.01c0-1.281 0-2.386.118-3.27c.127-.948.413-1.856 1.147-2.593c.734-.737 1.639-1.024 2.583-1.152c.88-.118 1.98-.118 3.257-.118h3.07c1.276 0 2.374 0 3.255.118A3.601 3.601 0 0 0 15.24 2Z"/><path  d="M6.6 11.397c0-2.726 0-4.089.844-4.936c.843-.847 2.2-.847 4.916-.847h2.88c2.715 0 4.073 0 4.917.847c.843.847.843 2.21.843 4.936v4.82c0 2.726 0 4.089-.843 4.936c-.844.847-2.202.847-4.917.847h-2.88c-2.715 0-4.073 0-4.916-.847c-.844-.847-.844-2.21-.844-4.936v-4.82Z"/></svg>', st = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Zm10-5.75a.75.75 0 0 1 .75.75v5.19l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V7a.75.75 0 0 1 .75-.75Zm-4 10a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5H8Z" clip-rule="evenodd"/></svg>', it = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Zm10 5.75a.75.75 0 0 0 .75-.75v-5.19l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72V17c0 .414.336.75.75.75Zm-4-10a.75.75 0 0 1 0-1.5h8a.75.75 0 0 1 0 1.5H8Z" clip-rule="evenodd"/></svg>';
var P, w, k;
class rt {
  constructor() {
    o(this, P, void 0);
    o(this, w, void 0);
    o(this, k, void 0);
    this.scrollValue = 0, n(this, P, ""), n(this, w, []), n(this, k, {}), n(this, P, R.projectName + "-studio");
  }
  openPanel(r) {
    t(this, w).includes(r) || t(this, w).push(r);
  }
  closePanel(r) {
    n(this, w, t(this, w).filter((e) => e !== r));
  }
  isPanelOpened(r) {
    return t(this, w).includes(r);
  }
  changedSizes(r) {
    return t(this, k)[r];
  }
  changeSize(r, e) {
    e ? t(this, k)[r] = e : delete t(this, k)[r];
  }
  save() {
    const r = {
      openedPanels: t(this, w),
      changedSizes: t(this, k),
      scrollValue: this.scrollValue
    };
    localStorage.setItem(t(this, P), JSON.stringify(r)), R.saveState();
  }
  load() {
    R.loadState();
    const r = localStorage.getItem(t(this, P));
    if (r)
      try {
        const e = JSON.parse(r);
        e.openedPanels && n(this, w, e.openedPanels), e.changedSizes && n(this, k, e.changedSizes), e.scrollValue && (this.scrollValue = e.scrollValue);
      } catch (e) {
        console.error(e);
      }
  }
}
P = new WeakMap(), w = new WeakMap(), k = new WeakMap();
const f = new rt();
var T;
class B extends HTMLElement {
  constructor(...e) {
    super();
    o(this, T, void 0);
    n(this, T, e);
  }
  addStore(e) {
    t(this, T).push(e);
  }
  get firstStore() {
    return t(this, T)[0];
  }
  get stores() {
    return t(this, T);
  }
  updateStores(e) {
    t(this, T).forEach((s) => {
      s.current = e;
    });
  }
}
T = new WeakMap();
const ot = E({
  ":host": {
    width: "100%",
    display: "inline-flex",
    height: "max-content"
  },
  "e-checkbox": {
    "--size": "calc(var(--height-input) * 0.8)",
    width: "var(--size)",
    height: "var(--size)",
    borderRadius: h.borderRadiusSmall.var
  }
});
class Le extends B {
  constructor(...r) {
    super(...r), this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(ot), g(this, {
      children: [
        g("e-checkbox", {
          onChange: (s) => {
            this.updateStores(s.currentTarget.checked);
          },
          ref: (s) => {
            this.firstStore.subscribe((i) => {
              s.checked = i.current;
            });
          }
        })
      ]
    });
  }
}
customElements.get("e-tweaker-boolean-manager") || customElements.define(
  "e-tweaker-boolean-manager",
  Le
);
const nt = E({
  ":host": {
    width: "100%",
    display: "inline-flex",
    height: "max-content"
  },
  input: {
    width: "100%",
    height: "var(--height-input)",
    padding: "0",
    background: "none",
    borderRadius: h.borderRadius.var,
    border: "none",
    blockSize: "unset"
  },
  "input::-webkit-color-swatch, input::-webkit-color-swatch-wrapper": {
    boxSizing: "border-box",
    padding: "0px",
    border: "none",
    borderRadius: h.borderRadius.var,
    height: "calc(var(--height-input) * 0.93)"
  }
});
class Pe extends B {
  constructor(...r) {
    super(...r), this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(nt), g(this, {
      children: [
        me({
          type: "color",
          value: this.firstStore,
          onInput: (s) => {
            this.updateStores(s.currentTarget.value);
          }
        })
      ]
    });
  }
}
customElements.get("e-tweaker-color-manager") || customElements.define("e-tweaker-color-manager", Pe);
const at = E({
  a: {
    color: "inherit",
    fontSize: "var(--font-size-small)"
  }
});
class Ie extends B {
  constructor(...r) {
    var s, i;
    super(...r), this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(at), console.log(this.firstStore), g(this, {
      children: [
        Ye({
          href: this.firstStore,
          target: (i = (s = this.firstStore.passport) == null ? void 0 : s.manager) != null && i.sameWindow ? "_self" : "_blank",
          children: this.firstStore
        })
      ]
    });
  }
}
customElements.get("e-tweaker-link-manager") || customElements.define("e-tweaker-link-manager", Ie);
const lt = E({
  ":host": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "var(--gap-small)"
  },
  ".inputs-wrapper": {
    display: "grid",
    gap: "var(--gap-small)",
    width: "100%"
  },
  input: {
    boxSizing: "border-box",
    outline: "none",
    fontVariantNumeric: "tabular-nums",
    fontFamily: "inherit",
    color: "inherit",
    border: "none",
    fontSize: "var(--font-size-small)",
    width: "100%",
    height: "var(--height-input)",
    margin: "0",
    padding: "0 var(--gap-small)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: h.borderRadius.var
  },
  ".drag": {
    position: "relative",
    width: "100%",
    height: "calc(var(--height-input) * 0.2)",
    display: "flex",
    alignItems: "center"
  },
  ".drag::before": {
    content: '""',
    position: "absolute",
    left: "0",
    width: "100%",
    zIndex: "-1",
    height: "1px",
    borderBottom: `1px solid ${h.colorFont.var}`,
    transform: "translateY(-50%)",
    opacity: "0.3"
  },
  ":host(.infinite) .drag::before": {
    borderBottom: `1px dashed ${h.colorFont.var}`
  },
  ".drag-knob": {
    "--size": "calc(var(--height-input) * 0.4)",
    width: "var(--size)",
    height: "var(--size)"
  },
  ".drag-knob-inner": {
    width: "100%",
    height: "100%",
    backgroundColor: h.colorFont.var,
    borderRadius: h.borderRadiusSmall.var,
    transition: "opacity var(--duration-short)"
  },
  ":host(.infinite) .grabbing .drag-knob-inner": {
    opacity: 0.3
  }
});
var I, A, D, x, F, X, Y, y, V, q, G, M, N, Q, Se, U, ye, H, ce, _;
class Ve extends B {
  constructor(...e) {
    var i, a, d, c, S, L, J, xe;
    super(...e);
    o(this, M);
    o(this, Q);
    o(this, U);
    o(this, H);
    o(this, I, []);
    o(this, A, []);
    o(this, D, void 0);
    o(this, x, void 0);
    o(this, F, void 0);
    o(this, X, void 0);
    o(this, Y, void 0);
    o(this, y, void 0);
    o(this, V, !1);
    o(this, q, (e) => {
      const s = m(this, M, N).call(this, e);
      return s.map((i, a) => {
        const d = typeof i == "string" ? parseFloat(i) || t(this, x) : i, c = et(d, t(this, x), t(this, F)), S = tt(c, t(this, D));
        s[a] = S;
      }), t(this, Y) === "number" ? s[0] : s;
    });
    o(this, G, () => {
      m(this, M, N).call(this).map((e, s) => {
        const i = t(this, I)[s];
        i && (i.value = (e || 0).toString());
      }), m(this, Q, Se).call(this);
    });
    o(this, _, () => {
      m(this, Q, Se).call(this);
    });
    this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(lt), n(this, x, ze(
      (a = (i = this.firstStore.passport) == null ? void 0 : i.manager) == null ? void 0 : a.min,
      -1 / 0
    )), n(this, F, ze(
      (c = (d = this.firstStore.passport) == null ? void 0 : d.manager) == null ? void 0 : c.max,
      1 / 0
    )), n(this, D, ((L = (S = this.firstStore.passport) == null ? void 0 : S.manager) == null ? void 0 : L.step) || 0.01), n(this, X, ((xe = (J = this.firstStore.passport) == null ? void 0 : J.manager) == null ? void 0 : xe.ease) || 1), n(this, Y, Array.isArray(this.firstStore.current) ? "array" : "number"), n(this, y, isFinite(t(this, F)) && isFinite(t(this, x))), g(this, {
      class: t(this, y) ? "" : "infinite",
      children: m(this, M, N).call(this).map((De, de) => u({
        class: "inputs-wrapper",
        children: [
          me({
            type: "number",
            step: t(this, D),
            min: t(this, x),
            max: t(this, F),
            ref: (C) => t(this, I).push(C),
            value: De,
            onChange: () => {
              this.updateStores(
                t(this, I).map((C) => parseFloat(C.value))
              );
            }
          }),
          u({
            class: "drag",
            children: [
              u({
                class: "drag-knob",
                ref: (C) => t(this, A).push(C),
                onPointerdown: (C) => {
                  C.preventDefault(), n(this, V, !0);
                  const fe = m(this, M, N).call(this), He = fe[de], z = t(this, A)[de], Ke = t(this, I)[de];
                  if (z && Ke) {
                    const we = z.parentElement, Oe = m(this, U, ye).call(this);
                    we.classList.add("grabbing"), Te(
                      (be) => {
                        const Ee = be.x - C.x, Ze = t(this, y) ? we.offsetWidth / (Oe || 1) : 1, je = He + Ee / Ze * t(this, X);
                        if (fe[de] = je, !t(this, y)) {
                          const Be = m(this, H, ce).call(this, z, 0);
                          z.style.transform = `translateX(${Be + Ee}px)`;
                        }
                        this.updateStores([...fe]);
                      },
                      () => {
                        if (n(this, V, !1), !t(this, y)) {
                          const be = m(this, H, ce).call(this, z, 0);
                          z.style.transition = "transform 0.1s", z.style.transform = `translateX(${be}px)`, we.classList.remove("grabbing"), setTimeout(() => {
                            z.style.transition = "";
                          }, 100);
                        }
                      }
                    );
                  }
                },
                children: u({
                  class: "drag-knob-inner"
                })
              })
            ]
          })
        ]
      }))
    });
  }
  connectedCallback() {
    this.firstStore.addMiddleware(t(this, q)), this.firstStore.subscribe(t(this, G)), Re.subscribe(this, t(this, _));
  }
  disconnectedCallback() {
    this.firstStore.removeMiddleware(t(this, q)), this.firstStore.unsubscribe(t(this, G)), Re.unsubscribe(t(this, _));
  }
}
I = new WeakMap(), A = new WeakMap(), D = new WeakMap(), x = new WeakMap(), F = new WeakMap(), X = new WeakMap(), Y = new WeakMap(), y = new WeakMap(), V = new WeakMap(), q = new WeakMap(), G = new WeakMap(), M = new WeakSet(), N = function(e = this.firstStore.current) {
  return Array.isArray(e) ? e : [e];
}, Q = new WeakSet(), Se = function() {
  m(this, M, N).call(this).map((e, s) => {
    const i = t(this, A)[s];
    if (i && (!t(this, V) || t(this, V) && t(this, y))) {
      const a = m(this, H, ce).call(this, i, e);
      i.style.transform = `translateX(${a}px)`;
    }
  });
}, U = new WeakSet(), ye = function() {
  return t(this, y) ? t(this, F) - t(this, x) : 0;
}, H = new WeakSet(), ce = function(e, s) {
  const i = e.parentElement, a = m(this, U, ye).call(this), d = a ? s / a : 0.5;
  return (i.offsetWidth - e.offsetWidth) * d;
}, _ = new WeakMap();
customElements.get("e-tweaker-number-manager") || customElements.define("e-tweaker-number-manager", Ve);
const ht = E({
  "e-select": {
    display: "block",
    width: "100%",
    "--arrow-color": h.colorFont.var
  },
  "e-select-head": {
    width: "100%",
    height: "var(--height-input)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "var(--font-size-small)"
  },
  "e-select-option": {
    height: "var(--height-input)",
    transitionDuration: "var(--duration-short)",
    transitionProperty: "color",
    fontSize: "var(--font-size-small)"
  },
  "e-select-option:hover": {
    color: h.colorActive.var
  },
  svg: {
    width: "16px",
    height: "16px",
    fill: h.colorFont.var,
    transitionProperty: "transform",
    transitionDuration: "var(--duration-short)"
  },
  ".opened svg": {
    transform: "scaleY(-1)"
  }
});
class Ne extends B {
  constructor(...r) {
    var i, a;
    super(...r), this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(ht);
    const s = ((a = (i = this.firstStore.passport) == null ? void 0 : i.manager) == null ? void 0 : a.variants) || [];
    g(this, {
      children: g("e-select", {
        value: this.firstStore,
        onChange: (d) => {
          this.updateStores(d.currentTarget.value);
        },
        lightChildren: [
          g("e-select-head", {
            lightChildren: [
              qe({
                "data-value-holder": ""
              })
            ]
          }),
          ...s.map(
            (d, c) => g("e-select-option", {
              lightChildren: d,
              default: c === 0 ? !0 : null
            })
          )
        ]
      })
    });
  }
}
customElements.get("e-tweaker-select-manager") || customElements.define("e-tweaker-select-manager", Ne);
const dt = E({
  ":host": {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  input: {
    boxSizing: "border-box",
    outline: "none",
    fontVariantNumeric: "tabular-nums",
    fontFamily: "inherit",
    color: "inherit",
    border: "none",
    fontSize: "var(--font-size-small)",
    height: "var(--height-input)",
    width: "100%",
    margin: "0",
    padding: "0 var(--gap-small)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: h.borderRadius.var
  }
});
class $e extends B {
  constructor(...r) {
    super(...r), this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(dt), g(this, {
      children: [
        me({
          class: "text-input",
          type: "string",
          value: this.firstStore,
          onChange: (s) => {
            this.updateStores(
              s.currentTarget.value
            );
          }
        })
      ]
    });
  }
}
customElements.get("e-tweaker-string-manager") || customElements.define("e-tweaker-string-manager", $e);
const ct = {
  boolean: Le,
  color: Pe,
  link: Ie,
  number: Ve,
  select: Ne,
  string: $e
}, pt = E({
  ":host": {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "0.5fr 1fr",
    alignItems: "center",
    color: h.colorFont.var,
    gap: "var(--gap-medium)"
  },
  ":host(.disabled)": {
    pointerEvents: "none",
    opacity: 0.5
  },
  ".head": {
    fontSize: "var(--font-size-medium)",
    display: "flex",
    alignItems: "center",
    gap: "var(--gap-extra-small)"
  },
  ".head-buttons": {
    display: "flex"
  },
  ".head-button": {
    width: "14px",
    height: "14px",
    padding: "0",
    margin: "0",
    border: "none",
    background: "none",
    fill: h.colorFont.var,
    transitionDuration: "var(--duration-short)",
    transitionProperty: "fill, opacity",
    opacity: "0"
  },
  ":host(:hover) .head-button": {
    opacity: "1"
  },
  ".head-button:hover": {
    fill: h.colorActive.var
  },
  ".head-button svg": {
    width: "100%",
    height: "100%"
  }
});
var b, K, O, Z, j, ee, te;
class ke extends HTMLElement {
  constructor(e) {
    var a, d, c, S;
    super();
    o(this, b, []);
    o(this, K, void 0);
    o(this, O, void 0);
    o(this, Z, !1);
    o(this, j, void 0);
    o(this, ee, () => {
      $.current.find((e) => t(this, b).includes(e)) || this.remove();
    });
    o(this, te, (e) => {
      t(this, Z) && ((e.metaKey || e.ctrlKey) && e.code === "KeyC" ? navigator.clipboard.writeText(t(this, b)[0].current) : (e.metaKey || e.ctrlKey) && e.code === "KeyR" && (t(this, b).forEach((s) => {
        s.reset();
      }), e.preventDefault()));
    });
    n(this, b, [e.store]), n(this, K, e.store.passport.name), n(this, O, t(this, K).split(".").slice(-1).toString());
    const s = ((d = (a = e.store.passport) == null ? void 0 : a.manager) == null ? void 0 : d.type) || "string";
    n(this, j, new ct[s](t(this, b)[0])), this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(pt), g(this, {
      class: {
        disabled: ((S = (c = e.store.passport) == null ? void 0 : c.manager) == null ? void 0 : S.disabled) || !1
      },
      onPointerleave: () => {
        n(this, Z, !1);
      },
      onPointerenter: () => {
        n(this, Z, !0);
      },
      children: [
        u({
          class: "head",
          children: [
            u({ class: "name", children: t(this, O) + ":" }),
            u({
              class: "head-buttons",
              children: [
                W({
                  class: "head-button",
                  children: Me,
                  onClick: () => {
                    navigator.clipboard.writeText(t(this, b)[0].current);
                  }
                }),
                W({
                  class: "head-button",
                  children: Fe,
                  onClick: () => {
                    t(this, b).forEach((L) => {
                      L.reset();
                    });
                  }
                })
              ]
            })
          ]
        }),
        t(this, j)
      ]
    });
  }
  get key() {
    return t(this, K);
  }
  get name() {
    return t(this, O);
  }
  get stores() {
    return t(this, b);
  }
  addStore(e) {
    t(this, j).addStore(e);
  }
  connectedCallback() {
    $.subscribe(t(this, ee)), addEventListener("keydown", t(this, te)), _e(this);
  }
  disconnectedCallback() {
    $.unsubscribe(t(this, ee)), removeEventListener("keydown", t(this, te));
  }
}
b = new WeakMap(), K = new WeakMap(), O = new WeakMap(), Z = new WeakMap(), j = new WeakMap(), ee = new WeakMap(), te = new WeakMap();
customElements.get("e-tweaker-field") || customElements.define("e-tweaker-field", ke);
const ut = E({
  ".wrapper": {
    boxSizing: "border-box",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: h.borderRadius.var
  },
  ".head": {
    boxSizing: "border-box",
    width: "100%",
    height: "var(--tweaker-folder-height)",
    paddingLeft: "var(--gap-medium)",
    paddingRight: "var(--gap-medium)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: h.colorMainAux.var,
    borderRadius: h.borderRadius.var
  },
  ".name": {
    fontSize: "var(--font-size-large)",
    color: h.colorFont.var
  },
  ".body": {
    display: "none",
    overflow: "hidden",
    "@supports (height: calc-size(auto))": {
      height: "0"
    }
  },
  ":host(.transition-allowed) .body": {
    transition: "height var(--duration-short), display var(--duration-short) allow-discrete"
  },
  ":host(.opened) .body": {
    height: "calc-size(auto)",
    display: "block",
    "@starting-style": {
      height: "0"
    }
  },
  ".body-content": {
    boxSizing: "border-box",
    padding: "var(--gap-large)",
    display: "grid",
    gap: "var(--gap-medium)"
  },
  ".arrow": {
    width: "20px",
    height: "20px",
    fill: h.colorFont.var,
    transition: "transform var(--duration-short)"
  },
  ".opened .arrow": {
    transform: "scaleY(-1)"
  }
});
var v, se, p, ie, re, oe, ne, ue;
const ge = class ge extends HTMLElement {
  constructor(e) {
    super();
    o(this, v, void 0);
    o(this, se, new Ce(null));
    o(this, p, new Ce([]));
    o(this, ie, void 0);
    o(this, re, null);
    o(this, oe, null);
    o(this, ne, null);
    o(this, ue, (e) => {
      let s = [], i = [];
      e.forEach((a) => {
        s = [...s, ...a.removedNodes], i = [...i, ...a.addedNodes];
      }), t(this, p).current = t(this, p).current.filter(
        (a) => !s.includes(a)
      ), t(this, v) && !t(this, p).current.length && !i.length && this.remove();
    });
    this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(ut), n(this, v, e.key), n(this, ie, new MutationObserver(t(this, ue))), g(this, {
      children: [
        u({
          class: "wrapper",
          children: [
            u({
              class: "head",
              onClick: (i) => {
                this.classList.toggle("opened"), this.classList.contains("opened") ? f.openPanel(t(this, v)) : f.closePanel(t(this, v));
              },
              children: [
                t(this, v) ? u({
                  class: "name",
                  children: [t(this, v).split(".").slice(-1).toString()]
                }) : null,
                t(this, se),
                g(Ue, {
                  class: "arrow"
                })
              ]
            }),
            u({
              class: "body",
              ref: (i) => {
                n(this, re, i);
              },
              children: u({
                class: "body-content",
                children: t(this, p),
                ref: (i) => {
                  n(this, oe, i), n(this, ne, i.firstElementChild);
                }
              })
            })
          ]
        })
      ]
    }), e != null && e.storeBox && this.handleStore(e.storeBox);
  }
  get key() {
    return t(this, v);
  }
  get head() {
    return t(this, se);
  }
  get content() {
    return t(this, p);
  }
  get bodyElement() {
    return t(this, re);
  }
  get contentElement() {
    return t(this, oe);
  }
  connectedCallback() {
    f.isPanelOpened(t(this, v)) && this.classList.add("opened"), setTimeout(() => {
      this.classList.add("transition-allowed");
    }), t(this, ie).observe(t(this, ne), {
      childList: !0
    });
  }
  handleStore(e) {
    if (e.remainingFolders.length) {
      const i = e.store.passport.name.split("."), a = i.slice(0, i.length - e.remainingFolders.length).join("."), d = t(this, p).current.find((c) => c.key === a);
      d instanceof ge ? d.handleStore({
        store: e.store,
        remainingFolders: e.remainingFolders.slice(1)
      }) : t(this, p).current = [
        ...t(this, p).current,
        new ge({
          key: a,
          storeBox: {
            store: e.store,
            remainingFolders: e.remainingFolders.slice(1)
          }
        })
      ];
    } else {
      const s = t(this, p).current.find(
        (i) => i.key === e.store.passport.name
      );
      s instanceof ke ? s.addStore(e.store) : t(this, p).current = [
        ...t(this, p).current,
        new ke({
          store: e.store
        })
      ];
    }
  }
};
v = new WeakMap(), se = new WeakMap(), p = new WeakMap(), ie = new WeakMap(), re = new WeakMap(), oe = new WeakMap(), ne = new WeakMap(), ue = new WeakMap();
let pe = ge;
customElements.get("e-tweaker-folder") || customElements.define("e-tweaker-folder", pe);
const gt = E({
  ":host": {
    "--tweaker-width": "550px",
    "--tweaker-offset": "20px",
    "--tweaker-folder-height": "35px",
    "--height-input": "25px",
    "--gap-large": "12px",
    "--gap-medium": "10px",
    "--gap-small": "8px",
    "--gap-extra-small": "4px",
    "--font-size-large": "16px",
    "--font-size-medium": "14px",
    "--font-size-small": "12px",
    "--duration-short": "0.2s",
    fontFamily: "sans-serif",
    position: "absolute",
    top: "var(--tweaker-offset)",
    right: "var(--tweaker-offset)",
    width: "var(--tweaker-width)",
    backgroundColor: h.colorMain.var,
    borderRadius: h.borderRadius.var,
    transition: "opacity 0.1s",
    zIndex: "100",
    opacity: "0.1"
  },
  ":host(:hover)": {
    opacity: "1 !important"
  },
  ".resize": {
    position: "absolute",
    left: "0",
    top: "0",
    width: "calc(var(--tweaker-width) * 0.025)",
    height: "100%",
    zIndex: "1",
    cursor: "ew-resize"
  },
  ".tweaker-buttons": {
    display: "flex",
    alignItems: "center",
    gap: "var(--gap-extra-small)"
  },
  ".tweaker-button": {
    width: "18px",
    height: "18px",
    padding: "0",
    margin: "0",
    background: "none",
    border: "none",
    fill: h.colorFont.var,
    transitionProperty: "fill",
    transitionDuration: "var(--duration-short)"
  },
  ".tweaker-button:hover": {
    fill: h.colorActive.var
  },
  ".tweaker-button svg": {
    width: "100%",
    height: "100%"
  },
  ":host .body-content": {
    maxHeight: `calc(
      100dvh - 
      (
        var(--tweaker-offset) * 2 + 
        var(--tweaker-folder-height)
      )
    )`,
    overflow: "hidden auto",
    "-ms-overflow-style": "none",
    "scrollbar-width": "none"
  },
  ":host .body-content::-webkit-scrollbar": {
    display: "none"
  },
  [`@media ${Qe["<=mobile"]}`]: {
    ":host": {
      position: "absolute",
      top: "0",
      right: "0",
      width: "100% !important",
      borderTopLeftRadius: "0",
      borderTopRightRadius: "0"
    },
    ":host .body-content": {
      maxHeight: `calc(
        100dvh - 
        var(--tweaker-folder-height)
      )`
    }
  }
});
var ae, le, he;
class Ae extends pe {
  constructor() {
    super({
      key: ""
    });
    o(this, ae, !1);
    o(this, le, () => {
      f.save();
    });
    o(this, he, Xe(() => {
      $.current.forEach((e) => {
        var s;
        if (e.passport && !((s = e.passport.manager) != null && s.invisible)) {
          const i = e.passport.name.split(".");
          this.handleStore({
            store: e,
            remainingFolders: i.length > 1 ? i.slice(0, -1) : []
          });
        }
      }), t(this, ae) || (n(this, ae, !0), this.contentElement.scroll({
        top: f.scrollValue
      }), this.contentElement.addEventListener("scroll", () => {
        f.scrollValue = this.contentElement.scrollTop;
      }));
    }, 10));
    f.load(), this.shadowRoot.adoptedStyleSheets.push(gt), this.head.current = [
      u({
        class: "tweaker-buttons",
        onClick: (e) => {
          e.stopPropagation();
        },
        children: [
          W({
            class: "tweaker-button",
            children: Fe,
            onClick: () => {
              R.resetState();
            }
          }),
          W({
            class: ["tweaker-button"],
            children: [Me],
            onClick: () => {
              navigator.clipboard.writeText(
                JSON.stringify(R.getState())
              );
            }
          }),
          W({
            class: "tweaker-button",
            children: st,
            onClick: () => {
              We(
                R.projectName,
                R.getState()
              );
            }
          }),
          Ge({
            class: "tweaker-button",
            children: [
              it,
              me({
                type: "file",
                style: {
                  display: "none"
                },
                onChange: (e) => {
                  var a;
                  const i = (a = e.currentTarget.files) == null ? void 0 : a[0];
                  if (i) {
                    const d = new FileReader();
                    d.onload = (c) => {
                      var L, J;
                      const S = (J = (L = c.target) == null ? void 0 : L.result) == null ? void 0 : J.toString();
                      S && R.loadState(S);
                    }, d.readAsText(i);
                  }
                }
              })
            ]
          })
        ]
      })
    ], g(this.bodyElement, {
      children: [
        u({
          class: "resize",
          onPointerdown: (e) => {
            e.preventDefault();
            const s = this.getBoundingClientRect(), i = this.contentElement.scrollTop;
            Te(
              (a) => {
                const d = e.x - a.x, c = Math.max(400, s.width + d);
                this.style.width = c + "px", f.changeSize("tweaker", c);
              },
              () => {
                setTimeout(() => {
                  this.contentElement.scroll({
                    top: i
                  });
                }, 10);
              }
            );
          },
          onDblclick: () => {
            this.style.width = "", f.changeSize("tweaker", null);
          }
        })
      ]
    });
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("beforeunload", t(this, le)), $.subscribe(t(this, he)), f.changedSizes("tweaker") && (this.style.width = f.changedSizes("tweaker") + "px");
  }
  disconnectedCallback() {
    window.removeEventListener("beforeunload", t(this, le)), f.save(), $.unsubscribe(t(this, he));
  }
}
ae = new WeakMap(), le = new WeakMap(), he = new WeakMap();
customElements.get("e-tweaker") || customElements.define("e-tweaker", Ae);
Je && document.body.appendChild(new Ae());
