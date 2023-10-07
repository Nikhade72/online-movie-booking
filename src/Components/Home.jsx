import React from 'react'
import Header from './Header'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Typography } from '@mui/material'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import Card from '@mui/material/Card';
import { useEffect, useState } from 'react'
import Footer from './Footer';

const Home = () => {

  const [movie, setMovie] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const movieId = sessionStorage.getItem('movieId');

  useEffect(() => {
    axios.post('http://localhost:3001/api/viewMovies')
      .then((response) => {
        if (response.status === 200) {
          console.log('success');
          setMovie(response.data);
          setMovieData(response.data); // Update this line
        } else {
          console.log('Error. Please try again later.');
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const detailshandler = (value) => {
    console.log(value._id);
  };


  return (
    <div>

      <div className="add" style={{ backgroundImage: 'url("https://tse3.mm.bing.net/th?id=OIP.dkHVrWqztdsTvU9T-p6YDgHaEo&pid=Api&P=0&h=180")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: 'auto' }}>
        <Header />
        <Box width={'70%'} height={'100%'} margin={'auto'} marginTop={2}>
          <Box margin={'auto'} width={'100%'} height={'50vh'} padding={2}>
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.uxbm9kU5WrFiAm5PoHN-9QHaD4&pid=Api&P=0&h=180"
              alt="ved"
              width={'100%'}
              height={'100%'}
            />
          </Box>
          <Box padding={5} margin={'auto'}>
            <Typography variant='h4' textAlign={'center'} color={'white'}>
              Latest Release
            </Typography>
          </Box>
          <Box display='flex' width='100%' justifyContent={'center'} flexWrap='wrap'>
            {movie.slice(0, 4).map((value, index) => {
              return (
                <Card key={index} h-100 sx={{ maxWidth: 550, height: 550, borderRadius: 3, padding: '2%', margin: '2%', ':hover': { boxShadow: '10px 10px 20px #cc' } }}>
                  <img height={'50%'} width={'100%'} src={value.Image} alt="movie poster" margin="auto" flex-grow={1} flex-basis={0} />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {value.MovieName}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      Category: {value.Category}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      Languages: {value.Languages}
                    </Typography>
                  </CardContent>
                  <CardActionArea>
                    <CardActionArea>
                      <Button
                        LinkComponent={Link}
                        to={`/Login`}
                        variant='text'
                        onClick={() => detailshandler(value)}
                        sx={{
                          justifyContent: 'center',
                        }}
                      >
                        See More
                      </Button>
                    </CardActionArea>
                  </CardActionArea>
                </Card>
              );
            })}
          </Box>
        </Box>
      </div>
<Footer/>
    </div>


  )
}

export default Home