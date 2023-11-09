import { useReducer, createContext } from 'react'

//Importing Components
import Home from './components/Home'
import About from './components/About'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Navbar from './components/Navbar'
import BookingDetails from './components/BookingPage/BookingDetails'
import QueryResult from './components/ResultsPage/QueryResult'

//importing router components
import { BrowserRouter, Routes, Route, } from 'react-router-dom'

export const UserContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    default: {
      return { ...state }
    }
  }
}


export default function App() {
  const initialState = {}
  const [user, userDispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/QueryResult" element={<QueryResult />} />
          <Route path="/BookingDetails" element={<BookingDetails />} />
        </Routes>
      </BrowserRouter >
    </UserContext.Provider>
  )
}