import '../src/tailwind.css'
import type { Preview } from '@storybook/react'
import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { ColorModeProvider } from '../src/colorMode/provider'
import GlobalStyles from '../src/GlobalStyles'
import { fakerEN } from '@faker-js/faker'

import 'twin.macro'
import { Global } from '@emotion/react'
import { colors } from '../src/utils/tw'
fakerEN.seed(123)

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: {
        xs: {
          name: 'xs',
          styles: {
            width: '440px',
            height: '480px',
          },
        },
        sm: {
          name: 'sm',
          styles: {
            width: '670px',
            height: '824px',
          },
        },
        md: {
          name: 'md',
          styles: {
            width: '790px',
            height: '824px',
          },
        },
        lg: {
          name: 'lg',
          styles: {
            width: '1030px',
            height: '670px',
          },
        },
      },

      actions: { argTypesRegex: '^on[A-Z].*' },
      controls: {
        matchers: {
          color: /(background|color)$/i,
          date: /Date$/,
        },
      },
    },
    darkMode: {
      current: 'dark',
      darkClass: ['dark', 'dark-mode-plugin'],
      lightClass: ['light', 'dark-mode-plugin'],
      classTarget: 'html',
      stylePreview: true,
    },
  },

  decorators: [
    Story => {
      const sbMode = useDarkMode() ? 'dark' : 'light'

      return <ColorModeProvider mode={sbMode}>{Story()}</ColorModeProvider>
    },
    Story => {
      return (
        <>
          <GlobalStyles />
          <Global
            styles={{
              '.docs-story': { background: colors.slate[50] },
              '.dark .docs-story': {
                background: colors.slate[700],
                color: colors.white,
              },
            }}
          />
          <Story />
        </>
      )
    },
  ],
}

export default preview
