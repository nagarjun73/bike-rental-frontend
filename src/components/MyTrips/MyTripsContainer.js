import { Typography, Card, CardContent, Grid, Stack, Button } from '@mui/material';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'


const MyTripsPage = () => {
  const { userState } = useContext(UserContext)
  const navigate = useNavigate()

  const detailsHandleFunction = (id) => {
    navigate()
  }

  return (
    <div style={{ backgroundColor: "#fafafa" }} >
      <Typography variant="h3" gutterBottom textAlign="center" padding="20px">
        My Trips
      </Typography>
      <Grid container spacing={2}>
        {userState.myBookings.reverse().map((trip) => (
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
        ))}
      </Grid>
    </div >
  );
};

export default MyTripsPage;
