import React from 'react';
import {css, html} from 'react-strict-dom';

// Web-only loading indicator — replaces react-native's ActivityIndicator (which
// has no DOM equivalent). A CSS ring rotated via the Web Animations API on a ref
// (the same imperative-animate technique as FlashRow.web.tsx), looping forever.
// StyleX needs static literals, so the primary colour #4F8EF7 (and its dim
// variant) are inlined.
const styles = css.create({
  ring: {
    width: 36,
    height: 36,
    borderRadius: 9999,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderTopStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    borderTopColor: '#4F8EF7',
    borderRightColor: 'rgba(79,142,247,0.25)',
    borderBottomColor: 'rgba(79,142,247,0.25)',
    borderLeftColor: 'rgba(79,142,247,0.25)',
  },
});

const Spinner = () => {
  const ref = React.useRef<HTMLElement | null>(null);
  const setRef = React.useCallback((el: HTMLElement | null) => {
    ref.current = el;
  }, []);

  React.useEffect(() => {
    const anim = ref.current?.animate(
      [{transform: 'rotate(0deg)'}, {transform: 'rotate(360deg)'}],
      {duration: 900, iterations: Infinity, easing: 'linear'},
    );
    return () => anim?.cancel();
  }, []);

  return <html.div ref={setRef} style={styles.ring} />;
};

export default Spinner;
