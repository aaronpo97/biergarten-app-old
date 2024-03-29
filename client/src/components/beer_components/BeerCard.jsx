import { useContext } from 'react';

import { Card, CardContent, CardMedia, Typography, Link, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Stack } from '@mui/material';

import LikeButton from '../utilities/LikeButton';
import { AuthContext } from '../../util/AuthContext';

const BeerCard = ({ beer, showLike = true }) => {
  const navigate = useNavigate();
  const [currentUser] = useContext(AuthContext);

  return (
    <Stack spacing={1}>
      <Card elevation={3} sx={{ marginTop: '1em' }}>
        <CardMedia
          component='img'
          height={400}
          onClick={() => navigate(`/beers/${beer._id}`)}
          image={beer.images?.length ? beer.images[0].url : ''}
        />
        <CardContent>
          <Typography variant={'h3'}>
            <Link underline='hover' onClick={() => navigate(`/beers/${beer._id}`)}>
              {beer.name}
            </Link>
          </Typography>

          {beer.brewery.name ? (
            <Typography variant='h4' gutterBottom>
              <Link underline='hover' onClick={() => navigate(`/breweries/${beer.brewery._id}`)}>
                {beer.brewery.name}
              </Link>
            </Typography>
          ) : null}
          <Typography variant='body1' sx={{ mt: '1em', fontSize: '11pt' }} color='text.secondary'>
            {beer.description}
          </Typography>
          <Typography variant='body1' sx={{ mt: '1em' }} color='text.secondary'>
            {beer.abv}% ABV{beer.ibu ? `, ${beer.ibu} IBU` : null}
          </Typography>

          <Grid container>
            <Grid item xs={8} md={8}>
              <Typography sx={{ mt: '1em' }} variant='h4'>
                <Link underline='hover' onClick={() => navigate(`/beers/search?type=${beer.type}`)}>
                  {beer.type}
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={4} md={4}>
              {showLike && currentUser._id && (
                <Box sx={{ mt: '1em' }}>
                  <LikeButton beer={beer} />
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default BeerCard;
