import { CustomElement as e } from "../custom-element/index.js";
import "../Store-JOKrNVEr.js";
import { i as o } from "../browser-0zX67oeU.js";
import { e as r } from "../tags-C2jg1zYB.js";
class l extends e {
  constructor() {
    super(), o && r(this, {
      style: {
        cursor: "default"
      },
      tabIndex: this.getAttribute("tabindex") || "0",
      role: "button",
      onKeydown: (t) => {
        t.code === "Space" && this.click();
      },
      onClick: () => {
        this.click();
      }
    });
  }
}
export {
  l as AbstractButtonElement
};
