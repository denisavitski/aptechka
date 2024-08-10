import "../Store-Qr3SNOSf.js";
import { i as e } from "../browser-0zX67oeU.js";
import "../ticker/index.js";
import { aD as r } from "../tags-wG5k157g.js";
import { c as t } from "../createTheme-CHnsCgAr.js";
const a = t(
  {
    colorMain: "#1c1c1c",
    colorMainAux: "#282828",
    colorFont: "#ffffff",
    colorActive: "#00E5B0",
    borderRadius: "12px",
    borderRadiusSmall: "4px"
  },
  { prefix: "aptechka-" }
);
if (e) {
  const o = r({
    ":root": a.style
  }).node;
  o.setAttribute("data-permanent", ""), document.head.appendChild(o);
}
export {
  a as aptechkaTheme
};
