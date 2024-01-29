var c = Object.defineProperty;
var m = (s, e, r) => e in s ? c(s, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : s[e] = r;
var i = (s, e, r) => (m(s, typeof e != "symbol" ? e + "" : e, r), r), p = (s, e, r) => {
  if (!e.has(s))
    throw TypeError("Cannot " + r);
};
var o = (s, e, r) => (p(s, e, "read from private field"), r ? r.call(s) : e.get(s)), a = (s, e, r) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, r);
};
import { C as l } from "../WheelControls-F-xg5-oq.js";
import { K as W, W as g, u as v } from "../WheelControls-F-xg5-oq.js";
import { ticker as n } from "../ticker/index.js";
import "../browser-S4eq8AeN.js";
import "../dom-bHEwc_xV.js";
import "../notifier/index.js";
import "../intersector/index.js";
var t;
class k extends l {
  constructor(r) {
    super();
    i(this, "speed");
    a(this, t, (r) => {
      this.changeEvent.notify(r.elapsed * this.speed);
    });
    this.speed = (r == null ? void 0 : r.speed) || 1;
  }
  connect() {
    n.subscribe(o(this, t));
  }
  disconnect() {
    n.unsubscribe(o(this, t));
  }
}
t = new WeakMap();
export {
  l as Controls,
  W as KeyboardControls,
  k as LinearControls,
  g as WheelControls,
  v as user
};
