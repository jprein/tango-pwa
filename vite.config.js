import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: './src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: './src/index.html',
        customize: './src/customize.html',
        id: './src/id.html',
        tango: './src/tango.html',
        goodbye: './src/goodbye.html',
      },
    },
  },
  plugins: [
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'service-worker',
      filename: 'sw.js',
      registerType: 'prompt',
      injectRegister: false,

      // this enables the pwa-assets.config.js
      // generates favicon etc on the fly
      // https://vite-pwa-org.netlify.app/assets-generator/integrations.html
      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: 'TANGO-CC',
        short_name: 'TANGO-CC',
        description: 'This is the TANGO-CC as a PWA.',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
        ],
      },

      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        maximumFileSizeToCacheInBytes: 3000000,
      },

      devOptions: {
        enabled: false, // no SW in dev mode
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
});
