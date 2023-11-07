import { useSelector } from 'react-redux'
import { Grid, Box, CircularProgress, Button, Typography } from '@mui/material'
import { Card, CardActions, CardContent, CardMedia } from '@mui/material'

export default function VehicleResult() {
  const searchedVehicles = useSelector((state) => {
    return state.vehicle.searchedVehicles
  })
  return (
    <Box sx={{ maxWidth: "75vw" }} >
      {searchedVehicles.length ?
        <Grid container spacing={4}>
          {searchedVehicles.map((ele) => {
            return <Grid key={ele._id} item xs={3}>
              <Card>
                <CardContent>
                  <CardMedia>
                    <img src={ele.vehicleImage[0].url} alt={ele.model} style={{ height: '10vh', width: "20vw" }} />
                  </CardMedia>
                  <Typography gutterBottom variant="h5" component="div">
                    {ele.model}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Book</Button>
                </CardActions>
              </Card>
            </Grid>
          })
          }
        </Grid>
        :
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      }
    </Box>
  )
}