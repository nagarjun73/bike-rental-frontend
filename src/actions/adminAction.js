import axios from "../config/axios"

const header = {
  headers: {
    Authorization: localStorage.getItem('token')
  }
}

const updateAdminData = (data) => {
  return {
    type: "UPDATE_ADMIN_DATA",
    payload: data
  }
}

export const startGetAdminData = () => {
  return async (dispatch) => {
    const unApprProfiles = axios.get('/api/profiles/list', header)
    const unApprovedVehicles = axios.get('/api/admin/vehicles', header)
    const response = await Promise.all([unApprProfiles, unApprovedVehicles])
    dispatch(updateAdminData(response))
  }
}


const updateProfileList = (data) => {
  return {
    type: "UPDATE_APPROVE_PROFILE",
    payload: data._id
  }
}

export const startApproveProfile = (id) => {
  return async (dispatch) => {
    const apprResponse = await axios.get(`/api/profiles/${id}/approve`, header)
    dispatch(updateProfileList(apprResponse.data))
  }
}

export const startDeleteRejected = (id) => {
  return async (dispatch) => {
    const deleteResponse = await axios.get(`/api/profiles/${id}/reject`, header)
    dispatch(updateProfileList(deleteResponse.data))
  }
}

const updateVehicleList = (data) => {
  return {
    type: "UPDATE_APPROVE_VEHICLE",
    payload: data._id
  }
}

export const startApproveVehicle = (id) => {
  return async (dispatch) => {
    const apprResponse = await axios.get(`/api/admin/${id}/approve`, header)
    dispatch(updateVehicleList(apprResponse.data))
  }
}

export const startRejecteVehicle = (id) => {
  return async (dispatch) => {
    const rejectResponse = await axios.get(`/api/admin/${id}/reject`, header)
    dispatch(updateVehicleList(rejectResponse.data))
  }
}