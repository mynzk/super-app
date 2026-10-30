// Standalone web entry for wallet. Thin async boundary only: Module Federation
// shared singletons (declared eager:false) must initialise before any code that
// imports them runs. Deferring the real bootstrap behind a dynamic import
// provides that boundary — without it the build throws "Shared module react is
// not available for eager consumption".
import('./src/bootstrap.web');
