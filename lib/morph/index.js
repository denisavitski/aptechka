var at = (n, t) => (t = Symbol[n]) ? t : Symbol.for("Symbol." + n);
var V = (n, t, i) => {
  if (!t.has(n))
    throw TypeError("Cannot " + i);
};
var e = (n, t, i) => (V(n, t, "read from private field"), i ? i.call(n) : t.get(n)), a = (n, t, i) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, i);
}, c = (n, t, i, r) => (V(n, t, "write to private field"), r ? r.call(n, i) : t.set(n, i), i);
var d = (n, t, i) => (V(n, t, "access private method"), i);
var T = (n, t, i) => new Promise((r, s) => {
  var u = (l) => {
    try {
      f(i.next(l));
    } catch (g) {
      s(g);
    }
  }, p = (l) => {
    try {
      f(i.throw(l));
    } catch (g) {
      s(g);
    }
  }, f = (l) => l.done ? r(l.value) : Promise.resolve(l.value).then(u, p);
  f((i = i.apply(n, t)).next());
});
var rt = (n, t, i) => (t = n[at("asyncIterator")]) ? t.call(n) : (n = n[at("iterator")](), t = {}, i = (r, s) => (s = n[r]) && (t[r] = (u) => new Promise((p, f, l) => (u = s.call(n, u), l = u.done, Promise.resolve(u.value).then((g) => p({ value: g, done: l }), f)))), i("next"), i("return"), t);
import { Notifier as ot } from "../notifier/index.js";
import { i as dt } from "../browser-0zX67oeU.js";
import { n as mt, s as ft, c as pt } from "../url-DMNfW7uN.js";
var w, h, m, k, P, C, y;
class gt {
  constructor(t, i) {
    a(this, w, void 0);
    a(this, h, void 0);
    a(this, m, void 0);
    a(this, k, void 0);
    a(this, P, void 0);
    a(this, C, (t) => {
      t.preventDefault(), e(this, w).links.forEach((i) => {
        var r;
        e(this, m) === e(i, m) || (r = e(i, P)) != null && r.includes(e(this, m)) ? e(i, h).classList.add("clicked") : e(i, h).classList.remove("clicked");
      }), e(this, w).navigate(e(this, m), e(this, k));
    });
    a(this, y, () => {
      e(this, w).prefetch(e(this, m)), e(this, h).removeEventListener("pointerenter", e(this, y));
    });
    var u, p;
    c(this, w, i), c(this, h, t), c(this, m, e(this, h).getAttribute("href") || "/"), c(this, k, e(this, h).getAttribute(
      "data-history-action"
    ) || "push"), e(this, h).addEventListener("click", e(this, C));
    const r = i.normalizePath(e(this, m)), s = i.normalizePath(location.pathname);
    c(this, P, (u = e(this, h).getAttribute("data-match-paths")) == null ? void 0 : u.split(",").map((f) => i.normalizePath(f.trim()).pathname)), e(this, h).hasAttribute("data-include") ? s.pathname.includes(r.pathname) && e(this, h).classList.add("current") : r.pathname === s.pathname || (p = e(this, P)) != null && p.includes(s.pathname) ? (e(this, h).classList.add("current"), e(this, h).classList.add("clicked")) : e(this, h).classList.remove("clicked"), e(this, h).hasAttribute("data-prefetch") && e(this, h).addEventListener("pointerenter", e(this, y));
  }
  destroy() {
    e(this, h).removeEventListener("click", e(this, C)), e(this, h).removeEventListener("pointerenter", e(this, y)), e(this, h).classList.remove("current");
  }
}
w = new WeakMap(), h = new WeakMap(), m = new WeakMap(), k = new WeakMap(), P = new WeakMap(), C = new WeakMap(), y = new WeakMap();
var H, z, S, x, M, Y, A, v, b, D, R, F, X, I, Z, q, _, j, ht, B, $, G;
class wt {
  constructor(t) {
    a(this, F);
    a(this, I);
    a(this, q);
    a(this, j);
    a(this, B);
    a(this, H, null);
    a(this, z, null);
    a(this, S, null);
    a(this, x, null);
    a(this, M, []);
    a(this, Y, new DOMParser());
    a(this, A, /* @__PURE__ */ new Map());
    a(this, v, void 0);
    a(this, b, null);
    a(this, D, new ot());
    a(this, R, new ot());
    a(this, G, (t) => {
      t.state && this.navigate(t.state, "none");
    });
    if (dt) {
      t != null && t.base ? c(this, H, mt(t.base)) : c(this, H, "/"), c(this, z, (t == null ? void 0 : t.waitForHeadToLoad) !== !1), c(this, S, (t == null ? void 0 : t.cachePages) !== !1), c(this, x, d(this, q, _).call(this, document.body));
      const i = this.normalizePath(location.pathname);
      c(this, b, i.pathname), document.documentElement.setAttribute(
        "data-current-pathname",
        e(this, b)
      ), document.documentElement.setAttribute(
        "data-current-leaf",
        i.leaf
      ), d(this, I, Z).call(this), addEventListener("popstate", e(this, G));
    }
  }
  get currentPathname() {
    return e(this, b);
  }
  get links() {
    return e(this, M);
  }
  normalizePath(t) {
    return ft(t, e(this, H));
  }
  beforeNavigationEvent(t) {
    return e(this, D).subscribe(t);
  }
  afterNavigationEvent(t) {
    return e(this, R).subscribe(t);
  }
  prefetch(t) {
    return T(this, null, function* () {
      const i = this.normalizePath(t);
      return d(this, F, X).call(this, i.pathname);
    });
  }
  navigate(t, i = "push") {
    return T(this, null, function* () {
      var g;
      const r = this.normalizePath(t);
      let { pathname: s, hash: u, parameters: p, leaf: f } = r;
      if (e(this, v) === s || e(this, b) === s)
        return;
      c(this, v, s);
      const l = e(this, A).has(s);
      try {
        let O = !0;
        if (e(this, D).notify({
          pathname: s,
          isCached: l
        }), this.preprocessor)
          try {
            yield new Promise((o, E) => {
              var L;
              (L = this.preprocessor) == null || L.call(this, { pathname: s, resolve: o, reject: E, isCached: l });
            });
          } catch (o) {
            o ? console.error(o) : console.log("Route change canceled"), O = !1;
          }
        if (!O || e(this, v) !== s)
          return;
        const tt = e(this, A).get(s) || (yield d(this, F, X).call(this, s));
        if (e(this, v) !== s)
          return;
        const et = Array.from(document.head.children), it = Array.from(
          tt.head.cloneNode(!0).children
        ), st = d(this, j, ht).call(this, et, it), ct = d(this, B, $).call(this, et, st), W = d(this, B, $).call(this, it, st);
        W.forEach((o, E) => {
          if (o.tagName === "SCRIPT" && o.getAttribute("src")) {
            const L = document.createElement("script");
            L.type = "module", L.src = o.getAttribute("src"), W[E] = L;
          }
        }), W.forEach((o) => {
          document.head.appendChild(o);
        });
        const J = W.filter(
          (o) => (o.tagName === "STYLE" || o.tagName === "SCRIPT" || o.tagName === "LINK") && o.getAttribute("rel") !== "canonical"
        );
        e(this, z) && J.length && (yield new Promise((o) => T(this, null, function* () {
          let E = 0;
          try {
            for (var L = rt(J), ut, Q, K; ut = !(Q = yield L.next()).done; ut = !1) {
              const N = Q.value;
              N.onload = () => {
                E++, E === J.length && o();
              };
            }
          } catch (Q) {
            K = [Q];
          } finally {
            try {
              ut && (Q = L.return) && (yield Q.call(L));
            } finally {
              if (K)
                throw K[0];
            }
          }
        }))), ct.forEach((o) => {
          o.hasAttribute("data-permanent") || o.remove();
        }), c(this, b, s), pt(i, s, p, u);
        const lt = d(this, q, _).call(this, tt.body.cloneNode(!0));
        e(this, x).forEach((o, E) => {
          const L = lt[E];
          let ut = [...o.childNodes], Q = [...L.childNodes];
          ut.forEach((K) => {
            if (K instanceof HTMLElement) {
              const N = K.getAttribute("data-remain");
              let nt;
              Q = Q.filter(
                (U) => U instanceof HTMLElement && N && U.getAttribute("data-remain") === N ? (nt = U, !1) : !0
              ), N && nt || K.remove();
            } else
              K.remove();
          }), o.append(...Q);
        }), d(this, I, Z).call(this), document.documentElement.setAttribute("data-current-pathname", s), document.documentElement.setAttribute("data-current-leaf", f), (g = this.postprocessor) == null || g.call(this, { pathname: s, isCached: l }), e(this, R).notify({ pathname: s, isCached: l });
      } catch (O) {
        console.error(O);
      }
      c(this, v, void 0);
    });
  }
}
H = new WeakMap(), z = new WeakMap(), S = new WeakMap(), x = new WeakMap(), M = new WeakMap(), Y = new WeakMap(), A = new WeakMap(), v = new WeakMap(), b = new WeakMap(), D = new WeakMap(), R = new WeakMap(), F = new WeakSet(), X = function(t) {
  return T(this, null, function* () {
    const i = e(this, A).get(t);
    if (i)
      return i;
    const s = yield (yield fetch(t)).text(), u = e(this, Y).parseFromString(s, "text/html");
    return e(this, S) && e(this, A).set(t, u), u;
  });
}, I = new WeakSet(), Z = function() {
  const t = [
    ...document.documentElement.querySelectorAll("a")
  ].filter((i) => {
    var r;
    return (r = i.getAttribute("href")) == null ? void 0 : r.startsWith("/");
  });
  e(this, M).forEach((i) => i.destroy()), c(this, M, t.map((i) => new gt(i, this)));
}, q = new WeakSet(), _ = function(t) {
  return [...t.querySelectorAll("[data-morph]")];
}, j = new WeakSet(), ht = function(t, i) {
  return t.filter(
    (r) => i.find(
      (s) => s.outerHTML === r.outerHTML
    )
  );
}, B = new WeakSet(), $ = function(t, i) {
  return t.filter(
    (r) => !i.find(
      (s) => s.outerHTML === r.outerHTML
    )
  );
}, G = new WeakMap();
export {
  wt as Morph
};
