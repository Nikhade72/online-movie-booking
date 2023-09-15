import React from 'react'
import Header from './Header'
import { Box, Typography } from '@mui/material'
import Movieitem from './Movies/Movieitem'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div>
            <Header />
            <Box width={'100%'} height={'100%'} margin={'auto'} marginTop={2}>
                <Box margin={'auto'} width={'80%'} height={'40vh'} padding={2}>
                    <img src="https://tse3.mm.bing.net/th?id=OIF.Y5hSI0gAUgWNdQthtqTt0Q&pid=Api&P=0&h=180" alt="jawan"
                        width={'100%'}
                        height={'100%'}
                    />
                </Box>
                <Box padding={5} margin={'auto'}>
                    <Typography variant='h4' textAlign={'center'}>Latest Release</Typography>
                </Box>
                <Box display='flex' width='100%' justifyContent={'center'} flexWrap='wrap'>
                    {[1, 2, 3, 4].map((item) => <Movieitem key={{ item }} />)}
                </Box>
                <Box display='flex' padding={5} margin='auto'>
                    <Button LinkComponent={Link} to='/movies' variant='outlined' sx={{ margin: 'auto', color: '#2b2d42' }}>
                        View All Movies
                    </Button>
                </Box>
            </Box>
        </div>
    )
}

export default Home