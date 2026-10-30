import * as React from 'react';
import {
  BrowserRouter,
  useInRouterContext,
  useNavigate,
} from 'react-router-dom';
import {buildPath} from './linking';

// Minimal web replacement for @react-navigation/native, backed by react-router-
// dom and rendered to real DOM (zero react-native-web). Aliased in on the web
// build only (rspack `@react-navigation/native$` -> this file); native keeps the
// real package. Only the surface the app actually uses is implemented.

export type NavTheme = {
  dark?: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification?: string;
  };
};

export const DarkTheme: NavTheme = {
  dark: true,
  colors: {
    primary: '#4F8EF7',
    background: '#0A0E1A',
    card: '#131929',
    text: '#E2E8F0',
    border: '#2D3748',
    notification: '#E74C3C',
  },
};

const ThemeContext = React.createContext<NavTheme>(DarkTheme);
export const useNavTheme = () => React.useContext(ThemeContext);

// The navigation object handed to screens (via the useNavigation hook and as an
// injected prop, matching @react-navigation's props-based screens).
export type Navigation = {
  navigate: (name: string, params?: any) => void;
  goBack: () => void;
  setParams: (params: any) => void;
};
export type Route = {name: string; params: any};

export const NavContext = React.createContext<{
  navigation: Navigation;
  route: Route;
} | null>(null);

export function useNavigation<T = Navigation>(): T {
  const ctx = React.useContext(NavContext);
  if (!ctx) {
    throw new Error('useNavigation must be used inside a navigator');
  }
  return ctx.navigation as unknown as T;
}

export function useRoute<T = Route>(): T {
  const ctx = React.useContext(NavContext);
  if (!ctx) {
    throw new Error('useRoute must be used inside a navigator');
  }
  return ctx.route as unknown as T;
}

// Internal: build a Navigation bound to react-router's navigate. Screens call
// navigate(name, params); the shim serialises params into the URL (buildPath)
// and also carries the live params in history state so in-app navigation keeps
// object params (e.g. the full Asset) without a lookup.
export function useRouterNavigation(): Navigation {
  const navigate = useNavigate();
  return React.useMemo(
    () => ({
      navigate: (name: string, params?: any) =>
        navigate(buildPath(name, params), {state: {params}}),
      goBack: () => navigate(-1),
      setParams: () => {},
    }),
    [navigate],
  );
}

type NavigationContainerProps = {
  theme?: NavTheme;
  children?: React.ReactNode;
  onReady?: () => void;
};

const Root = ({theme, children, onReady}: NavigationContainerProps) => {
  React.useEffect(() => {
    onReady?.();
  }, [onReady]);
  const value = theme ?? DarkTheme;
  return (
    <ThemeContext.Provider value={value}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: 0,
          flexGrow: 1,
          backgroundColor: value.colors.background,
        }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Host owns the single BrowserRouter. A nested container (a remote's own
// NavigationContainer, only used when that remote runs standalone) just passes
// through so there is never a second router.
export const NavigationContainer = ({
  theme,
  children,
  onReady,
}: NavigationContainerProps) => {
  const inRouter = useInRouterContext();
  const content = (
    <Root theme={theme} onReady={onReady}>
      {children}
    </Root>
  );
  return inRouter ? content : <BrowserRouter>{content}</BrowserRouter>;
};
