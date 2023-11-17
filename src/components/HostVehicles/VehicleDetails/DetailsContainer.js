import React from 'react'
import { Box, Stack, Card, CardContent, Typography, CardMedia } from '@mui/material'
import Carousel from 'react-material-ui-carousel'

export default function DetailsContainer(props) {
  const { vehicle } = props

  return (
    <Card sx={{ minWidth: "45vw", boxShadow: "0px 0px 2px black" }} >
      <CardContent >
        <Stack>
          <Typography variant='h3'>Details</Typography>
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
            <Typography variant='p'>{vehicle.model}</Typography>
            <Typography variant='p'>{vehicle.registrationNumber}</Typography>
            <Typography variant='p'>{vehicle.distanceTravelled} Kms</Typography>
            <Typography variant='p'> {vehicle.availability ? "Available" : "Booked"}</Typography>
            <Typography variant='p'>Approve status : {vehicle.vehicleApproveStatus ? "Approved" : "not Approved"}</Typography>
            <Typography variant='p'>Details</Typography>
            <Typography variant='p'>Details</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
