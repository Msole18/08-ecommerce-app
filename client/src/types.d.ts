import { ITEM_CATEGORY } from "./constants"

export type ItemCategory = (typeof ITEM_CATEGORY)[keyof typeof ITEM_CATEGORY]

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
