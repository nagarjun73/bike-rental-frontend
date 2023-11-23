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

const editLocation = (data) => {
  return {
    type: "EDIT_LOCATION",
    payload: data
  }
}

export const startEditLocation = (formData, id) => {
  return async (dispatch) => {
    try {
      const responseCity = await axios.put(`/api/locations/${id}/edit`, formData, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      console.log(responseCity.data);
      dispatch(editLocation(responseCity.data))
    } catch (e) {
      console.log(e);
    }
  }
}

const deleteLocation = (data) => {
  return {
    type: "DELETE_LOCATION",
    payload: data
  }
}

export const startDeleteCity = (id) => {
  return async (dispatch) => {
    try {
      const responseCity = await axios.delete(`/api/locations/${id}/delete`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      console.log(responseCity.data);
      dispatch(deleteLocation(responseCity.data))
    } catch (e) {
      console.log(e);
    }
  }
}

const addLocation = (data) => {
  return {
    type: "ADD_LOCATION",
    payload: data
  }
}

export const startAddLocation = (data) => {
  return async (dispatch) => {
    try {
      const responseCity = await axios.post('/api/locations/add', data, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      dispatch(addLocation(responseCity.data))
    } catch (e) {

    }
  }
}


