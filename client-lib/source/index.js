var L = (i, r, s) => {
  if (!r.has(i))
    throw TypeError("Cannot " + s);
};
var t = (i, r, s) => (L(i, r, "read from private field"), s ? s.call(i) : r.get(i)), a = (i, r, s) => {
  if (r.has(i))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(i) : r.set(i, s);
}, u = (i, r, s, n) => (L(i, r, "write to private field"), n ? n.call(i, s) : r.set(i, s), s);
var v = (i, r, s) => (L(i, r, "access private method"), s);
import { S as y } from "../SourceManager--L_rA28b.js";
import { a as V, b as $ } from "../SourceManager--L_rA28b.js";
import { loading as k } from "../loading/index.js";
import { ClassLinkedStatus as A } from "../class-linked-status/index.js";
import { i as x } from "../browser-0zX67oeU.js";
import { k as M } from "../string-f0Dnk0L1.js";
let T = 0;
var h, e, c, f, l, d, o, m, p, S, C, g, E;
class K extends HTMLElement {
  constructor() {
    super();
    a(this, p);
    a(this, h, null);
    a(this, e, null);
    a(this, c, !1);
    a(this, f, !1);
    a(this, l, !1);
    a(this, d, "");
    a(this, o, new A(this, {
      loading: !1,
      loaded: !1,
      error: !1
    }));
    a(this, m, null);
    a(this, C, (s) => {
      const n = s[0];
      t(this, l) && (!t(this, f) || this.hasAttribute("reload-source")) && n.isIntersecting && (t(this, h).current && t(this, h).current !== t(this, h).previous && v(this, p, S).call(this, t(this, h).current), u(this, f, !0)), n.isIntersecting ? this.dispatchEvent(new CustomEvent("sourceCapture")) : (this.hasAttribute("reload-source") && v(this, p, S).call(this, void 0), this.dispatchEvent(new CustomEvent("sourceRelease")));
    });
    a(this, g, () => {
      t(this, o).set("loaded", !0), t(this, o).set("error", !1), t(this, o).set("loading", !1), !t(this, l) && !t(this, c) && k.setLoaded(t(this, d), 1), u(this, c, !0);
    });
    a(this, E, (s) => {
      t(this, o).set("loaded", !1), t(this, o).set("error", !0), t(this, o).set("loading", !1), !t(this, l) && !t(this, c) && k.setError(t(this, d), s), u(this, c, !0);
    });
    x && (u(this, d, `source-consumer-${++T}`), u(this, m, new IntersectionObserver(
      t(this, C)
    )));
  }
  get consumerElement() {
    return t(this, e);
  }
  get sourceManager() {
    return t(this, h);
  }
  get status() {
    return t(this, o);
  }
  get isLazy() {
    return t(this, l);
  }
  connectedCallback() {
    const s = this.getAttribute("srcset");
    s && (u(this, e, this.createConsumer()), t(this, e).style.cssText = `
        display: block;
        width: 100%;
        height: 100%;
      `, t(this, e).classList.add("source-consumer"), Array.from(this.attributes).forEach((n) => {
      if (n.name !== "srcset") {
        const b = n.nodeValue || "", w = M(n.name);
        w in t(this, e) && (t(this, e)[w] = b || !0);
      }
    }), this.appendChild(t(this, e)), u(this, h, new y({
      srcset: s
    })), u(this, l, this.hasAttribute("lazy")), t(this, h).subscribe((n) => {
      (!t(this, l) || t(this, l) && t(this, f)) && v(this, p, S).call(this, n.current);
    }), t(this, m).observe(this), t(this, h).connect());
  }
  disconnectedCallback() {
    t(this, m).disconnect(), t(this, h).close(), t(this, e).onloadeddata = null, t(this, e).onload = null, t(this, e).onerror = null, t(this, e).remove(), t(this, o).reset();
  }
}
h = new WeakMap(), e = new WeakMap(), c = new WeakMap(), f = new WeakMap(), l = new WeakMap(), d = new WeakMap(), o = new WeakMap(), m = new WeakMap(), p = new WeakSet(), S = function(s) {
  if (t(this, e).onloadeddata = null, t(this, e).onload = null, t(this, e).onerror = null, t(this, o).set("loaded", !1), t(this, o).set("error", !1), t(this, o).set("loading", !1), s) {
    const n = this.hasAttribute("keep-source-parameters");
    t(this, o).set("loading", !0);
    const b = n ? s.url : s.name + s.extension;
    this.consumeSource(b), !t(this, l) && !t(this, c) && k.setTotal(t(this, d), 1), t(this, e).onloadeddata = () => {
      t(this, g).call(this);
    }, t(this, e).onload = () => {
      t(this, g).call(this);
    }, t(this, e).onerror = () => {
      t(this, E).call(this, b);
    };
  } else
    this.consumeSource(null);
}, C = new WeakMap(), g = new WeakMap(), E = new WeakMap();
export {
  V as Source,
  K as SourceElement,
  y as SourceManager,
  $ as SourceSet
};
