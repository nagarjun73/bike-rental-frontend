import { useSelector, useDispatch } from "react-redux"
import VehicleItem from "./VehicleItem"
import { Grid, Box, Button, Chip, Stack, TextField, Typography, FormControl, Select, MenuItem } from "@mui/material"
import { useState, useEffect } from "react"
import { startGetHostVehicles, startSearchVehicles } from '../../actions/vehicleAction'

export default function VehiclesContainer() {
  const [pageNo, setPageNo] = useState(0)
  const [sort, setSort] = useState(-1)
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')
  console.log(search)

  const vehicle = useSelector((state) => {
    return state.vehicle.hostVehicles
  })

  useEffect(() => {
    dispatch(startGetHostVehicles(pageNo, sort))
  }, [pageNo, sort])

  const handlePrevPage = () => {
    if (pageNo !== 0) {
      setPageNo(pageNo - 1)
    }
  }

  const handleNextPage = () => {
    setPageNo(pageNo + 1)
  }

  const searchButtonHandle = () => {
    dispatch(startSearchVehicles(search))
  }

  return (
    <Box padding="3vh" sx={{ backgroundColor: "#fafafa", }}>
      <Typography variant="h2" padding="10px">Vehicles</Typography>

      <Stack margin="1vw" direction="row" justifyContent="space-between" alignItems='center' >
        <FormControl variant="standard" >
          <Select
            id="demo-simple-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value={-1}>Recent First</MenuItem>
            <MenuItem value={1}>Oldest First</MenuItem>
          </Select>
        </FormControl>
        <Stack direction="row">
          <TextField label="Search Vehicle" variant="standard" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button type="submit" onClick={searchButtonHandle}>Search</Button>
        </Stack>
      </Stack>

      <Grid container spacing={1}>
        {vehicle?.map((ele) => {
          return (<VehicleItem key={ele._id} vehicle={ele} />)
        })}
      </Grid>
      <Stack direction="row" justifyContent="center" gap="3vw" margin="5vh" >
        <Button variant='contained' disabled={pageNo === 0 && true} onClick={handlePrevPage}>Prev</Button>
        <Chip label={pageNo + 1} />
        <Button variant='contained' disabled={vehicle.length !== 12 && true} onClick={handleNextPage}>Next</Button>
      </Stack>
    </Box>
  )
}
