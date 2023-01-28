const { mergeConfig } = require('vite');
const path = require("path")
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@chakra-ui/storybook-addon'
  ],
  "features": {
    "emotionAlias": false
  },
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Use the same "resolve" configuration as your app
      resolve: {
        alias: {
          '#': path.resolve(__dirname, '../src')
        }
      },
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
    });
  },

  "features": {
    "storyStoreV7": true
  }
}