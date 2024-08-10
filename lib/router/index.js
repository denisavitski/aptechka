var X = (a, e) => (e = Symbol[a]) ? e : Symbol.for("Symbol." + a);
var W = (a, e, s) => {
  if (!e.has(a))
    throw TypeError("Cannot " + s);
};
var t = (a, e, s) => (W(a, e, "read from private field"), s ? s.call(a) : e.get(a)), h = (a, e, s) => {
  if (e.has(a))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(a) : e.set(a, s);
}, n = (a, e, s, i) => (W(a, e, "write to private field"), i ? i.call(a, s) : e.set(a, s), s);
var Y = (a, e, s) => (W(a, e, "access private method"), s);
var I = (a, e, s) => new Promise((i, r) => {
  var o = (m) => {
    try {
      f(s.next(m));
    } catch (w) {
      r(w);
    }
  }, c = (m) => {
    try {
      f(s.throw(m));
    } catch (w) {
      r(w);
    }
  }, f = (m) => m.done ? i(m.value) : Promise.resolve(m.value).then(o, c);
  f((s = s.apply(a, e)).next());
});
var $ = (a, e, s) => (e = a[X("asyncIterator")]) ? e.call(a) : (a = a[X("iterator")](), e = {}, s = (i, r) => (r = a[i]) && (e[i] = (o) => new Promise((c, f, m) => (o = r.call(a, o), m = o.done, Promise.resolve(o.value).then((w) => c({ value: w, done: m }), f)))), s("next"), s("return"), e);
import { URLPattern as it } from "urlpattern-polyfill";
import { Notifier as at } from "../notifier/index.js";
import { i as Z } from "../browser-0zX67oeU.js";
import { d as nt } from "../function-C10DGppn.js";
import { n as ht, c as rt, s as ot } from "../url-DMNfW7uN.js";
import { i as ct } from "../object-D6MVWB4l.js";
var y, U, A, p, d, L, k, v, E, R, M, _;
class lt {
  constructor(e, s) {
    h(this, M);
    h(this, y, void 0);
    h(this, U, void 0);
    h(this, A, void 0);
    h(this, p, void 0);
    h(this, d, void 0);
    h(this, L, void 0);
    h(this, k, void 0);
    h(this, v, null);
    h(this, E, []);
    h(this, R, []);
    n(this, y, e), n(this, U, s), n(this, A, new URLPattern({ pathname: t(this, y) })), n(this, p, null), n(this, d, null), n(this, L, !1), n(this, k, null), Z && n(this, v, new MutationObserver((i) => {
      i[0].addedNodes.forEach((o) => {
        t(this, p) ? t(this, R).push(o) : t(this, E).push(o);
      });
    }));
  }
  get pattern() {
    return t(this, y);
  }
  get urlPattern() {
    return t(this, A);
  }
  get isActive() {
    return t(this, L);
  }
  get element() {
    return t(this, d);
  }
  get nest() {
    return t(this, k);
  }
  testPathname(e) {
    return this.urlPattern.test({ pathname: e });
  }
  render(e, s) {
    return I(this, null, function* () {
      var i, r;
      if (t(this, v).observe(document.head, {
        childList: !0,
        subtree: !0
      }), t(this, p))
        t(this, E).forEach((o) => {
          document.head.appendChild(o);
        });
      else {
        const o = yield t(this, U).call(this);
        if (n(this, R, [...t(this, E)]), typeof o.default == "function" && (n(this, p, o.default), ct(o.default))) {
          const c = "e-" + ((i = t(this, p)) == null ? void 0 : i.name.toLowerCase());
          customElements.get(c) || customElements.define(c, o.default);
        }
      }
      if (yield Y(this, M, _).call(this), t(this, p)) {
        const o = t(this, A).exec({ pathname: s }), c = (o == null ? void 0 : o.pathname.groups) || {}, f = Object.fromEntries(
          new URLSearchParams(location.search)
        ), m = {
          pathnameParams: c,
          searchParams: f
        };
        n(this, d, new (t(this, p))(m)), e.appendChild(t(this, d)), n(this, k, t(this, d).querySelector("[data-nest]") || ((r = t(this, d).shadowRoot) == null ? void 0 : r.querySelector("[data-nest]")) || t(this, d).shadowRoot || t(this, d)), n(this, L, !0);
      }
      t(this, v).disconnect();
    });
  }
  close() {
    var e;
    t(this, v).disconnect(), (e = t(this, d)) == null || e.remove(), n(this, L, !1), t(this, R).forEach((s) => document.head.removeChild(s)), n(this, R, []);
  }
  getAnchorElements() {
    var s;
    let e = [];
    return t(this, d) && (e = [...t(this, d).querySelectorAll("a")]), (s = t(this, d)) != null && s.shadowRoot && (e = [
      ...e,
      ...t(this, d).shadowRoot.querySelectorAll("a")
    ]), e;
  }
}
y = new WeakMap(), U = new WeakMap(), A = new WeakMap(), p = new WeakMap(), d = new WeakMap(), L = new WeakMap(), k = new WeakMap(), v = new WeakMap(), E = new WeakMap(), R = new WeakMap(), M = new WeakSet(), _ = function() {
  return I(this, null, function* () {
    const e = t(this, E).filter((c) => c instanceof HTMLElement ? c.tagName === "STYLE" || c.tagName === "SCRIPT" || c.tagName === "LINK" : !1);
    try {
      for (var s = $(e), i, r, o; i = !(r = yield s.next()).done; i = !1) {
        const c = r.value;
        yield new Promise((f) => {
          c.onload = () => {
            f();
          };
        });
      }
    } catch (r) {
      o = [r];
    } finally {
      try {
        i && (r = s.return) && (yield r.call(s));
      } finally {
        if (o)
          throw o[0];
      }
    }
  });
};
var S, u, P, O, N, x;
class ut {
  constructor(e, s) {
    h(this, S, void 0);
    h(this, u, void 0);
    h(this, P, void 0);
    h(this, O, void 0);
    h(this, N, void 0);
    h(this, x, (e) => {
      e.preventDefault(), t(this, S).links.forEach((s) => {
        var i;
        t(this, P) === t(s, P) || (i = t(s, N)) != null && i.includes(t(this, P)) ? t(s, u).classList.add("clicked") : t(s, u).classList.remove("clicked");
      }), t(this, S).navigate(t(this, P), t(this, O));
    });
    var o, c;
    n(this, S, e), n(this, u, s), n(this, P, t(this, u).getAttribute("href") || "/"), n(this, O, t(this, u).getAttribute(
      "data-history-action"
    ) || "push"), t(this, u).addEventListener("click", t(this, x));
    const i = e.normalizePath(t(this, P)), r = e.normalizePath(location.pathname);
    n(this, N, (o = t(this, u).getAttribute("data-match-paths")) == null ? void 0 : o.split(",").map((f) => e.normalizePath(f.trim()).pathname)), t(this, u).hasAttribute("data-include") ? r.pathname.includes(i.pathname) && t(this, u).classList.add("current") : i.pathname === r.pathname || (c = t(this, N)) != null && c.includes(r.pathname) ? (t(this, u).classList.add("current"), t(this, u).classList.add("clicked")) : t(this, u).classList.remove("clicked");
  }
  destroy() {
    t(this, u).removeEventListener("click", t(this, x)), t(this, u).classList.remove("current");
  }
}
S = new WeakMap(), u = new WeakMap(), P = new WeakMap(), O = new WeakMap(), N = new WeakMap(), x = new WeakMap();
globalThis.URLPattern = it;
var C, z, g, q, H, b, T, B, j, D, tt, K;
class Lt {
  constructor(e) {
    h(this, D);
    h(this, C, null);
    h(this, z, null);
    h(this, g, []);
    h(this, q, null);
    h(this, H, []);
    h(this, b, void 0);
    h(this, T, null);
    h(this, B, new at());
    h(this, j, nt(() => {
      const e = (s) => s.split("/").length;
      n(this, g, t(this, g).sort((s, i) => e(s.pattern) - e(i.pattern))), this.navigate(location.pathname);
    }, 0));
    h(this, K, (e) => {
      e.state && this.navigate(e.state, "none");
    });
    Z && (e != null && e.base ? n(this, z, ht(e.base)) : n(this, z, "/"), n(this, C, (e == null ? void 0 : e.rootElement) || document.body), addEventListener("popstate", t(this, K)));
  }
  get currentPathname() {
    return t(this, T);
  }
  get candidatePathname() {
    return t(this, b);
  }
  get routes() {
    return t(this, g);
  }
  get links() {
    return t(this, H);
  }
  navigationEvent(e) {
    return t(this, B).subscribe(e);
  }
  defineRoute(e, s) {
    const i = new lt(e, s);
    t(this, g).push(i), t(this, j).call(this);
  }
  navigate(e, s = "push") {
    return I(this, null, function* () {
      var J, Q;
      const i = this.normalizePath(e);
      let { pathname: r, hash: o, parameters: c, leaf: f } = i;
      if (t(this, b) === r || t(this, T) === r)
        return;
      n(this, b, r);
      const m = t(this, g).filter((l) => l.isActive), w = t(this, g).filter(
        (l) => !m.includes(l) && l.testPathname(f)
      ), et = m.filter((l) => !l.testPathname(f)), F = m.filter((l) => l.testPathname(f));
      let G = !0;
      if (this.preprocessor)
        try {
          yield new Promise((l, st) => {
            var V;
            (V = this.preprocessor) == null || V.call(this, { path: i, resolve: l, reject: st });
          });
        } catch (l) {
          l ? console.error(l) : console.log("Route change canceled"), G = !1;
        }
      if (G && t(this, b) === r) {
        n(this, q, F[F.length - 1]), et.forEach((l) => {
          l.close();
        }), n(this, T, r), rt(s, r, c, o);
        try {
          for (var Rt = $(w), bt, yt, At; bt = !(yt = yield Rt.next()).done; bt = !1) {
            const l = yt.value;
            yield l.render(((J = t(this, q)) == null ? void 0 : J.nest) || t(this, C), r), n(this, q, l);
          }
        } catch (yt) {
          At = [yt];
        } finally {
          try {
            bt && (yt = Rt.return) && (yield yt.call(Rt));
          } finally {
            if (At)
              throw At[0];
          }
        }
        Y(this, D, tt).call(this), (Q = this.postprocessor) == null || Q.call(this, { pathname: r }), t(this, B).notify({ pathname: r });
      }
    });
  }
  normalizePath(e) {
    return ot(e, t(this, z));
  }
}
C = new WeakMap(), z = new WeakMap(), g = new WeakMap(), q = new WeakMap(), H = new WeakMap(), b = new WeakMap(), T = new WeakMap(), B = new WeakMap(), j = new WeakMap(), D = new WeakSet(), tt = function() {
  const e = t(this, g).filter((i) => i.isActive), s = Array.from(
    new Set(
      [
        ...t(this, C).querySelectorAll("a"),
        ...e.map((i) => i.getAnchorElements()).flat()
      ].filter((i) => {
        var r;
        return (r = i.getAttribute("href")) == null ? void 0 : r.startsWith("/");
      })
    )
  );
  t(this, H).forEach((i) => {
    i.destroy();
  }), n(this, H, s.map((i) => new ut(this, i)));
}, K = new WeakMap();
export {
  Lt as Router
};
