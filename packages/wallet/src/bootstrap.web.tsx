import React from 'react';
import {createRoot} from 'react-dom/client';
import {PriceProvider} from 'super-app-showcase-sdk';
import App from './App';
import './stylex.css';

// Real standalone web bootstrap for the wallet H5 build (loaded behind the
// async boundary in ../index.web.js). wallet's own App does not include
// PriceProvider (the host provides it in native / web-host), so the standalone
// entry wraps it to supply live Kraken prices. react-dom/createRoot — the web
// build carries no react-native-web.
const Root = () => (
  <PriceProvider>
    <App />
  </PriceProvider>
);

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<Root />);
}
