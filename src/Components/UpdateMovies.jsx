import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import { useNavigate } from 'react-router-dom';

const UpdateMovies = () => {
  const [movieData, setMovieData] = useState({
    TicketRates: '',
    timing: '',
    _id: '' // You should initialize _id here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const navigate = useNavigate(); // Get the navigation function

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Make an Update request to update the movie by ID
    axios
      .post(`http://localhost:3001/api/updateMovie/${movieData._id}`, movieData)
      .then((response) => {
        if (response.status === 200) {
          console.log('Movie Updated successfully');
          // Reset the form fields
          setMovieData({
            TicketRates: '',
            timing: '',
            _id: ''
          });
          window.alert('Movie Updated Successfully!');
          navigate('/admin');
        } else {
          console.log('Error updating movie. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error updating movie:', error);
      });
  };

  return (

    <div>
      <AdminNav />
      <div className="add" style={{ backgroundImage: 'url("https://www.heritagespamarrakech.com/images/booking/booking-bg-1.png")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '1000px' }}>
        <div>
          <div style={styles.container}>
            <div style={styles.content}>
              <h2 style={styles.heading}>Update Movies</h2>
              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                  <label htmlFor="TicketRates" style={styles.label}>
                    Ticket Rates:
                  </label>
                  <input
                    type="text"
                    id="TicketRates"
                    name="TicketRates"
                    value={movieData.TicketRates}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="timing" style={styles.label}>
                    Timing:
                  </label>
                  <input
                    type="text"
                    id="timing"
                    name="timing"
                    value={movieData.timing}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="_id" style={styles.label}>
                    Movie ID:
                  </label>
                  <input
                    type="text"
                    id="_id"
                    name="_id"
                    value={movieData._id}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>
                <button type="submit" style={styles.button}>
                  Update Movie
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const styles = {
  container: {
    padding: '250px',
  },
  content: {
    maxWidth: '500px',
    margin: '0 auto',
    background: '#f0f0f0',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default UpdateMovies