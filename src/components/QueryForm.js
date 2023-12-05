import { useEffect, useState } from 'react'
import { formatISO } from 'date-fns'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

//Materialui
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, Button, Stack, FormHelperText } from '@mui/material/'
//DateTimePickerComp
import DateTimePickerComp from './DateTimePickerComp';
import { startSubmitQuery } from '../actions/vehicleAction'

export default function QueryForm() {
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [clientError, setClientError] = useState({})
  const url = useLocation()

  useEffect(() => {
    //check if query because queryform for used in 2 pages to know the location
    if (url.pathname === "/queryresult") {
      const query = JSON.parse(localStorage.getItem('query'))

      //if query present set state
      if (query) {
        setLocation(query.location)
        setStartDate(new Date(query.tripStartDate))
        setEndDate(new Date(query.tripEndDate))
      }
    }
  }, [])

  const errors = {}

  //validation function
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

  //locaton for drop downs
  const locations = useSelector((state) => {
    return state.location.locationList
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  //handle search fuction
  const handleSearch = (e) => {
    e.preventDefault()

    //run validation fuction
    runValidators()

    //if error object is not empty setError state
    if (Object.keys(errors).length !== 0) {
      setClientError(errors)
    } else {
      const formData = {
        tripStartDate: formatISO(startDate),
        tripEndDate: formatISO(endDate),
        location: location
      }
      //saving to loacal storage for reaccess data
      localStorage.setItem("query", JSON.stringify(formData))
      dispatch(startSubmitQuery(formData))
      navigate('/queryresult')
      setClientError({})
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch} >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent='center'
          alignItems="center"
        >
          <Stack direction="column" >
            <FormControl sx={{
              width: { xs: "80vw", md: "20vw" },
              marginTop: "10px"
            }}>
              {/* City Picker */}
              <InputLabel >City</InputLabel>
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
            {/* Trip startDate Picker */}
            <DateTimePickerComp date={startDate} setDate={setStartDate} str={"Pick trip start date"} />
            {clientError.startDate && <FormHelperText error>{clientError.startDate}</FormHelperText>}
          </Stack>

          {/* Trip endDate Picker */}
          <Stack direction="column">
            <DateTimePickerComp date={endDate} setDate={setEndDate} str={"Pick trip end date"} />
            {clientError.endDate && <FormHelperText error>{clientError.endDate}</FormHelperText>}
          </Stack>
          {/* Search button */}
          <Button type="submit" variant="contained"
            sx={{
              width: { md: '10vw', xs: "80vw" },
              marginTop: "2vh",
              height: "7vh"
            }}>Search</Button>
        </Stack>
      </form>
    </div>
  )
}
