import { useState } from 'react'
import { APIResponse, Item } from '../types'
import { useCartActions } from './useCartActions'
import { ALL_ITEMS_ENDPOINT } from '../constants'

const useFetchItems = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<Item[]>([])
  const { setItemsAction } = useCartActions()

  const mappedApiData = (data: APIResponse[])=> {
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

  return { items, isLoading, error, getAllItems }
}

export default useFetchItems
