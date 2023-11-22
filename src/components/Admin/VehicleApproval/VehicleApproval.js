import { TableContainer, Table, TableRow, TableHead, TableCell, Paper, TableBody, Typography, } from '@mui/material'
import { useSelector } from 'react-redux'
import VehicleItem from './VehicleItem'

export default function VehicleApproval(props) {
  const unApprVehicles = useSelector((state) => {
    return state.adminData.unApprVehicles
  })

  return (
    <div>
      <Typography variant='h3' padding="20px">Vehicle Approval</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>vehicle id</TableCell>
              <TableCell >Vehicle model</TableCell>
              <TableCell >Host name</TableCell>
              <TableCell >Reg No</TableCell>
              <TableCell >type</TableCell>
              <TableCell align='center' >Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {unApprVehicles?.map((ele) => (
              <VehicleItem vehicle={ele} key={ele._id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}