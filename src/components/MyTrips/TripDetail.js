import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom"
import { UserContext } from "../../App"
import { Stack, Card, Typography, CardContent, CircularProgress, Box, CardMedia } from "@mui/material";
import { setLoadingFalse } from "../../actions/bookingsAction";
import { useDispatch, useSelector } from "react-redux";

export default function TripDetail() {
  const { id } = useParams()
  const [tripDetails, setTripDetails] = useState({})
  const { userState } = useContext(UserContext)

  useEffect(() => {
    if (id) {
      //getiing trip history from user profile
      const tripDetail = userState.profile.tripHistory?.find((ele) => ele._id == id)
      console.log(tripDetail, "details");
      if (tripDetail) {
        setTripDetails(tripDetail)
      }
    }
  }, [])

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
                Payment Id : {tripDetails.paymentId}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ width: { md: "50vw", xs: "90vw" } }}>
          <CardContent>
            <Stack>
              <Typography variant="h6">
                Vehicle Model : {tripDetails.vehicleId.model}
              </Typography>
              <Typography variant="h6">
                Vehicel Number : {tripDetails.vehicleId.registrationNumber}
              </Typography>
            </Stack>
            <CardMedia
              component="img"
              height="194"
              image={tripDetails.vehicleId.vehicleImage[0].url}
              alt={tripDetails.vehicleId.model}
            />
          </CardContent>
        </Card>
      </Stack>}
    </div >
  )
}
