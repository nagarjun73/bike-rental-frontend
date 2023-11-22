import { CardMedia } from "@mui/material"
import Carousel from 'react-material-ui-carousel'

export default function ImageComp(props) {
  const { drivingLicence, documentId } = props
  const images = [...drivingLicence, ...documentId,]
  return (
    <Carousel sx={{ width: "70vw", height: "60vh", margin: 'auto' }} autoPlay={false} >
      {images.map((ele) => {
        return (<CardMedia
          component="img"
          alt={images.model}
          height="400"
          key={ele._id}
          image={ele.url}
          sx={{
            objectFit: "contain",
            backgroundColor: "#ffffff ",
            borderRadius: "5px",
          }}
        />)
      }
      )}
    </Carousel>
  )
}