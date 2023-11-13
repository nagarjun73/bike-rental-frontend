import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, Grid } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../../App'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import axios from '../../config/axios'
import { startBookTrip } from '../../actions/bookingsAction'

const VehicleCard = (props) => {
  const { vehicle } = props
  const { userState } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  //fuction handles profile verification return true if verified
  const checkUserProfileVerified = async () => {
    //TODO should save profile to state to check verification or api call and check
    try {
      //api reqest to check profile details
      const profile = await axios.get("/api/users/profile", {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      //if profile verified return true
      if (profile?.data.isVerified) {
        return true
      } else {
        //if not verified check if docs sbmitted or not
        if (profile.data.drivingLicence?.length === 0 && profile.data.drivngLicence?.length === 0) {
          //if not redirect to doc verify page
          navigate('/verifyDocUser')
        } else {
          //if submitted redirect to message page to wait for verification
          navigate('/DisplayMessage', { state: "Your documents are under the verification process. You will be able to book after document verification. Please be patient." })
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const bookingHandleFunction = async (id) => {
    console.log(id)
    try {
      //Checking user 
      const user = _.isEmpty(userState.user)
      if (!user) {//user present
        //checking user doc verified
        const verifiedProfile = await checkUserProfileVerified(userState.user)
        if (verifiedProfile) {
          //get vehicle by Id
          const query = JSON.parse(localStorage.getItem('query'))
          console.log(typeof query)

          const bookData = {
            vehicleId: vehicle._id,
            hostId: vehicle.hostId,
            tripStartDate: query.tripStartDate,
            tripEndDate: query.tripEndDate
          }
          //calling dispatch to do api call and book a trip [redux]
          console.log(bookData)
          dispatch(startBookTrip(bookData))


          //TODO should i send obj or not
          //navigate to booking details page for payment
          navigate('/BookingDetails')
        }
      } else {
        //token not present so navigating to Login page
        navigate('/Login', { state: location.pathname })
      }
    } catch (e) {
      console.log(e)
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
                onClick={() => bookingHandleFunction(vehicle._id)}
              >Book</Button>
            </CardActions>
          </Box>
        </Card>
      </Box>
    </Grid>
  )
}

export default VehicleCard