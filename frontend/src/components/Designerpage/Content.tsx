import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { designer } from '../../routes/Designerpage/Designerpage';
// import Paginations from '../Layout/Paginations'



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

interface IProps {
  designer?: designer
}

const Content:React.FC<IProps> = ({designer}) => {

  return (
    <>
      <Wrapper>
        <MainFrame>
          <div className="MainPadding">
            <div className="ItemList">
              <div className="LeftBox">
                <div className="TypeFilter">
                  <Link to="new">새 소식</Link>
                  <Link to="introduction">디자이너 소개</Link>
                  <Link to="NFTs">네일아트 목록</Link>
                  <Link to="reviews">시술 후기들</Link>
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