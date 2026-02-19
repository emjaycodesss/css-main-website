/**
 * Vite TypeScript environment declarations.
 *
 * This pulls in Vite's client typings, including module declarations for
 * importing static assets (e.g. `import "./index.css"`), which `tsc -b` needs
 * during CI builds.
 */
/// <reference types="vite/client" />

/** Optional: override Stickrun gate verify API base URL (default: https://testapi.stickrun.net) */
interface ImportMetaEnv {
  readonly VITE_GATE_VERIFY_URL?: string;
}

