import React from 'react';
import {css, html} from 'react-strict-dom';
import {Button} from 'super-app-showcase-sdk';
import {useAuth} from '../contexts/AuthContext';

// Single cross-platform screen: layout is react-strict-dom (html.* + css.create,
// static-literal theme hex) which renders on both native and web, and the one
// interactive element — the Sign In button — is delegated to the sdk's
// platform-split <Button> (native Pressable / web html.button). No react-native
// import here, so the web build carries no react-native-web, and there is no
// longer a separate SignInScreen.web.tsx.
const styles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: '#0A0E1A',
    justifyContent: 'space-between',
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 120,
    paddingBottom: 64,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    fontSize: 64,
    color: '#4F8EF7',
  },
  appName: {
    color: '#E2E8F0',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
  tagline: {
    color: '#A0AEC0',
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'center',
  },
  disclaimer: {
    color: '#A0AEC0',
    fontSize: 12,
  },
});

const SignInScreen = () => {
  const {signIn} = useAuth();

  return (
    <html.div style={styles.container}>
      <html.div style={styles.header}>
        <html.span style={styles.logo}>₿</html.span>
        <html.span style={styles.appName}>Fintech Super App</html.span>
        <html.span style={styles.tagline}>
          Trading & Portfolio Management
        </html.span>
      </html.div>

      <html.div style={styles.footer}>
        <Button
          variant="primary"
          fullWidth
          title="Sign In as Demo User"
          onPress={signIn}
        />
        <html.span style={styles.disclaimer}>
          Demo mode — no real credentials required
        </html.span>
      </html.div>
    </html.div>
  );
};

export default SignInScreen;
