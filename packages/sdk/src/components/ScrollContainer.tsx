import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

export interface ScrollContainerProps {
  children?: React.ReactNode;
}

// Native scroll viewport (RN ScrollView). The web split (ScrollContainer.web.tsx)
// swaps this for an RSD html.div + overflowY, so screens import one component and
// get platform-correct scrolling. It fills its parent and hides the scroll
// indicator; content padding is left to the consumer (an RSD html.div) so it
// stays cross-platform. `ScrollContainerProps` is the single source of truth for
// the type — the web variant imports it via `import type`.
const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
});

const ScrollContainer = ({children}: ScrollContainerProps) => (
  <ScrollView
    style={styles.scroll}
    showsVerticalScrollIndicator={false}>
    {children}
  </ScrollView>
);

export default ScrollContainer;
