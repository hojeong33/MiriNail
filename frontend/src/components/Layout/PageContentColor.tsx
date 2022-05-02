import { useEffect, useState } from "react";
import { CirclePicker, GithubPicker } from "react-color";
import { useRecoilState, useSetRecoilState } from "recoil";
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
          .rows {
            display:flex;
            justify-content:space-between;
            width:120px;
            margin-top:15px;
          }
          
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
  @media screen and (max-width: 1023px) {
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
            display : flex;
            margin-top : 15px;
            .filterName {
              position:absolute;
              top:-20px;
            }
            .rows {
              display:flex;
              // justifyContent:space-between;
              // width:120px;
              marginTop:15px;
              margin-right:15px;
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

const PageContentColor = () => {
  const [myFilter,setMyFilter] = useRecoilState(nftFilter)


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
                  <div className="filterName">색상 필터</div>
                  <div className="rows" >
                    <div style={{backgroundColor:"red", width:"33px",height:"30px"}} onClick={() => setMyFilter({...myFilter,color:'red'})}></div>
                    <div style={{backgroundColor:"orange", width:"33px",height:"30px"}} onClick={() =>setMyFilter({...myFilter,color:'orange'})}></div>
                    <div style={{backgroundColor:"yellow", width:"33px",height:"30px"}} onClick={() => setMyFilter({...myFilter,color:'yellow'})}></div>
                  </div>
                  <div className="rows" >
                    <div style={{backgroundColor:"green", width:"33px",height:"30px"}} onClick={() => setMyFilter({...myFilter,color:'green'})}></div>
                    <div style={{backgroundColor:"blue", width:"33px",height:"30px"}} onClick={() => setMyFilter({...myFilter,color:'blue'})}></div>
                    <div style={{backgroundColor:"navy", width:"33px",height:"30px"}} onClick={() => setMyFilter({...myFilter,color:'navy'})}></div>
                  </div>
                  <div className="rows" >
                    <div style={{backgroundColor:"purple", width:"33px",height:"30px"}} onClick={() => setMyFilter({...myFilter,color:'purple'})}></div>
                    <div style={{backgroundColor:"skyblue", width:"33px",height:"30px"}} onClick={() => setMyFilter({...myFilter,color:'skyblue'})}></div>
                    <div style={{backgroundColor:"pink", width:"33px",height:"30px"}} onClick={() => setMyFilter({...myFilter,color:'pink'})}></div>
                  </div>
                  <div className="rows" >
                    <div style={{backgroundColor:"gold", width:"33px",height:"30px"}} onClick={() => setMyFilter({...myFilter,color:'gold'})}></div>
                    <div style={{backgroundColor:"silver", width:"33px",height:"30px"}} onClick={() => setMyFilter({...myFilter,color:'silver'})}></div>
                    <div style={{backgroundColor:"brown", width:"33px",height:"30px"}} onClick={() => setMyFilter({...myFilter,color:'brown'})}></div>
                  </div>
                </div>
                <div className="OrderFilter">
                  <a>정렬</a>
                  <div className="CheckBox">
                    <input type="checkbox" name="cb" id="cb1" onChange={onCheckbox} value=""/>
                    <label htmlFor="b1">최신순</label>
                  </div>
                  <div className="CheckBox">
                    <input type="checkbox" name="cb" id="cb2" onChange={onCheckbox} value="like"/>
                    <label htmlFor="b2">인기도순</label>
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

export default PageContentColor;
