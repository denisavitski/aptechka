var h = (e, s, r) => {
  if (!s.has(e))
    throw TypeError("Cannot " + r);
};
var c = (e, s, r) => (h(e, s, "read from private field"), r ? r.call(e) : s.get(e)), b = (e, s, r) => {
  if (s.has(e))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(e) : s.set(e, r);
}, l = (e, s, r, i) => (h(e, s, "write to private field"), i ? i.call(e, r) : s.set(e, r), r);
import { elementResizer as m } from "../element-resizer/index.js";
import { S as d } from "../Store-JOKrNVEr.js";
import { windowResizer as a } from "../window-resizer/index.js";
var t, u;
class o extends d {
  constructor(r, i) {
    super(r(), i);
    b(this, t, void 0);
    b(this, u, () => {
      this.current = c(this, t).call(this);
    });
    l(this, t, r), (i == null ? void 0 : i.dispatcher) instanceof Element ? m.subscribe(i.dispatcher, c(this, u)) : a.subscribe(c(this, u));
  }
  close() {
    super.close(), a.unsubscribe(c(this, t)), m.unsubscribe(c(this, t));
  }
}
t = new WeakMap(), u = new WeakMap();
export {
  o as Resized
};
