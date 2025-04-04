import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '', // Use relative paths for assets
  root: './src', // Set the root directory to 'src'
  publicDir: '../public', // Set the public directory to 'public', use .. so it is not nested within the src folder
  build: {
    outDir: '../dist', // Set the output directory to 'dist', use .. so it is not nested within the src folder
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: './src/index.html',
        customize: './src/customize.html',
        id: './src/id.html',
        tango: './src/tango.html',
        goodbye: './src/goodbye.html',
        manual: './src/manual.html',
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
        background_color: '#006c66',
        theme_color: '#006c66',
        start_url: './',
        display: 'fullscreen',
        orientation: 'landscape',
        icons: [
          {
            src: './pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: './favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
          },
        ],
      },

      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,mp3}'],
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
