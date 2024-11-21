import { Box, Typography, useTheme } from '@mui/material'
import { shades } from '../theme'

function Footer() {
  const {
    palette: { neutral },
  } = useTheme()
  return (
    <Box
      marginTop="70px"
      padding="40px 0"
      sx={{ backgroundColor: neutral.light }}
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            ARAZ
          </Typography>
          <p>
            Discover the latest fashion trends with our exclusive collection of
            clothing for every occasion. Our mission is to provide you with the
            best quality and the most competitive prices so you can refresh your
            wardrobe without worries. Explore our online store and find your
            perfect look today!
          </p>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li>
              <Typography mb="30px">Careers</Typography>
            </li>
            <li>
              <Typography mb="30px">Our Stores</Typography>
            </li>
            <li>
              <Typography mb="30px">Terms & Conditions</Typography>
            </li>
            <li>
              <Typography mb="30px">Privacy Policy</Typography>
            </li>
          </ul>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li>
              <Typography mb="30px">Help Center</Typography>
            </li>
            <li>
              <Typography mb="30px">Track Your Order</Typography>
            </li>
            <li>
              <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
            </li>
            <li>
              <Typography mb="30px">Returns & Refunds</Typography>
            </li>
          </ul>
        </Box>

        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: 'break-word' }}>
            Github:&nbsp;
            <a
              href="https://github.com/Msole18"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              Msole18
            </a>
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: 'break-word' }}>
            LinkedIn:&nbsp;
            <a
              href="https://www.linkedin.com/in/miguelsole/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              miguelsole
            </a>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
