import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import TripOverview from './TripOverview'
import TripMap from './TripMap'
import { Typography } from '@mui/material'

export default function TripDetailsContainer(props) {
  const { id } = useParams()
  const hostVehicles = useSelector((state) => {
    return state.vehicle.hostVehicles
  })
  //Finding trip details
  let foundTrip = {}
  hostVehicles.forEach((ele) => {
    ele.trips.forEach((ele) => {
      if (ele._id == id) {
        foundTrip = ele
      }
    })
  })

  return (
    <div>
      {!_.isEmpty(foundTrip) && (
        <div>
          <Typography variant='h2' textAlign="center" padding="10px">Trip Details</Typography>
          <TripOverview trip={foundTrip} />
          <TripMap />
        </div>
      )
      }

    </div>
  )
}