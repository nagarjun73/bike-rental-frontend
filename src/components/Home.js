import { useState, useEffect } from 'react'
import { formatISO } from 'date-fns'
import { useNavigate } from 'react-router-dom'

//Materialui
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, Button, Stack, FormHelperText } from '@mui/material/'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { startSubmitQuery, startGetHostVehicles } from '../actions/vehicleAction'
import { startGetVehicleType } from "../actions/vehicleTypeAction"
import { startGetLocation } from "../actions/locationAction"

import { jwtDecode } from 'jwt-decode'

export default function Home(props) {
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const [clientError, setClientError] = useState({})

  const errors = {}

  const runValidators = () => {
    if (location === '') {
      errors.location = "Please select your city"
    }

    if (startDate == null) {
      errors.startDate = "Startdate should not be empty"
    } else if (new Date(startDate) < new Date()) {
      errors.startDate = "Start date should be greater then current time"
    }

    if (endDate == null) {
      errors.endDate = "End date should not be empty"
    } else if (new Date(endDate) < new Date(startDate)) {
      errors.endDate = "End date should be more then start Date"
    }
  }

  const locations = useSelector((state) => {
    return state.location.locationList
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  //Extra api calls after login
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      if (jwtDecode(token).role == "host") {
        dispatch(startGetHostVehicles())
        dispatch(startGetVehicleType())
      }
      dispatch(startGetLocation())
    }
  }, [])


  const handleSearch = (e) => {
    e.preventDefault()

    runValidators()

    if (Object.keys(errors).length !== 0) {
      setClientError(errors)
    } else {
      const formData = {
        tripStartDate: formatISO(startDate),
        tripEndDate: formatISO(endDate),
        location: location
      }
      localStorage.setItem("query", JSON.stringify(formData))
      dispatch(startSubmitQuery(formData))
      navigate('/queryresult')
      setLocation('')
      setStartDate(null)
      setEndDate(null)
    }

  }

  return (
    <div style={{
      backgroundImage: `url("https://bikerentals6.s3.ap-south-1.amazonaws.com/frontend/undraw_traveling_yhxq.svg")`,
      backgroundPosition: ' 50% 80%',
      backgroundRepeat: 'no-repeat',
      backgroundColor: "#fafafa"
    }}>

      <form onSubmit={handleSearch} >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems='center'
          justifyContent='center'
          sx={{ height: '90vh' }}
        >
          <Stack direction="column">
            <FormControl sx={{ width: { xs: 270, md: 300 }, paddingTop: "1vh", margin: "0px" }}>
              <InputLabel sx={{ paddingTop: "1vh" }}>City</InputLabel>
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
          </Stack>
          <Stack direction="column">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                  value={startDate}
                  onChange={(value) => setStartDate(value)}
                  label="Pick trip start date"
                  sx={{ backgroundColor: 'white' }}
                  disablePast />
              </DemoContainer>
            </LocalizationProvider>
            {clientError.startDate && <FormHelperText error>{clientError.startDate}</FormHelperText>}
          </Stack>

          <Stack direction="column">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                  value={endDate}
                  onChange={(value) => setEndDate(value)}
                  label="Pick trip end date"
                  sx={{ backgroundColor: 'white' }}
                  disablePast
                />
              </DemoContainer>
            </LocalizationProvider>
            {clientError.endDate && <FormHelperText error>{clientError.endDate}</FormHelperText>}
          </Stack>
          <Button type="submit" variant="contained" >Search</Button>
        </Stack>
      </form>
    </div >
  )
}