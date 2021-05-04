import React from 'react'

export const THEME = {
    LIGHT: 'light',
    DARK: 'dark'
}

const ThemeContext = React.createContext({
  theme: THEME.LIGHT
})

export default ThemeContext
