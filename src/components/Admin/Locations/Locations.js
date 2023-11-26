import { TableContainer, Table, TableRow, TableHead, TableCell, Paper, TableBody, Typography, Button, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
// import CategoryItem from './CategoryItem'

import LocationItem from './LocationItem'
import LocationForm from './LocationForm'


export default function Cities(props) {

  const locationList = useSelector((state) => {
    return state.location.locationList
  })
  return (
    <div>
      <Stack direction="row" padding="20px" justifyContent="space-between">
        <Typography variant='h3' >Locations</Typography>
        <LocationForm location="" button="add" />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>location id</TableCell>
              <TableCell>name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locationList?.map((ele) => (
              <LocationItem key={ele._id} location={ele} />
            ))}

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}