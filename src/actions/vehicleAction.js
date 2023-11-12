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
    console.log(result);
    dispatch(updateSearchedVehicles(result.data))
  }
}