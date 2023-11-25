import { useSelector, useDispatch } from "react-redux"
import VehicleItem from "./VehicleItem"
import { Grid, Box, Button, Chip, Stack, TextField, Typography, FormControl, Select, MenuItem } from "@mui/material"
import { useState, useEffect } from "react"
import { startGetHostVehicles } from '../../actions/vehicleAction'
import axios from "../../config/axios";

export default function VehiclesContainer() {
  const dispatch = useDispatch()

  // const [vehicle, setVehicle] = useState([])
  const vehicles = useSelector((state) => {
    return state.vehicle.hostVehicles
  })

  const [pageNo, setPageNo] = useState(0)
  const [sort, setSort] = useState(-1)

  useEffect(() => {
    // (async () => {
    //   const response = await axios.get(`/api/host/pagination?page=${pageNo}&sort=${sort}`, {
    //     headers: {
    //       Authorization: localStorage.getItem('token')
    //     }
    //   })
    //   console.log(response);
    //   setVehicle(response.data);
    // })()
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



  return (
    <Box padding="3vh" sx={{ backgroundColor: "#fafafa", }}>
      <Typography variant="h2" padding="10px">Vehicles</Typography>

      <Stack margin="1vw" direction="row" justifyContent="space-between" alignItems='center' >
        <FormControl variant="standard" >
          <Select
            id="demo-simple-select"
            value={sort}
            label="Age"
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value={-1}>Recent First</MenuItem>
            <MenuItem value={1}>Oldest First</MenuItem>
          </Select>
        </FormControl>
        <TextField margin="0px" label="Search Vehicle" variant="standard" />
      </Stack>

      <Grid container spacing={1}>
        {vehicles?.map((ele) => {
          return (<VehicleItem key={ele._id} vehicle={ele} />)
        })}
      </Grid>
      <Stack direction="row" justifyContent="center" gap="3vw" margin="5vh" >
        <Button variant='contained' disabled={pageNo === 0 && true} onClick={handlePrevPage}>Prev</Button>
        <Chip label={pageNo + 1} />
        <Button variant='contained' disabled={vehicles.length !== 12 && true} onClick={handleNextPage}>Next</Button>
      </Stack>
    </Box>
  )
}
