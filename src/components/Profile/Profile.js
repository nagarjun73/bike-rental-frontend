import React, { useContext } from 'react'
import { UserContext } from '../../App'
import ProfileDetailsContainer from './ProfileDetailsContainer'
import UserDetailsContainer from './UserDetailsContainer'
import { Stack } from '@mui/material'

function Profile() {
  const { userState } = useContext(UserContext)

  return (
    <div style={{ backgroundColor: "#fafafa" }}>
      {userState.user && <Stack direction="column" >
        <UserDetailsContainer user={userState.user} />
        <ProfileDetailsContainer profile={userState.profile} />
      </Stack>}
    </div >
  )
}

export default Profile