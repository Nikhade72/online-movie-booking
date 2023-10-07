import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Rating,
    CircularProgress,

} from '@mui/material';
import axios from 'axios';


const Review = ({ movieId }) => {
    console.log('Review - Received movieId:', movieId);

    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
  
    // Define the newReview object outside of the function
    const newReview = {
      movieId,
      reviewText,
      rating,
    };
  
    const handleReviewSubmit = () => {
      if (!newReview.reviewText || newReview.rating === 0) {
        setError('Please provide both a review and a rating.');
        return;
      }
  
      setIsLoading(true);
  
      // Send the review data to the backend
      axios
        .post(`http://localhost:3001/api/submitreview`, newReview)
        .then((response) => {
          if (response.status === 200) {
            console.log(movieId);
            setMessage('Review submitted successfully');
            setReviewText('');
            setRating(0);
          } else {
            setError('Review submission failed');
          }
        })
        .catch((err) => {
          setError('An error occurred while submitting the review');
          console.error('Error submitting review:', err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
  
    return (
        <Box>
        <Typography variant="h6">Write a Review</Typography>
        <TextField
          label="Your Review"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <Typography>Rate the Movie</Typography>
        <Rating
          name="movie-rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleReviewSubmit}
          disabled={!reviewText || rating === 0 || isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Submit Review'
          )}
        </Button>
        {message && <Typography variant="success">{message}</Typography>}
        {error && <Typography variant="error">{error}</Typography>}
      </Box>
    )
}

export default Review