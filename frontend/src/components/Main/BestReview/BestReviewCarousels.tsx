import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "@mui/material";
const Container = styled("div")({
  marginLeft: "600px",
  width: "60%",
});
export interface BestReviewProps {
  name: string;
  price: number;
  tags: Array<string>;
  img: string;
}
export interface Props {
  items: BestReviewProps[];
}
const StyledSlider = styled(Slider)`
  .slick-dots {
    bottom: 10px;
    right: 80%;
  }
`;
function BestReviewCarousels({ items }: Props) {
  const settings = {
    dots: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    speed: 500,
  };
  return (
    <Container>
      <StyledSlider {...settings}>
        {items.map((item, idx) => {
          return (
            <div key={idx}>
              <img
                src={item.img}
                style={{ width: "200px", height: "200px" }}
                alt=""
              />
            </div>
          );
        })}
      </StyledSlider>
    </Container>
  );
}
export default BestReviewCarousels;
