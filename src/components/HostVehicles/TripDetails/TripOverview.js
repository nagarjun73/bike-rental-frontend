import React, { useContext } from 'react'
import { Box, Stack, Card, CardContent, Typography, Button } from '@mui/material'
import Countdown from 'react-countdown';
import { UserContext } from "../../../App"
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function TripOverview(props) {
  const { trip } = props
  const tripDt = trip.trips

  const { userState, userDispatch } = useContext(UserContext)


  console.log(trip);
  return (
    <Card sx={{
      margin: "20px",
      padding: "25px",
      width: { md: "30vw", xs: "80vw" },
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      borderRadius: "15px"
    }} >
      <Toaster />
      <CardContent >
        <Stack flexDirection="column">
          <Typography variant='h3'>Overview</Typography>
          <Typography variant="h6">Trip Starts: {new Date(tripDt.tripStartDate).toLocaleString()}</Typography>
          <Typography variant="h6">Trip Ends: {new Date(tripDt.tripEndDate).toLocaleString()}</Typography>
          <Typography variant="h6">User Name: {trip.details.userId.name}</Typography>
          <Typography variant="h6">Amount: Rs {tripDt.amount}</Typography>
          <Typography variant="h6">Payment Id : {tripDt.paymentId}</Typography>
          <Typography variant="h6">Status : {tripDt.tripStatus}</Typography>
          <Typography variant="h6">Time Left :
            <Countdown date={tripDt.tripStartDate}>
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
