import * as React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {
  NavContext,
  useNavTheme,
  useRouterNavigation,
  type Navigation,
  type Route,
} from './native.web';
import {ROUTES, DEFAULT_PATH} from './linking';

// Minimal web replacement for @react-navigation/bottom-tabs, backed by react-
// router-dom + real DOM (zero react-native-web). createBottomTabNavigator()
// returns {Navigator, Screen}. The Navigator keeps visited tabs mounted (lazy,
// like @react-navigation) toggling them with display, renders a bottom tab bar,
// and exposes useBottomTabBarHeight().

const TAB_BAR_HEIGHT = 56;
const TabBarHeightContext = React.createContext<number>(0);
export const useBottomTabBarHeight = () =>
  React.useContext(TabBarHeightContext);

type TabBarIcon = (args: {color: string; focused: boolean}) => React.ReactNode;
type TabScreenOptions = {
  title?: string;
  tabBarIcon?: TabBarIcon;
  headerShown?: boolean;
  tabBarStyle?: {backgroundColor?: string; borderTopColor?: string};
  tabBarActiveTintColor?: string;
  tabBarInactiveTintColor?: string;
};
type TabScreenProps = {
  name: string;
  component?: React.ComponentType<any>;
  options?: TabScreenOptions;
};
type TabScreenDef = {
  name: string;
  component: React.ComponentType<any>;
  options?: TabScreenOptions;
};

export function createBottomTabNavigator() {
  const Screen: React.FC<TabScreenProps> = () => null;

  type NavigatorProps = {
    screenOptions?: TabScreenOptions;
    children: React.ReactNode;
  };

  const Navigator = ({screenOptions, children}: NavigatorProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const navigation = useRouterNavigation();
    const theme = useNavTheme();

    const tabs: TabScreenDef[] = React.Children.toArray(children)
      .filter(React.isValidElement)
      .map(child => {
        const p = (child as React.ReactElement<TabScreenProps>).props;
        return {name: p.name, component: p.component!, options: p.options};
      });

    // Active tab = the one whose base path prefixes the current URL.
    // matchedIndex is -1 when the URL matches no tab (e.g. the root '/');
    // activeIndex then falls back to the first tab for rendering. Keep the two
    // separate: the redirect below must key off the *unmatched* signal, not the
    // rendered fallback (a shared `let` captured by the effect would read the
    // post-fallback value and never redirect).
    const matchedIndex = tabs.findIndex(t => {
      const base = ROUTES[t.name] ?? '/';
      return (
        location.pathname === base || location.pathname.startsWith(base + '/')
      );
    });
    const activeIndex = matchedIndex === -1 ? 0 : matchedIndex;

    // Normalize the root path to the first tab so the address bar is canonical
    // (e.g. '/trading'), keeping back-button and deep-link behavior consistent.
    React.useEffect(() => {
      if (matchedIndex === -1 && location.pathname === '/') {
        navigate(DEFAULT_PATH, {replace: true});
      }
    }, [matchedIndex, location.pathname, navigate]);

    // Keep visited tabs mounted (lazy mount, then retain) like @react-navigation.
    const [visited, setVisited] = React.useState<readonly number[]>([
      activeIndex,
    ]);
    React.useEffect(() => {
      setVisited(prev =>
        prev.includes(activeIndex) ? prev : [...prev, activeIndex],
      );
    }, [activeIndex]);

    const barBg =
      screenOptions?.tabBarStyle?.backgroundColor ?? theme.colors.card;
    const borderTop =
      screenOptions?.tabBarStyle?.borderTopColor ?? theme.colors.border;
    const activeTint =
      screenOptions?.tabBarActiveTintColor ?? theme.colors.primary;
    const inactiveTint =
      screenOptions?.tabBarInactiveTintColor ?? theme.colors.text;
    const nav = navigation as Navigation;

    return (
      <TabBarHeightContext.Provider value={TAB_BAR_HEIGHT}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            minHeight: 0,
            height: '100%',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              minHeight: 0,
            }}>
            {tabs.map((t, i) => {
              if (!visited.includes(i)) {
                return null;
              }
              const isActive = i === activeIndex;
              const TabComponent = t.component;
              const tabRoute: Route = {name: t.name, params: {}};
              return (
                <div
                  key={t.name}
                  style={{
                    display: isActive ? 'flex' : 'none',
                    flexDirection: 'column',
                    flexGrow: 1,
                    minHeight: 0,
                  }}>
                  <NavContext.Provider
                    value={{navigation: nav, route: tabRoute}}>
                    <TabComponent navigation={nav} route={tabRoute} />
                  </NavContext.Provider>
                </div>
              );
            })}
          </div>
          <nav
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: TAB_BAR_HEIGHT,
              backgroundColor: barBg,
              borderTopWidth: 1,
              borderTopStyle: 'solid',
              borderTopColor: borderTop,
              flexShrink: 0,
            }}>
            {tabs.map((t, i) => {
              const color = i === activeIndex ? activeTint : inactiveTint;
              const base = ROUTES[t.name] ?? '/';
              return (
                <button
                  key={t.name}
                  onClick={() => navigate(base)}
                  style={{
                    flexGrow: 1,
                    flexBasis: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    border: 0,
                    background: 'transparent',
                    cursor: 'pointer',
                    color,
                  }}>
                  {t.options?.tabBarIcon?.({color, focused: i === activeIndex})}
                  <span style={{color, fontSize: 12}}>
                    {t.options?.title ?? t.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </TabBarHeightContext.Provider>
    );
  };

  return {Navigator, Screen};
}
