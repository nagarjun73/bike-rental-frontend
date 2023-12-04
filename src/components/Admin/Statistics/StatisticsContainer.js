import { Stack } from '@mui/material'
import TileComponent from './TileComponent';
import ChartComponent from './ChartComponent'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function StatisticsContainer() {

  const statistics = useSelector((state) => {
    return state.adminData.statistics
  })

  const categories = useSelector((state) => {
    return state.adminData.vehicleCategories
  })


  //usersCountByRole
  const userCountByRole = statistics?.users.userCountByRole.map((ele) => {
    return { label: ele._id, value: ele.count }
  })

  //vehicleTypeCount
  const vehicleTypeCount = statistics?.vehicles.vehicleTypeCount.map((ele) => {
    return { label: categories.find((ele2) => ele2._id === ele._id).name, value: ele.count }
  })

  //tripCountbyStatus
  const tripCountbyStatus = statistics?.trips.tripCountbyStatus.map((ele) => {
    return { label: ele._id, value: ele.count }
  })

  //expensesByMonth
  const expenses = statistics?.expenses.totalExpensesByMonth.reduce((ini, ele) => {
    ini.xAxis.push(ele.month)
    ini.series.push(ele.expenseaOfMonth)
    return ini
  }, { xAxis: [], series: [] })

  console.log(expenses, "last");

  return (
    <div>
      {
        statistics !== undefined && <Stack spacing={5} paddingTop={2}>
          <Stack height="40vh" spacing={2} direction="row" justifyContent="space-around">
            <TileComponent name="Users" count={statistics.users.usersCount} data={userCountByRole} />
            <TileComponent name="Vehicles" count={statistics.vehicles.vehicleCount} data={vehicleTypeCount} />
          </Stack>
          <Stack height="40vh" spacing={2} direction="row" justifyContent="space-around">
            <TileComponent name="Trips" count={statistics.trips.tripCount} data={tripCountbyStatus} />
            <ChartComponent
              total={statistics.expenses.totalExpenses[0].totalExpenses}
              expenses={expenses}
            />
          </Stack>
        </Stack >
      }
    </div>
  )
}