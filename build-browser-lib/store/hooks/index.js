import { _ as r } from "../../createStore-DncUX-yj.js";
import { S as t } from "../../Store-JOKrNVEr.js";
import { D as o } from "../../Derived-Bc88XJ8J.js";
import { D as n, C as a, R as c } from "../../Composed-ClTo1f0b.js";
function f(...e) {
  return r(new t(...e));
}
function p(...e) {
  return r(new o(...e));
}
function d(...e) {
  return r(new n(...e));
}
function D(...e) {
  return r(new a(...e));
}
function w(...e) {
  return r(new c(...e));
}
export {
  D as createComposed,
  p as createDerived,
  d as createDerivedArray,
  w as createResource,
  f as createStore
};
