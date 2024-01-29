var it = Object.defineProperty;
var Z = (i, t) => (t = Symbol[i]) ? t : Symbol.for("Symbol." + i);
var rt = (i, t, s) => t in i ? it(i, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : i[t] = s;
var K = (i, t, s) => (rt(i, typeof t != "symbol" ? t + "" : t, s), s), G = (i, t, s) => {
  if (!t.has(i))
    throw TypeError("Cannot " + s);
};
var e = (i, t, s) => (G(i, t, "read from private field"), s ? s.call(i) : t.get(i)), o = (i, t, s) => {
  if (t.has(i))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(i) : t.set(i, s);
}, n = (i, t, s, r) => (G(i, t, "write to private field"), r ? r.call(i, s) : t.set(i, s), s);
var J = (i, t, s) => (G(i, t, "access private method"), s);
var W = (i, t, s) => new Promise((r, l) => {
  var a = (f) => {
    try {
      d(s.next(f));
    } catch (T) {
      l(T);
    }
  }, u = (f) => {
    try {
      d(s.throw(f));
    } catch (T) {
      l(T);
    }
  }, d = (f) => f.done ? r(f.value) : Promise.resolve(f.value).then(a, u);
  d((s = s.apply(i, t)).next());
});
var Q = (i, t, s) => (t = i[Z("asyncIterator")]) ? t.call(i) : (i = i[Z("iterator")](), t = {}, s = (r, l) => (l = i[r]) && (t[r] = (a) => new Promise((u, d, f) => (a = l.call(i, a), f = a.done, Promise.resolve(a.value).then((T) => u({ value: T, done: f }), d)))), s("next"), s("return"), t);
import { URLPattern as ot } from "urlpattern-polyfill";
import { Notifier as nt } from "../notifier/index.js";
import { i as tt } from "../browser-S4eq8AeN.js";
import { d as at } from "../function-zwSFehNd.js";
import { CustomElement as ht } from "../custom-element/index.js";
var R, H, b, m, c, P, A, v, w, E, Y, et;
class ct {
  constructor(t, s) {
    o(this, Y);
    o(this, R, void 0);
    o(this, H, void 0);
    o(this, b, void 0);
    o(this, m, void 0);
    o(this, c, void 0);
    o(this, P, void 0);
    o(this, A, void 0);
    o(this, v, null);
    o(this, w, []);
    o(this, E, []);
    n(this, R, t), n(this, H, s), n(this, b, new URLPattern({ pathname: e(this, R) })), n(this, m, null), n(this, c, null), n(this, P, !1), n(this, A, null), tt && n(this, v, new MutationObserver((r) => {
      r[0].addedNodes.forEach((a) => {
        e(this, m) ? e(this, E).push(a) : e(this, w).push(a);
      });
    }));
  }
  get pattern() {
    return e(this, R);
  }
  get urlPattern() {
    return e(this, b);
  }
  get isActive() {
    return e(this, P);
  }
  get element() {
    return e(this, c);
  }
  get outlet() {
    return e(this, A);
  }
  testPathname(t) {
    return this.urlPattern.test({ pathname: t });
  }
  render(t, s) {
    return W(this, null, function* () {
      var r, l;
      if (e(this, v).observe(document.head, { childList: !0, subtree: !0 }), e(this, m))
        e(this, w).forEach((a) => {
          document.head.appendChild(a);
        });
      else {
        const a = yield e(this, H).call(this);
        n(this, E, [...e(this, w)]), typeof a.default == "function" && (n(this, m, a.default), customElements.define("e-" + ((r = e(this, m)) == null ? void 0 : r.name.toLowerCase()), a.default));
      }
      if (yield J(this, Y, et).call(this), e(this, m)) {
        const a = e(this, b).exec({ pathname: s }), u = (a == null ? void 0 : a.pathname.groups) || {}, d = Object.fromEntries(new URLSearchParams(location.search)), f = {
          pathnameParams: u,
          searchParams: d
        };
        n(this, c, new (e(this, m))(f)), t.appendChild(e(this, c)), n(this, A, e(this, c).querySelector("[data-outlet]") || ((l = e(this, c).shadowRoot) == null ? void 0 : l.querySelector("[data-outlet]")) || e(this, c).shadowRoot || e(this, c)), n(this, P, !0);
      }
      e(this, v).disconnect();
    });
  }
  close() {
    var t;
    e(this, v).disconnect(), (t = e(this, c)) == null || t.remove(), n(this, P, !1), e(this, E).forEach((s) => document.head.removeChild(s)), n(this, E, []);
  }
  getAnchorElements() {
    var s;
    let t = [];
    return e(this, c) && (t = [...e(this, c).querySelectorAll("a")]), (s = e(this, c)) != null && s.shadowRoot && (t = [...t, ...e(this, c).shadowRoot.querySelectorAll("a")]), t;
  }
}
R = new WeakMap(), H = new WeakMap(), b = new WeakMap(), m = new WeakMap(), c = new WeakMap(), P = new WeakMap(), A = new WeakMap(), v = new WeakMap(), w = new WeakMap(), E = new WeakMap(), Y = new WeakSet(), et = function() {
  return W(this, null, function* () {
    const t = e(this, w).filter((u) => u instanceof HTMLElement ? u.tagName === "STYLE" || u.tagName === "SCRIPT" || u.tagName === "LINK" : !1);
    try {
      for (var s = Q(t), r, l, a; r = !(l = yield s.next()).done; r = !1) {
        const u = l.value;
        yield new Promise((d) => {
          u.onload = () => {
            d();
          };
        });
      }
    } catch (l) {
      a = [l];
    } finally {
      try {
        r && (l = s.return) && (yield l.call(s));
      } finally {
        if (a)
          throw a[0];
      }
    }
  });
};
var O, p, S, x, I;
class lt {
  constructor(t, s) {
    o(this, O, void 0);
    o(this, p, void 0);
    o(this, S, void 0);
    o(this, x, void 0);
    o(this, I, (t) => {
      t.preventDefault(), e(this, O).navigate(e(this, S), e(this, x));
    });
    n(this, O, t), n(this, p, s), n(this, S, e(this, p).getAttribute("href") || "/"), n(this, x, e(this, p).getAttribute("data-history-action") || "push"), e(this, p).addEventListener("click", e(this, I)), location.pathname === e(this, S) && e(this, p).classList.add("current");
  }
  destroy() {
    e(this, p).removeEventListener("click", e(this, I)), e(this, p).classList.remove("current");
  }
}
O = new WeakMap(), p = new WeakMap(), S = new WeakMap(), x = new WeakMap(), I = new WeakMap();
globalThis.URLPattern = ot;
var k, N, g, C, M, L, q, j, $, z, st, F;
const U = class U {
  constructor(t) {
    o(this, z);
    o(this, k, null);
    o(this, N, void 0);
    o(this, g, []);
    o(this, C, null);
    o(this, M, []);
    o(this, L, void 0);
    o(this, q, null);
    o(this, j, new nt());
    K(this, "preprocessor");
    K(this, "postprocessor");
    o(this, $, at(() => {
      const t = (s) => s.split("/").length;
      n(this, g, e(this, g).sort((s, r) => t(s.pattern) - t(r.pattern))), this.navigate(location.pathname.replace(e(this, N), ""));
    }, 0));
    o(this, F, (t) => {
      t.state && this.navigate(t.state, "none");
    });
    n(this, N, (t == null ? void 0 : t.base) || ""), U.active = this, tt && (n(this, k, (t == null ? void 0 : t.rootElement) || document.body), addEventListener("popstate", e(this, F)));
  }
  get currentPathname() {
    return e(this, q);
  }
  get candidatePathname() {
    return e(this, L);
  }
  get routes() {
    return e(this, g);
  }
  navigationEvent(t) {
    return e(this, j).subscribe(t);
  }
  defineRoute(t, s) {
    const r = new ct(t, s);
    e(this, g).push(r), e(this, $).call(this);
  }
  navigate(t, s = "push") {
    return W(this, null, function* () {
      var f, V;
      if (e(this, L) === t || e(this, q) === t)
        return;
      U.active = this, n(this, L, t);
      const r = e(this, g).filter((h) => h.isActive), l = e(this, g).filter(
        (h) => !r.includes(h) && h.testPathname(t)
      ), a = r.filter((h) => !h.testPathname(t)), u = r.filter((h) => h.testPathname(t));
      let d = !0;
      if (this.preprocessor)
        try {
          yield new Promise((h, y) => {
            var X;
            (X = this.preprocessor) == null || X.call(this, { pathname: t, resolve: h, reject: y });
          });
        } catch (h) {
          h ? console.error(h) : console.log("Route change canceled"), d = !1;
        }
      if (d && e(this, L) === t) {
        n(this, C, u[u.length - 1]), a.forEach((y) => {
          y.close();
        }), n(this, q, t);
        try {
          for (var T = Q(l), Et, Lt, yt; Et = !(Lt = yield T.next()).done; Et = !1) {
            const y = Lt.value;
            yield y.render(((f = e(this, C)) == null ? void 0 : f.outlet) || e(this, k), t), n(this, C, y);
          }
        } catch (Lt) {
          yt = [Lt];
        } finally {
          try {
            Et && (Lt = T.return) && (yield Lt.call(T));
          } finally {
            if (yt)
              throw yt[0];
          }
        }
        const h = e(this, N) + t + location.search;
        s === "push" ? history.pushState(h, "", h) : s === "replace" && history.replaceState(h, "", h), J(this, z, st).call(this), (V = this.postprocessor) == null || V.call(this, { pathname: t }), e(this, j).notify({ pathname: t });
      }
    });
  }
};
k = new WeakMap(), N = new WeakMap(), g = new WeakMap(), C = new WeakMap(), M = new WeakMap(), L = new WeakMap(), q = new WeakMap(), j = new WeakMap(), $ = new WeakMap(), z = new WeakSet(), st = function() {
  const t = e(this, g).filter((r) => r.isActive), s = Array.from(
    new Set(
      [
        ...e(this, k).querySelectorAll("a"),
        ...t.map((r) => r.getAnchorElements()).flat()
      ].filter((r) => {
        var l;
        return (l = r.getAttribute("href")) == null ? void 0 : l.startsWith("/");
      })
    )
  );
  e(this, M).forEach((r) => {
    r.destroy();
  }), n(this, M, s.map((r) => new lt(this, r)));
}, F = new WeakMap(), K(U, "active");
let _ = U;
var B, D;
class Pt extends ht {
  constructor(s) {
    super();
    o(this, B, void 0);
    o(this, D, void 0);
    n(this, B, s.pathnameParams), n(this, D, s.searchParams);
  }
  get pathnameParams() {
    return e(this, B);
  }
  get searchParams() {
    return e(this, D);
  }
}
B = new WeakMap(), D = new WeakMap();
export {
  Pt as RouteElement,
  _ as Router
};
