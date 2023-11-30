import React from 'react'
import { Card, CardActions, CardContent, Button, Typography, Box, CircularProgress } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { startGetBkgInfo } from '../../actions/bookingsAction'
import { useParams } from 'react-router'
import { startPayment } from '../../actions/paymentAction'
import toast, { Toaster } from 'react-hot-toast'
import { startDistroyTrip } from '../../actions/bookingsAction'
import { useNavigate } from 'react-router-dom'

function BookingDetails(props) {
  const params = useParams()
  const bookingId = params.id
  const navigate = useNavigate()
  const bookingDtls = useSelector((state) => {
    return state.booking.bookingDetails
  })


  const dispatch = useDispatch()

  useEffect(() => {
    //check if booking details empty
    if (bookingId) {
      dispatch(startGetBkgInfo(bookingId))
    }
  }, [])

  const makePaymentHandle = () => {
    const payData = {
      tripId: bookingId,
      amount: bookingDtls.trips.amount,
    }
    dispatch(startPayment(payData))
    localStorage.removeItem('query')
  }


  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: "90vh",
      backgroundColor: "#fafafa"
    }}>
      <Toaster />
      {Object.keys(bookingDtls).length !== 0 ?
        <Card sx={{
          width: { md: '50vw', xs: "80vw" },
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
          borderRadius: '10px',

        }}  >
          <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Typography gutterBottom variant="h4" component="div" >
              Booking Details
            </Typography>
            <Box sx={{ paddingLeft: '5vw' }}>
              <Typography variant="h6" component="div">
                Trip Starts At : {new Date(bookingDtls.trips.tripStartDate).toLocaleString()}
              </Typography>
              <Typography variant="h6" component="div">
                Trip Ends At : {new Date(bookingDtls.trips.tripEndDate).toLocaleString()}
              </Typography>
              <Typography variant="h6" component="div">
                Vehicle : {bookingDtls.trips.vehicleId.model}
              </Typography>
              <Typography variant="h6" component="div">
                Vehicle Number : {bookingDtls.trips.vehicleId.registrationNumber}
              </Typography>
              <Typography variant="h6" component="div">
                Pickup Location : {Object.entries(bookingDtls.details.address).map((ele) => ele[1]).join(" ")}
              </Typography>
              <Typography variant="h6" component="div">
                Host : {bookingDtls.details.userId.name}
              </Typography>
              <Typography variant="h6" component="div">
                Amount to be Paid : Rs {bookingDtls.trips.amount}
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '20px',
          }}>
            <Button
              size="small"
              variant='contained'
              onClick={makePaymentHandle}
            >Make Payment</Button>
          </CardActions>
        </Card>
        : (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )}
    </Box>
  )
}

export default BookingDetails