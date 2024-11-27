import { useState } from 'react'
import { APIResponse, Item, ItemCategory, ItemId } from '../types'
import { useCartActions } from './useCartActions'
import {
  ALL_ITEMS_ENDPOINT,
  ITEMS_BY_CATEGORY_ENDPOINT,
  ITEMS_BY_ID_ENDPOINT,
} from '../constants'

const useFetchItems = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<Item[]>([])
  const { setItemsAction } = useCartActions()

  const mappedApiData = (data: APIResponse[]) => {
    return data.map((item) => ({
      id: item.id,
      name: item.name || 'Unnamed Item',
      shortDescription:
        item.shortDescription?.[0]?.children?.[0]?.text ||
        'No description available',
      longDescription:
        item.longDescription?.[0]?.children?.[0]?.text ||
        'No description available',
      price: Math.max(0, item.price || 0), //Avoid negative prices
      category: item.category || 'all',
      image: item.image?.formats?.medium?.url || 'default-image-url.jpg',
    }))
  }

  const getAllItems = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(ALL_ITEMS_ENDPOINT)
      const res = await response.json()
      // console.log(JSON.stringify(res.data, null, 2))
      const mappedItems = mappedApiData(res.data)
      console.log(mappedItems)
      setItems(mappedItems)
      setItemsAction(mappedItems)
    } catch (err) {
      setError('Failed to fetch items.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const getItemsById = async (id: string): Promise<Item | undefined> => {
    console.log('getItemsById :', id)
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${ITEMS_BY_ID_ENDPOINT(id)}`)
      const res = await response.json()
      const mappedItems = mappedApiData([res.data]) // We pass an array with a single element
      console.log(mappedItems)
      // setItems(mappedItems)
      return mappedItems[0]
    } catch (err) {
      setError('Failed to fetch item by ID.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const getItemsByCategory = async (
    category: ItemCategory
  ): Promise<Item[] | undefined> => {
    console.log('getItemsByCategory :', category)
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(ITEMS_BY_CATEGORY_ENDPOINT(category))
      const res = await response.json()
      const mappedItems = mappedApiData(res.data)
      setItems(mappedItems)
      return mappedItems
    } catch (err) {
      setError('Failed to fetch items by category.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    items,
    isLoading,
    error,
    getAllItems,
    getItemsByCategory, 
    getItemsById,
  }
}

export default useFetchItems