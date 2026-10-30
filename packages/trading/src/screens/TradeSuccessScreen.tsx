import React from 'react';
import {css, html} from 'react-strict-dom';
import {Button} from 'super-app-showcase-sdk';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {TradingStackParamList} from '../navigation/MainNavigator';

// Single cross-platform screen: layout is react-strict-dom (html.* + css.create,
// static-literal theme hex) rendering on native and web alike, and the Done
// button is delegated to the sdk's platform-split <Button> (native Pressable /
// web html.button). No react-native import, so the web build stays free of
// react-native-web and there is no separate TradeSuccessScreen.web.tsx.
type Props = NativeStackScreenProps<TradingStackParamList, 'TradeSuccess'>;

const styles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: '#1A8C4E',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 32,
  },
  checkmark: {
    fontSize: 80,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 16,
    marginBottom: 32,
  },
});

const TradeSuccessScreen = ({navigation, route}: Props) => {
  return (
    <html.div style={styles.container}>
      <html.span style={styles.checkmark}>✓</html.span>
      <html.span style={styles.title}>Trade Placed!</html.span>
      <html.span style={styles.subtitle}>
        {route.params.symbol}/USD order confirmed
      </html.span>
      <Button
        variant="onColor"
        title="Done"
        onPress={() => navigation.goBack()}
      />
    </html.div>
  );
};

export default TradeSuccessScreen;
