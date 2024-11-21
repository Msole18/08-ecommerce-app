import { useState, useEffect } from 'react'
import { Item } from '../types'
import { useCartActions } from './useCartActions'

const useFetchItems = () => {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setItemsAction } = useCartActions()

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          'http://localhost:1337/api/items?populate=*'
        )
        const data = await response.json()

        const mappedItems = data.data.map((item: any) => ({
          id: item.id.toString(),
          name: item.name,
          shortDescription:
            item.shortDescription[0]?.children[0]?.text ||
            'No description available',
          longDescription:
            item.longDescription[0]?.children[0]?.text ||
            'No description available',
          price: item.price,
          category: item.category,
          image: item.image.formats.medium.url,
        }))

        setItems(mappedItems)
        setItemsAction(mappedItems)
      } catch (err) {
        setError('Failed to fetch items.')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchItems()
  }, [setItemsAction])

  return { items, isLoading, error }
}

export default useFetchItems
