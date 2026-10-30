import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {rspack} from '@rspack/core';
import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack';
import {getWebSharedDependencies} from '../sdk/web-shared.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Host H5 web build — the Module Federation *host*, mirroring the native host
// (rspack.config.ts). Standalone Rspack (NOT Re.Pack, which can't target web).
// It consumes the auth / trading / wallet remotes at runtime from their browser
// mf-manifest.json, owns the single NavigationContainer + web bottom tabs, and
// gates on the auth remote exactly like native. The web build carries no
// react-native-web: web-reachable code is react-strict-dom rendered to DOM plus
// the react-router nav shims in sdk/src/web-nav. Shared singletons guarantee one
// React / one sdk (one Kraken WebSocket) across the host and every remote bundle.

// The few packages that ship untranspiled and must go through babel even in
// node_modules (pnpm paths included): the @react-navigation types the nav shims
// re-export, and react-strict-dom / @stylexjs. The latter two are
// required: the host pulls the sdk barrel, which re-exports the RSD
// ConnectionBanner, whose stylex.create must be compiled (leaving it out throws
// "Unexpected 'stylex.create' call at runtime").
const TRANSFORM_IN_NODE_MODULES =
  /node_modules[\\/](\.pnpm[\\/])?.*?(@react-navigation|react-strict-dom|@stylexjs)/;

export default {
  mode: 'development',
  context: __dirname,
  entry: './index.web.js',
  output: {
    path: path.resolve(__dirname, 'dist/web'),
    publicPath: 'http://localhost:9200/',
    uniqueName: 'sas_host_web',
    clean: true,
  },
  resolve: {
    alias: {
      // Web nav: swap @react-navigation for the react-router-dom-based shim in
      // sdk (no react-native-web). See packages/sdk/src/web-nav/.
      '@react-navigation/native$': path.resolve(
        __dirname,
        '../sdk/src/web-nav/native.web.tsx',
      ),
      '@react-navigation/native-stack$': path.resolve(
        __dirname,
        '../sdk/src/web-nav/native-stack.web.tsx',
      ),
      '@react-navigation/bottom-tabs$': path.resolve(
        __dirname,
        '../sdk/src/web-nav/bottom-tabs.web.tsx',
      ),
      // sdk's package.json `exports` only maps the real barrel under the
      // "react-native" condition; web conditions hit a stub that exports only
      // getSharedDependencies. Point web straight at the real TS barrel so
      // PriceProvider / colors resolve.
      'super-app-showcase-sdk$': path.resolve(__dirname, '../sdk/src/index.ts'),
    },
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.json',
    ],
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    conditionNames: ['browser', 'import', 'require', 'default'],
  },
  module: {
    rules: [
      {
        test: /\.[cm]?jsx?$/,
        resolve: {fullySpecified: false},
      },
      {
        test: /\.[cm]?[jt]sx?$/,
        exclude: p =>
          /node_modules/.test(p) && !TRANSFORM_IN_NODE_MODULES.test(p),
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, 'babel.config.web.cjs'),
            babelrc: false,
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ttf|otf|woff2?)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({template: './index.html'}),
    new rspack.DefinePlugin({
      __DEV__: JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new ModuleFederationPlugin({
      name: 'host',
      dts: false,
      remotes: {
        auth: 'auth@http://localhost:9203/mf-manifest.json',
        trading: 'trading@http://localhost:9201/mf-manifest.json',
        wallet: 'wallet@http://localhost:9202/mf-manifest.json',
      },
      // Host owns the share scope → eager:true (it runs natively on the page).
      // Only the deps the host itself imports: react-strict-dom is deliberately
      // excluded — the host uses no RSD components (they live inside the
      // trading/wallet remotes, which transform + share RSD between themselves),
      // and eagerly bundling RSD here would pull its untranspiled stylex runtime
      // through the host babel config, which doesn't whitelist it.
      shared: getWebSharedDependencies({
        eager: true,
        include: [
          'react',
          'react-dom',
          'react-router',
          'react-router-dom',
          'super-app-showcase-sdk',
        ],
      }),
    }),
    // @react-navigation/elements optionally requires masked-view; not installed
    // and not needed on web. Mirrors the native host config.
    new rspack.IgnorePlugin({
      resourceRegExp: /^@react-native-masked-view/,
    }),
  ],
  devServer: {
    port: 9200,
    historyApiFallback: true,
    static: {directory: path.resolve(__dirname, 'dist/web')},
  },
};
