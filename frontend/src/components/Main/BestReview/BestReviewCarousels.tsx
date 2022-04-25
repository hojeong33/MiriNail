import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";

const Container = styled("div")({
  marginLeft: "600px",
  width: "70%",
  position: "absolute",
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
  bottom: 200px;
  right: 150px;
  .slick-prev {
    display: none !important;
  }
  .slick-next {
    display: none !important;
  }
`;
const StyledSlider2 = styled(Slider)`
  width: 300px;
  right: -100px;
  bottom: -100px;
  .slick-prev {
    display: none !important;
  }
  .slick-next {
    display: none !important;
  }
  .slick-dots {
    right: 10px;
  }
`;

function BestReviewCarousels({ items }: Props) {
  const [mainSlick, setMainSlick] = useState(undefined || null);
  const [pagingSlick, setPagingSlick] = useState(undefined || null);
  const mainSlickRef = useRef(null);
  const pagingSlickRef = useRef(null);

  useEffect(() => {
    setMainSlick(mainSlickRef.current);
    setPagingSlick(pagingSlickRef.current);
    console.log("메인", mainSlickRef);
    console.log("사진", pagingSlickRef);
  }, []);

  const mainSettings = {
    dots: true,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };
  const pagingSettings = {
    dots: false,
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
          <StyledSlider2
            ref={mainSlickRef}
            asNavFor={pagingSlick}
            {...mainSettings}
          >
            {items.map((item, idx) => {
              return (
                <div key={idx}>
                  <h1>{idx}</h1>
                  <Typography variant="h4">{item.name}</Typography>
                  <Typography variant="h5">{item.price}원</Typography>
                  {item.tags.map((tag, i) => (
                    <Typography variant="h5" key={i}>
                      {tag}
                    </Typography>
                  ))}
                  <button>자세히 보러가기</button>
                </div>
              );
            })}
          </StyledSlider2>
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
                      style={{ width: "32vh", height: "32vh" }}
                      alt=""
                    />
                  </div>
                );
              })}
            </StyledSlider>
          </Container>
        </>
      ) : (
        <>
          <StyledSlider2 ref={mainSlickRef} {...mainSettings}>
            {items.map((item, idx) => {
              return (
                <div key={idx}>
                  <h1>{idx}</h1>
                  <Typography variant="h4">{item.name}</Typography>
                  <Typography variant="h5">{item.price}원</Typography>
                  {item.tags.map((tag, i) => (
                    <Typography variant="h5" key={i}>
                      {tag}
                    </Typography>
                  ))}
                  <button>자세히 보러가기</button>
                </div>
              );
            })}
          </StyledSlider2>
          <Container>
            <StyledSlider ref={pagingSlickRef} {...pagingSettings}>
              {items.map((item, idx) => {
                return (
                  <div key={idx}>
                    <h1>{idx}</h1>
                    <img
                      src={item.img}
                      style={{ width: "32vh", height: "32vh" }}
                      alt=""
                    />
                  </div>
                );
              })}
            </StyledSlider>
          </Container>
        </>
      )}
    </>
  );
}
export default BestReviewCarousels;
