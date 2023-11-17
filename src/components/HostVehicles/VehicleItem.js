import { Card, CardMedia, CardContent, Typography, CardActions, Button, Grid } from "@mui/material"

export default function VehicleItem(props) {
  const { vehicle } = props
  console.log(vehicle);

  return (
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 320 }}>
        <CardMedia
          component="img"
          alt={vehicle.model}
          height="200"
          image={vehicle.vehicleImage[0].url}
          sx={{ objectFit: "contain", backgroundColor: "#000000" }}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {vehicle.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {vehicle.registrationNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary"> Approval status :
            {vehicle.vehicleApproveStatus ? "Approved" : "Not approved"}
          </Typography>
          <Typography variant="body2" color="text.secondary">Vehicle status :
            {vehicle.availability ? "Available" : "Not available"}
            <Button>Switch</Button>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained">Detail</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
