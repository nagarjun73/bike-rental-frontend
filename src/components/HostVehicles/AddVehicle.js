import React from 'react'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'

import toast, { Toaster } from 'react-hot-toast';

//import React redux
import { useSelector, useDispatch } from 'react-redux'
import { addVehicle } from '../../actions/vehicleAction'

//Import material ui Components
import { Box, TextField, Stack, styled, Button, Typography, FormControl, InputLabel, Select, OutlinedInput, MenuItem, FormHelperText } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

//Importing Formik and yup
import { useFormik } from 'formik'
import { Field } from 'formik';
import * as Yup from 'yup'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import axios from '../../config/axios'
import { useNavigate } from 'react-router-dom';


// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


export default function AddVehicle() {
  const [vehicleImg, setVehicleImg] = useState([])
  const [rc, setRc] = useState({})
  const [insurance, setInsurance] = useState({})
  const [emission, setEmission] = useState({})

  const [filesError, setFilesError] = useState({})

  console.log(filesError, "Files Error");

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const filesErrors = {}

  const runFilesValidation = () => {
    if (vehicleImg.length === 0) {
      filesError["vehicleImg"] = "Please upload vehicle images"
    }
    if (_.isEmpty(rc)) {
      filesError["rc"] = "Please upload vehicle RC"
    }
    if (_.isEmpty(insurance)) {
      filesError["insurance"] = "Please upload vehicle insurance certificate"
    }
    if (_.isEmpty(insurance)) {
      filesError["emission"] = "Please upload vehicle emission certificate"
    }
  }

  const vehicleTypes = useSelector((state) => {
    return state.vehicleType.vehicleTypesList
  })

  // yup validation
  const addVehicleValidationSchema = Yup.object().shape({
    type: Yup.string().required(),
    model: Yup.string().required(),
    vehicleCategory: Yup.string().required(),
    distanceTravelled: Yup.number().required(),
    registrationNumber: Yup.string().required(),
  })

  //Formik initial states
  const formik = useFormik({
    initialValues: {
      type: "",
      model: "",
      vehicleCategory: "",
      distanceTravelled: "",
      registrationNumber: ""
    },
    validationSchema: addVehicleValidationSchema,
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      runFilesValidation()
      if (_.isEmpty(filesErrors)) {
        try {
          const form = new FormData()
          form.append("type", formData.type)
          form.append("model", formData.model)
          form.append("vehicleType", formData.vehicleCategory)
          form.append("distanceTravelled", formData.distanceTravelled)
          form.append("registrationNumber", formData.registrationNumber)
          vehicleImg.forEach((ele) => form.append("vehicleImage", ele.file))

          //Loopong over files and appending one by one
          Object.entries(rc).forEach(ele => form.append('registrationCertificate', ele[1]))
          Object.entries(insurance).forEach(ele => form.append('insuranceCerificate', ele[1]))
          Object.entries(emission).forEach(ele => form.append('emissionCertificate', ele[1]))
          const response = await axios.post('/api/host/add-vehicle', form, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: localStorage.getItem('token')
            }
          })
          dispatch(addVehicle(response.data.response));
          resetForm()
          navigate('/vehicles')
        } catch (e) {
          console.log(e);
        }
      } else {
        setFilesError(filesErrors)
      }
    }
  })

  //for mui input
  const VisuallyHiddenInput = styled('input')({ height: 1, width: 1 });

  return (
    <Box
      style={{
        backgroundPosition: ' 50% 80%',
        backgroundRepeat: 'no-repeat',
        backgroundColor: "#fafafa",
        marginBottom: "5vh"
      }}
    >
      <Toaster />
      <Typography variant="h1"
        gutterBottom paddingTop="4vh"
        display="flex"
        justifyContent="center"
      >
        Add Vehicle
      </Typography>
      <Box style={{ width: "90vw" }}
        component="form"
        width="60vw"
        display="flex"
        flexDirection="column"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <Stack
          justifyContent="space-evenly"
          flexDirection="row" gap={5}>
          <Stack spacing={2} width="30vw">
            {/* type input */}
            <TextField
              label="type"
              variant="outlined"
              name="type"
              type='text'
              value={formik.values.type}
              onChange={formik.handleChange}
              error={formik.errors.type && true}
              helpertext={formik.errors.type}
              sx={{ backgroundColor: "white" }} />

            {/* Model input */}
            <TextField
              label="model"
              variant="outlined"
              type='text'
              name="model"
              value={formik.values.model}
              onChange={formik.handleChange}
              error={formik.errors.model && true}
              helpertext={formik.errors.model}
              sx={{ backgroundColor: "white" }} />

            {/* Distance travelled */}
            <TextField
              label="distance travelled"
              variant="outlined"
              type='text'
              name="distanceTravelled"
              value={formik.values.distanceTravelled}
              onChange={formik.handleChange}
              error={formik.errors.distanceTravelled && true}
              helpertext={formik.errors.distanceTravelled}
              sx={{ backgroundColor: "white" }} />

            {/* Registration number */}
            <TextField
              label="registration number"
              variant="outlined"
              type='text'
              name="registrationNumber"
              value={formik.values.registrationNumber}
              onChange={formik.handleChange}
              error={formik.errors.registrationNumber && true}
              helpertext={formik.errors.registrationNumber}
              sx={{ backgroundColor: "white" }} />
          </Stack>
          <Stack spacing={4} width="30vw">

            {/* Category Input */}
            <FormControl sx={{ width: 300, paddingTop: "1vh", margin: "0px" }}>
              <InputLabel sx={{ paddingTop: "1vh" }}>range</InputLabel>
              <Select
                sx={{ backgroundColor: 'white' }}
                name="vehicleCategory"
                value={formik.values.vehicleCategory}
                error={formik.errors.vehicleCategory && true}
                onChange={formik.handleChange}
                helpertext={formik.errors.vehicleCategory}
                input={<OutlinedInput label="Name" />}
              >
                {vehicleTypes.map((ele) => (
                  <MenuItem
                    key={ele._id}
                    value={ele._id}
                  >
                    {ele.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Registration certificate */}
            <Button
              component="label"
              variant="outlined"
              margin="0px"
              startIcon={<CloudUploadIcon />}
              onChange={(e) => setRc(e.target.files)}
            >
              Upload RC
              <VisuallyHiddenInput type="file" multiple name="registrationCertificate" />
            </Button>
            {rc.length ? <FormHelperText style={{ color: "#03AC13", margin: "0px" }} > registration certificate uploaded</FormHelperText> : <FormHelperText style={{ color: "red", margin: "0px" }} >{filesError.rc}</FormHelperText>}


            {/* Insurance Certificate */}
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              onChange={(e) => setInsurance(e.target.files)}
              sx={{ marginTop: "0px" }}
            >
              Upload Insurance
              <VisuallyHiddenInput type="file" name="insuranceCertificate" multiple />
            </Button>
            {insurance.length ? <FormHelperText style={{ color: "#03AC13", margin: "0px" }} >insurance certificate uploaded</FormHelperText> : <FormHelperText style={{ color: "red", margin: "0px" }} >{filesError.insurance}</FormHelperText>}


            {/* Emission Certificate */}
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              onChange={(e) => setEmission(e.target.files)}
            >
              Upload Emission
              <VisuallyHiddenInput name="emissionCertificate" type="file" multiple />
            </Button>
            {emission.length ? <FormHelperText style={{ color: "#03AC13", margin: "0px" }} >emission certificate uploaded</FormHelperText> : <FormHelperText style={{ color: "red", margin: "0px" }} >{filesError.emission}</FormHelperText>}
          </Stack>
        </Stack>
        {/* Vehicle Images */}
        <Box
          paddingX="12vw"
        >
          <Typography
            display='flex'
            justifyContent='center'
            paddingY="3vh"
            variant='h4'>upload vehicle images</Typography>
          <FilePond
            files={vehicleImg}
            onupdatefiles={setVehicleImg}
            allowMultiple={true}
            maxFiles={3}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
          {vehicleImg.length !== 0 ? <FormHelperText style={{ color: "#03AC13", margin: "0px" }} >vehicle images uploaded</FormHelperText> : <FormHelperText style={{ color: "red", margin: "0px" }} >{filesError.vehicleImg}</FormHelperText>}
        </Box>
        <Button type='submit' variant="contained" sx={{ width: "20vw", margin: "auto" }}>
          Add Vehicle
        </Button>
      </Box>
    </Box >
  )
}
