import * as React from 'react';
import {css, html} from 'react-strict-dom';
import {
  useAssetPrice,
  formatPrice,
  formatValue,
  type AssetSymbol,
  type FlashController,
} from 'super-app-showcase-sdk';

// Single cross-platform component (react-strict-dom): html.div/span map to RN
// View/Text on native and real DOM on web. No reanimated: on a value change it
// just calls the platform-neutral `flash` controller handed down by FlashRow,
// which owns the animation (reanimated on native, Web Animations API on web).
// onSurface #E2E8F0 / secondary #A0AEC0 inlined for StyleX.
interface ValueCellProps {
  symbol: AssetSymbol;
  quantity: number;
  flash: FlashController;
}

const styles = css.create({
  valueContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 3,
  },
  value: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '600',
    fontVariantNumeric: 'tabular-nums',
  },
  price: {color: '#A0AEC0', fontSize: 12, fontVariantNumeric: 'tabular-nums'},
});

const ValueCell = React.memo(
  ({symbol, quantity, flash}: ValueCellProps) => {
    const price = useAssetPrice(symbol);
    const value = price * quantity;
    const prevRef = React.useRef(0);

    React.useEffect(() => {
      if (prevRef.current !== 0 && value !== prevRef.current) {
        flash(value > prevRef.current);
      }
      prevRef.current = value;
    }, [value, flash]);

    return (
      <html.div style={styles.valueContainer}>
        <html.span style={styles.value}>{formatValue(value)}</html.span>
        <html.span style={styles.price}>{formatPrice(price)}</html.span>
      </html.div>
    );
  },
);

export default ValueCell;
