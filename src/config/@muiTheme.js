import { createTheme } from '@mui/material/styles'

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#363062",
      shade: "#ffb399"
    },
    secondary: {
      main: "#2196F3",
    },
  },
  typography: {
    fontFamily: 'roboto,Arial, sans-serif',
  }
})

export default customTheme