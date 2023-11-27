import { TableContainer, Table, TableRow, TableHead, TableCell, Paper, TableBody, Typography, Stack, Button, Chip, Box, FormControl, Select, MenuItem, TextField } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import ProfileItem from './ProfileItem'
import { useEffect, useState } from 'react'
import { startSearchProfile } from '../../../actions/adminAction'
import { startGetPage } from '../../../actions/adminAction'

export default function ProfileApproval(props) {
  const [pageNo, setPage] = useState(0)
  const [sort, setSort] = useState(-1)
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  const unApprProfiles = useSelector((state) => {
    return state.adminData.unApprProfiles
  })

  useEffect(() => {
    dispatch(startGetPage(pageNo, sort))
  }, [pageNo, sort])

  const handlePrevPage = () => {
    if (pageNo !== 0) {
      setPage(pageNo - 1)
    }
  }

  const handleNextPage = () => {
    setPage(pageNo + 1)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    dispatch(startSearchProfile(search))
  }

  return (
    <Box>
      <Typography variant='h3' padding="20px" marginLeft="3vw">ProfileApproval</Typography>
      <Box sx={{ width: "90vw", margin: "auto" }}>
        <Stack direction="row" justifyContent="space-between">
          {/* Sorting */}
          <Box marginLeft="2vw">
            <FormControl variant="standard"  >
              <Select
                id="demo-simple-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value={-1}>Recent First</MenuItem>
                <MenuItem value={1}>Oldest First</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box component="form" onSubmit={handleSearchSubmit} sx={{ display: 'flex', justifyContent: "center" }} >
            <TextField label="Search user" variant="standard" value={search} onChange={(e) => setSearch(e.target.value)} sx={{ marginBottom: "5px" }} />
            <Button label="Search user" type='submit' sx={{ margin: "0px" }} >Search</Button>
          </Box>
        </Stack>

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
              {unApprProfiles?.map((ele) => (
                <ProfileItem profile={ele} key={ele._id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Pagination buttons */}
        <Stack direction="row" justifyContent="center" gap="3vw" marginTop="2vh" >
          <Button variant='contained' disabled={pageNo === 0 && true} onClick={handlePrevPage}>Prev</Button>
          <Chip label={pageNo + 1} />
          <Button variant='contained' disabled={unApprProfiles?.length !== 5 && true} onClick={handleNextPage}>Next</Button>
        </Stack>
      </Box>
    </Box>
  )
}