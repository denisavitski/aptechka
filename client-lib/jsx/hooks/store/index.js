import { S as n } from "../../../Store-Qr3SNOSf.js";
import { C as t } from "../../../Composed-Fa7owymK.js";
import { _ as r } from "../../../_createStore-D3qHYaSz.js";
import { D as c, A as o } from "../../../Derived-rInkx3e4.js";
import { DerivedArray as a, AsyncDerivedArray as i, Cached as u, AsyncCached as s, Resource as d } from "../../../store/index.js";
function D(...e) {
  return r(new t(...e));
}
function p(...e) {
  return r(new c(...e));
}
function v(...e) {
  return r(new o(...e));
}
function C(...e) {
  return r(new a(...e));
}
function h(...e) {
  return r(
    new i(...e)
  );
}
function S(...e) {
  return r(new u(...e));
}
function R(...e) {
  return r(new s(...e));
}
function _(...e) {
  return r(new d(...e));
}
function x(...e) {
  return r(new n(...e));
}
export {
  R as createAsyncCached,
  v as createAsyncDerived,
  h as createAsyncDerivedArray,
  S as createCached,
  D as createComposed,
  p as createDerived,
  C as createDerivedArray,
  _ as createResource,
  x as createStore
};
