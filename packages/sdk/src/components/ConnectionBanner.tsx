import * as React from 'react';
import {css, html} from 'react-strict-dom';
import {useConnectionStatus} from '../hooks/useConnectionStatus';

// Single cross-platform component authored with react-strict-dom: on native RSD
// maps html.div/span to RN View/Text and runs css.create at runtime; on web it
// renders real DOM + StyleX. One file, both platforms — no .web.tsx twin.
// StyleX needs static literals, so theme colors are inlined
// (surfaceVariant #1C2438, secondary #A0AEC0).
const styles = css.create({
  banner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1C2438',
    paddingBlock: 6,
    paddingInline: 16,
  },
  text: {color: '#A0AEC0', fontSize: 12},
});

const ConnectionBanner = () => {
  const status = useConnectionStatus();

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
};

export default ConnectionBanner;
