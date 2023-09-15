import React from 'react'
import { Box, Button, Dialog, FormLabel, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const labelStyle = {mt:1, mb:1}
const Login = () => {
  return (
  <div>
    
    <Typography variant='h4' textAlign={'center'} marginTop={'115px'}>
        Login
      </Typography>
      <form>
        <Box display={'flex'}
        padding={6}
        justifyContent={'center'} 
        flexDirection={'column'} 
        width={400}
        margin={'auto'} 
        alignContent={'center'}>
          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField 
          margin='normal' 
          variant ='standard' 
          type={'email'} 
          name='email'/>
          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField margin='normal' 
          variant ='standard' 
          type={'password'} 
          name='password'/>
          <Button 
          sx={{mt:2, borderRadius:10, bgcolor:'#2b2d48'}}type='Submit' 
          fullWidth
          variant='contained'
          >Login</Button>
          <Button LinkComponent={Link} to='/signup'
          sx={{mt:2, borderRadius:10, bgcolor:'#2b2d48'}}type='Submit' 
          fullWidth
          variant='contained'
          >Signup</Button>
        
        </Box>
      </form>

  </div>

  )
}

export default Login