import React from "react";
import "../src/index.css"
import "../src/App.css"
import { theme } from "@chakra-ui/pro-theme"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { RecoilRoot } from "recoil"
import { MemoryRouter } from 'react-router-dom';
import { createClient, Provider } from "urql"
import { Story } from "@storybook/react";

const myTheme = extendTheme(
  {
    colors: { ...theme.colors, brand: theme.colors.blue },
  },
  theme
)
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story: Story) => (
    <ChakraProvider theme={myTheme}>
      <RecoilRoot>
    <div style={{ margin: '3em' }}>
    <Story />
    </div>
    </RecoilRoot>
    </ChakraProvider>

  ),
];