import { CardMedia } from "@mui/material"
import Carousel from 'react-material-ui-carousel'


export default function ImageComp(props) {
  const { rc, insuranceCerificate, emissionCertificate } = props
  const images = [...rc, ...insuranceCerificate, ...emissionCertificate]
  return (
    <Carousel sx={{ width: "70vw", height: "60vh", margin: 'auto' }} autoPlay={false} >
      {images.map((ele) => {
        return (<CardMedia
          component="img"
          alt={images.model}
          height="400"
          backgroundColor="white"
          key={ele._id}
          image={ele.url}
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