import React from 'react'
import { Stack, Card, CardContent, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function TripHistoryContainer(props) {
  const { vehicle } = props
  console.log(vehicle, "WTF");

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
              <TableCell>id</TableCell>
              <TableCell align="right">trip start</TableCell>
              <TableCell align="right">trip ends</TableCell>
              <TableCell align="right">amount</TableCell>
              <TableCell align="right">user</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicle.map((vcl) => (
              <TableRow
                key={vcl._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{vcl._id}</TableCell>
                <TableCell component="th" scope="row">
                  {new Date(vcl.tripStartDate).toLocaleString()}
                </TableCell>
                <TableCell align="right">{new Date(vcl.tripEndDate).toLocaleString()}</TableCell>
                <TableCell align="right">{vcl.amount}</TableCell>
                <TableCell align="right">{vcl.userId.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
