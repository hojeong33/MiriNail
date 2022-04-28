import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components"
import Cards from "../Commons/Cards";
import { IHotDesigner,ILatestDesigner } from "./PageContentThema";
const Wrapper = styled.div`
  button {
  //  background-color:green;
  }

  .slick-slider {
  position : relative;
  }



  .slick-next {
  // background-color:blue;
  position :absolute
  }

  .slick-prev {

  position :absolute;
  }

  .slick-prev::before {
  color:gray;
  }

  .slick-next::before {
  color:gray;

  }

`
interface IHotDesignerProps {
  items : IHotDesigner[]
}

interface ILatestDesignerProps {
  items : ILatestDesigner[]
}




const  DesignerCarousel = ({items}: IHotDesignerProps|ILatestDesignerProps) => {
  const settings = {
    dots: false,
    className: "center",
    centerMode: false,
    infinite: true,
    // centerPadding: "70px",
    slidesToShow: 5,
    speed: 500,
    adaptiveHeight : false,
  };
  return (
    <Wrapper>
      <Slider {...settings}>
        {items ? items.map((item:any) => {
          return (
            <div >
              <Cards info={item}/>
            </div>
          );
        }) : null }
      </Slider>
      
    </Wrapper>
  );
}
export default DesignerCarousel