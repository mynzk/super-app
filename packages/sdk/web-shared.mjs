// Web Module Federation shared-singleton table — the browser mirror of sdk's
// native getSharedDependencies() (lib/sharedDeps.js), hand-curated for the web
// build. Differences from native, all deliberate:
//   - the web build carries NO react-native / react-native-web: web-reachable
//     UI is authored in react-strict-dom (html.* + css.create) / plain DOM, so
//     `react-native` is neither aliased nor shared here.
//   - `react-dom` is added (web-only).
//   - every native-only singleton (skia, victory, @bottom-tabs native binding,
//     reanimated/worklets, bootsplash, vector-icons, safe-area-context) is
//     dropped.
//   - `super-app-showcase-sdk` is aliased to its real TS barrel.
//
// host + the three remotes all import this so there is exactly one instance of
// each shared module across bundles (one React → hooks work; one react-router →
// the host's router/history drives the remotes' routes across the MF boundary;
// one sdk → a single Kraken WebSocket).
//
// Navigation note: on web, @react-navigation/{native,native-stack,bottom-tabs}
// are aliased (per rspack.web.config.mjs) to a small react-router-dom-based shim
// in sdk/src/web-nav/* (no react-native-web). So @react-navigation is NOT shared
// here; react-router(-dom) is the shared singleton that must stay single so the
// host BrowserRouter's context reaches every remote.
//
// Every entry declares an explicit `version`. This is essential: these modules
// resolve to a package `lib/module` subpath (or through a resolve.alias) where
// MF can't read a version from a description file — without it the *provider*
// fails to register the shared module and every bundle silently falls back to
// its own copy (e.g. a second react-router → a second Router context, so
// remotes can't see the host's location). requiredVersion is false so singletons
// accept whatever provided version wins, regardless of each package.json's
// `catalog:` spec.
const VERSIONS = {
  react: '19.2.8',
  'react-dom': '19.2.8',
  'react-router': '7.18.5',
  'react-router-dom': '7.18.5',
  'react-strict-dom': '0.0.54',
  'super-app-showcase-sdk': '0.0.2',
};

function entry(name, eager) {
  return {
    singleton: true,
    eager,
    version: VERSIONS[name],
    requiredVersion: false,
  };
}

const ALL = Object.keys(VERSIONS);

/**
 * @param {{eager?: boolean, include?: string[]}} [opts]
 *   eager   — host passes true (it owns the share scope); remotes pass false.
 *   include — subset of module names to share; defaults to the full set.
 */
export function getWebSharedDependencies({eager = false, include} = {}) {
  const names = include ?? ALL;
  return Object.fromEntries(names.map(name => [name, entry(name, eager)]));
}
