import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {css, html} from 'react-strict-dom';
import ConnectionBannerRsd from './ConnectionBanner.rsd';
import './stylex.css';

type Status = 'connected' | 'reconnecting' | 'connecting';

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
  row: {display: 'flex', flexDirection: 'row', gap: 8},
  button: {
    cursor: 'pointer',
    borderWidth: 0,
    borderRadius: 6,
    paddingBlock: 8,
    paddingInline: 12,
    backgroundColor: '#3a3d41',
    color: '#e8eaed',
    fontSize: 13,
  },
});

function App() {
  const [status, setStatus] = React.useState<Status>('connecting');
  return (
    <html.div style={styles.page}>
      <html.h1 style={styles.heading}>RSD × Rspack web spike</html.h1>
      <html.p style={styles.note}>
        The bar below is the RSD-ported ConnectionBanner. Toggle status; it
        should render as real &lt;div&gt;/&lt;span&gt; with StyleX classes.
      </html.p>
      <ConnectionBannerRsd status={status} />
      <html.div style={styles.row}>
        <html.button
          style={styles.button}
          onClick={() => setStatus('connecting')}>
          connecting
        </html.button>
        <html.button
          style={styles.button}
          onClick={() => setStatus('reconnecting')}>
          reconnecting
        </html.button>
        <html.button
          style={styles.button}
          onClick={() => setStatus('connected')}>
          connected (hides)
        </html.button>
      </html.div>
    </html.div>
  );
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}
