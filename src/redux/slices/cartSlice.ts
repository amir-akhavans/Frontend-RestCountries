import { createSlice } from '@reduxjs/toolkit'

import { AddToCartAction, CartItem, RemoveFromCartAction } from '../../types'

type CartState = {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: AddToCartAction) => {
      // Check if the country is already in the cart
      const isDuplicate = state.items.some(
        (item) => item.name === action.payload.name
      )
      if (isDuplicate) return

      state.items = [...state.items, action.payload]
    },

    removeFromCart: (state, action: RemoveFromCartAction) => {
      const filteredItems = state.items.filter(
        (item) => item.name !== action.payload.name
      )

      state.items = filteredItems
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
