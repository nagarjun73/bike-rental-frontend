import React from 'react'
import { Card, CardActions, CardContent, Button, Typography, Box, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { startUpdatePayment } from '../../actions/paymentAction'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import { useContext } from 'react'

export default function PaymentSuccess() {
  const [bkgDetails, setBkgDetails] = useState({})
  const { userDispatch } = useContext(UserContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const updatesResponse = (data) => {
    userDispatch({ type: "UPDATE_TRIP", payload: data })
    setBkgDetails(data)
  }

  useEffect(() => {
    const stripId = localStorage.getItem('stripId')
    if (stripId) {
      dispatch(startUpdatePayment(stripId, updatesResponse))
    }
  }, [])

  //Homepage button handle
  const homepageButtonHandle = () => {
    navigate('/')
  }

  return (
    <div>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: "90vh",
        backgroundColor: "#fafafa"
      }}>
        {Object.keys(bkgDetails).length !== 0 ?
          <Card sx={{ width: '50vw' }} >
            <CardContent sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <Typography gutterBottom variant="h4" component="div" >
                Payment Successful
              </Typography>
              <Box>
                <Typography gutterBottom variant="h6" component="div">
                  Trip Starts At : {new Date(bkgDetails.tripStartDate).toLocaleString()}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Trip Ends At : {new Date(bkgDetails.tripEndDate).toLocaleString()}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  PaymentId : {bkgDetails.paymentId}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Amount Paid : {bkgDetails.amount}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Status : {bkgDetails.tripStatus}
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
                onClick={homepageButtonHandle}
              > go to home page</Button>
            </CardActions>
          </Card>
          : (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          )}
      </Box>
    </div>
  )
}
