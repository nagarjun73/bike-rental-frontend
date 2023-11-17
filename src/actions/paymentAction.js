import axios from "../config/axios"
import { addBkgDetails } from '../actions/bookingsAction'

export const startPayment = (payData, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/payments', payData, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      //storing to local storage
      localStorage.setItem('stripId', response.data.id)

      //redirect to payment URL
      window.location = response.data.url
    } catch (e) {
      console.log(e);
    }
  }
}


export const startUpdatePayment = (stripId, updatesResponse) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/payments/update/${stripId}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      localStorage.removeItem('stripId')
      updatesResponse(response.data);
    } catch (e) {
      console.log(e);
    }
  }
}

export const startDistroyPayment = (stripId) => {
  return async (dispatch) => {
    try {
      const deletePayment = await axios.get(`/api/payments/delete/${stripId}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      console.log(deletePayment);
      localStorage.removeItem('stripId')
    } catch (e) {
      console.log(e);
    }
  }
}