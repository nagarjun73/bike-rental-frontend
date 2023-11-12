import VehiclesContainer from './VehiclesContainer'
import { useEffect } from 'react'
import { startSubmitQuery } from '../../actions/vehicleAction'
import { useDispatch } from 'react-redux'

export default function QueryResult() {
  const dispatch = useDispatch()
  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem('query'))
    dispatch(startSubmitQuery(formData))
  }, [])

  return (
    <div style={{ backgroundColor: "#fafafa" }}>
      <VehiclesContainer />
    </div>
  )
}