import { c as n } from "./globals-DMjysUXI.js";
function t(e) {
  n.value.addDisconnectCallback(e);
}
function a(e) {
  const o = typeof e == "function" ? e(n.value) : e;
  return n.value && t(() => o.close()), o;
}
export {
  a as _,
  t as o
};
