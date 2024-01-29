var D = Object.defineProperty;
var I = (t, i, e) => i in t ? D(t, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[i] = e;
var E = (t, i, e) => (I(t, typeof i != "symbol" ? i + "" : i, e), e), v = (t, i, e) => {
  if (!i.has(t))
    throw TypeError("Cannot " + e);
};
var s = (t, i, e) => (v(t, i, "read from private field"), e ? e.call(t) : i.get(t)), a = (t, i, e) => {
  if (i.has(t))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(t) : i.set(t, e);
}, h = (t, i, e, n) => (v(t, i, "write to private field"), n ? n.call(t, e) : i.set(t, e), e);
import { i as r } from "./browser-S4eq8AeN.js";
import { g as x } from "./dom-bHEwc_xV.js";
import { Notifier as M } from "./notifier/index.js";
var y;
class b {
  constructor() {
    a(this, y, new M());
  }
  get changeEvent() {
    return s(this, y);
  }
}
y = new WeakMap();
var w, c;
class A {
  constructor() {
    a(this, w, void 0);
    a(this, c, !0);
  }
  get isIdle() {
    return s(this, c);
  }
  registerInteraction() {
    clearTimeout(s(this, w)), h(this, c, !1), h(this, w, setTimeout(() => {
      h(this, c, !0);
    }, 2e3));
  }
}
w = new WeakMap(), c = new WeakMap();
const L = new A();
var l, g;
class P extends b {
  constructor(e) {
    super();
    a(this, l, null);
    a(this, g, (e) => {
      const n = e.shiftKey ? -1 : 1;
      let u = !0;
      e.code === "Space" ? this.changeEvent.notify(n * 500) : e.code === "ArrowLeft" ? this.changeEvent.notify(-1 * 100) : e.code === "ArrowRight" ? this.changeEvent.notify(1 * 100) : e.code === "ArrowUp" ? this.changeEvent.notify(-1 * 100) : e.code === "ArrowDown" ? this.changeEvent.notify(1 * 100) : e.code === "PageUp" ? this.changeEvent.notify(-1 * 1e3) : e.code === "PageDown" ? this.changeEvent.notify(1 * 1e3) : e.code === "Home" ? this.changeEvent.notify("min") : e.code === "End" ? this.changeEvent.notify("max") : u = !1, u && L.registerInteraction();
    });
    r && h(this, l, e != null && e.element && x(e.element) || window);
  }
  connect() {
    r && s(this, l).addEventListener("keydown", s(this, g));
  }
  disconnect() {
    r && s(this, l).removeEventListener("keydown", s(this, g));
  }
}
l = new WeakMap(), g = new WeakMap();
var d, f, o, m;
class U extends b {
  constructor(e) {
    super();
    E(this, "axis");
    E(this, "speed");
    E(this, "debounce");
    a(this, d, null);
    a(this, f, void 0);
    a(this, o, void 0);
    a(this, m, (e) => {
      let n = 0;
      if (!(this.axis === "x" && Math.abs(e.deltaY) > Math.abs(e.deltaX) || this.axis === "y" && Math.abs(e.deltaX) > Math.abs(e.deltaY)))
        if (n = (this.axis === "x" ? e.deltaX : e.deltaY) * this.speed, L.registerInteraction(), e.stopPropagation(), e.preventDefault(), this.debounce) {
          const u = Date.now();
          if (u - s(this, o) > 40 && (n = 100 * Math.sign(n)), h(this, o, u), Math.abs(n) < 100 || s(this, f))
            return;
          this.changeEvent.notify(n), h(this, f, setTimeout(() => {
            h(this, f, void 0);
          }, 80));
        } else
          this.changeEvent.notify(n);
    });
    this.axis = (e == null ? void 0 : e.axis) || "y", this.speed = (e == null ? void 0 : e.speed) || 1, this.debounce = (e == null ? void 0 : e.debounce) || !1, h(this, o, Date.now()), r && h(this, d, e != null && e.element && x(e.element) || window);
  }
  connect() {
    r && s(this, d).addEventListener("wheel", s(this, m), {
      passive: !1
    });
  }
  disconnect() {
    r && s(this, d).removeEventListener("wheel", s(this, m));
  }
}
d = new WeakMap(), f = new WeakMap(), o = new WeakMap(), m = new WeakMap();
export {
  b as C,
  P as K,
  U as W,
  L as u
};
