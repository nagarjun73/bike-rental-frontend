import React, { useEffect, useState, useContext } from 'react'
import { Button, Modal, Box, Stack, TextField } from '@mui/material'
import { modalStyle } from '../Admin/modalStyle'
import { UserContext } from '../../App'
import axios from '../../config/axios'
import toast, { Toaster } from 'react-hot-toast'

export default function EditProfileForm(props) {
  const { uname, number } = props
  const { userState, userDispatch } = useContext(UserContext)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [formError, setFormError] = useState({})

  useEffect(() => {
    if (uname && number) {
      setName(uname)
      setPhone(number)
    }
  }, [open])

  const errors = {}
  const runValidators = () => {
    if (name === "") {
      errors.name = "Name should not be Empty"
    }

    if (phone === "") {
      errors.phone = "Number should not be empty"
    } else if (phone.length !== 10) {
      errors.phone = "Number should be 10 digits"
    }
  }

  //Edit handle function
  const editHandleFunction = () => {
    setOpen(true)
  }

  //handle close
  const handleClose = () => {
    setOpen(false)
  }

  //form submission
  const submitButtonHandle = async (e) => {
    e.preventDefault()

    runValidators()

    if (Object.keys(errors).length === 0) {
      setFormError({})
      const formData = {
        name, phone
      }
      try {
        const response = await axios.put('/api/users/edit-user', formData, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        userDispatch({ type: "EDIT_USER", payload: response.data })
        setOpen(false)
        toast.success("Profile Updated")
      } catch (e) {
        console.log(e);
      }
    } else {
      setFormError(errors)
    }

  }

  return (
    <Box>
      <Toaster />
      <Button variant='contained' onClick={editHandleFunction} >
        Edit
      </Button>

      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...modalStyle, width: '50vw' }}>
          <h2 id="parent-modal-title">Edit Profile</h2>
          <form onSubmit={submitButtonHandle}  >
            <Stack spacing={2} >
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                value={name}
                type='text'
                onChange={(e) => setName(e.target.value)}
                error={formError.name && true}
                helperText={formError.name}
                sx={{ backgroundColor: "white" }} />

              <TextField
                label="phone number"
                variant="outlined"
                name="phoneNumber"
                value={phone}
                type='number'
                onChange={(e) => setPhone(e.target.value)}
                error={formError.phone && true}
                helperText={formError.phone}
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
