// Web Module Federation remote entry for trading (web-only; referenced solely
// by rspack.web.config.mjs's `exposes`, so the native rspack.config.ts build is
// untouched).
//
// Importing './../stylex.css' here as a side effect binds trading's StyleX
// atomic CSS to the EXPOSED `./App` chunk. The standalone bootstrap
// (src/bootstrap.web.tsx) already imports stylex.css, but that import lives only
// in the standalone entry graph — when the web host consumes this remote via MF
// it loads just the exposed module (MainNavigator) and never runs bootstrap, so
// without this import the host requests none of trading's StyleX stylesheet and
// every RSD component renders with StyleX class names but no backing CSS
// (styles lost). publicPath is absolute (http://localhost:9201/), so the CSS
// chunk loads from trading's own origin under the host.
import '../stylex.css';

export {default} from './MainNavigator';
