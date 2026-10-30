// Web twin of useTabBarHeight.ts. On web the host's tab bar is
// @react-navigation/bottom-tabs (aliased to sdk's web-nav shim), which exposes
// the same useBottomTabBarHeight hook as the native binding.
export {useBottomTabBarHeight as useTabBarHeight} from '@react-navigation/bottom-tabs';
