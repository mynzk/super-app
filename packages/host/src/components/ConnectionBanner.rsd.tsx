import * as React from 'react';
import {css, html} from 'react-strict-dom';

// Phase 0 Spike A (native half). RSD port of ConnectionBanner used to prove the
// component renders through the EXISTING host RN + Jest pipeline with no
// regression. Presentational (status via prop) to avoid pulling the WS hook.
// On native, RSD maps html.* to RN host components and runs css.create at
// runtime (the RSD babel preset is a no-op for non-web platforms).

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
  text: {color: '#9aa0a6', fontSize: 12},
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
