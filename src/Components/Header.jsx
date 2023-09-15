import React, { useState } from 'react'
import { AppBar, Autocomplete, Box, Tab, Tabs, TextField, Toolbar } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie';
import { Link } from 'react-router-dom';
const dummyArray = ['Mayanadhi', 'Kumblungi Nights', 'Intersteller'];
const Header = () => {
    const [value, setValue] = useState(0);

    return (
        <AppBar position ='sticky' sx={{bgcolor:'#2b2d42'}}>
            <Toolbar>
                <Box width={'20%'}>
                    <MovieIcon />
                </Box>
                <Box width={'30%'} margin={'auto'}>
                    <Autocomplete
                        freeSolo
                        options={dummyArray.map((option) => option)}
                        renderInput={(params) => <TextField sx ={{input:{color:'white'}}} variant='standard' {...params} placeholder="Search Across Multiple Movies" />}
                    />
                </Box>
                <Box display={'flex'}>
                    <Tabs textColor='inherit' indicatorColor='secondary' value={value} onChange={(e,val)=>setValue(val)}>
                        <Tab LinkComponent={Link} to='/' label='Home' />
                        <Tab LinkComponent={Link} to='/login' label='Login' />
                        <Tab LinkComponent={Link} to='/signup' label='Signup' />
                    </Tabs>

                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header