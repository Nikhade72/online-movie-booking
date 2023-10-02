import React, { useEffect, useState } from 'react'
import Userheader from './Userheader'
import { Box, Button, Card, CardActions, CardContent, Container, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate, useParams} from 'react-router-dom'

export const Testing = () => {
    const userId = sessionStorage.getItem("userId");
     const [bookedMovies, setBookedMovies] = useState([]);
     const navigate=useNavigate()
     const [selectedMovie, setSelectedMovie] = useState('');
     const [selectedSeats, setSelectedSeats] = useState([]);
     const {bookingId} = useParams();
     console.log("bookingId",bookingId);

     const bookingData = {
                movieId: selectedMovie,
                seatIds: selectedSeats,
            };
            useEffect(() => {
                const userId = sessionStorage.getItem("userId");
                console.log("User ID from sessionStorage:", userId);
                axios.get(`http://localhost:3001/api/getbookedtkts/${userId}`)
                .then((response)=>{
                    console.log(response.data)
                })
            }, []);
        
  return (
    <div>Testing</div>
  )
}
