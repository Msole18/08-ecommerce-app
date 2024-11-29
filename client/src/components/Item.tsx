import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import { shades } from "../theme";
import { useNavigate } from 'react-router-dom'
import { Item as ItemType } from '../types'
import { useState } from 'react'
import { useCartActions } from "../hooks/useCartActions";
import { ITEM_CATEGORY } from "../constants";


interface Props {
  item: ItemType
  // width: number | string
}

// const Item = ({ item, width }:Props) => {
const Item = ({ item }:Props) => {
  const navigate = useNavigate()
  const { palette: { neutral } } = useTheme()
  const { addToCartAction } = useCartActions()

  const [isHovered, setIsHovered] = useState(false)
  const [quantity, setQuantity] = useState(1)

  return (
    // <Box width={width}>
    <Box>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={item.name}
          width="300px"
          height="400px"
          src={`http://localhost:1337${item.image}`}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: 'pointer' }}
        />
        <Box
          display={isHovered ? 'block' : 'none'}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              sx={{
                backgroundColor: shades.neutral[100],
                borderRadius: '3px',
              }}
            >
              <IconButton
                aria-label="removeIten"
                onClick={() => setQuantity(Math.max(quantity - 1, 1))}
              >
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{quantity}</Typography>
              <IconButton
                aria-label="addItem"
                onClick={() => setQuantity(quantity + 1)}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              onClick={() => {
                addToCartAction({ ...item, quantity })
              }}
              sx={{ backgroundColor: shades.primary[300], color: 'white' }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {ITEM_CATEGORY[item.category as keyof typeof ITEM_CATEGORY]}
        </Typography>
        <Typography>{item.name}</Typography>
        <Typography fontWeight="bold">${item.price}</Typography>
      </Box>
    </Box>
  )
}

export default Item
