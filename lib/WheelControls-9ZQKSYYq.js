var x = Object.defineProperty;
var b = (t, i, e) => i in t ? x(t, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[i] = e;
var g = (t, i, e) => (b(t, typeof i != "symbol" ? i + "" : i, e), e), y = (t, i, e) => {
  if (!i.has(t))
    throw TypeError("Cannot " + e);
};
var s = (t, i, e) => (y(t, i, "read from private field"), e ? e.call(t) : i.get(t)), a = (t, i, e) => {
  if (i.has(t))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(t) : i.set(t, e);
}, h = (t, i, e, n) => (y(t, i, "write to private field"), n ? n.call(t, e) : i.set(t, e), e);
import { i as r } from "./browser-S4eq8AeN.js";
import { g as u } from "./dom-bHEwc_xV.js";
import { Notifier as L } from "./notifier/index.js";
var m;
class v {
  constructor() {
    a(this, m, new L());
  }
  get changeEvent() {
    return s(this, m);
  }
}
m = new WeakMap();
var c, o;
class k extends v {
  constructor(e) {
    super();
    a(this, c, null);
    a(this, o, (e) => {
      const n = e.shiftKey ? -1 : 1;
      e.code === "Space" ? this.changeEvent.notify(n * 500) : e.code === "ArrowLeft" ? this.changeEvent.notify(-1 * 100) : e.code === "ArrowRight" ? this.changeEvent.notify(1 * 100) : e.code === "ArrowUp" ? this.changeEvent.notify(-1 * 100) : e.code === "ArrowDown" ? this.changeEvent.notify(1 * 100) : e.code === "PageUp" ? this.changeEvent.notify(-1 * 1e3) : e.code === "PageDown" ? this.changeEvent.notify(1 * 1e3) : e.code === "Home" ? this.changeEvent.notify("min") : e.code === "End" && this.changeEvent.notify("max");
    });
    r && h(this, c, e != null && e.element && u(e.element) || window);
  }
  connect() {
    r && s(this, c).addEventListener("keydown", s(this, o));
  }
  disconnect() {
    r && s(this, c).removeEventListener("keydown", s(this, o));
  }
}
c = new WeakMap(), o = new WeakMap();
var d, l, f, w;
class K extends v {
  constructor(e) {
    super();
    g(this, "axis");
    g(this, "speed");
    g(this, "debounce");
    a(this, d, null);
    a(this, l, void 0);
    a(this, f, void 0);
    a(this, w, (e) => {
      let n = 0;
      if (!(this.axis === "x" && Math.abs(e.deltaY) > Math.abs(e.deltaX) || this.axis === "y" && Math.abs(e.deltaX) > Math.abs(e.deltaY)))
        if (n = (this.axis === "x" ? e.deltaX : e.deltaY) * this.speed, e.stopPropagation(), e.preventDefault(), this.debounce) {
          const E = Date.now();
          if (E - s(this, f) > 40 && (n = 100 * Math.sign(n)), h(this, f, E), Math.abs(n) < 100 || s(this, l))
            return;
          this.changeEvent.notify(n), h(this, l, setTimeout(() => {
            h(this, l, void 0);
          }, 80));
        } else
          this.changeEvent.notify(n);
    });
    this.axis = (e == null ? void 0 : e.axis) || "y", this.speed = (e == null ? void 0 : e.speed) || 1, this.debounce = (e == null ? void 0 : e.debounce) || !1, h(this, f, Date.now()), r && h(this, d, e != null && e.element && u(e.element) || window);
  }
  connect() {
    r && s(this, d).addEventListener("wheel", s(this, w), {
      passive: !1
    });
  }
  disconnect() {
    r && s(this, d).removeEventListener("wheel", s(this, w));
  }
}
d = new WeakMap(), l = new WeakMap(), f = new WeakMap(), w = new WeakMap();
export {
  v as C,
  k as K,
  K as W
};
