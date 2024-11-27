import { Box, Button, IconButton, Typography } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Item from '../../components/Item'
import useFetchItemsData from '../../hooks/useFetchItemsData'
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
  const { fetchItems } = useFetchItemsData()
  const { itemId } = useParams()

  const [value, setValue] = useState<TabDetailsValue>(
    TAB_ITEM_DETAILS_VALUES.DESCRIPTION
  )

  const [quantity, setQuantity] = useState(1)
  const [item, setItem] = useState<ItemType | undefined>(undefined)

  const handleChange = (_: React.SyntheticEvent, value: TabDetailsValue) => {
    setValue(value)
  }

  useEffect(() => {
    // Buscar el ítem en la store
    const foundItem = items.find((item) => item.id === itemId)

    if (foundItem) {
      // Si se encuentra en la store, actualizamos el estado
      console.log('foundItem', foundItem)
      setItem(foundItem)
    }
    // else {
    //   // Si no se encuentra, necesitamos buscarlo (fetchItemById) y también los relacionados
    //   // Aquí solo planificamos la estructura de la lógica
    //   const fetchDetails = async () => {
    //     const newItem = await fetchItemById(itemId) // Obtener el ítem por ID
    //     if (newItem) {
    //       setItem(newItem) // Actualizar el estado con el nuevo ítem
    //       const related = await fetchItemsByCategory(newItem.category) // Buscar relacionados
    //       setRelatedItems(related.filter((item) => item.id !== newItem.id)) // Excluir el actual
    //     }
    //   }

    //   fetchDetails() // Llamamos a la función definida dentro del useEffect
    // }
  }, [itemId, items])

  const relatedItems = items.slice(0, 4)

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
                {relatedItems.map((item, i) => (
                  <Item key={`${item.name}-${i}`} item={item} />
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
