import React, { useEffect, useState } from 'react'
import Userheader from './Userheader'
import { Box, Button, Card, CardActions, TextField, Rating, CardContent, Container, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import Logout from './Logout'

const ContainerStyled = styled(Container)({
  paddingTop: '10px', // You can adjust this value
  marginBottom: '8px', // You can adjust this value
});

const PaperStyled = styled(Paper)({
  padding: '16px', // You can adjust this value
  borderRadius: '8px', // You can adjust this value
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
});

const LoadingContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
});

const TableStyled = styled(Table)({
  minWidth: '400px', // You can adjust this value
});

const ReviewForm = ({ onSubmit }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = () => {
    onSubmit(reviewText, rating);
    setReviewText('');
    setRating(0);
  };
  return (
    <Box mt={2}>
      <TextField
        label="Write a Review"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <Box mt={2}>
        <Typography>Rate the Movie</Typography>
        <Rating
          name="movie-rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
        />

      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleReviewSubmit}
        disabled={!reviewText || rating === 0}
      >
        Submit Review
      </Button>
    </Box>
  );
};

const ReviewList = ({ reviews }) => {
  return (
    <Box mt={2}>
      {reviews.map((review, index) => (
        <Paper
          key={index}
          variant="outlined"
          style={{ padding: '16px', marginBottom: '16px' }}
        >
          <Typography variant="body1">{review.reviewText}</Typography>
          <Typography>Rating: {review.rating}</Typography>
        </Paper>
      ))}
    </Box>
  );
};


const MyBooking = () => {

  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bookingId } = useParams();
  const userId = sessionStorage.getItem('userId');

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/bookingdetails/${bookingId}`);
        setBookingDetails(response.data.bookingDetails);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handleCancelTicket = () => {
    if (!bookingDetails) {
      console.error('No booking details to cancel.');
      return;
    }

    axios
      .post(`http://localhost:3001/api/cancelticket/${bookingDetails._id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log('Booking canceled successfully');
          window.alert('Booking canceled successfully');
        } else {
          console.error('Booking cancellation failed');
        }
      })
      .catch((error) => {
        console.error('Error canceling booking:', error);
      });
  };


  return (

    <div >
      <Logout />
      <div
        className="add"
        style={{
          backgroundImage:
            'url("https://tse1.mm.bing.net/th?id=OIP.xBvSKN42wVchJp4ciWAOCwHaH6&pid=Api&P=0&h=180")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '100vh', // Set the height of the container to the viewport height
          display: 'flex',
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
        }}
      >
        <ContainerStyled>
          <Typography variant="h4" gutterBottom>
            Your Booking Details
          </Typography>
          {loading && (
            <LoadingContainer>
              <CircularProgress />
            </LoadingContainer>
          )}
          {error && (
            <Typography variant="body1" color="error">
              Error: {error.message}
            </Typography>
          )}
          {bookingDetails && (
            <PaperStyled>
              <TableContainer component={PaperStyled}>
                <TableStyled aria-label="Booking Details">
                  <TableHead>
                    <TableRow>
                      <TableCell>Field</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Booking ID</TableCell>
                      <TableCell>{bookingDetails._id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Movie Name</TableCell>
                      <TableCell>{bookingDetails.movieName}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>{bookingDetails.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Seat Number</TableCell>
                      <TableCell>{bookingDetails.seat_number}</TableCell>
                    </TableRow>

                    {/* Add more details as needed */}
                  </TableBody>
                </TableStyled>
              </TableContainer>
{/* 
              <Button variant="outlined" color="secondary" onClick={handleCancelTicket}>
                Cancel Ticket
              </Button> */}
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={2} // You can adjust the margin-top as needed
              >
                <Button variant="outlined" color="secondary" onClick={handleCancelTicket}>
                  Cancel Ticket
                </Button>
              </Box>
            </PaperStyled>
          )}
        </ContainerStyled>
      </div>
    </div>

  )
}

export default MyBooking