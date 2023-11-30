import VehiclesContainer from './VehiclesContainer'
import { useEffect } from 'react'
import { startSubmitQuery } from '../../actions/vehicleAction'
import { useDispatch } from 'react-redux'
import QueryForm from "../QueryForm"
import { Box } from '@mui/material'

export default function QueryResult() {
  const dispatch = useDispatch()
  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem('query'))
    dispatch(startSubmitQuery(formData))
  }, [])

  return (
    <div style={{ backgroundColor: "#fafafa", height: "90vh", margin: "0px", }}>
      <Box paddingY="2vh">
        <QueryForm />
        <VehiclesContainer />
      </Box>
    </div>
  )
}