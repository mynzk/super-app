import React from 'react';
import {css, html} from 'react-strict-dom';
import {ASSET_MAP, ConnectionBanner} from 'super-app-showcase-sdk';
import {HOLDINGS, type Holding} from '../constants';
import HoldingRow from '../components/HoldingRow';
import List from '../components/List';
import TotalBalance from '../components/TotalBalance';

// Screen chrome authored with react-strict-dom (html.div/span + css.create;
// StyleX needs static literals so theme hex is inlined — background #0A0E1A,
// onBackground #E2E8F0). The list itself is split per platform in
// ../components/List (native = LegendList virtualization, web = scrollable DOM
// column), so this screen stays a single cross-platform file.
const styles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: '#0A0E1A',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#E2E8F0',
    fontSize: 18,
    fontWeight: '600',
  },
});

const renderHolding = ({item}: {item: Holding}) => (
  <HoldingRow holding={item} asset={ASSET_MAP[item.symbol]} />
);

const WalletScreen = () => {
  return (
    <html.div style={styles.container}>
      <ConnectionBanner />
      <List
        data={HOLDINGS}
        keyExtractor={item => item.symbol}
        renderItem={renderHolding}
        header={
          <html.div style={styles.header}>
            <TotalBalance />
            <html.span style={styles.sectionTitle}>My Holdings</html.span>
          </html.div>
        }
      />
    </html.div>
  );
};

export default WalletScreen;
