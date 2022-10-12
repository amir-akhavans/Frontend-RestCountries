import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'

import { ThemeContext } from './contexts/ThemeContext'

import Routes from './Routes'
import { darkTheme } from './theme/dark'
import { lightTheme } from './theme/light'
import { ThemeValues } from './types'

export default function App() {
  const [theme, setTheme] = React.useState<ThemeValues>('light')

  const handleSwitchThemes = (theme: ThemeValues) => {
    switch (theme) {
    case 'light':
      return lightTheme
    case 'dark':
      return darkTheme
    default:
      return lightTheme
    }
  }

  const handleSwitchTheme = (theme: ThemeValues) => {
    setTheme(theme)
  }

  console.log('theme', theme)

  const selectedTheme = React.useMemo(
    () => createTheme(handleSwitchThemes(theme)),
    [theme]
  )

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme: handleSwitchTheme }}>
        <ThemeProvider theme={selectedTheme}>
          <CssBaseline enableColorScheme />
          <Routes />
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  )
}
