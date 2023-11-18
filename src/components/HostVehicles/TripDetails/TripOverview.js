import React from 'react'
import { Box, Stack, Card, CardContent, Typography, CardMedia } from '@mui/material'

export default function TripOverview(props) {
  const { trip } = props
  console.log(trip);
  return (
    <Card sx={{
      margin: "20px",
      minWidth: "30vw",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      borderRadius: "15px"
    }} >
      <CardContent >
        <Stack flexDirection="column">
          <Typography variant='h5'>Overview</Typography>
          <Typography variant='p'>Trip Starts: {new Date(trip.tripStartDate).toLocaleString()}</Typography>
          <Typography variant='p'>Trip Ends: {new Date(trip.tripEndDate).toLocaleString()}</Typography>
          <Typography variant='p'>User Name: {trip.userId.name} Kms</Typography>
          <Typography variant='p'>Amount: {trip.amount}</Typography>
          <Typography variant='p'>Payment Id : {trip.paymentId}</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
