import axios from "../config/axios"

const updateVehicleType = (data) => {
  return {
    type: "UPDATE_VEHICLE_TYPE",
    payload: data
  }
}

export const startGetVehicleType = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/vehicletype/hostlist', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    dispatch(updateVehicleType(response.data))
  }
}