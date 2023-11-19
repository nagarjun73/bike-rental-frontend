import React from 'react'
import { Stack, Box, CardContent, Typography, CardMedia } from '@mui/material'


export default function UserDetailsContainer(props) {
  const { user } = props

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: "row",
      margin: "5vh",
      backgroundColor: "#fafafa"
    }} >
      <Box sx={{ width: "40vw" }}>
        <CardMedia
          component="img"
          alt={user.name}
          height="200"
          key={user._id}
          image="https://bikerentals6.s3.ap-south-1.amazonaws.com/frontend/Profile-pic.svg.svg"
          sx={{ objectFit: "contain" }}
        />
      </Box>
      <Stack sx={{ paddingX: "5vw", paddingY: "5vh", width: "30vw" }}>
        <Typography variant='h3'>{user.name}</Typography>
        <Typography variant="h6">Mob :{user.mobileNumber}</Typography>
        <Typography variant="h6">Email :{user.email}</Typography>
        <Typography variant="h6"> {user.verified ? "Verified" : "Not Verified"}</Typography>
      </Stack >
    </Box>
  )
}
