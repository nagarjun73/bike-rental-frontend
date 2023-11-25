import axios from '../config/axios'
import toast from 'react-hot-toast'

export const startBookTrip = (data, navigate) => {
  return async (dispatch) => {
    try {
      const bookingRes = await axios.post('/api/trips/book', data, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })

      //saving to local storage
      localStorage.setItem('bookingId', bookingRes.data._id)
      // dispatch(addBooking(bookingRes.data._id))
      navigate(`/bookingdetails/${bookingRes.data._id}`)
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
      dispatch(addBkgDetails(tripDetail))
    } catch (e) {
      toast.error(e.response.data.errors)
    }
  }
}

export const setLoadingTrue = () => {
  return {
    type: "SET_LOADING_TRUE",
    payload: true
  }
}

export const setLoadingFalse = () => {
  return {
    type: "SET_LOADING_FALSE",
    payload: false
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

