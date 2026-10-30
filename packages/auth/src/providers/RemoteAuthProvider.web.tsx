// Web Module Federation remote entry for the auth AuthProvider (web-only;
// referenced solely by rspack.web.config.mjs's `exposes`, so the native
// rspack.config.ts build is untouched).
//
// Importing '../stylex.css' here as a side effect binds auth's StyleX atomic CSS
// to the AuthProvider exposed chunk. The web host mounts auth/AuthProvider as
// the outermost provider before any auth UI (SignInScreen / AccountScreen) can
// render, so loading the stylesheet here guarantees auth's StyleX CSS is present
// for every auth surface the host shows. The standalone bootstrap imports
// stylex.css too, but that graph never runs under the host. publicPath is
// absolute (http://localhost:9203/), so the CSS chunk loads from auth's own
// origin under the host.
import '../stylex.css';

export {default} from './AuthProvider';
