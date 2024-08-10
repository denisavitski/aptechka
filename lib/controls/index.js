var S = (a, n, e) => {
  if (!n.has(a))
    throw TypeError("Cannot " + e);
};
var t = (a, n, e) => (S(a, n, "read from private field"), e ? e.call(a) : n.get(a)), s = (a, n, e) => {
  if (n.has(a))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(a) : n.set(a, e);
}, i = (a, n, e, r) => (S(a, n, "write to private field"), r ? r.call(a, e) : n.set(a, e), e);
var L = (a, n, e) => (S(a, n, "access private method"), e);
import { Notifier as j } from "../notifier/index.js";
import { i as m } from "../browser-0zX67oeU.js";
import { a as Q } from "../dom-P5QbAASX.js";
import { ticker as M } from "../ticker/index.js";
import "../Store-Qr3SNOSf.js";
import { e as G } from "../easings-BKi40vHz.js";
import { T as J } from "../Tweened-CjgvoOwL.js";
import { s as Z } from "../gestures-D2Fdra_G.js";
import { p as $ } from "../polyfills-X6KXuHg-.js";
import { TICK_ORDER as p } from "../order/index.js";
var B;
class F {
  constructor() {
    s(this, B, new j());
  }
  get changeEvent() {
    return t(this, B);
  }
}
B = new WeakMap();
var w, c, f, P;
class ce extends F {
  constructor(e) {
    super();
    s(this, w, null);
    s(this, c, null);
    s(this, f, "offsetHeight");
    s(this, P, (e) => {
      const r = e.shiftKey ? -1 : 1;
      let h;
      e.code === "Space" ? h = r * t(this, c)[t(this, f)] * 0.4 : e.code === "ArrowLeft" ? h = -1 * t(this, c)[t(this, f)] * 0.2 : e.code === "ArrowRight" ? h = 1 * t(this, c)[t(this, f)] * 0.2 : e.code === "ArrowUp" ? h = -1 * t(this, c)[t(this, f)] * 0.2 : e.code === "ArrowDown" ? h = 1 * t(this, c)[t(this, f)] * 0.2 : e.code === "PageUp" ? h = -1 * t(this, c)[t(this, f)] : e.code === "PageDown" ? h = 1 * t(this, c)[t(this, f)] : e.code === "Home" ? h = 0 : e.code === "End" && (h = t(this, f) === "offsetWidth" ? t(this, c).scrollWidth : t(this, c).scrollHeight), h && (e.stopPropagation(), this.changeEvent.notify("keyboard", h));
    });
    m && (i(this, w, e != null && e.element && Q(e.element) || window), i(this, c, t(this, w) instanceof HTMLElement ? t(this, w) : document.documentElement), this.dimension = e == null ? void 0 : e.dimension);
  }
  set dimension(e) {
    i(this, f, e === "width" ? "offsetWidth" : "offsetHeight");
  }
  connect() {
    m && t(this, w).addEventListener(
      "keydown",
      t(this, P)
    );
  }
  disconnect() {
    m && t(this, w).removeEventListener(
      "keydown",
      t(this, P)
    );
  }
}
w = new WeakMap(), c = new WeakMap(), f = new WeakMap(), P = new WeakMap();
var b, E, X, Y, l, I, u, T, q, R, U, k, W, C;
class fe extends F {
  constructor(e) {
    super();
    s(this, T);
    s(this, R);
    s(this, b, void 0);
    s(this, E, void 0);
    s(this, X, void 0);
    s(this, Y, void 0);
    s(this, l, void 0);
    s(this, I, void 0);
    s(this, u, void 0);
    s(this, k, void 0);
    s(this, W, void 0);
    s(this, C, void 0);
    this.direction = 1, i(this, l, new J(0, { easing: G })), i(this, u, !1), i(this, k, (r) => {
      t(this, l).current !== 1 && this.changeEvent.notify(
        "autoplay",
        r.timeBetweenFrames * t(this, b) * this.direction * (1 - t(this, l).current)
      );
    }), i(this, W, () => {
      t(this, l).current !== 1 && this.changeEvent.notify(
        "autoplay",
        Math.sign(t(this, b)) * this.direction * (1 - t(this, l).current)
      );
    }), i(this, C, () => {
      t(this, E) && (document.hidden ? t(this, l).set(1, { equalize: !0 }) : t(this, l).set(0, { equalize: !0 }));
    }), i(this, b, (e == null ? void 0 : e.speed) || 1), i(this, E, (e == null ? void 0 : e.interval) || !1), i(this, X, e);
  }
  set interval(e) {
    i(this, E, e), t(this, u) && L(this, T, q).call(this);
  }
  set speed(e) {
    i(this, b, e), t(this, u) && L(this, T, q).call(this);
  }
  connect() {
    t(this, u) || (i(this, u, !0), L(this, T, q).call(this));
  }
  disconnect() {
    t(this, u) && (i(this, u, !1), L(this, R, U).call(this));
  }
  pauseAndContinue(e) {
    e && !t(this, l).target && (clearInterval(t(this, I)), t(this, l).set(1, { duration: Math.min(e, 1e3) }), i(this, I, setTimeout(() => {
      t(this, l).set(0, { duration: Math.min(e, 5e3) });
    }, e)));
  }
}
b = new WeakMap(), E = new WeakMap(), X = new WeakMap(), Y = new WeakMap(), l = new WeakMap(), I = new WeakMap(), u = new WeakMap(), T = new WeakSet(), q = function() {
  L(this, R, U).call(this), t(this, E) ? i(this, Y, setInterval(
    t(this, W),
    Math.abs(t(this, b))
  )) : M.subscribe(t(this, k), t(this, X)), document.addEventListener(
    "visibilitychange",
    t(this, C)
  );
}, R = new WeakSet(), U = function() {
  clearInterval(t(this, Y)), M.unsubscribe(t(this, k)), clearInterval(t(this, I)), t(this, l).close(), document.removeEventListener(
    "visibilitychange",
    t(this, C)
  );
}, k = new WeakMap(), W = new WeakMap(), C = new WeakMap();
var A, y, D, z;
class ue extends F {
  constructor(e) {
    super();
    s(this, A, null);
    s(this, y, void 0);
    s(this, D, void 0);
    s(this, z, (e) => {
      let r = 0;
      if (e.preventDefault(), !(this.axis === "x" && Math.abs(e.deltaY) > Math.abs(e.deltaX) * 0.5 || this.axis === "y" && Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.5))
        if (r = (this.axis === "max" ? Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY : this.axis === "x" ? e.deltaX : e.deltaY) * this.speed, e.stopPropagation(), this.debounce) {
          const h = Date.now();
          if (h - t(this, D) > 40 && (r = 100 * Math.sign(r)), i(this, D, h), Math.abs(r) < 100 || t(this, y))
            return;
          this.changeEvent.notify("wheel", r), i(this, y, setTimeout(() => {
            i(this, y, void 0);
          }, 80));
        } else
          this.changeEvent.notify("wheel", r);
    });
    this.axis = (e == null ? void 0 : e.axis) || "y", this.speed = (e == null ? void 0 : e.speed) || 1, this.debounce = (e == null ? void 0 : e.debounce) || !1, i(this, D, Date.now()), m && i(this, A, e != null && e.element && Q(e.element) || window);
  }
  connect() {
    m && t(this, A).addEventListener(
      "wheel",
      t(this, z),
      {
        passive: !1
      }
    );
  }
  disconnect() {
    m && (t(this, A).removeEventListener(
      "wheel",
      t(this, z)
    ), clearTimeout(t(this, y)));
  }
}
A = new WeakMap(), y = new WeakMap(), D = new WeakMap(), z = new WeakMap();
var v, o, H, d, K, x;
const g = class g extends F {
  constructor(e) {
    super();
    s(this, o, null);
    s(this, H, !1);
    s(this, d, 0);
    s(this, K, (e) => {
      if (e.composedPath().find(
        (h) => h instanceof HTMLElement && h.hasAttribute("drag-dead-zone")
      ))
        return;
      this.swipe || M.unsubscribe(t(this, x));
      let r = e;
      i(this, d, 0), document.documentElement.classList.add("grabbing"), Z(
        (h) => {
          if (t(this, H) || t(g, v) && t(g, v) !== t(this, o))
            return;
          this.swipe && i(this, H, !0);
          const N = r.x - h.x, O = r.y - h.y;
          this.axis === "x" ? i(this, d, N) : i(this, d, O), r = h, (this.axis === "x" && Math.abs(N) > Math.abs(O) || this.axis === "y" && Math.abs(O) > Math.abs(N)) && (i(g, v, t(this, o)), this.changeEvent.notify("drag", t(this, d)));
        },
        () => {
          i(g, v, null), this.swipe || (i(this, d, t(this, d) * 3), M.subscribe(t(this, x), { order: p.SCROLL - 1 })), document.documentElement.classList.remove("grabbing"), i(this, H, !1);
        }
      );
    });
    s(this, x, () => {
      Math.floor(t(this, d)) || M.unsubscribe(t(this, x)), i(this, d, t(this, d) * 0.95), i(this, d, $(t(this, d), 3)), this.changeEvent.notify("drag", t(this, d));
    });
    this.axis = (e == null ? void 0 : e.axis) || "y", this.swipe = (e == null ? void 0 : e.swipe) || !1, m && i(this, o, e != null && e.element && Q(e.element) || document.documentElement);
  }
  connect() {
    m && t(this, o).addEventListener("pointerdown", t(this, K));
  }
  disconnect() {
    m && (t(this, o).removeEventListener(
      "pointerdown",
      t(this, K)
    ), M.unsubscribe(t(this, x)));
  }
};
v = new WeakMap(), o = new WeakMap(), H = new WeakMap(), d = new WeakMap(), K = new WeakMap(), x = new WeakMap(), s(g, v, null);
let V = g;
export {
  fe as AutoplayControls,
  F as Controls,
  V as DragControls,
  ce as KeyboardControls,
  ue as WheelControls
};
