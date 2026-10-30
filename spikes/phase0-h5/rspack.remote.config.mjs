import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Spike B — web MF remote. Exposes the RSD banner and emits a browser
// mf-manifest.json via the NATIVE @module-federation/enhanced plugin (NOT
// Re.Pack, which cannot target web).
export default {
  mode: 'development',
  context: __dirname,
  entry: './src/mf/remote.index.ts',
  output: {
    path: path.resolve(__dirname, 'dist/remote'),
    publicPath: 'http://localhost:9102/',
    uniqueName: 'sas_wallet_web',
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
    new ModuleFederationPlugin({
      name: 'wallet',
      filename: 'remoteEntry.js',
      dts: false,
      exposes: {
        './Banner': './src/mf/BannerRemote.tsx',
      },
      shared: {
        react: {singleton: true, requiredVersion: '19.2.8'},
        'react-dom': {singleton: true, requiredVersion: '19.2.8'},
        'react-strict-dom': {singleton: true},
      },
    }),
  ],
  devServer: {
    port: 9102,
    headers: {'Access-Control-Allow-Origin': '*'},
    static: {directory: path.resolve(__dirname, 'dist/remote')},
  },
};
