import React, { useEffect, useState } from 'react'
import Userheader from './Userheader'
import { Box, Button, Card, CardActions, CardContent, Container, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MyBooking = () => {
     const userId = sessionStorage.getItem("userId");
     const [bookedMovies, setBookedMovies] = useState([]);
     const navigate=useNavigate()
     const [selectedMovie, setSelectedMovie] = useState('');
     const [selectedSeats, setSelectedSeats] = useState([]);

     const bookingData = {
                movieId: selectedMovie,
                seatIds: selectedSeats,
              
            };
    // useEffect(() => {

    //     axios.post("http://localhost:3001/api/getbookedtkts/" + userId)
    //         .then((response) => {
    //             console.log(response.data)
    //             if(response.data==""){
    //                   alert("Please Book Ticket");
    //                   navigate("/MyBooking")
    //             }
    //             else{
    //                 setBookedMovies(response.data);
    //             }
               

    //         })
    //         .catch((error => console.log("error")))
    // }, [])
    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        console.log("User ID from sessionStorage:", userId);
        if (userId) {
            // Make the API request with the valid userId
            axios.post('http://localhost:3001/api/booktickets', bookingData)
                .then((response) => {
                    // Handle the response data
                        console.log(response.data)

                })
                .catch((error) => {
                    // Handle errors
                });
        } else {
            // Handle the case where userId is missing or invalid
            console.log("User ID is missing or invalid.");
        }
    }, []);
    

    //  cancelling tickets
    const CancelHandler = (e) => {
         
         const tktId= e._id;
         axios.post("http://localhost:3001/api/cancelticket/" + tktId)
            .then((response) => {
                console.log(response.data.message)
                if(response.data.message==="Ticket Cancelled"){
                    alert(response.data.message);
                    window.location.reload(false);
                }
                else{
                    console.log("cannot cancel")
                }

            })
            .catch((error => console.log("error")))
    }
  return (
    <div>
         <Userheader />
            <Box>
                <Container >
                   
                        <Typography variant='h4' align='center' marginBottom={1}> Tickets</Typography>
                       
                        {bookedMovies.map((value, index) => {
                            return <Box>
                                  <Grid xs={12} sm={12} xl={12}  >
                                <Card height={'90%'} width={"100%"} >
                                        <CardContent alignContent={"center"}>
                                        <Typography margin={1}>
                                                User : {value. userId}
                                            </Typography>
                                            <Typography margin={1}>
                                                Movie : {value.movieName}
                                            </Typography>
                                            <Typography margin={1}>
                                            Seat_Number: {value.seat_number}
                                            </Typography>
                                            <Typography margin={1}>
                                            Email: {value.email}
                                            </Typography>:
                                            <Typography margin={1}>
                                           Movie Id: {value.movieId}
                                            </Typography>:
                                            
                                                <Button
                                                    value={value}  
                                                    variant='text'
                                                    onClick={() => CancelHandler(value)}
                                                    sx={{ justifyContent:"center" }} >
                                                    CANCEL
                                                </Button>
                    
                                        </CardContent>


                                </Card>

                                </Grid>
                            </Box>
                           
                        })}
                   
                </Container>
            </Box>
    </div>
  )
}

export default MyBooking