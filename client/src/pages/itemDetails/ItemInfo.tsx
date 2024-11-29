import { Box, Button, IconButton, Typography } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { shades } from '../../theme'
import { Item } from '../../types'
import { ITEM_CATEGORY } from '../../constants'

interface ItemInfoProps {
  item: Item
  quantity: number
  setQuantity: React.Dispatch<React.SetStateAction<number>>
  addToCartAction: (item: Item & { quantity: number }) => void
} 

const ItemInfo = ({
  item,
  quantity,
  setQuantity,
  addToCartAction,
}: ItemInfoProps) => {
  return (
    <Box flex="1 1 50%" mb="40px">
      <Box m="25px 0 25px 0">
        <Typography variant="h2">{item.name}</Typography>
        <Typography variant="h3">${item.price}</Typography>
        <Typography sx={{ mt: '20px' }}>{item.longDescription}</Typography>
      </Box>
      <Box display="flex" alignItems="center" minHeight="50px">
        <Box
          display="flex"
          alignItems="center"
          border={`1.5px solid ${shades.neutral[300]}`}
          mr="20px"
          p="2px 5px"
        >
          <IconButton onClick={() => setQuantity(Math.max(quantity - 1, 1))}>
            <RemoveIcon />
          </IconButton>
          <Typography sx={{ p: '0 5px' }}>{quantity}</Typography>
          <IconButton onClick={() => setQuantity(quantity + 1)}>
            <AddIcon />
          </IconButton>
        </Box>
        <Button
          aria-label="Add to Cart"
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
        <Typography>CATEGORIES: {ITEM_CATEGORY[item.category]}</Typography>
      </Box>
    </Box>
  )
}

export default ItemInfo