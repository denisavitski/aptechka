"use strict";var p=(e,r,s)=>{if(!r.has(e))throw TypeError("Cannot "+s)};var a=(e,r,s)=>(p(e,r,"read from private field"),s?s.call(e):r.get(e)),h=(e,r,s)=>{if(r.has(e))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(e):r.set(e,s)},v=(e,r,s,c)=>(p(e,r,"write to private field"),c?c.call(e,s):r.set(e,s),s);var D=(e,r,s)=>new Promise((c,i)=>{var n=t=>{try{u(s.next(t))}catch(d){i(d)}},b=t=>{try{u(s.throw(t))}catch(d){i(d)}},u=t=>t.done?c(t.value):Promise.resolve(t.value).then(n,b);u((s=s.apply(e,r)).next())});const y=require("./Store-Cr3VaD9G.cjs");var o;class S extends y.Store{constructor(s,c,i){super(null,i);h(this,o,void 0);v(this,o,s.subscribe(n=>{this.current=c(n.current)}))}close(){super.close(),a(this,o).call(this)}}o=new WeakMap;var l;class x extends y.Store{constructor(s,c,i){super(null,i);h(this,l,void 0);let n=0;v(this,l,s.subscribe(b=>D(this,null,function*(){const u=++n,t=yield c(b.current);n===u&&(this.current=t)})))}close(){super.close(),a(this,l).call(this)}}l=new WeakMap;exports.AsyncDerived=x;exports.Derived=S;