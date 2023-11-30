import QueryForm from "./QueryForm"
import { Box } from '@mui/material'

export default function Home(props) {


  return (
    <div style={{
      backgroundImage: `url("https://bikerentals6.s3.ap-south-1.amazonaws.com/frontend/undraw_traveling_yhxq.svg")`,
      backgroundPosition: ' 50% 80%',
      backgroundRepeat: 'no-repeat',
      backgroundColor: "#fafafa",
      height: '85vh'
    }}>
      <Box paddingTop="8vh">
        <QueryForm />
      </Box>
    </div>
  )
}