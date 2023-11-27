import { Button, Modal, Box, Stack, TableRow, TableCell } from '@mui/material'
import ImageComp from '../ImageComp'
import { startApproveProfile, startDeleteRejected } from '../../../actions/adminAction'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { modalStyle } from '../modalStyle'

export default function ProfileItem(props) {
  const { profile } = props
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  //View & approve Open
  const handleOpen = () => {
    setOpen(true);
  };


  //View & approve Approve Handle
  const approvebuttonHandle = (id) => {
    console.log("approved");
    dispatch(startApproveProfile(id))
    setOpen(false);
  }

  //View & approve Reject Handle
  const rejectbuttonHandle = (id) => {
    dispatch(startDeleteRejected(id))
    setOpen(false);
  }

  return (
    <TableRow
      key={profile._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: "10vh" }}
    >
      <TableCell component="th" scope="row">
        {profile.userId._id}
      </TableCell>
      <TableCell >{profile.userId.name}</TableCell>
      <TableCell >{profile.userId.email}</TableCell>
      <TableCell >{profile.userId.mobileNumber}</TableCell>
      <TableCell >{profile.userId.role}</TableCell>
      <TableCell align='center' >
        <Button variant='contained' onClick={handleOpen} >
          open & approve
        </Button>
        <Modal
          open={open}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...modalStyle, width: '80vw' }}>
            <h2 id="parent-modal-title">{profile.userId.name}</h2>
            <Box sx={{ margin: 'auto' }}>
              <ImageComp
                docs={{
                  documentId: profile.documentId,
                  drivingLicence: profile.drivingLicence,
                }} />
            </Box>
            <Stack spacing={2} direction="row" justifyContent='center'>
              <Button variant='contained' onClick={() => setOpen(false)}>close</Button>
              <Button variant='contained' onClick={() => rejectbuttonHandle(profile._id)}>Reject</Button>
              <Button variant='contained' onClick={() => approvebuttonHandle(profile._id)}>Approve</Button>
            </Stack>
          </Box>
        </Modal>
      </TableCell>
    </TableRow>
  )
}