import styled from "styled-components"
import {useState} from 'react'
import Slider from "react-slick";
import DesignerCarousel from "./DesignerCarousel";

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

const Wrapper = styled.div`
* {
  margin: 0px;
  padding: 0px;
  position: relative;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  
  }

  

`

const MainFrame = styled.div`
  width :1300px;
  height: 100%;
  margin : 0 auto;

 
  

  .clear {
    zoom : 1;
    margin-top:100px;
    li {

      float: left;
      width: 25%;
      text-align: center;
      cursor: pointer;
      margin-bottom: 80px;
      .ItemBox {
        width : 100%;
        display:block;
        .imx {
          margin : 0px 10px;
          img {
            width :100%;
            max-width:100%;
          }
          .itemName {
            color: #3D3C3A;
            font-size: 16px;
            font-weight: 500;
            word-break: keep-all;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .itemPrice {
            color: #3D3C3A;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
          }
          .hashTag {
            color: #6E6E6E;
            font-size: 14px;
            margin-bottom: 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
`


const PageContent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };
  const [hotDesigners,setHotDesigniers] = useState<hotDesignersProps[]>([
    {
      designer_seq : 1,
      user_nickname : 'Designer1',
      user_profile_img : 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg',
      designer_shop_name : 'Nailshop1',
      follow_follower_length : 50,
      designs : 40, 
    },
    {
      designer_seq : 2,
      user_nickname : 'Designer1',
      user_profile_img : 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg',
      designer_shop_name : 'Nailshop1',
      follow_follower_length : 50,
      designs : 40, 
    },
    {
      designer_seq : 3,
      user_nickname : 'Designer1',
      user_profile_img : 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg',
      designer_shop_name : 'Nailshop1',
      follow_follower_length : 50,
      designs : 40, 
    },
    {
      designer_seq : 4,
      user_nickname : 'Designer1',
      user_profile_img : 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg',
      designer_shop_name : 'Nailshop1',
      follow_follower_length : 50,
      designs : 40, 
    },
    {
      designer_seq : 5,
      user_nickname : 'Designer1',
      user_profile_img : 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg',
      designer_shop_name : 'Nailshop1',
      follow_follower_length : 50,
      designs : 40, 
    },
    {
      designer_seq : 6,
      user_nickname : 'Designer1',
      user_profile_img : 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg',
      designer_shop_name : 'Nailshop1',
      follow_follower_length : 50,
      designs : 40, 
    },
    {
      designer_seq : 7,
      user_nickname : 'Designer1',
      user_profile_img : 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg',
      designer_shop_name : 'Nailshop1',
      follow_follower_length : 50,
      designs : 40, 
    },
    {
      designer_seq : 8,
      user_nickname : 'Designer1',
      user_profile_img : 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg',
      designer_shop_name : 'Nailshop1',
      follow_follower_length : 50,
      designs : 40, 
    },
    {
      designer_seq : 9,
      user_nickname : 'Designer1',
      user_profile_img : 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg',
      designer_shop_name : 'Nailshop1',
      follow_follower_length : 50,
      designs : 40, 
    },
    {
      designer_seq : 10,
      user_nickname : 'Designer1',
      user_profile_img : 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg',
      designer_shop_name : 'Nailshop1',
      follow_follower_length : 50,
      designs : 40, 
    },
    {
      designer_seq : 11,
      user_nickname : 'Designer1',
      user_profile_img : 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg',
      designer_shop_name : 'Nailshop1',
      follow_follower_length : 50,
      designs : 40, 
    },
  ])


  return (
    <>
      <Wrapper>
        
        <MainFrame>
          <DesignerCarousel items={hotDesigners} />
        </MainFrame>
        
      </Wrapper>
    </>
  )
}

export default PageContent