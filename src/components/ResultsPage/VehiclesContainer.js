import { useSelector } from 'react-redux'
import { Grid, Box, CircularProgress } from '@mui/material'

import VehicleCard from './VehicleCard'

export default function VehiclesContainer() {
  const vehicle = useSelector((state) => {
    return state.vehicle
  })

  return (
    <Box >
      {vehicle.isLoading == false ?
        vehicle.searchedVehicles.length !== 0 ? <Grid container spacing={1}>
          {vehicle.searchedVehicles.map((ele) => {
            return <VehicleCard key={ele._id} vehicle={ele} />
          })}
        </Grid> : <h1>No vehicle found</h1>
        :
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      }
    </Box >
  )
}