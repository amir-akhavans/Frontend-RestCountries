import React from 'react'
import { ThemeValues } from '../types'

export const ThemeContext = React.createContext({
  theme: 'light',
  setTheme: (theme: ThemeValues) => console.log(theme),
})
