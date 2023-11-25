import axios from '../config/axios'


const updateSearchedVehicles = (data) => {
  return {
    type: "SEARCHED_VEHICLES",
    payload: data
  }
}

//update is loading state
const updateIsLoading = (boolean) => {
  return {
    type: "UPDATE_IS_LOADING",
    payload: boolean
  }
}


export const startSubmitQuery = (formdata) => {
  return async (dispatch) => {
    dispatch(updateIsLoading('true'))
    const result = await axios.post('/api/vehicles/query', formdata)
    dispatch(updateSearchedVehicles(result.data))
    dispatch(updateIsLoading('false'))
  }
}

const updateVehicleList = (data) => {
  return {
    type: "GET_VEHICLES",
    payload: data
  }
}

export const startGetHostVehicles = (pageNo, sort) => {
  return async (dispatch) => {
    const result = await axios.get(`/api/host/pagination?page=${pageNo}&sort=${sort}`, {
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

const changeVehicleStatus = (data) => {
  return {
    type: "CHANGE_VEHICLE_STATUS",
    payload: data
  }
}

export const startEnableVehicle = (id, bool) => {
  return async (dispatch) => {
    const changeStatus = await axios.put(`/api/host/${id}/change-status`, { availability: bool }, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    dispatch(changeVehicleStatus(changeStatus.data))
  }
}


