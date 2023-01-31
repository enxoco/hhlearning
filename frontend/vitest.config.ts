/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import * as path from 'path'

export default defineConfig({
  test: {
    setupFiles: "./src/setupTests.ts",
    globals: true,
    environment: "happy-dom",
  },
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src')
    }
  },
});
