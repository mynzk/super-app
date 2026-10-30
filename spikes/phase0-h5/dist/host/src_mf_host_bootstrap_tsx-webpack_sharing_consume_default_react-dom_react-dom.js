"use strict";
(self["rspackChunksas_host_web"] = self["rspackChunksas_host_web"] || []).push([["src_mf_host_bootstrap_tsx-webpack_sharing_consume_default_react-dom_react-dom"], {
"./src/mf/host.bootstrap.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* import */ var react_strict_dom_runtime__rspack_import_4 = __webpack_require__("./node_modules/.pnpm/react-strict-dom@0.0.54_postcss@8.5.32_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/react-strict-dom/dist/web/runtime.js");
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var react_dom_client__rspack_import_1 = __webpack_require__("./node_modules/.pnpm/react-dom@19.2.8_react@19.2.8/node_modules/react-dom/client.js");
/* import */ var react_strict_dom__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-strict-dom/react-strict-dom");
/* import */ var react_jsx_runtime__rspack_import_3 = __webpack_require__("./node_modules/.pnpm/react@19.2.8/node_modules/react/jsx-runtime.js");






// Web host for Spike B. Loads the RSD banner from the `wallet` remote at
// runtime via its mf-manifest.json. react / react-dom / react-strict-dom are
// declared as shared singletons on both sides, so there must be exactly one
// React instance (a dup would throw the invalid-hook-call error).

// eslint-disable-next-line import/no-unresolved

const RemoteBanner = /*#__PURE__*/react__rspack_import_0.lazy(() => __webpack_require__.e(/* import() */ "webpack_container_remote_wallet_Banner").then(__webpack_require__.t.bind(__webpack_require__, "webpack/container/remote/wallet/Banner", 23)));
const styles = {
  page: {
    "display-k1xSpc": "display-x78zum5",
    "flexDirection-kXwgrk": "flexDirection-xdt5ytf",
    "gap-kOIVth": "gap-xou54vl",
    "padding-kmVPX3": "padding-xggk2y7",
    "fontFamily-kMv6JI": "fontFamily-x1p7i66b",
    "backgroundColor-kWkggS": "backgroundColor-xa9pask",
    "minHeight-kAzted": "minHeight-xg6iff7",
    $$css: "mf/host.bootstrap.tsx:15"
  },
  heading: {
    "color-kMwMTN": "color-x19xk1mj",
    "fontSize-kGuDYH": "fontSize-xwsyq91",
    "fontWeight-k63SB2": "fontWeight-x117nqv4",
    $$css: "mf/host.bootstrap.tsx:24"
  },
  note: {
    "color-kMwMTN": "color-x7ffntk",
    "fontSize-kGuDYH": "fontSize-x4z9k3i",
    $$css: "mf/host.bootstrap.tsx:25"
  }
};
function App() {
  return /*#__PURE__*/(0,react_jsx_runtime__rspack_import_3.jsxs)("div", {
    "data-element-src": "mf/host.bootstrap.tsx:30",
    ...(0,react_strict_dom_runtime__rspack_import_4.merge)(react_strict_dom_runtime__rspack_import_4.defaultStyles.div, styles.page),
    children: [/*#__PURE__*/(0,react_jsx_runtime__rspack_import_3.jsx)("h1", {
      "data-element-src": "mf/host.bootstrap.tsx:31",
      ...(0,react_strict_dom_runtime__rspack_import_4.merge)(react_strict_dom_runtime__rspack_import_4.defaultStyles.h1, styles.heading),
      children: "RSD \xD7 Rspack \xD7 Module Federation (web)"
    }), /*#__PURE__*/(0,react_jsx_runtime__rspack_import_3.jsx)("p", {
      "data-element-src": "mf/host.bootstrap.tsx:32",
      ...(0,react_strict_dom_runtime__rspack_import_4.merge)(react_strict_dom_runtime__rspack_import_4.defaultStyles.p, styles.note),
      children: "host @:9100 \u2014 the block below is a federated remote loaded at runtime."
    }), /*#__PURE__*/(0,react_jsx_runtime__rspack_import_3.jsx)(react__rspack_import_0.Suspense, {
      fallback: /*#__PURE__*/(0,react_jsx_runtime__rspack_import_3.jsx)("p", {
        "data-element-src": "mf/host.bootstrap.tsx:35",
        ...(0,react_strict_dom_runtime__rspack_import_4.merge)(react_strict_dom_runtime__rspack_import_4.defaultStyles.p, styles.note),
        children: "loading remote\u2026"
      }),
      children: /*#__PURE__*/(0,react_jsx_runtime__rspack_import_3.jsx)(RemoteBanner, {})
    })]
  });
}
const root = document.getElementById('root');
if (root) {
  (0,react_dom_client__rspack_import_1.createRoot)(root).render(/*#__PURE__*/(0,react_jsx_runtime__rspack_import_3.jsx)(App, {}));
}

},

}]);