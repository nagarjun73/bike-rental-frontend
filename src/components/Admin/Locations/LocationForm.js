import { Button, Modal, Box, Stack, TextField, TableCell } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { modalStyle } from '../modalStyle'
import { startEditLocation } from '../../../actions/locationAction'
import { startAddLocation } from '../../../actions/locationAction'

export default function LocationForm(props) {
  const { location, button } = props
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const dispatch = useDispatch()


  //Edit handle function
  const editHandleFunction = () => {
    setOpen(true)
    if (Object.keys(location)?.length !== 0) {
      setName(location.name)
    }
  }


  //handle close
  const handleClose = () => {
    setOpen(false)
    if (button == "add") {
    }
  }

  //submitFormHandle
  const submitFormHandle = (e) => {
    e.preventDefault()
    const formData = {
      name: name
    }
    if (button === 'edit') {
      dispatch(startEditLocation(formData, location._id))
      setName('')
    } else {
      dispatch(startAddLocation(formData))
    }
    setOpen(false)
  }


  return (
    <Box>
      {/* <Toaster /> */}
      <Button variant='contained' onClick={editHandleFunction} >
        {button}
      </Button>

      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...modalStyle, width: '50vw' }}>
          <h2 id="parent-modal-title">{button} city</h2>
          <form onSubmit={submitFormHandle}  >
            <Stack spacing={2} >
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                value={name}
                type='text'
                onChange={(e) => setName(e.target.value)}
                // error={formik.errors.name && true}
                // helperText={formik.errors.name}
                sx={{ backgroundColor: "white" }} />
              <Button type="submit" variant="contained">submit</Button>
            </Stack>
          </form>

          <Button variant='contained' onClick={handleClose} sx={{
            marginTop: "10px",
            width: "100%"
          }}>Close</Button>
        </Box>
      </Modal>
    </Box>
  )
}