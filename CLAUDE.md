# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

This project uses **pnpm@11.20.0**. Node.js 24.18+ is required. Ensure both are on PATH before running any commands:

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"  # required for pod commands on macOS
```

## Common Commands

```bash
# Install all workspace dependencies
pnpm install

# Start all dev servers (host + all mini apps) via mprocs
pnpm start

# Start all WEB (H5) dev servers — federated web host + all remotes via mprocs
# host http://localhost:9200, trading :9201, wallet :9202, auth :9203
pnpm web

# Build/serve a single package's web (H5) bundle standalone
pnpm --filter trading web        # serve on :9201
pnpm --filter host web:build     # produce the web bundle (+ mf-manifest.json for remotes)

# Run on iOS / Android
pnpm run:host:ios
pnpm run:host:android

# Install iOS CocoaPods (run after adding native dependencies)
pnpm pods

# Run across all packages
pnpm lint
pnpm test
pnpm typecheck
pnpm format:check

# Run for a single package
pnpm --filter host test
pnpm --filter trading lint
```

## Architecture

This is a **React Native Fintech Super App** using [Re.Pack](https://re-pack.dev) and **Module Federation V2** (Rspack-based) to load mini apps at runtime as separate JS bundles.

### Workspace packages

| Package            | Role                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `packages/host`    | Native shell — owns the native binary, all native dependencies, top-level navigation, and MF remote wiring            |
| `packages/auth`    | Auth mini app — exposes `AuthProvider`, `SignInScreen`, `AccountScreen`                                               |
| `packages/sdk`     | Shared library — `KrakenWebSocketService`, `PriceProvider`, hooks, utilities, types, `getSharedDependencies()` for MF |
| `packages/trading` | Trading mini app — live asset list, Skia chart with OHLC history, trade bottom sheet                                  |
| `packages/wallet`  | Wallet mini app — real-time portfolio balance using live prices                                                       |

### Module Federation pattern

- **Host** loads remotes eagerly (`eager: true`) and is the only app that runs natively.
- **Mini apps** set `eager: false`, expose only `./App` (their `MainNavigator`), and consume `auth` as a remote.
- All shared deps (react, react-native, navigation libs, sdk) are declared as singletons via `getSharedDependencies()` from `sdk`.
- Each mini app's bundler output `uniqueName` must be unique (e.g. `sas-host`, `sas-trading`).
- TypeScript declarations for all federated imports live in `packages/host/src/declarations.d.ts`.

### How host loads a mini app

```tsx
// In host — lazy load a remote module via React.lazy + Suspense
const TradingApp = React.lazy(() =>
  randomDelay().then(() => import('trading/App')),
);

<ErrorBoundary name="Trading">
  <React.Suspense fallback={<Placeholder label="Trading" />}>
    <TradingApp />
  </React.Suspense>
