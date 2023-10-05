import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies from your backend API
    fetch('http://localhost:3001/api/viewMovies')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/MovieDetails/${movie.id}`}>
              <img src={movie.Image} alt={movie.name} />
              <h2>{movie.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovieList