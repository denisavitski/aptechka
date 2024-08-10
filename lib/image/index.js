import "../window-resizer/index.js";
import "../Store-Qr3SNOSf.js";
import { SourceElement as m } from "../source/index.js";
class t extends m {
  createConsumer() {
    return document.createElement("img");
  }
  consumeSource(e) {
    this.consumerElement.src = e || "";
  }
}
customElements.get("e-image") || customElements.define("e-image", t);
export {
  t as ImageElement
};
