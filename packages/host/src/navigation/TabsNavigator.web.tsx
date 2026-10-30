import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Placeholder from '../components/Placeholder';
import ErrorBoundary from '../components/ErrorBoundary';
import {colors} from '../theme';

// Web mirror of TabsNavigator.tsx. The native tab bar (@bottom-tabs/react-
// navigation) is a native-only binding, so web uses the JS @react-navigation/
// bottom-tabs instead. Everything else — lazy-loading each remote behind an
// ErrorBoundary + Suspense — matches native. Tab icons use plain glyphs rather
// than the native vector-icons image-source API.
const randomDelay = () =>
  new Promise(resolve => setTimeout(resolve, 250 + Math.random() * 100));

const TradingApp = React.lazy(() =>
  randomDelay().then(() => import('trading/App')),
);
const WalletApp = React.lazy(() =>
  randomDelay().then(() => import('wallet/App')),
);
const AccountScreenRemote = React.lazy(() =>
  randomDelay().then(() => import('auth/AccountScreen')),
);

const TradingScreen = () => (
  <ErrorBoundary name="Trading">
    <React.Suspense fallback={<Placeholder label="Trading" />}>
      <TradingApp />
    </React.Suspense>
  </ErrorBoundary>
);

const WalletScreen = () => (
  <ErrorBoundary name="Wallet">
    <React.Suspense fallback={<Placeholder label="Wallet" />}>
      <WalletApp />
    </React.Suspense>
  </ErrorBoundary>
);

const AccountRemoteScreen = () => (
  <ErrorBoundary name="Account">
    <React.Suspense fallback={<Placeholder label="Account" />}>
      <AccountScreenRemote />
    </React.Suspense>
  </ErrorBoundary>
);

const AccountStack = createNativeStackNavigator();

const AccountScreen = () => (
  <AccountStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: colors.background},
      headerTintColor: colors.onBackground,
      headerTitleStyle: {color: colors.onBackground},
      contentStyle: {backgroundColor: colors.background},
    }}>
    <AccountStack.Screen
      name="AccountMain"
      component={AccountRemoteScreen}
      options={{title: 'Account'}}
    />
  </AccountStack.Navigator>
);

export type TabsParamList = {
  Trading: undefined;
  Wallet: undefined;
  Account: undefined;
};

const Tabs = createBottomTabNavigator<TabsParamList>();

const tabIcon =
  (glyph: string) =>
  ({color}: {color: string}) => (
    // Dynamic (per active/inactive) colour → plain DOM span with inline style
    // (css.create needs static literals), matching the web-nav shims.
    <span style={{fontSize: 18, color}}>{glyph}</span>
  );

const TabsNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: colors.surface, borderTopColor: colors.border},
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
      }}>
      <Tabs.Screen
        name="Trading"
        component={TradingScreen}
        options={{title: 'Trading', tabBarIcon: tabIcon('📈')}}
      />
      <Tabs.Screen
        name="Wallet"
        component={WalletScreen}
        options={{title: 'Wallet', tabBarIcon: tabIcon('👛')}}
      />
      <Tabs.Screen
        name="Account"
        component={AccountScreen}
        options={{title: 'Account', tabBarIcon: tabIcon('👤')}}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
