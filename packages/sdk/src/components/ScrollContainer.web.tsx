import React from 'react';
import {css, html} from 'react-strict-dom';
import type {ScrollContainerProps} from './ScrollContainer';

// Web scroll viewport — the browser counterpart of ScrollContainer.tsx (which
// uses RN ScrollView). Authored with react-strict-dom so react-native-web's
// heavy ScrollView stays out of the web bundle; mirrors how trading's
// AssetDetailsScreen.web.tsx scrolls (html.div + overflowY). The `import type`
// is erased at build time, so it never pulls in the native file. Content
// padding is the consumer's job (an RSD html.div child).
const styles = css.create({
  scroll: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    overflowY: 'auto',
  },
});

const ScrollContainer = ({children}: ScrollContainerProps) => (
  <html.div style={styles.scroll}>{children}</html.div>
);

export default ScrollContainer;
