import styled from 'styled-components'
import { Link } from 'react-router-dom'

//Styled CSS
export const BgImg = styled.div`
  background-image: url("https://bikerentals6.s3.ap-south-1.amazonaws.com/frontend/Login-image.svg");
  background-position: 100% 70%;
  background-repeat: no-repeat;
`;

export const BgImgSignup = styled.div`
  background-image: url("https://bikerentals6.s3.ap-south-1.amazonaws.com/frontend/undraw_my_password_re_ydq7.svg");
  background-position: 90% 70%;
  background-repeat: no-repeat;
`;

export const Linked = styled(Link)`
  text-decoration: none;
`;

export const BoxSX = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '90vh',
  alignItems: 'center',
}

export const BoxSXSignup = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '90vh',
  alignItems: 'start',
  marginLeft: "8vw"
}