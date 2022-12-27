import { defineConfig } from "vite";
import * as path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
  },
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src')
    }
  },
});
