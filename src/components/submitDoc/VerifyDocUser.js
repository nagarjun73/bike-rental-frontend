import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Stack, FormHelperText, Box, TextField, AlertTitle, Alert, styled, Paper } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from '../../config/axios';
import _ from 'lodash'

function VerifyDocUser() {
  const [drivingLicence, setDrivingLicence] = useState([])
  const [documentId, setDocumentId] = useState([])
  const [serverError, setServerError] = useState({})

  const navigate = useNavigate()


  //for mui input
  const VisuallyHiddenInput = styled('input')({ height: 1, width: 1 });

  //function handles uploading files
  const uploadDocumentsHandle = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      //Loopong over files and appending one by one
      Object.entries(drivingLicence).map(ele => formData.append('drivingLicence', ele[1]))
      Object.entries(documentId).map(ele => formData.append('documentId', ele[1]))

      const response = await axios.post('/api/users/add-doc', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token')
        }
      })
      console.log(response);
      navigate('/DisplayMessage', { state: response.data.msg })
    } catch (err) {
      setServerError(err)
    }
  }

  return (
    <Box>
      <Typography variant='h4' paddingBottom="30px">
        Document Verification
      </Typography>
      {/*server error handler*/}
      <form style={{ width: "30vw" }}
        onSubmit={uploadDocumentsHandle}
      >
        <Stack spacing={2} >
          {_.size(serverError) ? (<Alert severity="error" style={{ position: 'sticky', marginBottom: '20px' }}>
            <AlertTitle>Error</AlertTitle>
            {serverError.msg}
          </Alert>) : ''}
          {/* <TextField
            label="Email / Number"
            variant="outlined"
            // value={emailNum}
            type='text'
            // onChange={(e) => setEmailNum(e.target.value)}
            sx={{ backgroundColor: "white" }} /> */}
          {/* {clientError.emailNum && <FormHelperText error>{clientError.emailNum}</FormHelperText>} */}

          {/* <TextField
            label="Password"
            variant="outlined"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            type='password'
            sx={{ backgroundColor: "white" }} /> */}
          {/* {clientError.password && <FormHelperText   error>{clientError.password}</FormHelperText>} */}

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

          {/* <Linked to="/signup">
            <Typography variant='h6' color="blue">
              Dont have an account? Click here
            </Typography>
          </Linked> */}

          <Button type="submit" variant="contained">Submit</Button>
        </Stack>
      </form>
    </Box>
  )
}

export default VerifyDocUser
