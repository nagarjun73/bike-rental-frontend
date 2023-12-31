import React, { useEffect } from 'react'
import { Card, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableFooter, Box, FormControl, Select, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

import TablePaginationActions from './TablePaginationActions'

export default function TripHistoryContainer(props) {
  const { vehicle } = props
  const [page, setPage] = useState(0)
  const [sort, setSort] = useState(-1)
  const [filtered, setFilterd] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    if (sort === -1) {
      const vehicleFilterd = vehicle.sort((a, b) => {
        return new Date(b.tripStartDate) - new Date(a.tripStartDate)
      })
      setFilterd(vehicleFilterd)
    } else if (sort === 1) {
      const vehicleFilterd = vehicle.sort((a, b) => {
        return new Date(a.tripStartDate) - new Date(b.tripStartDate)
      })
      setFilterd(vehicleFilterd)
    }
  }, [sort])


  const navigate = useNavigate()

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filtered.length) : 0;

  const handleTripDetails = (id) => {
    navigate(`/hosttripdetails/${id}`)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card sx={{
      minWidth: "60vw",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      borderRadius: "15px"
    }}>

      {/* Sorting */}
      <Box marginLeft="2vw" >
        <FormControl variant="standard" >
          <Select
            id="demo-simple-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value={-1}>Oldest First</MenuItem>
            <MenuItem value={1}>Recent First</MenuItem>
          </Select>
        </FormControl>
      </Box>



      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >start date</TableCell>
              <TableCell >end date</TableCell>
              <TableCell >status</TableCell>
              <TableCell >user</TableCell>
              <TableCell ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filtered
            ).map((vcl) => (
              <TableRow
                key={vcl._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {new Date(vcl.tripStartDate).toLocaleString()}
                </TableCell>
                <TableCell >{new Date(vcl.tripEndDate).toLocaleString()}</TableCell>
                <TableCell >{vcl.userId.name}</TableCell>
                <TableCell >{vcl.tripStatus}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleTripDetails(vcl._id)}>Detail</Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={filtered.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Card>
  )
}
