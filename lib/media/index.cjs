"use strict";var d=(e,r,s)=>{if(!r.has(e))throw TypeError("Cannot "+s)};var o=(e,r,s)=>(d(e,r,"read from private field"),s?s.call(e):r.get(e)),c=(e,r,s)=>{if(r.has(e))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(e):r.set(e,s)},u=(e,r,s,n)=>(d(e,r,"write to private field"),n?n.call(e,s):r.set(e,s),s);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const a=require("../order/index.cjs"),l=require("../window-resizer/index.cjs"),h=require("../Store-Cr3VaD9G.cjs");var i,t;class b extends h.Store{constructor(s){super(!1);c(this,i,void 0);c(this,t,void 0);u(this,i,s),u(this,t,l.windowResizer.subscribe(()=>{matchMedia(o(this,i)).matches?this.current=!0:this.current=!1},a.RESIZE_ORDER.MEDIA))}close(){super.close(),o(this,t).call(this)}}i=new WeakMap,t=new WeakMap;exports.Media=b;