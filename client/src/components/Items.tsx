import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import { shades } from "../theme";
import { useNavigate } from 'react-router-dom'
import { Item } from "../types";
import { useState } from 'react'
import { useCartActions } from "../hooks/useCartActions";


interface Props {
  item: Item,
  width: number | string
}

const Items = ({ item, width }:Props) => {
  const { palette: { neutral } } = useTheme()
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { addToCartAction } = useCartActions()

  return (
    <Box width={width}>
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
          {item.category
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>{item.name}</Typography>
        <Typography fontWeight="bold">${item.price}</Typography>
      </Box>
    </Box>
  )
}

export default Items
