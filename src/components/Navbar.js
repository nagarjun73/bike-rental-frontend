//importing Material UI
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material'

import { Link } from 'react-router-dom'

export default function Navbar(props) {
  const navs = { home: '/', about: "/about", login: "/login", signup: '/signup' }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', height: "10vh" }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Box>
          <Typography variant='h4' sx={{ color: '#363062', justifyContent: 'start' }}>BikeRentals</Typography>
        </Box>
        <Box sx={{ justifyContent: 'center' }}>
          {Object.keys(navs).map((ele, i) => (
            <Button key={i} sx={{ color: '#fff' }}>
              <Link style={{ textDecoration: "none", color: '#363062' }} to={navs[ele]}>{ele}</Link>
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}