import * as React from 'react';
import {css, html} from 'react-strict-dom';
import {usePrices, formatValue} from 'super-app-showcase-sdk';
import {HOLDINGS} from '../constants';

// Single cross-platform component (react-strict-dom). StyleX needs static
// literals: surface #131929 / secondary #A0AEC0 / onBackground #E2E8F0 inlined.
const styles = css.create({
  balanceCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#131929',
    borderRadius: 16,
    padding: 24,
  },
  balanceLabel: {color: '#A0AEC0', fontSize: 14},
  balanceAmount: {
    color: '#E2E8F0',
    fontSize: 36,
    fontWeight: '700',
    fontVariantNumeric: 'tabular-nums',
  },
  balanceSubtext: {color: '#A0AEC0', fontSize: 12},
});

const TotalBalance = () => {
  const prices = usePrices();
  const total = HOLDINGS.reduce(
    (sum, h) => sum + h.quantity * (prices[h.symbol] ?? 0),
    0,
  );

  return (
    <html.div style={styles.balanceCard}>
      <html.span style={styles.balanceLabel}>Total Portfolio Value</html.span>
      <html.span style={styles.balanceAmount}>{formatValue(total)}</html.span>
      <html.span style={styles.balanceSubtext}>Updates in real-time</html.span>
    </html.div>
  );
};

export default TotalBalance;
