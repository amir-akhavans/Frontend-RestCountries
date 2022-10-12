import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import countriesReducer from './slices/countriesSlice'
import cartSlice from './slices/cartSlice'

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    cart: cartSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
