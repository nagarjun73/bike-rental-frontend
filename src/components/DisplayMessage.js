import React from 'react'
import { Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function DisplayMessage() {
  const location = useLocation()

  return (
    <div style={{
      height: "90vh",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Paper sx={{ width: "50vw" }}>
        <Typography variant='h4' >Message</Typography>
        <Typography>{location.state}</Typography>
      </Paper>
    </div>
  )
}
