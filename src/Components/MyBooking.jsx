import React, { useEffect, useState } from 'react'
import Userheader from './Userheader'
import { Box, Button, Card, CardActions, CardContent, Container, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import {  CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const ContainerStyled = styled(Container)({
    paddingTop: '16px', // You can adjust this value
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
  
const MyBooking = () => {

    const [bookingDetails, setBookingDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { bookingId } = useParams();
    const userId = sessionStorage.getItem('userId');


    
    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/bookingdetails/${bookingId}`);
                setBookingDetails(response.data.bookingDetails);
                console.log(response.data.bookingDetails);

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
              // Handle success, e.g., show a success message to the user
              console.log('Booking canceled successfully');
              window.alert('Booking canceled successfully'); // Show a window alert
              // You can also update the UI or redirect the user as needed
            } else {
              // Handle other response statuses or errors
              console.error('Booking cancellation failed');
            }
          })
          .catch((error) => {
            // Handle network errors or other exceptions
            console.error('Error canceling booking:', error);
          });
      };
    
    return (

        
    
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
          <Button variant="outlined" color="secondary" onClick={handleCancelTicket}>
            Cancel Ticket
          </Button>
        </PaperStyled>
      )}
    </ContainerStyled>
    )
}

export default MyBooking