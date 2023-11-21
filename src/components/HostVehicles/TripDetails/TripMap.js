import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@mui/material'

//Importing map components
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from 'leaflet'
import { jwtDecode } from 'jwt-decode'
//socket.io
import { io } from 'socket.io-client'

import { useContext } from 'react'
import { UserContext } from '../../../App'

export default function TripMap(props) {
  const { trip } = props
  const { userState, userDispatch } = useContext(UserContext)
  const [position, setPosition] = useState([])
  const user = userState.user

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BASE_URL)
    if (user.role === 'user') {
      if (Object.keys(trip).length !== 0) {
        if (socket.connect) {
          socket.emit("join_room", { userId: trip.userId, tripId: trip.trip._id })
          console.log(trip.trip._id, "USER")
        }
      }

      //Accessing live location 
      navigator.geolocation.watchPosition((position) => {
        socket.emit("position", {
          tripId: trip.trip.Id,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        setPosition([position.coords.latitude, position.coords.longitude])
      },
        (error) => {
          console.error(error);
        }
        , {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
    } else {
      socket.emit('join_room', { hostId: trip.trip.hostId, tripId: trip.trip._id })
      console.log(trip.trip._id, "HOST")
      socket.on("user_position", (data) => {
        console.log(data);
        setPosition([data.data.latitude, data.data.longitude]);
      })
    }
  }, [])



  //creating custom icon
  function icon(iconSize) {
    return L.icon({
      iconUrl: "https://img.icons8.com/emoji/48/motorcycle-emoji.png",
      iconSize: [iconSize]
    })
  }


  return (
    <Card sx={{
      margin: "20px",
      width: { md: "60vw", xs: "90vw" },
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      borderRadius: "15px"
    }} >
      <CardContent >
        {position.length !== 0 ? <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "400px", width: '100%' }}>
          <TileLayer
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
          />
          <Marker position={position} icon={icon(50)}>
            <Popup>
              {user.name}
            </Popup>
          </Marker>
        </MapContainer> : <h3>Location not Available</h3>}
      </CardContent>
    </Card >
  )
}
