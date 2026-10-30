// Standalone web entry for auth. Thin async boundary only (see trading's
// index.web.js): MF shared singletons (eager:false) must initialise before any
// consumer runs.
import('./src/bootstrap.web');
