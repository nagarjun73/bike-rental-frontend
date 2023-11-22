import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Stack, FormHelperText, Box, TextField, AlertTitle, Alert, styled, Paper } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from '../../config/axios';
import _ from 'lodash'

function VerifyDocUser() {
  const [drivingLicence, setDrivingLicence] = useState([])
  const [documentId, setDocumentId] = useState([])
  const [clientError, setClientError] = useState({})
  const [serverError, setServerError] = useState({})
  const errors = {}
  const navigate = useNavigate()

  const runValidations = () => {
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
    try {
      runValidations()
      if (Object.keys(errors).length === 0) {
        setClientError({})
        setServerError({})
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
        //redirecting success message
        navigate('/displaymessage', { state: response.data.msg })
      } else {
        setClientError(errors)
      }
    } catch (err) {
      console.log(err)
      setServerError(err)
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: "90vh"
    }} >
      <Typography variant='h4' paddingBottom="30px">
        Document Verification
      </Typography>
      {/*server error handler*/}
      <form style={{ width: "30vw" }}
        onSubmit={uploadDocumentsHandle}
      >
        <Stack spacing={2}>
          {_.size(serverError) ? (<Alert severity="error" style={{ position: 'sticky', marginBottom: '20px' }}>
            <AlertTitle>Error</AlertTitle>
            {serverError.response.data.msg}
          </Alert>) : ''}

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
          {clientError.drivingLicence && <FormHelperText error>{clientError.drivingLicence}</FormHelperText>}

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
          {clientError.documentId && <FormHelperText error>{clientError.documentId}</FormHelperText>}

          <Button type="submit" variant="contained">Submit</Button>
        </Stack>
      </form>
    </Box>
  )
}

export default VerifyDocUser
