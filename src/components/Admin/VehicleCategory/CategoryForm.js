import { Button, Modal, Box, Stack, TextField, TableCell } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { startEditCategory } from '../../../actions/vehicleTypeAction'
import toast, { Toaster } from 'react-hot-toast'
import { startAddCategory } from '../../../actions/adminAction'
import { modalStyle } from '../modalStyle'

export default function CategoryForm(props) {
  const { category, button } = props
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    maxCc: '',
    minCc: '',
    perDayKmLimit: '',
    perDayCharge: '',
    perHourCharge: ''
  })
  const dispatch = useDispatch()


  //SET default data from category
  const setDefaultFormData = () => {
    setFormData({
      name: category.name,
      maxCc: category.maxCc,
      minCc: category.minCc,
      perDayKmLimit: category.perDayKmLimit,
      perDayCharge: category.perDayCharge,
      perHourCharge: category.perHourCharge
    })
  }

  //clear form  data
  const clearFormData = () => {
    setFormData({
      name: "",
      maxCc: "",
      minCc: "",
      perDayKmLimit: "",
      perDayCharge: "",
      perHourCharge: ""
    })
  }


  const editHandleFunction = () => {
    setOpen(true)
    if (Object.keys(category)?.length !== 0) {
      setDefaultFormData()
    }
  }

  const handleClose = () => {
    setOpen(false)
    clearFormData()
  }

  //form submit Handle
  const submitButtonHandle = (e) => {
    e.preventDefault()
    if (button === 'edit') {
      dispatch(startEditCategory(category._id, formData))
      toast.success("Category Successfully updated")
    } else {
      dispatch(startAddCategory(formData))
      toast.success("Category Successfully added")
    }
    clearFormData()
    setOpen(false)
  }


  return (
    <Box>
      <Toaster />
      <Button variant='contained' onClick={editHandleFunction} >
        {button}
      </Button>

      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...modalStyle, width: '50vw' }}>
          <h2 id="parent-modal-title">{button} Category</h2>
          <form onSubmit={submitButtonHandle} >
            <Stack spacing={2} >
              {/* {serverError.errors &&
                <Alert severity="error" style={{ position: 'sticky', marginBottom: '20px' }}>
                  <AlertTitle>Error</AlertTitle>
                  {serverError.errors}
                </Alert>} */}
              <TextField
                label="Name"
                variant="outlined"
                value={formData.name}
                type='text'
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                sx={{ backgroundColor: "white" }} />
              {/* {clientError.emailNum && <FormHelperText error>{clientError.emailNum}</FormHelperText>} */}

              <TextField
                label="Min CC"
                variant="outlined"
                value={formData.minCc}
                type='text'
                onChange={(e) => setFormData({ ...formData, minCc: e.target.value })}
                sx={{ backgroundColor: "white" }} />
              {/* {clientError.emailNum && <FormHelperText error>{clientError.emailNum}</FormHelperText>} */}


              <TextField
                label="Max CC"
                variant="outlined"
                value={formData.maxCc}
                type='text'
                onChange={(e) => setFormData({ ...formData, maxCc: e.target.value })}
                sx={{ backgroundColor: "white" }} />
              {/* {clientError.emailNum && <FormHelperText error>{clientError.emailNum}</FormHelperText>} */}


              <TextField
                label="Per Day Km Limit"
                variant="outlined"
                value={formData.perDayKmLimit}
                type='text'
                onChange={(e) => setFormData({ ...formData, perDayKmLimit: e.target.value })}
                sx={{ backgroundColor: "white" }} />
              {/* {clientError.emailNum && <FormHelperText error>{clientError.emailNum}</FormHelperText>} */}


              <TextField
                label="Per Day Charge"
                variant="outlined"
                value={formData.perDayCharge}
                type='text'
                onChange={(e) => setFormData({ ...formData, perDayCharge: e.target.value })}
                sx={{ backgroundColor: "white" }} />
              {/* {clientError.emailNum && <FormHelperText error>{clientError.emailNum}</FormHelperText>} */}


              <TextField
                label="Per Hour Charge"
                variant="outlined"
                value={formData.perHourCharge}
                type='text'
                onChange={(e) => setFormData({ ...formData, perHourCharge: e.target.value })}
                sx={{ backgroundColor: "white" }} />
              {/* {clientError.emailNum && <FormHelperText error>{clientError.emailNum}</FormHelperText>} */}
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