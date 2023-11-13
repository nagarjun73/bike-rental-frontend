import axios from "../config/axios"

export const startPayment = (payData, navigate) => {
  return async (dispatch) => {
    try {
      const payment = await axios.post('/api/payments', payData, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })

      localStorage.setItem('stripId', payment.data.id)
      window.location = payment.data.url
    } catch (e) {
      console.log(e);
    }
  }
}

export const startUpdatePayment = (stripId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/payments/update/${stripId}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      localStorage.removeItem('stripId')
      console.log(response);
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