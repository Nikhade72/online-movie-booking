import React from 'react'
import { Button, Link, Typography, Box } from '@mui/material'

const Footer = () => {
    return (

        <div>
            <Box display='flex' padding={2} marginTop={20}>
                <Button component={Link} to='/' variant='outlined' sx={{ margin: 'auto', color: '#2b2d42' }}>
                    Home
                </Button>
            </Box>
            <Typography variant="body1" align="center">
                &copy; {new Date().getFullYear()}<br />
                Online Movie Booking
            </Typography>
        </div>
    )
}

export default Footer