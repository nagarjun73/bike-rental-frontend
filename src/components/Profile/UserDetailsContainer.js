import React from 'react'
import { Stack, Box, CardContent, Typography, CardMedia } from '@mui/material'


export default function UserDetailsContainer(props) {
  const { user } = props

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { md: "row", xs: "column" },
      justifyContent: 'center',
      margin: "5vh",
      backgroundColor: "#fafafa"
    }} >
      <Box sx={{ width: { md: "40vw", xs: "70vw" } }}>
        <CardMedia
          component="img"
          alt={user.name}
          height="200"
          key={user._id}
          image="https://bikerentals6.s3.ap-south-1.amazonaws.com/frontend/Profile-pic.svg.svg"
          sx={{ objectFit: "contain" }}
        />
      </Box>
      <Stack sx={{ paddingX: "5vw", paddingY: "5vh", width: { md: "30vw", xs: "70vw" } }}>
        <Typography variant='h3'>{user.name}</Typography>
        <Typography variant="h6">Mob :  {user.mobileNumber}</Typography>
        <Typography variant="h6">Email :  {user.email}</Typography>
        <Typography variant="h6">Role : {user.role}</Typography>
        <Typography variant="h6"> {user.verified ? "Verified" : "Not Verified"}</Typography>
      </Stack >
    </Box>
  )
}
