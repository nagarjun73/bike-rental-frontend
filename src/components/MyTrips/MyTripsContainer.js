import { Typography, CircularProgress, Grid, Box } from '@mui/material';
import MyTripsListItem from './MyTripsListItem';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { useSelector } from "react-redux";


const MyTripsPage = () => {
  const { userState } = useContext(UserContext)
  const isLoading = useSelector((state) => {
    return state.booking.isLoading
  })


  return (< div style={{ backgroundColor: "#fafafa" }
  } >
    <Typography variant="h3" gutterBottom textAlign="center" padding="20px">
      My Trips
    </Typography>
    <Grid container spacing={2}>
      {userState.myBookings.map((trip) => (
        <MyTripsListItem key={trip._id} trip={trip} />
      ))}
    </Grid>
  </div >
  );
};

export default MyTripsPage;
