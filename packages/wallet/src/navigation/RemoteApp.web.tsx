// Web Module Federation remote entry for wallet (web-only; referenced solely by
// rspack.web.config.mjs's `exposes`, so the native rspack.config.ts build is
// untouched).
//
// Importing '../stylex.css' here as a side effect binds wallet's StyleX atomic
// CSS to the EXPOSED `./App` chunk. The standalone bootstrap imports stylex.css
// too, but only in the standalone entry graph — when the web host consumes this
// remote via MF it loads just the exposed MainNavigator and never runs
// bootstrap, so without this import the host requests none of wallet's StyleX
// stylesheet and every RSD component renders with class names but no backing CSS
// (styles lost). publicPath is absolute (http://localhost:9202/), so the CSS
// chunk loads from wallet's own origin under the host.
import '../stylex.css';

export {default} from './MainNavigator';
