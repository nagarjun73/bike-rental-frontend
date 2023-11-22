import { TableContainer, Table, TableRow, TableHead, TableCell, Paper, TableBody, Typography, } from '@mui/material'
import { useSelector } from 'react-redux'
import CategoryItem from './CategoryItem'


export default function VehicleCategory(props) {
  const vehicleCategories = useSelector((state) => {
    return state.adminData.vehicleCategories
  })
  return (
    <div>
      <Typography variant='h3' padding="20px">Vehicle Category</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>category id</TableCell>
              <TableCell >name</TableCell>
              <TableCell >min CC</TableCell>
              <TableCell >max CC</TableCell>
              <TableCell >Per Day Km Limit</TableCell>
              <TableCell >Per Day Charge</TableCell>
              <TableCell >Per Hour Charge</TableCell>
              <TableCell align='center' >Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicleCategories?.map((ele) => (
              <CategoryItem category={ele} key={ele._id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}