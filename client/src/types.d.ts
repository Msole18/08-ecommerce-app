import { ITEM_CATEGORY, TAB_ITEM_DETAILS_VALUES } from './constants'

export type ItemCategory = keyof typeof ITEM_CATEGORY
export type TabDetailsValue =
  (typeof TAB_ITEM_DETAILS_VALUES)[keyof typeof TAB_ITEM_DETAILS_VALUES]


export type ItemId = number

export interface Item {
  id: ItemId
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
  items: Item[] 
  cart: CartItem[] 
}

export interface APIResponse {
  id: number
  name: string
  shortDescription: Array<{
    children: Array<{
      text: string
    }>
  }>
  longDescription: Array<{
    children: Array<{
      text: string
    }>
  }>
  price: number
  category: ItemCategory
  image: {
    formats: {
      medium: {
        url: string
      }
    }
  }
}
