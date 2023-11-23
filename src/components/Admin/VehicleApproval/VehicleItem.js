import { Button, Modal, Box, Stack, TableRow, TableCell } from '@mui/material'
import ImageComp from '../ImageComp'
import { startApproveVehicle, startRejecteVehicle } from '../../../actions/adminAction'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { modalStyle } from '../modalStyle'

export default function VehicleItem(props) {
  const { vehicle } = props
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()


  //View & approve Approve Handle
  const approvebuttonHandle = (id) => {
    console.log("approved");
    dispatch(startApproveVehicle(id))
    setOpen(false);
  }

  //View & approve Reject Handle
  const rejectbuttonHandle = (id) => {
    dispatch(startRejecteVehicle(id))
    setOpen(false);
  }

  return (
    <TableRow
      key={vehicle._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {vehicle._id}
      </TableCell>
      <TableCell >{vehicle.model}</TableCell>
      <TableCell >{vehicle.hostId.name}</TableCell>
      <TableCell >{vehicle.registrationNumber}</TableCell>
      <TableCell >{vehicle.type}</TableCell>
      <TableCell align='center' >
        <Button variant='contained' onClick={() => setOpen(true)} >
          open & approve
        </Button>
        <Modal
          open={open}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...modalStyle, width: '80vw' }}>
            <h2 id="parent-modal-title">{vehicle.name}</h2>
            <Box sx={{ margin: 'auto' }}>
              <ImageComp
                docs={{
                  registartionCertificate: vehicle.registartionCertificate,
                  insuranceCerificate: vehicle.insuranceCerificate,
                  emissionCertificate: vehicle.emissionCertificate
                }} />
            </Box>
            <Stack spacing={2} direction="row" justifyContent='center'>
              <Button variant='contained' onClick={() => setOpen(false)}>Close</Button>
              <Button variant='contained' onClick={() => rejectbuttonHandle(vehicle._id)}>Reject</Button>
              <Button variant='contained' onClick={() => approvebuttonHandle(vehicle._id)}>Approve</Button>
            </Stack>
          </Box>
        </Modal>
      </TableCell>
    </TableRow>
  )
}