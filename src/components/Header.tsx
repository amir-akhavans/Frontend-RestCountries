import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import BedtimeIcon from '@mui/icons-material/Bedtime'

import Cart from './Cart'
import { handleSearch } from '../redux/slices/countriesSlice'
import { AppDispatch } from '../redux/store'
import { ThemeContext } from '../contexts/ThemeContext'
import { Switch } from '@mui/material'

export default function PrimarySearchAppBar() {
  const dispatch = useDispatch<AppDispatch>()

  const { theme, setTheme } = React.useContext(ThemeContext)

  const switchTheme = () => {
    console.log('switchTheme function')
    if (theme === 'light') {
      setTheme('dark')
    }
    if (theme === 'dark') {
      setTheme('light')
    }
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    dispatch(handleSearch(target.value))
  }

  const debouncedChangeHandler = useCallback(handleChange, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Countries{' '}
          </Typography>
          <input
            style={{
              marginLeft: '1rem',
              width: '20%',
              height: '40px',
              alignSelf: 'center',
            }}
            onChange={debouncedChangeHandler}
            placeholder="Search for a country"
          />
          <Box sx={{ flexGrow: 1 }} />
          <Switch onChange={switchTheme} />
          <BedtimeIcon color="action" />
          <Cart />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
