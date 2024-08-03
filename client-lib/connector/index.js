var b = (t, c, e) => {
  if (!c.has(t))
    throw TypeError("Cannot " + e);
};
var a = (t, c, e) => (b(t, c, "read from private field"), e ? e.call(t) : c.get(t)), r = (t, c, e) => {
  if (c.has(t))
    throw TypeError("Cannot add the same private member more than once");
  c instanceof WeakSet ? c.add(t) : c.set(t, e);
}, d = (t, c, e, s) => (b(t, c, "write to private field"), s ? s.call(t, e) : c.set(t, e), e);
import { TICK_ORDER as m } from "../order/index.js";
import { ticker as h } from "../ticker/index.js";
var i, l, o;
class k {
  constructor() {
    r(this, i, []);
    r(this, l, void 0);
    r(this, o, (c) => {
      var e, s, f;
      for (let C = a(this, i).length - 1; C >= 0; C--) {
        const n = a(this, i)[C];
        n.node.isConnected && !n.isConnected ? ((e = n.connectCallback) == null || e.call(n, n.node), n.isConnected = !0) : !n.node.isConnected && n.isConnected && ((s = n.disconnectCallback) == null || s.call(n, n.node), n.isConnected = !1, n.unsubscribeAfterDisconnect && this.unsubscribe(n)), n.isConnected || (n.timer = Math.max(
          0,
          c.timeElapsedSinceSubscription - n.startTime
        ), n.timer > n.maxWaitSec * 1e3 && ((f = n.disconnectCallback) == null || f.call(n, n.node, !0), this.unsubscribe(n)));
      }
    });
  }
  subscribe(c, e) {
    const s = a(this, i).length;
    return a(this, i).push({
      node: c,
      connectCallback: e.connectCallback,
      disconnectCallback: e.disconnectCallback,
      isConnected: !1,
      maxWaitSec: typeof e.maxWaitSec == "number" ? e.maxWaitSec : 1 / 0,
      timer: 0,
      startTime: performance.now(),
      unsubscribeAfterDisconnect: e.unsubscribeAfterDisconnect || !1
    }), s || h.subscribe(a(this, o), {
      order: m.CONNECTOR
    }), () => {
      this.unsubscribe(e);
    };
  }
  unsubscribe(c) {
    a(this, i).forEach((e) => {
      e.connectCallback === c.connectCallback && (e.connectCallback = void 0), e.disconnectCallback === c.disconnectCallback && (e.disconnectCallback = void 0);
    }), d(this, i, a(this, i).filter(
      (e) => e.connectCallback || e.disconnectCallback
    )), a(this, i).length || (h.unsubscribe(a(this, o)), d(this, l, void 0));
  }
  destroy() {
    clearInterval(a(this, l)), d(this, i, []);
  }
}
i = new WeakMap(), l = new WeakMap(), o = new WeakMap();
const v = new k();
export {
  k as Connector,
  v as connector
};
