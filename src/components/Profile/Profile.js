import React, { useContext } from 'react'
import { UserContext } from '../../App'


function Profile() {
  const { userState } = useContext(UserContext)
  console.log(userState.profile);

  return (
    <h1>Profile</h1>
  )
}

export default Profile