import { TableRow, TableCell, Button } from '@mui/material'
import CategoryForm from './CategoryForm'
import { useDispatch } from 'react-redux'
import { startDeleteCategory } from '../../../actions/vehicleTypeAction'
export default function CategoryItem(props) {
  const { category } = props
  const dispatch = useDispatch()


  const handleDelete = () => {
    const check = window.confirm('do you really want to delete?')
    if (check) {
      dispatch(startDeleteCategory(category._id))
    }
  }

  return (
    <TableRow
      key={category._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {category._id}
      </TableCell>
      <TableCell >{category.name}</TableCell>
      <TableCell >{category.minCc}</TableCell>
      <TableCell >{category.maxCc}</TableCell>
      <TableCell >{category.perDayKmLimit} Km</TableCell>
      <TableCell >Rs {category.perDayCharge}</TableCell>
      <TableCell >Rs {category.perHourCharge}</TableCell>
      <TableCell align='center' >
        <CategoryForm category={category} button="edit" />
      </TableCell>
      <TableCell ><Button variant='contained' onClick={handleDelete}>Delete</Button></TableCell>
    </TableRow>
  )
}