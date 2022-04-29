import { CirclePicker, GithubPicker } from "react-color";
import styled from "styled-components";
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
  
`;

const PageContent = () => {
  return (
    <>
      <Wrapper>
        <MainFrame>
          <div className="MainPadding">
            <div className="ItemList">
              <div className="LeftBox">
                <div className="TypeFilter">
                  <div>색상 필터</div>
                  <div className="rows" style={{display:"flex",justifyContent:"space-between",width:"120px",marginTop:"15px"}}>
                    <div style={{backgroundColor:"red", width:"33px",height:"30px"}}></div>
                    <div style={{backgroundColor:"orange", width:"33px",height:"30px"}}></div>
                    <div style={{backgroundColor:"yellow", width:"33px",height:"30px"}}></div>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",width:"120px",marginTop:"15px"}}>
                    <div style={{backgroundColor:"green", width:"33px",height:"30px"}}></div>
                    <div style={{backgroundColor:"blue", width:"33px",height:"30px"}}></div>
                    <div style={{backgroundColor:"navy", width:"33px",height:"30px"}}></div>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",width:"120px",marginTop:"15px"}}>
                    <div style={{backgroundColor:"purple", width:"33px",height:"30px"}}></div>
                    <div style={{backgroundColor:"skyblue", width:"33px",height:"30px"}}></div>
                    <div style={{backgroundColor:"pink", width:"33px",height:"30px"}}></div>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",width:"120px",marginTop:"15px"}}>
                    <div style={{backgroundColor:"gold", width:"33px",height:"30px"}}></div>
                    <div style={{backgroundColor:"silver", width:"33px",height:"30px"}}></div>
                    <div style={{backgroundColor:"brown", width:"33px",height:"30px"}}></div>
                  </div>
                </div>
                <div className="OrderFilter">
                  <a>정렬</a>
                  <div className="CheckBox">
                    <input type="checkbox" id="cb1" />
                    <label htmlFor="cb1">최신순</label>
                  </div>
                  <div className="CheckBox">
                    <input type="checkbox" id="cb2" />
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
