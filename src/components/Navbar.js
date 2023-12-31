//importing Material UI
import { AppBar, Box, Toolbar, Button, Stack } from '@mui/material'
import { useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import _ from 'lodash'
import { jwtDecode } from 'jwt-decode'
import { Link } from 'react-router-dom'

//Importing context API
import { UserContext } from '../App'
import { useContext } from 'react'


export default function Navbar(props) {
  const { userState, userDispatch } = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState(null);

  //Helper fuctions for @mui dropdowns
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  //Logout handler
  const handlelogout = () => {
    localStorage.removeItem('token')
    //for clear user and profile(useReducer & ContextAPI)
    userDispatch({ type: "LOGOUT_USER" })
  }

  const roleBasedNav = () => {
    const token = localStorage.getItem("token")
    const { role } = jwtDecode(token)
    console.log(role);

    if (role === "user") {
      return (
        <>
          <Button sx={{ color: '#fff' }}>
            <Link style={{ textDecoration: "none", color: '#363062' }} to='/'>Home</Link>
          </Button>
          <Button sx={{ color: '#fff' }}>
            <Link style={{ textDecoration: "none", color: '#363062' }} to='/mytrips'>my trips</Link>
          </Button>
          <Button sx={{ color: '#fff' }}>
            <Link style={{ textDecoration: "none", color: '#363062' }} to='/profile'>profile</Link>
          </Button>
          <Button sx={{ color: '#fff' }} onClick={handlelogout}>
            <Link style={{ textDecoration: "none", color: '#363062' }} to='/'>Logout</Link>
          </Button>
        </>
      )
    } else if (role === "host") {
      return (
        <>
          {/* Home Button */}
          <Button sx={{ color: '#fff' }}>
            <Link style={{ textDecoration: "none", color: '#363062' }} to='/'>home</Link>
          </Button>
          {/* Dashboard button */}
          <Button
            onClick={handleClick}
            sx={{ color: '#363062' }}
          >
            Dashboard
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link style={{ textDecoration: "none", color: '#363062' }} to='/addvehicle'>Add vehicle</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link style={{ textDecoration: "none", color: '#363062' }} to='/vehicles'>All vehicles</Link>
            </MenuItem>
          </Menu>

          {/* Profile button */}
          <Button sx={{ color: '#fff' }}>
            <Link style={{ textDecoration: "none", color: '#363062' }} to='/profile'>profile</Link>
          </Button>

          {/* logout button */}
          <Button sx={{ color: '#fff' }} onClick={handlelogout}>
            <Link style={{ textDecoration: "none", color: '#363062' }} to='/'>Logout</Link>
          </Button>
        </>)
    } else if (role === 'admin') {
      return (<>
        <Button sx={{ color: '#fff' }}>
          <Link style={{ textDecoration: "none", color: '#363062' }} to='/'>Home</Link>
        </Button>


        <Button
          onClick={handleClick}
          sx={{ color: '#363062' }}
        >
          Dashboard
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link style={{ textDecoration: "none", color: '#363062' }} to='/statistics'>Statistics</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link style={{ textDecoration: "none", color: '#363062' }} to='/profileapproval'>Profile Approval</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link style={{ textDecoration: "none", color: '#363062' }} to='/vehicleapproval'>Vehicle Approval</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link style={{ textDecoration: "none", color: '#363062' }} to='/category'>Category</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link style={{ textDecoration: "none", color: '#363062' }} to='/city'>City</Link>
          </MenuItem>
        </Menu>

        <Button sx={{ color: '#fff' }}>
          <Link style={{ textDecoration: "none", color: '#363062' }} to='/profile'>profile</Link>
        </Button>

        <Button sx={{ color: '#fff' }} onClick={handlelogout}>
          <Link style={{ textDecoration: "none", color: '#363062' }} to='/'>Logout</Link>
        </Button>
      </>)
    }
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', height: "10vh" }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <img
            src={`https://bikerentals6.s3.ap-south-1.amazonaws.com/frontend/logoMotomate.png`}
            alt="logo"
            width="75px"
          />
          <div style={{ color: '#363062', justifyContent: 'start', fontFamily: "roboto", fontWeight: "500", fontSize: "30px" }}>MotoMate</div>
        </Stack>

        <Box sx={{ justifyContent: 'center' }}>
          {_.isEmpty(userState.user) ?
            <>
              <Button sx={{ color: '#fff' }}>
                <Link style={{ textDecoration: "none", color: '#363062' }} to='/'>Book</Link>
              </Button>
              <Button sx={{ color: '#fff' }}>
                <Link style={{ textDecoration: "none", color: '#363062' }} to='/login'>login</Link>
              </Button>
              <Button sx={{ color: '#fff' }}>
                <Link style={{ textDecoration: "none", color: '#363062' }} to='/signup'>signup</Link>
              </Button>
            </>
            :
            roleBasedNav()
          }
        </Box>
      </Toolbar >
    </AppBar >
  )
}