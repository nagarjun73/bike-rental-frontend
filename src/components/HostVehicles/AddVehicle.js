import React from 'react'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'

//import React redux
import { useSelector } from 'react-redux'

//Import material ui Components
import { Box, TextField, Stack, styled, Button, Typography, FormControl, InputLabel, Select, OutlinedInput, MenuItem } from '@mui/material'
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


// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


export default function AddVehicle() {
  const [vehicleImg, setVehicleImg] = useState([])
  const [rc, setRc] = useState({})
  const [insurance, setInsurance] = useState({})
  const [emission, setEmission] = useState({})

  const [filesError, setFilesError] = useState({})

  const filesErrors = {}
  console.log(filesErrors);

  console.log(vehicleImg, rc, insurance, emission);

  const runFilesValidation = () => {
    if (vehicleImg.length === 0) {
      filesErrors["vehicleImg"] = "Please upload vehicle images"
    }
    if (_.isEmpty(rc) === false) {
      filesErrors["rc"] = "Please upload vehicle RC"
    }
    if (_.isEmpty(insurance) === false) {
      filesErrors["insurance"] = "Please upload vehicle insurance certificate"
    }
    if (_.isEmpty(insurance) === false) {
      filesErrors["emission"] = "Please upload vehicle emission certificate"
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
      // runFilesValidation()
      if (_.isEmpty(filesErrors)) {
        console.log("--------------no val");
        try {
          const form = new FormData()
          form.append("type", formData.type)
          form.append("model", formData.model)
          form.append("vehicleCategory", formData.vehicleCategory)
          form.append("registrationNumber", formData.registrationNumber)
          vehicleImg.forEach((ele) => form.append("vehicleImage", ele.file))
          console.log("----1------");

          //Loopong over files and appending one by one
          Object.entries(rc).forEach(ele => form.append('registrationCertificate', ele[1]))
          Object.entries(insurance).forEach(ele => form.append('insuranceCerificate', ele[1]))
          Object.entries(emission).forEach(ele => form.append('emissionCertificate', ele[1]))
          console.log("----2------");
          const response = await axios.post('/api/host/add-vehicle', form, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: localStorage.getItem('token')
            }
          })
          console.log(response);
          resetForm()

        } catch (e) {
          console.log(e);
        }
      } else {
        console.log("-----------Error");
        setFilesError(filesErrors)
      }
      // console.log(formData, files);
    }
  })

  //for mui input
  const VisuallyHiddenInput = styled('input')({ height: 1, width: 1 });

  return (
    <Box
      style={{
        backgroundPosition: ' 50% 80%',
        backgroundRepeat: 'no-repeat',
        backgroundColor: "#fafafa"
      }}
    >
      <Typography variant="h1"
        gutterBottom paddingTop="4vh"
        display="flex"
        justifyContent="center"
      >
        Add Vehicle
      </Typography>
      <Box style={{ width: "100vw" }}
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
              helperText={formik.errors.type}
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
              helperText={formik.errors.model}
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
              helperText={formik.errors.distanceTravelled}
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
              helperText={formik.errors.registrationNumber}
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
                onChange={formik.handleChange}
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
              startIcon={<CloudUploadIcon />}
              onChange={(e) => setRc(e.target.files)}
            >
              Upload RC
              <VisuallyHiddenInput type="file" multiple name="registrationCertificate" />
            </Button>
            {/* <FormHelperText style={{ color: "#03AC13" }} >{_.size(drivingLicence) ? "Driving Licence uploaded" : ""}</FormHelperText> */}

            {/* Insurance Certificate */}
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              onChange={(e) => setInsurance(e.target.files)}
            >
              Upload Insurance
              <VisuallyHiddenInput type="file" name="insuranceCertificate" multiple />
            </Button>
            {/* <FormHelperText style={{ color: "#03AC13" }} >{_.size(drivingLicence) ? "Driving Licence uploaded" : ""}</FormHelperText> */}


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
            {/* <FormHelperText style={{ color: "#03AC13" }} >{_.size(drivingLicence) ? "Driving Licence uploaded" : ""}</FormHelperText> */}
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
            variant='h4' >upload vehicle images</Typography>
          <FilePond
            files={vehicleImg}
            onupdatefiles={setVehicleImg}
            allowMultiple={true}
            maxFiles={3}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
        </Box>
        <Button type='submit'>
          Add Vehicle
        </Button>
      </Box>
    </Box >
  )
}
