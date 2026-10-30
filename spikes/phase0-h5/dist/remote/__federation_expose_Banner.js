"use strict";
(self["rspackChunksas_wallet_web"] = self["rspackChunksas_wallet_web"] || []).push([["__federation_expose_Banner"], {
"./node_modules/.pnpm/react-strict-dom@0.0.54_postcss@8.5.32_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-strict-dom/dist/web/runtime.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  defaultStyles: () => (defaultStyles),
  merge: () => (merge)
});
/* import */ var _stylexjs_stylex__rspack_import_0 = __webpack_require__("./node_modules/.pnpm/@stylexjs+stylex@0.15.4/node_modules/@stylexjs/stylex/lib/es/stylex.mjs");
/**
 * @license react-strict-dom
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */




var styleq$1 = {};
Object.defineProperty(styleq$1, "__esModule", {
  value: true
});
var styleq_2 = styleq$1.styleq = void 0;
var cache = new WeakMap();
var compiledKey = '$$css';
function createStyleq(options) {
  var disableCache;
  var disableMix;
  var transform;
  if (options != null) {
    disableCache = options.disableCache === true;
    disableMix = options.disableMix === true;
    transform = options.transform;
  }
  return function styleq() {
    var definedProperties = [];
    var className = '';
    var inlineStyle = null;
    var debugString = '';
    var nextCache = disableCache ? null : cache;
    var styles = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
      styles[i] = arguments[i];
    }
    while (styles.length > 0) {
      var possibleStyle = styles.pop();
      if (possibleStyle == null || possibleStyle === false) {
        continue;
      }
      if (Array.isArray(possibleStyle)) {
        for (var _i = 0; _i < possibleStyle.length; _i++) {
          styles.push(possibleStyle[_i]);
        }
        continue;
      }
      var style = transform != null ? transform(possibleStyle) : possibleStyle;
      if (style.$$css != null) {
        var classNameChunk = '';
        if (nextCache != null && nextCache.has(style)) {
          var cacheEntry = nextCache.get(style);
          if (cacheEntry != null) {
            classNameChunk = cacheEntry[0];
            debugString = cacheEntry[2];
            definedProperties.push.apply(definedProperties, cacheEntry[1]);
            nextCache = cacheEntry[3];
          }
        } else {
          var definedPropertiesChunk = [];
          for (var prop in style) {
            var value = style[prop];
            if (prop === compiledKey) {
              var compiledKeyValue = style[prop];
              if (compiledKeyValue !== true) {
                debugString = debugString ? compiledKeyValue + '; ' + debugString : compiledKeyValue;
              }
              continue;
            }
            if (typeof value === 'string' || value === null) {
              if (!definedProperties.includes(prop)) {
                definedProperties.push(prop);
                if (nextCache != null) {
                  definedPropertiesChunk.push(prop);
                }
                if (typeof value === 'string') {
                  classNameChunk += classNameChunk ? ' ' + value : value;
                }
              }
            } else {
              console.error("styleq: ".concat(prop, " typeof ").concat(String(value), " is not \"string\" or \"null\"."));
            }
          }
          if (nextCache != null) {
            var weakMap = new WeakMap();
            nextCache.set(style, [classNameChunk, definedPropertiesChunk, debugString, weakMap]);
            nextCache = weakMap;
          }
        }
        if (classNameChunk) {
          className = className ? classNameChunk + ' ' + className : classNameChunk;
        }
      } else {
        if (disableMix) {
          if (inlineStyle == null) {
            inlineStyle = {};
          }
          inlineStyle = Object.assign({}, style, inlineStyle);
        } else {
          var subStyle = null;
          for (var _prop in style) {
            var _value = style[_prop];
            if (_value !== undefined) {
              if (!definedProperties.includes(_prop)) {
                if (_value != null) {
                  if (inlineStyle == null) {
                    inlineStyle = {};
                  }
                  if (subStyle == null) {
                    subStyle = {};
                  }
                  subStyle[_prop] = _value;
                }
                definedProperties.push(_prop);
                nextCache = null;
              }
            }
          }
          if (subStyle != null) {
            inlineStyle = Object.assign(subStyle, inlineStyle);
          }
        }
      }
    }
    var styleProps = [className, inlineStyle, debugString];
    return styleProps;
  };
}
var styleq = styleq_2 = styleq$1.styleq = createStyleq();
styleq.factory = createStyleq;
const optimizedStyleq = styleq_2.factory({
  disableMix: true
});
function merge(...styles) {
  const [className, style, dataStyleSrc] = optimizedStyleq(styles);
  const result = {};
  if (className != null && className !== '') {
    result.className = className;
  }
  if (style != null) {
    result.style = style;
  }
  if (dataStyleSrc != null && dataStyleSrc !== '') {
    const chunks = dataStyleSrc.split(';');
    const pathsMap = {};
    for (const chunk of chunks) {
      const trimmed = chunk.trim();
      const [path, line] = trimmed.split(':');
      if (line != null) {
        pathsMap[path] = pathsMap[path] != null ? `${pathsMap[path]},${line}` : line;
      }
    }
    result['data-style-src'] = Object.keys(pathsMap).map(path => `${path}:${pathsMap[path]}`).join('; ');
  }
  return result;
}
const styles = {
  block: {
    "margin-kogj98": "margin-x1ghz6dp",
    "padding-kmVPX3": "padding-x1717udv",
    $$css: ".pnpm:web/runtime.js:162"
  },
  inline: {
    "margin-kogj98": "margin-x1ghz6dp",
    "padding-kmVPX3": "padding-x1717udv",
    "textDecoration-kybGjl": "textDecoration-x1hl2dhg",
    "textAlign-k9WMMc": "textAlign-x16tdsg8",
    "wordWrap-kD5eJx": "wordWrap-x1vvkbs",
    $$css: ".pnpm:web/runtime.js:166"
  },
  inlineblock: {
    "borderStyle-ksu8eU": "borderStyle-x1y0btm7",
    "margin-kogj98": "margin-x1ghz6dp",
    "padding-kmVPX3": "padding-x1717udv",
    $$css: ".pnpm:web/runtime.js:173"
  },
  button: {
    "borderWidth-kMzoRj": "borderWidth-xmkeg23",
    $$css: ".pnpm:web/runtime.js:178"
  },
  codePre: {
    "fontFamily-kMv6JI": "fontFamily-x1lxnp44",
    "fontSize-kGuDYH": "fontSize-xrv4cvt",
    "overflow-kVQacm": "overflow-xysyzu8",
    $$css: ".pnpm:web/runtime.js:181"
  },
  heading: {
    "fontSize-kGuDYH": "fontSize-xngnso2",
    "wordWrap-kD5eJx": "wordWrap-x1vvkbs",
    $$css: ".pnpm:web/runtime.js:186"
  },
  hr: {
    "backgroundColor-kWkggS": "backgroundColor-x42x0ya",
    "borderStyle-ksu8eU": "borderStyle-xng3xce",
    "borderWidth-kMzoRj": "borderWidth-xc342km",
    "boxSizing-kB7OPa": "boxSizing-x9f619",
    "height-kZKoxP": "height-xjm9jq1",
    $$css: ".pnpm:web/runtime.js:190"
  },
  img: {
    "aspectRatio-kOBAk4": "aspectRatio-xuw900x",
    "height-kZKoxP": "height-xt7dq6l",
    "maxWidth-ks0D6T": "maxWidth-x193iq5w",
    $$css: ".pnpm:web/runtime.js:197"
  },
  input: {
    "borderWidth-kMzoRj": "borderWidth-xmkeg23",
    "borderStyle-ksu8eU": "borderStyle-x1y0btm7",
    $$css: ".pnpm:web/runtime.js:202"
  },
  list: {
    "listStyle-kB88ic": "listStyle-xe8uvvx",
    $$css: ".pnpm:web/runtime.js:206"
  },
  strong: {
    "fontWeight-k63SB2": "fontWeight-x117nqv4",
    $$css: ".pnpm:web/runtime.js:209"
  },
  textarea: {
    "borderWidth-kMzoRj": "borderWidth-xmkeg23",
    "borderStyle-ksu8eU": "borderStyle-x1y0btm7",
    "resize-kHenm0": "resize-x288g5",
    $$css: ".pnpm:web/runtime.js:212"
  }
};
const a = styles.inline;
const article = styles.block;
const aside = styles.block;
const b = styles.inline;
const bdi = styles.inline;
const bdo = styles.inline;
const blockquote = styles.block;
const br = null;
const button = [styles.inlineblock, styles.button];
const code = [styles.inline, styles.codePre];
const del = null;
const div = styles.block;
const em = styles.inline;
const fieldset = styles.block;
const footer = styles.block;
const form = styles.block;
const heading = [styles.block, styles.heading];
const header = styles.block;
const hr = [styles.block, styles.hr];
const i = styles.inline;
const img = styles.img;
const input = [styles.inlineblock, styles.input];
const ins = null;
const kbd = null;
const label = styles.inline;
const li = styles.block;
const main = styles.block;
const mark = styles.inline;
const nav = styles.block;
const ol = [styles.list, styles.block];
const optgroup = null;
const option = null;
const p = styles.block;
const pre = [styles.block, styles.codePre];
const s = null;
const section = styles.block;
const select = styles.inlineblock;
const span = styles.inline;
const strong = [styles.inline, styles.strong];
const sub = styles.inline;
const sup = styles.inline;
const textarea = [styles.inlineblock, styles.textarea];
const u = null;
const ul = [styles.list, styles.block];
const defaultStyles = {
  a: a,
  article: article,
  aside: aside,
  b: b,
  bdi: bdi,
  bdo: bdo,
  blockquote: blockquote,
  br: br,
  button: button,
  code: code,
  del: del,
  div: div,
  em: em,
  fieldset: fieldset,
  footer: footer,
  form: form,
  h1: heading,
  h2: heading,
  h3: heading,
  h4: heading,
  h5: heading,
  h6: heading,
  header: header,
  hr: hr,
  i: i,
  img: img,
  input: input,
  ins: ins,
  kbd: kbd,
  label: label,
  li: li,
  main: main,
  mark: mark,
  nav: nav,
  ol: ol,
  optgroup: optgroup,
  option: option,
  p: p,
  pre: pre,
  s: s,
  section: section,
  select: select,
  span: span,
  strong: strong,
  sub: sub,
  sup: sup,
  textarea: textarea,
  u: u,
  ul: ul
};


},
"./src/ConnectionBanner.rsd.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (ConnectionBannerRsd)
});
/* import */ var react_strict_dom_runtime__rspack_import_3 = __webpack_require__("./node_modules/.pnpm/react-strict-dom@0.0.54_postcss@8.5.32_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-strict-dom/dist/web/runtime.js");
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var react_strict_dom__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react-strict-dom/react-strict-dom");
/* import */ var react_jsx_runtime__rspack_import_2 = __webpack_require__("./node_modules/.pnpm/react@19.2.8/node_modules/react/jsx-runtime.js");




