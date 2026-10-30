import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {rspack} from '@rspack/core';
import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack';
import {getWebSharedDependencies} from '../sdk/web-shared.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// auth H5 web build — a Module Federation remote. Standalone Rspack (NOT
// Re.Pack, which cannot target web). The web build carries no react-native-web:
// auth's web-reachable screens are react-strict-dom rendered to DOM. Exposes the
// same three surfaces the native auth remote exposes (AuthProvider / SignInScreen
// / AccountScreen) so the web host can gate on auth exactly like the native host.

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
    // Absolute publicPath so the host can load auth's federated chunks
    // cross-origin (host @:9200, auth @:9203).
    publicPath: 'http://localhost:9203/',
    uniqueName: 'sas_auth_web',
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
      // The sdk's package exports resolve getSharedDependencies' host (index.js)
      // on web conditions (require/default), which omits the real components
      // (ScrollContainer / ConnectionBanner). Point web straight at the TS barrel.
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
      // RN-ecosystem ESM builds (react-navigation, react-strict-dom, etc.) use
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
        // StyleX CSS from the RSD screens: postcss-loader rewrites
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
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      dts: false,
      exposes: {
        // Web wraps AuthProvider to also import stylex.css, so the host loads
        // auth's StyleX atomic CSS when it mounts the provider (before any auth
        // UI renders). The standalone bootstrap import never runs under the
        // host. Native rspack.config.ts still exposes the bare provider.
        './AuthProvider': './src/providers/RemoteAuthProvider.web.tsx',
        './SignInScreen': './src/screens/SignInScreen',
        // Resolves to AccountScreen.web.tsx (web split that swaps the native
        // bottom-tab-height hook) via the extensions order above.
        './AccountScreen': './src/screens/AccountScreen',
      },
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
    // @react-navigation/elements optionally requires masked-view; it isn't
    // installed and isn't needed on web. Mirrors the native host config.
    new rspack.IgnorePlugin({
      resourceRegExp: /^@react-native-masked-view/,
    }),
  ],
  devServer: {
    port: 9203,
    historyApiFallback: true,
    // Let the host (different origin) fetch remoteEntry.js / mf-manifest.json.
    headers: {'Access-Control-Allow-Origin': '*'},
    static: {directory: path.resolve(__dirname, 'dist/web')},
  },
};
