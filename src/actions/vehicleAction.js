import axios from '../config/axios'

const updateSearchedVehicles = (data) => {
  return {
    type: "SEARCHED_VEHICLES",
    payload: data
  }
}

export const startSubmitQuery = (formdata) => {
  return async (dispatch) => {
    const result = await axios.post('/api/vehicles/query', formdata)
    dispatch(updateSearchedVehicles(result.data))
  }
}

const updateVehicleList = (data) => {
  return {
    type: "GET_VEHICLES",
    payload: data
  }
}

export const startGetHostVehicles = () => {
  return async (dispatch) => {
    const result = await axios.get('/api/host/all-vehicles', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    dispatch(updateVehicleList(result.data));
  }
}

export const addVehicle = (data) => {
  return {
    type: "ADD_VEHICLE",
    payload: data
  }
}