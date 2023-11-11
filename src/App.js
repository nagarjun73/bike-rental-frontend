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

//importing router components
import { BrowserRouter, Routes, Route, } from 'react-router-dom'

import userReducer from './components/Contex&Reducer/userReducer'

export const UserContext = createContext()


export default function App() {
  const initialState = {
    user: {}
  }
  const [userState, userDispatch] = useReducer(userReducer, initialState)
  const [serverError, setServerError] = useState({})

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        try {
          const user = await axios.get('/api/users/account', {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          })
          userDispatch({ type: "LOGIN_USER", payload: user.data })
        } catch (e) {
          setServerError(e.response.data)
        }
      })()
    }
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
          <Route path="/BookingDetails" element={<BookingDetails />} />
          <Route path="/verifyDocUser" element={<Profile />} />
          <Route path="/verifyDocHost" element={<Profile />} />
        </Routes>
      </BrowserRouter >
    </UserContext.Provider>
  )
}