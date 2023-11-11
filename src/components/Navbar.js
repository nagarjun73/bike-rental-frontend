//importing Material UI
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'
import { useContext } from 'react'

export default function Navbar(props) {
  const { userState, userDispatch } = useContext(UserContext)

  const token = localStorage.getItem("token")

  const handlelogout = () => {
    localStorage.removeItem('token')
    userDispatch({ type: "LOGOUT_USER" })
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', height: "10vh" }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Box>
          <Typography variant='h4' sx={{ color: '#363062', justifyContent: 'start' }}>BikeRentals</Typography>
        </Box>
        <Box sx={{ justifyContent: 'center' }}>
          <Button sx={{ color: '#fff' }}>
            <Link style={{ textDecoration: "none", color: '#363062' }} to='/'>home</Link>
          </Button>
          {_.isEmpty(userState.user) ?
            <>
              <Button sx={{ color: '#fff' }}>
                <Link style={{ textDecoration: "none", color: '#363062' }} to='/login'>login</Link>
              </Button>
              <Button sx={{ color: '#fff' }}>
                <Link style={{ textDecoration: "none", color: '#363062' }} to='/signup'>signup</Link>
              </Button>
            </>
            :
            <>
              <Button sx={{ color: '#fff' }}>
                <Link style={{ textDecoration: "none", color: '#363062' }} to='/about'>about</Link>
              </Button>
              <Button sx={{ color: '#fff' }}>
                <Link style={{ textDecoration: "none", color: '#363062' }} to='/profile'>profile</Link>
              </Button>
              <Button sx={{ color: '#fff' }} onClick={handlelogout}>
                <Link style={{ textDecoration: "none", color: '#363062' }} to='/'>Logout</Link>
              </Button>
            </>
          }
        </Box>
      </Toolbar >
    </AppBar >
  )
}