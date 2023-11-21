import { useParams } from 'react-router-dom'
import _ from 'lodash'

import TripOverview from './TripOverview'
import TripMap from './TripMap'
import { Typography, Stack } from '@mui/material'
import { useEffect, useState, useContext } from 'react'
import axios from '../../../config/axios'

export default function TripDetailsContainer(props) {
  const { id } = useParams()
  const [foundTrip, setFoundTrip] = useState({})



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