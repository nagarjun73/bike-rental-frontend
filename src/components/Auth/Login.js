import { Typography, Button, Stack, FormHelperText, Box, TextField, AlertTitle, Alert } from '@mui/material'
import { useState, useContext } from 'react'
import axios from '../../config/axios'
import { useNavigate, useLocation } from 'react-router-dom'
import validator from 'validator'
import { BgImg, Linked, BoxSX } from './CSS-Styled'
import { UserContext } from '../../App'

import toast, { Toaster } from 'react-hot-toast'


export default function Login(props) {
  const [emailNum, setEmailNum] = useState('')
  const [password, setPassword] = useState('')
  const [clientError, setClientError] = useState({})
  const [serverError, setServerError] = useState({})

  const { userState, userDispatch } = useContext(UserContext)

  const errors = {}

  const navigate = useNavigate()
  const location = useLocation()
  //url history
  const lastUrl = location ? location.state : ''

  //Form Validation Function
  const runValidations = () => {
    //Email/mobileNum validation
    if (emailNum.trim().length === 0) {
      errors.emailNum = "Field should not be empty"
    } else if (emailNum.includes('@')) {
      //Checking valid Email
      if (!validator.isEmail(emailNum)) {
        errors.emailNum = "Invalid Email"
      }
    } else {
      //checking mobile number count
      if (!validator.isLength(emailNum, { min: 10, max: 10 })) {
        errors.emailNum = "Invalid Email or phone number"
      }
    }
    //Password Validation
    if (password.trim().length === 0) {
      errors.password = "Field should not be empty"
    } else if (!validator.isStrongPassword(password)) {
      errors.password = "Invalid Password"
    }
  }

  //Login Handle Function
  const loginHandle = async (e) => {
    try {
      e.preventDefault()

      //Manual Validation
      //running validator funtion to check validaton
      runValidations()

      //check if error is empty
      if (Object.keys(errors).length === 0) {
        //Clearing errors
        setClientError({})
        setServerError({})
        const formData = {
          emailOrMobile: emailNum,
          password
        }

        //api call for login
        toast('Logging in..')
        const result = await axios.post('/api/users/login', formData)
        //clear form
        setEmailNum('')
        setPassword('')

        //saving user token to local storage
        localStorage.setItem('token', result.data.token)

        //getting user account information
        const response = await axios.get('/api/users/account', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        //User
        const user = response.data
        toast.success(`Welocome ${user.name}`)

        //Checking if profile present
        const profile = await axios.get("/api/users/profile", {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        const resProfile = profile.data
        //Checking if prifile verified
        if (resProfile?.isVerified) {
          //if profile verified letting user to login
          const header = {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }
          const user = axios.get('/api/users/account', header)
          const profile = axios.get('/api/users/profile', header)
          const response = await Promise.all([user, profile])
          userDispatch({ type: "LOGIN_USER", payload: response })
          //After dispatching
          //if user came from booking page redirect to booking
          if (lastUrl) {
            navigate(lastUrl)
          } else {
            //else go to Home
            navigate('/')
          }
        } else {
          //check wheather profile has document  submitted
          if (!resProfile?.drivingLicence.length && !resProfile?.documentId.length) {
            //if not navigate to add documenent page
            //Check wheath user is User or Host
            if (user.role === "user") {
              //redirecting to user doc add page with url
              navigate('/verifyDocUser', { state: lastUrl })
              userDispatch({ type: "LOGIN_USER", payload: user })
            } else if (user.role === "host") {
              //redirecting to host doc add page with url
              navigate('/verifyDocHost', { state: lastUrl })
              userDispatch({ type: "LOGIN_USER", payload: user })
            } else if (user.role === "admin") {
              userDispatch({ type: "LOGIN_USER", payload: user })
            }
          } else {
            //alrady submitted docs not verified
            toast('Logged in..')
            navigate('/displaymessage', { state: "Thank you for submitting your documents! We have received them successfully. Please be patient as we verify your documents." })
            userDispatch({ type: "LOGIN_USER", payload: user })
          }
        }
      } else {
        setClientError(errors)
      }
    } catch (err) {
      setServerError(err.response.data)
    }
  }


  return (
    <BgImg >
      <Toaster />
      <Box
        sx={BoxSX}>
        <Typography variant='h4' paddingBottom="30px">
          Login to your Account
        </Typography>
        {/*server error handler*/}
        <form onSubmit={loginHandle}>
          <Stack spacing={2} >
            {serverError.errors &&
              <Alert severity="error" style={{ position: 'sticky', marginBottom: '20px' }}>
                <AlertTitle>Error</AlertTitle>
                {serverError.errors}
              </Alert>}
            <TextField
              label="Email / Number"
              variant="outlined"
              value={emailNum}
              type='text'
              onChange={(e) => setEmailNum(e.target.value)}
              sx={{ backgroundColor: "white" }} />
            {clientError.emailNum && <FormHelperText error>{clientError.emailNum}</FormHelperText>}

            <TextField
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              sx={{ backgroundColor: "white" }} />
            {clientError.password && <FormHelperText error>{clientError.password}</FormHelperText>}

            <Linked to="/signup">
              <Typography variant='h6' color="blue">
                Dont have an account? Click here
              </Typography>
            </Linked>

            <Button type="submit" variant="contained">Login</Button>
          </Stack>
        </form>
      </Box >
    </BgImg >
  )
}