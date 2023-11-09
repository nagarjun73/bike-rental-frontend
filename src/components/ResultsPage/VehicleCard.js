import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const VehicleCard = (props) => {
  const { vehicle } = props
  const navigate = useNavigate()

  const bookingHandleFunction = () => {
    //Checking token 
    const token = localStorage.getItem('token')
    if (token) {//token present
      //make booking and show deatils

      //navigate to booking details page for payment
      navigate('/BookingDetails')
    } else {
      //token not present so navigating to Login page
      navigate('/Login')
    }
  }

  return (
    <Grid key={vehicle._id} item xs={6} sm={3}>
      <Box p={2} >
        <Card >
          <CardMedia>
            <img src={vehicle.vehicleImage[0].url} alt={vehicle.model} style={{ height: '20vh', width: "20vw" }} />
          </CardMedia>
          <CardContent sx={{ display: 'flex', justifyContent: "space-around" }}>
            <Typography gutterBottom variant="p" component="div">
              {vehicle.model}
            </Typography>
          </CardContent>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
            <Typography gutterBottom variant="p" component="div">
              {vehicle.engineCapacity}
            </Typography>
            <CardActions>
              <Button
                size="small"
                variant='contained'
                onClick={bookingHandleFunction}
              >Book</Button>
            </CardActions>
          </Box>
        </Card>
      </Box>
    </Grid>
  )
}

export default VehicleCard