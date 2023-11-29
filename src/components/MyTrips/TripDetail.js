import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Stack, Card, Typography, CardContent, Button } from "@mui/material";
import Countdown from 'react-countdown'
import StartTrip from "./StartTrip";
import { startPayment } from '../../actions/paymentAction'
import { useState, useEffect } from "react";
import { startTripAfterReload } from '../../actions/bookingsAction'

export default function TripDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [tripDetails, setTripDetails] = useState({})
  const tripDetail = useSelector((state) => {
    return state.booking.userTrips.find((ele) => {
      return ele._id === id
    })
  })

  const upDateTripState = (data) => {
    setTripDetails(data)
  }

  useEffect(() => {
    if (tripDetail == null) {
      dispatch(startTripAfterReload(id, upDateTripState))
    } else {
      setTripDetails(tripDetail)
    }
  }, [])


  const makePaymentHandle = () => {
    const payData = {
      tripId: tripDetails._id,
      amount: tripDetails.amount,
    }
    dispatch(startPayment(payData))
    localStorage.removeItem('query')
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "90vh",
    }}>
      <Typography variant="h3">
        Trip Details
      </Typography>
      {Object.keys(tripDetails).length !== 0 && <Stack spacing={2}>
        <Card sx={{ width: { md: "50vw", xs: "90vw" } }}>
          <CardContent>
            <Stack>
              <Typography variant="h6">
                booked on: {new Date(tripDetails.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="h6">
                Trip Start Date : {new Date(tripDetails.tripStartDate).toLocaleString()}
              </Typography>
              <Typography variant="h6">
                Trip End Date : {new Date(tripDetails.tripEndDate).toLocaleString()}
              </Typography>
              <Typography variant="h6">
                Trip Status : {tripDetails.tripStatus}
              </Typography>
              <Typography variant="h6">
                Amount Paid : {tripDetails.amount}
              </Typography>
              <Typography variant="h6">
                Payment Id : {tripDetails.paymentId == null ? "Not found" : tripDetails.paymentId}
              </Typography>
              <Typography variant="h6">
                Vehicle Model : {tripDetails.vehicleId.model}
              </Typography>
              <Typography variant="h6">
                Vehicel Number : {tripDetails.vehicleId.registrationNumber}
              </Typography>
              <Typography variant="h6">Time Left :
                <Countdown date={tripDetails.tripStartDate}>
                  <span>
                    Trip time is up
                  </span>
                </Countdown>
              </Typography>
              {tripDetails.tripStatus === "pending" && <Button
                size="small"
                sx={{ width: '20vw' }}
                variant='contained'
                onClick={makePaymentHandle}
              >Make Payment</Button>}
              <StartTrip trip={tripDetails} />
            </Stack>
          </CardContent>
        </Card>
      </Stack>}
    </div >
  )
}
