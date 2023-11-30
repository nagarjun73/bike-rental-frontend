//Materialui
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function DateTimePickerComp(props) {
  const { date, setDate, str } = props
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker
            value={date}
            onChange={(value) => setDate(value)}
            label={str}
            closeOnSelect={false}
            sx={{ backgroundColor: 'white', width: { xs: "80vw", md: "20vw" } }}
            reduceAnimations
            disablePast
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  )
}
