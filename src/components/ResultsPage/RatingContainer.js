import { Modal, Stack, Button, Rating, Typography, Card, CardHeader, CardContent, Avatar } from "@mui/material"
import { useState, useEffect } from "react";

export default function RatingContainer(props) {
  const [rating, setRating] = useState(0)
  const { vehicle } = props
  const [open, setOpen] = useState(false)


  useEffect(() => {
    const reviewAdd = vehicle.ratings.reduce((ini, ele) => {
      return ini + ele.rating
    }, 0)
    console.log(reviewAdd);
    const finalRating = reviewAdd / vehicle.ratings.length
    setRating(finalRating);
  }, [])

  //View & approve Open
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button onClick={handleOpen}>
        <Stack direction="row" paddingTop="2vh" justifyContent="center" gap={2}>
          <Rating name="simple-controlled" value={rating} precision={0.5} readOnly />
          <Typography>({vehicle.ratings.length})</Typography>
        </Stack>
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Stack
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="80vw"
          height="80vh"
          margin="auto">
          <Card sx={{
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            padding: 2,
            borderRadius: 2
          }}>
            {vehicle.ratings.map((ele, index) => (
              <Card
                key={index}
                sx={{
                  maxWidth: '100%',
                  margin: 2,
                  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                  borderRadius: 4,
                }}
              >
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>{ele.userId.charAt(0)}</Avatar>}
                  title={ele.userId}
                  subheader={<Rating name="rating" value={ele.rating} precision={0.5} readOnly sx={{ mt: 0.5 }} />}
                />
                <CardContent sx={{ paddingY: 0 }}>
                  <Typography variant="body1" color="text.secondary">
                    {ele.comment}
                  </Typography>
                  <Typography variant="body3" color="text.secondary">
                    {new Date(ele.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Card>
        </Stack>
      </Modal>
    </div >
  )
}
