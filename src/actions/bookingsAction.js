import axios from '../config/axios'
import toast from 'react-hot-toast'

const addBooking = (data) => {
  return {
    type: "ADD_BOOKING",
    payload: data
  }
}

export const startBookTrip = (data, navigate) => {
  return async (dispatch) => {
    try {
      const bookingRes = await axios.post('/api/trips/book', data, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      dispatch(addBooking(bookingRes.data))
      navigate(`/bookingdetails/${bookingRes.data.trips._id}`)
    } catch (e) {
      toast.error(e.response.data.errors)
    }
  }
}

const addBkgDetails = (tripDetail) => {
  return {
    type: "UPDATE_TRIP_DETAILS",
    payload: tripDetail
  }
}

export const startGetBkgInfo = (id) => {
  return async (dispatch) => {
    try {
      const tripDetail = await axios.get(`/api/trips/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      dispatch(addBkgDetails(tripDetail.data))
    } catch (e) {
      toast.error(e.response.data.errors)
    }
  }
}

const updateMyTrips = (data) => {
  return {
    type: "UPDATE_USER_TRIPS",
    payload: data
  }
}

export const startGetMyTrips = (page, sort) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/trips/list?page=${page}&sort=${sort}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      dispatch(updateMyTrips(res.data))
    } catch (e) {
      console.log(e);
    }
  }
}

const updateReloadTripDetail = (data) => {
  console.log(data);
  return {
    type: "UPDATE_RELOAD_TRIP_DETAIL",
    payload: data
  }
}

export const startTripAfterReload = (id, upDateTripState) => {
  return async (dispatch) => {
    try {
      const getTrip = await axios.get(`/api/trips/detail/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      upDateTripState(getTrip.data)
    } catch (e) {
      console.log(e);
    }
  }
}

