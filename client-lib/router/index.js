var X = (n, e) => (e = Symbol[n]) ? e : Symbol.for("Symbol." + n);
var W = (n, e, s) => {
  if (!e.has(n))
    throw TypeError("Cannot " + s);
};
var t = (n, e, s) => (W(n, e, "read from private field"), s ? s.call(n) : e.get(n)), h = (n, e, s) => {
  if (e.has(n))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(n) : e.set(n, s);
}, a = (n, e, s, i) => (W(n, e, "write to private field"), i ? i.call(n, s) : e.set(n, s), s);
var Y = (n, e, s) => (W(n, e, "access private method"), s);
var I = (n, e, s) => new Promise((i, r) => {
  var o = (u) => {
    try {
      f(s.next(u));
    } catch (w) {
      r(w);
    }
  }, c = (u) => {
    try {
      f(s.throw(u));
    } catch (w) {
      r(w);
    }
  }, f = (u) => u.done ? i(u.value) : Promise.resolve(u.value).then(o, c);
  f((s = s.apply(n, e)).next());
});
var $ = (n, e, s) => (e = n[X("asyncIterator")]) ? e.call(n) : (n = n[X("iterator")](), e = {}, s = (i, r) => (r = n[i]) && (e[i] = (o) => new Promise((c, f, u) => (o = r.call(n, o), u = o.done, Promise.resolve(o.value).then((w) => c({ value: w, done: u }), f)))), s("next"), s("return"), e);
import { URLPattern as at } from "urlpattern-polyfill";
import { Notifier as nt } from "../notifier/index.js";
import { i as _ } from "../browser-0zX67oeU.js";
import { d as ht } from "../function-C10DGppn.js";
import { n as rt, c as ot, s as ct } from "../url-DMNfW7uN.js";
import { i as lt } from "../instantiate-D19vO5Ku.js";
import { i as Z } from "../object-D6MVWB4l.js";
var y, U, A, p, m, L, k, v, E, R, M, tt;
class ut {
  constructor(e, s) {
    h(this, M);
    h(this, y, void 0);
    h(this, U, void 0);
    h(this, A, void 0);
    h(this, p, void 0);
    h(this, m, void 0);
    h(this, L, void 0);
    h(this, k, void 0);
    h(this, v, null);
    h(this, E, []);
    h(this, R, []);
    a(this, y, e), a(this, U, s), a(this, A, new URLPattern({ pathname: t(this, y) })), a(this, p, null), a(this, m, null), a(this, L, !1), a(this, k, null), _ && a(this, v, new MutationObserver((i) => {
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
    return t(this, m);
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
        if (a(this, R, [...t(this, E)]), typeof o.default == "function" && (a(this, p, o.default), Z(o.default))) {
          const c = "e-" + ((i = t(this, p)) == null ? void 0 : i.name.toLowerCase());
          customElements.get(c) || customElements.define(c, o.default);
        }
      }
      if (yield Y(this, M, tt).call(this), t(this, p)) {
        const o = t(this, A).exec({ pathname: s }), c = (o == null ? void 0 : o.pathname.groups) || {}, f = Object.fromEntries(
          new URLSearchParams(location.search)
        ), u = {
          pathnameParams: c,
          searchParams: f
        };
        Z(t(this, p)) ? a(this, m, new (t(this, p))(u)) : a(this, m, lt(t(this, p), {
          attributes: u
        })), e.appendChild(t(this, m)), a(this, k, t(this, m).querySelector("[data-nest]") || ((r = t(this, m).shadowRoot) == null ? void 0 : r.querySelector("[data-nest]")) || t(this, m).shadowRoot || t(this, m)), a(this, L, !0);
      }
      t(this, v).disconnect();
    });
  }
  close() {
    var e;
    t(this, v).disconnect(), (e = t(this, m)) == null || e.remove(), a(this, L, !1), t(this, R).forEach((s) => document.head.removeChild(s)), a(this, R, []);
  }
  getAnchorElements() {
    var s;
    let e = [];
    return t(this, m) && (e = [...t(this, m).querySelectorAll("a")]), (s = t(this, m)) != null && s.shadowRoot && (e = [
      ...e,
      ...t(this, m).shadowRoot.querySelectorAll("a")
    ]), e;
  }
}
y = new WeakMap(), U = new WeakMap(), A = new WeakMap(), p = new WeakMap(), m = new WeakMap(), L = new WeakMap(), k = new WeakMap(), v = new WeakMap(), E = new WeakMap(), R = new WeakMap(), M = new WeakSet(), tt = function() {
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
var S, d, P, O, N, x;
class mt {
  constructor(e, s) {
    h(this, S, void 0);
    h(this, d, void 0);
    h(this, P, void 0);
    h(this, O, void 0);
    h(this, N, void 0);
    h(this, x, (e) => {
      e.preventDefault(), t(this, S).links.forEach((s) => {
        var i;
        t(this, P) === t(s, P) || (i = t(s, N)) != null && i.includes(t(this, P)) ? t(s, d).classList.add("clicked") : t(s, d).classList.remove("clicked");
      }), t(this, S).navigate(t(this, P), t(this, O));
    });
    var o, c;
    a(this, S, e), a(this, d, s), a(this, P, t(this, d).getAttribute("href") || "/"), a(this, O, t(this, d).getAttribute(
      "data-history-action"
    ) || "push"), t(this, d).addEventListener("click", t(this, x));
    const i = e.normalizePath(t(this, P)), r = e.normalizePath(location.pathname);
    a(this, N, (o = t(this, d).getAttribute("data-match-paths")) == null ? void 0 : o.split(",").map((f) => e.normalizePath(f.trim()).pathname)), t(this, d).hasAttribute("data-include") ? r.pathname.includes(i.pathname) && t(this, d).classList.add("current") : i.pathname === r.pathname || (c = t(this, N)) != null && c.includes(r.pathname) ? (t(this, d).classList.add("current"), t(this, d).classList.add("clicked")) : t(this, d).classList.remove("clicked");
  }
  destroy() {
    t(this, d).removeEventListener("click", t(this, x)), t(this, d).classList.remove("current");
  }
}
S = new WeakMap(), d = new WeakMap(), P = new WeakMap(), O = new WeakMap(), N = new WeakMap(), x = new WeakMap();
globalThis.URLPattern = at;
var C, z, g, q, H, b, T, B, j, D, et, K;
class Et {
  constructor(e) {
    h(this, D);
    h(this, C, null);
    h(this, z, null);
    h(this, g, []);
    h(this, q, null);
    h(this, H, []);
    h(this, b, void 0);
    h(this, T, null);
    h(this, B, new nt());
    h(this, j, ht(() => {
      const e = (s) => s.split("/").length;
      a(this, g, t(this, g).sort((s, i) => e(s.pattern) - e(i.pattern))), this.navigate(location.pathname);
    }, 0));
    h(this, K, (e) => {
      e.state && this.navigate(e.state, "none");
    });
    _ && (e != null && e.base ? a(this, z, rt(e.base)) : a(this, z, "/"), a(this, C, (e == null ? void 0 : e.rootElement) || document.body), addEventListener("popstate", t(this, K)));
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
    const i = new ut(e, s);
    t(this, g).push(i), t(this, j).call(this);
  }
  navigate(e, s = "push") {
    return I(this, null, function* () {
      var J, Q;
      const i = this.normalizePath(e);
      let { pathname: r, hash: o, parameters: c, leaf: f } = i;
      if (t(this, b) === r || t(this, T) === r)
        return;
      a(this, b, r);
      const u = t(this, g).filter((l) => l.isActive), w = t(this, g).filter(
        (l) => !u.includes(l) && l.testPathname(f)
      ), st = u.filter((l) => !l.testPathname(f)), F = u.filter((l) => l.testPathname(f));
      let G = !0;
      if (this.preprocessor)
        try {
          yield new Promise((l, it) => {
            var V;
            (V = this.preprocessor) == null || V.call(this, { path: i, resolve: l, reject: it });
          });
        } catch (l) {
          l ? console.error(l) : console.log("Route change canceled"), G = !1;
        }
      if (G && t(this, b) === r) {
        a(this, q, F[F.length - 1]), st.forEach((l) => {
          l.close();
        }), a(this, T, r), ot(s, r, c, o);
        try {
          for (var yt = $(w), At, kt, St; At = !(kt = yield yt.next()).done; At = !1) {
            const l = kt.value;
            yield l.render(((J = t(this, q)) == null ? void 0 : J.nest) || t(this, C), r), a(this, q, l);
          }
        } catch (kt) {
          St = [kt];
        } finally {
          try {
            At && (kt = yt.return) && (yield kt.call(yt));
          } finally {
            if (St)
              throw St[0];
          }
        }
        Y(this, D, et).call(this), (Q = this.postprocessor) == null || Q.call(this, { pathname: r }), t(this, B).notify({ pathname: r });
      }
    });
  }
  normalizePath(e) {
    return ct(e, t(this, z));
  }
}
C = new WeakMap(), z = new WeakMap(), g = new WeakMap(), q = new WeakMap(), H = new WeakMap(), b = new WeakMap(), T = new WeakMap(), B = new WeakMap(), j = new WeakMap(), D = new WeakSet(), et = function() {
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
  }), a(this, H, s.map((i) => new mt(this, i)));
}, K = new WeakMap();
export {
  Et as Router
};
