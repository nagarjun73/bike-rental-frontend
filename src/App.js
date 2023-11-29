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
import MyTripsContainer from './components/MyTrips/MyTripsContainer'
import TripDetailsContainer from "./components/HostVehicles/TripDetails/TripDetailsContainer"
import PaymentCancel from './components/Payment/PaymentCancel'
import TripDetail from './components/MyTrips/TripDetail'
import VehiclesContainer from './components/HostVehicles/VehiclesContainer'
import AddVehicle from './components/HostVehicles/AddVehicle'
import VehicleDetail from './components/HostVehicles/VehicleDetails/VehicleDetail'
import ProfileApproval from './components/Admin/ProfileApproval/ProfileApproval'
import VehicleApproval from './components/Admin/VehicleApproval/VehicleApproval'
import VehicleCategory from './components/Admin/VehicleCategory/VehicleCategory'
import Locations from './components/Admin/Locations/Locations'

//importing router components
import { BrowserRouter, Routes, Route, } from 'react-router-dom'

import { useDispatch } from "react-redux"
import { jwtDecode } from 'jwt-decode'
import { startGetLocation } from "./actions/locationAction"
import { startGetHostVehicles } from "./actions/vehicleAction"
import { startGetVehicleType } from "./actions/vehicleTypeAction"
import { startGetAdminData } from './actions/adminAction'
import { startGetMyTrips } from "./actions/bookingsAction"

import userReducer from './Context&Reducer/userReducer'
export const UserContext = createContext()


export default function App() {
  const initialState = {
    user: {},
    profile: {},
  }
  const [userState, userDispatch] = useReducer(userReducer, initialState)
  console.log(userState)
  const [serverError, setServerError] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
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

          if (jwtDecode(token).role === "host") {
            dispatch(startGetHostVehicles(0, -1))
            dispatch(startGetVehicleType())
          } else if (jwtDecode(token).role === "admin") {
            dispatch(startGetAdminData())
          } else if (jwtDecode(token).role === "user") {
            dispatch(startGetMyTrips(0, -1))
          }

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
          {/* host routes */}
          <Route path='/addvehicle' element={<AddVehicle />} />
          <Route path='/vehicles' element={<VehiclesContainer />} />
          <Route path='/vehicledetail/:id' element={<VehicleDetail />} />
          <Route path="/hosttripdetails/:id" element={<TripDetailsContainer />} />
          {/* admin routes */}
          <Route path="/profileapproval" element={<ProfileApproval />} />
          <Route path="/vehicleapproval" element={<VehicleApproval />} />
          <Route path="/category" element={<VehicleCategory />} />
          <Route path="/city" element={<Locations />} />


        </Routes>
      </BrowserRouter >
    </UserContext.Provider>
  )
}