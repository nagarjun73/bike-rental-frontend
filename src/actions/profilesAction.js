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
    const response = await Promise.all([unApprProfiles])
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