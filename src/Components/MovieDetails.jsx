import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Review from './Review';

const MovieDetails = ({ match }) => {
  const movieId = match.params.id;
  const { id } = useParams();
  console.log('MovieDetails - Received id:', id); // Add this line to check the received id

  const [movieDetails, setMovieDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define your backend API endpoint for fetching movie details
    const apiUrl = `http://localhost:3001/api/viewMovies/${id}`;

    axios
      .get(apiUrl)
      .then((response) => {
        // Successfully fetched data
        setMovieDetails(response.data);
        console.log('MovieDetails - Setting movieId:', response.data.MovieId); // Add this line to check the setting of movieId
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors
        setError(error);
        setLoading(false);
      });

  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!movieDetails) {
    return <p>Movie not found.</p>;
  }

  const handleReviewSubmit = (reviewData) => {
    // Implement the logic to submit the review to the backend
    axios
      .post('http://localhost:3001/api/submitreview', reviewData)
      .then((response) => {
        console.log('MovieDetails:', response.data);
        console.log('Review submitted successfully:', response.data);
        // Optionally, you can update the UI to reflect the submitted review
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
        // Handle the error appropriately
      });
  };
  
  return (
    <div>
      <Box width={'100%'} padding={2}>
        <img src={movieDetails.Image} alt="Movie Poster" width="100%" />
      </Box>
      <Box padding={2}>
        <Typography variant="h4">{movieDetails.MovieName}</Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {movieDetails.Category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {movieDetails.Description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cast Details: {movieDetails.Cast}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <Review movieId={movieDetails._id} />
        </Typography>
      
        <Typography variant="body2" color="text.secondary">
      Average Rating: {movieDetails.averageRating.toFixed(1)}
    </Typography>

        {/* Add the "Book Ticket" button here */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            alert('see more')
          }}
        >
          Book Ticket
        </Button>
      </Box>
    </div>
  )
}

export default MovieDetails