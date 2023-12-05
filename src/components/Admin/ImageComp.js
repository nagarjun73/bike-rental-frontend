import { CardMedia } from "@mui/material"
import Carousel from 'react-material-ui-carousel'


export default function ImageComp(props) {
  const { docs } = props
  const images = Object.values(docs).flat()
  return (
    <Carousel sx={{ width: "70vw", height: "60vh", margin: 'auto' }} autoPlay={false} >
      {images.map((ele) => {
        return (<CardMedia
          component="img"
          alt={images.model}
          height="400"
          key={ele._id}
          image={ele.url}
          navButtonsAlwaysVisible={true}
          sx={{
            objectFit: "contain",
            backgroundColor: "#ffffff",
            borderRadius: "5px",
          }}
        />)
      }
      )}
    </Carousel>
  )
}