var v = (e, r, s) => {
  if (!r.has(e))
    throw TypeError("Cannot " + s);
};
var h = (e, r, s) => (v(e, r, "read from private field"), s ? s.call(e) : r.get(e)), p = (e, r, s) => {
  if (r.has(e))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(e) : r.set(e, s);
}, d = (e, r, s, c) => (v(e, r, "write to private field"), c ? c.call(e, s) : r.set(e, s), s);
var x = (e, r, s) => new Promise((c, n) => {
  var u = (t) => {
    try {
      i(s.next(t));
    } catch (b) {
      n(b);
    }
  }, a = (t) => {
    try {
      i(s.throw(t));
    } catch (b) {
      n(b);
    }
  }, i = (t) => t.done ? c(t.value) : Promise.resolve(t.value).then(u, a);
  i((s = s.apply(e, r)).next());
});
import { S as D } from "./Store-Qr3SNOSf.js";
var o;
class y extends D {
  constructor(s, c, n) {
    super(null, n);
    p(this, o, void 0);
    d(this, o, s.subscribe((u) => {
      this.current = c(u.current);
    }));
  }
  close() {
    super.close(), h(this, o).call(this);
  }
}
o = new WeakMap();
var l;
class A extends D {
  constructor(s, c, n) {
    super(null, n);
    p(this, l, void 0);
    let u = 0;
    d(this, l, s.subscribe((a) => x(this, null, function* () {
      const i = ++u, t = yield c(a.current);
      u === i && (this.current = t);
    })));
  }
  close() {
    super.close(), h(this, l).call(this);
  }
}
l = new WeakMap();
export {
  A,
  y as D
};
