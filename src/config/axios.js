import axios from 'axios'

export default axios.create({
  // baseURL: "http://localhost:3044"
  baseURL: "https://bike-rental-backend.onrender.com"
})