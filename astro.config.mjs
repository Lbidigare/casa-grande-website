import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { findUnconfirmed } from './src/lib/checks.mjs';

// Lists placeholders at every build, and refuses to publish them once
// preview_mode is switched off in src/data/casa-grande.yaml.
const launchCheck = {
  name: 'casa-grande-launch-check',
  hooks: {
    'astro:build:start': ({ logger }) => {
      const data = parse(readFileSync(new URL('./src/data/casa-grande.yaml', import.meta.url), 'utf8'));
      const items = findUnconfirmed(data);
      if (items.length === 0) return logger.info('All site information is confirmed.');
      const list = items.map((i) => `  - ${i}`).join('\n');
      if (data.preview_mode === false) {
        throw new Error(`preview_mode is off, but these items still need confirming:\n${list}`);
      }
      logger.warn(`Preview mode: ${items.length} item(s) still to confirm before launch:\n${list}`);
    },
  },
};

export default defineConfig({
  // GitHub Pages address. When a custom domain is connected, set site to
  // that domain (e.g. 'https://www.example.com') and remove base.
  site: 'https://lbidigare.github.io',
  base: '/casa-grande-website',
  integrations: [launchCheck],
});
