"use strict";function r(t,n,e){return(1-e)*t+e*n}function p(t,n,e,c){return r(t,n,1-Math.exp(-e*c))}function l(t,n,e=0,c=1){return n<t?e:c}function d(t,n=5){return+t.toFixed(n)}function i(t,n=0,e=0){return Math.max(n,Math.min(t,e))}function f(t,n,e){const a=(t-n[0])/(n[1]-n[0])*(e[1]-e[0])+e[0];return i(a,e[0],e[1])}function h(t,n,e){return t<=n?0:t>=e?1:(t=(t-n)/(e-n),t*t*(3-2*t))}function m(t,n,e){return t<=n?0:t>=e?1:(t=(t-n)/(e-n),t*t*t*(t*(t*6-15)+10))}function M(t,n){const e=n.x-t.x,c=n.y-t.y;return Math.sqrt(Math.pow(e,2)+Math.pow(c,2))}function D(t,n,e,c,a,u){const s=c-t,o=a-n;return Math.sqrt(s*s+o*o)-(e+u)}exports.calculateDistance=M;exports.calculateDistanceWithRadius=D;exports.clamp=i;exports.damp=p;exports.lerp=r;exports.mapRange=f;exports.round=d;exports.smootherstep=m;exports.smoothstep=h;exports.step=l;