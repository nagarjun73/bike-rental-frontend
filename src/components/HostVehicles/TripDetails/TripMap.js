import React, { useState } from 'react'
import { Box, Stack, Card, CardContent, Typography, CardMedia } from '@mui/material'

//Importing map components
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from 'leaflet'

export default function TripMap() {

  const [position, setPosition] = useState([])

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords
    setPosition([latitude, longitude])
  })


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
      minWidth: "30vw",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      borderRadius: "15px"
    }} >
      <CardContent >
        {position.length !== 0 && <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "400px", width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={icon(50)}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>}
      </CardContent>
    </Card >
  )
}
