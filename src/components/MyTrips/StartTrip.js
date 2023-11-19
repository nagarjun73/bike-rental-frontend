import React, { useEffect, useState } from 'react'
import addMinutes from "date-fns/addMinutes";
import { Button } from "@mui/material"
import toast, { Toaster } from 'react-hot-toast'

export default function StartTrip(props) {
  const { tripDetails } = props
  const [position, setPosition] = useState([])

  console.log(new Date(1700401834359));

  const startTripHandle = () => {
    toast.success('Starting trip...');

    navigator.geolocation.watchPosition((position) => {
      console.log(position, "pos");
      const { latitude, longitude } = position.coords
      setPosition([latitude, longitude])
    },
      (error) => {
        console.error(error);
      }
      , {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
  }
  return (
    <div>
      <Toaster />
      <Button variant="contained" onClick={startTripHandle}>Start Trip</Button>
      <p>{position.latitude}</p>
    </div>
  )
}
