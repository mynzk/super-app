import React from 'react';
import {css, html} from 'react-strict-dom';
import {colors} from '../theme';
import type {FlashRowProps, FlashController} from './FlashRow';

// Web twin of FlashRow.tsx — same `flash(isUp)` / `variant` / optional-`onPress`
// contract, but the row is a real DOM element (html.button when pressable, else
// html.div → no react-native-web) and the flash is an imperative Web Animations
// API keyframe on the node. Driving it through a ref means a price tick animates
// the background WITHOUT re-rendering the row (the leaf cell still re-renders in
// isolation), mirroring the native perf model.
//
// StyleX (css.create) needs static literals, so theme colours are inlined here
// (border #2D3748, transparent rgba(0,0,0,0)); the animate() call runs at runtime
// so it uses colors.* directly. The keyframe offsets reproduce the native timing:
// ramp to full colour over the first 150ms (0.2 * 750), then fade out over 600ms.
const styles = css.create({
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    margin: 0,
    textAlign: 'left',
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#2D3748',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    margin: 0,
    marginBottom: 10,
    textAlign: 'left',
    padding: 16,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  pressable: {
    cursor: 'pointer',
  },
});

const FlashRow = ({variant = 'list', onPress, children}: FlashRowProps) => {
  const ref = React.useRef<HTMLElement | null>(null);
  const setRef = React.useCallback((el: HTMLElement | null) => {
    ref.current = el;
  }, []);

  const flash = React.useCallback<FlashController>(up => {
    ref.current?.animate(
      [
        {backgroundColor: colors.transparent, offset: 0},
        {backgroundColor: up ? colors.priceUp : colors.priceDown, offset: 0.2},
        {backgroundColor: colors.transparent, offset: 1},
      ],
      {duration: 750, easing: 'ease-out'},
    );
  }, []);

  const content = children(flash);

  return onPress ? (
    <html.button
      ref={setRef}
      style={[styles[variant], styles.pressable]}
      onClick={onPress}>
      {content}
    </html.button>
  ) : (
    <html.div ref={setRef} style={styles[variant]}>
      {content}
    </html.div>
  );
};

export default FlashRow;
