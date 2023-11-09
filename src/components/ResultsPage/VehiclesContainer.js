import { useSelector } from 'react-redux'
import { Grid, Box, CircularProgress } from '@mui/material'

import VehicleCard from './VehicleCard'

export default function VehiclesContainer() {
  const searchedVehicles = useSelector((state) => {
    return state.vehicle.searchedVehicles
  })
  return (
    <Box sx={{ maxWidth: "80vw" }} >
      {searchedVehicles.length ?
        <Grid container spacing={1}>
          {searchedVehicles.map((ele) => {
            return <VehicleCard key={ele._id} vehicle={ele} />
          })}
        </Grid>
        :
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      }
    </Box >
  )
}