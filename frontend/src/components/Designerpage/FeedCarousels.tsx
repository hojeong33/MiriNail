import { styled } from "@mui/material";
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-material-ui-carousel";
import bg1 from "../../assets/img/bg1.jpg";
import bg2 from "../../assets/img/bg2.jpg";
import bg3 from "../../assets/img/bg3.jpg";

const Container = styled("div")({
  overflow: "hidden",
});

const StyledSlider = styled(Slider)`
  .slick-dots {
    bottom: 10px;
  }
`;

const ImageContainer = styled("div")({
  margin: "0",
});

const Image = styled("img")({
  maxWidth: "400px",
  maxHeight: "400px",
});


interface IProps {
  images: string[];
}

const FeedCarousels:React.FC<IProps> = ({images}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  console.log(images)
  return (
    <Container>
      <StyledSlider {...settings}>
        {images.map((item, idx) => {
          return (
            <div key={idx}>
              <ImageContainer>
                <Image src={item} />
              </ImageContainer>
            </div>
          );
        })}
      </StyledSlider>
    </Container>
  );
}
export default FeedCarousels;
