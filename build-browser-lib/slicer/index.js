var A = (e, t, s) => {
  if (!t.has(e))
    throw TypeError("Cannot " + s);
};
var i = (e, t, s) => (A(e, t, "read from private field"), s ? s.call(e) : t.get(e)), u = (e, t, s) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, s);
}, c = (e, t, s, n) => (A(e, t, "write to private field"), n ? n.call(e, s) : t.set(e, s), s);
import { CustomElement as S, define as T } from "../custom-element/index.js";
import { g as W } from "../string-3lAkpJJP.js";
var y, h, f;
class D {
  constructor(t) {
    u(this, y, void 0);
    u(this, h, void 0);
    u(this, f, void 0);
    c(this, y, t.index), c(this, h, document.createElement("span")), c(this, f, []), t.letters && t.letterConstructor && t.lettersAcc !== void 0 ? (c(this, f, t.text.split("").map((s, n) => new t.letterConstructor({
      index: t.lettersAcc + n,
      text: s,
      clone: t.clone
    }))), i(this, h).append(...i(this, f).map((s) => s.element))) : t.clone ? i(this, h).innerHTML = `
          <span class="original">${t.text}</span>
          <span class="clone" aria-hidden>${t.text}</span>
        ` : i(this, h).innerHTML = `
          <span class="value">${t.text}</span>
        `, i(this, h).classList.add("word");
  }
  get index() {
    return i(this, y);
  }
  get element() {
    return i(this, h);
  }
  get letters() {
    return i(this, f);
  }
}
y = new WeakMap(), h = new WeakMap(), f = new WeakMap();
var C, a;
class $ {
  constructor(t) {
    u(this, C, void 0);
    u(this, a, void 0);
    c(this, C, t.index), c(this, a, document.createElement("span")), i(this, a).classList.add("letter"), t.clone ? i(this, a).innerHTML = `
        <span class="original">${t.text}</span>
        <span class="clone" aria-hidden>${t.text}</span>
      ` : i(this, a).innerHTML = `
        <span class="value">${t.text}</span>
      `;
  }
  get index() {
    return i(this, C);
  }
  get element() {
    return i(this, a);
  }
}
C = new WeakMap(), a = new WeakMap();
var H = Object.defineProperty, b = Object.getOwnPropertyDescriptor, m = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? b(t, s) : t, d = e.length - 1, p; d >= 0; d--)
    (p = e[d]) && (r = (n ? p(t, s, r) : p(r)) || r);
  return n && r && H(t, s, r), r;
}, O = (e, t, s) => {
  if (!t.has(e))
    throw TypeError("Cannot " + s);
}, l = (e, t, s) => (O(e, t, "read from private field"), s ? s.call(e) : t.get(e)), _ = (e, t, s) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, s);
}, w = (e, t, s, n) => (O(e, t, "write to private field"), n ? n.call(e, s) : t.set(e, s), s), x, o, g, M, P;
let E = class extends S {
  constructor(e) {
    super(), _(this, x, ""), _(this, o, []), _(this, g, []), _(this, M, void 0), _(this, P, void 0), w(this, M, (e == null ? void 0 : e.wordConstructor) || D), w(this, P, (e == null ? void 0 : e.letterConstructor) || $);
  }
  get wordsArray() {
    return l(this, o);
  }
  get lettersArray() {
    return l(this, g);
  }
  get originalText() {
    return l(this, x);
  }
  connectedCallback() {
    var t;
    w(this, x, ((t = this.textContent) == null ? void 0 : t.trim()) || ""), this.innerHTML = "";
    let e = 0;
    w(this, o, l(this, x).replace(/  +/g, " ").split(" ").map((s, n) => {
      const r = new (l(this, M))({
        index: n,
        text: s,
        letters: this.hasAttribute("letters"),
        lettersAcc: e,
        letterConstructor: l(this, P),
        clone: this.hasAttribute("clone")
      });
      return e += r.letters.length, l(this, g).push(...r.letters), r;
    })), this.hasAttribute("index") && (l(this, o).forEach((s) => {
      s.element.style.setProperty("--word-index", s.index.toString());
    }), l(this, g).forEach((s) => {
      s.element.style.setProperty(
        "--letter-index",
        s.index.toString()
      );
    })), l(this, o).forEach((s, n) => {
      if (this.appendChild(s.element), n !== l(this, o).length - 1) {
        const r = document.createElement("span");
        r.innerHTML = "&nbsp;", this.appendChild(r);
      }
    }), this.style.setProperty("--words-length", l(this, o).length.toString()), this.style.setProperty("--letters-length", l(this, g).length.toString());
  }
  disconnectedCallback() {
    w(this, o, []), this.textContent = l(this, x), this.style.removeProperty("--words-length"), this.style.removeProperty("--letters-length");
  }
};
x = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakMap();
M = /* @__PURE__ */ new WeakMap();
P = /* @__PURE__ */ new WeakMap();
E = m([
  T("e-slicer")
], E);
var q = Object.defineProperty, z = Object.getOwnPropertyDescriptor, G = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? z(t, s) : t, d = e.length - 1, p; d >= 0; d--)
    (p = e[d]) && (r = (n ? p(t, s, r) : p(r)) || r);
  return n && r && q(t, s, r), r;
}, v;
class I extends $ {
  constructor(s) {
    super(s);
    u(this, v, void 0);
    c(this, v, W(
      2 + Math.floor(Math.random() * 15),
      "abcdefghijklmnopqrstuvwxyz0123456789#!%$^&*+=?"
    ) + s.text), this.play(0);
  }
  play(s) {
    const n = Math.floor(s * (i(this, v).length - 1));
    this.element.textContent = i(this, v)[n];
  }
}
v = new WeakMap();
let L = class extends E {
  constructor() {
    super({
      letterConstructor: I
    });
  }
  play(e) {
    this.lettersArray.forEach((t) => {
      t.play(e);
    });
  }
};
L = G([
  T("e-decoder")
], L);
export {
  L as DecoderElement,
  $ as Letter,
  E as SlicerElement,
  D as Word
};
