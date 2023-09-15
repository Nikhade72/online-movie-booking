import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'

const Movieitem = ({title, releaseDate, posterUrl, id}) => {
  return (
    <Card sx={{ margin:3, width: 250, height: 320, borderRadius:5, 
        ":hover": {
        boxShadow: "10px, 10px 20px #ccc",
        }
    }}>
    <img height={'50px'} width='100px' src={posterUrl} alt={title} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Lizard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent>
    <CardActions>
      <Button sx={{margin:'auto'}} size="small">Book</Button>
    </CardActions>
  </Card>
  )
}

export default Movieitem