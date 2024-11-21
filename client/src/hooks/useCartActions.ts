import {
  setIsCartOpen,
  setItems,
  addToCart,
  removeFromCart,
} from '../store/cart/cartSlice'
import { useAppDispatch } from './store'
import { CartItem, Item } from '../types'

export const useCartActions = () => {
  const dispatch = useAppDispatch()

  const setIsCartOpenAction = () => {
    dispatch(setIsCartOpen())
  }

  const setItemsAction = (items: Item[]) => {
    dispatch(setItems(items))
  }

  const addToCartAction = (item: CartItem) => {
    dispatch(addToCart(item))
  }

  const removeFromCartAction = (item: CartItem) => {
    dispatch(removeFromCart(item))
  }

  return {
    setIsCartOpenAction,
    setItemsAction,
    addToCartAction,
    removeFromCartAction,
  }
}
