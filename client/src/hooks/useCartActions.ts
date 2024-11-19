import {
  setIsCartOpen,
  setItems,
  addToCart,
  removeFromCart,
} from '../store/cart/cartSlice'
import { useAppDispatch } from './store'
import { CartItem, Item, ItemId } from '../types'

export const useCartActions = () => {
  const dispatch = useAppDispatch()

  const toggleCartAction = () => {
    dispatch(setIsCartOpen())
  }

  const refreshItemsAction = (items: Item[]) => {
    dispatch(setItems(items))
  }

  const addItemAction = (item: CartItem) => {
    dispatch(addToCart(item))
  }

  const removeItemAction = ({ id }: ItemId) => {
    dispatch(removeFromCart({ id }))
  }

  return {
    toggleCartAction,
    refreshItemsAction,
    addItemAction,
    removeItemAction,
  }
}
