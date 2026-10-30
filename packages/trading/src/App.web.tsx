import React from 'react';
import {css, html} from 'react-strict-dom';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';

// Web split of src/App.tsx — the standalone web shell (only reached through the
// standalone bootstrap; under the host, trading is consumed as an MF remote via
// RemoteApp.web.tsx which exposes MainNavigator directly). No
// GestureHandlerRootView on web (no gestures), so the root is a plain RSD
// html.div (react-strict-dom → real DOM, no react-native-web).
const styles = css.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});

const App = () => {
  return (
    <html.div style={styles.root}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </html.div>
  );
};

export default App;
