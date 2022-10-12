import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material'

import Header from '../components/Header'
import Spinner from '../components/Spinner'
import { fetchCountriesThunk } from '../redux/slices/countriesSlice'
import { AppDispatch, RootState } from '../redux/store'
import { addToCart } from '../redux/slices/cartSlice'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { countries } = useSelector((state: RootState) => state)

  useEffect(() => {
    dispatch(fetchCountriesThunk())
  }, [dispatch])

  if (countries.isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Header />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h3>Flag</h3>
              </TableCell>
              <TableCell>
                <h3>Name</h3>
              </TableCell>
              <TableCell align="right">
                <h3>Languages</h3>
              </TableCell>
              <TableCell align="right">
                <h3>Population</h3>
              </TableCell>
              <TableCell align="right">
                <h3>Region</h3>
              </TableCell>{' '}
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.itemsToShow.map((country) => (
              <TableRow key={country.name.common}>
                <TableCell component="th" scope="row">
                  <TableRow key={country.name.common}>
                    <img
                      src={country.flags.png}
                      alt={country.name.common}
                      style={{ maxWidth: '100px' }}
                    />
                  </TableRow>
                </TableCell>
                <TableCell component="th" scope="row">
                  {country.name.common}
                </TableCell>
                <TableCell align="right">
                  {Object.values(country.languages).map((lang) => lang)}
                </TableCell>
                <TableCell align="right">{country.population}</TableCell>
                <TableCell align="right">{country.region}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      dispatch(
                        addToCart({
                          name: country.name.common,
                          population: country.population,
                        })
                      )
                    }}
                  >
                    ADD
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
