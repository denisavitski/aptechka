var W = (i, s, o) => {
  if (!s.has(i))
    throw TypeError("Cannot " + o);
};
var e = (i, s, o) => (W(i, s, "read from private field"), o ? o.call(i) : s.get(i)), n = (i, s, o) => {
  if (s.has(i))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(i) : s.set(i, o);
}, t = (i, s, o, v) => (W(i, s, "write to private field"), v ? v.call(i, o) : s.set(i, o), o);
import { RESIZE_ORDER as k } from "./order/index.js";
import { windowResizer as A } from "./window-resizer/index.js";
import { i as C } from "./browser-0zX67oeU.js";
import { getGPUTier as z } from "detect-gpu";
import { S as O } from "./Store-Qr3SNOSf.js";
var h, d, l, c, g, m, p, x, u;
class I {
  constructor() {
    n(this, h, void 0);
    n(this, d, void 0);
    n(this, l, void 0);
    n(this, c, void 0);
    n(this, g, void 0);
    n(this, m, void 0);
    n(this, p, void 0);
    n(this, x, void 0);
    n(this, u, void 0);
    var s, o;
    if (t(this, h, "unknown"), t(this, d, "unknown"), t(this, l, 0), t(this, c, null), t(this, g, !1), t(this, m, !1), t(this, p, !1), t(this, x, !1), t(this, u, !1), this.resize = () => {
      t(this, g, /Mobi|Android/i.test(navigator.userAgent)), t(this, m, "ontouchstart" in window || navigator.maxTouchPoints > 0), setTimeout(() => {
        t(this, m, "ontouchstart" in window || navigator.maxTouchPoints > 0);
      }, 0);
    }, C) {
      t(this, c, z()), e(this, c).then((a) => {
        t(this, d, a.gpu || "unknown"), t(this, l, a.tier);
      }), this.resize(), A.subscribe(this.resize, k.DEVICE);
      {
        const a = document.createElement("canvas"), E = a.getContext("webgl") || a.getContext("experimental-webgl");
        t(this, p, E && E instanceof WebGLRenderingContext || !1);
      }
      {
        const a = document.createElement("canvas");
        a.getContext("2d") && t(this, x, a.toDataURL("image/webp").indexOf("data:image/webp") == 0);
      }
      const v = window.navigator.userAgent, P = ((o = (s = window.navigator) == null ? void 0 : s.userAgentData) == null ? void 0 : o.platform) || window.navigator.platform, D = [
        "Macintosh",
        "MacIntel",
        "MacPPC",
        "Mac68K",
        "macOS"
      ], S = ["Win32", "Win64", "Windows", "WinCE"], T = ["iPhone", "iPad", "iPod"];
      D.includes(P) ? (t(this, h, "macOS"), t(this, u, !0)) : T.includes(P) ? (t(this, h, "iOS"), t(this, u, !0)) : S.includes(P) ? t(this, h, "Windows") : /Android/.test(v) ? t(this, h, "Android") : /Linux/.test(P) ? t(this, h, "Linux") : t(this, h, "unknown");
    }
  }
  get OS() {
    return e(this, h);
  }
  get gpu() {
    return e(this, d);
  }
  get gpuTier() {
    return e(this, l);
  }
  get gpuDetection() {
    return e(this, c);
  }
  get isMobile() {
    return e(this, g);
  }
  get isTouch() {
    return e(this, m);
  }
  get isWebgl() {
    return e(this, p);
  }
  get isWebp() {
    return e(this, x);
  }
  get isApple() {
    return e(this, u);
  }
}
h = new WeakMap(), d = new WeakMap(), l = new WeakMap(), c = new WeakMap(), g = new WeakMap(), m = new WeakMap(), p = new WeakMap(), x = new WeakMap(), u = new WeakMap();
const _ = new I();
var L = /* @__PURE__ */ ((i) => (i.mobile = "600px", i.tablet = "1024px", i.notebook = "1280px", i.desktop = "1281px", i))(L || {}), M = /* @__PURE__ */ ((i) => (i["<=mobile"] = "(max-width: 600px)", i[">=mobile"] = "(min-width: 601px)", i["<=tablet"] = "(max-width: 1024px)", i[">=tablet"] = "(min-width: 1025px)", i["<=notebook"] = "(max-width: 1280px)", i[">=notebook"] = "(min-width: 1281px)", i["<=desktop"] = "(max-width: 1280px)", i[">=desktop"] = "(min-width: 1281px)", i))(M || {}), w, f, b, r;
class y {
  constructor() {
    n(this, w, void 0);
    n(this, f, void 0);
    n(this, b, void 0);
    n(this, r, void 0);
    t(this, w, 0), t(this, f, 0), t(this, b, 0), t(this, r, new O(void 0)), this.resize = () => {
      t(this, w, document.documentElement.clientWidth), t(this, f, innerHeight), t(this, b, devicePixelRatio), matchMedia(
        "(max-width: 600px)"
        /* <=mobile */
      ).matches ? e(this, r).current = "mobile" : matchMedia(
        "(max-width: 1024px)"
        /* <=tablet */
      ).matches ? e(this, r).current = "tablet" : matchMedia(
        "(max-width: 1280px)"
        /* <=notebook */
      ).matches ? e(this, r).current = "notebook" : matchMedia(
        "(min-width: 1281px)"
        /* >=desktop */
      ).matches && (e(this, r).current = "desktop");
    }, C && (this.resize(), A.subscribe(this.resize, k.DEVICE));
  }
  get width() {
    return e(this, w);
  }
  get height() {
    return e(this, f);
  }
  get type() {
    return e(this, r);
  }
  get pixelRatio() {
    return e(this, b);
  }
}
w = new WeakMap(), f = new WeakMap(), b = new WeakMap(), r = new WeakMap();
const j = new y();
export {
  L as V,
  M as a,
  _ as d,
  j as v
};
