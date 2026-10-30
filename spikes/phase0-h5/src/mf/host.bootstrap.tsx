import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {css, html} from 'react-strict-dom';
import '../stylex.css';

// Web host for Spike B. Loads the RSD banner from the `wallet` remote at
// runtime via its mf-manifest.json. react / react-dom / react-strict-dom are
// declared as shared singletons on both sides, so there must be exactly one
// React instance (a dup would throw the invalid-hook-call error).

// eslint-disable-next-line import/no-unresolved
const RemoteBanner = React.lazy(() => import('wallet/Banner'));

const styles = css.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: 24,
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#131416',
    minHeight: '100vh',
  },
  heading: {color: '#e8eaed', fontSize: 20, fontWeight: 'bold'},
  note: {color: '#9aa0a6', fontSize: 13},
});

function App() {
  return (
    <html.div style={styles.page}>
      <html.h1 style={styles.heading}>RSD × Rspack × Module Federation (web)</html.h1>
      <html.p style={styles.note}>
        host @:9100 — the block below is a federated remote loaded at runtime.
      </html.p>
      <React.Suspense fallback={<html.p style={styles.note}>loading remote…</html.p>}>
        <RemoteBanner />
      </React.Suspense>
    </html.div>
  );
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}
