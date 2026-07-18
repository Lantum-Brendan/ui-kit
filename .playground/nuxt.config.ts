// Playground host — verifies the ui-kit layer locally.
// Extending '..' (the layer root) pulls in the layer's components/assets.
// The layer's nuxt.config.ts references its own package name
// ('@trakli/ui-kit/assets/css/tokens.css'); that alias only exists when the
// package is installed. For local dev we map it explicitly here (playground-only,
// the published layer relies on the real npm alias).
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const layerRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

export default defineNuxtConfig({
  extends: ['..'],
  srcDir: 'app',
  alias: {
    '@trakli/ui-kit': layerRoot
  },
  devtools: { enabled: true }
});
