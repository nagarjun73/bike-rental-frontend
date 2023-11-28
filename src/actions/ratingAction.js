import axios from "../config/axios"



export const startAddRating = (data) => {
  return async (dispatch) => {
    try {

      const response = await axios.post('/api/reviews/add', data, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }
}