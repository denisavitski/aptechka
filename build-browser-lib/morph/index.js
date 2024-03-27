var X = (s, t) => (t = Symbol[s]) ? t : Symbol.for("Symbol." + s);
var z = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var i = (s, t, e) => (z(s, t, "read from private field"), e ? e.call(s) : t.get(s)), n = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, r = (s, t, e, o) => (z(s, t, "write to private field"), o ? o.call(s, e) : t.set(s, e), e);
var d = (s, t, e) => (z(s, t, "access private method"), e);
var T = (s, t, e) => new Promise((o, c) => {
  var l = (f) => {
    try {
      g(e.next(f));
    } catch (L) {
      c(L);
    }
  }, y = (f) => {
    try {
      g(e.throw(f));
    } catch (L) {
      c(L);
    }
  }, g = (f) => f.done ? o(f.value) : Promise.resolve(f.value).then(l, y);
  g((e = e.apply(s, t)).next());
});
var Z = (s, t, e) => (t = s[X("asyncIterator")]) ? t.call(s) : (s = s[X("iterator")](), t = {}, e = (o, c) => (c = s[o]) && (t[o] = (l) => new Promise((y, g, f) => (l = c.call(s, l), f = l.done, Promise.resolve(l.value).then((L) => y({ value: L, done: f }), g)))), e("next"), e("return"), t);
import { Notifier as _ } from "../notifier/index.js";
import { i as st } from "../browser-0zX67oeU.js";
var H, u, E, N, P, S;
class nt {
  constructor(t, e) {
    n(this, H, void 0);
    n(this, u, void 0);
    n(this, E, void 0);
    n(this, N, void 0);
    n(this, P, (t) => {
      t.preventDefault(), i(this, H).navigate(i(this, E), i(this, N));
    });
    n(this, S, () => {
      i(this, H).prefetch(i(this, E));
    });
    r(this, H, e), r(this, u, t), r(this, E, i(this, u).getAttribute("href") || "/"), r(this, N, i(this, u).getAttribute(
      "data-history-action"
    ) || "push"), i(this, u).addEventListener("click", i(this, P)), i(this, E) === location.pathname && i(this, u).classList.add("current"), i(this, u).hasAttribute("data-prefetch") && i(this, u).addEventListener("pointerenter", i(this, S));
  }
  destroy() {
    i(this, u).removeEventListener("click", i(this, P)), i(this, u).removeEventListener("pointerenter", i(this, S)), i(this, u).classList.remove("current");
  }
}
H = new WeakMap(), u = new WeakMap(), E = new WeakMap(), N = new WeakMap(), P = new WeakMap(), S = new WeakMap();
var a, k, A, C, x, O, w, v, M, D, R, W, G, B, $, m, J, F, Q, K, p, q, U, Y;
class ct {
  constructor(t) {
    n(this, W);
    n(this, B);
    n(this, m);
    n(this, F);
    n(this, K);
    n(this, q);
    n(this, a, null);
    n(this, k, null);
    n(this, A, null);
    n(this, C, null);
    n(this, x, []);
    n(this, O, new DOMParser());
    n(this, w, /* @__PURE__ */ new Map());
    n(this, v, void 0);
    n(this, M, null);
    n(this, D, new _());
    n(this, R, new _());
    n(this, Y, (t) => {
      t.state && this.navigate(t.state, "none");
    });
    st && (r(this, a, (t == null ? void 0 : t.base) || "/"), t != null && t.base ? (r(this, a, t.base), t.base.endsWith("/") || r(this, a, i(this, a) + "/")) : r(this, a, "/"), r(this, k, (t == null ? void 0 : t.waitForHeadToLoad) !== !1), r(this, A, (t == null ? void 0 : t.cachePages) !== !1), r(this, C, d(this, F, Q).call(this, document)), r(this, M, location.pathname), d(this, m, J).call(this), addEventListener("popstate", i(this, Y)));
  }
  beforeNavigationEvent(t) {
    return i(this, D).subscribe(t);
  }
  afterNavigationEvent(t) {
    return i(this, R).subscribe(t);
  }
  prefetch(t) {
    return T(this, null, function* () {
      return d(this, W, G).call(this, t);
    });
  }
  navigate(t, e = "push") {
    return T(this, null, function* () {
      var c;
      if (t = d(this, B, $).call(this, t), i(this, v) === t || i(this, M) === t)
        return;
      r(this, v, t);
      const o = i(this, w).has(t);
      try {
        let l = !0;
        if (this.preprocessor)
          try {
            yield new Promise((h, b) => {
              var I;
              (I = this.preprocessor) == null || I.call(this, { pathname: t, resolve: h, reject: b, isCached: o });
            });
          } catch (h) {
            h ? console.error(h) : console.log("Route change canceled"), l = !1;
          }
        if (i(this, D).notify({
          pathname: t,
          isCached: o
        }), !l || i(this, v) !== t)
          return;
        const y = i(this, w).get(t) || (yield d(this, W, G).call(this, t));
        if (i(this, v) !== t)
          return;
        const g = Array.from(document.head.children), f = Array.from(
          y.head.cloneNode(!0).children
        ), L = d(this, K, p).call(this, g, f), tt = d(this, q, U).call(this, g, L), V = d(this, q, U).call(this, f, L);
        tt.forEach((h) => h.remove()), V.forEach((h) => document.head.appendChild(h));
        const j = V.filter(
          (h) => h.tagName === "STYLE" || h.tagName === "SCRIPT" || h.tagName === "LINK"
        );
        i(this, k) && j.length && (yield new Promise((h) => T(this, null, function* () {
          let b = 0;
          try {
            for (var I = Z(j), ut, dt, at; ut = !(dt = yield I.next()).done; ut = !1) {
              const it = dt.value;
              it.onload = () => {
                b++, b === j.length && h();
              };
            }
          } catch (dt) {
            at = [dt];
          } finally {
            try {
              ut && (dt = I.return) && (yield dt.call(I));
            } finally {
              if (at)
                throw at[0];
            }
          }
        })));
        const et = d(this, F, Q).call(this, y);
        i(this, C).forEach((h, b) => {
          const I = et[b];
          h.innerHTML = I.innerHTML;
        }), r(this, M, t), e === "push" ? history.pushState(t, "", t + location.search) : e === "replace" && history.replaceState(t, "", t + location.search), d(this, m, J).call(this), (c = this.postprocessor) == null || c.call(this, { pathname: t, isCached: o }), i(this, R).notify({ pathname: t, isCached: o });
      } catch (l) {
        console.error(l);
      }
      r(this, v, void 0);
    });
  }
}
a = new WeakMap(), k = new WeakMap(), A = new WeakMap(), C = new WeakMap(), x = new WeakMap(), O = new WeakMap(), w = new WeakMap(), v = new WeakMap(), M = new WeakMap(), D = new WeakMap(), R = new WeakMap(), W = new WeakSet(), G = function(t) {
  return T(this, null, function* () {
    const e = i(this, w).get(t);
    if (e)
      return e;
    const c = yield (yield fetch(t)).text(), l = i(this, O).parseFromString(c, "text/html");
    return i(this, A) && i(this, w).set(t, l), l;
  });
}, B = new WeakSet(), $ = function(t) {
  return t = t.replace(i(this, a), ""), t.startsWith("/") && (t = t.slice(1)), i(this, a) + t;
}, m = new WeakSet(), J = function() {
  const t = [
    ...document.documentElement.querySelectorAll("a")
  ].filter((e) => {
    var o;
    return (o = e.getAttribute("href")) == null ? void 0 : o.startsWith("/");
  });
  i(this, x).forEach((e) => e.destroy()), r(this, x, t.map((e) => new nt(e, this)));
}, F = new WeakSet(), Q = function(t) {
  const e = t.querySelectorAll("[data-morph]");
  return e.length ? [...e] : [t.body];
}, K = new WeakSet(), p = function(t, e) {
  return t.filter(
    (o) => e.find(
      (c) => c.outerHTML === o.outerHTML
    )
  );
}, q = new WeakSet(), U = function(t, e) {
  return t.filter(
    (o) => !e.find(
      (c) => c.outerHTML === o.outerHTML
    )
  );
}, Y = new WeakMap();
export {
  ct as Morph
};
