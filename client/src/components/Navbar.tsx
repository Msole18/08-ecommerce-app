import {
  MenuOpenOutlined,
  PersonOutline,
  SearchOutlined,
  ShoppingBagOutlined,
} from '@mui/icons-material'
import { useAppSelector } from '../hooks/store'
import { Badge, Box, IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { shades } from '../theme'
import { useCartActions } from '../hooks/useCartActions'


const Navbar = () => {
  const navigate = useNavigate()
  const cart = useAppSelector((state) => state.cart.cart)
  const { setIsCartOpenAction } = useCartActions()

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        color: 'black',
        width: '100%',
        height: '60px',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="80%"
        margin="auto"
      >
        <Box
          onClick={() => {
            navigate('/')
          }}
          sx={{ '&:hover': { cursor: 'pointer' } }}
          color={shades.secondary[500]}
        >
          <Typography variant="h2">ARAZ</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-evenly"
          columnGap="20px"
          sx={{ zIndex: 2 }}
        >
          <IconButton aria-label="search" sx={{ color: 'black' }}>
            <SearchOutlined />
          </IconButton>
          <IconButton aria-label="profile" sx={{ color: 'black' }}>
            <PersonOutline />
          </IconButton>
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              '& .MuiBadge-badge': {
                right: 5,
                top: 5,
                padding: '0 4px',
                height: '14px',
                minWidth: '13px',
              },
            }}
          >
            <IconButton
              aria-label="cart"
              onClick={() => {
                setIsCartOpenAction()
              }}
              sx={{ color: 'black' }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton aria-label="menu" sx={{ color: 'black' }}>
            <MenuOpenOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
