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
const Admin = () => {
  // const [movie, setMovie] = useState([]);
  // const [movieData, setMovieData] = useState([])
  // const movieId = sessionStorage.getItem("movieId")
  // const detailshandler = (e) => { console.log(e._id) }
  // const [movies, setMovies] = useState([]);
  // const [selectedMovieId, setSelectedMovieId] = useState(null);
  
  // useEffect(() => {
  //   axios.post("http://localhost:3001/api/viewMovies")
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log("success");
  //         setMovies(response.data);
  //       } else {
  //         console.log("Error. Please try again later.");
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  
  // // const handleDelete = () => {
  // //   console.log('Delete button clicked'); // Check if this log appears
  // //   // Make a DELETE request to delete the movie by ID
  // //   axios
  // //     .delete(`http://localhost:3001/api/deleteMovie/${movieData._id}`)
  // //     .then((response) => {
  // //       console.log('Response:', response); // Log the response from the server
  // //       if (response.status === 200) {
  // //         console.log('Movie removed successfully');
  // //         // Optionally, you can clear the movie data after deletion
  // //         setMovieData({
  // //           MovieName: '',
  // //           Image: '',
  // //           Category: 'UA',
  // //           Languages: [],
  // //           Cast: '',
  // //           Description: '',
  // //           TicketRates: 0,
  // //           NoOfSeats: 0,
  // //         });
  // //       } else {
  // //         console.log('Error deleting movie. Please try again.');
  // //       }
  // //     })
  // //     .catch((error) => {
  // //       console.error('Error deleting movie:', error);
  // //     });
  // // };
  // const deleteHandler=(e)=>{
  //   let id=e
  //   axios.post("http://localhost:3001/api/deleteMovie/"+ id)
  //   .then((response)=>{
  //     if(response.data.message==="movie removed successfully"){
  //       console.log(response.data.message);
  //       alert("deletd succesfully")
  //       window.location.reload(false);
  //     }
  //     else{
  //       console.log(response.data.message)
  //     }
  //   })
  //   .catch((error=>console.log(error)))

  // }
  const[movie,setMovie]=useState([]);
  const navigate=useNavigate()
  useEffect(()=>{
    axios.post("http://localhost:3001/api/viewMovies")
    .then((response)=>{
        if(response.status==200){
         console.log("success");
         setMovie(response.data);
        }
       else{
         console.log("check the network, status is not ok")
        } 
      })
    .catch((error=>console.log(error)));
   },[])

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
 
  // const updateHandler = (id) => {
  //   axios.post(`http://localhost:3001/api/updateMovie/${id}`)
  //     .then((response) => {
  //       if (response.data.message === "movie update successfully") {
  //         console.log(response.data.message);
  //         alert("upadted successfully");
  //         window.location.reload(false);
  //       } else {
  //         console.log(response.data.message);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // };
  const updateHandler  = (id, updatedData) => {
    // Construct the URL for the API endpoint where you update movie details
    const apiUrl = `http://localhost:3001/api/updateMovie/${id}`;
  
    // Make a POST request to the server with the updated data
    axios
      .post(apiUrl, updatedData)
      .then((response) => {
        if (response.data.message === "movie update successfully") {
          console.log(response.data.message);
          alert("Updated successfully");
          // Optionally, you can redirect or update your UI here
        } else {
          console.log(response.data.message);
          // Handle other response messages or errors as needed
        }
      })
      .catch((error) => {
        console.error("Error updating movie:", error);
        // Handle the error, e.g., show an error message to the user
      });
  };
  
  // Example usage:
  const movieIdToUpdate = 123; // Replace with the actual movie ID
  const updatedMovieData = {
    movieTime: "New movieTime",
    TicketRates: "New TicketRates",
    // Add more fields you want to update
  };
  
  updateHandler(movieIdToUpdate, updatedMovieData);
  
 
  
  return (
//     <div>
//       <AdminNav />
//       <Box width={'100%'} height={'100%'} margin={'auto'} marginTop={2}>
//         <Box padding={5} margin={'auto'}>
//           <Typography variant='h4' textAlign={'center'}>Latest Release</Typography>
//         </Box>
//         <Box display='flex' width='100%' justifyContent={'center'} flexWrap='wrap'>
//           {movie.map((value, index) => (
//             <Card key={index} sx={{ maxWidth: 500, height: 700, borderRadius: 3, padding: "2%", margin: "2%", ":hover": { boxShadow: "10px 10px 20px #cc" } }}>
//               <img height={"50%"} width={"100%"} src={value.Image} alt="movie poster" margin="auto" flex-grow={1} flex-basis={0} />
//               <CardContent>
//                 <Typography gutterBottom variant="h6" component="div">
//                   {value.MovieName}
//                 </Typography>
//                 <Typography gutterBottom variant="h6" component="div">
//                   Category: {value.Category}
//                 </Typography>
//                 <Typography gutterBottom variant="h6" component="div">
//                   Languages: {value.Languages}
//                 </Typography>
//                 <Typography gutterBottom variant="h6" component="div">
//                   averageRating: {value.averageRating}
//                 </Typography>
//                 <Typography gutterBottom variant="h6" component="div">
//                   ticketsSoldPerDay: {value.ticketsSoldPerDay}
//                 </Typography>

//               </CardContent>
//               <CardActionArea>
//                 <Button
//                   LinkComponent={Link}
//                   to={`/AddMovies`}
//                   variant='text'
//                   sx={{
//                     justifyContent: 'center'
//                   }}
//                 >
//                   Add Movies
//                 </Button>
//                 {/* <Button
//                   LinkComponent={Link}
//                   to={`/Admin`}
//                   variant='text'
//                   sx={{
//                     justifyContent: 'center'
//                   }}
//                 >
//                   Delete Movies
//                 </Button> */}
//                 {movieData._id && (
//                 <div>
// <h2>Delete Movie</h2>
//           <button type="button" onClick={handleDelete}>
//             Delete Movie
//           </button>
//                 </div>
//                       )}

               
//               </CardActionArea>
//             </Card>
//           ))}
//         </Box>
//       </Box>
//       <a href='/'>Home</a>
//     </div>
<div>
  <AdminNav/>
<Box width={'100%'} height={'100%'} margin={'auto'} marginTop={2}>
        <Box padding={5} margin={'auto'}>
          <Typography variant='h4' textAlign={'center'}>Latest Release</Typography>
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
              <CardActionArea>
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
                <div>
                  <button variant='contained' onClick={()=>{deleteHandler(value._id)}}>
                    Delete Movie
                  </button>
                </div>
                <div>
                  <button variant='contained' onClick={()=>{updateHandler(value._id)}}>
                    Update Movie
                  </button>
                </div>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
      
</div>
  )
}

export default Admin