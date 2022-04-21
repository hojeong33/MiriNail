import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";

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
  const [mainSlick, setMainSlick] = useState(null);
  const [pagingSlick, setPagingSlick] = useState(null);
  const mainSlickRef = useRef(null);
  const pagingSlickRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setMainSlick(mainSlickRef.current);
      setPagingSlick(pagingSlickRef.current);
    };
    fetchData();
    console.log(mainSlickRef);
    console.log(pagingSlickRef);
  }, []);

  const mainSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };
  const pagingSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };
  return (
    <>
      {pagingSlick !== null && mainSlick !== null ? (
        <>
          <StyledSlider
            ref={mainSlickRef}
            asNavFor={pagingSlick}
            {...mainSettings}
          >
            {items.map((item, idx) => {
              return (
                <div key={idx}>
                  <h1>{idx}</h1>
                  <Typography>{item.name}</Typography>
                  <Typography>{item.price}원</Typography>
                  {item.tags.map((tag, i) => (
                    <Typography key={i}>{tag}</Typography>
                  ))}
                </div>
              );
            })}
          </StyledSlider>
          <Container>
            <StyledSlider
              ref={pagingSlickRef}
              asNavFor={mainSlick}
              {...pagingSettings}
            >
              {items.map((item, idx) => {
                return (
                  <div key={idx}>
                    <h1>{idx}</h1>
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
        </>
      ) : (
        <div> ?</div>
      )}
    </>
  );
}
export default BestReviewCarousels;
