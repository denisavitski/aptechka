"use strict";var w=(s,r,e)=>{if(!r.has(s))throw TypeError("Cannot "+e)};var t=(s,r,e)=>(w(s,r,"read from private field"),e?e.call(s):r.get(s)),c=(s,r,e)=>{if(r.has(s))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(s):r.set(s,e)},i=(s,r,e,n)=>(w(s,r,"write to private field"),n?n.call(s,e):r.set(s,e),e);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const R=require("../css-value-parser/index.cjs"),V=require("../order/index.cjs"),g=require("../Store-Cr3VaD9G.cjs"),p=require("../dom-JBOkFLTh.cjs"),f=require("../window-resizer/index.cjs");var a,b,u,o,h,l;class v extends g.Store{constructor(e,n,d,S){super(d,S);c(this,a,void 0);c(this,b,void 0);c(this,u,void 0);c(this,o,void 0);c(this,h,!1);c(this,l,()=>{this.check()});i(this,a,p.getElement(e)),i(this,b,n),i(this,u,d.toString()),i(this,o,(S==null?void 0:S.rawValueCheck)!==!1)}get currentRawValue(){return t(this,u)}observe(){t(this,h)||(i(this,h,!0),f.windowResizer.subscribe(t(this,l),V.RESIZE_ORDER.CSS_VARIABLE))}unobserve(){t(this,h)&&(i(this,h,!1),f.windowResizer.unsubscribe(t(this,l)))}subscribe(e){return this.subscribers.size||this.observe(),super.subscribe(e)}unsubscribe(e){super.unsubscribe(e),this.subscribers.size||this.unobserve()}close(){this.unobserve(),super.close()}check(){const e=getComputedStyle(t(this,a)).getPropertyValue(t(this,b));if(!(t(this,o)&&t(this,u)===e))if(i(this,u,e),e){const n=R.cssValueParser.parse(t(this,u));this.current=n}else this.current=this.initial}}a=new WeakMap,b=new WeakMap,u=new WeakMap,o=new WeakMap,h=new WeakMap,l=new WeakMap;exports.CSSProperty=v;