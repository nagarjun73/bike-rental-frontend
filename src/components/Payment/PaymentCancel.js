import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startDistroyPayment } from '../../actions/paymentAction'
import { useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography, Box, CircularProgress } from '@mui/material'


export default function PaymentCancel() {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    const stripId = localStorage.getItem('stripId')
    if (stripId) {
      dispatch(startDistroyPayment(stripId))
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

        <Card sx={{ width: '50vw' }} >
          <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Typography gutterBottom variant="h4" component="div" >
              Payment Failed
            </Typography>
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
      </Box>
    </div>
  )
}
