import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { CartItem, CartState, Item, ItemId } from '../../types'

const initialState: CartState = {
  isCartOpen: false,
  items: [],
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen
    },

    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload
    },

    addToCart: (state, action: PayloadAction<Item>) => {
      const isItemAlreadyDefined = state.cart.find(
        (item: CartItem) => item.id === action.payload.id
      )
      if (isItemAlreadyDefined) {
        isItemAlreadyDefined.quantity++
      } else {
        state.cart.push({ ...action.payload, quantity: 1 })
      }
    },

    removeFromCart: (state, action: PayloadAction<ItemId>) => {
      const isItemAlreadyDefined = state.cart.find(
        (item: CartItem) => item.id === action.payload.id
      )
      if (isItemAlreadyDefined) {
        if (isItemAlreadyDefined.quantity > 1) {
          isItemAlreadyDefined.quantity--
        } else {
          state.cart = state.cart.filter(
            (item: CartItem) => item.id !== action.payload.id
          )
        }
      }
    },
  },
})

export default cartSlice.reducer

export const { setIsCartOpen, setItems, addToCart, removeFromCart } = cartSlice.actions
