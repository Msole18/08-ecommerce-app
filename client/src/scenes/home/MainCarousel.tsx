import 'react-responsive-carousel/lib/styles/carousel.min.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Carousel } from 'react-responsive-carousel'
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material'
import { shades } from '../../theme'

// Import all images from assets folder using import.meta.glob
const carouselImages: Record<string, string | { default: string }> = import.meta.glob(
  "../../assets/*.{png,jpg,jpeg,svg}",
  {
    eager: true, // Load the images immediately
  }
);

// Transform the imported files into a usable array of image URLs
const images = Object.values(carouselImages).map((module) =>
  typeof module === 'string' ? module : module.default
);

const MainCarousel = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')
  return (
    <Carousel
      infiniteLoop={true}
      showIndicators={false}
      showStatus={false}
      showThumbs={false}
      renderArrowPrev={(onClickHandler) => (
        <IconButton
          aria-label="Previous slide"
          onClick={onClickHandler}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '0',
            color: 'white',
            padding: '5px',
            zIndex: '10',
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler) => (
        <IconButton
          aria-label="Next slide"
          onClick={onClickHandler}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '0',
            color: 'white',
            padding: '5px',
            zIndex: '10',
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {Object.values(images).map((texture, index) => (
        <Box key={`carousel-image-${index}`}>
          <img
            src={texture}
            alt={`carousel-${index}`}
            style={{
              width: '100%',
              height: '600px',
              objectFit: 'cover',
              backgroundAttachment: 'fixed',
            }}
          />
          <Box
            textAlign="left"
            sx={{
              backgroundColor: 'rgb(0, 0, 0, 0.4)',
              color: 'white',
              padding: '20px',
              borderRadius: '1px',
            }}
            position="absolute"
            top="46%"
            left={isNonMobile ? '10%' : '0'}
            right={isNonMobile ? undefined : '0'}
            margin={isNonMobile ? undefined : '0 auto'}
            maxWidth={isNonMobile ? undefined : '240px'}
          >
            <Typography color={shades.secondary[200]}>-- NEW ITEMS</Typography>
            <Typography variant="h1">Summer Sale</Typography>
            <Typography
              fontWeight="bold"
              color={shades.secondary[300]}
              sx={{ textDecoration: 'underline' }}
            >
              Discover More
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  )
}

export default MainCarousel
