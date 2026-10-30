// Web host entry. Thin async boundary only (see trading's index.web.js): the MF
// shared share-scope must initialise before any consumer runs.
import('./src/bootstrap.web');
