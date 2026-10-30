import * as React from 'react';
import {css, html} from 'react-strict-dom';

// Faithful RSD port of packages/sdk/src/components/ConnectionBanner.tsx.
// Presentational only: status comes in as a prop so the web spike does not
// drag the Kraken WS hook (and its react-native chain) into the browser bundle.
// Colors are placeholder hex standing in for sdk `colors.surfaceVariant`/`secondary`.

type Status = 'connected' | 'reconnecting' | 'connecting';

const styles = css.create({
  banner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#2a2d31',
    paddingBlock: 6,
    paddingInline: 16,
  },
  text: {
    color: '#9aa0a6',
    fontSize: 12,
  },
});

export default function ConnectionBannerRsd({status}: {status: Status}) {
  if (status === 'connected') {
    return null;
  }

  const label =
    status === 'reconnecting'
      ? 'Reconnecting to market…'
      : 'Connecting to market…';

  return (
    <html.div style={styles.banner}>
      <html.span style={styles.text}>{label}</html.span>
    </html.div>
  );
}
