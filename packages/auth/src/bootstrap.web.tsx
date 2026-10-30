import React from 'react';
import {createRoot} from 'react-dom/client';
import {css, html} from 'react-strict-dom';
import AuthProvider from './providers/AuthProvider';
import SignInScreen from './screens/SignInScreen';
import {useAuth} from './contexts/AuthContext';
import './stylex.css';

// Standalone web bootstrap for the auth remote (loaded behind the async
// boundary in ../index.web.js). This is only for developing auth in isolation
// at :9203 — the real AuthProvider / SignInScreen / AccountScreen surfaces are
// consumed by the web host via Module Federation. AccountScreen is NOT shown
// here because its useBottomTabBarHeight requires a bottom-tab navigator, which
// only the host provides. Authored with react-strict-dom + react-dom/createRoot
// so the web build carries no react-native-web.
const styles = css.create({
  center: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: '#0A0E1A',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  text: {color: '#E2E8F0', fontSize: 18},
  link: {color: '#4F8EF7', fontSize: 16, cursor: 'pointer'},
});

const SignedIn = () => {
  const {signOut} = useAuth();
  return (
    <html.div style={styles.center}>
      <html.span style={styles.text}>Signed in (demo)</html.span>
      <html.span style={styles.link} onClick={signOut}>
        Sign out
      </html.span>
    </html.div>
  );
};

const Root = () => (
  <AuthProvider>
    {({isLoading, isSignout}) => {
      if (isLoading) {
        return (
          <html.div style={styles.center}>
            <html.span style={styles.text}>Loading…</html.span>
          </html.div>
        );
      }
      return isSignout ? <SignInScreen /> : <SignedIn />;
    }}
  </AuthProvider>
);

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<Root />);
}
