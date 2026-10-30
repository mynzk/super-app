import React from 'react';
import {css, html} from 'react-strict-dom';
import {
  useAssetPrice,
  formatPrice,
  type AssetSymbol,
  type FlashController,
} from 'super-app-showcase-sdk';

// Single cross-platform component (react-strict-dom): html.span maps to RN Text
// on native and a real DOM span on web. No reanimated: on a price change it just
// calls the platform-neutral `flash` controller handed down by FlashRow, which
// owns the animation (reanimated on native, Web Animations API on web). StyleX
// needs static literals so onSurface #E2E8F0 is inlined.
interface PriceCellProps {
  symbol: AssetSymbol;
  flash: FlashController;
}

const styles = css.create({
  price: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '500',
    fontVariantNumeric: 'tabular-nums',
  },
});

const PriceCell = React.memo(({symbol, flash}: PriceCellProps) => {
  const price = useAssetPrice(symbol);
  const prevRef = React.useRef(0);

  React.useEffect(() => {
    if (prevRef.current !== 0 && price !== prevRef.current) {
      flash(price > prevRef.current);
    }
    prevRef.current = price;
  }, [price, flash]);

  return <html.span style={styles.price}>{formatPrice(price)}</html.span>;
});

export default PriceCell;
