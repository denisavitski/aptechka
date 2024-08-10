"use strict";var T=(s,i,t)=>{if(!i.has(s))throw TypeError("Cannot "+t)};var e=(s,i,t)=>(T(s,i,"read from private field"),t?t.call(s):i.get(s)),n=(s,i,t)=>{if(i.has(s))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(s):i.set(s,t)},h=(s,i,t,l)=>(T(s,i,"write to private field"),l?l.call(s,t):i.set(s,t),t);var v=(s,i,t)=>(T(s,i,"access private method"),t);require("./Store-Cr3VaD9G.cjs");const q=require("./browser-CpzFX2xg.cjs"),M=require("./events-BGwqaxVW.cjs"),$=require("./style-At6aDoqG.cjs");require("./ticker/index.cjs");const o=require("./tags-B0do5eeb.cjs"),z=require("./createStylesheet-BqjaCUhm.cjs"),D=require("./theme/index.cjs"),R=z.createStylesheet({":host":{position:"relative"},".head":{width:"100%",cursor:"default",background:"none",border:"none",color:"inherit",fontFamily:"inherit",fontSize:"inherit",fontWeight:"inherit",textAlign:"start",padding:"0",margin:"0"},".body":{boxSizing:"border-box",position:"var(--position, unset)",top:"100%",left:"0",width:"100%",overflow:"hidden",transitionDuration:"var(--duration, var(--duration-short))",transitionProperty:"height",cursor:"default"},".body-inner":{display:"grid",gap:"var(--gap, 0px)",width:"100%",paddingTop:"var(--gap, 0px)"}});var c,d,r,a,u,m,L,E,C;const I=class I extends HTMLElement{constructor(){super();n(this,E);n(this,c,null);n(this,d,"");n(this,r,null);n(this,a,!1);n(this,u,void 0);n(this,m,null);n(this,L,()=>{M.dispatchSizeChangeEvent(this)});q.isBrowser&&(this.attachShadow({mode:"open"}).adoptedStyleSheets.push(R),h(this,c,this.attachInternals()),h(this,m,new ResizeObserver(e(this,L))),o.element(this,{children:[o.button({class:"head",children:o.slot({name:"head"}),onClick:()=>{this.opened?this.close():this.open()}}),o.div({class:"body",style:{height:"0px"},children:o.div({class:"body-inner",children:o.slot()}),ref:l=>{h(this,r,l)}})]}))}get value(){return e(this,d)}set value(t){h(this,d,t),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),e(this,c).setFormValue(e(this,d))}get internals(){return e(this,c)}get opened(){return e(this,a)}open(){clearTimeout(e(this,u)),h(this,a,!0),e(this,r).style.display="grid",this.classList.add("triggered"),setTimeout(()=>{this.classList.add("opened"),e(this,r).style.height=e(this,r).scrollHeight+"px",v(this,E,C).call(this)},0)}close(){h(this,a,!1),e(this,r).style.height="0px",this.classList.remove("opened"),v(this,E,C).call(this),h(this,u,setTimeout(()=>{this.classList.remove("triggered"),e(this,r).style.display="none"},$.getElementTransitionDurationMS(e(this,r))))}connectedCallback(){e(this,m).observe(e(this,r))}disconnectedCallback(){clearTimeout(e(this,u)),e(this,m).disconnect()}};c=new WeakMap,d=new WeakMap,r=new WeakMap,a=new WeakMap,u=new WeakMap,m=new WeakMap,L=new WeakMap,E=new WeakSet,C=function(){M.dispatchBeforeSizeChangeEvent(this),this.dispatchEvent(new CustomEvent("selectToggle",{bubbles:!0,composed:!0,detail:{opened:e(this,a)}}))},I.formAssociated=!0;let x=I;customElements.get("e-select")||customElements.define("e-select",x);var f;class H extends HTMLElement{constructor(){super(...arguments);n(this,f,null)}get selectElement(){return e(this,f)}connectedCallback(){var l,S;const t=(S=(l=this.assignedSlot)==null?void 0:l.getRootNode())==null?void 0:S.host;t?h(this,f,t):console.log(this,"e-select not found")}}f=new WeakMap;const F=z.createStylesheet({":host":{width:"100%",height:"40px",display:"inline-flex",alignItems:"center"}});var p,w,k;class O extends H{constructor(){super();n(this,w);n(this,p,()=>{this.selectElement.value===this.value?this.style.display="none":this.style.display=""});q.isBrowser&&(this.attachShadow({mode:"open"}).adoptedStyleSheets.push(F),o.element(this,{tabindex:0,onClick:()=>{v(this,w,k).call(this)},onKeydown:l=>{l.code==="Space"&&v(this,w,k).call(this)},children:o.slot()}))}get value(){return(this.hasAttribute("value")?this.getAttribute("value"):this.innerText)||""}connectedCallback(){super.connectedCallback(),this.hasAttribute("default")&&(this.selectElement.value||(this.selectElement.value=this.value)),this.selectElement.addEventListener("change",e(this,p)),setTimeout(()=>{e(this,p).call(this)})}disconnectedCallback(){this.selectElement.removeEventListener("change",e(this,p))}}p=new WeakMap,w=new WeakSet,k=function(){this.selectElement.value=this.value,this.selectElement.close()};customElements.get("e-select-option")||customElements.define("e-select-option",O);const A=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  viewBox="0 0 24 24"
>
  <path d="m12.37 15.835l6.43-6.63C19.201 8.79 18.958 8 18.43 8H5.57c-.528 0-.771.79-.37 1.205l6.43 6.63c.213.22.527.22.74 0Z" />
</svg>
`,P=z.createStylesheet({":host":{width:"100%",height:"40px",display:"inline-flex",alignItems:"center",justifyContent:"space-between"},".default-arrow":{flexShrink:"0",width:"var(--arrow-size, 1em)",height:"var(--arrow-size, 1em)",fill:`var(--arrow-color, ${D.aptechkaTheme.colorMain.var})`,transitionProperty:"transform",transitionDuration:"var(--duration, var(--duration-short))"},":host(.opened) .default-arrow":{transform:"scaleY(-1)"}});var y,g,b;class B extends H{constructor(){super();n(this,y,null);n(this,g,()=>{const l=this.selectElement.shadowRoot.querySelector(".body slot").assignedElements().find(S=>S.value===this.selectElement.value);l&&(e(this,y).innerHTML=l.innerHTML)});n(this,b,()=>{this.classList.toggle("opened",this.selectElement.opened)});q.isBrowser&&(this.attachShadow({mode:"open"}).adoptedStyleSheets.push(P),o.element(this,{children:[o.slot(),o.slot({name:"arrow",children:o.element(A,{class:"default-arrow"})})]}),this.slot="head")}connectedCallback(){super.connectedCallback(),h(this,y,this.querySelector("[data-value-holder]")||this),this.selectElement.addEventListener("change",e(this,g)),e(this,g).call(this),this.selectElement.addEventListener("selectToggle",e(this,b))}disconnectedCallback(){this.selectElement.removeEventListener("change",e(this,g)),this.selectElement.removeEventListener("selectToggle",e(this,b))}}y=new WeakMap,g=new WeakMap,b=new WeakMap;customElements.get("e-select-head")||customElements.define("e-select-head",B);exports.SelectElement=x;exports.SelectHeadElement=B;exports.SelectOptionElement=O;exports.SelectUserElement=H;exports.arrowIcon=A;