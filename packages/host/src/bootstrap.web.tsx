import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.web';

// Real web bootstrap for the host (loaded behind the async boundary in
// ../index.web.js). Mounts the web MF host shell via react-dom/createRoot — the
// web build carries no react-native-web (so no AppRegistry).
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}
