import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {rspack} from '@rspack/core';
import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack';
import {getWebSharedDependencies} from '../sdk/web-shared.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Trading H5 web build. Standalone Rspack (NOT Re.Pack, which cannot target web).
// The web build carries no react-native-web: trading's web-reachable code is
// react-strict-dom rendered to DOM plus the react-router nav shims. Native-only
// subsystems (Skia/victory-native chart, @gorhom/bottom-sheet,
// react-native-bottom-tabs) are swapped out via .web.tsx platform splits and
// never enter this graph.

// The few packages that ship untranspiled (Flow/TS/JSX) and must go through
// babel even though they live in node_modules (pnpm paths included):
// @react-navigation plus react-strict-dom / @stylexjs (the sdk barrel's RSD
// ConnectionBanner needs stylex compiled).
const TRANSFORM_IN_NODE_MODULES =
  /node_modules[\\/](\.pnpm[\\/])?.*?(@react-navigation|react-strict-dom|@stylexjs)/;

export default {
  mode: 'development',
  context: __dirname,
  entry: './index.web.js',
  output: {
    path: path.resolve(__dirname, 'dist/web'),
    // Absolute publicPath so the host can load trading's federated chunks
    // cross-origin (host @:9200, trading @:9201).
    publicPath: 'http://localhost:9201/',
    uniqueName: 'sas_trading_web',
    clean: true,
  },
  resolve: {
    // `$` = exact match only, so react-native-xxx packages are not caught.
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
      // "react-native" condition; web conditions (require/default) hit a stub
      // (index.js) that exports only getSharedDependencies, leaving colors /
      // PriceProvider undefined. Point web straight at the real TS barrel.
      'super-app-showcase-sdk$': path.resolve(
        __dirname,
        '../sdk/src/index.ts',
      ),
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
    // Resolve host-owned deps (reanimated/worklets live there) like the native config does.
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../host/node_modules'),
      'node_modules',
    ],
    conditionNames: ['browser', 'import', 'require', 'default'],
  },
  module: {
    rules: [
      // RN-ecosystem ESM builds (react-navigation, recharts, etc.) use
      // extensionless relative imports, which Rspack rejects under strict-ESM
      // fullySpecified.
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
      {
        // StyleX CSS from the RSD leaf components: postcss-loader rewrites
        // `@react-strict-dom;` into real CSS, Rspack native CSS injects it.
        test: /\.css$/,
        use: ['postcss-loader'],
        type: 'css',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({template: './index.html'}),
    new rspack.DefinePlugin({
      __DEV__: JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    // Native MF plugin (NOT Re.Pack — it can't target web). Emits a browser
    // mf-manifest.json + remoteEntry.js and exposes the navigator, mirroring
    // the native config's `exposes: {'./App': './src/navigation/MainNavigator'}`.
    // The host owns the single NavigationContainer, so the remote exposes the
    // bare MainNavigator (not ./src/App, which has its own container — that is
    // only used by the standalone web entry).
    new ModuleFederationPlugin({
      name: 'trading',
      filename: 'remoteEntry.js',
      dts: false,
      // Web exposes a thin wrapper that also imports stylex.css, so the host
      // loads trading's StyleX atomic CSS when it mounts this remote (the
      // standalone bootstrap import never runs under the host). Native
      // rspack.config.ts still exposes the bare MainNavigator.
      exposes: {'./App': './src/navigation/RemoteApp.web.tsx'},
      shared: getWebSharedDependencies({
        eager: false,
        include: [
          'react',
          'react-dom',
          'react-router',
          'react-router-dom',
          'react-strict-dom',
          'super-app-showcase-sdk',
        ],
      }),
    }),
  ],
  devServer: {
    port: 9201,
    historyApiFallback: true,
    // Let the host (different origin) fetch remoteEntry.js / mf-manifest.json.
    headers: {'Access-Control-Allow-Origin': '*'},
    static: {directory: path.resolve(__dirname, 'dist/web')},
  },
};
