import React, { useEffect, useState } from 'react'

//importing @mui
import { Box, Stack, Typography, Button } from '@mui/material'

import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import DetailsContainer from './DetailsContainer';
import TripHistoryContainer from './TripHistoryContainer';

export default function VehicleDetail() {
  const { id } = useParams()
  const allVehicles = useSelector((state) => {
    return state.vehicle.hostVehicles
  })

  const vehicle = allVehicles.find((ele) => ele._id === id)

  return (
    <Box>
      <Typography variant='h2' paddingLeft="4vw" paddingTop="2vh">Vehicle Details</Typography>
      {
        vehicle &&
        < Stack
          gap={2}
          justifyContent="space-evenly"
          padding="5vh"
          sx={{ flexDirection: { sx: "column", md: "row", lg: "row" } }}
        >
          <DetailsContainer vehicle={vehicle} />
          <TripHistoryContainer vehicle={vehicle.trips} />
        </Stack>
      }
    </Box >
  )
}
