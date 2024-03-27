var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _plugin, _srcPath, _componentsPath, _publicPath, _currentComponentHTMLFilePaths, _currentComponentFolderPaths, _dom, _layout, _bracketsRegExp, _transform, transform_fn, _attributes, attributes_fn, _nest, nest_fn, _resources, resources_fn, _joinPaths, joinPaths_fn;
import { normalizePath } from "vite";
import { resolve, join } from "path";
import { parseHTML } from "linkedom";
import { existsSync, readdir, readFileSync } from "fs";
class HTMC {
  constructor(options) {
    __privateAdd(this, _transform);
    __privateAdd(this, _attributes);
    __privateAdd(this, _nest);
    __privateAdd(this, _resources);
    __privateAdd(this, _joinPaths);
    __privateAdd(this, _plugin, void 0);
    __privateAdd(this, _srcPath, void 0);
    __privateAdd(this, _componentsPath, void 0);
    __privateAdd(this, _publicPath, void 0);
    __privateAdd(this, _currentComponentHTMLFilePaths, /* @__PURE__ */ new Set());
    __privateAdd(this, _currentComponentFolderPaths, /* @__PURE__ */ new Set());
    __privateAdd(this, _dom, null);
    __privateAdd(this, _layout, void 0);
    __privateAdd(this, _bracketsRegExp, new RegExp("({{[^}]*}})", "g"));
    __privateSet(this, _srcPath, normalizePath(
      resolve(process.cwd(), (options == null ? void 0 : options.srcFolderName) || "src")
    ));
    __privateSet(this, _componentsPath, __privateMethod(this, _joinPaths, joinPaths_fn).call(this, __privateGet(this, _srcPath), "components"));
    __privateSet(this, _publicPath, __privateMethod(this, _joinPaths, joinPaths_fn).call(this, __privateGet(this, _srcPath), "static"));
    const layoutPath = __privateMethod(this, _joinPaths, joinPaths_fn).call(this, __privateGet(this, _srcPath), "components", "layout");
    if (existsSync(layoutPath)) {
      __privateSet(this, _layout, `
        <component name="layout">
         @
        </component>
      `);
    } else {
      __privateSet(this, _layout, `
        <!doctype html>
        <html>
          <head></head>
          <body>
            @
          </body>
        </html>
      `);
    }
    const pages = {};
    readdir(__privateGet(this, _srcPath), { recursive: true }, (_, files) => {
      files.forEach((f) => {
        if (typeof f === "string") {
          if (!f.includes("components") && f.includes("html")) {
            pages[f] = __privateMethod(this, _joinPaths, joinPaths_fn).call(this, __privateGet(this, _srcPath), f);
          }
        }
      });
    });
    __privateSet(this, _plugin, {
      name: "vite-plugin-htmc",
      config: (config, env) => {
        var _a, _b, _c, _d;
        if (env.mode === "production" && env.command === "serve") {
          return;
        }
        config.root = __privateGet(this, _srcPath);
        config.publicDir = __privateGet(this, _publicPath);
        config.resolve = {
          ...config.resolve,
          alias: {
            ...(_a = config.resolve) == null ? void 0 : _a.alias,
            "@components": __privateGet(this, _componentsPath)
          }
        };
        config.build = {
          assetsInlineLimit: 0,
          emptyOutDir: true,
          modulePreload: false,
          ...config.build,
          rollupOptions: {
            ...(_b = config.build) == null ? void 0 : _b.rollupOptions,
            input: {
              ...pages
            },
            output: {
              dir: resolve(process.cwd(), (options == null ? void 0 : options.distFolderName) || "dist"),
              chunkFileNames: () => {
                return "assets/[name].js";
              },
              assetFileNames: () => {
                return "assets/[name].[ext]";
              },
              entryFileNames: (e) => {
                return `assets/${e.name.replace(".html", "")}.js`;
              },
              manualChunks: (options == null ? void 0 : options.assets) ? (e) => {
                if ((options == null ? void 0 : options.assets) === "split") {
                  if (e.endsWith("ts") || e.endsWith("css")) {
                    return e.split("/").slice(-2).join("/").split(".")[0];
                  }
                } else {
                  if (e.endsWith("ts")) {
                    return "scripts";
                  } else if (e.endsWith("css")) {
                    return "styles";
                  }
                }
              } : void 0,
              ...(_d = (_c = config.build) == null ? void 0 : _c.rollupOptions) == null ? void 0 : _d.output
            }
          }
        };
      },
      handleHotUpdate: ({ file, server }) => {
        if (__privateGet(this, _currentComponentHTMLFilePaths).has(file)) {
          server.hot.send({
            type: "full-reload",
            path: "*"
          });
        }
      },
      transformIndexHtml: {
        order: "pre",
        handler: async (html, ctx) => {
          var _a;
          if (ctx.originalUrl) {
            const splitted = ctx.originalUrl.split("?")[0].split(".");
            if (splitted.length > 1) {
              const last = splitted[splitted.length - 1];
              if (last !== "html") {
                return;
              }
            }
          }
          __privateGet(this, _currentComponentHTMLFilePaths).clear();
          __privateGet(this, _currentComponentFolderPaths).clear();
          const isComponent = (_a = ctx.originalUrl) == null ? void 0 : _a.includes("/components/");
          if (isComponent) {
            let name = ctx.originalUrl.split("/components/")[1].split("?")[0].split("#")[0];
            html = __privateGet(this, _layout).replace("@", `<component name="${name}" />`);
          }
          __privateGet(this, _currentComponentHTMLFilePaths).add(ctx.filename);
          __privateSet(this, _dom, parseHTML(html));
          __privateMethod(this, _transform, transform_fn).call(this);
          __privateMethod(this, _resources, resources_fn).call(this);
          const res = `<!DOCTYPE html>
` + __privateGet(this, _dom).document.documentElement.outerHTML;
          return res;
        }
      }
    });
  }
  get plugin() {
    return __privateGet(this, _plugin);
  }
}
_plugin = new WeakMap();
_srcPath = new WeakMap();
_componentsPath = new WeakMap();
_publicPath = new WeakMap();
_currentComponentHTMLFilePaths = new WeakMap();
_currentComponentFolderPaths = new WeakMap();
_dom = new WeakMap();
_layout = new WeakMap();
_bracketsRegExp = new WeakMap();
_transform = new WeakSet();
transform_fn = function() {
  let components = [];
  do {
    components = [...__privateGet(this, _dom).document.getElementsByTagName("component")];
    components.forEach((component) => {
      const name = component.getAttribute("name");
      const folderPath = __privateMethod(this, _joinPaths, joinPaths_fn).call(this, __privateGet(this, _srcPath), "components", name, "/");
      if (existsSync(folderPath)) {
        const indexHTMLPath = normalizePath(folderPath + "/index.html");
        if (existsSync(indexHTMLPath)) {
          __privateGet(this, _currentComponentHTMLFilePaths).add(indexHTMLPath);
          const componentHTML = readFileSync(indexHTMLPath, {
            encoding: "utf-8"
          });
          const componentEmptyElement = __privateGet(this, _dom).document.createElement(
            null
          );
          componentEmptyElement.innerHTML = componentHTML.replace(/<!DOCTYPE\s+html>/i, "").trim();
          __privateMethod(this, _attributes, attributes_fn).call(this, component, componentEmptyElement);
          const outerHTML = Array.from(
            componentEmptyElement.childNodes
          ).reduce((p, c) => {
            if (c instanceof __privateGet(this, _dom).Element) {
              __privateMethod(this, _nest, nest_fn).call(this, component, c);
              return p + c.outerHTML;
            } else {
              return p + (c.textContent || "");
            }
          }, "");
          component.outerHTML = outerHTML;
        }
        const componentsNames = folderPath.split(__privateGet(this, _componentsPath))[1].slice(1, -1).split("/");
        componentsNames.reduce((p, c) => {
          const componentFolderPath = normalizePath(`${p}/${c}/`);
          __privateGet(this, _currentComponentFolderPaths).add(componentFolderPath);
          return componentFolderPath;
        }, __privateGet(this, _componentsPath));
      } else {
        component.setAttribute("not-found", "");
        component.textContent = "Компонент не найден";
      }
    });
  } while (components.length && components.filter((c) => c.hasAttribute("not-found")).length !== components.length);
};
_attributes = new WeakSet();
attributes_fn = function(component, componentElement) {
  const allElements = componentElement.querySelectorAll("*");
  const elements = [];
  for (let i = 0; i < allElements.length; i++) {
    const element = allElements[i];
    const attributes = element.attributes;
    for (let j = 0; j < attributes.length; j++) {
      const attributeName = attributes[j].name;
      if (attributeName.startsWith("{{") && attributeName.endsWith("}}")) {
        const normalAttributeName = attributeName.slice(2, -2);
        const attributeValue = attributes[j].value;
        element.removeAttribute(attributeName);
        if (attributeValue) {
          element.setAttribute(normalAttributeName, attributeValue);
        }
        elements.push({
          element,
          attributeName: normalAttributeName,
          defaultValue: attributeValue
        });
      }
    }
  }
  for (const attr of component.attributes) {
    if (attr.name !== "name" && attr.value) {
      elements.forEach((element) => {
        if (element.attributeName === attr.name) {
          const currentValue = element.element.getAttribute(element.attributeName) || "";
          element.element.setAttribute(
            element.attributeName,
            `${currentValue}${currentValue ? " " : ""}${attr.value}`
          );
        }
      });
    }
  }
  for (const attr of component.attributes) {
    if (attr.name !== "name") {
      componentElement.innerHTML = componentElement.innerHTML.replace(
        new RegExp(`{{\\s*${attr.name}\\s*(?:\\|\\|\\s*([^}]*))?\\s*}}`, "g"),
        attr.value
      );
    }
  }
  componentElement.innerHTML = componentElement.innerHTML.replace(
    __privateGet(this, _bracketsRegExp),
    (v) => {
      const content = v.slice(2, -2).split("||");
      if (content.length > 1) {
        return content[1].trim();
      }
      return "";
    }
  );
};
_nest = new WeakSet();
nest_fn = function(component, componentElement) {
  let nestInserts = [...component.children].filter(
    (element) => element.hasAttribute("nest")
  );
  nestInserts.forEach((insert) => {
    insert.remove();
  });
  const defaultInserts = component.innerHTML;
  const nestElements = componentElement.querySelectorAll("nest");
  nestElements.forEach((nestElement) => {
    const name = nestElement.getAttribute("name");
    if (name && name !== "default") {
      const inserts = nestInserts.filter(
        (insert) => insert.getAttribute("nest") === name
      );
      inserts.forEach((insert) => insert.removeAttribute("nest"));
      nestElement.outerHTML = inserts.reduce((p, c) => p + c.outerHTML, "");
      nestInserts = nestInserts.filter((insert) => !inserts.includes(insert));
    } else {
      const inserts = nestInserts.filter(
        (insert) => !insert.getAttribute("nest") || insert.getAttribute("nest") === "default"
      );
      inserts.forEach((insert) => insert.removeAttribute("nest"));
      nestElement.outerHTML = inserts.reduce((p, c) => p + c.outerHTML, "") + defaultInserts;
    }
  });
};
_resources = new WeakSet();
resources_fn = function() {
  const document = __privateGet(this, _dom).document;
  let head = document.querySelector("head");
  if (!head) {
    head = document.createElement("head");
    document.prepend(head);
  }
  const exts = ["js", "ts", "css"];
  __privateGet(this, _currentComponentFolderPaths).forEach((folderPath) => {
    const url = folderPath.split(__privateGet(this, _srcPath))[1];
    exts.forEach((ext) => {
      const urlPath = url + "index." + ext;
      const filePath = __privateMethod(this, _joinPaths, joinPaths_fn).call(this, __privateGet(this, _srcPath), urlPath);
      if (existsSync(filePath)) {
        if (ext === "css") {
          const element = document.createElement("link");
          element.rel = "stylesheet";
          element.href = urlPath;
          head.appendChild(element);
        } else {
          const element = document.createElement("script");
          element.type = "module";
          element.src = urlPath;
          head.appendChild(element);
        }
      }
    });
  });
};
_joinPaths = new WeakSet();
joinPaths_fn = function(...paths) {
  return normalizePath(join(...paths));
};
function htmc(options) {
  return new HTMC(options).plugin;
}
export {
  htmc
};
