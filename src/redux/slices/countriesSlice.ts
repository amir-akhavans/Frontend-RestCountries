import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { Country } from '../../types'

export interface countriesState {
  itemsToShow: Country[]
  allItems: Country[]
  isLoading: boolean
}

const initialState: countriesState = {
  itemsToShow: [],
  allItems: [],
  isLoading: false,
}

export const fetchCountriesThunk = createAsyncThunk(
  'countries/fetch',
  async () => {
    const query = 'fields=name,languages,population,region,flags '
    const URL = `https://restcountries.com/v3.1/all?${query}`
    const response = await axios.get(URL)
    // console.log('response', response)

    return {
      data: response.data,
      status: response.status,
    }
  }
)

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    handleSearch: (state, action) => {
      const searchBy = action.payload.toLowerCase()
      const searchedCounties = state.allItems.filter((item) => {
        const name = item.name.common.toLowerCase()
        if (name.startsWith(searchBy)) {
          return item
        }
        return false
      })

      state.itemsToShow = searchedCounties
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountriesThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchCountriesThunk.fulfilled, (state, action) => {
      state.allItems = state.itemsToShow = action.payload.data
      state.isLoading = false
    })
  },
})

export const { handleSearch } = countriesSlice.actions
export default countriesSlice.reducer
