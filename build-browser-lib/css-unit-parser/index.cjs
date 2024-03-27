"use strict";var r=(t,e,s)=>{if(!e.has(t))throw TypeError("Cannot "+s)};var n=(t,e,s)=>(r(t,e,"read from private field"),s?s.call(t):e.get(t)),d=(t,e,s)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,s)},c=(t,e,s,l)=>(r(t,e,"write to private field"),l?l.call(t,s):e.set(t,s),s);var a=(t,e,s)=>(r(t,e,"access private method"),s);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});var i,o,h;class u{constructor(){d(this,o);d(this,i,null)}parse(e){a(this,o,h).call(this),n(this,i).style.left=e;const s=getComputedStyle(n(this,i)).getPropertyValue("left");return parseFloat(s)}}i=new WeakMap,o=new WeakSet,h=function(){n(this,i)||(c(this,i,document.createElement("div")),n(this,i).style.cssText=`
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        visibility: hidden;
      `),document.body.contains(n(this,i))||document.body.prepend(n(this,i))};const m=new u;exports.cssUnitParser=m;
