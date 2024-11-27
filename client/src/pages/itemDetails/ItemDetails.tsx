import { Box, Button, IconButton, Typography } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Item from '../../components/Item'
import useFetchItems from '../../hooks/useFetchItems'
import { useAppSelector } from '../../hooks/store'
import { useParams } from 'react-router-dom'
import { shades } from '../../theme'
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
  const [relatedItems, setRelatedItems] =
    useState<ItemType[] | undefined>(undefined) 

  const handleChange = (_: React.SyntheticEvent, value: TabDetailsValue) => {
    setValue(value)
  }

  // useEffect(() => {
  //   // Verificar si el item ya está en la store
  //   const foundItem = items.find((item) => item.id === Number(itemId))
    
  //   if (foundItem) {
  //   //   // Si el item está en la store, lo asignamos directamente del estado
  //     setItem(foundItem)
  //     setRelatedItems(
  //       items.filter((item) => item.id !== foundItem.id).slice(0, 4)
  //     )
  //   } 
   //   // else {
  //   //   // Si no está en la store, buscar el ítem por ID y luego los productos relacionados con ese ID
  //   //   const fetchDetails = async () => {
  //   //     try {
  //   //       const fetchedItem = await getItemsById(itemId.toString())

  //   //       if (fetchedItem) {
  //   //         setItem(fetchedItem)
  //   //         // Buscar productos relacionados
  //   //         const related = await getItemsByCategory(fetchedItem.category)
  //   //         setRelatedItems(
  //   //           related
  //   //             ?.filter((relatedItem) => relatedItem.id !== fetchedItem.id)
  //   //             .slice(0, 4)
  //   //         )
  //   //       } else {
  //   //         // Si no se encuentra el item, puedes mostrar un mensaje de error o redirigir
  //   //         setItem(undefined) // Esto manejaría el estado de no encontrado
  //   //       }
  //   //     } catch (error) {
  //   //       console.error('Error fetching item details:', error)
  //   //       // Aquí podrías manejar el error como un fallback
  //   //       setItem(undefined)
  //   //     }
  //   //   }

  //   //   fetchDetails()
  //   // }
  // }, [itemId, items, getItemsByCategory, getItemsById])

useEffect(() => {
  // Verificar si el item ya está en la store
  const foundItem = items.find((item) => item.id === Number(itemId))

  if (foundItem) {
    //   // Si el item está en la store, lo asignamos directamente del estado
    setItem(foundItem)
    setRelatedItems(
      items.filter((item) => item.id !== foundItem.id).slice(0, 4)
    )
  }

  fetch(`http://localhost:2000/api/items/${itemId}?populate=image`, {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      if (data && data.data) {
        setItem(data.data) // Ajusta según la estructura de respuesta
      } else {
        console.error('Item not found in response:', data)
      }
    })
    .catch((error) => console.error('Fetch error:', error.message))


}, [itemId])

  return (
    <>
      {item ? (
        <Box width="80%" m="80px auto">
          <Box display="flex" flexWrap="wrap" columnGap="40px">
            {/* IMAGES */}
            <Box flex="1 1 40%" mb="40px">
              <img
                alt={item.name}
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

            <Box flex="1 1 50%" mb="40px">
              {/* ACTIONS */}
              <Box display="flex" justifyContent="space-between">
                <Box>Home/Item</Box>
                <Box>Prev Next</Box>
              </Box>
              <Box m="65px 0 25px 0">
                <Typography variant="h3">{item.name}</Typography>
                <Typography>${item.price}</Typography>
                <Typography sx={{ mt: '20px' }}>
                  {item.longDescription}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" minHeight="50px">
                <Box
                  display="flex"
                  alignItems="center"
                  border={`1.5px solid ${shades.neutral[300]}`}
                  mr="20px"
                  p="2px 5px"
                >
                  <IconButton
                    onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ p: '0 5px' }}>{quantity}</Typography>
                  <IconButton onClick={() => setQuantity(quantity + 1)}>
                    <AddIcon />
                  </IconButton>
                </Box>
                <Button
                  sx={{
                    backgroundColor: '#222222',
                    color: 'white',
                    borderRadius: 0,
                    minWidth: '150px',
                    padding: '10px 40px',
                  }}
                  onClick={() => {
                    addToCartAction({ ...item, quantity })
                  }}
                >
                  ADD TO CART
                </Button>
              </Box>
              <Box>
                <Box m="20px 0 5px 0" display="flex">
                  <FavoriteBorderOutlinedIcon />
                  <Typography sx={{ ml: '5px' }}>ADD TO WISHLIST</Typography>
                </Box>
                <Typography>CATEGORIES: {item.category}</Typography>
              </Box>
            </Box>
          </Box>

          {/* INFORMATION */}
          <Box m="20px 0">
            <Tabs value={value} onChange={handleChange}>
              <Tab label="DESCRIPTION" value="description" />
              <Tab label="REVIEWS" value="reviews" />
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
          <Box mt="50px" width="100%">
            <Typography variant="h3" fontWeight="bold">
              Related Products
            </Typography>
            <Box
              mt="20px"
              display="flex"
              flexWrap="wrap"
              columnGap="1.33%"
              justifyContent="space-between"
            >
              {relatedItems?.map((item, index) => (
                <Item key={`${item.name}-${index}`} item={item} />
              ))}
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography>Loading item details...</Typography>
      )}
    </>
  )
}
export default ItemDetails
