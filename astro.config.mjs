import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [tailwind()],
  site: 'https://ideas-to-life.ai',
  vite: {
    ssr: {
      external: ['node:fs', 'node:path']
    }
  }
});