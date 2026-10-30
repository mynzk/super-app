// Babel config for the web spike. Presets execute in REVERSE array order, so:
//   1) preset-typescript strips TS types
//   2) react-strict-dom/babel-preset rewrites html.* + compiles css.create (StyleX, importSources already wired for platform 'web')
//   3) preset-react turns the resulting JSX into the automatic runtime
module.exports = {
  presets: [
    ['@babel/preset-react', {runtime: 'automatic'}],
    ['react-strict-dom/babel-preset', {debug: true, dev: true, platform: 'web'}],
    '@babel/preset-typescript',
  ],
};
