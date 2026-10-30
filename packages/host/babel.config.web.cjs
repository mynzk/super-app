// Web-only Babel config for the host H5 build (Rspack + react-native-web).
// Separate from the native babel.config.js so the native build is untouched.
// The host pulls the sdk barrel (for PriceProvider), which re-exports the RSD
// ConnectionBanner — so, like trading/wallet, the host must run the RSD preset
// to compile react-strict-dom's css.create / html.*. The preset is scoped by
// importSources to react-strict-dom, so it is a no-op on plain RN files.
module.exports = {
  presets: [
    ['module:@react-native/babel-preset', {disableImportExportTransform: true}],
    ['react-strict-dom/babel-preset', {debug: false, dev: true, platform: 'web'}],
  ],
  plugins: ['react-native-worklets/plugin'],
};
