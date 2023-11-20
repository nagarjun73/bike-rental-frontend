import React, { useEffect, useState } from 'react'
import addMinutes from "date-fns/addMinutes";
import { Button } from "@mui/material"
//react hot toast
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

export default function StartTrip(props) {
  const { trip } = props
  console.log(trip, "sovkk");
  const [position, setPosition] = useState([])
  const navigate = useNavigate()

  const startTripHandle = () => {
    toast.success('Starting trip...');
    navigate(`/hosttripdetails/${trip._id}`)
  }
  return (
    <div>
      <Toaster />
      <Button variant="contained" onClick={startTripHandle}>Start Trip</Button>
      <p>{position.latitude}</p>
    </div>
  )
}
