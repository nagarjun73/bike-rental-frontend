import React from 'react'
import { Stack, CardContent, Typography, Card, Box } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

export default function TileComponent(props) {
  const { name, count, data } = props


  return (
    <Card sx={{ width: "45vw" }}>
      <CardContent>
        <Stack direction='row' gap={5} alignItems="center">
          <Box>
            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
              {name}
            </Typography>
            <Typography variant="h3" component="div">
              {count}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: 15 }} color="text.secondary" >
              {name} Share
            </Typography>
            <PieChart
              series={[
                {
                  data: data
                },
              ]}
              width={400}
              height={150}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
