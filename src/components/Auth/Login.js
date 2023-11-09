import { Typography, Button, Stack, FormHelperText, Box, TextField } from '@mui/material'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from '../../config/axios'
import { useNavigate } from 'react-router-dom'

//Styled CSS
const BgImg = styled.div`
  background-image: url("https://bikerentals6.s3.ap-south-1.amazonaws.com/frontend/Login-image.svg");
  background-position: 90% 50%;
  background-repeat: no-repeat;
`;

const Linked = styled(Link)`
  text-decoration: none;
`;

const BoxSX = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '90vh',
  alignItems: 'start',
  paddingLeft: "15vw"
}

export default function Login(props) {
  const [emailNum, setEmailNum] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})
  console.log(error)

  const navigate = useNavigate()

  const errors = {}

  const runValidations = () => {
    if (emailNum.trim().length === 0) {
      errors.emailNum = "Field should not be empty"
    }
    if (password.trim().length === 0) {
      errors.password = "Field should not be empty"
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
        setError({})
        const formData = {
          emailOrMobile: emailNum,
          password
        }

        console.log(formData)
        //api call for login
        const result = await axios.post('/api/users/login', formData)

        //saving user token to local storage
        localStorage.setItem('token', result.token)

        //if user came from booking page his query is saved in local storage
        const tokenPresent = localStorage.getItem('token')
        if (tokenPresent) {
          navigate('/BookingDetails')
        } else {
          //else go to booking page
          navigate('/Home')
        }
      } else {
        setError(errors)
      }
    } catch (e) {
      console.log(e.response.data)
    }
  }


  return (
    <BgImg>
      <Box
        sx={BoxSX}>
        <Typography variant='h4' paddingBottom="30px">
          Login to your Account
        </Typography>
        <form style={{ width: "30vw" }} onSubmit={loginHandle}>
          <Stack spacing={2} >
            <TextField
              label="Email / Number"
              variant="outlined"
              value={emailNum}
              onChange={(e) => setEmailNum(e.target.value)}
              sx={{ backgroundColor: "white" }} />
            {error.emailNum && <FormHelperText error>{error.emailNum}</FormHelperText>}

            <TextField
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              sx={{ backgroundColor: "white" }} />
            {error.password && <FormHelperText error>{error.password}</FormHelperText>}

            <Linked to="/signup">
              <Typography variant='h6' color="blue">
                Dont have account? create one
              </Typography>
            </Linked>

            <Button type="submit" variant="contained">Login</Button>
          </Stack>
        </form>

      </Box >
    </BgImg >
  )
}