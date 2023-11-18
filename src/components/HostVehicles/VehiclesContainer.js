import { useSelector } from "react-redux"
import VehicleItem from "./VehicleItem"
import { Grid, Box, Button } from "@mui/material"

export default function VehiclesContainer() {
  const vehicles = useSelector((state) => {
    return state.vehicle.hostVehicles
  })

  return (
    <Box padding="3vh" sx={{ backgroundColor: "#fafafa", height: "90vh" }}>
      <Grid container spacing={1}>
        {vehicles.map((ele) => {
          return (<VehicleItem key={ele._id} vehicle={ele} />)
        })}
      </Grid>
    </Box>
  )
}
