import { ITEM_CATEGORY, TAB_ITEM_DETAILS_VALUES } from './constants'

export type ItemCategory = (typeof ITEM_CATEGORY)[keyof typeof ITEM_CATEGORY]
// export type ItemCategory = keyof typeof ITEM_CATEGORY
export type TabDetailsValue =
  (typeof TAB_ITEM_DETAILS_VALUES)[keyof typeof TAB_ITEM_DETAILS_VALUES]
// export type TabDetailsValue = typeof TAB_ITEM_DETAILS_VALUES
export type ItemId = Pick<Item, 'id'>

export interface Item {
  id: string
  name: string
  shortDescription: string
  longDescription: string
  price: number
  image: string
  category: ItemCategory
}

export interface CartItem extends Item {
  quantity: number
}

export interface CartState {
  isCartOpen: boolean
  items: Item[] // Productos disponibles
  cart: CartItem[] // Productos en el carrito
}
