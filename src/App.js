import { useReducer, createContext, useEffect, useState } from 'react'
import axios from './config/axios'
//Importing Components
import Home from './components/Home'
import About from './components/About'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Profile from './components/Profile/Profile'
import Navbar from './components/Navbar'
import BookingDetails from './components/BookingPage/BookingDetails'
import QueryResult from './components/ResultsPage/QueryResult'
import VerifyDocUser from './components/submitDoc/VerifyDocUser'
import VerifyDocHost from './components/submitDoc/VerifyDocHost'
import DisplayMessage from './components/DisplayMessage'
import PaymentSuccess from './components/Payment/PaymentSuccess'

//importing router components
import { BrowserRouter, Routes, Route, } from 'react-router-dom'

import { useDispatch } from "react-redux"
import { startGetLocation } from "./actions/locationAction"

import userReducer from './components/Contex&Reducer/userReducer'
import { startSubmitQuery } from './actions/vehicleAction'
import PaymentCancel from './components/Payment/PaymentCancel'
export const UserContext = createContext()


export default function App() {
  const initialState = {
    user: {},
    profile: {}
  }
  const [userState, userDispatch] = useReducer(userReducer, initialState)
  console.log(userState)
  const [serverError, setServerError] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        try {
          const header = {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }
          const user = axios.get('/api/users/account', header)
          const profile = axios.get('/api/users/profile', header)
          const response = await Promise.all([user, profile])
          userDispatch({ type: "LOGIN_USER", payload: response })
        } catch (e) {
          setServerError(e.response.data)
        }
      })()
    }

    dispatch(startGetLocation())
  }, [])

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/QueryResult" element={<QueryResult />} />
          <Route path="/BookingDetails/:id" element={<BookingDetails />} />
          <Route path="/verifyDocUser" element={<VerifyDocUser />} />
          <Route path="/verifyDocHost" element={<VerifyDocHost />} />
          <Route path="/DisplayMessage" element={<DisplayMessage />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<PaymentCancel />} />
        </Routes>
      </BrowserRouter >
    </UserContext.Provider>
  )
}