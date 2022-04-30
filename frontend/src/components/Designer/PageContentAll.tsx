import styled from "styled-components"
import {useEffect, useState} from 'react'
import Slider from "react-slick";
import DesignerCarousel from "./DesignerCarousel";
import Cards from "../Commons/Cards";
import { getAllDesigner } from "../../store/api";

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
const FadeIn = styled.div`
animation: 0.7s ease-in-out loadEffect1;

@keyframes loadEffect1 {
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
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
  

  const [allDesigner,setAllDesigner] = useState<any>([])
  const [test,setTest] = useState(1)
  
  const infiniteScroll = async() => {
    
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight;
    let clientHeight = document.documentElement.clientHeight;
    console.log(scrollTop, scrollHeight, clientHeight)
    console.log(scrollTop + clientHeight >= scrollHeight - 10)
    if (scrollTop + clientHeight >= scrollHeight ) {
      setTest(e => e +1)
      // await console.log(test)
      
      //  {console.log(res); setAllDesigner((e:any) => allDesigner.push(...e))})
    }
  }
  useEffect(() => {
    console.log(test)
    getAllDesigner(test,5).then(async(res:any) => await setAllDesigner((prev:any) => Array.from(new Set([...prev, ...res]))))
  },[test])

  useEffect(() => {
    console.log(test)
    getAllDesigner(test,10).then((res):any => setAllDesigner(res))
    window.addEventListener('scroll',infiniteScroll,true)
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