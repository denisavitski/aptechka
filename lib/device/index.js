var W = (t, n, o) => {
  if (!n.has(t))
    throw TypeError("Cannot " + o);
};
var i = (t, n, o) => (W(t, n, "read from private field"), o ? o.call(t) : n.get(t)), s = (t, n, o) => {
  if (n.has(t))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(t) : n.set(t, o);
}, e = (t, n, o, v) => (W(t, n, "write to private field"), v ? v.call(t, o) : n.set(t, o), o);
import { RESIZE_ORDER as k } from "../order/index.js";
import { resizer as A } from "../resizer/index.js";
import { i as C } from "../browser-S4eq8AeN.js";
import { getGPUTier as O } from "detect-gpu";
import { S as I } from "../Store-qq7IjRLE.js";
import "../notifier/index.js";
import "../function-zwSFehNd.js";
var r, d, l, c, g, m, p, x, u;
class L {
  constructor() {
    s(this, r, "unknown");
    s(this, d, "unknown");
    s(this, l, 0);
    s(this, c, null);
    s(this, g, !1);
    s(this, m, !1);
    s(this, p, !1);
    s(this, x, !1);
    s(this, u, !1);
    var n, o;
    if (C) {
      e(this, c, O()), i(this, c).then((a) => {
        e(this, d, a.gpu || "unknown"), e(this, l, a.tier);
      }), A.subscribe(() => {
        e(this, g, /Mobi|Android/i.test(navigator.userAgent)), e(this, m, "ontouchstart" in window || navigator.maxTouchPoints > 0), setTimeout(() => {
          e(this, m, "ontouchstart" in window || navigator.maxTouchPoints > 0);
        }, 0);
      }, k.DEVICE);
      {
        const a = document.createElement("canvas"), E = a.getContext("webgl") || a.getContext("experimental-webgl");
        e(this, p, E && E instanceof WebGLRenderingContext || !1);
      }
      {
        const a = document.createElement("canvas");
        a.getContext("2d") && e(this, x, a.toDataURL("image/webp").indexOf("data:image/webp") == 0);
      }
      const v = window.navigator.userAgent, P = ((o = (n = window.navigator) == null ? void 0 : n.userAgentData) == null ? void 0 : o.platform) || window.navigator.platform, D = ["Macintosh", "MacIntel", "MacPPC", "Mac68K", "macOS"], S = ["Win32", "Win64", "Windows", "WinCE"], T = ["iPhone", "iPad", "iPod"];
      D.includes(P) ? (e(this, r, "macOS"), e(this, u, !0)) : T.includes(P) ? (e(this, r, "iOS"), e(this, u, !0)) : S.includes(P) ? e(this, r, "Windows") : /Android/.test(v) ? e(this, r, "Android") : /Linux/.test(P) ? e(this, r, "Linux") : e(this, r, "unknown");
    }
  }
  get OS() {
    return i(this, r);
  }
  get gpu() {
    return i(this, d);
  }
  get gpuTier() {
    return i(this, l);
  }
  get gpuDetection() {
    return i(this, c);
  }
  get isMobile() {
    return i(this, g);
  }
  get isTouch() {
    return i(this, m);
  }
  get isWebgl() {
    return i(this, p);
  }
  get isWebp() {
    return i(this, x);
  }
  get isApple() {
    return i(this, u);
  }
}
r = new WeakMap(), d = new WeakMap(), l = new WeakMap(), c = new WeakMap(), g = new WeakMap(), m = new WeakMap(), p = new WeakMap(), x = new WeakMap(), u = new WeakMap();
const q = new L();
var M = /* @__PURE__ */ ((t) => (t.mobile = "600px", t.tablet = "1024px", t.notebook = "1280px", t.desktop = "1281px", t))(M || {}), _ = /* @__PURE__ */ ((t) => (t["<=mobile"] = "(max-width: 600px)", t[">=mobile"] = "(min-width: 601px)", t["<=tablet"] = "(max-width: 1024px)", t[">=tablet"] = "(min-width: 1025px)", t["<=notebook"] = "(max-width: 1280px)", t[">=notebook"] = "(min-width: 1281px)", t["<=desktop"] = "(max-width: 1280px)", t[">=desktop"] = "(min-width: 1281px)", t))(_ || {}), w, f, b, h;
class y {
  constructor() {
    s(this, w, 0);
    s(this, f, 0);
    s(this, b, 0);
    s(this, h, new I(void 0));
    C && A.subscribe(() => {
      e(this, w, document.documentElement.clientWidth), e(this, f, innerHeight), e(this, b, devicePixelRatio), matchMedia(
        "(max-width: 600px)"
        /* <=mobile */
      ).matches ? i(this, h).current = "mobile" : matchMedia(
        "(max-width: 1024px)"
        /* <=tablet */
      ).matches ? i(this, h).current = "tablet" : matchMedia(
        "(max-width: 1280px)"
        /* <=notebook */
      ).matches ? i(this, h).current = "notebook" : matchMedia(
        "(min-width: 1281px)"
        /* >=desktop */
      ).matches && (i(this, h).current = "desktop");
    }, k.DEVICE);
  }
  get width() {
    return i(this, w);
  }
  get height() {
    return i(this, f);
  }
  get store_type() {
    return i(this, h);
  }
  get pixelRatio() {
    return i(this, b);
  }
}
w = new WeakMap(), f = new WeakMap(), b = new WeakMap(), h = new WeakMap();
const F = new y();
export {
  M as ViewportBreakpoints,
  _ as ViewportMediaRules,
  q as device,
  F as viewport
};
