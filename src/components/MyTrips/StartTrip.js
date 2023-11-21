import React, { useEffect, useState } from 'react'
import addMinutes from "date-fns/addMinutes";
import { Button } from "@mui/material"
//react hot toast
import toast, { Toaster } from 'react-hot-toast'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../../config/axios';

//use context
import { UserContext } from '../../App'

export default function StartTrip(props) {
  const { trip } = props
  console.log(trip, "sovkk");
  const [position, setPosition] = useState([])
  const { userState, userDispatch } = useContext(UserContext)

  const navigate = useNavigate()

  const startTripHandle = async () => {
    try {
      const tripResponse = await axios.get(`/api/trips/${trip._id}/start`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      toast.success('Trip Started Successfully..');
      console.log(tripResponse, 'tripResponse');
      userDispatch({ type: "UPDATE_TRIP_STATUS", payload: tripResponse.data })
      navigate(`/hosttripdetails/${trip._id}`)
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <Toaster />
      <Button variant="contained" onClick={startTripHandle}>Start Trip</Button>
      <p>{position.latitude}</p>
    </div>
  )
}
