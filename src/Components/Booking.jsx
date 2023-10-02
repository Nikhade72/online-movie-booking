import React from 'react'
import Userheader from './Userheader'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Typography, Button, TextField, Select, MenuItem, InputLabel, FormControl, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';


const Booking = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [movieData, setMovieData] = useState([]);
    const [availableMovies, setAvailableMovies] = useState([]);
    const [availableSeats, setAvailableSeats] = useState([]);
    const [enteredSeat, setEnteredSeat] = useState('');
    const [availabilityStatus, setAvailabilityStatus] = useState('Available');
    const userId = sessionStorage.getItem("userId");
    const navigate = useNavigate();



    // Function to initialize session storage with user data
    const init = (onsuccessresponse) => {
        if (sessionStorage.getItem('userdata') === null) {
            sessionStorage.setItem('userdata', JSON.stringify(onsuccessresponse));
        }
    };

    // Function to retrieve and log user data from session storage
    const getdata = () => {
        if (sessionStorage.getItem('userdata') !== null) {
            const user = JSON.parse(sessionStorage.getItem('userdata'));
            console.log(user);
        }
    };
    useEffect(() => {
        // Fetch available movies and movie data when the component mounts
        axios.post('http://localhost:3001/api/availableMovies')
            .then((response) => {
                setAvailableMovies(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        axios.post('http://localhost:3001/api/viewMovies')
            .then((response) => {
                if (response.status === 200) {
                    setMovieData(response.data);
                } else {
                    console.log('API request failed');
                }
            })
            .catch((error) => {
                console.error('Error occurred while fetching data:', error);
            });

    }, []);

    useEffect(() => {
        // Calculate availability status whenever selectedSeats change
        const calculatedStatus = calculateAvailabilityStatus(selectedSeats.length);
        setAvailabilityStatus(calculatedStatus);
    }, [selectedSeats]);

    const handleSeatSelection = (seat) => {
        // Check if the selected seat is already in the array
        if (selectedSeats.includes(seat)) {
            console.log('Seat ' + seat + ' is already selected. Please choose another seat.');
        } else {
            // Check if the maximum seat limit (50) has been reached
            if (selectedSeats.length < 50) {
                // Select the seat by adding it to the array
                setSelectedSeats([...selectedSeats, seat]);
            } else {
                // Show a message or handle the case where the limit is reached
                console.log('Maximum seat limit reached (50)');
            }
        }
    };

    const calculateAvailabilityStatus = (selectedSeatsCount) => {
        const totalAvailableSeats = availableSeats.length;
        const remainingSeats = totalAvailableSeats - selectedSeatsCount;

        if (remainingSeats === 0) {
            return 'Housefull';
        } else if (remainingSeats <= 10) {
            return 'Fast Filling';
        } else {
            return 'Available';
        }
    };

    const handleBookNow = () => {
        // Create a request object with selectedMovie, selectedSeats, name, email, and userId
        const bookingData = {
            movieId: selectedMovie,
            seatIds: selectedSeats,
            movieName: selectedMovie,
            email: email,
            userId: userId,
            date: {
                type: Date,
                default: new Date(), // Set the default value to the current date
            },
            seat_number: selectedSeats.join(','),
        };

        // Send the bookingData to your backend API using Axios or another HTTP library
        axios.post('http://localhost:3001/api/booktickets', bookingData)
            .then((response) => {
                if (response.status === 200) {
                    console.log('Booking successful');
                    console.log(response.data)
                    const bookingId = response.data._id;
                    console.log(bookingId);
                    const bookedSeatNumber = selectedSeats.join(', '); // Get the selected seats as a comma-separated string
                    window.alert(`Booking successful! Your seat number is: ${bookedSeatNumber}`);
                    navigate(`/mybooking/${bookingId}`)
                } else {
                    console.error('Booking failed');
                    window.alert('Booking failed. Please try again later.');
                }
            })
            .catch((error) => {
                console.error('Error booking seats:', error);
                window.alert('Already Reserved, Please select another seat.');
            });
    };

    const handleSeatTyping = (e) => {
        setEnteredSeat(e.target.value);
    };

    const addTypedSeat = () => {
        if (enteredSeat.trim() !== '') {
            setSelectedSeats([...selectedSeats, enteredSeat]);
            setEnteredSeat('');
        }
    };

    const handleSeatCancellation = (seat) => {
        setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
    };

    const handleMovieSelection = (e) => {
        const selectedMovieId = e.target.value;
        setSelectedMovie(selectedMovieId);

        // Fetch movie details based on the selected movie ID
        axios.post(`http://localhost:3001/api/viewMovies/${selectedMovieId}`)
            .then((response) => {
                setAvailableSeats(response.data.availableSeats);
                const calculatedStatus = calculateAvailabilityStatus(selectedSeats.length);
                setAvailabilityStatus(calculatedStatus);
            })
            .catch((error) => {
                console.error('Error fetching movie details:', error);
            });
    };

    const handleAddSeat = () => {
        if (enteredSeat.trim() !== '') {
            setSelectedSeats([...selectedSeats, enteredSeat]);
            setEnteredSeat('');
        }
    };
    const handleCancel = (seat) => {
        // Clear the selected seats when the cancel button is clicked
        setSelectedSeats([]);
    };


    useEffect(() => {
        axios.post('http://localhost:3001/api/availableMovies')
            .then((response) => {
                setAvailableMovies(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        axios.post('http://localhost:3001/api/viewMovies')
            .then((response) => {
                if (response.status === 200) {
                    setMovieData(response.data);
                } else {
                    console.log('API request failed');
                }
            })
            .catch((error) => {
                console.error('Error occurred while fetching data:', error);
            });
        getdata();
    }, []);

    return (


        <div className="add" style={{ backgroundImage: 'url("https://tse2.mm.bing.net/th?id=OIP.gvbtWmPd42E3Q03TmxqYEQHaE5&pid=Api&P=0&h=180")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '1000px' }}>
            <Userheader />
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                maxWidth="600px"
                margin="0 auto"
                padding="16px"
            >
                <Typography variant="h5" component="h2">
                    Movie Booking Form
                </Typography>
                <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%' }}>
                    <TextField
                        label="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        margin="normal"
                        fullWidth
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Select a Movie</InputLabel>
                        <Select
                            value={selectedMovie}
                            onChange={(e) => handleMovieSelection(e)}
                            required
                            fullWidth
                        >
                            <MenuItem value="">
                                <em>Select a movie</em>
                            </MenuItem>
                            {movieData.map((movie) => (
                                <MenuItem key={movie._id} value={movie._id}>
                                    {movie.MovieName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography variant="body1">
                        Availability Status: {availabilityStatus}
                    </Typography>
                    <Box display="flex" flexWrap="wrap">
                        {/* {availableSeats.map((seat) => (
                            <Button
                                key={seat}
                                className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                                onClick={() => handleSeatSelection(seat)}
                                style={{ margin: '4px' }}
                            >
                                {seat}
                            </Button> */}
                            {selectedSeats.map((seat) => (
    <span
        key={seat}
        className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
        onClick={() => handleSeatSelection(seat)}
    >
        {seat}
    </span>
))}

                    
                    </Box>
                    <TextField
                        type="text"
                        placeholder="Type seat number (e.g., Seat A1)"
                        value={enteredSeat}
                        onChange={handleSeatTyping}
                        margin="normal"
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddSeat}
                        style={{ marginTop: '12px' }}
                        fullWidth
                    >
                        Add Seat
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCancel}
                        style={{ marginTop: '12px' }}
                        fullWidth
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBookNow}
                        style={{ marginTop: '12px' }}
                        fullWidth
                    >
                        Book Now
                    </Button>
                </form>
            </Box>
        </div>

    )
}

export default Booking