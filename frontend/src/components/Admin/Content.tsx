import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const Wrapper = styled.div`
  * {
  padding: 0px;
  position: relative;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  
  }

  height : 100%;

  
`
const MainFrame = styled.div`
  width: 1300px;
  height: 100%;
  margin: 0 auto;

  .MainPadding {
    height: 100%;
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
        padding-top: 55px;

        .TypeFilter {
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
          .historytext{
            display: flex;
            align-items: center;
            svg {
              margin-left: 20px;
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
            label {
              margin-left: 7px;
            }
          }
        }
      }

      .RightBox {
        height: 100%;
        padding-top: 55px;
        width: 100%;
        border-left: 1px solid #d2d2d0;
        padding-bottom: 160px;
        text-align: center;
      }
    }
  }
`;

const Content = () => {
  return (
    <>
      <Wrapper>
        <MainFrame>
          <div className="MainPadding">
            <div className="ItemList">
              <div className="LeftBox">
                <div className="TypeFilter">
                  <Link to="applylist">디자이너 인증신청 목록</Link>
                </div>
              </div>
              <div className="RightBox">
                <Outlet />
              </div>
            </div>
          </div>
          <div></div>
        </MainFrame>
      </Wrapper>
    </>
  );
}

export default Content