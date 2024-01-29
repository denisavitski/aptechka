var h = (r, s, i) => {
  if (!s.has(r))
    throw TypeError("Cannot " + i);
};
var b = (r, s, i) => (h(r, s, "read from private field"), i ? i.call(r) : s.get(r)), o = (r, s, i) => {
  if (s.has(r))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(r) : s.set(r, i);
}, c = (r, s, i, e) => (h(r, s, "write to private field"), e ? e.call(r, i) : s.set(r, i), i);
var t;
class n {
  constructor() {
    o(this, t, []);
  }
  close() {
    c(this, t, []);
  }
  subscribe(s, i = 0) {
    return b(this, t).find((e) => e.callback === s) ? () => {
    } : (b(this, t).push({
      callback: s,
      order: i
    }), c(this, t, b(this, t).sort((e, u) => e.order - u.order)), () => {
      this.unsubscribe(s);
    });
  }
  unsubscribe(s) {
    c(this, t, b(this, t).filter((i) => i.callback !== s));
  }
  notify(...s) {
    for (const i of b(this, t))
      i.callback(...s);
  }
}
t = new WeakMap();
export {
  n as Notifier
};
