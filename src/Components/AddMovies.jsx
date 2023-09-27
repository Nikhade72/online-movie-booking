import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CardActionArea, Card, CardContent } from '@mui/material';
import { Navigate } from 'react-router-dom';

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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/api/addMovie', movieData)
      .then((response) => {
        if (response.status === 200) {
          console.log('Movie added successfully');
          // Navigate to the admin page or wherever you want
          // You can use the 'Navigate' component from 'react-router-dom'
          setMovieData({
            ...movieData,
            _id: response.data._id, // Assuming the response contains the _id
          });
          Navigate('/admin');
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
       <h2>Add a New Movie</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Movie</button>
      </form>

      {movieData._id && (
        <div>
          <h2>Delete Movie</h2>
          <button type="button" onClick={handleDelete}>
            Delete Movie
          </button>
        </div>
      )}
      
    </div>
  )
}

export default AddMovies