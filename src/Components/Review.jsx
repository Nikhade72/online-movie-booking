import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Rating,
  CircularProgress,

} from '@mui/material';
import {


  FormControl,
  InputLabel,
  MenuItem,
  Select,

} from '@mui/material';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Form,
  Spinner,
} from 'react-bootstrap';


const Review = () => {
  // console.log('Review - Received movieId:', movieId);

  // const [reviewText, setReviewText] = useState('');
  // const [rating, setRating] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);
  // const [message, setMessage] = useState('');
  // const [error, setError] = useState('');

  // // Define the newReview object outside of the function
  // const newReview = {
  //   movieId,
  //   reviewText,
  //   rating,
  // };

  // const handleReviewSubmit = () => {
  //   if (!newReview.reviewText || newReview.rating === 0) {
  //     setError('Please provide both a review and a rating.');
  //     return;
  //   }

  //   setIsLoading(true);

  //   // Send the review data to the backend
  //   axios
  //     .post(`http://localhost:3001/api/submitreview`, newReview)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log(movieId);
  //         setMessage('Review submitted successfully');
  //         setReviewText('');
  //         setRating(0);
  //       } else {
  //         setError('Review submission failed');
  //       }
  //     })
  //     .catch((err) => {
  //       setError('An error occurred while submitting the review');
  //       console.error('Error submitting review:', err);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  const [movies, setMovies] = useState([]); // List of movies user has booked
  const [reviewText, setReviewText] = useState(''); // Review text
  const [rating, setRating] = useState(0); // Rating value
  const [isLoading, setIsLoading] = useState(false); // Loading indicator
  const [message, setMessage] = useState(''); // Success message
  const [error, setError] = useState(''); // Error message
  const userId = sessionStorage.getItem('userId');
  const [selectedMovie, setSelectedMovie] = useState('');

  // Fetch the list of movies the user has booked
  // Fetch the list of movies the user has booked
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3001/api/getbookedtkts/${userId}`)
  //     .then((response) => {
  //       const userBookings = response.data; // Assuming the response contains user bookings
  //       setMovies(userBookings);
  //       if (userBookings.length > 0) {
  //         // Set the selected movie to the first one by default
  //         setSelectedMovie(userBookings[0]._id);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user bookings:', error);
  //     });
  // }, [userId]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/getbookedtkts/${userId}`)
      .then((response) => {
        const userBookings = response.data; // Assuming the response contains user bookings
        setMovies(userBookings);
        if (userBookings.length > 0) {
          setSelectedMovie(userBookings[0]._id); // Select the first movie by default
        }
      })
      .catch((error) => {
        console.error('Error fetching user bookings:', error);
      });
  }, [userId]);

  const handleReviewSubmit = () => {
    if (!selectedMovie || !reviewText || rating === 0) {
      setError('Please select a movie, provide a review, and a rating.');
      return;
    }

    setIsLoading(true);

    axios
    .post('http://localhost:3001/api/submitreview', {
        movieId: selectedMovie,
        reviewText,
        rating,
      })
      .then((response) => {
        if (response.status === 200) {
          setMessage('Review submitted successfully');
          setReviewText('');
          setRating(0);
          setSelectedMovie('');
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
   
     <Container>
      <Row className="mt-5">
        <Col>
          <h2>Write a Review</h2>
          <Form>
            <Form.Group controlId="selectMovie">
              <Form.Label>Select a Movie</Form.Label>
              <Form.Control
                as="select"
                value={selectedMovie}
                onChange={(e) => setSelectedMovie(e.target.value)}
              >
                <option value="">Select a Movie</option>
                {movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.movieName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="reviewText">
              <Form.Label>Your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Write your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="rating">
              <Form.Label>Rate the Movie</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleReviewSubmit}
              disabled={!selectedMovie || !reviewText || rating === 0 || isLoading}
            >
              {isLoading ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Submit Review'
              )}
            </Button>
          </Form>
          {message && <p className="mt-3 text-success">{message}</p>}
          {error && <p className="mt-3 text-danger">{error}</p>}
        </Col>
      </Row>
    </Container>
  )
}

export default Review