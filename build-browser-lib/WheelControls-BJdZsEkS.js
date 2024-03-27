var g = (t, s, e) => {
  if (!s.has(t))
    throw TypeError("Cannot " + e);
};
var i = (t, s, e) => (g(t, s, "read from private field"), e ? e.call(t) : s.get(t)), h = (t, s, e) => {
  if (s.has(t))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(t) : s.set(t, e);
}, l = (t, s, e, r) => (g(t, s, "write to private field"), r ? r.call(t, e) : s.set(t, e), e);
import { i as d } from "./browser-0zX67oeU.js";
import { g as x } from "./dom-BY7JhTx5.js";
import { Notifier as b } from "./notifier/index.js";
var u;
class E {
  constructor() {
    h(this, u, new b());
  }
  get changeEvent() {
    return i(this, u);
  }
}
u = new WeakMap();
var n, m;
class D extends E {
  constructor(e) {
    super();
    h(this, n, null);
    h(this, m, (e) => {
      const r = e.shiftKey ? -1 : 1;
      let a;
      e.code === "Space" ? a = r * 500 : e.code === "ArrowLeft" ? a = -1 * 100 : e.code === "ArrowRight" ? a = 1 * 100 : e.code === "ArrowUp" ? a = -1 * 100 : e.code === "ArrowDown" ? a = 1 * 100 : e.code === "PageUp" ? a = -1 * 1e3 : e.code === "PageDown" ? a = 1 * 1e3 : e.code === "Home" ? a = "min" : e.code === "End" && (a = "max"), a && (e.stopPropagation(), this.changeEvent.notify(a));
    });
    d && l(this, n, e != null && e.element && x(e.element) || window);
  }
  connect() {
    d && i(this, n).addEventListener(
      "keydown",
      i(this, m)
    );
  }
  disconnect() {
    d && i(this, n).removeEventListener(
      "keydown",
      i(this, m)
    );
  }
}
n = new WeakMap(), m = new WeakMap();
var c, f, w, o;
class X extends E {
  constructor(e) {
    super();
    h(this, c, null);
    h(this, f, void 0);
    h(this, w, void 0);
    h(this, o, (e) => {
      let r = 0;
      if (!(this.axis === "x" && Math.abs(e.deltaY) > Math.abs(e.deltaX) || this.axis === "y" && Math.abs(e.deltaX) > Math.abs(e.deltaY)))
        if (r = (this.axis === "max" ? Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY : this.axis === "x" ? e.deltaX : e.deltaY) * this.speed, e.stopPropagation(), e.preventDefault(), this.debounce) {
          const a = Date.now();
          if (a - i(this, w) > 40 && (r = 100 * Math.sign(r)), l(this, w, a), Math.abs(r) < 100 || i(this, f))
            return;
          this.changeEvent.notify(r), l(this, f, setTimeout(() => {
            l(this, f, void 0);
          }, 80));
        } else
          this.changeEvent.notify(r);
    });
    this.axis = (e == null ? void 0 : e.axis) || "y", this.speed = (e == null ? void 0 : e.speed) || 1, this.debounce = (e == null ? void 0 : e.debounce) || !1, l(this, w, Date.now()), d && l(this, c, e != null && e.element && x(e.element) || window);
  }
  connect() {
    d && i(this, c).addEventListener(
      "wheel",
      i(this, o),
      {
        passive: !1
      }
    );
  }
  disconnect() {
    d && i(this, c).removeEventListener(
      "wheel",
      i(this, o)
    );
  }
}
c = new WeakMap(), f = new WeakMap(), w = new WeakMap(), o = new WeakMap();
export {
  E as C,
  D as K,
  X as W
};
