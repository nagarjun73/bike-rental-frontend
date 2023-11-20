import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import TripOverview from './TripOverview'
import TripMap from './TripMap'
import { Typography, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from '../../../config/axios'

export default function TripDetailsContainer(props) {
  const { id } = useParams()
  const [foundTrip, setFoundTrip] = useState({})
  // const hostVehicles = useSelector((state) => {
  //   return state.vehicle.hostVehicles
  // })
  // //Finding trip details
  // let foundTrip = {}
  // hostVehicles.forEach((ele) => {
  //   ele.trips.forEach((ele) => {
  //     if (ele._id == id) {
  //       foundTrip = ele
  //     }
  //   })
  // })

  useEffect(() => {

    (async () => {
      try {
        const tripdetails = await axios.get(`/api/trips/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        setFoundTrip(tripdetails.data)
      } catch (e) {
        console.log(e);
      }
    })()
  }, [])

  return (
    <div>
      <Typography variant='h2' textAlign="center" padding="10px">Trip Details</Typography>
      {!_.isEmpty(foundTrip) && (
        <Stack direction={{ md: "row", xs: "column" }}>
          <TripOverview trip={foundTrip} />
          <TripMap trip={foundTrip} />
        </Stack>
      )
      }

    </div>
  )
}