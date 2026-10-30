import React from 'react';
import {css, html} from 'react-strict-dom';
import {FlashRow, getAssetIconUri, type Asset} from 'super-app-showcase-sdk';
import type {Holding} from '../constants';
import ValueCell from './ValueCell';

interface Props {
  holding: Holding;
  asset: Asset;
}

// Fully cross-platform: zero react-native / reanimated imports. The card shell +
// green/red flash live entirely inside sdk's FlashRow (variant="card"; native
// uses reanimated + Animated.View, web uses a DOM node + Web Animations API),
// which hands the `flash` controller to ValueCell via render-prop. Everything
// here is react-strict-dom: html.img/div/span + css.create. StyleX needs static
// literals so theme hex is inlined (surfaceVariant #1C2438, onSurface #E2E8F0,
// secondary #A0AEC0).
const styles = css.create({
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1C2438',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginLeft: 12,
    gap: 3,
  },
  name: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '600',
  },
  quantity: {
    color: '#A0AEC0',
    fontSize: 13,
  },
});

const HoldingRow = ({holding, asset}: Props) => {
  return (
    <FlashRow variant="card">
      {flash => (
        <>
          <html.img
            src={getAssetIconUri(holding.symbol)}
            alt={asset.name}
            style={styles.icon}
          />
          <html.div style={styles.info}>
            <html.span style={styles.name}>{asset.name}</html.span>
            <html.span style={styles.quantity}>
              {holding.quantity} {holding.symbol}
            </html.span>
          </html.div>
          <ValueCell
            symbol={holding.symbol}
            quantity={holding.quantity}
            flash={flash}
          />
        </>
      )}
    </FlashRow>
  );
};

export default React.memo(HoldingRow);
