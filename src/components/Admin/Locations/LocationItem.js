import { TableRow, TableCell, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import LocationForm from './LocationForm'
import { startDeleteCity } from '../../../actions/locationAction'

export default function LocationItem(props) {
  const { location } = props
  const dispatch = useDispatch()

  const handleDelete = () => {
    const check = window.confirm('do you really want to delete?')
    if (check) {
      dispatch(startDeleteCity(location._id))
    }
  }

  return (
    <TableRow
      key={location._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {location._id}
      </TableCell>
      <TableCell>{location.name}</TableCell>
      <TableCell>
        <LocationForm location={location} button="edit" />
      </TableCell>
      <TableCell ><Button variant='contained' onClick={handleDelete}>Delete</Button></TableCell>
    </TableRow>
  )
}