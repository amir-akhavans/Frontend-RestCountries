import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { Grid } from '@mui/material'

export default function Spinner() {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <CircularProgress />
    </Grid>
  )
}