// Faithful RSD port of packages/sdk/src/components/ConnectionBanner.tsx.
// Presentational only: status comes in as a prop so the web spike does not
// drag the Kraken WS hook (and its react-native chain) into the browser bundle.
// Colors are placeholder hex standing in for sdk `colors.surfaceVariant`/`secondary`.

const styles = {
  banner: {
    "display-k1xSpc": "display-x78zum5",
    "flexDirection-kXwgrk": "flexDirection-xdt5ytf",
    "alignItems-kGNEyG": "alignItems-x6s0dn4",
    "backgroundColor-kWkggS": "backgroundColor-x1ljod59",
    "paddingBlock-k8WAf4": "paddingBlock-x1t0vds8",
    "paddingInline-kg3NbH": "paddingInline-x1hr3lfm",
    $$css: "src/ConnectionBanner.rsd.tsx:12"
  },
  text: {
    "color-kMwMTN": "color-x7ffntk",
    "fontSize-kGuDYH": "fontSize-xfifm61",
    $$css: "src/ConnectionBanner.rsd.tsx:20"
  }
};
function ConnectionBannerRsd({
  status
}) {
  if (status === 'connected') {
    return null;
  }
  const label = status === 'reconnecting' ? 'Reconnecting to market…' : 'Connecting to market…';
  return /*#__PURE__*/(0,react_jsx_runtime__rspack_import_2.jsx)("div", {
    "data-element-src": "src/ConnectionBanner.rsd.tsx:37",
    ...(0,react_strict_dom_runtime__rspack_import_3.merge)(react_strict_dom_runtime__rspack_import_3.defaultStyles.div, styles.banner),
    children: /*#__PURE__*/(0,react_jsx_runtime__rspack_import_2.jsx)("span", {
      "data-element-src": "src/ConnectionBanner.rsd.tsx:38",
      ...(0,react_strict_dom_runtime__rspack_import_3.merge)(react_strict_dom_runtime__rspack_import_3.defaultStyles.span, styles.text),
      children: label
    })
  });
}

},
"./src/mf/BannerRemote.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (BannerRemote)
});
/* import */ var react_strict_dom_runtime__rspack_import_4 = __webpack_require__("./node_modules/.pnpm/react-strict-dom@0.0.54_postcss@8.5.32_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-strict-dom/dist/web/runtime.js");
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var react_strict_dom__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react-strict-dom/react-strict-dom");
/* import */ var _ConnectionBanner_rsd__rspack_import_2 = __webpack_require__("./src/ConnectionBanner.rsd.tsx");
/* import */ var react_jsx_runtime__rspack_import_3 = __webpack_require__("./node_modules/.pnpm/react@19.2.8/node_modules/react/jsx-runtime.js");





