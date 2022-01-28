import Carousel from 'react-material-ui-carousel';
import Box from '@mui/material/Box';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ImageCarousel = ({ images }) => {
   return (
      <Box component='div' className='Carousel'>
         <Carousel
            navButtonsProps={{
               // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
               style: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderRadius: 0,
               },
            }}
            PrevIcon={<ArrowBackIosNewIcon />}
            NextIcon={<ArrowForwardIosIcon />}
            indicators={false}
            navButtonsAlwaysVisible
         >
            {images.map(image => {
               return (
                  <img
                     style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
                     src={image.url}
                     alt={''}
                  />
               );
            })}
         </Carousel>
      </Box>
   );
};

export default ImageCarousel;