import React from 'react'
import { Card, CardActions, CardContent, Button, Typography, Box, CircularProgress } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { startGetBkgInfo } from '../../actions/bookingsAction'
import { useParams, useNavigate } from 'react-router'
import { startPayment } from '../../actions/paymentAction'

function BookingDetails(props) {
  const params = useParams()
  const bookingId = params.id

  const bookingDtls = useSelector((state) => {
    return state.booking.bookingDetails
  })


  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    //check if booking details empty
    if (!bookingId) {
      //get booking id from local storage
      const bkgId = localStorage.getItem('bookingId')
      dispatch(startGetBkgInfo(bkgId))
    } else {
      //getting booking details by sending id 
      dispatch(startGetBkgInfo(bookingId))
    }

  }, [])

  const makePaymentHandle = () => {
    const payData = {
      tripId: bookingId,
      amount: bookingDtls.trip.amount,
    }
    dispatch(startPayment(payData))
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: "90vh",
      backgroundColor: "#fafafa"
    }}>
      {Object.keys(bookingDtls).length !== 0 ?
        <Card sx={{ width: '50vw' }} >
          <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Typography gutterBottom variant="h4" component="div" >
              Booking Details
            </Typography>
            <Box>
              <Typography gutterBottom variant="h6" component="div">
                Trip Starts At : {new Date(bookingDtls.trip.tripStartDate).toLocaleString()}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Trip Ends At : {new Date(bookingDtls.trip.tripEndDate).toLocaleString()}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Vehicle : {bookingDtls.trip.vehicleId.model}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Vehicle Number : {bookingDtls.trip.vehicleId.registrationNumber}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Pickup Location : {Object.entries(bookingDtls.details.address).map((ele) => ele[1]).join(" ")}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Host : {bookingDtls.details.userId.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Amount to be Paid : Rs {bookingDtls.trip.amount}
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