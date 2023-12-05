import React from 'react'
import { Stack, Card, CardContent, Typography, CardMedia, Box } from '@mui/material'

export default function ProfileDetailsContainer(props) {
  const { profile } = props

  return (
    <div>
      <Card sx={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
        borderRadius: "35px 35px 0px 0px",
        paddingBottom: "5vh"
      }}>
        {Object.keys(profile).length !== 0 &&
          (<Box sx={{
            display: 'flex', flexDirection: "column", justifyContent: 'center'
          }
          }>
            <CardContent sx={{ paddingTop: "4vw", margin: "auto" }}>
              <Stack sx={{ display: 'flex', flexDirection: "column" }}>
                <Typography variant='h5'>UID: {profile._id}</Typography>
                <Typography variant='p'>date created : {new Date(profile.createdAt).toLocaleString()}</Typography>
              </Stack>
            </CardContent>
            <Stack direction="row" justifyContent="space-evenly">
              <Stack direction='column'>
                <Typography variant='h5' margin="auto" paddingTop="5vh">Document ID</Typography>
                <Stack direction="row" justifyContent="start">
                  {
                    profile.documentId.map((ele) => {
                      return (< CardMedia
                        component="img"
                        alt={ele.url}
                        height="200"
                        width="300"
                        key={ele._id}
                        image={ele.url}
                        sx={{ objectFit: "contain", }}
                      />)
                    })
                  }
                </Stack>
              </Stack>
              <Stack direction='column'>
                <Typography variant='h5' margin="auto" paddingTop="5vh">Driving Licence</Typography>
                <Stack direction="row">
                  {
                    profile.drivingLicence.map((ele) => {
                      return (< CardMedia
                        component="img"
                        alt={ele.url}
                        height="200"
                        key={ele._id}
                        image={ele.url}
                        sx={{ objectFit: "contain" }}
                      />)
                    })
                  }
                </Stack>
              </Stack>
            </Stack>
          </Box >)
        }
      </Card>
    </div>
  )
}
