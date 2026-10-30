import React from 'react';
import {css, html} from 'react-strict-dom';
import Spinner from './Spinner.web';

// Web split of SplashScreen.tsx — react-native's ActivityIndicator/View become
// a DOM Spinner inside an RSD html.div (react-strict-dom → real DOM, no
// react-native-web). StyleX needs static literals so background #0A0E1A is
// inlined. The native SplashScreen.tsx is untouched.
const styles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A0E1A',
  },
});

const SplashScreen = () => (
  <html.div style={styles.container}>
    <Spinner />
  </html.div>
);

export default SplashScreen;
