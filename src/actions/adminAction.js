import axios from "../config/axios"
//header for api calls

//update all data to state
const updateAdminData = (data) => {
  return {
    type: "UPDATE_ADMIN_DATA",
    payload: data
  }
}
//get all admin data profiles and vehicle which is not approved
export const startGetAdminData = () => {
  return async (dispatch) => {
    const unApprProfiles = axios.get('/api/profiles/list', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    const unApprovedVehicles = axios.get('/api/admin/vehicles', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })

    const vehicleCategories = axios.get('/api/vehicletype/list', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    const response = await Promise.all([unApprProfiles, unApprovedVehicles, vehicleCategories])
    dispatch(updateAdminData(response))
  }
}

//update profile list
const updateProfileList = (data) => {
  return {
    type: "UPDATE_APPROVE_PROFILE",
    payload: data._id
  }
}
//approve profile
export const startApproveProfile = (id) => {
  return async (dispatch) => {
    const apprResponse = await axios.get(`/api/profiles/${id}/approve`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    dispatch(updateProfileList(apprResponse.data))
  }
}
//delete rejected profile
export const startDeleteRejected = (id) => {
  return async (dispatch) => {
    const deleteResponse = await axios.get(`/api/profiles/${id}/reject`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    dispatch(updateProfileList(deleteResponse.data))
  }
}
//update vehicle list
const updateVehicleList = (data) => {
  return {
    type: "UPDATE_APPROVE_VEHICLE",
    payload: data._id
  }
}
//admin vehicle approval
export const startApproveVehicle = (id) => {
  return async (dispatch) => {
    const apprResponse = await axios.get(`/api/admin/${id}/approve`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    dispatch(updateVehicleList(apprResponse.data))
  }
}
//admin vehicle reject
export const startRejecteVehicle = (id) => {
  return async (dispatch) => {
    const rejectResponse = await axios.get(`/api/admin/${id}/reject`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    dispatch(updateVehicleList(rejectResponse.data))
  }
}