var c = (s, r, e) => {
  if (!r.has(s))
    throw TypeError("Cannot " + e);
};
var o = (s, r, e) => (c(s, r, "read from private field"), e ? e.call(s) : r.get(s)), a = (s, r, e) => {
  if (r.has(s))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(s) : r.set(s, e);
};
import { C as i } from "../WheelControls-BJdZsEkS.js";
import { K as p, W as u } from "../WheelControls-BJdZsEkS.js";
import { ticker as n } from "../ticker/index.js";
var t;
class m extends i {
  constructor(e) {
    super();
    a(this, t, (e) => {
      this.changeEvent.notify(e.elapsed * this.speed);
    });
    this.speed = (e == null ? void 0 : e.speed) || 1;
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
  i as Controls,
  p as KeyboardControls,
  m as LinearControls,
  u as WheelControls
};
