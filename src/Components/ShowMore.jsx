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
import Userheader from './Userheader';


const ShowMore = () => {
  const [movie, setMovie] = useState([]);
    const [movieData, setMovieData] = useState([])
    const movieId = sessionStorage.getItem("movieId")
    const detailshandler = (e) => { console.log(e._id) }

    useEffect(() => {
      axios.post("http://localhost:3001/api/viewMovies")
          .then((response) => {
              if (response.status === 200) {
                  console.log("success");
                  setMovie(response.data);
                  setMovieData(response.data); // Update this line
              } else {
                  console.log("Error. Please try again later.");
              }
          })
          .catch((error) => console.log(error));
  }, []);


  return (
    <div>
         <Header />
    <Box width={'100%'} height={'100%'} margin={'auto'} marginTop={2}>
      <Box padding={5} margin={'auto'}>
        <Typography variant='h4' textAlign={'center'}>
          Latest Release
        </Typography>
      </Box>
      <Box
        display='flex'
        width='100%'
        justifyContent={'center'}
        flexWrap='wrap'
      >
        {movie.slice(0, 6).map((value, index) => (
          <Card
            key={index}
            h-100
            sx={{
              maxWidth: 550,
              height: 1000,
              borderRadius: 3,
              padding: '2%',
              margin: '2%',
              ':hover': { boxShadow: '10px 10px 20px #cc' },
            }}
          >
            <img
              height={'50%'}
              width={'100%'}
              src={value.Image}
              alt='movie poster'
              margin='auto'
              flex-grow={1}
              flex-basis={0}
              onClick={() => {
                // Handle click on the image here
                console.log('Clicked on image:', value._id);
                // You can navigate to the movie details page here if needed
              }}
              style={{ cursor: 'pointer' }}
            />
            <CardContent>
              <Typography gutterBottom variant='h6' component='div'>
                {value.MovieName}
              </Typography>
              <Typography gutterBottom variant='h6' component='div'>
              Description: {value.Description}
              </Typography>
              <Typography gutterBottom variant='h6' component='div'>
              Cast: {value.Cast}
              </Typography>
              <Typography gutterBottom variant='h6' component='div'>
              Reviews: {value. Reviews}
              </Typography>
            </CardContent>
            <CardActionArea>
                <Button
                  LinkComponent={Link}
                  to={`/booking`}
                  variant='text'
                  sx={{
                    justifyContent: 'center'
                  }}
                >
                  Book Movie 
                </Button>
              </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
    <a href='/'>home</a>
    </div>
  )
}

export default ShowMore