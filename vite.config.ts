/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  root: './',
  publicDir: 'public',

  test: {
    coverage: {
      clean: true,
      provider: 'istanbul',
      reporter: ['html', 'text', 'json'],
      include: ['src/**/*.ts?(x)'],
      exclude: ['src/**/*.js?(x)', 'src/index.tsx', 'src/**/*.test.ts?(x)'],
      all: true,
      reportsDirectory: './coverage',
      thresholds: {
        autoUpdate: true,
        statements: 93.33,
        branches: 91.3,
        functions: 81.81,
        lines: 94.05,
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
    ],
  },
});
