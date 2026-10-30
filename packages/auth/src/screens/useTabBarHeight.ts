// Bottom-tab-bar height — the single irreducible platform difference behind
// AccountScreen. Native reads it from react-native-bottom-tabs (the native tab
// bar provider). The web twin (useTabBarHeight.web.ts) reads the same value
// from the web tab bar. Isolating it here lets AccountScreen be one file.
export {useBottomTabBarHeight as useTabBarHeight} from 'react-native-bottom-tabs';
