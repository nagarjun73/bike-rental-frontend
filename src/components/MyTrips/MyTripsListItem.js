import { Typography, Card, CardContent, Grid, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setLoadingTrue } from '../../actions/bookingsAction';

export default function MyTripsListItem(props) {
  const { trip } = props

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const detailsHandleFunction = (id) => {
    navigate(`/tripdetail/${id}`)
    dispatch(setLoadingTrue())
  }

  return (
    <Grid item xs={12} sm={12} md={12} key={trip._id}>
      <Card>
        <CardContent>
          <Stack
            flexDirection={{ xs: 'column', sm: 'row' }}
            justifyContent="space-evenly"
            padding="auto" >
            <Typography color="textSecondary">
              Start Date: {new Date(trip.tripStartDate).toLocaleString()}
            </Typography>
            <Typography color="textSecondary">
              End Date: {new Date(trip.tripEndDate).toLocaleString()}
            </Typography>
            <Typography color="textSecondary">
              Amount: {trip.amount}
            </Typography>
            <Typography color="textSecondary">
              Status: {trip.tripStatus}
            </Typography>
            <Button variant='contained' onClick={() => detailsHandleFunction(trip._id)}>
              Details
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  )
}
