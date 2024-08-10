function c(n, o) {
  const t = new Blob([JSON.stringify(o)], { type: "application/json" }), e = document.createElement("a");
  e.download = n + ".json", e.href = window.URL.createObjectURL(t), e.dataset.downloadurl = ["application/json", e.download, e.href].join(":");
  const a = new MouseEvent("click", {
    view: window,
    bubbles: !0,
    cancelable: !0
  });
  e.dispatchEvent(a), e.remove();
}
export {
  c
};
