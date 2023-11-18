import React from 'react'
import { Stack, Card, CardContent, Typography, Button } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

export default function TripHistoryContainer(props) {
  const { vehicle } = props
  const navigate = useNavigate()

  const handleTripDetails = (id) => {
    navigate(`/hosttripdetails/${id}`)
  }

  return (
    <Card sx={{
      minWidth: "60vw",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      borderRadius: "15px"
    }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >start date</TableCell>
              <TableCell >end date</TableCell>
              <TableCell >amount</TableCell>
              <TableCell >user</TableCell>
              <TableCell ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicle.map((vcl) => (
              <TableRow
                key={vcl._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {new Date(vcl.tripStartDate).toLocaleString()}
                </TableCell>
                <TableCell >{new Date(vcl.tripEndDate).toLocaleString()}</TableCell>
                <TableCell >Rs {vcl.amount}</TableCell>
                <TableCell >{vcl.userId.name}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleTripDetails(vcl._id)}>Detail</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
