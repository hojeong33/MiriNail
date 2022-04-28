import styled from "styled-components"
import {useEffect, useState} from 'react'
import Slider from "react-slick";
import DesignerCarousel from "./DesignerCarousel";
import { getHotDesigner, getRecentDesigner } from "../../store/api";

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

  .carouselGroup {
    margin-top:100px;
    
  }
  .subtitle {
    font-size: 32px;
    font-weight : bold;
    margin-bottom : 12px;
  }
 

`


const PageContentThema = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };

  const [hotDesigner,setHotDesigner] = useState<any>([])
  const [latestDesigner,setLatestDesigner] = useState<any>()

  useEffect(() => {
    getHotDesigner().then((res):any => setHotDesigner(res))  
    getRecentDesigner().then((res):any => setLatestDesigner(res))
  },[])
  
  return (
    <>
      <Wrapper>
        
        <MainFrame>
          <div className="carouselGroup">
            <div>
              <div className="subtitle">Hot Designers</div>
              <DesignerCarousel items={hotDesigner} />
            </div>
            <div style={{marginTop:"48px"}}>
              <div className="subtitle">New Designers</div>
              <DesignerCarousel items={latestDesigner} />
            </div>
            {/* <div style={{marginTop:"48px"}}>
              <div className="subtitle">High Rate Designers</div>
              <DesignerCarousel items={hotDesigners} />
            </div> */}
          </div>
        </MainFrame>
        
      </Wrapper>
    </>
  )
}

export default PageContentThema