import React, { useEffect, useState } from 'react'
import Userheader from './Userheader'
import { Box, Button, Card, CardActions, CardContent, Container, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const MyBooking = () => {
    const userId = sessionStorage.getItem("userId");
    const [bookedMovies, setBookedMovies] = useState([]);
    const navigate = useNavigate()
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const { bookingId } = useParams();
    console.log("bookingId", bookingId);

    const bookingData = {
        SelectedMovie: '',
        SelectedSeats: []
    };
    
    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        console.log("bookingId:", bookingId); // Log bookingId
        if (userId) {
            axios.get(`http://localhost:3001/api/bookingdetails/${bookingId}`)
            .then((response) => {
                console.log("API response:", response.data); // Log the response data
                setBookedMovies(response.data);
                console.log(bookingData)
                console.log("bookingId:", bookingId); // Log bookingId
                setBookedMovies(response.data);
                console.log(bookingData);
            })
                .catch((error) => {
                    console.error("Error fetching booking details:", error);
                });
        } else {
            console.log("User ID is missing or invalid.");
        }
    }, [bookingId]);



    return (

        <div>
            <h1>Your Booked Movies</h1>
            <ul>
                {Array.isArray(bookedMovies) && bookedMovies.length > 0 ? (
                    bookedMovies.map((booking, index) => (
                        <li key={index}>
                            <h2>Movie: {booking.movieName}</h2>
                            <p>User: {booking.userId}</p>
                            {/* Uncomment this line to display the seat number */}
                            {/* <p>Seat Number: {booking.seat_number}</p> */}
                            <p>Email: {booking.email}</p>
                            <p>Movie ID: {booking.movieId}</p>
                        </li>
                    ))
                ) : (
                    <p>No booked movies available.</p>
                )}
            </ul>
        </div>

    )
}

export default MyBooking