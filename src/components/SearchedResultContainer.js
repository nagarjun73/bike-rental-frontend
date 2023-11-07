import VehicleResult from './VehicleResult'
import { useEffect } from 'react'
import { startSubmitQuery } from '../actions/vehicleAction'
import { useDispatch } from 'react-redux'

export default function SearchedResultContainer() {
  const dispatch = useDispatch()
  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem('query'))
    dispatch(startSubmitQuery(formData))
  }, [])

  return (
    <div>
      <h1>Searched Result Container</h1>
      <VehicleResult />
    </div>
  )
}