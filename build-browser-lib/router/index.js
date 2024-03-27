var Q = (n, t) => (t = Symbol[n]) ? t : Symbol.for("Symbol." + n);
var $ = (n, t, s) => {
  if (!t.has(n))
    throw TypeError("Cannot " + s);
};
var e = (n, t, s) => ($(n, t, "read from private field"), s ? s.call(n) : t.get(n)), o = (n, t, s) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, s);
}, r = (n, t, s, i) => ($(n, t, "write to private field"), i ? i.call(n, s) : t.set(n, s), s);
var z = (n, t, s) => ($(n, t, "access private method"), s);
var j = (n, t, s) => new Promise((i, f) => {
  var h = (u) => {
    try {
      d(s.next(u));
    } catch (T) {
      f(T);
    }
  }, a = (u) => {
    try {
      d(s.throw(u));
    } catch (T) {
      f(T);
    }
  }, d = (u) => u.done ? i(u.value) : Promise.resolve(u.value).then(h, a);
  d((s = s.apply(n, t)).next());
});
var F = (n, t, s) => (t = n[Q("asyncIterator")]) ? t.call(n) : (n = n[Q("iterator")](), t = {}, s = (i, f) => (f = n[i]) && (t[i] = (h) => new Promise((a, d, u) => (h = f.call(n, h), u = h.done, Promise.resolve(h.value).then((T) => a({ value: T, done: u }), d)))), s("next"), s("return"), t);
import { URLPattern as et } from "urlpattern-polyfill";
import { Notifier as st } from "../notifier/index.js";
import { i as Z } from "../browser-0zX67oeU.js";
import { d as it } from "../function-C10DGppn.js";
import "../Store-JOKrNVEr.js";
import { i as V } from "../object-R34VLqhp.js";
import { i as nt } from "../instantiate-BYzkD4SE.js";
var R, U, b, m, l, w, A, v, P, E, B, _;
class rt {
  constructor(t, s) {
    o(this, B);
    o(this, R, void 0);
    o(this, U, void 0);
    o(this, b, void 0);
    o(this, m, void 0);
    o(this, l, void 0);
    o(this, w, void 0);
    o(this, A, void 0);
    o(this, v, null);
    o(this, P, []);
    o(this, E, []);
    r(this, R, t), r(this, U, s), r(this, b, new URLPattern({ pathname: e(this, R) })), r(this, m, null), r(this, l, null), r(this, w, !1), r(this, A, null), Z && r(this, v, new MutationObserver((i) => {
      i[0].addedNodes.forEach((h) => {
        e(this, m) ? e(this, E).push(h) : e(this, P).push(h);
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
    return e(this, w);
  }
  get element() {
    return e(this, l);
  }
  get nest() {
    return e(this, A);
  }
  testPathname(t) {
    return this.urlPattern.test({ pathname: t });
  }
  render(t, s) {
    return j(this, null, function* () {
      var i, f;
      if (e(this, v).observe(document.head, {
        childList: !0,
        subtree: !0
      }), e(this, m))
        e(this, P).forEach((h) => {
          document.head.appendChild(h);
        });
      else {
        const h = yield e(this, U).call(this);
        if (r(this, E, [...e(this, P)]), typeof h.default == "function" && (r(this, m, h.default), V(h.default))) {
          const a = "e-" + ((i = e(this, m)) == null ? void 0 : i.name.toLowerCase());
          customElements.get(a) || customElements.define(a, h.default);
        }
      }
      if (yield z(this, B, _).call(this), e(this, m)) {
        const h = e(this, b).exec({ pathname: s }), a = (h == null ? void 0 : h.pathname.groups) || {}, d = Object.fromEntries(
          new URLSearchParams(location.search)
        ), u = {
          pathnameParams: a,
          searchParams: d
        };
        V(e(this, m)) ? r(this, l, new (e(this, m))(
          u
        )) : r(this, l, nt(
          e(this, m),
          u
        )), t.appendChild(e(this, l)), r(this, A, e(this, l).querySelector("[data-nest]") || ((f = e(this, l).shadowRoot) == null ? void 0 : f.querySelector("[data-nest]")) || e(this, l).shadowRoot || e(this, l)), r(this, w, !0);
      }
      e(this, v).disconnect();
    });
  }
  close() {
    var t;
    e(this, v).disconnect(), (t = e(this, l)) == null || t.remove(), r(this, w, !1), e(this, E).forEach((s) => document.head.removeChild(s)), r(this, E, []);
  }
  getAnchorElements() {
    var s;
    let t = [];
    return e(this, l) && (t = [...e(this, l).querySelectorAll("a")]), (s = e(this, l)) != null && s.shadowRoot && (t = [
      ...t,
      ...e(this, l).shadowRoot.querySelectorAll("a")
    ]), t;
  }
}
R = new WeakMap(), U = new WeakMap(), b = new WeakMap(), m = new WeakMap(), l = new WeakMap(), w = new WeakMap(), A = new WeakMap(), v = new WeakMap(), P = new WeakMap(), E = new WeakMap(), B = new WeakSet(), _ = function() {
  return j(this, null, function* () {
    const t = e(this, P).filter((a) => a instanceof HTMLElement ? a.tagName === "STYLE" || a.tagName === "SCRIPT" || a.tagName === "LINK" : !1);
    try {
      for (var s = F(t), i, f, h; i = !(f = yield s.next()).done; i = !1) {
        const a = f.value;
        yield new Promise((d) => {
          a.onload = () => {
            d();
          };
        });
      }
    } catch (f) {
      h = [f];
    } finally {
      try {
        i && (f = s.return) && (yield f.call(s));
      } finally {
        if (h)
          throw h[0];
      }
    }
  });
};
var H, p, S, O, x;
class ot {
  constructor(t, s) {
    o(this, H, void 0);
    o(this, p, void 0);
    o(this, S, void 0);
    o(this, O, void 0);
    o(this, x, (t) => {
      t.preventDefault(), e(this, H).navigate(e(this, S), e(this, O));
    });
    r(this, H, t), r(this, p, s), r(this, S, e(this, p).getAttribute("href") || "/"), r(this, O, e(this, p).getAttribute("data-history-action") || "push"), e(this, p).addEventListener("click", e(this, x)), location.pathname === e(this, S) && e(this, p).classList.add("current");
  }
  destroy() {
    e(this, p).removeEventListener("click", e(this, x)), e(this, p).classList.remove("current");
  }
}
H = new WeakMap(), p = new WeakMap(), S = new WeakMap(), O = new WeakMap(), x = new WeakMap();
globalThis.URLPattern = et;
var k, N, g, C, I, L, q, M, D, K, tt, W;
const Y = class Y {
  constructor(t) {
    o(this, K);
    o(this, k, null);
    o(this, N, void 0);
    o(this, g, []);
    o(this, C, null);
    o(this, I, []);
    o(this, L, void 0);
    o(this, q, null);
    o(this, M, new st());
    o(this, D, it(() => {
      const t = (s) => s.split("/").length;
      r(this, g, e(this, g).sort((s, i) => t(s.pattern) - t(i.pattern))), this.navigate(location.pathname.replace(e(this, N), ""));
    }, 0));
    o(this, W, (t) => {
      t.state && this.navigate(t.state, "none");
    });
    r(this, N, (t == null ? void 0 : t.base) || ""), Y.active = this, Z && (r(this, k, (t == null ? void 0 : t.rootElement) || document.body), addEventListener("popstate", e(this, W)));
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
    return e(this, M).subscribe(t);
  }
  defineRoute(t, s) {
    const i = new rt(t, s);
    e(this, g).push(i), e(this, D).call(this);
  }
  navigate(t, s = "push") {
    return j(this, null, function* () {
      var u, G;
      if (e(this, L) === t || e(this, q) === t)
        return;
      Y.active = this, r(this, L, t);
      const i = e(this, g).filter((c) => c.isActive), f = e(this, g).filter(
        (c) => !i.includes(c) && c.testPathname(t)
      ), h = i.filter((c) => !c.testPathname(t)), a = i.filter((c) => c.testPathname(t));
      let d = !0;
      if (this.preprocessor)
        try {
          yield new Promise((c, y) => {
            var J;
            (J = this.preprocessor) == null || J.call(this, { pathname: t, resolve: c, reject: y });
          });
        } catch (c) {
          c ? console.error(c) : console.log("Route change canceled"), d = !1;
        }
      if (d && e(this, L) === t) {
        r(this, C, a[a.length - 1]), h.forEach((y) => {
          y.close();
        }), r(this, q, t);
        try {
          for (var T = F(f), wt, vt, Pt; wt = !(vt = yield T.next()).done; wt = !1) {
            const y = vt.value;
            yield y.render(((u = e(this, C)) == null ? void 0 : u.nest) || e(this, k), t), r(this, C, y);
          }
        } catch (vt) {
          Pt = [vt];
        } finally {
          try {
            wt && (vt = T.return) && (yield vt.call(T));
          } finally {
            if (Pt)
              throw Pt[0];
          }
        }
        const c = e(this, N) + t + location.search;
        s === "push" ? history.pushState(c, "", c) : s === "replace" && history.replaceState(c, "", c), z(this, K, tt).call(this), (G = this.postprocessor) == null || G.call(this, { pathname: t }), e(this, M).notify({ pathname: t });
      }
    });
  }
};
k = new WeakMap(), N = new WeakMap(), g = new WeakMap(), C = new WeakMap(), I = new WeakMap(), L = new WeakMap(), q = new WeakMap(), M = new WeakMap(), D = new WeakMap(), K = new WeakSet(), tt = function() {
  const t = e(this, g).filter((i) => i.isActive), s = Array.from(
    new Set(
      [
        ...e(this, k).querySelectorAll("a"),
        ...t.map((i) => i.getAnchorElements()).flat()
      ].filter((i) => {
        var f;
        return (f = i.getAttribute("href")) == null ? void 0 : f.startsWith("/");
      })
    )
  );
  e(this, I).forEach((i) => {
    i.destroy();
  }), r(this, I, s.map((i) => new ot(this, i)));
}, W = new WeakMap();
let X = Y;
export {
  X as Router
};
