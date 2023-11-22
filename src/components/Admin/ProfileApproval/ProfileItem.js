import { Button, Modal, Box, Stack, TableRow, TableCell } from '@mui/material'
import ImageComp from './ImageComp'
import { startApproveProfile, startDeleteRejected } from '../../../actions/profilesAction'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

export default function ProfileItem(props) {
  const { profile } = props
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  //modal style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

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
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
          <Box sx={{ ...style, width: '80vw' }}>
            <h2 id="parent-modal-title">{profile.userId.name}</h2>
            <Stack direction="row">
              <ImageComp images={profile.documentId} />
              <ImageComp images={profile.drivingLicence} />
            </Stack>
            <Button variant='contained' onClick={() => rejectbuttonHandle(profile._id)}>Reject</Button>
            <Button variant='contained' onClick={() => approvebuttonHandle(profile._id)}>Approve</Button>
          </Box>
        </Modal>
      </TableCell>
    </TableRow>
  )
}