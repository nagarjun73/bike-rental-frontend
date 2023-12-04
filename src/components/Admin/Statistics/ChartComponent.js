import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent, Box, Typography } from '@mui/material'

export default function ChartComponent(props) {
  const { total, expenses } = props
  return (
    <Card sx={{ width: "45vw" }}>
      <CardContent sx={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
        <Box>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            Total Expenses (Rupees)
          </Typography>
          <Typography variant="h3" component="div">
            {total}
          </Typography>
        </Box>
        <BarChart
          xAxis={[{ scaleType: 'band', data: expenses.xAxis }]}
          series={[{ data: expenses.series }]}
          width={500}
          height={250}
        />
      </CardContent>
    </Card>
  )
}
