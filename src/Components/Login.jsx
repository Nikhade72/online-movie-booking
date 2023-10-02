
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Typography, Link } from "@mui/material";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInputs] = useState({});

  const inputHandler = (e) => {
    setInputs({ ...input, [e.target.name]: e.target.value });
    console.log(input);
  };

  const loginHandler = () => {
    axios
      .post("http://localhost:3001/api/login", input)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.message === "login successfull") {
          const userId = response.data.data._id;
          console.log(userId)
        const userName = response.data.data.Name;
        const email = response.data.data.email;
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("email", email);
          navigate("/user");
        } else if (response.data.message === "admin successfull") {
          alert("admin successfull");
          navigate("/admin")
        } else {
          console.log(response.data.message);
          alert(response.data.message);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="add" style={{ backgroundImage: 'url("http://clipart-library.com/images/6cr5bjnEi.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '1000px' }}>
        <Dialog open={true}>
          <Box margin={"2%"}>
            <Typography
              fontSize="30px"
              paddingTop={2}
              lineHeight={1.5}
              fontWeight="500"
              textAlign={"center"}
            >
              Log In
            </Typography>
          </Box>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense" // Use one of: "dense", "none", "normal"
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
              margin="dense" // Use one of: "dense", "none", "normal"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={inputHandler}
            />
          </DialogContent>
          <DialogActions>
            <Button sx={{ backgroundColor: "green", margin: "20px", textAlign: "center" }}
              variant="contained" fullWidth
              size="large"
              onClick={loginHandler}
            >
              LOG IN
            </Button>
          </DialogActions>
          <Box>
            <Typography
              marginBottom={"10%"}
              fontSize="18px"
              lineHeight={1.3}
              fontWeight="800"
              paddingTop={2}
              textAlign={"center"}
            >
              Create new Account ? <a href="/signup">Sign Up</a>
            </Typography>
          </Box>

        </Dialog>


      </div>


    </div>
  );
};

export default Login;
