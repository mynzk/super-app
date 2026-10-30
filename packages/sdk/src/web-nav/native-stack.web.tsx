import * as React from 'react';
import {matchPath, useLocation} from 'react-router-dom';
import {
  NavContext,
  useNavTheme,
  useRouterNavigation,
  type Navigation,
  type Route,
} from './native.web';
import {ROUTES, PARAM_ADAPTERS} from './linking';

// Minimal web replacement for @react-navigation/native-stack, backed by react-
// router-dom + real DOM (zero react-native-web). createNativeStackNavigator()
// returns {Navigator, Screen}. The Navigator matches the current URL against its
// screens' patterns (ROUTES), renders an optional header + the active screen,
// and supplies navigation/route both via context (useNavigation/useRoute) and as
// injected props (matching @react-navigation's props-based screens).

type ScreenOptions = {
  title?: string;
  headerShown?: boolean;
  presentation?: string;
  headerStyle?: {backgroundColor?: string};
  headerTintColor?: string;
  headerTitleStyle?: {color?: string};
  contentStyle?: {backgroundColor?: string};
};
type OptionsProp = ScreenOptions | ((args: {route: Route}) => ScreenOptions);

type ScreenProps = {
  name: string;
  component?: React.ComponentType<any>;
  options?: OptionsProp;
};
type ScreenDef = {
  name: string;
  component: React.ComponentType<any>;
  options?: OptionsProp;
};

function Header({
  title,
  canGoBack,
  onBack,
  backgroundColor,
  tintColor,
  titleColor,
}: {
  title: string;
  canGoBack: boolean;
  onBack: () => void;
  backgroundColor: string;
  tintColor: string;
  titleColor: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor,
        flexShrink: 0,
      }}>
      {canGoBack ? (
        <button
          onClick={onBack}
          aria-label="Back"
          style={{
            border: 0,
            background: 'transparent',
            color: tintColor,
            fontSize: 28,
            lineHeight: '28px',
            cursor: 'pointer',
            width: 40,
            height: 40,
          }}>
          {'‹'}
        </button>
      ) : (
        <div style={{width: 8}} />
      )}
      <span
        style={{
          color: titleColor,
          fontSize: 18,
          fontWeight: 600,
          marginLeft: 8,
        }}>
        {title}
      </span>
    </div>
  );
}

export function createNativeStackNavigator() {
  const Screen: React.FC<ScreenProps> = () => null;

  type NavigatorProps = {
    screenOptions?: ScreenOptions;
    children: React.ReactNode;
  };

  const Navigator = ({screenOptions, children}: NavigatorProps) => {
    const location = useLocation();
    const navigation = useRouterNavigation();
    const theme = useNavTheme();

    const screens: ScreenDef[] = React.Children.toArray(children)
      .filter(React.isValidElement)
      .map(child => {
        const p = (child as React.ReactElement<ScreenProps>).props;
        return {name: p.name, component: p.component!, options: p.options};
      });

    // Active screen = the screen whose (most specific) pattern fully matches the
    // URL; fall back to the initial screen (screens[0]) when nothing matches —
    // e.g. the host's single pass-through "Tabs" screen, or a stack mounted
    // under a tab that isn't the active one.
    let active: ScreenDef | undefined;
    let matchParams: Record<string, string | undefined> = {};
    let bestLen = -1;
    for (const s of screens) {
      const pattern = ROUTES[s.name];
      if (!pattern) {
        continue;
      }
      const m = matchPath({path: pattern, end: true}, location.pathname);
      if (m && pattern.length > bestLen) {
        active = s;
        matchParams = m.params as Record<string, string | undefined>;
        bestLen = pattern.length;
      }
    }
    if (!active && screens.length > 0) {
      active = screens[0];
    }
    if (!active) {
      return null;
    }

    const adapter = PARAM_ADAPTERS[active.name];
    const params = adapter
      ? adapter.fromPath(matchParams, location.state)
      : (location.state as {params?: unknown} | null)?.params ?? {};
    const route: Route = {name: active.name, params};

    const resolved: ScreenOptions = {
      ...screenOptions,
      ...(typeof active.options === 'function'
        ? active.options({route})
        : active.options),
    };

    const isInitial = active.name === screens[0].name;
    const showHeader = resolved.headerShown !== false;
    const Component = active.component;
    const nav = navigation as Navigation;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          minHeight: 0,
          backgroundColor:
            resolved.contentStyle?.backgroundColor ?? theme.colors.background,
        }}>
        {showHeader ? (
          <Header
            title={resolved.title ?? active.name}
            canGoBack={!isInitial}
            onBack={nav.goBack}
            backgroundColor={
              resolved.headerStyle?.backgroundColor ?? theme.colors.card
            }
            tintColor={resolved.headerTintColor ?? theme.colors.text}
            titleColor={
              resolved.headerTitleStyle?.color ??
              resolved.headerTintColor ??
              theme.colors.text
            }
          />
        ) : null}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            minHeight: 0,
          }}>
          <NavContext.Provider value={{navigation: nav, route}}>
            <Component navigation={nav} route={route} />
          </NavContext.Provider>
        </div>
      </div>
    );
  };

  return {Navigator, Screen};
}
