var ge = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
};
var d = (t, e, r) => (ge(t, e, "read from private field"), r ? r.call(t) : e.get(t)), G = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, M = (t, e, r, n) => (ge(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r);
import { i as ke } from "../browser-0zX67oeU.js";
import { CustomElement as ve, define as u } from "../custom-element/index.js";
import { s as S, S as se, a as $ } from "../Store-JOKrNVEr.js";
import { e as p, $ as N, a as xe, aA as $e, D as m, p as A, a2 as Pe } from "../tags-C2jg1zYB.js";
import { c as w } from "../createStylesheet-CD11E4C8.js";
import { c as Oe } from "../file-lxi_oXJf.js";
import { d as Me } from "../function-C10DGppn.js";
import { a as Ee } from "../Viewport-CXY5xcGJ.js";
import { AccordionElement as Te } from "../accordion/index.js";
import { a as De } from "../index-Dq6GRJ9W.js";
import { d as Re } from "../events-_C2CztxR.js";
import { aptechkaTheme as i } from "../theme/index.js";
import { c as We } from "../math-BOBiC4TN.js";
const me = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M20.536 3.464C19.07 2 16.714 2 12 2C7.286 2 4.929 2 3.464 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536M16.75 12a.75.75 0 0 1-.75.75H9.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 1 1 1.06 1.06l-1.72 1.72H16a.75.75 0 0 1 .75.75" clip-rule="evenodd"/></svg>', _e = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M15.24 2h-3.894c-1.764 0-3.162 0-4.255.148c-1.126.152-2.037.472-2.755 1.193c-.719.721-1.038 1.636-1.189 2.766C3 7.205 3 8.608 3 10.379v5.838c0 1.508.92 2.8 2.227 3.342c-.067-.91-.067-2.185-.067-3.247v-5.01c0-1.281 0-2.386.118-3.27c.127-.948.413-1.856 1.147-2.593c.734-.737 1.639-1.024 2.583-1.152c.88-.118 1.98-.118 3.257-.118h3.07c1.276 0 2.374 0 3.255.118A3.601 3.601 0 0 0 15.24 2Z"/><path  d="M6.6 11.397c0-2.726 0-4.089.844-4.936c.843-.847 2.2-.847 4.916-.847h2.88c2.715 0 4.073 0 4.917.847c.843.847.843 2.21.843 4.936v4.82c0 2.726 0 4.089-.843 4.936c-.844.847-2.202.847-4.917.847h-2.88c-2.715 0-4.073 0-4.916-.847c-.844-.847-.844-2.21-.844-4.936v-4.82Z"/></svg>', Le = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Zm10-5.75a.75.75 0 0 1 .75.75v5.19l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V7a.75.75 0 0 1 .75-.75Zm-4 10a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5H8Z" clip-rule="evenodd"/></svg>', Ie = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Zm10 5.75a.75.75 0 0 0 .75-.75v-5.19l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72V17c0 .414.336.75.75.75Zm-4-10a.75.75 0 0 1 0-1.5h8a.75.75 0 0 1 0 1.5H8Z" clip-rule="evenodd"/></svg>';
var O, f;
class Fe {
  constructor() {
    G(this, O, "");
    G(this, f, []);
    M(this, O, S.projectName + "-studio");
  }
  openPanel(e) {
    d(this, f).includes(e) || d(this, f).push(e);
  }
  closePanel(e) {
    M(this, f, d(this, f).filter((r) => r !== e));
  }
  isPanelOpened(e) {
    return d(this, f).includes(e);
  }
  save() {
    const e = {
      openedPanels: d(this, f)
    };
    localStorage.setItem(d(this, O), JSON.stringify(e)), S.saveState();
  }
  load() {
    S.loadState();
    const e = localStorage.getItem(d(this, O));
    if (e)
      try {
        const r = JSON.parse(e);
        r.openedPanels && M(this, f, r.openedPanels);
      } catch (r) {
        console.error(r);
      }
  }
}
O = new WeakMap(), f = new WeakMap();
const P = new Fe();
var y;
class H extends ve {
  constructor(...r) {
    super();
    G(this, y, void 0);
    M(this, y, r);
  }
  addStore(r) {
    d(this, y).push(r);
  }
  get firstStore() {
    return d(this, y)[0];
  }
  get stores() {
    return d(this, y);
  }
  updateStores(r) {
    d(this, y).forEach((n) => {
      n.current = r;
    });
  }
}
y = new WeakMap();
var Ae = Object.defineProperty, ze = Object.getOwnPropertyDescriptor, Ne = (t, e, r, n) => {
  for (var a = n > 1 ? void 0 : n ? ze(e, r) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (n ? s(e, r, a) : s(a)) || a);
  return n && a && Ae(e, r, a), a;
};
const He = w({
  ":host": {
    width: "100%",
    display: "inline-flex",
    height: "max-content"
  },
  input: {
    padding: "0",
    margin: "0",
    width: `calc(${i.heightInput.var} * 0.5)`,
    height: `calc(${i.heightInput.var} * 0.5)`,
    borderRadius: i.borderRadius.var,
    overflow: "hidden",
    accentColor: i.colorLight.var
  }
});
let ie = class extends H {
  constructor(...t) {
    super(...t), this.openShadow(He), p(this, {
      children: [
        N({
          type: "checkbox",
          onChange: (e) => {
            this.updateStores(e.currentTarget.checked);
          },
          ref: (e) => {
            this.firstStore.subscribe((r) => {
              e.checked = r.current;
            });
          }
        })
      ]
    });
  }
};
ie = Ne([
  u("e-tweaker-boolean-manager")
], ie);
var Ze = Object.defineProperty, Ge = Object.getOwnPropertyDescriptor, Ke = (t, e, r, n) => {
  for (var a = n > 1 ? void 0 : n ? Ge(e, r) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (n ? s(e, r, a) : s(a)) || a);
  return n && a && Ze(e, r, a), a;
};
const Je = w({
  ":host": {
    width: "100%",
    display: "inline-flex",
    height: "max-content"
  },
  input: {
    width: "100%",
    height: i.heightInput.var,
    padding: "0",
    background: "none",
    borderRadius: i.borderRadius.var,
    border: "none",
    blockSize: "unset"
  },
  "input::-webkit-color-swatch, input::-webkit-color-swatch-wrapper": {
    boxSizing: "border-box",
    padding: "0px",
    border: "none",
    borderRadius: i.borderRadius.var,
    height: `calc(${i.heightInput.var} * 0.93)`
  }
});
let oe = class extends H {
  constructor(...t) {
    super(...t), this.openShadow(Je), p(this, {
      children: [
        N({
          type: "color",
          value: this.firstStore,
          onInput: (e) => {
            this.updateStores(e.currentTarget.value);
          }
        })
      ]
    });
  }
};
oe = Ke([
  u("e-tweaker-color-manager")
], oe);
var Ve = Object.defineProperty, Ye = Object.getOwnPropertyDescriptor, qe = (t, e, r, n) => {
  for (var a = n > 1 ? void 0 : n ? Ye(e, r) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (n ? s(e, r, a) : s(a)) || a);
  return n && a && Ve(e, r, a), a;
};
const Be = w({
  a: {
    color: "inherit"
  }
});
let le = class extends H {
  constructor(...t) {
    var e, r;
    super(...t), this.openShadow(Be), p(this, {
      children: [
        xe({
          href: this.firstStore,
          target: (r = (e = this.firstStore.passport) == null ? void 0 : e.manager) != null && r.sameWindow ? "_self" : "_blank",
          children: this.firstStore
        })
      ]
    });
  }
};
le = qe([
  u("e-tweaker-link-manager")
], le);
var Qe = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, Xe = (t, e, r, n) => {
  for (var a = n > 1 ? void 0 : n ? Ue(e, r) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (n ? s(e, r, a) : s(a)) || a);
  return n && a && Qe(e, r, a), a;
}, je = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, re = (t, e, r) => (je(t, e, "read from private field"), r ? r.call(t) : e.get(t)), et = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, E;
const tt = w({
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
    fontSize: i.fontSizeSmall.var
  },
  ".text-input": {
    height: i.heightInput.var,
    width: "100%",
    margin: "0",
    padding: `0 ${i.gapSmall.var}`,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: i.borderRadius.var
  }
});
let j = class extends H {
  constructor(...t) {
    super(...t), et(this, E, new se([])), this.openShadow(tt), p(this, {
      children: [
        N({
          class: "text-input",
          type: "string",
          value: this.firstStore,
          onChange: (e) => {
            this.updateStores(
              e.currentTarget.value
            );
          }
        }),
        re(this, E)
      ]
    });
  }
  appendContent(t) {
    re(this, E).current = [...re(this, E).current, t];
  }
};
E = /* @__PURE__ */ new WeakMap();
j = Xe([
  u("e-tweaker-string-manager")
], j);
var rt = Object.defineProperty, at = Object.getOwnPropertyDescriptor, nt = (t, e, r, n) => {
  for (var a = n > 1 ? void 0 : n ? at(e, r) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (n ? s(e, r, a) : s(a)) || a);
  return n && a && rt(e, r, a), a;
}, be = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, b = (t, e, r) => (be(t, e, "read from private field"), r ? r.call(t) : e.get(t)), K = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, ae = (t, e, r, n) => (be(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r), T, D, R, J;
let ee = class extends j {
  constructor(...t) {
    var e, r, n, a, o, s;
    super(...t), K(this, T, void 0), K(this, D, void 0), K(this, R, void 0), K(this, J, (_) => {
      const Z = typeof _ == "string" ? parseFloat(_) || this.min : _, Ce = We(Z, b(this, D), b(this, R));
      return this.toFixed(Ce);
    }), ae(this, D, ((r = (e = this.firstStore.passport) == null ? void 0 : e.manager) == null ? void 0 : r.min) || 0), ae(this, R, ((a = (n = this.firstStore.passport) == null ? void 0 : n.manager) == null ? void 0 : a.max) || 1), ae(this, T, ((s = (o = this.firstStore.passport) == null ? void 0 : o.manager) == null ? void 0 : s.step) || 0.01);
  }
  get min() {
    return b(this, D);
  }
  get max() {
    return b(this, R);
  }
  get step() {
    return b(this, T);
  }
  toFixed(t) {
    var r;
    const e = ((r = b(this, T).toString().split(".")[1]) == null ? void 0 : r.length) || 0;
    return e ? +t.toFixed(e) : Math.ceil(t);
  }
  connectedCallback() {
    this.firstStore.addMiddleware(b(this, J));
  }
  disconnectedCallback() {
    this.firstStore.removeMiddleware(b(this, J));
  }
};
T = /* @__PURE__ */ new WeakMap();
D = /* @__PURE__ */ new WeakMap();
R = /* @__PURE__ */ new WeakMap();
J = /* @__PURE__ */ new WeakMap();
ee = nt([
  u("e-tweaker-number-manager")
], ee);
var st = Object.defineProperty, it = Object.getOwnPropertyDescriptor, ot = (t, e, r, n) => {
  for (var a = n > 1 ? void 0 : n ? it(e, r) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (n ? s(e, r, a) : s(a)) || a);
  return n && a && st(e, r, a), a;
};
const lt = w({
  ":host": {
    width: "100%"
  },
  ".text-input": {
    width: "60px",
    marginRight: i.gapLarge.var,
    textAlign: "center"
  },
  ".range-input": {
    boxSizing: "border-box",
    "-webkit-appearance": "none",
    height: "8px",
    width: "100%",
    margin: "0",
    padding: "0",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: i.borderRadius.var
  },
  ".range-input::-webkit-slider-thumb": {
    "-webkit-appearance": "none",
    height: `calc(${i.heightInput.var} * 0.7)`,
    width: i.borderRadius.var,
    borderRadius: i.borderRadius.var,
    backgroundColor: i.colorLight.var,
    transitionProperty: "background-color",
    transitionDuration: i.durationShort.var
  },
  ".range-input:focus::-webkit-slider-thumb": {
    backgroundColor: i.colorActive.var
  },
  ".range-input::-webkit-slider-runnable-track": {
    "-webkit-appearance": "none",
    "box-shadow": "none",
    border: "none",
    background: "transparent"
  }
});
let he = class extends ee {
  constructor(...t) {
    super(...t), this.addStylesheet(lt), this.appendContent(
      N({
        class: "range-input",
        type: "range",
        min: this.min,
        max: this.max,
        step: this.step,
        value: this.firstStore,
        onInput: (e) => {
          this.updateStores(
            parseFloat(e.currentTarget.value)
          );
        }
      })
    );
  }
};
he = ot([
  u("e-tweaker-range-manager")
], he);
var ht = Object.defineProperty, ct = Object.getOwnPropertyDescriptor, dt = (t, e, r, n) => {
  for (var a = n > 1 ? void 0 : n ? ct(e, r) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (n ? s(e, r, a) : s(a)) || a);
  return n && a && ht(e, r, a), a;
};
const pt = w({
  "e-select": {
    width: "100%",
    "--arrow-color": i.colorLight.var
  },
  "e-select-head": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  "e-select-option": {
    transitionDuration: i.durationShort.var,
    transitionProperty: "color"
  },
  "e-select-option:hover": {
    color: i.colorActive.var
  },
  svg: {
    width: "16px",
    height: "16px",
    fill: i.colorLight.var,
    transitionProperty: "transform",
    transitionDuration: i.durationShort.var
  },
  ".opened svg": {
    transform: "scaleY(-1)"
  }
});
let ce = class extends H {
  constructor(...t) {
    var r, n;
    super(...t), this.openShadow(pt);
    const e = ((n = (r = this.firstStore.passport) == null ? void 0 : r.manager) == null ? void 0 : n.variants) || [];
    p(this, {
      children: p("e-select", {
        value: this.firstStore,
        onChange: (a) => {
          this.updateStores(a.currentTarget.value);
        },
        lightChildren: [
          p("e-select-head", {
            lightChildren: [
              $e({
                "data-value-holder": ""
              })
            ]
          }),
          ...e.map(
            (a, o) => p("e-select-option", {
              lightChildren: a,
              default: o === 0 ? !0 : null
            })
          )
        ]
      })
    });
  }
};
ce = dt([
  u("e-tweaker-select-manager")
], ce);
const ut = {
  boolean: ie,
  color: oe,
  link: le,
  number: ee,
  range: he,
  select: ce,
  string: j
};
var vt = Object.defineProperty, gt = Object.getOwnPropertyDescriptor, ft = (t, e, r, n) => {
  for (var a = n > 1 ? void 0 : n ? gt(e, r) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (n ? s(e, r, a) : s(a)) || a);
  return n && a && vt(e, r, a), a;
}, Se = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, h = (t, e, r) => (Se(t, e, "read from private field"), r ? r.call(t) : e.get(t)), C = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, k = (t, e, r, n) => (Se(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r), v, W, L, I, F, V, Y;
const wt = w({
  ":host": {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "0.4fr 1fr",
    alignItems: "center",
    color: i.colorLight.var,
    gap: i.gapMedium.var
  },
  ":host(.disabled)": {
    pointerEvents: "none",
    opacity: 0.5
  },
  ".head": {
    fontSize: i.fontSizeMedium.var,
    display: "flex",
    alignItems: "center",
    gap: i.gapExtraSmall.var
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
    fill: i.colorLight.var,
    transitionDuration: i.durationShort.var,
    transitionProperty: "fill, opacity",
    opacity: "0"
  },
  ":host(:hover) .head-button": {
    opacity: "1"
  },
  ".head-button:hover": {
    fill: i.colorActive.var
  },
  ".head-button svg": {
    width: "100%",
    height: "100%"
  }
});
let te = class extends ve {
  constructor(t) {
    var r, n, a, o;
    super(), C(this, v, []), C(this, W, void 0), C(this, L, void 0), C(this, I, !1), C(this, F, void 0), C(this, V, () => {
      $.current.find((s) => h(this, v).includes(s)) || this.remove();
    }), C(this, Y, (s) => {
      h(this, I) && ((s.metaKey || s.ctrlKey) && s.code === "KeyC" ? navigator.clipboard.writeText(h(this, v)[0].current) : (s.metaKey || s.ctrlKey) && s.code === "KeyR" && (h(this, v).forEach((_) => {
        _.reset();
      }), s.preventDefault()));
    }), k(this, v, [t.store]), k(this, W, t.store.passport.name), k(this, L, h(this, W).split(".").slice(-1).toString());
    const e = ((n = (r = t.store.passport) == null ? void 0 : r.manager) == null ? void 0 : n.type) || "string";
    k(this, F, new ut[e](h(this, v)[0])), this.openShadow(wt), p(this, {
      class: {
        disabled: ((o = (a = t.store.passport) == null ? void 0 : a.manager) == null ? void 0 : o.disabled) || !1
      },
      onPointerleave: () => {
        k(this, I, !1);
      },
      onPointerenter: () => {
        k(this, I, !0);
      },
      children: [
        m({
          class: "head",
          children: [
            m({ class: "name", children: h(this, L) + ":" }),
            m({
              class: "head-buttons",
              children: [
                A({
                  class: "head-button",
                  children: _e,
                  onClick: () => {
                    navigator.clipboard.writeText(h(this, v)[0].current);
                  }
                }),
                A({
                  class: "head-button",
                  children: me,
                  onClick: () => {
                    h(this, v).forEach((s) => {
                      s.reset();
                    });
                  }
                })
              ]
            })
          ]
        }),
        h(this, F)
      ]
    });
  }
  get key() {
    return h(this, W);
  }
  get name() {
    return h(this, L);
  }
  get stores() {
    return h(this, v);
  }
  addStore(t) {
    h(this, F).addStore(t);
  }
  connectedCallback() {
    $.subscribe(h(this, V)), addEventListener("keydown", h(this, Y)), Re(this);
  }
  disconnectedCallback() {
    $.unsubscribe(h(this, V)), removeEventListener("keydown", h(this, Y));
  }
};
v = /* @__PURE__ */ new WeakMap();
W = /* @__PURE__ */ new WeakMap();
L = /* @__PURE__ */ new WeakMap();
I = /* @__PURE__ */ new WeakMap();
F = /* @__PURE__ */ new WeakMap();
V = /* @__PURE__ */ new WeakMap();
Y = /* @__PURE__ */ new WeakMap();
te = ft([
  u("e-tweaker-field")
], te);
var mt = Object.defineProperty, _t = Object.getOwnPropertyDescriptor, bt = (t, e, r, n) => {
  for (var a = n > 1 ? void 0 : n ? _t(e, r) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (n ? s(e, r, a) : s(a)) || a);
  return n && a && mt(e, r, a), a;
}, ye = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, l = (t, e, r) => (ye(t, e, "read from private field"), r ? r.call(t) : e.get(t)), x = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, ne = (t, e, r, n) => (ye(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r), g, q, c, B, Q, de;
const St = w({
  ".wrapper": {
    boxSizing: "border-box",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: i.borderRadius.var
  },
  ".head": {
    boxSizing: "border-box",
    width: "100%",
    height: i.tweakerFolderHeight.var,
    paddingLeft: i.gapMedium.var,
    paddingRight: i.gapMedium.var,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: i.colorDarkAux.var,
    borderRadius: i.borderRadius.var
  },
  ".name": {
    fontSize: i.fontSizeLarge.var,
    color: i.colorLight.var
  },
  ".body": {
    transitionProperty: "height",
    transitionDuration: i.durationShort.var,
    overflow: "hidden",
    height: "0px"
  },
  ".body-content": {
    boxSizing: "border-box",
    padding: i.gapLarge.var,
    display: "grid",
    gap: i.gapMedium.var
  },
  ".arrow": {
    width: "20px",
    height: "20px",
    fill: i.colorLight.var,
    transition: `transform ${i.durationShort.var}`
  },
  ".opened .arrow": {
    transform: "scaleY(-1)"
  }
});
let z = class extends Te {
  constructor(t) {
    super(), x(this, g, void 0), x(this, q, new se(null)), x(this, c, new se([])), x(this, B, void 0), x(this, Q, null), x(this, de, (e) => {
      let r = [], n = [];
      e.forEach((a) => {
        r = [...r, ...a.removedNodes], n = [...n, ...a.addedNodes];
      }), l(this, c).current = l(this, c).current.filter(
        (a) => !r.includes(a)
      ), l(this, g) && !l(this, c).current.length && !n.length && this.remove();
    }), this.openShadow(St), ne(this, g, t.key), ne(this, B, new MutationObserver(l(this, de))), p(this, {
      onAccordionItemToggle: (e) => {
        e.stopPropagation(), e.detail.opened ? P.openPanel(l(this, g)) : P.closePanel(l(this, g));
      },
      children: [
        m({
          class: "wrapper",
          children: [
            m({
              class: "head",
              children: [
                l(this, g) ? m({
                  class: "name",
                  children: [l(this, g).split(".").slice(-1).toString()]
                }) : null,
                l(this, q),
                p(De, {
                  class: "arrow"
                })
              ]
            }),
            m({
              class: "body",
              children: m({
                class: "body-content",
                children: l(this, c),
                ref: (e) => ne(this, Q, e.firstElementChild)
              })
            })
          ]
        })
      ]
    }), t != null && t.storeBox && this.handleStore(t.storeBox);
  }
  get key() {
    return l(this, g);
  }
  get head() {
    return l(this, q);
  }
  get content() {
    return l(this, c);
  }
  connectedCallback() {
    super.connectedCallback(), setTimeout(() => {
      P.isPanelOpened(l(this, g)) && this.openAll({ skipTransition: !0 });
    }, 50), l(this, B).observe(l(this, Q), {
      childList: !0
    });
  }
  handleStore(t) {
    if (t.remainingFolders.length) {
      const r = t.store.passport.name.split("."), n = r.slice(0, r.length - t.remainingFolders.length).join("."), a = l(this, c).current.find((o) => o.key === n);
      a instanceof z ? a.handleStore({
        store: t.store,
        remainingFolders: t.remainingFolders.slice(1)
      }) : l(this, c).current = [
        ...l(this, c).current,
        new z({
          key: n,
          storeBox: {
            store: t.store,
            remainingFolders: t.remainingFolders.slice(1)
          }
        })
      ];
    } else {
      const e = l(this, c).current.find(
        (r) => r.key === t.store.passport.name
      );
      e instanceof te ? e.addStore(t.store) : l(this, c).current = [
        ...l(this, c).current,
        new te({
          store: t.store
        })
      ];
    }
  }
};
g = /* @__PURE__ */ new WeakMap();
q = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakMap();
B = /* @__PURE__ */ new WeakMap();
Q = /* @__PURE__ */ new WeakMap();
de = /* @__PURE__ */ new WeakMap();
z = bt([
  u("e-tweaker-folder")
], z);
var yt = Object.defineProperty, Ct = Object.getOwnPropertyDescriptor, kt = (t, e, r, n) => {
  for (var a = n > 1 ? void 0 : n ? Ct(e, r) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (n ? s(e, r, a) : s(a)) || a);
  return n && a && yt(e, r, a), a;
}, xt = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, fe = (t, e, r) => (xt(t, e, "read from private field"), r ? r.call(t) : e.get(t)), $t = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, U;
const Pt = w({
  ":host": {
    position: "absolute",
    top: i.tweakerOffset.var,
    right: i.tweakerOffset.var,
    width: i.tweakerWidth.var,
    backgroundColor: i.colorDark.var,
    borderRadius: i.borderRadius.var,
    transition: "opacity 0.2s",
    zIndex: "100",
    opacity: "0.1"
  },
  ":host(:hover)": {
    opacity: "1 !important"
  },
  ".tweaker-buttons": {
    display: "flex",
    alignItems: "center",
    gap: i.gapExtraSmall.var
  },
  ".tweaker-button": {
    width: "18px",
    height: "18px",
    padding: "0",
    margin: "0",
    background: "none",
    border: "none",
    fill: i.colorLight.var,
    transitionProperty: "fill",
    transitionDuration: i.durationShort.var
  },
  ".tweaker-button:hover": {
    fill: i.colorActive.var
  },
  ".tweaker-button svg": {
    width: "100%",
    height: "100%"
  },
  ":host .body-content": {
    maxHeight: `calc(
      100dvh - 
      (
        ${i.tweakerOffset.var} * 2 + 
        ${i.tweakerFolderHeight.var}
      )
    )`,
    overflow: "hidden auto",
    "-ms-overflow-style": "none",
    "scrollbar-width": "none"
  },
  ":host .body-content::-webkit-scrollbar": {
    display: "none"
  },
  [`@media ${Ee["<=mobile"]}`]: {
    ":host": {
      position: "absolute",
      top: "0",
      right: "0",
      width: "100%",
      borderTopLeftRadius: "0",
      borderTopRightRadius: "0"
    },
    ":host .body-content": {
      maxHeight: `calc(
        100dvh - 
        ${i.tweakerFolderHeight.var}
      )`
    }
  }
});
let pe = class extends z {
  constructor() {
    super({
      key: ""
    }), $t(this, U, Me(() => {
      $.current.forEach((t) => {
        const e = t.passport.name.split(".");
        this.handleStore({
          store: t,
          remainingFolders: e.length > 1 ? e.slice(0, -1) : []
        });
      });
    }, 10)), this.addStylesheet(Pt), this.head.current = [
      m({
        class: "tweaker-buttons",
        onClick: (t) => {
          t.stopPropagation();
        },
        children: [
          A({
            class: "tweaker-button",
            children: me,
            onClick: () => {
              S.resetState();
            }
          }),
          A({
            class: ["tweaker-button"],
            children: [_e],
            onClick: () => {
              navigator.clipboard.writeText(
                JSON.stringify(S.getState())
              );
            }
          }),
          A({
            class: "tweaker-button",
            children: Le,
            onClick: () => {
              Oe(
                S.projectName,
                S.getState()
              );
            }
          }),
          Pe({
            class: "tweaker-button",
            children: [
              Ie,
              N({
                type: "file",
                style: {
                  display: "none"
                },
                onChange: (t) => {
                  const e = t.currentTarget;
                  e.onchange = () => {
                    var n;
                    const r = (n = e.files) == null ? void 0 : n[0];
                    if (r) {
                      const a = new FileReader();
                      a.onload = (o) => {
                        var _, Z;
                        const s = (Z = (_ = o.target) == null ? void 0 : _.result) == null ? void 0 : Z.toString();
                        s && S.loadState(s);
                      }, a.readAsText(r);
                    }
                    e.onchange = null;
                  }, e.click();
                }
              })
            ],
            onClick: () => {
            }
          })
        ]
      })
    ], this.addEventListener("accordionItemToggle", (t) => {
      t.detail.opened ? this.style.opacity = "1" : this.style.opacity = "0.1";
    });
  }
  connectedCallback() {
    super.connectedCallback(), $.subscribe(fe(this, U));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), $.unsubscribe(fe(this, U));
  }
};
U = /* @__PURE__ */ new WeakMap();
pe = kt([
  u("e-tweaker")
], pe);
var Ot = Object.defineProperty, Mt = Object.getOwnPropertyDescriptor, Et = (t, e, r, n) => {
  for (var a = n > 1 ? void 0 : n ? Mt(e, r) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (n ? s(e, r, a) : s(a)) || a);
  return n && a && Ot(e, r, a), a;
}, Tt = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, we = (t, e, r) => (Tt(t, e, "read from private field"), r ? r.call(t) : e.get(t)), Dt = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, X;
const Rt = w({
  ":host": {
    fontFamily: "sans-serif"
  }
});
let ue = class extends ve {
  constructor() {
    super(), Dt(this, X, () => {
      P.save();
    }), this.openShadow(Rt), P.load(), p(this, {
      children: [new pe()]
    });
  }
  connectedCallback() {
    window.addEventListener("beforeunload", we(this, X));
  }
  disconnectedCallback() {
    window.removeEventListener("beforeunload", we(this, X)), P.save();
  }
};
X = /* @__PURE__ */ new WeakMap();
ue = Et([
  u("e-studio")
], ue);
ke && document.body.appendChild(new ue());
export {
  ue as StudioElement
};
