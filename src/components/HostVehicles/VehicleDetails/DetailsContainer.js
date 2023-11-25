import React from 'react'
import { Button, Stack, Card, CardContent, Typography, CardMedia } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import { useDispatch } from 'react-redux'
import { startEnableVehicle } from '../../../actions/vehicleAction'

export default function DetailsContainer(props) {
  const { vehicle } = props

  const dispatch = useDispatch()

  const enableVehicleHandle = (id) => {
    if (vehicle.availability === true) {
      dispatch(startEnableVehicle(id, false))
    } else {
      dispatch(startEnableVehicle(id, true))
    }
  }

  return (
    <Card sx={{
      minWidth: "30vw",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      borderRadius: "15px"
    }} >
      <CardContent >
        <Stack>
          <Carousel>
            {vehicle.vehicleImage.map((ele) => {
              return (<CardMedia
                component="img"
                alt={vehicle.model}
                height="200"
                key={ele._id}
                image={ele.url}
                sx={{
                  objectFit: "contain",
                  backgroundColor: "#000000",
                  borderRadius: "10px"
                }}
              />)
            }
            )}
          </Carousel>
          <Stack flexDirection="column">
            <Typography variant='h5'>{vehicle.model}</Typography>
            <Typography variant='p'>{vehicle.registrationNumber}</Typography>
            <Typography variant='p'>{vehicle.distanceTravelled} Kms</Typography>
            <Typography variant='p'>Approve status : {vehicle.vehicleApproveStatus ? "Approved" : "waiting for approval"}</Typography>
            <Typography variant='p'> {vehicle.availability ? "Available" : "locked"}</Typography>
            <Button variant='contained' sx={{ marginTop: "15px" }} onClick={() => enableVehicleHandle(vehicle._id)} >{vehicle.availability ? "Disable vehicle" : "Enable Vehicle"}</Button>
            <Button variant='contained' sx={{ marginTop: "15px" }} onClick={() => enableVehicleHandle(vehicle._id)} >{"Edit Vehicle"}</Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
