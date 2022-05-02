import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { nftFilter } from "../../store/atoms";
import NFTItems from "./NFTItems";
import { Paginations } from "./Paginations";

const Wrapper = styled.div`
  * {
    margin: 0px;
    padding: 0px;
    position: relative;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }

  // height: 100vh;
`;
const MainFrame = styled.div`
  

  width: 1300px;
  // height: 100%;
  margin: 0 auto;

  .MainPadding {
    // height: 100%;
    margin: 0px 10px;

    .ItemList {
      padding-left: 180px;
      height: 100%;

      .LeftBox {
        position: absolute;
        padding-right: 100px;
        left: 0px;
        top: 0px;
        z-index: 10;
        padding-top: 75px;

        .TypeFilter {
          a { 
            display:block; 
            color:#3D3C3A; 
            opacity:0.5; 
            transition:all 0.3s; 
            font-size:14px; 
            margin-bottom:20px;
            cursor : pointer;
          }
          a:active{ opacity:1;}
          a:hover{ opacity:1;}
        }

        .OrderFilter {
          margin-top: 100px;
          a {
            display: block;
            color: #3d3c3a;
            opacity: 0.5;
            transition: all 0.3s;
            font-size: 14px;
            margin-bottom: 20px;
          }
          a.active {
            opacity: 1;
          }
          a:hover {
            opacity: 1;
          }
          .CheckBox {
            display:block;
            font-size:14px; 
            color:#3D3C3A; 
            margin-top :15px;
            label {
              margin-left: 7px;
            }
          }
        }
      }

      .RightBox {
        // height: 100%;
        padding-top: 75px;
        width: 100%;
        border-left: 1px solid #d2d2d0;
        padding-bottom: 160px;
        text-align: center;
        display:flex;
        flex-direction : column;
        .pagination {
          margin : 0 auto;
        }
      }
    }
  }

  @media screen and (max-width: 920px) {
    width :100%;
    .MainPadding {
      .ItemList {
        padding-left: 0px;
        .LeftBox {
          position: relative;
          padding-right: 0px;
          left: auto;
          top: auto;
          z-index: 10;
          padding-top: 30px;
          text-align: left;
          .TypeFilter {
            display:flex;
            justify-content:center;
            a {
              margin : 0 10px 0 10px;
            }
          }
          .OrderFilter {
            display:none;
          }
          
        }

        .RightBox {
          padding-top: 30px;
          width: 100%;
          border-left: 0px solid #d2d2d0;
          padding-bottom: 100px;
          text-align: center;
        }
      }
    }
  }
  
`;

const PageContent = () => {
  const [myFilter,setMyFilter] = useRecoilState(nftFilter)
  const [sortFilter,setSortFilter] = useState('')
  const reset = useResetRecoilState(nftFilter)
  useEffect(() => {
    console.log(myFilter)
  },[myFilter])

  const onCheckbox = async (e: any) => {
    const checkboxes: any = document.getElementsByName("cb");
    for await (const box of checkboxes) {
      console.log(box);
      box.checked = false;
    }
    e.target.checked = true;
    setMyFilter({...myFilter,sort:e.target.value});
  };

 

  return (
    <>
      <Wrapper>
        <MainFrame>
          <div className="MainPadding">
            <div className="ItemList">
              <div className="LeftBox">
                <div className="TypeFilter">
                  <a onClick={() => reset()}>전체</a>
                  <a onClick={() => setMyFilter({...myFilter,type:'젤'})}>GEL NAIL</a>
                  <a onClick={() => setMyFilter({...myFilter,type:'프렌치'})}>FRENCH NAIL</a>
                  <a onClick={() => setMyFilter({...myFilter,type:'라인스톤'})}>LINESTONE NAIL</a>
                </div>
                <div className="OrderFilter">
                  <a>정렬</a>
                  <div className="CheckBox">
                    <input type="checkbox" name="cb" id="cb1" onChange={onCheckbox} value=""/>
                    <label htmlFor="cb1">최신순</label>
                  </div>
                  <div className="CheckBox">
                    <input type="checkbox" name="cb" id="cb2" onChange={onCheckbox} value="like"/>
                    <label htmlFor="cb2">인기도순</label>
                  </div>
                </div>
              </div>
              <div className="RightBox">
                <NFTItems />
                <div className="pagination">
                  <Paginations />
                </div>
              </div>
              
            </div>
          </div>
        </MainFrame>
      </Wrapper>
    </>
  );
};

export default PageContent;
