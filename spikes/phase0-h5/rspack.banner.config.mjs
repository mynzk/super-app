import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {rspack} from '@rspack/core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Spike A — RSD dual render (web half).
// Standalone Rspack build (NOT Re.Pack) that renders the RSD-ported
// ConnectionBanner into real DOM, proving RSD + StyleX + Rspack wiring works.
export default {
  mode: 'development',
  context: __dirname,
  entry: './src/index.web.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/banner'),
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    // Default Rspack conditionNames do not include 'react-native', so RSD's
    // package exports resolve to its web entry (dist/web). Make it explicit.
    conditionNames: ['browser', 'import', 'require', 'default'],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        // Transform our source AND react-strict-dom itself: RSD ships its web
        // runtime with UNCOMPILED stylex.create() calls that the consumer's
        // StyleX babel transform must compile, or they throw at runtime.
        exclude: p => /node_modules/.test(p) && !/react-strict-dom/.test(p),
        use: {loader: 'babel-loader'},
      },
      {
        // postcss-loader runs first and rewrites `@react-strict-dom;` into real
        // CSS; Rspack's native CSS (type: 'css') then parses/injects it.
        test: /\.css$/,
        use: ['postcss-loader'],
        type: 'css',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({template: './index.html'}),
  ],
  devServer: {
    port: 9101,
    hot: true,
    static: {directory: path.resolve(__dirname, 'dist/banner')},
  },
};
