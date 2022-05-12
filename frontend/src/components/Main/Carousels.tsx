import { styled } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bg1 from "../../assets/img/new_bg1.jpg";
import bg2 from "../../assets/img/new_bg2.jpg";
import bg3 from "../../assets/img/new_bg3.jpg";
import { useNavigate } from "react-router-dom";

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
  maxWidth: "100%",
  maxHeight: "100%",
});

const items = [
  { id: 1, url: bg1 },
  { id: 2, url: bg2 },
  { id: 3, url: bg3 },
];

function Carousels() {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <Container>
      <StyledSlider {...settings}>
        {items.map((item) => {
          return (
            <div key={item.id}>
              <ImageContainer>
                <Image
                  src={item.url}
                  onDoubleClick={() => navigate(`/event/${item.id}`)}
                />
              </ImageContainer>
            </div>
          );
        })}
      </StyledSlider>
    </Container>
  );
}
export default Carousels;
