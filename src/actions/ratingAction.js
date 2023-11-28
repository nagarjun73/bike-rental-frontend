import axios from "../config/axios"



export const startAddRating = (data) => {
  return async (dispatch) => {
    const response = await axios.post('/api/reviews/add', data, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
  }
}