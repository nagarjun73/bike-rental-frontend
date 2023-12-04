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
    const unApprProfiles = axios.get(`/api/profiles/list?page=${0}&sort=${-1}`, {
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

    const statistics = axios.get('/api/admin/statistics', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    const response = await Promise.all([unApprProfiles, unApprovedVehicles, vehicleCategories, statistics])
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

const addCategory = (data) => {
  return {
    type: "ADD_CATEGORY",
    payload: data
  }
}

export const startAddCategory = (data) => {
  return async (dispatch) => {
    const response = await axios.post('/api/vehicletype/add', data, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    dispatch(addCategory(response.data))
  }
}


const updatePage = (data) => {
  return {
    type: "UPDATE_PAGE",
    payload: data
  }
}


export const startGetPage = (pageNo, sort) => {
  return async (dispatch) => {
    try {
      const unApprProfiles = await axios.get(`/api/profiles/list?page=${pageNo}&sort=${sort}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      dispatch(updatePage(unApprProfiles.data))
    } catch (e) {
      console.log(e);
    }
  }
}

const searchProfile = (data) => {
  return {
    type: "UPDATE_SEARCHED_PROFILE",
    payload: data
  }
}

export const startSearchProfile = (search) => {
  return async (dispatch) => {
    try {
      const searchRes = await axios.get(`/api/profiles?name=${search}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      dispatch(searchProfile(searchRes.data))
    } catch (e) {
      console.log(e);
    }
  }
}