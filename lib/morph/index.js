var st = Object.defineProperty;
var V = (i, t) => (t = Symbol[i]) ? t : Symbol.for("Symbol." + i);
var ot = (i, t, e) => t in i ? st(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var j = (i, t, e) => (ot(i, typeof t != "symbol" ? t + "" : t, e), e), z = (i, t, e) => {
  if (!t.has(i))
    throw TypeError("Cannot " + e);
};
var s = (i, t, e) => (z(i, t, "read from private field"), e ? e.call(i) : t.get(i)), o = (i, t, e) => {
  if (t.has(i))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(i) : t.set(i, e);
}, r = (i, t, e, n) => (z(i, t, "write to private field"), n ? n.call(i, e) : t.set(i, e), e);
var d = (i, t, e) => (z(i, t, "access private method"), e);
var F = (i, t, e) => new Promise((n, h) => {
  var u = (l) => {
    try {
      g(e.next(l));
    } catch (w) {
      h(w);
    }
  }, L = (l) => {
    try {
      g(e.throw(l));
    } catch (w) {
      h(w);
    }
  }, g = (l) => l.done ? n(l.value) : Promise.resolve(l.value).then(u, L);
  g((e = e.apply(i, t)).next());
});
var X = (i, t, e) => (t = i[V("asyncIterator")]) ? t.call(i) : (i = i[V("iterator")](), t = {}, e = (n, h) => (h = i[n]) && (t[n] = (u) => new Promise((L, g, l) => (u = h.call(i, u), l = u.done, Promise.resolve(u.value).then((w) => L({ value: w, done: l }), g)))), e("next"), e("return"), t);
import { Notifier as Z } from "../notifier/index.js";
import { i as nt } from "../browser-S4eq8AeN.js";
var M, f, y, T, N;
class rt {
  constructor(t, e) {
    o(this, M, void 0);
    o(this, f, void 0);
    o(this, y, void 0);
    o(this, T, void 0);
    o(this, N, (t) => {
      t.preventDefault(), s(this, M).navigate(s(this, y), s(this, T));
    });
    r(this, M, e), r(this, f, t), r(this, y, s(this, f).getAttribute("href") || "/"), r(this, T, s(this, f).getAttribute("data-history-action") || "push"), s(this, f).addEventListener("click", s(this, N)), s(this, y) === location.pathname && s(this, f).classList.add("current");
  }
  destroy() {
    s(this, f).removeEventListener("click", s(this, N)), s(this, f).classList.remove("current");
  }
}
M = new WeakMap(), f = new WeakMap(), y = new WeakMap(), T = new WeakMap(), N = new WeakMap();
var a, P, S, k, C, q, b, E, H, A, x, I, _, O, $, D, G, m, J, B, p, R, Q, K;
class ut {
  constructor(t) {
    o(this, I);
    o(this, O);
    o(this, D);
    o(this, m);
    o(this, B);
    o(this, R);
    o(this, a, null);
    o(this, P, null);
    o(this, S, null);
    o(this, k, null);
    o(this, C, []);
    o(this, q, new DOMParser());
    o(this, b, /* @__PURE__ */ new Map());
    o(this, E, void 0);
    o(this, H, null);
    j(this, "preprocessor");
    j(this, "postprocessor");
    o(this, A, new Z());
    o(this, x, new Z());
    o(this, K, (t) => {
      t.state && this.navigate(t.state, "none");
    });
    nt && (r(this, a, (t == null ? void 0 : t.base) || "/"), t != null && t.base ? (r(this, a, t.base), t.base.endsWith("/") || r(this, a, s(this, a) + "/")) : r(this, a, "/"), r(this, P, (t == null ? void 0 : t.waitForHeadToLoad) !== !1), r(this, S, (t == null ? void 0 : t.cachePages) !== !1), r(this, k, d(this, m, J).call(this, document)), r(this, H, location.pathname), d(this, D, G).call(this), addEventListener("popstate", s(this, K)));
  }
  beforeNavigationEvent(t) {
    return s(this, A).subscribe(t);
  }
  afterNavigationEvent(t) {
    return s(this, x).subscribe(t);
  }
  navigate(t, e = "push") {
    return F(this, null, function* () {
      var h;
      if (t = d(this, O, $).call(this, t), s(this, E) === t || s(this, H) === t)
        return;
      r(this, E, t);
      const n = s(this, b).has(t);
      try {
        let u = !0;
        if (this.preprocessor)
          try {
            yield new Promise((c, v) => {
              var W;
              (W = this.preprocessor) == null || W.call(this, { pathname: t, resolve: c, reject: v, isCached: n });
            });
          } catch (c) {
            c ? console.error(c) : console.log("Route change canceled"), u = !1;
          }
        if (s(this, A).notify({
          pathname: t,
          isCached: n
        }), !u || s(this, E) !== t)
          return;
        const L = yield d(this, I, _).call(this, t);
        if (s(this, S) && s(this, b).set(t, L), s(this, E) !== t)
          return;
        const g = Array.from(document.head.children), l = Array.from(L.head.cloneNode(!0).children), w = d(this, B, p).call(this, g, l), tt = d(this, R, Q).call(this, g, w), U = d(this, R, Q).call(this, l, w);
        tt.forEach((c) => c.remove()), U.forEach((c) => document.head.appendChild(c));
        const Y = U.filter(
          (c) => c.tagName === "STYLE" || c.tagName === "SCRIPT" || c.tagName === "LINK"
        );
        s(this, P) && Y.length && (yield new Promise((c) => F(this, null, function* () {
          let v = 0;
          try {
            for (var W = X(Y), at, gt, wt; at = !(gt = yield W.next()).done; at = !1) {
              const it = gt.value;
              it.onload = () => {
                v++, v === Y.length && c();
              };
            }
          } catch (gt) {
            wt = [gt];
          } finally {
            try {
              at && (gt = W.return) && (yield gt.call(W));
            } finally {
              if (wt)
                throw wt[0];
            }
          }
        })));
        const et = d(this, m, J).call(this, L);
        s(this, k).forEach((c, v) => {
          const W = et[v];
          c.innerHTML = W.innerHTML;
        }), r(this, H, t), e === "push" ? history.pushState(t, "", t + location.search) : e === "replace" && history.replaceState(t, "", t + location.search), d(this, D, G).call(this), (h = this.postprocessor) == null || h.call(this, { pathname: t, isCached: n }), s(this, x).notify({ pathname: t, isCached: n });
      } catch (u) {
        console.error(u);
      }
      r(this, E, void 0);
    });
  }
}
a = new WeakMap(), P = new WeakMap(), S = new WeakMap(), k = new WeakMap(), C = new WeakMap(), q = new WeakMap(), b = new WeakMap(), E = new WeakMap(), H = new WeakMap(), A = new WeakMap(), x = new WeakMap(), I = new WeakSet(), _ = function(t) {
  return F(this, null, function* () {
    const e = s(this, b).get(t);
    if (e)
      return e;
    const h = yield (yield fetch(t)).text();
    return s(this, q).parseFromString(h, "text/html");
  });
}, O = new WeakSet(), $ = function(t) {
  return t = t.replace(s(this, a), ""), t.startsWith("/") && (t = t.slice(1)), s(this, a) + t;
}, D = new WeakSet(), G = function() {
  const t = [...document.documentElement.querySelectorAll("a")].filter(
    (e) => {
      var n;
      return (n = e.getAttribute("href")) == null ? void 0 : n.startsWith("/");
    }
  );
  s(this, C).forEach((e) => e.destroy()), r(this, C, t.map((e) => new rt(e, this)));
}, m = new WeakSet(), J = function(t) {
  const e = t.querySelectorAll("[data-morph]");
  return e.length ? [...e] : [t.body];
}, B = new WeakSet(), p = function(t, e) {
  return t.filter(
    (n) => e.find(
      (h) => h.outerHTML === n.outerHTML
    )
  );
}, R = new WeakSet(), Q = function(t, e) {
  return t.filter(
    (n) => !e.find(
      (h) => h.outerHTML === n.outerHTML
    )
  );
}, K = new WeakMap();
export {
  ut as Morph
};
