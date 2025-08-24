import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    // Gzip/Brotli compression for assets
    compression(),
    // HTML plugin for preload
    createHtmlPlugin({
      inject: {
        tags: [
          {
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'script',
              href: '/assets/js/main-[hash].js',
            },
            injectTo: 'head',
          },
        ],
      },
    }),
    // PWA plugin for service worker
    VitePWA({
      registerType: 'autoUpdate',
      devOptions:{
        enabled: false
      },
      manifest: {
        name: 'Flourish CV Generator',
        short_name: 'Flourish',
        description: 'Flourish CV Generator - Generate professional CVs easily and quickly.',
        theme_color: '#FFD600',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '.',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MiB
        runtimeCaching: [
          {
            urlPattern: ({url}) => url.pathname.endsWith('.pdf'),
            handler: 'NetworkFirst', // Always try to get latest PDF
            options: {
              cacheName: 'pdf-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 },
            },
          },
          {
            urlPattern: ({request}) => request.destination === 'document' || request.destination === 'script' || request.destination === 'style' || request.destination === 'image',
            handler: 'StaleWhileRevalidate', // Cache static assets
            options: {
              cacheName: 'static-assets',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: ({url}) => url.pathname.startsWith('/api/'),
            handler: 'NetworkFirst', // Always try to get latest API data
            options: {
              cacheName: 'api-cache',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 5 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['@azure/msal-browser', '@azure/msal-react']
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.info', 'console.debug'],
        passes: 2,
      },
      mangle: {
        toplevel: true,
        keep_fnames: false,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // eslint-disable-next-line no-undef
    sourcemap: process.env.NODE_ENV === 'staging',
    chunkSizeWarningLimit: 1000,
  },
})
