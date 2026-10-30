import React from 'react';
import {css, html} from 'react-strict-dom';
import {Button, type Asset} from 'super-app-showcase-sdk';

// Web replacement for the native @gorhom/bottom-sheet trade sheet (that lib is
// native-only). Same BottomSheetRef API (open/close via useState +
// useImperativeHandle) so AssetDetailsScreen can drive either variant through the
// resolver (.web.tsx on web, .tsx on native). Layout/text/buttons use
// react-strict-dom (html.* + css.create, static-literal theme hex); the buttons
// are real html.button + onClick. No react-native-web / reanimated /
// gesture-handler on web.
export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

interface Props {
  asset: Asset;
  bottomInset: number;
  onConfirm: () => void;
}

const styles = css.create({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    backgroundColor: '#131929',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2D3748',
    alignSelf: 'center',
    marginBottom: 8,
  },
  title: {color: '#E2E8F0', fontSize: 20, fontWeight: '700'},
  subtitle: {color: '#A0AEC0', fontSize: 14, marginTop: -8},
  inputContainer: {display: 'flex', flexDirection: 'column', gap: 8},
  inputLabel: {color: '#A0AEC0', fontSize: 13},
  input: {
    backgroundColor: '#1C2438',
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#E2E8F0',
    fontSize: 18,
    fontWeight: '500',
    fontVariantNumeric: 'tabular-nums',
  },
  actions: {display: 'flex', flexDirection: 'row', gap: 12, marginTop: 8},
});

const TradeBottomSheet = React.forwardRef<BottomSheetRef, Props>(
  ({asset, onConfirm}, ref) => {
    const [open, setOpen] = React.useState(false);
    const amountRef = React.useRef('');

    React.useImperativeHandle(
      ref,
      () => ({
        open: () => setOpen(true),
        close: () => setOpen(false),
      }),
      [],
    );

    const handleConfirm = React.useCallback(() => {
      setOpen(false);
      onConfirm();
    }, [onConfirm]);

    if (!open) {
      return null;
    }

    return (
      <html.div style={styles.overlay} onClick={() => setOpen(false)}>
        <html.div style={styles.panel} onClick={e => e.stopPropagation()}>
          <html.div style={styles.handle} />
          <html.span style={styles.title}>Trade {asset.name}</html.span>
          <html.span style={styles.subtitle}>{asset.symbol}/USD</html.span>

          <html.div style={styles.inputContainer}>
            <html.span style={styles.inputLabel}>Amount (USD)</html.span>
            <html.input
              style={styles.input}
              type="text"
              placeholder="0.00"
              defaultValue=""
              onChange={(e: {target: {value: string}}) => {
                amountRef.current = e.target.value;
              }}
            />
          </html.div>

          <html.div style={styles.actions}>
            <Button
              variant="secondary"
              flex={1}
              title="Cancel"
              onPress={() => setOpen(false)}
            />
            <Button
              variant="primary"
              flex={2}
              title="Confirm Trade"
              onPress={handleConfirm}
            />
          </html.div>
        </html.div>
      </html.div>
    );
  },
);

export default TradeBottomSheet;
