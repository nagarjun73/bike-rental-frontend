import { ImageList, ImageListItem, Typography } from "@mui/material"

export default function ImageComp(props) {
  const { images } = props
  return (
    <ImageList sx={{ width: 500, height: 250 }} cols={2} rowHeight={164}>
      {images?.map((item) => (
        <ImageListItem key={item._id}>
          <img
            // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
            alt="images"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}