import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components"
import Cards from "../Commons/Cards";

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




export interface hotDesignersProps {
  designer_seq : number;
  user_nickname : string;
  user_profile_img : string;
  designer_shop_name : string;
  follow_follower_length : number;
  designs : number; 
}
export interface Props {
  items : hotDesignersProps[];
}

export interface Props2 {
  item : hotDesignersProps;
}

const  DesignerCarousel = ({items}: Props) => {
  const settings = {
    dots: false,
    className: "center",
    centerMode: false,
    infinite: true,
    // centerPadding: "70px",
    slidesToShow: 2,
    speed: 500,
    adaptiveHeight : false,
  };
  return (
    <Wrapper>
      <Slider {...settings}>
        {items?.map((item) => {
          return (
            <div >
              <Cards info={item}/>
            </div>
          );
        })}
      </Slider>
      
    </Wrapper>
  );
}
export default DesignerCarousel