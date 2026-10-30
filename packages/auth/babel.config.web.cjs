// Web-only Babel config for the auth H5 build (Rspack + react-native-web).
// Kept separate from the native babel.config.js so the native build is
// untouched.
//
// - RN preset with disableImportExportTransform keeps ESM so Rspack owns module
//   resolution (Metro-targeted CJS output breaks interop in the browser).
// - RSD preset (platform 'web') compiles react-strict-dom's css.create (StyleX)
//   and html.* for the RSD screens (SignInScreen / AccountScreen). Scoped by
//   importSources to react-strict-dom's css/html, so it is a no-op on plain RN.
// - worklets plugin kept so any reanimated-touching dep needs no manual deps.
module.exports = {
  presets: [
    ['module:@react-native/babel-preset', {disableImportExportTransform: true}],
    ['react-strict-dom/babel-preset', {debug: false, dev: true, platform: 'web'}],
  ],
  plugins: ['react-native-worklets/plugin'],
};
