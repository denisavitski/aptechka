"use strict";var B=(h,i,s)=>{if(!i.has(h))throw TypeError("Cannot "+s)};var e=(h,i,s)=>(B(h,i,"read from private field"),s?s.call(h):i.get(h)),r=(h,i,s)=>{if(i.has(h))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(h):i.set(h,s)},t=(h,i,s,n)=>(B(h,i,"write to private field"),n?n.call(h,s):i.set(h,s),s);var S=(h,i,s)=>(B(h,i,"access private method"),s);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const E=require("../browser-CpzFX2xg.cjs"),M=require("../dom-JBOkFLTh.cjs");var d,u,F,b,m,l,o,g,q;class V{constructor(i,s){r(this,d,void 0);r(this,u,void 0);r(this,F,void 0);r(this,b,0);r(this,m,0);r(this,l,0);r(this,o,!1);r(this,g,null);r(this,q,i=>{const s=i[0];t(this,o,s.isIntersecting)});if(t(this,d,i),t(this,u,s==null?void 0:s.maxFPS),t(this,F,(s==null?void 0:s.order)||0),s!=null&&s.culling&&E.isBrowser){const n=M.getElement(s.culling);n&&(t(this,g,new IntersectionObserver(e(this,q))),e(this,g).observe(n))}else t(this,o,!0)}get callback(){return e(this,d)}get order(){return e(this,F)}sync(i){t(this,b,i-e(this,l))}tick(i){if(t(this,l,Math.max(0,i-e(this,b))),e(this,m)||t(this,m,i),e(this,u))if(e(this,l)>=1e3/e(this,u))t(this,b,i-e(this,l)%e(this,u));else return;else t(this,b,i);e(this,o)&&e(this,d).call(this,{timeBetweenFrames:e(this,l),timestamp:i,subscribeTimestamp:e(this,m),timeElapsedSinceSubscription:i-e(this,m)})}destroy(){var i;(i=e(this,g))==null||i.disconnect()}}d=new WeakMap,u=new WeakMap,F=new WeakMap,b=new WeakMap,m=new WeakMap,l=new WeakMap,o=new WeakMap,g=new WeakMap,q=new WeakMap;var v,f,a,y,c,A,I,w,L,k,T;class x{constructor(){r(this,A);r(this,w);r(this,v,0);r(this,f,0);r(this,a,void 0);r(this,y,!1);r(this,c,[]);r(this,k,i=>{if(e(this,y)){t(this,y,!1),t(this,v,i-e(this,f));for(const s of e(this,c))s.sync(e(this,f))}t(this,a,requestAnimationFrame(e(this,k))),t(this,f,i-e(this,v));for(const s of e(this,c))s.tick(e(this,f))});r(this,T,()=>{document.hidden&&t(this,y,!0)});E.isBrowser&&document.addEventListener("visibilitychange",e(this,T))}subscribe(i,s){if(!e(this,c).find(n=>n.callback===i)){const n=new V(i,s);n.sync(performance.now()),e(this,c).push(n),t(this,c,e(this,c).sort((O,P)=>O.order-P.order))}return S(this,A,I).call(this),()=>this.unsubscribe(i)}unsubscribe(i){const s=e(this,c).filter(n=>n.callback===i);s.length&&(s.forEach(n=>n.destroy()),t(this,c,e(this,c).filter(n=>n.callback!==i)),e(this,c).length||S(this,w,L).call(this))}destroy(){E.isBrowser&&(S(this,w,L).call(this),document.removeEventListener("visibilitychange",e(this,T)))}}v=new WeakMap,f=new WeakMap,a=new WeakMap,y=new WeakMap,c=new WeakMap,A=new WeakSet,I=function(){e(this,c).length&&!e(this,a)&&t(this,a,requestAnimationFrame(e(this,k)))},w=new WeakSet,L=function(){e(this,a)&&(cancelAnimationFrame(e(this,a)),t(this,a,void 0))},k=new WeakMap,T=new WeakMap;const j=new x;exports.Ticker=x;exports.ticker=j;