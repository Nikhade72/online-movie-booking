import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CardActionArea, Card, CardContent } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    padding: '12px',
  },
  select: {
    padding: '12px',
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: '12px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  card: {
    marginBottom: '16px',
  },
};

const AddMovies = () => {
  const [movieData, setMovieData] = useState({
    MovieName: '',
    Image: '',
    Category: 'UA',
    Languages: [],
    Cast: '', // New field
    Description: '', // New field
    TicketRates: 0, // New field
    NoOfSeats: 0, // New field
  });
  const [jwtToken, setJwtToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjUwYWY5MTRiODI4NGJmMmZiYWJkY2JiIiwiaWF0IjoxNjk2NzA1ODM1LCJleHAiOjE2OTY3OTIyMzV9.eyloKu0oLuOMAxO970aaY7kfjN1dWdEYu9wvp_Iy0XM'); // Replace with your JWT token

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleLanguagesChange = (e) => {
    const selectedLanguages = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setMovieData({
      ...movieData,
      Languages: selectedLanguages,
    });
  };

  const navigate = useNavigate(); // Initialize the navigate function
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/api/addMovie', movieData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log('Movie added successfully');
          window.alert('Movie added successfully');
          const userId = response.data.data._id;
          const userName = response.data.data.Name;
          const email = response.data.data.email;
          const token = response.data.token; // Get the JWT token from the response

          console.log(token)
          const addedMovie = response.data;
          sessionStorage.setItem("userId", userId);
          sessionStorage.setItem("userName", userName);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("token", token);
          navigate('/admin');
          // setMovieData({
          //   ...movieData,
          //   _id: response.data._id, // Assuming the response contains the _id
          // });
        } else {
          console.log('Error adding movie. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error adding movie:', error);
      });
  };

  const handleDelete = () => {
    // Make a DELETE request to delete the movie by ID
    axios
      .delete(`http://localhost:3001/api/deleteMovie/${movieData._id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log('Movie deleted successfully');
          // Clear the movie data after deletion if needed
          setMovieData({
            MovieName: '',
            Image: '',
            Category: 'UA',
            Languages: [],
            Cast: '',
            Description: '',
            TicketRates: 0,
            NoOfSeats: 0,
          });
        } else {
          console.log('Error deleting movie. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error deleting movie:', error);
      });
  };

  return (
   <div>
    <AdminNav/>
    <div className="add" style={{ backgroundImage: 'url("https://thumbs.dreamstime.com/b/paper-texture-background-scrapbooking-artistic-design-digital-any-other-design-54498672.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '1000px' }}>
     <div style={styles.container}>
      <h2>Add a New Movie</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="MovieName">Movie Name:</label>
          <input
            type="text"
            id="MovieName"
            name="MovieName"
            value={movieData.MovieName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Image">Image URL:</label>
          <input
            type="text"
            id="Image"
            name="Image"
            value={movieData.Image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Category">Category:</label>
          <select
            id="Category"
            name="Category"
            value={movieData.Category}
            onChange={handleChange}
            required
          >
            <option value="UA">UA</option>
            <option value="A">A</option>
            <option value="PG">PG</option>
          </select>
        </div>
        <div>
          <label htmlFor="Languages">Languages:</label>
          <select
            id="Languages"
            name="Languages"
            multiple
            value={movieData.Languages}
            onChange={handleLanguagesChange}
            required
          >
            <option value="Malayalam">Malayalam</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
          </select>
        </div>
        {/* New fields */}
        <div>
          <label htmlFor="Cast">Cast:</label>
          <input
            type="text"
            id="Cast"
            name="Cast"
            value={movieData.Cast}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Description">Description:</label>
          <textarea
            id="Description"
            name="Description"
            value={movieData.Description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="TicketRates">Ticket Rates:</label>
          <input
            type="number"
            id="TicketRates"
            name="TicketRates"
            value={movieData.TicketRates}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="NoOfSeats">Number of Seats:</label>
          <input
            type="number"
            id="NoOfSeats"
            name="NoOfSeats"
            value={movieData.NoOfSeats}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Add Movie</button>
      </form>

      {movieData._id && (
        <div>
          <h2>Delete Movie</h2>
          <button type="button" onClick={handleDelete} style={styles.button}>
            Delete Movie
          </button>
        </div>
      )}

    </div>
   </div>
   </div>
  )
}

export default AddMovies