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