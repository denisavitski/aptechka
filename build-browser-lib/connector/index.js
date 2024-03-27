var f = (i, n, e) => {
  if (!n.has(i))
    throw TypeError("Cannot " + e);
};
var c = (i, n, e) => (f(i, n, "read from private field"), e ? e.call(i) : n.get(i)), h = (i, n, e) => {
  if (n.has(i))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(i) : n.set(i, e);
}, d = (i, n, e, l) => (f(i, n, "write to private field"), l ? l.call(i, e) : n.set(i, e), e);
var a, s, o, C;
class b {
  constructor() {
    h(this, a, []);
    h(this, s, void 0);
    h(this, o, 100);
    h(this, C, () => {
      var n, e, l;
      for (let r = c(this, a).length - 1; r >= 0; r--) {
        const t = c(this, a)[r];
        t.node.isConnected && !t.isConnected ? ((n = t.connectCallback) == null || n.call(t), t.isConnected = !0) : !t.node.isConnected && t.isConnected && ((e = t.disconnectCallback) == null || e.call(t), t.isConnected = !1, t.unsubscribeAfterDisconnect && this.unsubscribe(t)), t.timer += c(this, o), !t.isConnected && t.timer > t.maxWaitSec * 1e3 && ((l = t.disconnectCallback) == null || l.call(t, !0), this.unsubscribe(t));
      }
    });
  }
  subscribe(n, e) {
    const l = c(this, a).length;
    return c(this, a).push({
      node: n,
      connectCallback: e.connectCallback,
      disconnectCallback: e.disconnectCallback,
      isConnected: !1,
      maxWaitSec: typeof e.maxWaitSec == "number" ? e.maxWaitSec === 0 ? c(this, o) / 1e3 : e.maxWaitSec : 1 / 0,
      timer: 0,
      unsubscribeAfterDisconnect: e.unsubscribeAfterDisconnect || !1
    }), l || (d(this, s, setInterval(c(this, C), c(this, o))), setTimeout(() => {
      c(this, C).call(this);
    })), () => {
      this.unsubscribe(e);
    };
  }
  unsubscribe(n) {
    c(this, a).forEach((e) => {
      e.connectCallback === n.connectCallback && (e.connectCallback = void 0), e.disconnectCallback === n.disconnectCallback && (e.disconnectCallback = void 0);
    }), d(this, a, c(this, a).filter(
      (e) => e.connectCallback || e.disconnectCallback
    )), c(this, a).length || (clearInterval(c(this, s)), d(this, s, void 0));
  }
  destroy() {
    clearInterval(c(this, s)), d(this, a, []);
  }
}
a = new WeakMap(), s = new WeakMap(), o = new WeakMap(), C = new WeakMap();
const u = new b();
export {
  b as Connector,
  u as connector
};
