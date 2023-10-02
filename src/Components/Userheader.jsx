import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Tabs,
  Toolbar,
  Avatar,
} from '@mui/material';
import TheatersIcon from '@mui/icons-material/Theaters';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Tab } from '@mui/material';

const Userheader = () => {
  const [movie, setMovie] = useState([]);
  const [userName, setUserName] = useState(sessionStorage.getItem('userName'));
  const [value, setValue] = useState(0); // Initialize the value with the index of the selected tab
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    axios.post('http://localhost:3001/api/viewMovies')
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
        console.log(movie);
      })
      .catch();
  }, []);
  return (
    <AppBar position="sticky" sx={{ bgcolor: '#2b2d42' }}>
      <Toolbar>
        <Box width={'20%'}>
          <TheatersIcon />
        </Box>
        <Box width={'25%'} margin={'auto'}>
          <Autocomplete
            freeSolo
            options={movie.map((option) => option.MovieName)}
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            getOptionLabel={(option) => option.toString()} // Ensure the option is a string
            renderInput={(params) => (
              <TextField
                variant="standard"
                sx={{ input: { color: 'white' } }}
                {...params}
                placeholder="Search for Movies"
              />
            )}
          />

        </Box>
        <Box display={"flex"}>
          <Tabs textcolor="inherit" indicatorColor="white">
            //<Tab label="My Booking" value={0} href="/tickets" />
          </Tabs>
          <Avatar
            size="small"
            src="/broken-image.jpg"
          />


          {/* <Tab  label="Admin"  href='/admin'/> */}
          <Tab label="Logout" value={1} href='/' />

        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Userheader