import { useReducer, createContext, useEffect, useState } from 'react'
import axios from './config/axios'
//Importing Components
import Home from './components/Home'
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
import Dashboard from './components/Dashboard/Dashboard'
import MyTripsContainer from './components/MyTrips/MyTripsContainer'

//importing router components
import { BrowserRouter, Routes, Route, } from 'react-router-dom'

import { useDispatch } from "react-redux"
import { startGetLocation } from "./actions/locationAction"

import userReducer from './components/Context&Reducer/userReducer'
import PaymentCancel from './components/Payment/PaymentCancel'
import TripDetail from './components/MyTrips/TripDetail'
export const UserContext = createContext()


export default function App() {
  const initialState = {
    user: {},
    profile: {},
    myBookings: []
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
          const myBookings = axios.get('/api/trips/list', header)
          const response = await Promise.all([user, profile, myBookings])
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
          <Route path='/' element={userState.user.role === 'host' || userState.user.role === 'admin' ? <Dashboard /> : <Home />} />
          <Route path='/mytrips' element={<MyTripsContainer />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/queryresult" element={<QueryResult />} />
          <Route path="/bookingdetails/:id" element={<BookingDetails />} />
          <Route path="/verifyDocUser" element={<VerifyDocUser />} />
          <Route path="/verifyDocHost" element={<VerifyDocHost />} />
          <Route path="/displaymessage" element={<DisplayMessage />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<PaymentCancel />} />
          <Route path="/tripdetail/:id" element={<TripDetail />} />

        </Routes>
      </BrowserRouter >
    </UserContext.Provider>
  )
}