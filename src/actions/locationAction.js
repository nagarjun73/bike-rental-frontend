import axios from '../config/axios'

const updatelocation = (data) => {
  return {
    type: "UPDATE_LOCATION",
    payload: data
  }
}

const setLocationErrors = (err) => {
  return {
    type: "SET_LOCATION_ERRORS",
    payload: err
  }
}

export const startGetLocation = () => {
  return async (dispatch) => {
    try {
      const locationList = await axios.get(`/api/locations/list`)
      dispatch(updatelocation(locationList.data))
    } catch (e) {
      dispatch(setLocationErrors(e.message))
    }
  }
}

