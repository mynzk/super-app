// Async boundary so Module Federation shared singletons initialise before the
// app code (host.bootstrap) runs.
import('./host.bootstrap');
export {};