</ErrorBoundary>;
```

The `randomDelay()` (250–350ms) is intentional for demo purposes — it makes the loading state visible. Remove it for production.

### Web (H5) Module Federation

The native build uses Re.Pack, which **cannot target web**. Web support is a **second, independent Rspack build per package** (`rspack.web.config.mjs`, started with `pnpm web`) using the native `@module-federation/enhanced/rspack` plugin — it emits a browser `mf-manifest.json` + `remoteEntry.js`. The native `rspack.config.ts` files are untouched.

- **`packages/host`** doubles as the web MF **host** (`:9200`): `App.web.tsx` + `TabsNavigator.web.tsx` mirror the native shell on `react-native-web`, consume the `auth`/`trading`/`wallet` remotes at runtime, and gate on the `auth` remote exactly like native. Remotes expose the same surfaces as native (trading/wallet → `./App` = `MainNavigator`; auth → `AuthProvider`/`SignInScreen`/`AccountScreen`).
- **Shared singletons** come from `packages/sdk/web-shared.mjs` (`getWebSharedDependencies()`) — the web mirror of the native `getSharedDependencies()`: `react-native` aliased to `react-native-web`, `react-dom` added, all native-only singletons dropped. Each config passes `include` to share only the subset it installs.
- **Every shared entry must declare an explicit `version`.** These modules resolve to a package `lib/module` subpath or through a `resolve.alias`, so MF can't infer a version — without it the provider silently fails to register and each bundle falls back to its own copy (e.g. a second `@react-navigation` → _"Couldn't register the navigator / multiple copies"_).
- The native bottom-tab bar (`@bottom-tabs/react-navigation`) is native-only; web uses `@react-navigation/bottom-tabs` in `TabsNavigator.web.tsx`. Native-stack works on web as-is.
- Each web entry (`index.web.js`) is a thin **async boundary** (`import('./src/bootstrap.web')`) so MF shared singletons initialise before any consumer runs.
- Any web build that pulls the `sdk` barrel also pulls the RSD `ConnectionBanner`, so its web Babel config needs `react-strict-dom/babel-preset` and must not exclude `react-strict-dom` from transforms.
- Headless end-to-end check: `spikes/phase0-h5/verify-webhost.mjs` (puppeteer-core driving system Chrome against `:9200`).

### Native dependencies

**All native deps live in `host`** — mini apps declare them as `peerDependencies` only. When adding a new native dep:

1. Add it to `host/package.json` dependencies
2. Add it to `sdk/lib/dependencies.json` if it should be a MF shared singleton
3. Add it as `peerDependency` in each mini app that uses it
4. Add a `paths` entry in the mini app's `tsconfig.json` pointing to `../host/node_modules/<dep>`
5. Run `pnpm pods` to reinstall iOS pods

### SDK exports

`packages/sdk` is a shared singleton federated across all mini apps. It exports:

- `KrakenWebSocketService` — singleton WebSocket to Kraken, shared across Trading and Wallet
- `PriceProvider` / `PriceContext` — React context wrapping the WS service
- `usePrices()` / `useAssetPrice(symbol)` — price subscription hooks (updates wrapped in `useTransition`)
- `useHistoricalPrices(krakenPair)` — fetches OHLC history from Kraken REST API
- `useConnectionStatus()` — WebSocket connection status hook
- `ConnectionBanner` — UI component showing reconnecting/disconnected state
- `ASSETS`, `ASSET_MAP`, `colors`, `formatPrice`, `formatValue`, `getAssetIconUri`

### Auth flow

`AuthProvider` (from `auth` remote) uses a render-prop pattern — it calls `children` with `{ isLoading, isSignout }`. Host's `App.tsx` gates the navigation container behind auth state. Initial state is `isLoading: true` to prevent an unauthenticated shell flash before token restore completes.

### Performance patterns

- **Leaf components**: `PriceCell` (trading) and `ValueCell` (wallet) isolate `useAssetPrice` subscriptions so only the price node re-renders on ticks. The outer row is `sdk`'s `FlashRow` (platform-split: native `Animated.View` + reanimated, web DOM node + Web Animations API), which owns the flash and hands a platform-neutral `flash(isUp)` controller to the leaf cell via render-prop; the row never re-renders on price ticks. `AssetRow` (trading) / `HoldingRow` (wallet) compose `FlashRow` and carry zero `react-native` / reanimated imports.
- **useTransition**: All price state updates in `usePrices` are wrapped in `startTransition` — price ticks are non-priority and won't block user interactions.
- **startTransition on chart**: `setChartData` in `AssetDetailsScreen` is wrapped in `React.startTransition` to defer chart rebuilds.
- **React Compiler**: `babel-plugin-react-compiler` is enabled across all packages for automatic memoization.

### Dev server ports

| App     | Port |
| ------- | ---- |
| host    | 8081 |
| auth    | 9003 |
| trading | 9001 |
| wallet  | 9002 |

### Mocks for standalone development

Each mini app has a `mocks/` folder with local stubs for federated modules (e.g. `auth/AuthProvider`). These are used when running a mini app standalone without the host.

### Rspack / Re.Pack config

Each package has an `rspack.config.ts`. The loader used is `@callstack/repack/babel-swc-loader`. Asset transforms use `getAssetTransformRules()` — mini apps use `{inline: true}`.

### Testing

Host has a Jest test suite (`pnpm --filter host test`). Key mocks in `packages/host/jest.setup.js`:

- `react-native-gesture-handler/jestSetup`
- `@bottom-tabs/react-navigation` — mocked (native-only, can't run in Jest)
- `react-native-bootsplash` — mocked
- `@callstack/repack/client` — mocked with `auth`, `trading`, `wallet` container stubs
