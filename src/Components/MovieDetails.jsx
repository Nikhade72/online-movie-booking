import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';

const MovieDetails = ({ Image, Category, Description, Cast, review, }) => {
  const { id } = useParams();
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
          Reviews:
        </Typography>
        <ul>
          {movieDetails.Reviews &&
            movieDetails.Reviews.map((review, index) => (
              <li key={index}>
                User: {review.user}, Rating: {review.rating}, Comment: {review.comment}
              </li>
            ))}
        </ul>

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