import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, Grid, Stack } from '@mui/material'
import Carousel from 'react-material-ui-carousel'

import { useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../../App'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import axios from '../../config/axios'
import { startBookTrip } from '../../actions/bookingsAction'
import RatingContainer from './RatingContainer'

const VehicleCard = (props) => {
  const { vehicle } = props
  const { userState } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()


  //fuction handles profile verification return true if verified
  const checkUserProfileVerified = async () => {
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
          navigate('/displaymessage', { state: "Your documents are under the verification process. You will be able to book after document verification. Please be patient." })
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const bookingHandleFunction = async (id) => {
    try {
      //Checking user 
      const user = _.isEmpty(userState.user)
      if (!user) {//user present
        //checking user doc verified
        const verifiedProfile = await checkUserProfileVerified(userState.user)
        if (verifiedProfile) {
          //get vehicle by Id
          const query = JSON.parse(localStorage.getItem('query'))

          const bookData = {
            vehicleId: vehicle._id,
            hostId: vehicle.hostId,
            tripStartDate: query.tripStartDate,
            tripEndDate: query.tripEndDate
          }
          //calling dispatch to do api call and book a trip [redux]
          dispatch(startBookTrip(bookData, navigate))
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
    <Grid key={vehicle._id} item xs={12} sm={4} md={3} xl={2}>
      <Box p={2} >
        <Card sx={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;", height: "40vh", borderRadius: "10px" }} >
          <Carousel sx={{ height: "20vh" }} >
            {vehicle.vehicleImage.map((ele) => {
              return (<CardMedia
                component="img"
                alt={vehicle.model}
                height="150"
                key={ele._id}
                image={ele.url}
                sx={{
                  objectFit: "contain",
                  backgroundColor: "#000000",
                  borderRadius: "5px",
                }}
              />)
            }
            )}
          </Carousel>
          <CardContent>
            <Stack direction="row" justifyContent="space-around">
              <Stack>
                <Typography gutterBottom variant="p" component="div">
                  {vehicle.model}
                </Typography>
                <Typography gutterBottom variant="p" component="div">
                  {vehicle.engineCapacity}
                </Typography>
                <Typography gutterBottom variant="p" component="div">
                  Rs {vehicle.vehicleType.perDayCharge}/day
                </Typography>
              </Stack>
              <CardActions>
                <Button
                  size="small"
                  variant='contained'
                  onClick={() => bookingHandleFunction(vehicle._id)}
                >Book</Button>
              </CardActions>
            </Stack>
            <RatingContainer vehicle={vehicle} />
          </CardContent>
        </Card>
      </Box>
    </Grid >
  )
}

export default VehicleCard