import React from 'react';
import {css, html} from 'react-strict-dom';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {PriceProvider} from 'super-app-showcase-sdk';
import MainNavigator from './navigation/MainNavigator';
import SplashScreen from './components/SplashScreen';
import ErrorBoundary from './components/ErrorBoundary';
import {colors} from './theme';

// Web mirror of src/App.tsx. Differences from native:
//   - no react-native-bootsplash (native-only);
//   - AuthProvider / SignInScreen come from the auth remote via MF (React.lazy);
//   - no GestureHandlerRootView / SafeAreaProvider: the web nav shims use
//     neither gestures nor safe-area insets (bottom-tabs.web uses a fixed bar
//     height), so the root is a plain RSD html.div (react-strict-dom → real
//     DOM, no react-native-web);
//   - NavigationContainer gets a dark theme so remote scenes inherit the app
//     background without each tab needing to set it.
const AuthProvider = React.lazy(() => import('auth/AuthProvider'));
const SignInScreen = React.lazy(() => import('auth/SignInScreen'));

const styles = css.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surface,
    primary: colors.primary,
    text: colors.onSurface,
    border: colors.border,
  },
};

const SignInWrapper = () => (
  <React.Suspense fallback={<SplashScreen />}>
    <SignInScreen />
  </React.Suspense>
);

const App = () => {
  return (
    <html.div style={styles.root}>
      <PriceProvider>
        <ErrorBoundary name="AuthProvider">
          <React.Suspense fallback={<SplashScreen />}>
            <AuthProvider>
              {(authData: {isSignout: boolean; isLoading: boolean}) => {
                if (authData.isLoading) {
                  return <SplashScreen />;
                }

                if (authData.isSignout) {
                  return <SignInWrapper />;
                }

                return (
                  <NavigationContainer theme={navTheme}>
                    <MainNavigator />
                  </NavigationContainer>
                );
              }}
            </AuthProvider>
          </React.Suspense>
        </ErrorBoundary>
      </PriceProvider>
    </html.div>
  );
};

export default App;
