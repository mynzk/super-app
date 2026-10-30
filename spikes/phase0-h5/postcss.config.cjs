// PostCSS config consumed by postcss-loader. postcss-react-strict-dom scans the
// `include` source globs, re-runs the project Babel config over them to collect
// all css.create() rules, and replaces the `@react-strict-dom;` at-rule in
// stylex.css with the generated atomic CSS.
const reactStrictDom = require('postcss-react-strict-dom');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    reactStrictDom({
      include: ['src/**/*.{ts,tsx}'],
    }),
    autoprefixer(),
  ],
};
