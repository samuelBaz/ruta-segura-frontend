import React from 'react'

import { addDecorator } from '@storybook/react'
import { ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes/light-theme'

addDecorator((story) => (
  <>
    <ThemeProvider theme={lightTheme}>{story()}</ThemeProvider>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
    />
  </>
))
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
