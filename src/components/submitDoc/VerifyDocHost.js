import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Stack, FormHelperText, Box, TextField, AlertTitle, Alert, styled, Paper } from '@mui/material'
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from '../../config/axios';
import _ from 'lodash'
import { useSelector } from 'react-redux';

function VerifyDocHost() {
  const [address, setAddress] = useState({
    street: "",
    area: "",
    state: "",
    pincode: ""
  })
  const [location, setLocation] = useState('')
  const [drivingLicence, setDrivingLicence] = useState([])
  const [documentId, setDocumentId] = useState([])
  const [clientError, setClientError] = useState({})
  const [serverError, setServerError] = useState({})
  const errors = {}

  const locations = useSelector((state) => {
    return state.location.locationList
  })

  const navigate = useNavigate()

  const runValidation = () => {

    if (drivingLicence.length === 0) {
      errors.drivingLicence = "Upload your driving Licence"
    }
    if (documentId.length === 0) {
      errors.documentId = "upload your ID"
    }

  }

  //for mui input
  const VisuallyHiddenInput = styled('input')({ height: 1, width: 1 });

  //function handles uploading files
  const uploadDocumentsHandle = async (e) => {
    e.preventDefault()
    runValidation()
    try {
      const formData = new FormData()
      Object.entries(address).forEach(([key, value]) => formData.append(key, value))
      formData.append("address", address)
      formData.append('city', location)
      //Loopong over files and appending one by one
      Object.entries(drivingLicence).forEach(ele => formData.append('drivingLicence', ele[1]))
      Object.entries(documentId).forEach(ele => formData.append('documentId', ele[1]))

      // !how to send nested object from front end to backend and validation

      const response = await axios.post('/api/host/add-doc', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token')
        }
      })
      // TODO:FIX THIS 
      console.log(response);
      navigate('/DisplayMessage', { state: response.data.msg })
    } catch (err) {
      console.log(err)
      setServerError(err)
    }
  }

  return (
    <Box>
      <Typography variant='h4' padding="30px" textAlign='center'>
        Document Verification
      </Typography>
      {/*server error handler*/}
      {_.size(serverError) ? (<Alert severity="error"
        style={{
          position: 'sticky',
          marginBottom: '5vh',
          width: '40vw',
          margin: 'auto'
        }}>
        <AlertTitle>Error</AlertTitle>
        {serverError.msg}
      </Alert>) : ''}
      <form style={{
        width: "100vw",
        display: 'flex',
        justifyContent: 'center',
        gap: '5vw'
      }}
        onSubmit={uploadDocumentsHandle}
      >
        <Stack spacing={2} flexDirection="row" justifyContent='space-evenly' sx={{ width: '60vw' }} >

          <Stack spacing={2}>
            <TextField
              label="Building, Street Name"
              variant="outlined"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              type='text'
              sx={{ backgroundColor: "white" }} />
            {/* {clientError.password && <FormHelperText   error>{clientError.password}</FormHelperText>} */}

            <TextField
              label="Area, colony"
              variant="outlined"
              value={address.area}
              onChange={(e) => setAddress({ ...address, area: e.target.value })}
              type='text'
              sx={{ backgroundColor: "white" }} />
            {/* {clientError.password && <FormHelperText   error>{clientError.password}</FormHelperText>} */}

            <TextField
              label="State"
              variant="outlined"
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              type='text'
              sx={{ backgroundColor: "white" }} />
            {/* {clientError.password && <FormHelperText   error>{clientError.password}</FormHelperText>} */}

            <TextField
              label="Pin code"
              variant="outlined"
              value={address.pincode}
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
              type='number'
              sx={{ backgroundColor: "white" }} />
            {/* {clientError.password && <FormHelperText   error>{clientError.password}</FormHelperText>} */}
          </Stack>
          <Stack spacing={2} justifyContent="space-between" margin="0px !important  ">

            <FormControl >
              <InputLabel id="demo-multiple-name-label">City</InputLabel>
              <Select
                sx={{ backgroundColor: 'white' }}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                input={<OutlinedInput label="Name" />}
              >
                {locations.map((ele) => (
                  <MenuItem
                    key={ele._id}
                    value={ele._id}
                  >
                    {ele.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {clientError.location && <FormHelperText error>{clientError.location}</FormHelperText>}


            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              onChange={(e) => setDrivingLicence(e.target.files)}
            >
              Upload Driving Licence
              <VisuallyHiddenInput type="file" multiple />
            </Button>
            <FormHelperText style={{ color: "#03AC13" }} >{_.size(drivingLicence) ? "Driving Licence uploaded" : ""}</FormHelperText>

            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              onChange={(e) => setDocumentId(e.target.files)}
            >
              Upload ID
              <VisuallyHiddenInput type="file" multiple />
            </Button>
            <FormHelperText style={{ color: "#03AC13" }} >{_.size(documentId) ? "ID uploaded" : ""}</FormHelperText>

            <Button type="submit" variant="contained">Submit</Button>
          </Stack>
        </Stack>
      </form>
    </Box >
  )
}

export default VerifyDocHost
