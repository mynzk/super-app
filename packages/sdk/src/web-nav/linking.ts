import {ASSET_MAP} from '../constants';
import type {AssetSymbol} from '../types';

// Web navigation route table for the @react-navigation compat shim.
// Absolute react-router path patterns keyed by @react-navigation screen name.
// The shim (native-stack / bottom-tabs) uses these to (a) match the current URL
// to a screen and (b) turn navigate(name, params) into a URL. App-specific on
// purpose — this shim only serves super-app-showcase.
export const ROUTES: Record<string, string> = {
  // host bottom tabs
  Trading: '/trading',
  Wallet: '/wallet',
  Account: '/account',
  // trading stack
  AssetList: '/trading',
  AssetDetails: '/trading/asset/:symbol',
  TradeSuccess: '/trading/trade-success/:symbol',
  // wallet stack
  WalletMain: '/wallet',
  // host Account stack
  AccountMain: '/account',
};

export const DEFAULT_PATH = '/trading';

// Screens whose @react-navigation params are objects must map to/from the URL.
// toPath: screen params -> URL path params. fromPath: URL path params (+ the
// live params carried in history state for in-app nav) -> screen params. On a
// hard refresh / deep link there is no history state, so params are rebuilt from
// the URL (e.g. the asset object from ASSET_MAP[symbol]).
type Adapter = {
  toPath: (params: any) => Record<string, string>;
  fromPath: (
    pathParams: Record<string, string | undefined>,
    state: any,
  ) => any;
};

export const PARAM_ADAPTERS: Record<string, Adapter> = {
  AssetDetails: {
    toPath: params => ({symbol: params.asset.symbol}),
    fromPath: (pathParams, state) =>
      state?.params ?? {
        asset: ASSET_MAP[pathParams.symbol as AssetSymbol],
      },
  },
  TradeSuccess: {
    toPath: params => ({symbol: params.symbol}),
    fromPath: (pathParams, state) =>
      state?.params ?? {symbol: pathParams.symbol},
  },
};

// Build a concrete URL from a screen name + params.
export function buildPath(name: string, params?: any): string {
  const pattern = ROUTES[name] ?? '/';
  const adapter = PARAM_ADAPTERS[name];
  if (!adapter || !params) {
    return pattern;
  }
  const pathParams = adapter.toPath(params);
  return pattern.replace(/:([A-Za-z0-9_]+)/g, (_match, key) =>
    encodeURIComponent(pathParams[key] ?? ''),
  );
}
