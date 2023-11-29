import React, { useState } from 'react'
import { Button, Modal, Box, Typography, Rating, } from "@mui/material"
import Textarea from '@mui/joy/Textarea';
//react hot toast
import toast, { Toaster } from 'react-hot-toast'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { useDispatch } from 'react-redux';
//use context
import { UserContext } from '../../App'

import { modalStyle } from '../Admin/modalStyle'

import { startAddRating } from '../../actions/ratingAction'

export default function StartTrip(props) {
  const { trip } = props
  console.log(trip, 'trip');
  const [position, setPosition] = useState([])
  const [open, setOpen] = useState(false);
  //rating form
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')
  const { userDispatch } = useContext(UserContext)
  const dispatch = useDispatch()

  console.log(rating);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate()

  const startTripHandle = async () => {
    try {
      const tripResponse = await axios.get(`/api/trips/${trip._id}/start`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })

      if (tripResponse.data !== null) {
        toast.success('Trip Started Successfully..');
        console.log(tripResponse, 'tripResponse');
        userDispatch({ type: "UPDATE_TRIP_STATUS", payload: tripResponse.data })
        navigate(`/hosttripdetails/${trip._id}`)
      } else {
        toast.error("You cannot start your trip 15 minutes prior to the scheduled start time.");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const dashboardHandle = () => {
    navigate(`/hosttripdetails/${trip._id}`)
  }

  const ratingSubmitHandle = (e) => {
    e.preventDefault()
    const formData = {
      rating: rating,
      comment: text,
      vehicleId: trip.vehicleId._id
    }
    dispatch(startAddRating(formData))
    handleClose()
  }

  return (
    <div>
      <Toaster />
      {trip?.tripStatus == "booked" && <Button variant="contained" onClick={startTripHandle}>Start Trip</Button>}
      {trip?.tripStatus == "inprogress" && <Button variant="contained" onClick={dashboardHandle}>dashboard</Button>}
      {trip?.tripStatus == "completed" && <Button variant="contained" onClick={handleOpen}>Give rating</Button>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Rate bike
          </Typography>
          <Box component="form" onSubmit={ratingSubmitHandle}>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <Textarea
              color="primary"
              minRows={2}
              value={text}
              onChange={(e) => setText(e.target.value)}
              size="md"
              placeholder="tell us your experience"
            />
            <Button type='submit' variant='contained' sx={{ marginTop: "20px" }}>Submit</Button>
          </Box>
        </Box>
      </Modal>
      <p>{position.latitude}</p>
    </div>
  )
}
