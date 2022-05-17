import { useEffect, useState } from "react";
import { CirclePicker, GithubPicker } from "react-color";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { nftFilter, pagenation } from "../../store/atoms";
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
            display: flex;
            justify-content: space-between;
            width: 120px;
            margin-top: 15px;
            div {
              cursor: pointer;
            }
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
            display: block;
            font-size: 14px;
            color: #3d3c3a;
            margin-top: 15px;
            label {
              margin-left: 7px;
            }
          }
        }
      }

      .RightBox {
        // height: 100%;
        padding-left: 40px;
        padding-top: 75px;
        width: 100%;
        border-left: 1px solid #d2d2d0;
        padding-bottom: 160px;
        text-align: center;
        display: flex;
        flex-direction: column;
        .pagination {
          margin: 0 auto;
        }
      }
    }
  }

 
  .testt {
    background-color: navy;
    width: 33px;
    height: 30px;
    border : navy;    
  }


  @media screen and (max-width: 1023px) {
    width: 100%;
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
            display: flex;
            margin-top: 15px;
            .filterName {
              position: absolute;
              top: -20px;
            }
            .rows {
              display: flex;
              // justifyContent:space-between;
              // width:120px;
              margintop: 15px;
              margin-right: 15px;
            }
          }
          .OrderFilter {
            display: none;
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

const Test3 = styled.div<any>`
  background-color: ${(props) => props.bgColor};
  width: 33px;
  height: 30px;
  border : ${(props) => props.selectedColor === props.bgColor ? '5px solid black' : ''};   
  border-image: linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
  border-image-slice: 1; 
 

`

const PageContentColor = () => {
  const [myFilter, setMyFilter] = useRecoilState(nftFilter);
  const [defaultCheck, setDefaultCheck] = useState(true);
  const [totalCount,setTotalCount] = useRecoilState(pagenation)

  useEffect(() => {
    console.log(myFilter);
  }, [myFilter]);

  const onCheckbox = async (e: any) => {
    setDefaultCheck((prev) => !prev);

    setMyFilter({ ...myFilter, sort: e.target.value });
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
                  <div className="rows">
                    <Test3
                      bgColor={'red'}
                      selectedColor = {myFilter.color}
                      onClick={() => setMyFilter({ ...myFilter, color: "red",page:1 })}
                    ></Test3>
                    <Test3
                      bgColor={'orange'}
                      selectedColor = {myFilter.color}
                      onClick={() =>
                        setMyFilter({ ...myFilter, color: "orange",page:1 },)
                      }
                    ></Test3>
                    <Test3
                      bgColor={'yellow'}
                      selectedColor = {myFilter.color}
                      onClick={() =>
                        setMyFilter({ ...myFilter, color: "yellow",page:1 })
                      }
                    ></Test3>
                  </div>
                  <div className="rows">
                    <Test3
                      bgColor={'green'}
                      selectedColor = {myFilter.color}
                      onClick={() =>
                        setMyFilter({ ...myFilter, color: "green",page:1 })
                      }
                    ></Test3>
                    <Test3
                      bgColor={'blue'}
                      selectedColor = {myFilter.color}
                      onClick={() =>
                        setMyFilter({ ...myFilter, color: "blue",page:1 })
                      }
                    ></Test3>
                    <Test3
                      bgColor={'navy'}
                      selectedColor = {myFilter.color}
                      onClick={() =>
                        setMyFilter({ ...myFilter, color: "navy",page:1 })
                      }
                    ></Test3>
                  </div>
                  <div className="rows">
                    <Test3
                      bgColor={'purple'}
                      selectedColor = {myFilter.color}
                      onClick={() =>
                        setMyFilter({ ...myFilter, color: "purple",page:1 })
                      }
                    ></Test3>
                    <Test3
                      bgColor={'skyblue'}
                      selectedColor = {myFilter.color}
                      onClick={() =>
                        setMyFilter({ ...myFilter, color: "skyblue",page:1 })
                      }
                    ></Test3>
                    <Test3
                      bgColor={'pink'}
                      selectedColor = {myFilter.color}
                      onClick={() =>
                        setMyFilter({ ...myFilter, color: "pink",page:1 })
                      }
                    ></Test3>
                  </div>
                  <div className="rows">
                    <Test3
                      bgColor={'gold'}
                      selectedColor = {myFilter.color}
                      onClick={() =>
                        setMyFilter({ ...myFilter, color: "gold",page:1 })
                      }
                    ></Test3>
                    <Test3
                      bgColor={'silver'}
                      selectedColor = {myFilter.color}
                      onClick={() =>
                        setMyFilter({ ...myFilter, color: "silver",page:1 })
                      }
                    ></Test3>
                    <Test3
                      bgColor={'brown'}
                      selectedColor = {myFilter.color}
                      onClick={() =>
                        setMyFilter({ ...myFilter, color: "brown",page:1 })
                      }
                    ></Test3>
                  </div>
                </div>
                <div className="OrderFilter">
                  <a>정렬</a>
                  <div className="CheckBox">
                    <input
                      type="checkbox"
                      name="cb"
                      id="cb1"
                      onChange={onCheckbox}
                      value=""
                      checked={defaultCheck}
                    />
                    <label htmlFor="b1">최신순</label>
                  </div>
                  <div className="CheckBox">
                    <input
                      type="checkbox"
                      name="cb"
                      id="cb2"
                      onChange={onCheckbox}
                      value="like"
                      checked={!defaultCheck}
                    />
                    <label htmlFor="b2">인기도순</label>
                  </div>
                </div>
              </div>
              <div className="RightBox">
                <NFTItems />
                <div className="pagination">
                  <Paginations page={totalCount}/>
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
