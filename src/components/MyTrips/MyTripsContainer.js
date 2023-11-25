import { Typography, Chip, Stack, Button, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@mui/material';
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

    {/* table */}
    <TableContainer component={Paper} sx={{ overflow: 'auto', width: "90vw", margin: 'auto' }}>
      <Table sx={{ minWidth: 65 }} size="medium" aria-label="a dense table">
        <TableHead >
          <TableRow >
            <TableCell align="center">Trip Id</TableCell>
            <TableCell align="center">Booking Date</TableCell>
            <TableCell align="center">Bike Name</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trips?.map((trip) => (
            <MyTripsListItem key={trip._id} trip={trip} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    <Stack direction="row" justifyContent="center" gap="3vw" marginTop="2vh" >
      <Button variant='contained' disabled={pageNo === 0 && true} onClick={handlePrevPage}>Prev</Button>
      <Chip label={pageNo + 1} />
      <Button variant='contained' disabled={trips.length !== 5 && true} onClick={handleNextPage}>Next</Button>
    </Stack>
  </div >
  );
};

export default MyTripsPage;
