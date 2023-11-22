import { TableContainer, Table, TableRow, TableHead, TableCell, Paper, TableBody, Typography, } from '@mui/material'
import { useSelector } from 'react-redux'
import ProfileItem from './ProfileItem'

export default function ProfileApproval(props) {
  const unApprProfiles = useSelector((state) => {
    return state.adminData.unApprProfiles
  })

  return (
    <div>
      <Typography variant='h3' padding="20px">ProfileApproval</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>user id</TableCell>
              <TableCell >Username</TableCell>
              <TableCell >Email</TableCell>
              <TableCell >Mobile Number</TableCell>
              <TableCell >Role</TableCell>
              <TableCell align='center' >Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {unApprProfiles.map((ele) => (
              <ProfileItem profile={ele} key={ele._id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}