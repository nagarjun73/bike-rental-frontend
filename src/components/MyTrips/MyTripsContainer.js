import { Typography, Chip, Grid, Stack, Button, Card } from '@mui/material';
import MyTripsListItem from './MyTripsListItem';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { startGetMyTrips } from '../../actions/bookingsAction'

const MyTripsPage = () => {
  const [pageNo, setPageNo] = useState(0)
  const [sort, setSort] = useState(-1)
  const trips = useSelector((state) => {
    return state.booking.userTrips
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetMyTrips(pageNo, sort))
  }, [pageNo])

  const handlePrevPage = () => {
    if (pageNo !== 0) {
      setPageNo(pageNo - 1)
    }
  }

  const handleNextPage = () => {
    setPageNo(pageNo + 1)
  }


  return (< div style={{ backgroundColor: "#fafafa", height: "90vh" }
  } >
    <Typography variant="h3" gutterBottom textAlign="center" padding="20px">
      My Trips
    </Typography>
    <Grid container >
      {trips?.map((trip) => (
        <MyTripsListItem key={trip._id} trip={trip} />
      ))}
    </Grid>
    <Stack direction="row" justifyContent="center" gap="3vw" marginTop="2vh" >
      <Button variant='contained' disabled={pageNo === 0 && true} onClick={handlePrevPage}>Prev</Button>
      <Chip label={pageNo + 1} />
      <Button variant='contained' disabled={trips.length !== 5 && true} onClick={handleNextPage}>Next</Button>
    </Stack>
  </div >
  );
};

export default MyTripsPage;
