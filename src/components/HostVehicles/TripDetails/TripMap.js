import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@mui/material'

//Importing map components
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from 'leaflet'
import { jwtDecode } from 'jwt-decode'
//socket.io
import { io } from 'socket.io-client'

export default function TripMap(props) {
  const { trip } = props
  const [position, setPosition] = useState([])
  console.log(position);

  useEffect(() => {
    const socket = io('http://localhost:3044')
    const role = jwtDecode(localStorage.getItem('token')).role
    if (role == 'user') {
      if (Object.keys(trip)) {
        if (socket.connect) {
          socket.emit("join_room", { userId: trip.userId, tripId: trip._id })
          // socket.emit("tripStartMsg". { msg:})
        }
      }

      navigator.geolocation.watchPosition((position) => {
        console.log(position, "pos");
        socket.volatile.emit("position", {
          tripId: trip.Id,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
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
      socket.emit('join_room', { userId: trip.hostId, tripId: trip._id })
      socket.on("user_position", (data) => {
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
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={icon(50)}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer> : <h3>Location not Available</h3>}
      </CardContent>
    </Card >
  )
}
