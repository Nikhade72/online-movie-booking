
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
        console.log(response);
        if (response.data.message === "login successfull") {
          navigate("/user");
        } else if (response.data.message === "admin login  successfull") {
          alert("admin login succesfull");
          navigate("/admin");
        } else {
          console.log(response.data.message);
          alert(response.data.message);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <>
      <div className ="add" style={{ backgroundImage: 'url("https://s.yimg.com/fz/api/res/1.2/FTrub4bAJA0ESrJmV9wPjQ--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI2MDtxPTgwO3c9MzMy/https://s.yimg.com/zb/imgv1/96b25df1-201c-37fb-af41-64e5f125b32e/t_500x300")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  height: '1000px'}}>
      <Dialog open={true}>
        <Box margin={"1%"}>
          <Typography
            fontSize="30px"
            paddingTop={2}
            lineHeight={1.3}
            fontWeight="500"
            textAlign={"center"}
          >
            Log In
          </Typography>
        </Box>
        <DialogContent>
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
            type="password"
            fullWidth
            variant="standard"
            onChange={inputHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ backgroundColor: "green", margin: "20px" }}
            variant="auto"
            fullWidth
            textAlign={"center"}
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
            <p>
              Create new Account ? <a href="/signup">Sign Up</a>
            </p>
          </Typography>
        </Box>
      </Dialog>
      </div>
      </>
    </div>
  );
};

export default Login;
