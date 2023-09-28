import React from 'react'
import Userheader from './Userheader'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Typography } from "@mui/material"; // Import Typography from Material-UI


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
            // Check if the maximum seat limit (30) has been reached
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
        // Create a request object with selectedMovie and selectedSeats
        const bookingData = {
            movieId: selectedMovie,
            seatIds: selectedSeats,
            name,
            email,
            seat_number: selectedSeats.join(','), // Join selected seats into a comma-separated string
        };

        // Send the bookingData to your backend API using Axios or another HTTP library
        axios.post('http://localhost:3001/api/booktickets', bookingData)
            .then((response) => {
                console.log('Booking successful');
                window.alert('Booking successful!');
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
      }, []);
    

    return (
    //     <div>
    //         <Userheader />
    //         <h2>Movie Booking Form</h2>
    //         <form onSubmit={(e) => e.preventDefault()}>


    //             <div>
    //                 <label>Name:</label>
    //                 <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
    //             </div>
    //             <div>
    //                 <label>Email:</label>
    //                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    //             </div>

    //             <div>

    //                 <label>Select a Movie:</label>
    //                 <select
    //                     value={selectedMovie}
    //                     onChange={(e) => handleMovieSelection(e)}
    //                     required
    //                 >
    //                     <option value="">Select a movie</option>
    //                     {movieData.map((movie) => ( // Use movieData instead of movie
    //                         <option key={movie._id} value={movie._id}>
    //                             {movie.MovieName}
    //                         </option>
    //                     ))}
    //                 </select>
    //             </div>
    //             <div>
    //                 <p>Availability Status: {availabilityStatus}</p>
            
    //                 {selectedSeats.map((seat) => (
    //     <span key={seat} className="selected-seat">
    //         {seat}{' '}
    //         <button onClick={() => handleSeatCancellation(seat)}>Cancel</button>
    //     </span>
    // ))}
    //             </div>
    //             <input
    //                 type="text"
    //                 placeholder="Type seat number (e.g., Seat A1)"
    //                 value={enteredSeat}
    //                 onChange={handleSeatTyping}
    //             />
    //             <button onClick={handleAddSeat}>Add Seat</button>
    //             {/* Add the "Book Now" button */}
    //             <button onClick={handleBookNow}>Book Now</button>
    //         </form>
    //     </div>
    <div>
    <Userheader />
    <h2>Movie Booking Form</h2>
    <form onSubmit={(e) => e.preventDefault()}>
        <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
            <label>Select a Movie:</label>
            <select
                value={selectedMovie}
                onChange={(e) => handleMovieSelection(e)}
                required
            >
                <option value="">Select a movie</option>
                {movieData.map((movie) => (
                    <option key={movie._id} value={movie._id}>
                        {movie.MovieName}
                    </option>
                ))}
            </select>
        </div>
        <div>
            <p>Availability Status: {availabilityStatus}</p>
            {selectedSeats.map((seat) => (
                <span key={seat} className="selected-seat">
                    {seat}{' '}
                    <button onClick={() => handleSeatCancellation(seat)}>Cancel</button>
                </span>
            ))}
        </div>
        <input
            type="text"
            placeholder="Type seat number (e.g., Seat A1)"
            value={enteredSeat}
            onChange={handleSeatTyping}
        />
        <button onClick={handleAddSeat}>Add Seat</button>
        <button onClick={handleBookNow}>Book Now</button>
    </form>
    /</div>

    )
}

export default Booking