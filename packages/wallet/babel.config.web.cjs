// Web-only Babel config for the wallet H5 build (Rspack + react-native-web).
// Kept separate from the native babel.config.js so the native build is untouched.
//
// - RN preset (Flow/JSX/TS for RN + RNW code). disableImportExportTransform
//   keeps ESM so Rspack owns module resolution (the Metro-targeted CJS output
//   breaks interop in the browser).
// - RSD preset (platform 'web') compiles react-strict-dom's css.create (StyleX)
//   and html.* for the .web.tsx leaf components. It is scoped by importSources
//   to react-strict-dom's `css`/`html`, so it is a no-op on plain RN files.
// - worklets plugin kept ENABLED so reanimated 4 web needs no manual deps arrays.
module.exports = {
  presets: [
    ['module:@react-native/babel-preset', {disableImportExportTransform: true}],
    ['react-strict-dom/babel-preset', {debug: false, dev: true, platform: 'web'}],
  ],
  plugins: ['react-native-worklets/plugin'],
};


