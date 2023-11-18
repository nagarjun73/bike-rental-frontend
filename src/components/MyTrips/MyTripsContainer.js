import { Typography, CircularProgress, Grid, Box } from '@mui/material';
import MyTripsListItem from './MyTripsListItem';
import { UserContext } from '../../App';
import { useContext } from 'react';


const MyTripsPage = () => {
  const { userState } = useContext(UserContext)
  const trips = userState.profile.tripHistory

  return (< div style={{ backgroundColor: "#fafafa" }
  } >
    <Typography variant="h3" gutterBottom textAlign="center" padding="20px">
      My Trips
    </Typography>
    <Grid container spacing={2}>
      {trips?.reverse().map((trip) => (
        <MyTripsListItem key={trip._id} trip={trip} />
      ))}
    </Grid>
  </div >
  );
};

export default MyTripsPage;
