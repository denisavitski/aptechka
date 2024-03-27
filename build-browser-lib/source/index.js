var v = (i, r, s) => {
  if (!r.has(i))
    throw TypeError("Cannot " + s);
};
var t = (i, r, s) => (v(i, r, "read from private field"), s ? s.call(i) : r.get(i)), o = (i, r, s) => {
  if (r.has(i))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(i) : r.set(i, s);
}, l = (i, r, s, h) => (v(i, r, "write to private field"), h ? h.call(i, s) : r.set(i, s), s);
var E = (i, r, s) => (v(i, r, "access private method"), s);
import { S as k } from "../SourceManager-BoP9RAJr.js";
import { a as W, b as $ } from "../SourceManager-BoP9RAJr.js";
import { CustomElement as w } from "../custom-element/index.js";
import { intersector as A } from "../intersector/index.js";
import { loading as S } from "../loading/index.js";
import { Notifier as x } from "../notifier/index.js";
let N = 0;
var n, e, c, m, a, u, f, p, g, y, L;
class K extends w {
  constructor() {
    super();
    o(this, g);
    o(this, n, null);
    o(this, e, null);
    o(this, c, !1);
    o(this, m, !1);
    o(this, a, !1);
    o(this, u, void 0);
    o(this, f, new x());
    o(this, p, new x());
    o(this, L, (s) => {
      t(this, a) && !t(this, m) && s.isIntersecting && (t(this, n).current && t(this, n).current !== t(this, n).previous && E(this, g, y).call(this, t(this, n).current), l(this, m, !0)), s.isIntersecting ? t(this, f).notify() : t(this, p).notify();
    });
    l(this, u, `source-consumer-${++N}`);
  }
  get consumerElement() {
    return t(this, e);
  }
  get captureEvent() {
    return t(this, f);
  }
  get releaseEvent() {
    return t(this, p);
  }
  connectedCallback() {
    const s = this.getAttribute("srcset");
    s && (l(this, e, this.createConsumer()), t(this, e).style.cssText = `
        display: block;
        width: 100%;
        height: 100%;
      `, t(this, e).classList.add("source-consumer"), Array.from(this.attributes).forEach((h) => {
      if (h.nodeName.startsWith("e-")) {
        const b = h.nodeName.slice(2), d = h.nodeValue || "";
        t(this, e).setAttribute(b, d), t(this, e)[b] = d || !0;
      }
    }), this.appendChild(t(this, e)), l(this, n, new k({
      srcset: s
    })), l(this, a, this.hasAttribute("lazy")), t(this, n).subscribe((h) => {
      (!t(this, a) || t(this, a) && t(this, m)) && E(this, g, y).call(this, h.current);
    }), A.subscribe(this, t(this, L)), t(this, n).connect());
  }
  disconnectedCallback() {
    A.unsubscribe(t(this, L)), t(this, f).close(), t(this, p).close(), t(this, n).close(), t(this, e).onloadeddata = null, t(this, e).onload = null, t(this, e).onerror = null, t(this, e).remove();
  }
}
n = new WeakMap(), e = new WeakMap(), c = new WeakMap(), m = new WeakMap(), a = new WeakMap(), u = new WeakMap(), f = new WeakMap(), p = new WeakMap(), g = new WeakSet(), y = function(s) {
  if (t(this, e).onloadeddata = null, t(this, e).onload = null, t(this, e).onerror = null, s) {
    const h = this.hasAttribute("keep-source-parameters");
    this.classList.remove("loaded"), this.classList.add("loading");
    const b = h ? s.url : s.name + s.extension;
    this.consumeSource(b);
    const d = () => {
      this.classList.remove("error"), this.classList.remove("loading"), this.classList.add("loaded"), !t(this, a) && !t(this, c) && S.setLoaded(t(this, u), 1), l(this, c, !0);
    }, C = () => {
      this.classList.remove("loading"), this.classList.add("error"), !t(this, a) && !t(this, c) && S.setError(t(this, u), b), l(this, c, !0);
    };
    !t(this, a) && !t(this, c) && S.setTotal(t(this, u), 1), t(this, e).onloadeddata = () => {
      d();
    }, t(this, e).onload = () => {
      d();
    }, t(this, e).onerror = C;
  } else
    this.consumeSource(null);
}, L = new WeakMap();
export {
  W as Source,
  K as SourceElement,
  k as SourceManager,
  $ as SourceSet
};
