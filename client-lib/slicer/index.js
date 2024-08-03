var w = (n, t, e) => {
  if (!t.has(n))
    throw TypeError("Cannot " + e);
};
var s = (n, t, e) => (w(n, t, "read from private field"), e ? e.call(n) : t.get(n)), l = (n, t, e) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, e);
}, i = (n, t, e, o) => (w(n, t, "write to private field"), o ? o.call(n, e) : t.set(n, e), e);
import { g as A } from "../string-f0Dnk0L1.js";
var y, c, u;
class T {
  constructor(t) {
    l(this, y, void 0);
    l(this, c, void 0);
    l(this, u, void 0);
    i(this, y, t.index), i(this, c, document.createElement("span")), i(this, u, []), t.letters && t.letterConstructor && t.lettersAcc !== void 0 ? (i(this, u, t.text.split("").map((e, o) => new t.letterConstructor({
      index: t.lettersAcc + o,
      text: e,
      clone: t.clone
    }))), s(this, c).append(...s(this, u).map((e) => e.element))) : t.clone ? s(this, c).innerHTML = `
          <span class="original">${t.text}</span>
          <span class="clone" aria-hidden>${t.text}</span>
        ` : s(this, c).innerHTML = `
          <span class="value">${t.text}</span>
        `, s(this, c).classList.add("word");
  }
  get index() {
    return s(this, y);
  }
  get element() {
    return s(this, c);
  }
  get letters() {
    return s(this, u);
  }
}
y = new WeakMap(), c = new WeakMap(), u = new WeakMap();
var f, d;
class L {
  constructor(t) {
    l(this, f, void 0);
    l(this, d, void 0);
    i(this, f, t.index), i(this, d, document.createElement("span")), s(this, d).classList.add("letter"), t.clone ? s(this, d).innerHTML = `
        <span class="original">${t.text}</span>
        <span class="clone" aria-hidden>${t.text}</span>
      ` : s(this, d).innerHTML = `
        <span class="value">${t.text}</span>
      `;
  }
  get index() {
    return s(this, f);
  }
  get element() {
    return s(this, d);
  }
}
f = new WeakMap(), d = new WeakMap();
var g, r, x, C, E;
class M extends HTMLElement {
  constructor(e) {
    super();
    l(this, g, "");
    l(this, r, []);
    l(this, x, []);
    l(this, C, void 0);
    l(this, E, void 0);
    i(this, C, (e == null ? void 0 : e.wordConstructor) || T), i(this, E, (e == null ? void 0 : e.letterConstructor) || L);
  }
  get wordsArray() {
    return s(this, r);
  }
  get lettersArray() {
    return s(this, x);
  }
  get originalText() {
    return s(this, g);
  }
  connectedCallback() {
    var o;
    i(this, g, ((o = this.textContent) == null ? void 0 : o.trim()) || ""), this.innerHTML = "";
    let e = 0;
    i(this, r, s(this, g).replace(/  +/g, " ").split(" ").map((h, m) => {
      const a = new (s(this, C))({
        index: m,
        text: h,
        letters: this.hasAttribute("letters"),
        lettersAcc: e,
        letterConstructor: s(this, E),
        clone: this.hasAttribute("clone")
      });
      return e += a.letters.length, s(this, x).push(...a.letters), a;
    })), this.hasAttribute("index") && (s(this, r).forEach((h) => {
      h.element.style.setProperty("--word-index", h.index.toString());
    }), s(this, x).forEach((h) => {
      h.element.style.setProperty(
        "--letter-index",
        h.index.toString()
      );
    })), s(this, r).forEach((h, m) => {
      if (this.appendChild(h.element), m !== s(this, r).length - 1) {
        const a = document.createElement("span");
        a.innerHTML = "&nbsp;", this.appendChild(a);
      }
    }), this.style.setProperty("--words-length", s(this, r).length.toString()), this.style.setProperty("--letters-length", s(this, x).length.toString());
  }
  disconnectedCallback() {
    i(this, r, []), this.textContent = s(this, g), this.style.removeProperty("--words-length"), this.style.removeProperty("--letters-length");
  }
}
g = new WeakMap(), r = new WeakMap(), x = new WeakMap(), C = new WeakMap(), E = new WeakMap();
customElements.get("e-slicer") || customElements.define("e-slicer", M);
var p;
class b extends L {
  constructor(e) {
    super(e);
    l(this, p, void 0);
    i(this, p, A(
      2 + Math.floor(Math.random() * 15),
      "abcdefghijklmnopqrstuvwxyz0123456789#!%$^&*+=?"
    ) + e.text), this.play(0);
  }
  play(e) {
    const o = Math.floor(e * (s(this, p).length - 1));
    this.element.textContent = s(this, p)[o];
  }
}
p = new WeakMap();
class H extends M {
  constructor() {
    super({
      letterConstructor: b
    });
  }
  play(t) {
    this.lettersArray.forEach((e) => {
      e.play(t);
    });
  }
}
customElements.get("e-decoder") || customElements.define("e-decoder", H);
export {
  H as DecoderElement,
  L as Letter,
  M as SlicerElement,
  T as Word
};
