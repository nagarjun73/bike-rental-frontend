//Importing Components
import Home from './components/Home'
import About from './components/About'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Navbar from './components/Navbar'

//importing router components
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import SearchedResultContainer from './components/SearchedResultContainer'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/SearchedResultContainer" element={<SearchedResultContainer />} />
      </Routes>
    </BrowserRouter >
  )
}