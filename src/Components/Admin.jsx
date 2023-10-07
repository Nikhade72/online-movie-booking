import React from 'react'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Typography } from '@mui/material'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import Card from '@mui/material/Card';
import { useEffect, useState } from 'react'
import AdminNav from './AdminNav';
import { useNavigate } from "react-router-dom"
import Footer from './Footer';

const Admin = () => {
  // const [movieTicketsSoldPerDay, setMovieTicketsSoldPerDay] = useState({});
  // const [totalSeats, setTotalSeats] = useState(0);
  // const [bookedSeats, setBookedSeats] = useState([]);
  // const [movieData, setMovieData] = useState([]);
  // const [movie, setMovie] = useState([]);
  // const [updatedMovieData, setUpdatedMovieData] = useState({
  //   Timing: '',
  //   TicketRates: 0,
  // });
  // const navigate = useNavigate()
  // useEffect(() => {
  //   axios.post("http://localhost:3001/api/viewMovies")
  //     .then((response) => {
  //       if (response.status == 200) {
  //         console.log("success");
  //         setMovie(response.data);
  //       }
  //       else {
  //         console.log("check the network, status is not ok")
  //       }
  //     })
  //     .catch((error => console.log(error)));

  //     axios.get('http://localhost:3001/api/totalSeats')
  //     .then((response) => {
  //       setTotalSeats(response.data.totalSeats);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   axios.get('http://localhost:3001/api/bookedSeats')
  //     .then((response) => {
  //       setBookedSeats(response.data.bookedSeats);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //     axios.get('http://localhost:3001/api/ticketsSoldPerDay')
  //     .then((response) => {
  //       setMovieTicketsSoldPerDay(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [])
  

  

  // //  DELETE MOVIE
  // const deleteHandler = (id) => {
  //   axios.post(`http://localhost:3001/api/deleteMovie/${id}`)
  //     .then((response) => {
  //       if (response.data.message === "movie removed successfully") {
  //         console.log(response.data.message);
  //         alert("deleted successfully");
  //         window.location.reload(false);
  //       } else {
  //         console.log(response.data.message);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // };

  const [movieData, setMovieData] = useState([]);
  const [movie, setMovie] = useState([]);
  const [updatedMovieData, setUpdatedMovieData] = useState({
    Timing: '',
    TicketRates: 0,
  });
  const navigate = useNavigate()
  useEffect(() => {
    axios.post("http://localhost:3001/api/viewMovies")
      .then((response) => {
        if (response.status == 200) {
          console.log("success");
          setMovie(response.data);
        }
        else {
          console.log("check the network, status is not ok")
        }
      })
      .catch((error => console.log(error)));
  }, [])

  //  DELETE MOVIE
  const deleteHandler = (id) => {
    axios.post(`http://localhost:3001/api/deleteMovie/${id}`)
      .then((response) => {
        if (response.data.message === "movie removed successfully") {
          console.log(response.data.message);
          alert("deleted successfully");
          window.location.reload(false);
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => console.log(error));
  };


  return (
   
    
    <div className="add" style={{ backgroundImage: 'url("https://tse1.mm.bing.net/th?id=OIP.O_-cljX_Uaw419v2BDAtWgHaEK&pid=Api&P=0&h=180")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: 'auto' }}>
    <AdminNav />
    <Box width={'100%'} height={'100%'} margin={'auto'} marginTop={2}>
      <Box padding={5} margin={'auto'}>
        <Typography variant='h4' textAlign={'center'} color={'white'}>Latest Release</Typography>
      </Box>
      <Box display='flex' width='100%' justifyContent={'center'} flexWrap='wrap'>
        {movie.map((value, index) => (
          <Card key={index} sx={{ maxWidth: 500, height: 700, borderRadius: 3, padding: "2%", margin: "2%", ":hover": { boxShadow: "10px 10px 20px #cc" } }}>
            <img height={"50%"} width={"100%"} src={value.Image} alt="movie poster" margin="auto" flex-grow={1} flex-basis={0} />
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
              <Typography gutterBottom variant="h6" component="div">
                averageRating: {value.averageRating}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                ticketsSoldPerDay: {value.ticketsSoldPerDay}
              </Typography>
            </CardContent>

            {/* <Button
                LinkComponent={Link}
                to={`/AddMovies`}
                variant='text'
                sx={{
                  justifyContent: 'center'
                }}
              >
                Add Movies
              </Button> */}
            <CardActionArea>

              <div>
                <button variant='contained' onClick={() => { deleteHandler(value._id) }}>
                  Delete Movie
                </button>
              </div>
              {/* <div>
                <button variant='contained' onClick={()=>{updateHandler(value._id)}}>
                  Update Movie
                </button>
              </div> */}
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>

  </div>
  )
}

export default Admin