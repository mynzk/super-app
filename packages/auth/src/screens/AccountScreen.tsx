import React from 'react';
import {css, html} from 'react-strict-dom';
import {Button, ScrollContainer} from 'super-app-showcase-sdk';
import {useAuth} from '../contexts/AuthContext';
import {useTabBarHeight} from './useTabBarHeight';

// Single cross-platform account screen (react-strict-dom: html.div/span +
// css.create, compiling to DOM on web and RN views on native). StyleX needs
// static literals, so theme hex is inlined — background #0A0E1A, surface
// #131929, onSurface #E2E8F0, secondary #A0AEC0, border #2D3748. Scrolling comes
// from the sdk's ScrollContainer (platform-split). The footer's paddingBottom is
// the one runtime value (tab-bar height), applied via a css.create dynamic style
// so it stays RSD on both platforms — no RN View / react-native-web. The tab-bar
// height itself is the only platform-split import (see useTabBarHeight).
const styles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: '#0A0E1A',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#131929',
    borderRadius: 16,
    padding: 24,
    gap: 6,
  },
  title: {
    color: '#E2E8F0',
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: '#A0AEC0',
    fontSize: 14,
  },
  scrollContent: {
    padding: 16,
  },
  footer: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#0A0E1A',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderTopColor: '#2D3748',
  },
  footerPad: (pad: number) => ({paddingBottom: pad}),
});

const AccountScreen = () => {
  const {signOut} = useAuth();
  const tabBarHeight = useTabBarHeight();

  return (
    <html.div style={styles.container}>
      <ScrollContainer>
        <html.div style={styles.scrollContent}>
          <html.div style={styles.card}>
            <html.span style={styles.title}>Demo User</html.span>
            <html.span style={styles.subtitle}>demo@fintechapp.com</html.span>
          </html.div>
        </html.div>
      </ScrollContainer>

      <html.div style={[styles.footer, styles.footerPad(tabBarHeight + 8)]}>
        <Button variant="primary" fullWidth title="Sign Out" onPress={signOut} />
      </html.div>
    </html.div>
  );
};

export default AccountScreen;
