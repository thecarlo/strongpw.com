/// <reference types="vitest" />

import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePluginRadar } from 'vite-plugin-radar';

dotenv.config();

const viteAnalyticsId = process.env.VITE_ANALYTICS_ID;

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
    }),
    VitePluginRadar({
      analytics: {
        id: viteAnalyticsId,
      },
    }),
  ],
  root: './',
  publicDir: 'public',

  test: {
    coverage: {
      clean: true,
      provider: 'istanbul',
      reporter: ['html', 'text'],
      include: ['src/**/*.ts?(x)'],
      exclude: ['src/**/*.js?(x)', 'src/index.tsx', 'src/**/*.test.ts?(x)'],
      all: true,
      reportsDirectory: './coverage',
      thresholds: {
        autoUpdate: true,
        statements: 100,
        branches: 98.19,
        functions: 100,
        lines: 100,
      },
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    reporters: ['verbose'],
  },

  resolve: {
    alias: [
      {
        find: '@configuration',
        replacement: path.resolve(__dirname, './src/configuration'),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/components'),
      },
      {
        find: '@enums',
        replacement: path.resolve(__dirname, './src/enums'),
      },
      {
        find: '@interfaces',
        replacement: path.resolve(__dirname, './src/interfaces'),
      },
      {
        find: '@functions',
        replacement: path.resolve(__dirname, './src/functions'),
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, './src/hooks'),
      },
    ],
  },
});
