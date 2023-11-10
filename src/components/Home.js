import { useState, useEffect } from 'react'
import { formatISO } from 'date-fns'
import { useNavigate } from 'react-router-dom'

//Materialui
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, Button, Stack } from '@mui/material/'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { startGetLocation } from '../actions/locationAction'
import { startSubmitQuery } from '../actions/vehicleAction'

export default function Home(props) {
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const locations = useSelector((state) => {
    return state.location.locationList
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetLocation())
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()

    const formData = {
      tripStartDate: formatISO(startDate),
      tripEndDate: formatISO(endDate),
      location: location
    }
    localStorage.setItem("query", JSON.stringify(formData))
    dispatch(startSubmitQuery(formData))
    navigate('/QueryResult')
  }

  return (
    <div style={{
      backgroundImage: `url("https://bikerentals6.s3.ap-south-1.amazonaws.com/frontend/undraw_traveling_yhxq.svg")`,
      backgroundPosition: ' 50% 80%',
      backgroundRepeat: 'no-repeat',
    }}>

      <form onSubmit={handleSearch} >
        <Stack
          direction="row"
          spacing={2}
          alignItems='center'
          justifyContent='center'
          sx={{ height: '90vh' }}>
          <FormControl sx={{ width: 300 }}>
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
          <Button type="submit" variant="contained" >Search</Button>
        </Stack>
      </form>
    </div >
  )
}