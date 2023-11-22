import { Button, Modal, Box, Stack, TextField, TableCell } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { startEditCategory } from '../../../actions/vehicleTypeAction'
import toast, { Toaster } from 'react-hot-toast'

export default function CategoryForm(props) {
  const { category } = props
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

  console.log(formData);

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
    if (Object.keys(category).length !== 0) {
      setDefaultFormData()
    }
  }

  const handleClose = () => {
    setOpen(false)
    clearFormData()
  }

  const submitButtonHandle = (e) => {
    e.preventDefault()
    dispatch(startEditCategory(category._id, formData))
    toast.success("Category Successfully updated")
    clearFormData()
    setOpen(false)
  }


  return (
    <div>
      <Toaster />
      <Button variant='contained' onClick={editHandleFunction} >
        edit
      </Button>

      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: '80vw' }}>
          <h2 id="parent-modal-title">Edit Category</h2>
          <form onSubmit={submitButtonHandle}>
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

          <Button variant='contained' onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  )
}