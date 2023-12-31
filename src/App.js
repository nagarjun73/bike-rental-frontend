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
import Statistics from './components/Admin/Statistics/StatisticsContainer'

//importing router components
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
//importing material theme
import { ThemeProvider } from "@mui/material/styles";
import theme from './config/@muiTheme'

import { useDispatch } from "react-redux"
import { jwtDecode } from 'jwt-decode'
//importing functions actions
import { startGetLocation } from "./actions/locationAction"
import { startGetHostVehicles } from "./actions/vehicleAction"
import { startGetVehicleType } from "./actions/vehicleTypeAction"
import { startGetAdminData } from './actions/adminAction'
import { startGetMyTrips } from "./actions/bookingsAction"

//ROBOTO FONT IMPORT
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

//UseReduceer fuction
import userReducer from './Context&Reducer/userReducer'
export const UserContext = createContext()

export default function App() {
  const initialState = {
    user: {},
    profile: {},
  }
  //useReducers setup
  const [userState, userDispatch] = useReducer(userReducer, initialState)
  console.log(userState)
  //server error state
  const [serverError, setServerError] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    //if token present get all data based on user
    if (token) {
      (async () => {
        try {
          const tokenHeader = {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }
          const user = axios.get('/api/users/account', tokenHeader)
          const profile = axios.get('/api/users/profile', tokenHeader)
          const response = await Promise.all([user, profile])
          userDispatch({ type: "LOGIN_USER", payload: response })

          //Based on role accessing data
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
    // ContextAPI 
    <UserContext.Provider value={{ userState, userDispatch }}>
      {/* Custom theme for materialUi */}
      <ThemeProvider theme={theme}>
        {/* React router */}
        <BrowserRouter>
          <Navbar />

          <Routes>
            {/* Public routes */}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path="/queryresult" element={<QueryResult />} />
            {/* User routes */}
            <Route path='/profile' element={<Profile />} />
            <Route path="/verifyDocUser" element={<VerifyDocUser />} />
            <Route path='/mytrips' element={<MyTripsContainer />} />
            <Route path="/bookingdetails/:id" element={<BookingDetails />} />
            <Route path="/displaymessage" element={<DisplayMessage />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/cancel" element={<PaymentCancel />} />
            <Route path="/tripdetail/:id" element={<TripDetail />} />
            {/* host routes */}
            <Route path="/verifyDocHost" element={<VerifyDocHost />} />
            <Route path='/addvehicle' element={<AddVehicle />} />
            <Route path='/vehicles' element={<VehiclesContainer />} />
            <Route path='/vehicledetail/:id' element={<VehicleDetail />} />
            <Route path="/hosttripdetails/:id" element={<TripDetailsContainer />} />
            {/* admin routes */}
            <Route path="/profileapproval" element={<ProfileApproval />} />
            <Route path="/vehicleapproval" element={<VehicleApproval />} />
            <Route path="/category" element={<VehicleCategory />} />
            <Route path="/city" element={<Locations />} />
            <Route path='/statistics' element={<Statistics />} />
          </Routes>
        </BrowserRouter >
      </ThemeProvider>
    </UserContext.Provider>
  )
}