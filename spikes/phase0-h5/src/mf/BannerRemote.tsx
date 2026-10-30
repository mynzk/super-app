import * as React from 'react';
import {css, html} from 'react-strict-dom';
import ConnectionBannerRsd from '../ConnectionBanner.rsd';

// Module Federation exposed module for Spike B.
// It is the RSD-ported banner wrapped with its own status toggle, so the web
// host can drop it in with no props. Federating this also proves the combined
// stack: an RSD/StyleX component served as a web MF remote (plan bonus goal).

type Status = 'connected' | 'reconnecting' | 'connecting';

const styles = css.create({
  wrap: {display: 'flex', flexDirection: 'column', gap: 8},
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
  tag: {color: '#6ab04c', fontSize: 12},
});

export default function BannerRemote() {
  const [status, setStatus] = React.useState<Status>('reconnecting');
  return (
    <html.div style={styles.wrap}>
      <html.span style={styles.tag}>
        ↑ served from remote `wallet@:9102` via mf-manifest.json
      </html.span>
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
