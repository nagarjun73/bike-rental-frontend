import { Typography, TableRow, TableCell, Grid, Stack, Button, } from '@mui/material';
import { useNavigate } from 'react-router-dom'

export default function MyTripsListItem(props) {
  const { trip } = props

  const navigate = useNavigate()

  const detailsHandleFunction = (id) => {
    navigate(`/tripdetail/${id}`)
  }

  return (
    <TableRow>
      <TableCell align="center">{trip._id}</TableCell>
      <TableCell align="center">{new Date(trip.createdAt).toLocaleString()}</TableCell>
      <TableCell align="center">{trip.vehicleId.model}({trip.vehicleId.registrationNumber})</TableCell>
      <TableCell align="center">{trip.amount}</TableCell>
      <TableCell align="center" sx={{ color: trip.tripStatus === "inprogress" && 'success.main' }} >{trip.tripStatus}</TableCell>
      <TableCell align="center">
        <Button variant='contained' onClick={() => detailsHandleFunction(trip._id)}>
          Details
        </Button>
      </TableCell>
    </TableRow>
  )
}


