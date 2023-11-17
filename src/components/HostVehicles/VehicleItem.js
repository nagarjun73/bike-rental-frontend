import React from 'react'
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Grid, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom";
import Carousel from 'react-material-ui-carousel'


export default function VehicleItem(props) {
  const { vehicle } = props
  const navigate = useNavigate()
  console.log(vehicle);

  const handleViewButton = (id) => {
    navigate(`/vehicledetail/${id}`)
  }

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card sx={{ maxWidth: 300, height: 350 }}>
        <Carousel>
          {vehicle.vehicleImage.map((ele) => {
            return (<CardMedia
              component="img"
              alt={vehicle.model}
              height="200"
              image={ele.url}
              sx={{ objectFit: "contain", backgroundColor: "#000000" }}
            />)
          })}
        </Carousel>

        <Stack flexDirection="row">
          <CardContent>
            <Typography variant="h5" component="div">
              {vehicle.model}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {vehicle.registrationNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {vehicle.vehicleApproveStatus ? "Approved" : "Not approved"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {vehicle.availability ? "Available" : "Not available"}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" onClick={() => handleViewButton(vehicle._id)}>view</Button>
          </CardActions>
        </Stack>
      </Card>
    </Grid>
  )
}
