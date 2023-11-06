//Importing Components
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

//importing Material UI
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material'


export default function App() {
  const navs = { home: '/', about: "/about", login: "/login", signup: '/signup' }

  return (
    <BrowserRouter>
      <div >
        <AppBar position="static" sx={{ backgroundColor: '#ffffff' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Box>
              <Typography variant='h4' sx={{ color: '#ffa733', justifyContent: 'start' }}>Bike Rentals</Typography>
            </Box>
            <Box sx={{ justifyContent: 'center' }}>
              {Object.keys(navs).map((ele, i) => (
                <Button key={i} sx={{ color: '#fff' }}>
                  <Link style={{ textDecoration: "none", color: '#ffa733' }} to={navs[ele]}>{ele}</Link>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>

    </BrowserRouter >
  )
}