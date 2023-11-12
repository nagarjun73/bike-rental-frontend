import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, Grid } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../../App'
import { useContext } from 'react'
import _ from 'lodash'
import axios from '../../config/axios'

const VehicleCard = (props) => {
  const { vehicle } = props
  const { userState } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()

  const checkUserProfileVerified = async () => {
    //TODO should save profile to state to check verification or api call and check
    try {
      const profile = await axios.get("/api/users/profile", {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      if (profile?.data.isVerified) {
        return true
      } else {
        if (profile.data.drivingLicence?.length === 0 && profile.data.drivngLicence?.length === 0) {
          navigate('/verifyDocUser')
        } else {
          navigate('/DisplayMessage', { state: "Your documents are under the verification process. You will be able to book after document verification. Please be patient." })
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const bookingHandleFunction = async () => {
    try {
      //Checking user 
      const user = _.isEmpty(userState.user)
      if (!user) {//user present
        //checking user doc verified
        const verifiedProfile = await checkUserProfileVerified(userState.user)
        if (verifiedProfile) {
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