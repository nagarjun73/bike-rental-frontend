import React from 'react'
import { Card, CardActions, CardContent, Button, Typography, Box } from '@mui/material'


function BookingDetails() {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: "90vh",
      backgroundColor: "#fafafa"
    }}>
      <Card sx={{ width: '50vw' }} >
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Typography gutterBottom variant="h4" component="div" >
            Booking Details
          </Typography>
          <Box>
            <Typography gutterBottom variant="h6" component="div">
              BookingDetails
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              BookingDetails
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Booking Details
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant='contained'
          >Make Payment</Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default BookingDetails