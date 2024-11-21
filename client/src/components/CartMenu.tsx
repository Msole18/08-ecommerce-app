import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, Button, Divider, IconButton, Typography } from "@mui/material"
import { useAppSelector } from "../hooks/store"
import { useCartActions } from "../hooks/useCartActions";
import { shades } from '../theme';
import { useNavigate } from 'react-router-dom';


const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CartMenu = () => {
  const navigate = useNavigate()
  const cart = useAppSelector(state => state.cart.cart)
  const setIsCartOpen = useAppSelector(state => state.cart.isCartOpen)
  const { setIsCartOpenAction, addToCartAction, removeFromCartAction } =
    useCartActions()

  const totalPrice = cart.reduce((total, item) => {
    return total + item.quantity * item.price
  }, 0)
  
  return (
    <Box
      display={setIsCartOpen ? 'block' : 'none'}
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
    >
      <Box // modal
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        sx={{
          backgroundColor: 'white',
        }}
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={() => setIsCartOpenAction()}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* Cart List */}
          <Box>
            {cart.map((item) => (
              <Box key={`${item.name}-${item.id}`}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      alt={item?.name}
                      width="123px"
                      height="164px"
                      src={`http://localhost:1337${item.image}`}
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">{item.name}</Typography>
                      <IconButton
                        onClick={() => removeFromCartAction(item)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>{item.shortDescription}</Typography>
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() => removeFromCartAction(item)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          onClick={() => addToCartAction(item)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>

                      {/* Price */}
                      <Typography fontWeight="bold">${item.price}</Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* ACTIONS */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">${totalPrice}</Typography>
            </FlexBox>
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: 'white',
                borderRadius: 0,
                minWidth: '100%',
                padding: '20px 40px',
                m: '20px 0',
              }}
              onClick={() => {
                navigate('/checkout')
                setIsCartOpenAction()
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CartMenu