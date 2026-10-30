import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {rspack} from '@rspack/core';
import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Spike B — web MF host. Consumes the `wallet` remote at runtime from its
// mf-manifest.json. Shared singletons guarantee a single React instance.
export default {
  mode: 'development',
  context: __dirname,
  entry: './src/mf/host.index.ts',
  output: {
    path: path.resolve(__dirname, 'dist/host'),
    publicPath: 'http://localhost:9100/',
    uniqueName: 'sas_host_web',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    conditionNames: ['browser', 'import', 'require', 'default'],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: p => /node_modules/.test(p) && !/react-strict-dom/.test(p),
        use: {loader: 'babel-loader'},
      },
      {test: /\.css$/, use: ['postcss-loader'], type: 'css'},
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({template: './index.host.html'}),
    new ModuleFederationPlugin({
      name: 'host',
      dts: false,
      remotes: {
        wallet: 'wallet@http://localhost:9102/mf-manifest.json',
      },
      shared: {
        react: {singleton: true, requiredVersion: '19.2.8'},
        'react-dom': {singleton: true, requiredVersion: '19.2.8'},
        'react-strict-dom': {singleton: true},
      },
    }),
  ],
  devServer: {
    port: 9100,
    static: {directory: path.resolve(__dirname, 'dist/host')},
  },
};
