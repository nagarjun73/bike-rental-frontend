import { Typography, Button, Stack, FormHelperText, Box, TextField, AlertTitle, Alert } from '@mui/material'
import { useState } from 'react'
import { Linked, BoxSXSignup, BgImgSignup } from './CSS-Styled'
import axios from '../../config/axios'
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useNavigate } from 'react-router-dom'

//importing formik and yup
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Signup(props) {
  const [serverError, setServerError] = useState({})
  const navigate = useNavigate()

  //Validation using Yup
  const signupValidationSchema = Yup.object().shape({
    name: Yup
      .string()
      .required('Name is required'),
    email: Yup
      .string()
      .required('Email is required')
      .email('Please enter valid Email '),
    mobileNumber: Yup
      .number()
      .required('Mobile Number is required'),
    role: Yup
      .string()
      .required('Role is required')
      //only user and host allowed 
      .oneOf(['user', 'host'], "Invalid role"),
    password: Yup
      .string()
      .required('Password is required')
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup
      .string()
      .required('Confirm password is required')
      //taking refernce and value inside array is valid in that field
      .oneOf([Yup.ref('password'), null], 'Password must match')
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNumber: "",
      role: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: signupValidationSchema,
    validateOnChange: false,
    onSubmit: async (formData, { setFieldError, resetForm }) => {
      const data = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        role: formData.role,
        password: formData.password
      }
      try {
        const response = await axios.post('/api/users/register', data)
        console.log(response)
        resetForm()
        navigate('/login')
      } catch (e) {
        setServerError(e.response.data)
      }
    }
  })

  return (
    <BgImgSignup >
      <Box
        sx={BoxSXSignup}>
        <Typography variant='h4' paddingBottom="8vh">
          Signup to your Account
        </Typography>
        {/*server error handler*/}
        <Box style={{ width: "80vw" }} component="form" onSubmit={formik.handleSubmit} noValidate >
          <Stack sx={{ flexDirection: "row" }} gap='5vw' sm={{ flexDirection: "column" }} >
            {serverError.errors &&
              <Alert severity="error" style={{ position: 'sticky', marginBottom: '20px' }}>
                <AlertTitle>Error</AlertTitle>
                {serverError.errors}
              </Alert>}
            <Stack spacing={2} width="20vw" >
              <TextField
                label="Full Name"
                variant="outlined"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.errors.name && true}
                helperText={formik.errors.name}
                sx={{ backgroundColor: "white" }} />

              <TextField
                label="Email"
                variant="outlined"
                type='email'
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email && true}
                helperText={formik.errors.email}
                sx={{ backgroundColor: "white" }} />

              <TextField
                label="Mobile Number"
                variant="outlined"
                type='number'
                name="mobileNumber"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
                error={formik.errors.mobileNumber && true}
                helperText={formik.errors.mobileNumber}
                sx={{ backgroundColor: "white" }} />

            </Stack>

            <Stack spacing={2} width="20vw">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Choose who you are</FormLabel>
                <RadioGroup
                  row
                  value={formik.values.role}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel name="role" value="user" selected control={<Radio />} label="User" />
                  <FormControlLabel name="role" value="host" control={<Radio />} label="Agency" />
                </RadioGroup>
                {formik.errors.role && <FormHelperText error>{formik.errors.role}</FormHelperText>}
              </FormControl>

              <TextField
                label="Password"
                variant="outlined"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                type='password'
                error={formik.errors.password && true}
                helperText={formik.errors.password}
                sx={{ backgroundColor: "white" }} />

              <TextField
                label="Confirm Password"
                variant="outlined"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                type='password'
                error={formik.errors.confirmPassword && true}
                helperText={formik.errors.confirmPassword}
                sx={{ backgroundColor: "white" }} />
            </Stack>
          </Stack>
          <Linked to="/login">
            <Typography variant='h6' color="blue">
              Already have an account? Click here
            </Typography>
          </Linked>
          <Button type="submit" variant="contained">SignUp</Button>
        </Box>
      </Box >
    </BgImgSignup >
  )
}