// Module Federation exposed module for Spike B.
// It is the RSD-ported banner wrapped with its own status toggle, so the web
// host can drop it in with no props. Federating this also proves the combined
// stack: an RSD/StyleX component served as a web MF remote (plan bonus goal).

const styles = {
  wrap: {
    "display-k1xSpc": "display-x78zum5",
    "flexDirection-kXwgrk": "flexDirection-xdt5ytf",
    "gap-kOIVth": "gap-x167g77z",
    $$css: "mf/BannerRemote.tsx:13"
  },
  row: {
    "display-k1xSpc": "display-x78zum5",
    "flexDirection-kXwgrk": "flexDirection-x1q0g3np",
    "gap-kOIVth": "gap-x167g77z",
    $$css: "mf/BannerRemote.tsx:14"
  },
  button: {
    "cursor-kkrTdU": "cursor-x1ypdohk",
    "borderWidth-kMzoRj": "borderWidth-xc342km",
    "borderRadius-kaIpWk": "borderRadius-x1kogg8i",
    "paddingBlock-k8WAf4": "paddingBlock-x1vvogim",
    "paddingInline-kg3NbH": "paddingInline-xaope02",
    "backgroundColor-kWkggS": "backgroundColor-x11u7mec",
    "color-kMwMTN": "color-x19xk1mj",
    "fontSize-kGuDYH": "fontSize-x4z9k3i",
    $$css: "mf/BannerRemote.tsx:15"
  },
  tag: {
    "color-kMwMTN": "color-xrjvjsr",
    "fontSize-kGuDYH": "fontSize-xfifm61",
    $$css: "mf/BannerRemote.tsx:25"
  }
};
function BannerRemote() {
  const [status, setStatus] = react__rspack_import_0.useState('reconnecting');
  return /*#__PURE__*/(0,react_jsx_runtime__rspack_import_3.jsxs)("div", {
    "data-element-src": "mf/BannerRemote.tsx:31",
    ...(0,react_strict_dom_runtime__rspack_import_4.merge)(react_strict_dom_runtime__rspack_import_4.defaultStyles.div, styles.wrap),
    children: [/*#__PURE__*/(0,react_jsx_runtime__rspack_import_3.jsx)("span", {
      "data-element-src": "mf/BannerRemote.tsx:32",
      ...(0,react_strict_dom_runtime__rspack_import_4.merge)(react_strict_dom_runtime__rspack_import_4.defaultStyles.span, styles.tag),
      children: "\u2191 served from remote `wallet@:9102` via mf-manifest.json"
    }), /*#__PURE__*/(0,react_jsx_runtime__rspack_import_3.jsx)(_ConnectionBanner_rsd__rspack_import_2["default"], {
      status: status
    }), /*#__PURE__*/(0,react_jsx_runtime__rspack_import_3.jsxs)("div", {
      "data-element-src": "mf/BannerRemote.tsx:36",
      ...(0,react_strict_dom_runtime__rspack_import_4.merge)(react_strict_dom_runtime__rspack_import_4.defaultStyles.div, styles.row),
      children: [/*#__PURE__*/(0,react_jsx_runtime__rspack_import_3.jsx)("button", {
        "data-element-src": "mf/BannerRemote.tsx:37",
        ...(0,react_strict_dom_runtime__rspack_import_4.merge)(react_strict_dom_runtime__rspack_import_4.defaultStyles.button, styles.button),
        onClick: () => setStatus('connecting'),
        type: "button",
        children: "connecting"
      }), /*#__PURE__*/(0,react_jsx_runtime__rspack_import_3.jsx)("button", {
        "data-element-src": "mf/BannerRemote.tsx:42",
        ...(0,react_strict_dom_runtime__rspack_import_4.merge)(react_strict_dom_runtime__rspack_import_4.defaultStyles.button, styles.button),
        onClick: () => setStatus('reconnecting'),
        type: "button",
        children: "reconnecting"
      }), /*#__PURE__*/(0,react_jsx_runtime__rspack_import_3.jsx)("button", {
        "data-element-src": "mf/BannerRemote.tsx:47",
        ...(0,react_strict_dom_runtime__rspack_import_4.merge)(react_strict_dom_runtime__rspack_import_4.defaultStyles.button, styles.button),
        onClick: () => setStatus('connected'),
        type: "button",
        children: "connected (hides)"
      })]
    })]
  });
}

},

}]);