// Drives StyleX CSS extraction for the RSD leaf / .web.tsx components.
// postcss-react-strict-dom re-runs Babel over `include` files to collect all
// css.create() rules and replaces `@react-strict-dom;` in stylex.css with the
// generated atomic CSS. It must use the WEB babel config (which has the RSD
// preset); the default would pick up the native babel.config.js and miss it.
const path = require('node:path');
const reactStrictDom = require('postcss-react-strict-dom');

module.exports = {
  plugins: [
    reactStrictDom({
      include: [
        path.resolve(__dirname, 'src/**/*.{ts,tsx}'),
        path.resolve(__dirname, '../sdk/src/**/*.{ts,tsx}'),
      ],
      babelConfig: {
        configFile: path.resolve(__dirname, 'babel.config.web.cjs'),
        babelrc: false,
      },
    }),
  ],
};
