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
        <Table
          sx={{
            width: '100%',
            minWidth: 650,
            display: 'flex',
            flexDirection: 'column',
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
              }}
            >
              <TableCell
                sx={{
                  gridColumn: '1 / 2',
                }}
              >
                <h3>Flag</h3>
              </TableCell>
              <TableCell
                sx={{
                  gridColumn: '2 / 3',
                }}
              >
                <h3>Name</h3>
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  gridColumn: '3 / 4',
                }}
              >
                <h3>Languages</h3>
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  gridColumn: '4 / 5',
                }}
              >
                <h3>Population</h3>
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  gridColumn: '5 / 6',
                }}
              >
                <h3>Region</h3>
              </TableCell>{' '}
              <TableCell
                align="left"
                sx={{
                  gridColumn: '6 / 7',
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              width: '100vw',
            }}
          >
            {countries.itemsToShow.map((country) => (
              <TableRow
                key={country.name.common}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    gridColumn: '1 / 2',
                  }}
                >
                  <TableRow key={country.name.common}>
                    <img
                      src={country.flags.png}
                      alt={country.name.common}
                      style={{ maxWidth: '100px' }}
                    />
                  </TableRow>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    gridColumn: '2 / 3',
                  }}
                >
                  {country.name.common}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    gridColumn: '3 / 4',
                  }}
                >
                  {Object.values(country.languages).map((lang) => lang)}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    gridColumn: '4 / 5',
                  }}
                >
                  {country.population.toLocaleString()}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    gridColumn: '5 / 6',
                  }}
                >
                  {country.region}
                </TableCell>
                <TableCell
                  sx={{
                    gridColumn: '6 / 7',
                  }}
                >
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
