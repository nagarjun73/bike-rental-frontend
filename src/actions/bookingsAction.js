import axios from '../config/axios'

const addBooking = (data) => {
  return {
    type: "UPDATE_BOOKING_ID",
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

      //saving to local storage
      localStorage.setItem('bookingId', bookingRes.data._id)
      dispatch(addBooking(bookingRes.data._id))
      navigate(`/bookingdetails/${bookingRes.data._id}`)
    } catch (e) {
      console.log(e);
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
      console.log(e);
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

