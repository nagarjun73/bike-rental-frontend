import { useSelector } from 'react-redux'
import { Grid, Box, CircularProgress, Button, Typography } from '@mui/material'
import { Card, CardActions, CardContent, CardMedia } from '@mui/material'

export default function VehiclesContainer() {
  const searchedVehicles = useSelector((state) => {
    return state.vehicle.searchedVehicles
  })
  return (
    <Box sx={{ maxWidth: "80vw" }} >
      {searchedVehicles.length ?
        <Grid container spacing={1}>
          {searchedVehicles.map((ele) => {
            return <Grid key={ele._id} item xs={6} sm={3}>
              <Box p={2} >
                <Card >
                  <CardMedia>
                    <img src={ele.vehicleImage[0].url} alt={ele.model} style={{ height: '20vh', width: "20vw" }} />
                  </CardMedia>
                  <CardContent sx={{ display: 'flex', justifyContent: "space-around" }}>
                    <Typography gutterBottom variant="p" component="div">
                      {ele.model}
                    </Typography>
                    <Typography gutterBottom variant="p" component="div">
                      {ele.engineCapacity}
                    </Typography>
                  </CardContent>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                  }}>
                    <Typography gutterBottom variant="p" component="div">
                      {ele.engineCapacity}
                    </Typography>
                    <CardActions>
                      <Button size="small" variant='contained'>Book</Button>
                    </CardActions>
                  </Box>
                </Card>
              </Box>
            </Grid>
          })
          }
        </Grid>
        :
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      }
    </Box >
  )
}