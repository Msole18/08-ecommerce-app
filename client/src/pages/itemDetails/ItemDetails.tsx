import ItemInfo from './ItemInfo'
import ReleatedItems from './ReleatedItems'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import useFetchItems from '../../hooks/useFetchItems'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useAppSelector } from '../../hooks/store'
import { useParams } from 'react-router-dom'
import { useCartActions } from '../../hooks/useCartActions'
import { useEffect, useState } from 'react'
import { TabDetailsValue } from '../../types'
import { TAB_ITEM_DETAILS_VALUES } from '../../constants'
import { Item as ItemType } from '../../types'

const ItemDetails = () => {
  const { addToCartAction } = useCartActions()
  const items = useAppSelector((state) => state.cart.items)
  const { getItemsByCategory, getItemsById } = useFetchItems()
  const { itemId } = useParams()

  const [value, setValue] = useState<TabDetailsValue>(
    TAB_ITEM_DETAILS_VALUES.DESCRIPTION
  )

  const [quantity, setQuantity] = useState(1)
  const [item, setItem] = useState<ItemType | undefined>(undefined)
  const [relatedItems, setRelatedItems] = useState<ItemType[] | undefined>(
    undefined
  )

  const handleChange = (_: React.SyntheticEvent, value: TabDetailsValue) => {
    setValue(value)
  }

  useEffect(() => {
    if (!itemId) return

    // Check if the item is already in the store
    const foundItem = items.find((item) => item.id === Number(itemId))

    if (foundItem) {
      // If the item is in the store, we assign it directly from the status
      setItem(foundItem)
      setRelatedItems(
        items.filter((item) => item.id !== foundItem.id).slice(0, 4)
      )
    } else {
      // If it is not in the store, search for the item by ID and then the products related to that ID
      const fetchDetails = async () => {
        try {
          const fetchedItem = await getItemsById(itemId)

          if (fetchedItem) {
            setItem(fetchedItem)
            // Search for related products
            const related = await getItemsByCategory(fetchedItem.category)
            setRelatedItems(
              related
                ?.filter((relatedItem) => relatedItem.id !== fetchedItem.id)
                .slice(0, 4)
            )
          } else {
            // If the item is not found, you can either display an error message or redirect
            setItem(undefined) // This would handle the not found status
          }
        } catch (error) {
          console.error('Error fetching item details:', error)
          // Here you could handle the error as a fallback
          setItem(undefined)
        }
      }

      fetchDetails()
    }
  }, [itemId, items])

  return (
    <>
      {item ? (
        <Box width="80%" m="80px auto">
          <Box display="flex" flexWrap="wrap" columnGap="40px">
            {/* IMAGES */}
            <Box flex="1 1 40%" mb="40px">
              <img
                alt={`Image of ${item.name}`}
                width="100%"
                height="100%"
                src={
                  item?.image
                    ? `http://localhost:1337${item.image}`
                    : '/placeholder.png'
                }
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <ItemInfo
              item={item}
              quantity={quantity}
              setQuantity={setQuantity}
              addToCartAction={addToCartAction}
            />
          </Box>
          {/* DESCRIPTION */}
          <Box m="20px 0">
            <Tabs value={value} onChange={handleChange}>
              <Tab
                label="DESCRIPTION"
                value="description"
                aria-controls="panel-description"
              />
              <Tab
                label="REVIEWS"
                value="reviews"
                aria-controls="panel-reviews"
              />
            </Tabs>
          </Box>
          <Box display="flex" flexWrap="wrap" gap="15px">
            {value === TAB_ITEM_DETAILS_VALUES.DESCRIPTION && (
              <Typography>{item.longDescription}</Typography>
            )}
            {value === TAB_ITEM_DETAILS_VALUES.REVIEWS && (
              <Typography>Reviews Section</Typography>
            )}
          </Box>
          {/* RELATED ITEMS */}
          <ReleatedItems relatedItems={relatedItems} />
        </Box>
      ) : (
        <Box m="20%" display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}
    </>
  )
}
export default ItemDetails
