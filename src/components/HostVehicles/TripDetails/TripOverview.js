import React from 'react'
import { Box, Stack, Card, CardContent, Typography, CardMedia } from '@mui/material'
import Countdown from 'react-countdown';

export default function TripOverview(props) {
  const { trip } = props
  console.log(trip);
  return (
    <Card sx={{
      margin: "20px",
      padding: "25px",
      width: { md: "30vw", xs: "80vw" },
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      borderRadius: "15px"
    }} >
      <CardContent >
        <Stack flexDirection="column">
          <Typography variant='h3'>Overview</Typography>
          <Typography variant="h6">Trip Starts: {new Date(trip.trip.tripStartDate).toLocaleString()}</Typography>
          <Typography variant="h6">Trip Ends: {new Date(trip.trip.tripEndDate).toLocaleString()}</Typography>
          <Typography variant="h6">User Name: {trip.details.userId.name}</Typography>
          <Typography variant="h6">Amount: Rs {trip.trip.amount}</Typography>
          <Typography variant="h6">Payment Id : {trip.trip.paymentId}</Typography>
          <Typography variant="h6">Time Left :
            <Countdown date={trip.trip.tripStartDate}>
              <span>
                trip already started
              </span>
            </Countdown>
          </Typography>


        </Stack>
      </CardContent>
    </Card >
  )
}
