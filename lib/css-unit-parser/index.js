var d = (t, e, i) => {
  if (!e.has(t))
    throw TypeError("Cannot " + i);
};
var n = (t, e, i) => (d(t, e, "read from private field"), i ? i.call(t) : e.get(t)), l = (t, e, i) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, i);
}, h = (t, e, i, r) => (d(t, e, "write to private field"), r ? r.call(t, i) : e.set(t, i), i);
var c = (t, e, i) => (d(t, e, "access private method"), i);
var s, o, m;
class a {
  constructor() {
    l(this, o);
    l(this, s, null);
  }
  parse(e) {
    c(this, o, m).call(this), n(this, s).style.left = e;
    const i = getComputedStyle(n(this, s)).getPropertyValue("left");
    return parseFloat(i);
  }
}
s = new WeakMap(), o = new WeakSet(), m = function() {
  n(this, s) || (h(this, s, document.createElement("div")), n(this, s).style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        visibility: hidden;
      `), document.body.contains(n(this, s)) || document.body.prepend(n(this, s));
};
const u = new a();
export {
  u as cssUnitParser
};
