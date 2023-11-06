
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Box, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Button } from '@mui/material/'

export default function Home(props) {
  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'center', height: '80vh', alignItems: 'center', }}>

        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">City</InputLabel>
          <Select
            sx={{ backgroundColor: 'white' }}
            // labelId="demo-multiple-name-label"
            // id="demo-multiple-name"
            // multiple
            // value={personName}
            // onChange={handleChange}
            input={<OutlinedInput label="Name" />}
          // MenuProps={MenuProps}
          >
            {['city1', 'city2', 'city3'].map((name) => (
              <MenuItem
                key={name}
                value={name}
              // style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker label="Pick trip start date" sx={{ backgroundColor: 'white' }} />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker label="Pick trip end date" sx={{ backgroundColor: 'white' }} />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Button variant="contained">Search</Button>
      </Box>
    </div>
  )
}