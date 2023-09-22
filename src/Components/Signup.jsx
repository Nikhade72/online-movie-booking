
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Navigate, useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, Typography, Link } from '@mui/material';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState([]);
  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
    console.log(input);
  }
  const signupHandler = () => {
    console.log(input);
    axios.post("http://localhost:3001/api/signup", input)
      .then((response) => {
        console.log(response.data)
        if (response.data.message === "saved succesfully") {
          alert(response.data.message);
          navigate("/login")
        }
        else {
          alert("Try again")
        }
      })
      .catch((error) => {
        console.log(error);

      })
  }
  return (

    <div>
  <>
  <div className ="add" style={{ backgroundImage: 'url("https://assets.pandaily.com/uploads/2020/07/movie-theaters-1600x832.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  height: '1000px'}}>
  <Dialog open={"true"} >
        <Box margin={"1%"}>
          <Typography


            fontSize="30px"
            paddingTop={2}
            lineHeight={1.3}

            fontWeight="500"
            textAlign={"center"}
          >
            Sign Up
          </Typography>
        </Box>
        <DialogContent>
          <TextField
            autoFocus
            margin="auto"
            name="Name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputHandler}
          />
          <TextField
            autoFocus
            margin="auto"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={inputHandler}
          />
          <span> </span>
          <TextField
            autoFocus
            margin="auto"
            name="password"
            label="Password"
            type="email"
            fullWidth
            variant="standard"
            onChange={inputHandler}
          />

        </DialogContent>
        <DialogActions>

          <Button
            sx={{ backgroundColor: "green", margin: "10px" }}
            variant='auto'
            fullWidth
            textAlign={"center"}
            size="large"
            onClick={signupHandler}
          >
            SignUp

          </Button>
        </DialogActions>
        <Box margin={"auto"} >
          <Typography
            marginBottom={"10%"}
            fontSize="15px"
            paddingTop={2}
            lineHeight={1.3}
            fontWeight="800"
            textAlign={"center"}
          >
            <p> Already have an account? <a href="/login">Log In</a></p>
          </Typography>
        </Box>
      </Dialog>
  </div>
  </>
      
    </div>
  )
}

export default Signup