import { Button, Modal, Box, Stack, TextField, TableCell } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { startEditCategory } from '../../../actions/vehicleTypeAction'
import toast, { Toaster } from 'react-hot-toast'
import { startAddCategory } from '../../../actions/adminAction'
import { modalStyle } from '../modalStyle'

//Formik and Yup
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function CategoryForm(props) {
  const { category, button } = props
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  //vehicleTypeValidationSchema
  const vehicleTypeValidationSchema = Yup.object().shape({
    name: Yup.string().required('name is required').max(50, 'name should not exceed 50characters'),
    maxCc: Yup.number().required('maxCc is required'),
    minCc: Yup.number().required('minCc is required'),
    perDayKmLimit: Yup.number().required('per day km limit is required')
      .min(100, "distance should be min 100km")
      .max(300, "distance should not exceed 300km"),
    perDayCharge: Yup.number().required('per day charge is required'),
    perHourCharge: Yup.number().required('per hour charge is required')
  })

  const formik = useFormik({
    initialValues: {
      name: category.name ? category.name : '',
      maxCc: category.maxCc ? category.maxCc : '',
      minCc: category.minCc ? category.minCc : '',
      perDayKmLimit: category.perDayKmLimit ? category.perDayKmLimit : '',
      perDayCharge: category.perDayCharge ? category.perDayCharge : '',
      perHourCharge: category.perHourCharge ? category.perHourCharge : ''
    },
    validationSchema: vehicleTypeValidationSchema,
    validateOnChange: false,
    onSubmit: async (formData, { setFieldError, resetForm }) => {
      const data = {
        name: formData.name,
        maxCc: formData.maxCc,
        minCc: formData.minCc,
        perDayKmLimit: formData.perDayKmLimit,
        perDayCharge: formData.perDayCharge,
        perHourCharge: formData.perHourCharge
      }

      if (button === 'edit') {
        dispatch(startEditCategory(category._id, data))
        toast.success("Category Successfully updated")
        resetForm()
      } else {
        dispatch(startAddCategory(data))
        toast.success("Category Successfully added")
        resetForm()
      }

      setOpen(false)
    }
  })

  const emptyFormData = () => {
    formik.values.name = ''
    formik.values.maxCc = ''
    formik.values.minCc = ''
    formik.values.perDayKmLimit = ''
    formik.values.perDayCharge = ''
    formik.values.perHourCharge = ''
  }


  const editHandleFunction = () => {
    setOpen(true)
    if (Object.keys(category)?.length !== 0) {
    }
  }

  const handleClose = () => {
    setOpen(false)
    if (button == "add") {
      emptyFormData()
    }
  }

  // //form submit Handle
  // const submitButtonHandle = (e) => {
  //   e.preventDefault()
  //   if (button === 'edit') {
  //     dispatch(startEditCategory(category._id, formData))
  //     toast.success("Category Successfully updated")
  //   } else {
  //     dispatch(startAddCategory(formData))
  //     toast.success("Category Successfully added")
  //   }
  //   // clearFormData()
  //   setOpen(false)
  // }


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
          <form onSubmit={formik.handleSubmit} >
            <Stack spacing={2} >
              {/* {serverError.errors &&
                <Alert severity="error" style={{ position: 'sticky', marginBottom: '20px' }}>
                  <AlertTitle>Error</AlertTitle>
                  {serverError.errors}
                </Alert>} */}
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                value={formik.values.name}
                type='text'
                onChange={formik.handleChange}
                error={formik.errors.name && true}
                helperText={formik.errors.name}
                sx={{ backgroundColor: "white" }} />

              <TextField
                label="Min CC"
                variant="outlined"
                name="minCc"
                value={formik.values.minCc}
                type='text'
                onChange={formik.handleChange}
                error={formik.errors.minCc && true}
                helperText={formik.errors.minCc}
                sx={{ backgroundColor: "white" }} />


              <TextField
                label="Max CC"
                name="maxCc"
                variant="outlined"
                value={formik.values.maxCc}
                type='text'
                onChange={formik.handleChange}
                error={formik.errors.maxCc && true}
                helperText={formik.errors.maxCc}
                sx={{ backgroundColor: "white" }} />


              <TextField
                label="Per Day Km Limit"
                variant="outlined"
                name="perDayKmLimit"
                value={formik.values.perDayKmLimit}
                type='text'
                onChange={formik.handleChange}
                error={formik.errors.perDayKmLimit && true}
                helperText={formik.errors.perDayKmLimit}
                sx={{ backgroundColor: "white" }} />


              <TextField
                label="Per Day Charge"
                variant="outlined"
                name="perDayCharge"
                value={formik.values.perDayCharge}
                type='text'
                onChange={formik.handleChange}
                error={formik.errors.perDayCharge && true}
                helperText={formik.errors.perDayCharge}
                sx={{ backgroundColor: "white" }} />


              <TextField
                label="Per Hour Charge"
                variant="outlined"
                name="perHourCharge"
                value={formik.values.perHourCharge}
                type='text'
                onChange={formik.handleChange}
                error={formik.errors.perHourCharge && true}
                helperText={formik.errors.perHourCharge}
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