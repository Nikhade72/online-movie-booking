import React, { useEffect, useState } from 'react'
import { AppBar, Box, Tabs, Toolbar, Avatar } from '@mui/material'
import TheatersIcon from '@mui/icons-material/Theaters';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { Navigate, useNavigate,  Link, } from 'react-router-dom';
import { Tab } from '@mui/material';

const AdminNav = () => {
  const [movie, setMovie] = useState([]);
  const [userName, setUserName] = useState(sessionStorage.getItem("userName"));
  const [value, setValue] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.post('http://localhost:3001/api/viewMovies')
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
        console.log(movie)
      })
      .catch()
  }, [])
  return (
    // <AppBar position='stickey' sx={{ bgcolor: "#2b2d42" }}>
    //   <Toolbar>
    //     <Box width={'20%'}>
    //       <TheatersIcon />
    //     </Box>
    //     <Box width={"25%"} margin={"auto"} >
    //       <Autocomplete
    //         freeSolo
    //         options={movie.map((option) => option.MovieName)}
    //         value={value}
    //         onChange={(event, newvalue) => setValue(newvalue)}
    //         renderInput={(params) =>
    //           <TextField variant="standard"
    //             sx={{ input: { color: "white" } }}
    //             {...params}
    //             placeholder="Search for Movies"
    //           />}
    //       />
    //     </Box>
    //     <Box display={"flex"}>
    //       <Tabs textcolor="inherit" indicatorColor="white">
    //         <Tab textcolor="inherit" indicatorColor="white" label="Add Movies" href='/addmovies' />
    //         <Tab textcolor="inherit" indicatorColor="white" label="Update Movies" href='/updatemovies' />
    //       </Tabs>
    //       <Avatar
    //         src="/broken-image.jpg"
    //       />
    //       {/* <Tab  label="Admin"  href='/admin'/> */}
          
    //       <Tab label="Logout" href='/' />
    //     </Box>
    //   </Toolbar>
    // </AppBar>
    <AppBar position='sticky' sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={'20%'}>
          <TheatersIcon />
        </Box>
        <Box width={"25%"} margin={"auto"} >
          <Autocomplete
            freeSolo
            options={movie.map((option) => option.MovieName)}
            value={value}
            onChange={(event, newvalue) => setValue(newvalue)}
            renderInput={(params) =>
              <TextField variant="standard"
                sx={{ input: { color: "white" } }}
                {...params}
                placeholder="Search for Movies"
              />}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs textcolor="inherit" indicatorColor="white">
            {/* Use Link component for navigation */}
            <Tab textcolor="inherit" indicatorColor="white" label="Add Movies" component={Link} to='/addmovies' />
            <Tab textcolor="inherit" indicatorColor="white" label="Update Movies" component={Link} to='/updatemovies' />
          </Tabs>
          <Avatar
            src="/broken-image.jpg"
          />
          {/* Use Link component for navigation */}
          {/* <Tab  label="Admin"  component={Link} to='/admin'/> */}
          <Tab label="Logout" component={Link} to='/' />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default AdminNav