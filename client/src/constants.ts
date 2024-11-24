import { ItemCategory, ItemId } from "./types"

export const ALL_ITEMS_ENDPOINT = `http://localhost:1337/api/items?populate=*`
export const ITEMS_BY_CATEGORY_ENDPOINT = (
  category: ItemCategory
) =>
  `http://localhost:1337/api/items?filters[category][$eq]=${category}&populate=*`
  export const ITEMS_BY_ID_ENDPOINT = (id: ItemId) =>
    `http://localhost:1337/api/items/${id}?populate=*`



export const ITEM_CATEGORY = {
  all: 'all',
  topRated: 'Top Rated',
  newArrivals: 'New Arrivals',
  bestSeller: 'Best Sellers',
} as const

export const TAB_ITEM_DETAILS_VALUES = {
  DESCRIPTION: 'description',
  REVIEWS: 'reviews',
} as const
