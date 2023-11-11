import { Typography, Button, Stack, FormHelperText, Box, TextField, AlertTitle, Alert } from '@mui/material'
import { useState, useContext } from 'react'
import axios from '../../config/axios'
import { useNavigate, useLocation } from 'react-router-dom'
import validator from 'validator'
import { BgImg, Linked, BoxSX } from './CSS-Styled'
import { UserContext } from '../../App'


export default function Login(props) {
  const [emailNum, setEmailNum] = useState('')
  const [password, setPassword] = useState('')
  const [clientError, setClientError] = useState({})
  const [serverError, setServerError] = useState({})

  const { userDispatch } = useContext(UserContext)

  const errors = {}

  const navigate = useNavigate()
  const location = useLocation()
  //url history
  const lastUrl = location ? location.state : ''

  const runValidations = () => {
    if (emailNum.trim().length === 0) {
      errors.emailNum = "Field should not be empty"
    } else if (emailNum.includes('@')) {
      if (!validator.isEmail(emailNum)) {
        errors.emailNum = "Invalid Email"
      }
    } else {
      if (!validator.isLength(emailNum, { min: 10, max: 10 })) {
        errors.emailNum = "Invalid Email or phone number"
      }
    }
    if (password.trim().length === 0) {
      errors.password = "Field should not be empty"
    } else if (!validator.isStrongPassword(password)) {
      errors.password = "Invalid Password"
    }
  }

  const loginHandle = async (e) => {
    try {
      e.preventDefault()

      //Manual Validation
      //running validator funtion to check validaton
      runValidations()

      //check if error is empty
      if (Object.keys(errors).length === 0) {
        setClientError({})
        setServerError({})
        const formData = {
          emailOrMobile: emailNum,
          password
        }

        //api call for login
        const result = await axios.post('/api/users/login', formData)

        setEmailNum('')
        setPassword('')

        //saving user token to local storage
        localStorage.setItem('token', result.data.token)

        const response = await axios.get('/api/users/account', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })

        userDispatch({ type: "LOGIN_USER", payload: response.data })


        //if user came from booking page his query is saved in local storage
        if (lastUrl) {
          navigate(lastUrl)
        } else {
          //else go to booking page
          navigate('/')
        }
      } else {
        setClientError(errors)
      }
    } catch (e) {
      setServerError(e.response.data)
    }
  }


  return (
    <BgImg >
      <Box
        sx={BoxSX}>
        <Typography variant='h4' paddingBottom="30px">
          Login to your Account
        </Typography>
        {/*server error handler*/}
        <form style={{ width: "30vw" }} onSubmit={loginHandle}>
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