import axios from "../config/axios"

const updateVehicleType = (data) => {
  return {
    type: "GET_VEHICLE_TYPE",
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

const updateCategory = (data) => {
  return {
    type: "UPDATE_VEHICLE_TYPE",
    payload: data
  }
}

export const startEditCategory = (id, formData) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/vehicletype/${id}/edit`, formData, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    dispatch(updateCategory(response.data))
  }
}

const deleteVehicleType = (data) => {
  return {
    type: "DELETE_VEHICLE_TYPE",
    payload: data._id
  }
}

export const startDeleteCategory = (id) => {
  return async (dispatch) => {
    const response = await axios.delete(`/api/vehicletype/${id}/delete`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    dispatch(deleteVehicleType(response.data))
  }
}