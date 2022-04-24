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
                  <a>전체</a>
                  <a>GEL NAIL</a>
                  <a>FRENCH NAIL</a>
                  <a>LINESTONE NAIL</a>
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

                <div style={{ visibility: "hidden" }}>sdsf</div>
                <div style={{ left: "35%" }}>
                  <Paginations />
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </MainFrame>
      </Wrapper>
    </>
  );
};

export default PageContent;
