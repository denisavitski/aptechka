"use strict";function c(n,t){const o=new Blob([JSON.stringify(t)],{type:"application/json"}),e=document.createElement("a");e.download=n+".json",e.href=window.URL.createObjectURL(o),e.dataset.downloadurl=["application/json",e.download,e.href].join(":");const a=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0});e.dispatchEvent(a),e.remove()}exports.createJSONAndSave=c;