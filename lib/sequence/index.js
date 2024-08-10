var x = (s, n, e) => {
  if (!n.has(s))
    throw TypeError("Cannot " + e);
};
var t = (s, n, e) => (x(s, n, "read from private field"), e ? e.call(s) : n.get(s)), h = (s, n, e) => {
  if (n.has(s))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(s) : n.set(s, e);
}, u = (s, n, e, i) => (x(s, n, "write to private field"), i ? i.call(s, e) : n.set(s, e), e);
var P = (s, n, e) => new Promise((i, p) => {
  var S = (o) => {
    try {
      m(e.next(o));
    } catch (r) {
      p(r);
    }
  }, C = (o) => {
    try {
      m(e.throw(o));
    } catch (r) {
      p(r);
    }
  }, m = (o) => o.done ? i(o.value) : Promise.resolve(o.value).then(S, C);
  m((e = e.apply(s, n)).next());
});
import { CanvasElement as q } from "../canvas/index.js";
import { CSSProperty as I } from "../css-property/index.js";
import { elementResizer as R } from "../element-resizer/index.js";
import "../window-resizer/index.js";
import "../Store-Qr3SNOSf.js";
import { i as z } from "../browser-0zX67oeU.js";
import { c as B, a as H } from "../canvas-DeZ0SLUJ.js";
import { SourceElement as W } from "../source/index.js";
function A(s) {
  const n = s.match(/\{([\d-]+)\}/);
  if (n) {
    const e = n[1].split("-");
    if (e.length === 2) {
      const i = parseInt(e[0], 10), p = parseInt(e[1], 10);
      return { start: i, end: p };
    }
  }
  return null;
}
var c, v, g, l, d, E, b, w, a, f;
class D extends W {
  constructor(e) {
    super();
    h(this, c, []);
    h(this, v, new I(
      this,
      "--fit",
      "contain"
    ));
    h(this, g, new I(this, "--autoplay", !1));
    h(this, l, new I(this, "--offset-x", 0.5));
    h(this, d, new I(this, "--offset-y", 0.5));
    h(this, E, null);
    h(this, b, 0);
    h(this, w, 1);
    h(this, a, () => {
      if (t(this, c).length) {
        const e = t(this, c)[0];
        t(this, v).current === "cover" ? u(this, E, B(
          e.naturalWidth,
          e.naturalHeight,
          this.consumerElement.width,
          this.consumerElement.height,
          t(this, l).current,
          t(this, d).current
        )) : u(this, E, H(
          e.naturalWidth,
          e.naturalHeight,
          this.consumerElement.width,
          this.consumerElement.height,
          t(this, l).current,
          t(this, d).current
        ));
      }
    });
    h(this, f, (e) => {
      if (this.status.isFalse("loaded") || !t(this, E))
        return;
      e.detail.context.clearRect(0, 0, e.detail.width, e.detail.height);
      const i = t(this, c)[t(this, b)];
      i && e.detail.context.drawImage(i, ...t(this, E)), t(this, g).current && u(this, b, (t(this, b) + 1) % t(this, c).length);
    });
    z && (u(this, w, parseInt(
      ((e == null ? void 0 : e.pad) || this.getAttribute("pad") || "1").toString()
    )), t(this, v).subscribe(t(this, a)), t(this, l).subscribe(t(this, a)), t(this, d).subscribe(t(this, a)), this.addEventListener("sourceCapture", (i) => {
      this.consumerElement.addEventListener(
        "canvasRender",
        t(this, f)
      );
    }), this.addEventListener("sourceRelease", (i) => {
      this.consumerElement.removeEventListener(
        "canvasRender",
        t(this, f)
      );
    }));
  }
  setProgress(e) {
    t(this, c).length && u(this, b, Math.floor((t(this, c).length - 1) * e));
  }
  connectedCallback() {
    super.connectedCallback(), t(this, g).observe(), t(this, v).observe(), t(this, l).observe(), t(this, d).observe(), R.subscribe(this, t(this, a));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), t(this, g).unobserve(), t(this, v).unobserve(), t(this, l).unobserve(), t(this, d).unobserve(), u(this, c, []), R.unsubscribe(t(this, a)), this.consumerElement.removeEventListener(
      "canvasRender",
      t(this, f)
    );
  }
  createConsumer() {
    return new q();
  }
  consumeSource(e) {
    return P(this, null, function* () {
      var i, p, S, C;
      if (e) {
        this.consumerElement.removeEventListener(
          "canvasRender",
          t(this, f)
        );
        const m = [], o = A(e);
        if (o)
          for (let r = o.start; r <= o.end; r++) {
            const L = e.replace(
              /\{([^}]+)\}/,
              r.toString().padStart(t(this, w), "0")
            ), y = new Image();
            y.src = L, m.push(y);
          }
        else {
          const r = new Image();
          r.src = e, m.push(r);
        }
        try {
          yield Promise.all(
            m.map((r, L) => new Promise((y, k) => {
              r.onload = () => {
                y();
              }, r.onerror = (F) => {
                k(`${r.src} Image not found`);
              };
            }))
          ), u(this, c, m), t(this, a).call(this), (p = (i = this.consumerElement).onload) == null || p.call(i, new Event("load")), this.isLazy || this.consumerElement.addEventListener(
            "canvasRender",
            t(this, f)
          );
        } catch (r) {
          console.error(r), (C = (S = this.consumerElement).onerror) == null || C.call(S, new Event("error"));
        }
      }
    });
  }
}
c = new WeakMap(), v = new WeakMap(), g = new WeakMap(), l = new WeakMap(), d = new WeakMap(), E = new WeakMap(), b = new WeakMap(), w = new WeakMap(), a = new WeakMap(), f = new WeakMap();
customElements.get("e-sequence") || customElements.define("e-sequence", D);
export {
  D as SequenceElement
};
