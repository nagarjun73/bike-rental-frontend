import React, { useEffect, useState } from 'react'

//importing @mui
import { Box, Stack } from '@mui/material'

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
      {vehicle &&
        < Stack flexDirection="row" justifyContent="space-evenly" paddingTop="5vh">
          <DetailsContainer vehicle={vehicle} />
          <TripHistoryContainer />
        </Stack>}
    </Box >
  )
}
