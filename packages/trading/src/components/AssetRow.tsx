import React from 'react';
import {css, html} from 'react-strict-dom';
import {FlashRow, getAssetIconUri, type Asset} from 'super-app-showcase-sdk';
import PriceCell from './PriceCell';

interface AssetRowProps {
  asset: Asset;
  onPress: (asset: Asset) => void;
}

// Fully cross-platform now: zero react-native / reanimated imports. The pressable
// outer shell + green/red flash live entirely inside sdk's FlashRow (native uses
// reanimated + Animated.View; web uses a DOM <button> + Web Animations API), which
// hands the `flash` controller to PriceCell via render-prop. Everything here is
// react-strict-dom: html.img/div/span + css.create. StyleX needs static literals
// so theme hex is inlined (surfaceVariant #1C2438, onSurface #E2E8F0,
// secondary #A0AEC0).
const styles = css.create({
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C2438',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginLeft: 12,
    gap: 2,
  },
  name: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '600',
  },
  symbol: {
    color: '#A0AEC0',
    fontSize: 13,
  },
});

const AssetRow = ({asset, onPress}: AssetRowProps) => {
  const handlePress = React.useCallback(
    () => onPress(asset),
    [onPress, asset],
  );

  return (
    <FlashRow onPress={handlePress}>
      {flash => (
        <>
          <html.img
            src={getAssetIconUri(asset.symbol)}
            alt={asset.name}
            style={styles.icon}
          />
          <html.div style={styles.info}>
            <html.span style={styles.name}>{asset.name}</html.span>
            <html.span style={styles.symbol}>{asset.symbol}</html.span>
          </html.div>
          <PriceCell symbol={asset.symbol} flash={flash} />
        </>
      )}
    </FlashRow>
  );
};

export default React.memo(AssetRow);
