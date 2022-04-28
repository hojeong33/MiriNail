import styled from "styled-components"
import {useEffect, useState} from 'react'
import Slider from "react-slick";
import DesignerCarousel from "./DesignerCarousel";
import Cards from "../Commons/Cards";
import { getAllDesigner } from "../../store/api";

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
    width:100%;
    zoom : 1;
    li {

      float: left;
      width: 20%;
      text-align: center;
      cursor: pointer;
      margin-bottom: 80px;
      
    }
  }
  .subtitle {
    font-size: 32px;
    font-weight : bold;
    margin-bottom : 12px;
  }

  .listGroup { 
    margin-top:100px;
  }

`


const PageContentAll = () => {
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

  const [allDesigner,setAllDesigner] = useState<any>([])
  const [page,setPage] = useState(1)
  useEffect(() => {
    getAllDesigner(page).then((res):any => setAllDesigner(res))
    // console.log('엥')
    window.addEventListener("scroll", () => {
      console.log('엥')
      let scrollTop = document.documentElement.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight;
      let clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setPage(e => e+1)
        // this.limit += 10
        getAllDesigner(page).then((res):any => setAllDesigner(res))
      }
    });
  },[])
  return (
    <>
      <Wrapper>
        
        <MainFrame>
          <div className="listGroup">
            <div className="subtitle">All Designers</div>
            <ul className="clear">
                  {allDesigner?.map((item:any, idx:any) => {
                    return (
                      <li className="ItemListType">
                        <a className="ItemBox">
                          <div className="imx">
                            <div key={idx}>
                              <Cards info={item}/>
                            </div>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                  
            </ul>
          </div>
          
        </MainFrame>
        
      </Wrapper>
    </>
  )
}

export default PageContentAll